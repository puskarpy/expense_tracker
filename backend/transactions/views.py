from rest_framework.decorators import APIView, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from .serializers import TransactionSerializer
from .models import Transaction


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


# def create(request):
#     serializer = TransactionSerializer(request.data)

#     if serializer.is_valid():
#         serializer.save(user=request.user)

#         return Response({
#             "success": True,
#             "message": "Transaction created successfully.",
#             "data": serializer.data
#         }, status=201)
    
#     return Response({
#         "success": False,
#         "message": "Something went wrong",
#         "data": serializer.errors
#     }, status=500)

# def get_all_transactions(request):
#     transactions = Transaction.objects.all()
    
#     serializer = TransactionSerializer(transactions, many=True)

#     return Response({
#         "success": True,
#         "message": "Transactions fetched successfully",
#         "data": serializer.data
#     })

