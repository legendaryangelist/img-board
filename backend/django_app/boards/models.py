import os
import pytz
import uuid
import logging
from datetime import datetime
from io import BytesIO
from django.db import models
from django.conf import settings
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _
from django.core.files.base import ContentFile
from django.core.exceptions import ValidationError
from easy_thumbnails.fields import ThumbnailerImageField
from versatileimagefield.fields import VersatileImageField, PPOIField
from versatileimagefield.placeholder import OnStoragePlaceholderImage

# From settings.py
MIN_THREADS = settings.MIN_THREADS
MAX_THREADS = settings.MAX_THREADS
MIN_POSTS = settings.MIN_POSTS
MAX_POSTS = settings.MAX_POSTS
BOARD_THUMB_SIZE = settings.BOARD_THUMB_SIZE
POST_THUMB_SIZE = settings.POST_THUMB_SIZE
MAX_UPLOAD_SIZE = settings.MAX_UPLOAD_SIZE
ALLOWED_EXTENSIONS = settings.ALLOWED_EXTENSIONS

logger = logging.getLogger(__name__)

class BaseModelManager(models.Manager):
    """ Represents a basic manager model."""
    
    def update_image_data(self, validated_data):
        if validated_data["image"]:
            if validated_data["image"].name.find(".") == -1:
                errors.append("Image must be '.jpg', '.jpeg', '.gif', or '.png'")
            elif validated_data["image"].name.split(".")[-1].lower() not in ALLOWED_EXTENSIONS:
                errors.append("Image must be '.jpg', '.jpeg', '.gif', or '.png'")
            elif validated_data["image"].size > MAX_UPLOAD_SIZE:
                errors.append("Image size must be 5MB or less")
            else:
                validated_data["fileName"] = "{}.{}".format(uuid.uuid4().hex, validated_data["image"].name.split(".")[-1])
                validated_data["image"].name = validated_data["fileName"]
                validated_data["thumbnail"] = validated_data["image"]
               
        else:
            validated_data["fileName"] = None
            validated_data["image"] = None
            validated_data["thumbnail"] = None


    def update_validated_data(self, validated_data):
        validated_data['creator'] = "Anonymous" if not validated_data['creator'] else validated_data['creator']
        validated_data['created'] = datetime.now(pytz.utc)
        validated_data['updated'] = validated_data['created']
        self.update_image_data(validated_data)
    
        return validated_data
    

    def delete_image_and_thumbnail(self, instance):
        if instance.image:
            name = instance.image
            try:
                os.remove(os.path.join(settings.MEDIA_ROOT, str(name)))
                instance.image.delete()
            except Exception as e:
                logger.warning(e)
        if instance.thumbnail:
            name = instance.thumbnail
            try:
                os.remove(os.path.join(settings.MEDIA_ROOT, str(name)))
                instance.thumbnail.delete()
            except Exception as e:
                logger.warning(e)
        
        return instance




class BaseModel(models.Model):
    """ Represents a basic model.
    An abstract base class model that provides a name, created and a updated fields to store creation date
    and last updated date.
    """

    id          = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False, verbose_name=_('Unique ID')) 
    creator     = models.CharField(default='Anonymous', max_length=255, blank=True, null=True, verbose_name=_('Creator'))
    created     = models.DateTimeField(auto_now_add=True, verbose_name=_('Creation date'))
    updated     = models.DateTimeField(auto_now=True, verbose_name=_('Update date'))
    link        = models.URLField(default=None, null=True, blank=True, verbose_name=_('Link'))
    image       = VersatileImageField(default=None, blank=True, null=True, verbose_name=_('Image'),
                                        placeholder_image=OnStoragePlaceholderImage(path='rein.jpg'),
                                        ppoi_field='ppoi')
    thumbnail   = ThumbnailerImageField(default=None, blank=True, null=True, verbose_name=_('Thumbnail'), resize_source=dict(size=(200, 200)))
    fileName    = models.CharField(default=None, max_length=255, blank=True, null=True, verbose_name=_('File name'))
    ppoi        = PPOIField('Image PPOI')

    # slug        = models.SlugField(unique=True, max_length=255, blank=True, null=True, verbose_name=_('Slug'))
    # creator     = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True, null=True)
    # image       = models.ImageField(default=None, blank=True, null=True, verbose_name=_('Image'))
    # thumbnail   = models.ImageField(default=None, blank=True, null=True, verbose_name=_('Thumbnail'))
    # fileName    = models.CharField(default=None, max_length=255, blank=True, null=True, verbose_name=_('File name'))


    class Meta:
        abstract = True


