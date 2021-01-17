from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, \
    PermissionsMixin

# User Manager - creates User and Super User
class UserManager(BaseUserManager):
    """User Manager"""
    def create_user(self, username, email, password=None, **extra_fields):
        """Creates and saves a new user"""
        if not username:
            raise ValueError('Enter a username')
        if not email:
            raise ValueError('Enter an email address')
        
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password):
        """Creates and saves a new super user"""
        user = self.create_user(username=username, email=email, password=password)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)
        return user


# User Model
class User(AbstractBaseUser, PermissionsMixin):
    """Custom user model that supports using email instead of username"""
    username = models.CharField(max_length=255)
    email = models.EmailField(max_length=255, unique=True)   
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
