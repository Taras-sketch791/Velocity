from django.contrib import admin
from .models import (
    Service, ServiceFeature,
    Case, CaseTag,
    Competency, CompetencyTech,
    ContactSubmission
)


class ServiceFeatureInline(admin.StackedInline):
    model = ServiceFeature
    extra = 1


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('title', 'id')
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