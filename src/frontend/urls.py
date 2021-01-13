from django.urls import path
from . import views

# SET THE NAMESPACE!
app_name = 'frontend'

urlpatterns = [
    path('', views.index ),
]


# if settings.DEBUG:
#  + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
#       urlpatterns += static(settings.STATIC_FRONTEND_URL, document_root=settings.STATIC_FRONTEND_ROOT)
