from rest_auth.views import (LoginView, LogoutView, PasswordChangeView)
from rest_framework import generics, authentication, permissions
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.settings import api_settings
from .serializers import UserSerializer, AuthTokenSerializer
from .models import User

# Login
class LoginUserView(LoginView):
    pass

# Logout
class LogoutUserView(LogoutView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

# Password Update
class PasswordUpdateUserView(PasswordChangeView):
    authentication_classes = [authentication.TokenAuthentication]

# Create User
class CreateUserView(generics.CreateAPIView):
    """Create a new user in the system"""
    serializer_class = UserSerializer

class CreateTokenView(ObtainAuthToken):
    """Create a new auth token for the user"""
    serializer_class = AuthTokenSerializer
    renderer_classes = api_settings.DEFAULT_RENDERER_CLASSES

class ManageUserView(generics.RetrieveUpdateAPIView):
    """Manage the authenticated user"""
    serializer_class = UserSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self):
        return self.request.user

class ListUserView(generics.ListCreateAPIView):
    """List all Users from db"""
    serializer_class = UserSerializer
    queryset = User.objects.all()