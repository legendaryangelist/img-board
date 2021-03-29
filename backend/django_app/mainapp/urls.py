"""mainapp URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.views.generic.base import RedirectView
from django.contrib.staticfiles.storage import staticfiles_storage
from django.conf import settings
from django.conf.urls.static import static

from rest_framework.routers import DefaultRouter
from rest_framework_nested.routers import NestedSimpleRouter

from users.views import *
from boards.views import *
from blockchain.views import *

default_router = DefaultRouter()

## Boards Router, generates:
# /boards/
# /boards/{pk}/
default_router.register('boards', BoardViewSet, basename='boards')

## Wallet Router, generates:
# /wallets/
# /wallets/{pk}/
default_router.register('wallets', WalletViewSet, basename='wallets')

## Threads Nested Router, generates:
# /boards/{boards_pk}/threads/
# /boards/{boards_pk}/threads/{threads_pk}/
threads_nested_router = NestedSimpleRouter(default_router, 'boards', lookup='boards')
threads_nested_router.register('threads', ThreadViewSet, basename='threads')

## Posts Nested Router, generates:
# /boards/{boards_pk}/threads/{threads_pk}/posts/
# /boards/{boards_pk}/threads/{threads_pk}/posts/{posts_pk}/
posts_nested_router = NestedSimpleRouter(threads_nested_router, 'threads', lookup='threads')
posts_nested_router.register('posts', PostViewSet, basename='posts')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/login/', LoginUserView.as_view(), name='login'),
    path('api/auth/logout/', LogoutUserView.as_view(), name='logout'),
    path('api/auth/password_update/', PasswordUpdateUserView.as_view(), name='password_update'),
    path('api/auth/create/', CreateUserView.as_view(), name='create_user'),
    path('api/auth/users/', ListUserView.as_view(), name='list_users'),
    path('api/auth/token/', CreateTokenView.as_view(), name='token'),
    path('api/auth/me/', ManageUserView.as_view(), name='me'),
    path('api/app/', include(default_router.urls)),
    path('api/app/', include(threads_nested_router.urls)),
    path('api/app/', include(posts_nested_router.urls)),
]


if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


# from django.urls import get_resolver
# urls = get_resolver().reverse_dict