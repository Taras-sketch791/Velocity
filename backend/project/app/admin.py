from django.contrib import admin
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import (
    Category,
    Product,
    CartItem,
    Order,
    OrderItem
)


# 1. Настройка отображения товаров ВНУТРИ заказа
class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0  # Чтобы не создавались пустые строки по умолчанию
    readonly_fields = ('product', 'quantity', 'price_at_purchase')  # Запрещаем менять цену уже купленного товара
    can_delete = False  # Запрещаем удалять товары из заказа для безопасности истории


# 2. Основная настройка Заказов (Продаж)
@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'user_link', 'total_price', 'is_paid', 'created_at')
    list_filter = ('is_paid', 'created_at')
    list_editable = ('is_paid',)  # Можно отмечать оплату прямо из списка
    inlines = [OrderItemInline]  # Добавляем список товаров в карточку заказа

    # Сделаем красивую ссылку на пользователя
    def user_link(self, obj):
        return f"{obj.user.first_name} {obj.user.last_name} ({obj.user.username})"

    user_link.short_description = 'Покупатель'


# 3. Настройка Пользователей
admin.site.unregister(User)


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ('username', 'email', 'first_name', 'last_name', 'is_staff', 'is_active')
    list_filter = ('is_staff', 'is_superuser', 'is_active')
    # Сортировка по дате регистрации (если есть поле date_joined)
    ordering = ('-date_joined',)


# 4. Настройка Категорий
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'id')
    prepopulated_fields = {'slug': ('name',)}


# 5. Настройка Товаров
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('title', 'brand', 'category', 'price', 'discount_price', 'in_stock')
    list_filter = ('category', 'brand', 'in_stock')
    search_fields = ('title', 'brand', 'description')
    list_editable = ('price', 'discount_price', 'in_stock')
    list_per_page = 20  # Пагинация: 20 товаров на страницу


# 6. Настройка Корзины (опционально, если хотите видеть, что люди набросали в корзины)
@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ('user', 'product', 'quantity', 'added_at')