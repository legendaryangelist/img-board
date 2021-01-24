import pytz
import uuid
from datetime import datetime
from io import BytesIO
from django.db import models
from django.conf import settings
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _
from django.core.files.base import ContentFile
from django.core.exceptions import ValidationError
# from mptt.models import MPTTModel, TreeForeignKey


# From settings.py
MIN_THREADS = settings.MIN_THREADS
MAX_THREADS = settings.MAX_THREADS
MIN_POSTS = settings.MIN_POSTS
MAX_POSTS = settings.MAX_POSTS
BOARD_THUMB_SIZE = settings.BOARD_THUMB_SIZE
POST_THUMB_SIZE = settings.POST_THUMB_SIZE
MAX_UPLOAD_SIZE = settings.MAX_UPLOAD_SIZE
ALLOWED_EXTENSIONS = settings.ALLOWED_EXTENSIONS


def get_image_upload_to(instance, filename):
    """ Returns a valid upload path for an image file associated with a board instance. """
    return instance.get_image_upload_to(filename)


class BaseModelManager(models.Manager):
    """ Represents a basic manager model."""
    
    def update_validated_data(self, validated_data):
        validated_data['creator'] = "Anonymous" if not validated_data['creator'] else validated_data['creator']
        validated_data['created'] = datetime.now(pytz.utc)
        validated_data['updated'] = datetime.now(pytz.utc)

        if validated_data["image"]:
            if validated_data["image"].name.find(".") == -1:
                errors.append("Image must be '.jpg', '.jpeg', '.gif', or '.png'")
            elif validated_data["image"].name.split(".")[-1].lower() not in ALLOWED_EXTENSIONS:
                errors.append("Image must be '.jpg', '.jpeg', '.gif', or '.png'")
            elif validated_data["image"]._size > MAX_UPLOAD_SIZE:
                errors.append("Image size must be 5MB or less")
            else:
                # image = validated_data["image"]
                fileName = "{}.{}".format(uuid.uuid4().hex, validated_data["image"].name.split(".")[-1])
        else:
            validated_data["image"] = None
            validated_data["fileName"] = None
    
        return validated_data

class BaseModel(models.Model):
    """ Represents a basic model.
    An abstract base class model that provides a name, created and a updated fields to store creation date
    and last updated date.
    """
    # creator = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True, null=True)

    id          = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False, verbose_name=_('Unique ID')) 
    creator     = models.CharField(default='Anonymous', max_length=255, blank=True, null=True, verbose_name=_('Creator'))
    created     = models.DateTimeField(auto_now_add=True, verbose_name=_('Creation date'))
    updated     = models.DateTimeField(auto_now=True, verbose_name=_('Update date'))
    fileName    = models.CharField(default=None, max_length=255, blank=True, null=True, verbose_name=_('File name'))
    thumbnail   = models.ImageField(default=None, blank=True, null=True, upload_to=get_image_upload_to, verbose_name=_('Thumbnail'))
    image       = models.ImageField(default=None, blank=True, null=True, upload_to=get_image_upload_to, verbose_name=_('Image'))  
    link        = models.URLField(default=None, null=True, blank=True, verbose_name=_('Link'))
    # slug        = models.SlugField(unique=True, max_length=255, blank=True, null=True, verbose_name=_('Slug'))

    class Meta:
        abstract = True


# ---------------------------------------------------
# ---------------------- Board ----------------------
# ---------------------------------------------------
class BoardManager(BaseModelManager):
    """Board Manager object"""
    def create_board(self, **validated_data):

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
        board = Board.objects.create(
                creator=validated_data['creator'],
                created=validated_data['created'],
                updated=validated_data['updated'],
                isPrivate=validated_data['isPrivate'],
                tag=validated_data['tag'],
                title=validated_data['title'],               
                description=validated_data['description'],
                maxThreads=validated_data['maxThreads'],
                image=validated_data['image'],
                fileName=validated_data['fileName'],
            )
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
        return str('/' + self.tag + '/')




# --------------------------------------------------------------------
# ---------------------- Base Thread/Post Model ----------------------
# --------------------------------------------------------------------
class BasePostModel(BaseModel):
    """ Represents a basic post model. """
    text        = models.TextField(default=None, max_length=20000, blank=True, null=True, verbose_name=_('Text'))
    replies     = models.ManyToManyField("self", blank=True, verbose_name=_('Replies'))
    replies_to  = models.ManyToManyField("self", blank=True, verbose_name=_('Replies To'))

    class Meta:
        abstract = True



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
                creator=validated_data['creator'],
                created=validated_data['created'],
                updated=validated_data['updated'],
                isPinned=validated_data['isPinned'],
                isPruned=validated_data['isPruned'],
                subject=validated_data['subject'],
                text=validated_data['text'],               
                maxPosts=validated_data['maxPosts'],
                image=validated_data['image'],
                fileName=validated_data['fileName'],
                board=validated_data['board'],
            )
        thread.save(using=self._db)
        return thread

class Thread(BasePostModel):
    """Thread object - a.k.a OP"""   

    subject     = models.CharField(default=None, max_length=255, verbose_name=_('Subject'))
    isPinned    = models.BooleanField(default=False, verbose_name=_('Is Pinned'))
    isPruned    = models.BooleanField(default=False, verbose_name=_('Is Pruned'))
    maxPosts    = models.IntegerField(default=MAX_POSTS, verbose_name=_('Max Posts'))
    board       = models.ForeignKey("Board", related_name='threads', blank=True, null=True, on_delete=models.CASCADE, verbose_name=_('Board'))

    objects     = ThreadManager()

    def __str__(self):
        return str(self.subject)



# --------------------------------------------------
# ---------------------- Post ----------------------
# --------------------------------------------------
class PostManager(BaseModelManager):
    """Post Manager object"""
    def create_post(self, **post_data):


        post = Post.objects.create(
                creator=post_data['creator'],
                text=post_data['text'],                
            )
        post.save(using=self._db)
        return post


class Post(BasePostModel):
    """Post object"""   
    
    board       = models.ForeignKey("Board", related_name='posts', blank=True, null=True, on_delete=models.CASCADE, verbose_name=_('Board'))
    thread      = models.ForeignKey("Thread", related_name='posts', blank=True, null=True, on_delete=models.CASCADE, verbose_name=_('Thread'))

    objects     = PostManager()

    def __str__(self):
        return str(self.id)