# ---------------------------------------------------
# ---------------------- Board ----------------------
# ---------------------------------------------------
class BoardManager(BaseModelManager):
    """Board Manager object"""

    # Create Board
    def create_board(self, **validated_data):
        """Creates a new board from validate_data and returns it"""

        self.update_validated_data(validated_data)

        if 'isPrivate' not in validated_data:
            validated_data['isPrivate'] = False

        if 'tag' not in validated_data:
            raise ValidationError(message="No 'tag' provided, please provide a unique 'tag'.")

        if 'title' not in validated_data:
            raise ValidationError(message="No 'title' provided, please provide a unique 'title'.")
        
        if 'description' not in validated_data:
            validated_data['description'] = None
        
        if 'maxThreads' in validated_data:
            if validated_data['maxThreads']:
                if validated_data['maxThreads'] < MIN_THREADS:
                    validated_data['maxThreads'] = MIN_THREADS
                elif validated_data['maxThreads'] > MAX_THREADS:
                    validated_data['maxThreads'] = MAX_THREADS
            else:
                validated_data['maxThreads'] = MAX_THREADS
        else:
            validated_data['maxThreads'] = MAX_THREADS
        
        # Create object, save and return
        print("Creating Board - /" + str(validated_data['tag']) + "/")
        board = Board.objects.create(
                # id=validated_data['id'],
                creator=validated_data['creator'],
                created=validated_data['created'],
                updated=validated_data['updated'],
                isPrivate=validated_data['isPrivate'],
                tag=validated_data['tag'],
                title=validated_data['title'],               
                description=validated_data['description'],
                maxThreads=validated_data['maxThreads'],
                image=validated_data['image'],
                thumbnail=validated_data['thumbnail'],
                fileName=validated_data["fileName"],
            )
        board.save(using=self._db)
        return board
    
    # Update Board
    def update_board(self, instance, validated_data):
        """Updates and existing board from validate_data and returns it"""
        updated = 0
        board = Board.objects.get(id=instance.id)

        # if 'tag' in validated_data:
        #     if board.tag != validated_data['tag']:
        #         raise ValidationError(message="Cannot change 'tag' of a Board.")

        if 'title' in validated_data:
            if board.title != validated_data['title']:
                board.title=validated_data['title'] 
                updated = 1
        
        if 'description' in validated_data:
            if board.description != validated_data['description']:
                board.description=validated_data['description'] 
                updated = 1

        if 'isPrivate' in validated_data:
            if board.isPrivate != validated_data['isPrivate']:
                board.isPrivate=validated_data['isPrivate'] 
                updated = 1
                
        if 'image' in validated_data:
            if validated_data['image'] and board.image != validated_data['image']:
                # Delete image from db
                board = self.delete_image_and_thumbnail(board)

                # Update with new image
                self.update_image_data(validated_data)
                board.image=validated_data['image']
                board.thumbnail=validated_data['thumbnail']
                board.fileName=validated_data["fileName"]
                updated = 1
        
        if 'maxThreads' in validated_data:
            if board.maxThreads != validated_data['maxThreads']:
                if validated_data['maxThreads'] < MIN_THREADS:
                    board.maxThreads = MIN_THREADS
                elif validated_data['maxThreads'] > MAX_THREADS:
                    board.maxThreads = MAX_THREADS
                else:
                    board.maxThreads = validated_data['maxThreads']
                updated = 1

        if updated:
            print("Updating Board - /" + str(instance.tag) + "/")
            board.updated=datetime.now(pytz.utc)
            board.save(using=self._db)
        
        return board



class Board(BaseModel):
    """Board object"""  
    isPrivate   = models.BooleanField(default=False, verbose_name=_('Is Private'))
    tag         = models.CharField(default=None, max_length=10, unique=True, verbose_name=_('Tag'))     # Must field
    title       = models.CharField(default=None, max_length=100, unique=True, verbose_name=_('Title'))  # Must field
    description = models.CharField(default=None, max_length=255, blank=True, null=True, verbose_name=_('Description'))
    maxThreads  = models.IntegerField(default=MAX_THREADS, blank=True, null=True, verbose_name=_('Max Threads'))

    objects = BoardManager()

    def __str__(self):
        return str('/'+self.tag+'/')



