from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TransactionViewSet, DashboardView


router = DefaultRouter()
router.register("", TransactionViewSet, basename="transactions")

urlpatterns = [
    path("dashboard/", DashboardView.as_view()),
    path("", include(router.urls)),
]