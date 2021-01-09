from django.urls import path
from django.conf.urls import url
from . import views

# SET THE NAMESPACE!
app_name = 'app'

urlpatterns = [
    path('api/', views.UserListCreate.as_view()),
]