# ----------------------------------------------------
# ---------------------- Thread ----------------------
# ----------------------------------------------------
class ThreadManager(BaseModelManager):
    """Thread Manager object"""
    def create_thread(self, **validated_data):

        self.update_validated_data(validated_data)

        if 'isPinned' not in validated_data:
            validated_data['isPinned'] = False
        
        if 'isPruned' not in validated_data:
            validated_data['isPruned'] = False

        if 'subject' not in validated_data:
            raise ValidationError(message="No 'subject' provided, please provide a 'subject'.")

        if 'text' not in validated_data:
            validated_data['text'] = ''
        
        if 'maxPosts' in validated_data:
            if validated_data['maxPosts']:
                if validated_data['maxPosts'] < MIN_POSTS:
                    validated_data['maxPosts'] = MIN_POSTS
                elif validated_data['maxPosts'] > MAX_POSTS:
                    validated_data['maxPosts'] = MAX_POSTS
            else:
                validated_data['maxPosts'] = MAX_POSTS
        else:
            validated_data['maxPosts'] = MAX_POSTS

        if 'board_id' not in validated_data:
            raise ValidationError(message="Something went wrong with retrieving the Board id when creating a new Thread.")
        board_id_query = Board.objects.get(id=validated_data['board_id'])
        if board_id_query:
            validated_data['board'] = board_id_query
        else:
            raise ValidationError(message="Something went wrong with retrieving the Board id when creating a new Thread.")

        # Create object, save and return
        thread = Thread.objects.create(
                # id=validated_data['id'],
                creator=validated_data['creator'],
                created=validated_data['created'],
                updated=validated_data['updated'],
                isPinned=validated_data['isPinned'],
                isPruned=validated_data['isPruned'],
                subject=validated_data['subject'],
                text=validated_data['text'],               
                maxPosts=validated_data['maxPosts'],
                image=validated_data['image'],
                thumbnail=validated_data['thumbnail'],
                fileName=validated_data["fileName"],
                board=validated_data['board'],
            )
        thread.save(using=self._db)
        return thread

class Thread(BaseModel):
    """Thread object - a.k.a OP"""   
    isPinned    = models.BooleanField(default=False, verbose_name=_('Is Pinned'))
    isPruned    = models.BooleanField(default=False, verbose_name=_('Is Pruned'))
    subject     = models.CharField(default=None, max_length=255, verbose_name=_('Subject'))
    text        = models.TextField(default=None, max_length=40000, blank=True, null=True, verbose_name=_('Text'))
    maxPosts    = models.IntegerField(default=MAX_POSTS, verbose_name=_('Max Posts'))
    board       = models.ForeignKey("Board", related_name='threads', blank=True, null=True, on_delete=models.CASCADE, verbose_name=_('Board'))

    objects     = ThreadManager()

    def __str__(self):
        board_id_query = Board.objects.get(tag=str(self.board).replace('/',''))
        subjectShorter = (self.subject[:20] + '..') if len(self.subject) > 20 else self.subject
        return str(str(board_id_query)+' '+subjectShorter)



# --------------------------------------------------
# ---------------------- Post ----------------------
# --------------------------------------------------
class PostManager(BaseModelManager):
    """Post Manager object"""
    def create_post(self, **validated_data):
        self.update_validated_data(validated_data)

        if 'text' not in validated_data:
            validated_data['text'] = ''

        # Get Board ID
        if 'board_id' not in validated_data:
            raise ValidationError(message="Something went wrong with retrieving the Board id when creating a new Post.")
        board_id_query = Board.objects.get(id=validated_data['board_id'])
        if board_id_query:
            validated_data['board'] = board_id_query
        else:
            raise ValidationError(message="Something went wrong with retrieving the Board id when creating a new Post.")
        
        # Get Thread ID
        if 'thread_id' not in validated_data:
            raise ValidationError(message="Something went wrong with retrieving the Thread id when creating a new Post.")
        thread_id_query = Thread.objects.get(id=validated_data['thread_id'])
        if thread_id_query:
            validated_data['thread'] = thread_id_query
        else:
            raise ValidationError(message="Something went wrong with retrieving the Thread id when creating a new Post.")
        
        # TODO Check at least text or image
        # TODO Fix replyto

        # Create object, save and return
        post = Post.objects.create(
                # id=validated_data['id'],
                creator=validated_data['creator'],
                created=validated_data['created'],
                updated=validated_data['updated'],
                text=validated_data['text'],               
                image=validated_data['image'],
                thumbnail=validated_data['thumbnail'],
                fileName=validated_data["fileName"],
                board=validated_data['board'],  
                thread=validated_data['thread'],               
            )
        post.save(using=self._db)
        return post


class Post(BaseModel):
    """Post object"""   
    text        = models.TextField(default=None, max_length=40000, blank=True, verbose_name=_('Text'))
    board       = models.ForeignKey("Board", related_name='posts', blank=True, null=True, on_delete=models.CASCADE, verbose_name=_('Board'))
    thread      = models.ForeignKey("Thread", related_name='posts', blank=True, null=True, on_delete=models.CASCADE, verbose_name=_('Thread'))
    replyto     = models.ForeignKey("Post", related_name='posts', blank=True, null=True, on_delete=models.CASCADE, verbose_name=_('Replies To'))

    objects     = PostManager()

    def __str__(self):
        board_id_query = Board.objects.get(tag=str(self.board).replace('/',''))
        textShorter = (self.text[:20] + '..') if len(self.text) > 20 else self.text
        return str(str(board_id_query)+' '+textShorter)