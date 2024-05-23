from django.conf import settings
from django.conf.urls.static import static
from django.urls import include, path
from django.contrib import admin, auth
from django.contrib.auth.models import User
from rest_framework import routers
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from webshop_app.views import ProductViewSet, SensorViewset, SensorValueViewset, CustomUserViewset, register_new_user, verifiy_user, submit_order

router = routers.DefaultRouter()
router.register('products', ProductViewSet)
router.register('sensors', SensorViewset)
router.register('sensor-values', SensorValueViewset)
router.register('users', CustomUserViewset)

urlpatterns = [
  path('admin/', admin.site.urls),
  path('', include(router.urls)),
  path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
  path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
  path('register-new-user/', register_new_user),
  path('verify-new-user/', verifiy_user),
  path('submit_order', submit_order)
  
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
