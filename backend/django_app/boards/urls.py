from django.urls import path, include
from rest_framework.routers import DefaultRouter

from boards import views

router = DefaultRouter()
# router.register('posts', views.PostViewSet)
# router.register('threads', views.ThreadViewSet)
# router.register('boards', views.BoardViewSet)

app_name = 'boards'

urlpatterns = [
    path('', include(router.urls)),
]
