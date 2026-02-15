from django.contrib import admin
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import (
    Service, ServiceFeature,
    Case, CaseTag,
    Competency, CompetencyTech,
    ContactSubmission,
    CartItem,
    Order
)

admin.site.unregister(User)

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'total_price', 'status', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('user__username',)

@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ('username', 'email', 'first_name', 'last_name', 'is_staff', 'is_active')
    list_filter = ('is_staff', 'is_superuser', 'is_active', 'groups')

    list_editable = ('is_staff', 'is_active')



@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ('user', 'service', 'quantity', 'added_at')
    list_filter = ('user', 'added_at')


class ServiceFeatureInline(admin.StackedInline):
    model = ServiceFeature
    extra = 1


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('title', 'price', 'id')
    search_fields = ('title',)
    inlines = [ServiceFeatureInline]


class CaseTagInline(admin.StackedInline):
    model = CaseTag
    extra = 1


@admin.register(Case)
class CaseAdmin(admin.ModelAdmin):
    list_display = ('title', 'link', 'id')
    search_fields = ('title', 'description')
    inlines = [CaseTagInline]


class CompetencyTechInline(admin.StackedInline):
    model = CompetencyTech
    extra = 1


@admin.register(Competency)
class CompetencyAdmin(admin.ModelAdmin):
    list_display = ('title', 'icon_class', 'id')
    search_fields = ('title',)
    inlines = [CompetencyTechInline]


@admin.register(ContactSubmission)
class ContactSubmissionAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'service', 'created_at')
    list_filter = ('service', 'created_at')
    search_fields = ('name', 'email', 'phone')
    readonly_fields = ('created_at',)

