from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_nested.routers import NestedSimpleRouter

from .views import *

# SET THE NAMESPACE!
app_name = 'boards'

default_router = DefaultRouter()

## Boards Router, generates:
# /boards/
# /boards/{pk}/
default_router.register('boards', BoardViewSet, basename='boards')

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
    path('', include(default_router.urls)),
    path('', include(threads_nested_router.urls)),
    path('', include(posts_nested_router.urls)),
]
