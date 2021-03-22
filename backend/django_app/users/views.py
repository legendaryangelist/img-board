from rest_auth.views import LoginView, LogoutView, PasswordChangeView
from rest_framework.viewsets import ModelViewSet
from rest_framework import authentication, permissions
from rest_framework.generics import CreateAPIView, RetrieveUpdateAPIView, ListAPIView
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.settings import api_settings
from .serializers import UserSerializer, AuthTokenSerializer
from core.models import User

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
class CreateUserView(CreateAPIView):
    """Create a new user in the system"""
    serializer_class = UserSerializer


class ListUserView(ListAPIView):
    """List all Users from db"""
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def get_queryset(self):
        return User.objects.all()
        
class CreateTokenView(ObtainAuthToken):
    """Create a new auth token for the user"""
    serializer_class = AuthTokenSerializer
    renderer_classes = api_settings.DEFAULT_RENDERER_CLASSES

    def get_queryset(self):
        pass

class ManageUserView(RetrieveUpdateAPIView):
    """Manage the authenticated user"""
    serializer_class = UserSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self):
        return self.request.user
