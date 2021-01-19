import os.path
import uuid
from django.db import models
from django.conf import settings
from django.core.files.base import ContentFile
from datetime import datetime
from io import BytesIO
from PIL import Image

def get_board_image_upload_to(instance, filename):
    """ Returns a valid upload path for an image file associated with a board instance. """
    return instance.get_image_upload_to(filename)

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
                creator=post_data['creator'],
            )
            post.save(using=self._db)
            return post

class Post(models.Model):
    """Post object"""   
    text        = models.TextField()
    creator     = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_at  = models.DateTimeField(auto_now_add=True)
    updated_at  = models.DateTimeField(auto_now=True)

    objects = PostManager()

    # def __str__(self):
    #     return self.title

# --------------------------------------------------
# ---------------------- Page ----------------------
# --------------------------------------------------
class PageManager(models.Manager):
    """Page Manager object"""
    def create_page(self, page_data):
        errors = []

        if errors:
            return errors
        else:
            page = Page.objects.create(
                creator=page_data['creator'],
            )
            page.save(using=self._db)
            return page

class Page(models.Model):
    """Page object"""   
    creator     = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_at  = models.DateTimeField(auto_now_add=True)
    updated_at  = models.DateTimeField(auto_now=True)
    posts       = models.ManyToManyField("self", blank=True, related_name="Post")

    objects = PageManager()

    # def __str__(self): TODO return first post title
    #     return self.title


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
                is_private=False,
                title=board_data['title'],
                creator=board_data['creator'],
                description=board_data['description'],
            )
            board.save(using=self._db)
            return board


class Board(models.Model):
    """Board object"""   
    is_private   = models.BooleanField()
    title       = models.CharField(max_length=255)
    creator     = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    description = models.CharField(max_length=255, default=None, blank=True, null=True)
    thumbnail   = models.ImageField(upload_to="boards", default=None, blank=True, null=True) 
    created_at  = models.DateTimeField(auto_now_add=True)
    updated_at  = models.DateTimeField(auto_now=True)
    pages       = models.ManyToManyField("self", blank=True, related_name="Page")

    objects = BoardManager()

    def __str__(self):
        return self.title