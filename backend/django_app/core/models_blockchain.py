import uuid
import requests
import threading
from django.db import models
from django.conf import settings
from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model
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
        if 'address' not in validated_data:
            raise ValidationError(message="No 'address' provided -> please provide an 'address'.")
        address = validated_data["address"]

        mutex = threading.Lock()
        threads = []
        # for dateCode in dateCodes:
        #     t = threading.Thread(target=self.ReqThread, args=(dateCode, mutex))
        #     threads.append(t)
        #     t.start()

        for t in threads:
            t.join()


class Wallet(models.Model):
    """ Represents a basic Wallet Model. """

    id                  = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False, verbose_name=_('Unique ID')) 
    user                = models.ForeignKey(to=settings.AUTH_USER_MODEL, related_name='wallet', blank=True, null=True, on_delete=models.CASCADE, verbose_name=_('User'))
    address             = models.CharField(default=None, max_length=255, verbose_name=_('Wallet Address'))

    objects             = WalletManager()

    def __str__(self):
        return str(self.id)




# -------------------------------------------------
# ---------------------- ERC20 --------------------
# -------------------------------------------------
class ERC20Manager(models.Manager):
    """ Represents a basic ERC20 Model Manager."""
    
    def request_token(self):
        querystring = {
            "order_direction":"desc",
            "offset":"0",
            "limit":"20"
        }
        response = requests.request("GET", OPENSEA_API_URL, params=querystring)
        print(response.text)


class ERC20(models.Model):
    """ Represents a basic ERC20 Model. """

    id      = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False, verbose_name=_('Unique ID'))
    wallet  = models.ForeignKey(Wallet, related_name='erc20', blank=True, null=True, on_delete=models.CASCADE, verbose_name=_('Wallet'))

    objects = ERC20Manager()

    def __str__(self):
        return str(id)


# ----------------------------------------------------
# ---------------------- ERC721 ----------------------
# ----------------------------------------------------
class ERC721Manager(models.Manager):
    """ Represents a basic ERC721 Model Manager."""
    
    def request_token(self):
        querystring = {
            "order_direction":"desc",
            "offset":"0",
            "limit":"20"
        }
        response = requests.request("GET", OPENSEA_API_URL, params=querystring)
        print(response.text)


class ERC721(models.Model):
    """ Represents a basic ERC721 Model. """

    id      = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False, verbose_name=_('Unique ID'))
    wallet  = models.ForeignKey(Wallet, related_name='erc721', blank=True, null=True, on_delete=models.CASCADE, verbose_name=_('Wallet'))
    name    = models.CharField(default=None, max_length=255, verbose_name=_('Name'))

    # token_id              - The token ID of the ERC721 asset
    # image_url             - An image for the item
    # background_color      - The background color to be displayed with the item
      
    # external_link         - External link to the original website for the item
    # asset_contract        - Dictionary of data on the contract itself (see asset contract section)
    # owner                 - Dictionary of data on the owner (see account section)
    # traits                - A list of traits associated with the item (see traits section) -> json = JSONField()
    # last_sale             - When this item was last sold (null if there was no last sale)

    objects = ERC721Manager()

    def __str__(self):
        return str(id)

# -------------------------------------------------
# ---------------------- ERC721 ----------------------
# -------------------------------------------------
class ERC1155Manager(models.Manager):
    """ Represents a basic ERC1155 Model Manager."""
    
    def request_token(self):
        querystring = {
            "order_direction":"desc",
            "offset":"0",
            "limit":"20"
        }
        response = requests.request("GET", OPENSEA_API_URL, params=querystring)
        print(response.text)


class ERC1155(models.Model):
    """ Represents a basic ERC1155 Model. """

    id      = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False, verbose_name=_('Unique ID'))
    wallet  = models.ForeignKey(Wallet, related_name='erc1155', blank=True, null=True, on_delete=models.CASCADE, verbose_name=_('Wallet'))
    name    = models.CharField(default=None, max_length=255, verbose_name=_('Name'))

    objects = ERC1155Manager()

    def __str__(self):
        return str(id)

    
