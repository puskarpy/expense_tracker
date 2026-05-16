from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TransactionViewSet, DashboardView, get_categories


router = DefaultRouter()
router.register("", TransactionViewSet, basename="transactions")

urlpatterns = [
    path("dashboard/", DashboardView.as_view()),
    path("categories/", get_categories),
    path("", include(router.urls)),
]