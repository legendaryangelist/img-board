from django.conf.urls import url
from app import views

# SET THE NAMESPACE!
app_name = 'app'

urlpatterns = [
    url(r'^$', views.users, name='users'),
    url('other/', views.other, name='other'),
]
