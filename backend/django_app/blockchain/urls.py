from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_nested.routers import NestedSimpleRouter

from .views import *

# SET THE NAMESPACE!
app_name = 'blockchain'

default_router = DefaultRouter()

## Wallet Router, generates:
# /wallets/
# /wallets/{pk}/
default_router.register('wallets', WalletViewSet, basename='wallets')

urlpatterns = [
    path('', include(default_router.urls)),
]
