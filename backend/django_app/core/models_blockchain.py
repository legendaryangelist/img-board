import uuid
import json
import requests
import threading
from django.db import models
from django.conf import settings
from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _
from django.contrib.postgres import fields


# ----------------------------------------------------
# ---------------------- Wallet ----------------------
# ----------------------------------------------------
class WalletManager(models.Manager):
    """ Represents a basic Wallet Model Manager."""
    
    def queryWeb3(self, address, walletID, mutex):
        pass

    def queryEtherscan(self, address, walletID, mutex):
        pass

    def queryOpensea(self, address, walletID, mutex):
        # From settings.py
        OPENSEA_API_URL = settings.OPENSEA_API_URL

        if hasattr(settings, 'OPENSEA_API_KEY'):
            OPENSEA_API_KEY = settings.OPENSEA_API_KEY
        else:
            OPENSEA_API_KEY = ""

        LIMIT_OPENSEA = settings.LIMIT_OPENSEA

        url = OPENSEA_API_URL
        querystring = {
            "X-API-KEY":OPENSEA_API_KEY,
            "owner":address,
            "order_direction":"desc",
            "offset":"0",
            "limit":LIMIT_OPENSEA
        }
        response = requests.request("GET", url, params=querystring)
        if response.ok:
            respJSON = response.json()
            for key in respJSON:
                for item in respJSON[key]:
                    asset_contract  = item.get("asset_contract")
                    if asset_contract["schema_name"] == "ERC721" or asset_contract["schema_name"] == "ERC1155":
                        mutex.acquire()
                        try:
                            NFT.objects.get_or_create(
                                wallet=walletID,
                                erc_type=asset_contract["schema_name"],
                                asset_object=item,
                            )[0]
                        finally:
                            mutex.release()


    def create_wallet(self, **validated_data):
        if 'address' not in validated_data:
            raise ValidationError(message="No 'address' provided -> please provide an 'address'.")
        address = validated_data["address"]

        if 'user' not in validated_data:
            user = uuid.uuid4
        else:
            user = validated_data["user"]

        
        print("Creating Wallet from address - " + address)
        wallet = Wallet.objects.get_or_create(
                address=address,
                user=user,
            )[0]

        wallet.save(using=self._db)
        walletID = wallet
        mutex = threading.Lock()
        threading.Thread(target=self.queryWeb3, args=(address, walletID, mutex)).start()
        threading.Thread(target=self.queryEtherscan, args=(address, walletID, mutex)).start()
        threading.Thread(target=self.queryOpensea, args=(address, walletID, mutex)).start()

        return wallet


class Wallet(models.Model):
    """ Represents a basic Wallet Model. """

    id                  = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False, verbose_name=_('Unique ID')) 
    user                = models.ForeignKey(to=settings.AUTH_USER_MODEL, related_name='wallet', blank=True, null=True, on_delete=models.CASCADE, verbose_name=_('User'))
    address             = models.CharField(default=None, max_length=255, verbose_name=_('Wallet Address'))

    objects             = WalletManager()

    def __str__(self):
        return str(self.id)




# -------------------------------------------------
# ---------------------- ETH ----------------------
# -------------------------------------------------
class ETHManager(models.Manager):
    """ Represents a basic ETH Model Manager. Contains data of ETH and other ERC20 Tokens by Address."""
    
    def create_ETH(self, **validated_data):
        pass


class ETH(models.Model):
    """ Represents a basic ETH Model. Contains data of ETH and other ERC20 Tokens by Address. """

    id      = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False, verbose_name=_('Unique ID'))
    wallet  = models.ForeignKey(Wallet, related_name='ETH', blank=True, null=True, on_delete=models.CASCADE, verbose_name=_('Wallet'))

    objects = ETHManager()

    def __str__(self):
        return str(id)


# ----------------------------------------------------
# ---------------------- NFT ----------------------
# ----------------------------------------------------
class NFTManager(models.Manager):
    """ Represents a basic NFT Model Manager. Contains data of ERC721 and ERC1155 holdings by Address. """
    
    def create_NFT(self, **validated_data):
        pass


class NFT(models.Model):
    """ 
    Represents a basic NFT Model.  
    Contains data of ERC721 and ERC1155 holdings by Address. 
    Queried from Opensea API. 
    """

    id      = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False, verbose_name=_('Unique ID'))
    wallet  = models.ForeignKey(Wallet, related_name='NFT', blank=True, null=True, on_delete=models.CASCADE, verbose_name=_('Wallet'))
    
    erc_type        = models.CharField(default=None, max_length=7, verbose_name=_('ERC Type'))
    asset_object    = models.JSONField(default=dict, verbose_name=_('Asset Object'))

    objects = NFTManager()

    def __str__(self):
        return str(id)



# -------------------------------------------------
# ---------------------- TokenURI --------------------
# -------------------------------------------------
class TokenURIManager(models.Manager):
    """ Represents a basic TokenURI Model Manager."""
    
    def create_TokenURI(self, **validated_data):
        tokenURI = TokenURI.objects.get_or_create(
            address=validated_data["address"],
            name=validated_data["name"],
            description=validated_data["description"],
            imageURL=validated_data["imageURL"],
            traits=validated_data["traits"],
        )[0]
        tokenURI.save(using=self._db)
        return tokenURI


class TokenURI(models.Model):
    """ Represents a basic TokenURI Model."""

    id          = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False, verbose_name=_('Unique ID'))
    address     = models.CharField(default=None, max_length=255, verbose_name=_('Wallet Address'))

    name        = models.CharField(default=None, max_length=255, blank=True, null=True, verbose_name=_('Name'))
    description = models.CharField(default=None, max_length=255, blank=True, null=True, verbose_name=_('Description'))
    imageURL    = models.URLField(default=None, null=True, blank=True, verbose_name=_('Image URL'))
    traits      = fields.ArrayField(default=list, base_field=models.JSONField(default=dict), verbose_name=_('Traits'))

    objects     = TokenURIManager()

    def __str__(self):
        return str(id)


    
