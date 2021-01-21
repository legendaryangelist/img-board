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

    
    def _params_to_ints(self, qs):
        """Convert a list of string IDs to a list of integers"""
        return [int(str_id) for str_id in qs.split(',')]


    def get_queryset(self):
        """Retrieve the boards"""
        threads = self.request.query_params.get('threads')
        queryset = self.queryset
        if threads:
            thread_ids = self._params_to_ints(threads)
            queryset = queryset.filter(threads__id__in=thread_ids)

        return queryset # .filter(user=self.request.user)
    
    def get_serializer_class(self):
        """Return appropriate serializer class"""
        return self.serializer_class
    
    def perform_create(self, serializer):
        """Create a new recipe"""
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
