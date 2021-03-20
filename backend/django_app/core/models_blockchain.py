import uuid
import requests
from django.db import models
from django.conf import settings
from django.utils.translation import gettext_lazy as _


# From settings.py
OPENSEA_API_URL = settings.OPENSEA_API_URL

if hasattr(settings, 'OPENSEA_API_KEY'):
    OPENSEA_API_KEY = settings.OPENSEA_API_KEY
else:
    OPENSEA_API_KEY = ""



# ----------------------------------------------------
# ---------------------- Wallet ----------------------
# ----------------------------------------------------
class WalletManager(models.Manager):
    """ Represents a basic Wallet Model Manager."""
    
    def create_wallet(self, **validated_data):
        pass


class Wallet(models.Model):
    """ Represents a basic Wallet Model. """

    id                  = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False, verbose_name=_('Unique ID')) 
    user                = models.ForeignKey(to=settings.AUTH_USER_MODEL, related_name='wallet', blank=True, null=True, on_delete=models.CASCADE, verbose_name=_('User'))
    wallet_address      = models.CharField(default=None, max_length=255, verbose_name=_('Wallet Address'))

    objects             = WalletManager()

    def __str__(self):
        return str(self.id)

    # class Meta:
    #     abstract = True



# -------------------------------------------------
# ---------------------- NFT ----------------------
# -------------------------------------------------
class NFTModelManager(models.Manager):
    """ Represents a basic NFT Model Manager."""
    
    def request_token(self):
        querystring = {
            "order_direction":"desc",
            "offset":"0",
            "limit":"20"
        }
        response = requests.request("GET", OPENSEA_API_URL, params=querystring)
        print(response.text)


class NFTModel(models.Model):
    """ Represents a basic NFT Model. """

    id      = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False, verbose_name=_('Unique ID')) 
    name    = models.CharField(default=None, max_length=255, verbose_name=_('Name'))

    # token_id              - The token ID of the ERC721 asset
    # image_url             - An image for the item
    # background_color      - The background color to be displayed with the item
      
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
    
