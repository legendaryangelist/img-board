import uuid
import requests
from jsonfield import JSONField
from django.db import models
from django.conf import settings
from django.utils.translation import gettext_lazy as _


# From settings.py
OPENSEA_URL = settings.OPENSEA_URL

class NFTModelManager(models.Manager):
    """ Represents a basic NFT Model Manager."""
    
    def request_token(self):
        querystring = {
            "order_direction":"desc",
            "offset":"0",
            "limit":"20"
        }
        response = requests.request("GET", OPENSEA_URL, params=querystring)
        print(response.text)


class NFTModel(models.Model):
    """ Represents a basic NFT Model. """

    id  = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False, verbose_name=_('Unique ID')) 

    # token_id              - The token ID of the ERC721 asset
    # image_url             - An image for the item
    # background_color      - The background color to be displayed with the item
    # name                  - Name of the item    
    # external_link         - External link to the original website for the item
    # asset_contract        - Dictionary of data on the contract itself (see asset contract section)
    # owner                 - Dictionary of data on the owner (see account section)
    # traits                - A list of traits associated with the item (see traits section) -> json = JSONField()
    # last_sale             - When this item was last sold (null if there was no last sale)

    objects = NFTModelManager()

    def __str__(self):
        return str(id)

    class Meta:
        abstract = True
    
