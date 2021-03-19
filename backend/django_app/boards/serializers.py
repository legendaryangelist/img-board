from rest_framework import serializers

from core.models import Post, Thread, Board

class BoardSerializer(serializers.ModelSerializer):
    """Serializer for board object"""
    id      = serializers.UUIDField(format='hex', read_only=True)
    threads = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Board
        fields = (
            'id', 
            'creator', 'created', 'updated', 
            'isPrivate',
            'tag', 'title', 'link', # 'slug', 
            'description', 'maxThreads',
            'fileName', 'thumbnail', 'image',
            'threads',  
        )
        read_only_Fields = ('id',)
        extra_kwargs = {
            'id':{'read_only':True,},
            'link':{'read_only':True,},
            'fileName':{'read_only':True,},
            'thumbnail':{'read_only':True,},
        }
    
    def create(self, validated_data):
        """Create a new board and return it"""
        return Board.objects.create_board(**validated_data)

    def update(self, instance, validated_data):
        """Update a board and return it"""
        return Board.objects.update_board(instance, validated_data)



class ThreadSerializer(serializers.ModelSerializer):
    """Serializer for thread object"""
    id      = serializers.UUIDField(format='hex', read_only=True)
    posts   = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Thread
        fields = (
            'id', 
            'creator', 'created', 'updated', 
            'isPinned', 'isPruned',
            'subject', 'text',
            'maxPosts', 
            'fileName', 'thumbnail', 'image',
            'board', 'posts',  
        )
        read_only_Fields = ('id', )
        extra_kwargs = {
            'id':{'read_only':True,},
            'board':{'read_only':True,},
            'isPruned':{'read_only':True,},
            'link':{'read_only':True,},
            'fileName':{'read_only':True,},
            'thumbnail':{'read_only':True,},
        }

    def create(self, validated_data):
        """Create a new thread and return it"""
        return Thread.objects.create_thread(**validated_data)
        

class PostSerializer(serializers.ModelSerializer):
    """Serializer for post object"""
    id       = serializers.UUIDField(format='hex', read_only=True)
    replyto  = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Post
        fields = (
            'id', 
            'creator', 'created', 'updated', 
            'text',
            'replyto',
            'fileName', 'thumbnail', 'image',
            'board', 'thread',  
        )
        read_only_Fields = ('id',)
        extra_kwargs = {
            'id':{'read_only':True,},
            'board':{'read_only':True,},
            'thread':{'read_only':True,},
            'link':{'read_only':True,},
            'fileName':{'read_only':True,},
            'thumbnail':{'read_only':True,},
        }

    def create(self, validated_data):
        """Create a new post and return it"""
        return Post.objects.create_post(**validated_data)



