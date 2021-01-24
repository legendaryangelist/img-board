from rest_framework import viewsets, mixins, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Post, Thread, Board

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
        return Board.objects.all()  # Return all boards queryset to reload REST Viewset
    
    def get_serializer_class(self):
        """Return appropriate serializer class"""
        return self.serializer_class
    
    def perform_create(self, serializer):
        """Create a new board"""
        serializer.save() # user=self.request.user

    @action(methods=['POST'], detail=True, url_path='upload-image')
    def upload_image(self, request, pk=None):
        """Upload an image to a board"""
        board = self.get_object()
        serializer = self.get_serializer(
            board,
            data=request.data
        )

        if serializer.is_valid():
            serializer.save()
            return Response(
                serializer.data,
                status=status.HTTP_200_OK
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )




# ------------------------------------------------------
# ------------------- Thread Viewset -------------------
# ------------------------------------------------------
class ThreadViewSet(viewsets.ModelViewSet):
    """A viewset that provides the standard actions for 'Thread' model"""
    serializer_class = serializers.ThreadSerializer

    def get_queryset(self):
        """Retrieve the threads which apply to board_id=boards_pk"""
        if 'boards_pk' in self.kwargs:
            return Thread.objects.filter(board_id=self.kwargs['boards_pk'])
        else:
            return Thread.objects.all()
    
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
            return Post.objects.filter(board_id=self.kwargs['boards_pk'], thread_id=self.kwargs['threads_pk'])
        else:
            return Post.objects.all()

    def get_serializer_class(self):
        """Return appropriate serializer class"""
        return self.serializer_class
    
    def perform_create(self, serializer):
        """Create a new thread"""
        serializer.save(board_id=self.kwargs['boards_pk'], thread_id=self.kwargs['threads_pk'])
