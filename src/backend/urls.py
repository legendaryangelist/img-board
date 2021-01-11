from django.urls import path
from django.conf.urls import url
from django.conf import settings
from django.conf.urls.static import static
from . import views

# SET THE NAMESPACE!
app_name = 'backend'

urlpatterns = [
    # path('', views.index, name='index'),
    # path('users/', views.users, name='users'),
    path('api/', views.UserListCreate.as_view()),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
