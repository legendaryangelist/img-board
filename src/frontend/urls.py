from django.urls import path
from . import views

urlpatterns = [
  path('react', views.react)
]
