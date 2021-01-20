from rest_framework import serializers

from .models import Post, Thread, Board


class PostSerializer(serializers.ModelSerializer):
    """Serializer for post object"""

    class Meta:
        model = Post
        fields = ('id', 'is_op', 'is_pinned','text',)
        read_only_Fields = ('id',)


class ThreadSerializer(serializers.ModelSerializer):
    """Serializer for thread object"""

    posts = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Post.objects.all()
    )

    class Meta:
        model = Thread
        fields = ('id', 'is_pinned', 'getID', 'subject', 'posts',)
        read_only_Fields = ('id',)


class BoardSerializer(serializers.ModelSerializer):
    """Serializer for board object"""

    threads = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Thread.objects.all()
    )

    class Meta:
        model = Board
        fields = ('is_private', 'is_official', 'getID', 'tag', 'title', 'description', 'threads',)
        read_only_Fields = ('id',)