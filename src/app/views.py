from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics
from .models import User
from .serializers import UserSerializer


# Create your views here.
def index(request):
    return render(request, 'app/index.html')

def users(request):
    user_list = User.objects.order_by('first_name')
    user_dict = {"users": user_list}
    return render(request, 'app/users.html', context=user_dict)

class UserListCreate(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


