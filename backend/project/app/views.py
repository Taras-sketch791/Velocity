from rest_framework import viewsets, status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import authenticate

from .models import Service, Case, Competency, ContactSubmission
from .serializers import (
    ServiceSerializer,
    CaseSerializer,
    CompetencySerializer,
    RegisterSerializer
)

class ServiceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [AllowAny]


class CaseViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Case.objects.all()
    serializer_class = CaseSerializer
    permission_classes = [AllowAny]


class CompetencyViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Competency.objects.all()
    serializer_class = CompetencySerializer
    permission_classes = [AllowAny]


# Регистрация
class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)

            return Response({
                "message": "Регистрация успешна",
                "user": {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email,
                },
                "tokens": {
                    "access": str(refresh.access_token),
                    "refresh": str(refresh),
                }
            }, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Логин
class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response(
                {"error": "Требуется имя пользователя и пароль"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Аутентификация пользователя
        user = authenticate(username=username, password=password)

        if user is None:
            return Response(
                {"error": "Неверное имя пользователя или пароль"},
                status=status.HTTP_401_UNAUTHORIZED
            )

        # Генерация токенов
        refresh = RefreshToken.for_user(user)

        return Response({
            "message": "Вход выполнен успешно",
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
            },
            "tokens": {
                "access": str(refresh.access_token),
                "refresh": str(refresh),
            }
        })


# Получение информации о текущем пользователе
class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            "id": user.id,
            "username": user.username,
            "email": user.email,
        })


# Обновление токена
class RefreshTokenView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        refresh_token = request.data.get('refresh')

        if not refresh_token:
            return Response(
                {"error": "Требуется refresh токен"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            refresh = RefreshToken(refresh_token)
            access_token = str(refresh.access_token)

            return Response({
                "access": access_token
            })
        except TokenError:
            return Response(
                {"error": "Недействительный токен"},
                status=status.HTTP_401_UNAUTHORIZED
            )


# Выход
class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data.get('refresh')
            if refresh_token:
                token = RefreshToken(refresh_token)
                token.blacklist()

            return Response({
                "message": "Выход выполнен успешно"
            })
        except Exception:
            return Response({
                "message": "Выход выполнен"
            })