from rest_framework import viewsets, mixins, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response

from core.models import Post, Thread, Board

from boards import serializers


# -----------------------------------------------------
# ------------------- Board Viewset -------------------
# -----------------------------------------------------
class BoardViewSet(viewsets.ModelViewSet):
    """A viewset that provides the standard actions for 'Board' model"""
    serializer_class = serializers.BoardSerializer
    queryset = Board.objects.all()

    def _params_to_ints(self, qs):
        """Convert a list of string IDs to a list of integers"""
        return [int(str_id) for str_id in qs.split(',')]

    def get_queryset(self):
        """Retrieve the boards"""
        return Board.objects.all().order_by('created')  # Return all boards queryset to reload REST Viewset
    
    def get_serializer_class(self):
        """Return appropriate serializer class"""
        return self.serializer_class
    
    def perform_create(self, serializer):
        """Create a new board"""
        serializer.save() # user=self.request.user


# ------------------------------------------------------
# ------------------- Thread Viewset -------------------
# ------------------------------------------------------
class ThreadViewSet(viewsets.ModelViewSet):
    """A viewset that provides the standard actions for 'Thread' model"""
    serializer_class = serializers.ThreadSerializer

    def get_queryset(self):
        """Retrieve the threads which apply to board_id=boards_pk"""
        if 'boards_pk' in self.kwargs:
            return Thread.objects.filter(
                board_id=self.kwargs['boards_pk']
            ).order_by('created')
        else:
            return Thread.objects.all().order_by('created')
    
    def get_serializer_class(self):
        """Return appropriate serializer class"""
        return self.serializer_class
    
    def perform_create(self, serializer):
        """Create a new thread"""
        serializer.save(board_id=self.kwargs['boards_pk'])


# ----------------------------------------------------
# ------------------- Post Viewset -------------------
# ----------------------------------------------------
class PostViewSet(viewsets.ModelViewSet):
    """A viewset that provides the standard actions for 'Post' model"""
    serializer_class = serializers.PostSerializer
    
    def get_queryset(self):
        """Retrieve the posts which apply to thread_id=threads_pk"""
        if 'threads_pk' in self.kwargs:
            return Post.objects.filter(
                board_id=self.kwargs['boards_pk'], 
                thread_id=self.kwargs['threads_pk']
            ).order_by('created')
        else:
            return Post.objects.all().order_by('created')

    def get_serializer_class(self):
        """Return appropriate serializer class"""
        return self.serializer_class
    
    def perform_create(self, serializer):
        """Create a new thread"""
        serializer.save(board_id=self.kwargs['boards_pk'], thread_id=self.kwargs['threads_pk'])
