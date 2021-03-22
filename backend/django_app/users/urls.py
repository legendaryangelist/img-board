from django.conf.urls import url
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include
# from rest_framework.routers import SimpleRouter, DefaultRouter
from .views import *

# SET THE NAMESPACE!
app_name = 'users'

urlpatterns = [
    path('login/', LoginUserView.as_view(), name='login'),
    path('logout/', LogoutUserView.as_view(), name='logout'),
    path('password_update/', PasswordUpdateUserView.as_view(), name='password_update'),
    path('create/', CreateUserView.as_view(), name='create_user'),
    path('users/', ListUserView.as_view(), name='list_users'),
    path('token/', CreateTokenView.as_view(), name='token'),
    path('me/', ManageUserView.as_view(), name='me'),
]
