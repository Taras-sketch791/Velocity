from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ServiceViewSet,
    CaseViewSet,
    CompetencyViewSet,
    CartViewSet,
    RegisterView,
    LoginView,
    PaymentView,
    UserProfileView,
    LogoutView
)

router = DefaultRouter()
router.register(r'services', ServiceViewSet)
router.register(r'cases', CaseViewSet)
router.register(r'competencies', CompetencyViewSet)
router.register(r'cart', CartViewSet, basename='cart')

urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('payment/', PaymentView.as_view(), name='payment'), # Вот этот путь вызывает твой ProfilePage
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('logout/', LogoutView.as_view(), name='logout'),
]