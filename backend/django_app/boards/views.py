from rest_framework import viewsets, mixins, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Post, Thread, Board

from boards import serializers


# ----------------------------------------------------
# ------------------- Post Viewset -------------------
# ----------------------------------------------------
class PostViewSet(viewsets.ModelViewSet):
    """A viewset that provides the standard actions for 'Post' model"""
    queryset = Post.objects.all()
    serializer_class = serializers.PostSerializer



# ------------------------------------------------------
# ------------------- Thread Viewset -------------------
# ------------------------------------------------------
class ThreadViewSet(viewsets.ModelViewSet):
    """A viewset that provides the standard actions for 'Thread' model"""
    serializer_class = serializers.ThreadSerializer
    queryset = Thread.objects.all()



# -----------------------------------------------------
# ------------------- Board Viewset -------------------
# -----------------------------------------------------
class BoardViewSet(viewsets.ModelViewSet):
    """A viewset that provides the standard actions for 'Board' model"""
    serializer_class = serializers.BoardSerializer
    queryset = Board.objects.all()
