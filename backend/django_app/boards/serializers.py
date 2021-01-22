from rest_framework import serializers

from .models import Post, Thread, Board



class BoardSerializer(serializers.ModelSerializer):
    """Serializer for board object"""

    threads = serializers.PrimaryKeyRelatedField(
        many=True,
        read_only=True
    )

    class Meta:
        model = Board
        fields = (
            'creator', 'created', 'updated', 
            'id', 'isPrivate', 'isOfficial', 
            'tag', 'title', # 'slug', 
            'description', 'maxThreads', 'fileName', 
            'thumbnail', 'image', 'link',
            'threads',  
        )
        read_only_Fields = ('id',)
        extra_kwargs = {'getID':{'read_only':True,}}



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
        extra_kwargs = {'getID':{'read_only':True,}}

        
class PostSerializer(serializers.ModelSerializer):
    """Serializer for post object"""

    class Meta:
        model = Post
        fields = ('id', 'is_op', 'is_pinned', 'getID', 'text', 'file_name', 'image', )
        read_only_Fields = ('id',)
        extra_kwargs = {'getID':{'read_only':True,}}



