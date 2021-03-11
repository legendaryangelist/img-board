import uuid
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager ,PermissionsMixin
from django.db.models.query_utils import subclasses
from django.utils.translation import gettext_lazy as _

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
    username        = models.CharField(max_length=30, verbose_name=_('Username'))
    email           = models.EmailField(max_length=255, unique=True, verbose_name=_('Email'))   
    is_active       = models.BooleanField(default=True, verbose_name=_('Is Active'))
    is_staff        = models.BooleanField(default=False, verbose_name=_('Is Staff'))
    sub             = models.JSONField(default=dict, verbose_name=_('Sub'));
    super_sub       = models.JSONField(default=dict, verbose_name=_('Super Sub'));
    posts           = models.JSONField(default=dict, verbose_name=_('Posts'));
    nonce           = models.PositiveBigIntegerField(default=0, verbose_name=_('Nonce'))
    public_address  = models.CharField(default="", max_length=300, verbose_name=_('Public Address'))

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
