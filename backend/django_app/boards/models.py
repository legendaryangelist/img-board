import pytz
import uuid
from datetime import datetime
from io import BytesIO
from django.db import models
from django.conf import settings
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _
from django.core.files.base import ContentFile
# from mptt.models import MPTTModel, TreeForeignKey


# From settings.py
MAX_THREADS = settings.MAX_THREADS
MAX_POSTS = settings.MAX_POSTS
BOARD_THUMB_SIZE = settings.BOARD_THUMB_SIZE
POST_THUMB_SIZE = settings.POST_THUMB_SIZE
MAX_UPLOAD_SIZE = settings.MAX_UPLOAD_SIZE
ALLOWED_EXTENSIONS = settings.ALLOWED_EXTENSIONS


def get_image_upload_to(instance, filename):
    """ Returns a valid upload path for an image file associated with a board instance. """
    return instance.get_image_upload_to(filename)



class BaseModel(models.Model):
    """ Represents a basic model.

    An abstract base class model that provides a name, created and a updated fields to store creation date
    and last updated date.

    """
    
    id          = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False, verbose_name=_('Unique ID')) 
    # creator = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True, null=True)
    creator     = models.CharField(default='Anonymous', max_length=255, blank=True, null=True, verbose_name=_('Creator'))
    created     = models.DateTimeField(auto_now_add=True, verbose_name=_('Creation date'))
    updated     = models.DateTimeField(auto_now=True, verbose_name=_('Update date'))
    fileName    = models.CharField(default=None, max_length=255, blank=True, null=True, verbose_name=_('File name'))
    thumbnail   = models.ImageField(default=None, blank=True, null=True, upload_to=get_image_upload_to, verbose_name=_('Thumbnail'))
    image       = models.ImageField(default=None, blank=True, null=True, upload_to=get_image_upload_to, verbose_name=_('Image'))  

    class Meta:
        abstract = True


# ---------------------------------------------------
# ---------------------- Board ----------------------
# ---------------------------------------------------
class BoardManager(models.Manager):
    """Board Manager object"""
    def create_board(self, board_data):
        errors = []

        creator = "Anonymous" if not board_data['creator'] else board_data['creator']
        created = datetime.now(pytz.utc)
        updated = datetime.now(pytz.utc)
        isPrivate = board_data['isPrivate'] if board_data['isPrivate'] else False
        tag = board_data['tag']
        title = board_data['title']
        description = board_data['description']
        maxThreads = board_data['maxThreads'] if board_data['maxThreads'] <= MAX_THREADS else MAX_THREADS
        link = board_data['link'] if board_data['link'] else None
        
        if board_data["image"]:
            if board_data["image"].name.find(".") == -1:
                errors.append("Image must be '.jpg', '.jpeg', '.gif', or '.png'")
            elif board_data["image"].name.split(".")[-1].lower() not in ALLOWED_EXTENSIONS:
                errors.append("Image must be '.jpg', '.jpeg', '.gif', or '.png'")
            elif board_data["image"]._size > MAX_UPLOAD_SIZE:
                errors.append("Image size must be 5MB or less")
            else:
                image = board_data["image"]
                fileName = "{}.{}".format(uuid.uuid4().hex, board_data["image"].name.split(".")[-1])
        else:
            image = None
            fileName = None

        if errors:
            return errors
        else:
            board = Board.objects.create(
                creator=creator,
                created=created,
                updated=updated,
                isPrivate=isPrivate,
                tag=tag,
                title=title,               
                description=description,
                maxThreads=maxThreads,
                image=image,
                fileName=fileName,
                link=link,
            )
            board.save(using=self._db)
            return board


