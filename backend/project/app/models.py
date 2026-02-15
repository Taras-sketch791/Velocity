from django.db import models
from django.contrib.auth.models import User

class Service(models.Model):
    title = models.CharField(max_length=100, verbose_name="Заголовок")
    description = models.TextField(verbose_name="Описание")
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Цена", null=True, blank=True)

    class Meta:
        verbose_name = "Услуга"
        verbose_name_plural = "Услуги"

    def __str__(self):
        return self.title

class ServiceFeature(models.Model):
    service = models.ForeignKey(Service, related_name='features', on_delete=models.CASCADE)
    feature_text = models.CharField(max_length=100, verbose_name="Особенность")

    class Meta:
        verbose_name = "Особенность услуги"
        verbose_name_plural = "Особенности услуг"

    def __str__(self):
        return self.feature_text

class CartItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='cart_items')
    service = models.ForeignKey(Service, on_delete=models.CASCADE, verbose_name="Услуга")
    quantity = models.PositiveIntegerField(default=1, verbose_name="Количество")
    added_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Элемент корзины"
        verbose_name_plural = "Элементы корзины"
        unique_together = ('user', 'service')

    def __str__(self):
        return f"{self.user.username} - {self.service.title}"

# --- НОВАЯ МОДЕЛЬ ДЛЯ ОПЛАТЫ ---
class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders', verbose_name="Пользователь")
    total_price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Сумма оплаты")
    status = models.CharField(max_length=20, default='Paid', verbose_name="Статус")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Дата заказа")

    class Meta:
        verbose_name = "Заказ"
        verbose_name_plural = "Заказы"

    def __str__(self):
        return f"Заказ #{self.id} - {self.user.username}"

class Case(models.Model):
    title = models.CharField(max_length=200, verbose_name="Название проекта")
    description = models.TextField(verbose_name="Краткое описание")
    link = models.URLField(max_length=200, blank=True, null=True, verbose_name="Ссылка на проект")
    image_class = models.CharField(max_length=50, blank=True, default='case-card__image--default', verbose_name="CSS класс изображения")

    class Meta:
        verbose_name = "Кейс"
        verbose_name_plural = "Кейсы"

    def __str__(self):
        return self.title

class CaseTag(models.Model):
    case = models.ForeignKey(Case, related_name='tags', on_delete=models.CASCADE)
    tag_name = models.CharField(max_length=50, verbose_name="Название тега")

    class Meta:
        verbose_name = "Тег кейса"
        verbose_name_plural = "Теги кейсов"

class Competency(models.Model):
    title = models.CharField(max_length=100, verbose_name="Название компетенции")
    description = models.TextField(verbose_name="Описание")
    icon_class = models.CharField(max_length=50, blank=True, default='competency-card__icon--default', verbose_name="CSS класс иконки")

    class Meta:
        verbose_name = "Компетенция"
        verbose_name_plural = "Компетенции"

class CompetencyTech(models.Model):
    competency = models.ForeignKey(Competency, related_name='techs', on_delete=models.CASCADE)
    tech_name = models.CharField(max_length=50, verbose_name="Название технологии")

class ContactSubmission(models.Model):
    name = models.CharField(max_length=255, verbose_name="Имя")
    email = models.EmailField(verbose_name="Email")
    phone = models.CharField(max_length=50, blank=True, verbose_name="Телефон")
    service = models.ForeignKey(Service, on_delete=models.SET_NULL, null=True, blank=True, verbose_name="Услуга")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Дата создания")