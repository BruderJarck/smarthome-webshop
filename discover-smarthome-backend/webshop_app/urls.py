from django.conf import settings, url
from django.conf.urls.static import static
from django.contrib import admin, auth
from django.contrib.auth.models import User
from django.urls import include, path
from rest_framework import routers
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from webshop_app import views

router = routers.DefaultRouter()
router.register("products", views.ProductViewSet)
router.register("sensors", views.SensorViewset)
router.register("sensor-values", views.SensorValueViewset)
router.register("users", views.CustomUserViewset),
router.register("orders", views.OrderingViewSet)
router.register("categorys", views.ProductCategoryViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("register-new-user/", views.register_new_user),
    path("verify-new-user/", views.verifiy_user)
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
