from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

from .views import (
    ServiceViewSet,
    CaseViewSet,
    CompetencyViewSet,
    RegisterView,
    LoginView,
    UserProfileView,
    LogoutView,
    RefreshTokenView
)

router = DefaultRouter()
router.register(r'services', ServiceViewSet, basename='service')
router.register(r'cases', CaseViewSet, basename='case')
router.register(r'competencies', CompetencyViewSet, basename='competency')

urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('token/refresh/', RefreshTokenView.as_view(), name='token_refresh'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
]