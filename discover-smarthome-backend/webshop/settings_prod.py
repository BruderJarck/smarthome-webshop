from .settings import *

DEBUG = False

ALLOWED_HOSTS = ['127.0.0.1', '.herokuapp.com']


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'daib5d5ht67295',
        'USER': 'qcvactoiyjhbkr',
        'PASSWORD': '26803fa54149644d167c5316d45162cb97aeb018961a27a998c117a01efb4175',
        'HOST': 'ec2-54-157-113-118.compute-1.amazonaws.com'
    }
}

WHITENOISE_USE_FINDERS = True
import dj_database_url
db_from_env = dj_database_url.config(conn_max_age=500)
DATABASES['default'].update(db_from_env)

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'static')
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
# MEDIA_URL = '/media/'
