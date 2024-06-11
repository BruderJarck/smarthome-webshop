from .settings import *

DEBUG = False

# ALLOWED_HOSTS = ['127.0.0.1', '.herokuapp.com']
ALLOWED_HOSTS = os.getenv("DJANGO_ALLOWED_HOSTS", "localhost,127.0.0.1,[::1]").split(",")

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'koyebdb',
        'USER': 'koyeb-adm',
        'PASSWORD': 'Es3WgVRz6Ywx',
        'HOST': 'ep-blue-mode-a2p2x3qq.eu-central-1.pg.koyeb.app',
        'OPTIONS': {'sslmode': 'require'},
    }
}

WHITENOISE_USE_FINDERS = True
# import dj_database_url
# db_from_env = dj_database_url.config(conn_max_age=500)
# DATABASES['default'].update(db_from_env)

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
# MEDIA_URL = '/media/'
