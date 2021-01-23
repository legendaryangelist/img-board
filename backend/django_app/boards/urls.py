from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_nested.routers import NestedSimpleRouter

from boards import views

## Boards Router, generates:
# /boards/
# /boards/{pk}/
boards_router = DefaultRouter()
boards_router.register('boards', views.BoardViewSet, basename='boards')

## Threads Nested Router, generates:
# /boards/{boards_pk}/threads/
# /boards/{boards_pk}/threads/{threads_pk}/
threads_router = NestedSimpleRouter(boards_router, 'boards', lookup='boards')
threads_router.register('threads', views.ThreadViewSet, basename='threads')

## Posts Nested Router, generates:
# /boards/{boards_pk}/threads/{threads_pk}/posts/
# /boards/{boards_pk}/threads/{threads_pk}/posts/{posts_pk}/
posts_router = NestedSimpleRouter(threads_router, 'threads', lookup='threads')
posts_router.register('posts', views.PostViewSet, basename='posts')

app_name = 'boards'

urlpatterns = [
    path('', include(boards_router.urls)),
    path('', include(threads_router.urls)),
    path('', include(posts_router.urls)),
]
