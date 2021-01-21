import os.path
import uuid
from django.db import models
from django.conf import settings
from django.core.files.base import ContentFile
from mptt.models import MPTTModel, TreeForeignKey
from datetime import datetime
from django.utils.translation import gettext_lazy as _
from io import BytesIO
from PIL import Image

def get_image_upload_to(instance, filename):
    """ Returns a valid upload path for an image file associated with a board instance. """
    return instance.get_image_upload_to(filename)


class CreatedModel(models.Model):
    """ Represents an abstract dated model.

    An abstract base class model that provides a name, created and a updated fields to store creation date
    and last updated date.

    """
    name    = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True, verbose_name=_('Creation date'))
    updated = models.DateTimeField(auto_now=True, verbose_name=_('Update date'))

    class Meta:
        abstract = True


# --------------------------------------------------
# ---------------------- Post ----------------------
# --------------------------------------------------
class PostManager(models.Manager):
    """Post Manager object"""
    def create_post(self, post_data):
        errors = []

        if errors:
            return errors
        else:
            post = Post.objects.create(
                text=post_data['text'],
                name=post_data['name'],
            )
            post.save(using=self._db)
            return post

class Post(CreatedModel):
    """Post object"""   
    
    is_op       = models.BooleanField(default=False)
    is_pinned   = models.BooleanField(default=False)
    getID       = models.CharField(default=uuid.uuid4, max_length=36)
    text        = models.TextField(default=None, max_length=20000)
    replies     = models.ManyToManyField("self", blank=True)  
    file_name   = models.CharField(default=None, max_length=255, blank=True, null=True)
    thumbnail   = models.ImageField(default=None, blank=True, null=True, upload_to=get_image_upload_to)
    image       = models.ImageField(default=None, blank=True, null=True, upload_to=get_image_upload_to)

    objects = PostManager()

    def __str__(self):
        return self.getID

# --------------------------------------------------
# ---------------------- Thread ----------------------
# --------------------------------------------------
class ThreadManager(CreatedModel):
    """Thread Manager object"""
    def create_thread(self, thread_data):
        errors = []

        if errors:
            return errors
        else:
            thread = Thread.objects.create(
                name=thread_data['name'],
            )
            thread.save(using=self._db)
            return thread

class Thread(models.Model):
    """Thread object"""   

    is_pinned   = models.BooleanField(default=False)
    getID       = models.CharField(default=uuid.uuid4, max_length=36)
    subject     = models.CharField(default=None, max_length=255, blank=True, null=True)
    posts       = models.ForeignKey(Post, on_delete=models.CASCADE, blank=True, null=True)

    objects = ThreadManager()

    def __str__(self):
        return self.getID


# ---------------------------------------------------
# ---------------------- Board ----------------------
# ---------------------------------------------------
class BoardManager(models.Manager):
    """Board Manager object"""
    def create_board(self, board_data):
        errors = []

        if errors:
            return errors
        else:
            board = Board.objects.create(
                name=board_data['name'],
                tag=board_data['tag'],
                title=board_data['title'],               
                description=board_data['description'],
            )
            board.save(using=self._db)
            return board


class Board(models.Model):
    """Board object"""   
    is_private  = models.BooleanField(default=False)
    is_official = models.BooleanField(default=False)
    getID       = models.CharField(default=uuid.uuid4, max_length=36)
    tag         = models.CharField(default=None, max_length=10)
    title       = models.CharField(default=None, max_length=100)
    description = models.CharField(default=None, max_length=255, blank=True, null=True)
    file_name   = models.CharField(default=None, max_length=255, blank=True, null=True)
    thumbnail   = models.ImageField(default=None, blank=True, null=True, upload_to=get_image_upload_to)
    image       = models.ImageField(default=None, blank=True, null=True, upload_to=get_image_upload_to)    
    threads     = models.ForeignKey(Thread, on_delete=models.CASCADE, blank=True, null=True)

    objects = BoardManager()

    def __str__(self):
        return self.tag