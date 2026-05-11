from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .serializers import UserSerializer

# Create your views here.

@api_view(["POST"])
def register(request):
    serializer = UserSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

        return Response({
            "success": True,
            "message": "User created successfully.",
            "data": serializer.data,
        }, status=201)
    
    return Response({
        "success": False,
        "data": serializer.errors
    })

@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def update(request):
    pass