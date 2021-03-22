import os
import pytz
import uuid
import logging
from datetime import datetime
from django.db import models
from django.conf import settings
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _
from django.core.exceptions import ValidationError
from easy_thumbnails.fields import ThumbnailerImageField
from versatileimagefield.fields import VersatileImageField, PPOIField
from versatileimagefield.placeholder import OnStoragePlaceholderImage

# From settings.py
BOARD_THUMB_SIZE = settings.BOARD_THUMB_SIZE
POST_THUMB_SIZE = settings.POST_THUMB_SIZE
MAX_UPLOAD_SIZE = settings.MAX_UPLOAD_SIZE
ALLOWED_EXTENSIONS = settings.ALLOWED_EXTENSIONS

logger = logging.getLogger(__name__)

class BaseModelManager(models.Manager):
    """ Represents a basic manager model."""
    
    def update_image_data(self, validated_data):
        if validated_data["image"]:
            if validated_data["image"].name.find(".") == -1 or \
               validated_data["image"].name.split(".")[-1].lower() not in ALLOWED_EXTENSIONS:
                raise ValidationError(message="Image must be '.jpg', '.jpeg', '.gif', or '.png'")
            elif validated_data["image"].size > MAX_UPLOAD_SIZE:
                raise ValidationError(message="Image size must be 5MB or less")
            else:
                validated_data["fileName"] = "{}.{}".format(uuid.uuid4().hex, validated_data["image"].name.split(".")[-1])
                validated_data["image"].name = validated_data["fileName"]
                validated_data["thumbnail"] = validated_data["image"]
                validated_data["avatar"] = validated_data["image"]
               
        else:
            validated_data["fileName"] = None
            validated_data["image"] = None
            validated_data["thumbnail"] = None
            validated_data["avatar"] = None


    def update_validated_data(self, validated_data):
        validated_data['created'] = datetime.now(pytz.utc)
        validated_data['updated'] = validated_data['created']
        self.update_image_data(validated_data)
    
        return validated_data
    

    def delete_image_data(self, instance):
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
    created     = models.DateTimeField(auto_now_add=True, verbose_name=_('Creation date'))
    updated     = models.DateTimeField(auto_now=True, verbose_name=_('Update date'))
    link        = models.URLField(default=None, null=True, blank=True, verbose_name=_('Link'))
    image       = VersatileImageField(default=None, blank=True, null=True, verbose_name=_('Image'),
                                        placeholder_image=OnStoragePlaceholderImage(path='rein.jpg'),
                                        ppoi_field='ppoi')
    thumbnail   = ThumbnailerImageField(default=None, blank=True, null=True, verbose_name=_('Thumbnail'), resize_source=dict(size=(200, 200)))
    avatar      = ThumbnailerImageField(default=None, blank=True, null=True, verbose_name=_('Avatar'), resize_source=dict(size=(50, 50)))
    fileName    = models.CharField(default=None, max_length=255, blank=True, null=True, verbose_name=_('File name'))
    ppoi        = PPOIField('Image PPOI')

    # slug        = models.SlugField(unique=True, max_length=255, blank=True, null=True, verbose_name=_('Slug'))
    # creator     = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True, null=True)
    # image       = models.ImageField(default=None, blank=True, null=True, verbose_name=_('Image'))
    # thumbnail   = models.ImageField(default=None, blank=True, null=True, verbose_name=_('Thumbnail'))
    # fileName    = models.CharField(default=None, max_length=255, blank=True, null=True, verbose_name=_('File name'))


    class Meta:
        abstract = True
