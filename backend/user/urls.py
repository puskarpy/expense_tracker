from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("register/", view=views.register),
    path("login/", view=views.login),
    path("logout/", view=views.logout),
    path("me/", view=views.me),
    path("update/", view=views.update),
    path("delete/", view=views.delete),
    path("token/", TokenObtainPairView.as_view()),
    path("token/refresh/", TokenRefreshView.as_view()),
]