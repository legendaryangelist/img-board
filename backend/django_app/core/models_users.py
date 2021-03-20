import uuid
from random import randint
from faker import Faker
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager ,PermissionsMixin
from django.db.models.query_utils import subclasses
from django.utils.translation import gettext_lazy as _
from secrets import token_bytes
from coincurve import PublicKey
from sha3 import keccak_256

# User Manager - creates User and Super User
class UserManager(BaseUserManager):
    """User Manager"""

    def generate_eth_keys(self):
        gen = {}
        gen["private_key"] = keccak_256(token_bytes(32)).digest()
        gen["public_key"] = PublicKey.from_valid_secret(gen["private_key"]).format(compressed=False)[1:]
        gen["address"] = keccak_256(gen["public_key"]).digest()[-20:]
        return gen

    def create_user(self, username, email, password=None, **extra_fields):
        """Creates and saves a new user"""
        if not username:
            raise ValueError('Enter a username')
        if not email:
            raise ValueError('Enter an email address')
        
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.nonce      = randint(1000000, 10000000)
        user.address    = self.generate_eth_keys()["address"].hex()

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
    
    nonce           = models.PositiveBigIntegerField(default=0, verbose_name=_('Nonce')) 
    public_address  = models.CharField(default=None, max_length=300, unique=True, null=False, verbose_name=_('Public Address'))

    sub             = models.ManyToManyField(to="Board", related_name='sub', blank=True, verbose_name=_('Sub'));
    super_sub       = models.ManyToManyField(to="Board", related_name='super_sub', blank=True, verbose_name=_('Super Sub'));
    user_boards     = models.ManyToManyField(to="Board", related_name='user_boards', blank=True, verbose_name=_('User Boards'));
    user_threads    = models.ManyToManyField(to="Thread", related_name='user_threads', blank=True, verbose_name=_('User Threads'));
    user_posts      = models.ManyToManyField(to="Post", related_name='user_posts', blank=True, verbose_name=_('User Posts'));
    user_wallets    = models.ManyToManyField(to="Wallet", related_name='user_wallets', blank=True, verbose_name=_('User Wallets'));

    # Registering Manager to objects
    objects         = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return str(self.username)
