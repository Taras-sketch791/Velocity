from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework.validators import UniqueValidator
from .models import Service, ServiceFeature, Case, CaseTag, Competency, CompetencyTech, CartItem, Order

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name']
        read_only_fields = ['email']

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    email = serializers.EmailField(required=True, validators=[UniqueValidator(queryset=User.objects.all(), message="Email уже занят")])
    username = serializers.CharField(required=True, validators=[UniqueValidator(queryset=User.objects.all(), message="Логин уже занят")])

    class Meta:
        model = User
        fields = ('username', 'password', 'email')

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        # ИСПРАВЛЯЕМ "ОШИБКУ" СТАТУСА ПЕРСОНАЛА:
        user.is_staff = True
        user.save()
        return user

class ServiceFeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceFeature
        fields = ('feature_text',)

class ServiceSerializer(serializers.ModelSerializer):
    features = ServiceFeatureSerializer(many=True, read_only=True)
    class Meta:
        model = Service
        fields = ('id', 'title', 'description', 'price', 'features')

class CartItemSerializer(serializers.ModelSerializer):
    service_details = ServiceSerializer(source='service', read_only=True)
    service = serializers.PrimaryKeyRelatedField(queryset=Service.objects.all())

    class Meta:
        model = CartItem
        fields = ('id', 'service', 'service_details', 'quantity', 'added_at')

class CaseTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = CaseTag
        fields = ('tag_name',)

class CaseSerializer(serializers.ModelSerializer):
    tags = CaseTagSerializer(many=True, read_only=True)
    class Meta:
        model = Case
        fields = ('id', 'title', 'description', 'link', 'image_class', 'tags')

class CompetencyTechSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompetencyTech
        fields = ('tech_name',)

class CompetencySerializer(serializers.ModelSerializer):
    techs = CompetencyTechSerializer(many=True, read_only=True)
    class Meta:
        model = Competency
        fields = ('id', 'title', 'description', 'icon_class', 'techs')