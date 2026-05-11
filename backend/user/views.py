from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import UserSerializer
from django.contrib.auth import authenticate

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

@api_view(["POST"])
def login(request):
    username = request.data.get("username")
    password = request.data.get("password")

    user = authenticate(username=username, password=password)

    if user is not None:
        refresh = RefreshToken.for_user(user=user)

        return Response({
            "success": True,
            "message": "Logged in successfully.",
            "data": {
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                    "user" :{  
                    "id" : user.id,
                    "username": user.username,
                    "email": user.email,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                }
            }
        }, status=200)
    
    return Response({
        "success": False,
        "message": "Login failed."
    }, status=401)

@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def update(request):
    pass