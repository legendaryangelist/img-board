import os

from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APIClient


class TestClass(TestCase):
    """Test unauthenticated recipe API access"""

    def setUp(self):
        self.client = APIClient()