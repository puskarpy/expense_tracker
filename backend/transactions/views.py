from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import TransactionSerializer, CategorySerializer
from .models import Transaction, Category

from django.db.models import Sum


# Create your views here.

class TransactionViewSet(ModelViewSet):
    serializer_class = TransactionSerializer

    def get_queryset(self):
        if self.action == "list":
            return Transaction.objects.all()
        
        return Transaction.objects.filter(user = self.request.user)
    
    def perform_create(self, serializer):
        return serializer.save(user=self.request.user)
    
    def get_permissions(self):
        if self.action == "list":
            return [AllowAny()]
        
        return [IsAuthenticated()]

class DashboardView(APIView):
    
    def get(self, request):
        income = Transaction.objects.filter(
            user=request.user,
            type="income"
        ).aggregate(total=Sum("amount"))["total"] or 0

        expense = Transaction.objects.filter(
            user=request.user,
            type="expense"
        ).aggregate(total=Sum("amount"))["total"] or 0

        transaction_count = Transaction.objects.filter(
            user = request.user
        ).count()

        return Response({
            "success": True,
            "message": "Data fetched successfully.",
            "data": {
                "total_income": income,
                "total_expense": expense,
                "remaining_balance": income - expense,
                "transaction_count": transaction_count,
            }
        })
    
# class CategoryView(ModelViewSet):
#     serializer_class = CategorySerializer
#     # permission_classes=[IsAuthenticated]
#     def get_queryset(self):
#             return Category.objects.all()

@api_view(["GET"])
def get_categories(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)

    return Response({
        "success": True,
        "message": "Categories fetched successfully.",
        "data": serializer.data
    })