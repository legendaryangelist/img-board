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
            'id', 
            'creator', 'created', 'updated', 
            'isPrivate',
            'tag', 'title', # 'slug', 
            'description', 'maxThreads', 'link',
            'fileName', 'thumbnail', 'image', 
            'threads',  
        )
        read_only_Fields = ('id',)
        extra_kwargs = {
            'link':{'read_only':True,},
            'fileName':{'read_only':True,},
            'thumbnail':{'read_only':True,},
        }
    
    def create(self, validated_data):
        """Create a new board and return it"""
        return Board.objects.create_board(validated_data)

    # def update(self, instance, validated_data):
    #     """Update a user, setting the password correctly and return it"""
    #     password = validated_data.pop('password', None)
    #     user = super().update(instance, validated_data)

    #     if password:
    #         user.set_password(password)
    #         user.save()
            
    #     return user



class ThreadSerializer(serializers.ModelSerializer):
    """Serializer for thread object"""

    posts       = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    replies     = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    replies_to  = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Thread
        fields = (
            'id', 
            'creator', 'created', 'updated', 
            'isPinned', 'isPruned',
            'subject', 'text',
            'replies', 'replies_to', 'maxPosts', 
            'fileName', 'thumbnail', 'image', 
            'board', 'posts',  
        )
        read_only_Fields = ('id', )
        extra_kwargs = {
            'isPruned':{'read_only':True,},
            'link':{'read_only':True,},
            'fileName':{'read_only':True,},
            'thumbnail':{'read_only':True,},
        }

    # def create(self, validated_data):
    #     """Create a new thread and return it"""
    #     return Thread.objects.create_thread(validated_data)
        

class PostSerializer(serializers.ModelSerializer):
    """Serializer for post object"""

    replies     = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    replies_to  = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Post
        fields = (
            'id', 
            'creator', 'created', 'updated', 
            'text',
            'replies', 'replies_to',
            'fileName', 'thumbnail', 'image', 
            'board', 'thread',  
        )
        read_only_Fields = ('id',)
        extra_kwargs = {
            'link':{'read_only':True,},
            'fileName':{'read_only':True,},
            'thumbnail':{'read_only':True,},
        }

    # def create(self, validated_data):
    #     """Create a new post and return it"""
    #     return Post.objects.create_post(validated_data)



