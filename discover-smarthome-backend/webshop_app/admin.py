from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth import get_user_model

from .forms import CustomUserCreationForm, CustomUserChangeForm
from .models import ProductModel, SensorModel, SensorValueModel, UserProfile, OrderingModel


class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = get_user_model()
    list_display = ('email', 'is_staff', 'is_active',)
    list_filter = ('email', 'is_staff', 'is_active',)
    fieldsets = (
        (None, {'fields': ('username', 'email', 'password', 'profile_picture')}),
        ('Permissions', {'fields': ('is_staff', 'is_active')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'password1', 'password2', 'email', 'profile_picture', 'is_staff', 'is_active')}
        ),
    )
    search_fields = ('username',)
    ordering = ('username',)


admin.site.register(ProductModel)
admin.site.register(SensorModel)
admin.site.register(SensorValueModel)
admin.site.register(OrderingModel)
admin.site.register(UserProfile, CustomUserAdmin)