class Board(BaseModel):
    """Board object"""  
    isPrivate   = models.BooleanField(default=False, verbose_name=_('Is Private'))
    tag         = models.CharField(default=None, max_length=10, unique=True, verbose_name=_('Tag'))
    title       = models.CharField(default=None, max_length=100, verbose_name=_('Title'))
    # slug        = models.SlugField(unique=True, max_length=255, blank=True, null=True, verbose_name=_('Slug'))
    description = models.CharField(default=None, max_length=255, blank=True, null=True, verbose_name=_('Description'))
    maxThreads  = models.IntegerField(default=MAX_THREADS, verbose_name=_('Maximum number of Threads'))
    link        = models.URLField(default=None, null=True, blank=True, verbose_name=_('Board link'))

    objects = BoardManager()

    def __str__(self):
        return str('/' + self.tag + '/')


    # def save(self, *args, **kwargs):    
    #     # generate thumbnail if it has an image, and it's not a thread being updated
    #     if self.image != None and self.created_at == None:
    #         if not self.make_thumbnail():
    #             raise Exception('Could not create thumbnail - is the file type valid?')

    #     super(Post, self).save(*args, **kwargs)

    # def make_thumbnail(self):

    #     image = Image.open(self.image)
    #     if self.is_thread:
    #         image.thumbnail(THREAD_THUMB_SIZE, Image.ANTIALIAS)
    #     else:
    #         image.thumbnail(POST_THUMB_SIZE, Image.ANTIALIAS)

    #     thumb_name, thumb_extension = os.path.splitext(self.image.name)
    #     thumb_extension = thumb_extension.lower()

    #     thumb_filename = thumb_name + '_s' + thumb_extension

    #     if thumb_extension in ['.jpg', '.jpeg']:
    #         FTYPE = 'JPEG'
    #     elif thumb_extension == '.gif':
    #         FTYPE = 'GIF'
    #     elif thumb_extension == '.png':
    #         FTYPE = 'PNG'
    #     else:
    #         return False    # Unrecognized file type

    #     # Save thumbnail to in-memory file as StringIO
    #     temp_thumb = BytesIO()
    #     image.save(temp_thumb, FTYPE)
    #     temp_thumb.seek(0)

    #     # set save=False, otherwise it will run in an infinite loop
    #     self.thumbnail.save(thumb_filename, ContentFile(temp_thumb.read()), save=False)
    #     temp_thumb.close()

    #     return True



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
class ThreadManager(models.Manager):
    """Thread Manager object"""
    def create_thread(self, thread_data):
        errors = []

        if errors:
            return errors
        else:
            thread = Thread.objects.create(
                creator=thread_data['creator'],
                subject=thread_data['subject'],
            )
            thread.save(using=self._db)
            return thread

class Thread(BasePostModel):
    """Thread object - a.k.a OP"""   

    # slug        = models.SlugField(unique=True, max_length=255, blank=True, null=True, verbose_name=_('Slug'))
    subject     = models.CharField(default=None, max_length=255, blank=True, null=True, verbose_name=_('Subject'))
    isPinned    = models.BooleanField(default=False, verbose_name=_('Is Pinned'))
    isPruned    = models.BooleanField(default=False, verbose_name=_('Is Pruned'))
    maxPosts    = models.IntegerField(default=MAX_POSTS, verbose_name=_('Maximum number of Posts'))
    board       = models.ForeignKey("Board", related_name='threads', blank=True, null=True, on_delete=models.CASCADE, verbose_name=_('Parent Board'))

    objects     = ThreadManager()

    def __str__(self):
        return str(self.id)



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
                creator=post_data['creator'],
                text=post_data['text'],                
            )
            post.save(using=self._db)
            return post

class Post(BasePostModel):
    """Post object"""   
    
    board       = models.ForeignKey("Board", related_name='posts', blank=True, null=True, on_delete=models.CASCADE, verbose_name=_('Parent Board'))
    thread      = models.ForeignKey("Thread", related_name='posts', blank=True, null=True, on_delete=models.CASCADE, verbose_name=_('Parent Thread'))

    objects     = PostManager()

    def __str__(self):
        return str(self.id)
