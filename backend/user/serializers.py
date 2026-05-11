from rest_framework import serializers
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["email", "username","password" ,"first_name", "last_name"]

    def create(self, validated_data):
        user = User.objects.create_user(
            username= validated_data["username"],
            email= validated_data["email"],
            password= validated_data["password"],
            first_name= validated_data["first_name"],
            last_name= validated_data["last_name"],
        )

        return user
    
    def update(self, instance, validated_data):
        password = validated_data.pop("password", None)

        instance.email = validated_data.get("email", instance.email)
        instance.username = validated_data.get("username", instance.username)
        instance.first_name = validated_data.get("first_name", instance.first_name)
        instance.last_name = validated_data.get("last_name", instance.last_name)

        if password and password.strip():
            instance.set_password(password)

        return instance
