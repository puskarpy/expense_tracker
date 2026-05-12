from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError

from .serializers import UserSerializer
from django.contrib.auth import authenticate
from django.contrib.auth.models import User

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
            }
        }, status=200)
    
    return Response({
        "success": False,
        "message": "Login failed."
    }, status=401)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def me(request):
    user = request.user

    return Response({
        "success": True,
        "message": "Data fetched successfully.",
        "data" : {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
        }
    })

@api_view(["PATCH"])    
@permission_classes([IsAuthenticated])
def update(request):
    serializer = UserSerializer(request.user, data=request.data, partial=True)

    if serializer.is_valid():
        serializer.save()

        return Response({
            "success": True,
            "message": "User updated successfully.",
            "data": serializer.data
        })
    
    return Response({
        "success": False,
        "message": "Comething went wrong.",
        "data": serializer.errors
    })

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def logout(request):
    try:
        refresh_token = request.data.get("refresh")

        token = RefreshToken(refresh_token)

        token.blacklist()

        return Response({
            "success": True,
            "message": "Logged out successfully."
        })
    except TokenError:
        return Response({
            "success": False,
            "message": "Invalid Token."
        })

@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete(request):
    request.user.delete()

    return Response({
        "success": True,
        "message": "User deleted successfully."
    })