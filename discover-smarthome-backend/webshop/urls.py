from django.conf import settings
from django.conf.urls.static import static
from django.urls import include, path
from django.contrib import admin

from webshop_app import urls
urlpatterns = [
    path("", include('webshop_app.urls'))    
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
