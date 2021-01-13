from django.urls import path
from django.conf.urls import url
from django.conf import settings
from django.conf.urls.static import static
from . import views

# SET THE NAMESPACE!
app_name = 'backend'

urlpatterns = [
    path('api/create/', views.CreateUserView.as_view(), name='create'),
    path('api/token/', views.CreateTokenView.as_view(), name='token'),
    path('api/me/', views.ManageUserView.as_view(), name='me'),
    path('api/users/', views.UserListCreate.as_view(), name='users') # TODO fix list all viewers (populate)
]

# if settings.DEBUG:
#     urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
