from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Service, Case, Competency, CartItem, Order
from .serializers import (
    ServiceSerializer,
    CaseSerializer,
    CompetencySerializer,
    RegisterSerializer,
    CartItemSerializer,
    UserProfileSerializer
)


class CaseViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Case.objects.all()
    serializer_class = CaseSerializer
    permission_classes = [AllowAny]


class ServiceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [AllowAny]


class CompetencyViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Competency.objects.all()
    serializer_class = CompetencySerializer
    permission_classes = [AllowAny]

class CartViewSet(viewsets.ModelViewSet):
    serializer_class = CartItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return CartItem.objects.filter(user=self.request.user).select_related('service')

    def create(self, request, *args, **kwargs):
        service_id = request.data.get('service')
        try:
            service = Service.objects.get(id=service_id)
        except Service.DoesNotExist:
            return Response({"error": "Услуга не найдена"}, status=status.HTTP_404_NOT_FOUND)

        cart_item, created = CartItem.objects.get_or_create(
            user=request.user,
            service=service,
            defaults={'quantity': 1}
        )
        if not created:
            cart_item.quantity += 1
            cart_item.save()

        serializer = self.get_serializer(cart_item)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class PaymentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        cart_items = CartItem.objects.filter(user=user)

        if not cart_items.exists():
            return Response({"error": "Корзина пуста"}, status=status.HTTP_400_BAD_REQUEST)

        total_amount = sum(item.service.price * item.quantity for item in cart_items)

        order = Order.objects.create(
            user=user,
            total_price=total_amount,
            status='Paid'
        )

        cart_items.delete()

        return Response({
            "message": "Оплата успешна",
            "order_id": order.id
        }, status=status.HTTP_201_CREATED)


class RegisterView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response({
                "user": {"id": user.id, "username": user.username},
                "tokens": {"access": str(refresh.access_token), "refresh": str(refresh)}
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user:
            refresh = RefreshToken.for_user(user)
            return Response({
                "user": {"id": user.id, "username": user.username},
                "tokens": {"access": str(refresh.access_token), "refresh": str(refresh)}
            })
        return Response({"error": "Неверные данные"}, status=status.HTTP_401_UNAUTHORIZED)


class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        serializer = UserProfileSerializer(request.user)
        return Response(serializer.data)


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        try:
            # Если используете blacklisting токенов, логику можно добавить сюда.
            # Пока просто возвращаем успешный ответ для фронтенда.
            return Response({"message": "Успешный выход"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)