import uuid
import json
import requests
import threading
from django.db import models
from django.conf import settings
from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _



# ----------------------------------------------------
# ---------------------- Wallet ----------------------
# ----------------------------------------------------
class WalletManager(models.Manager):
    """ Represents a basic Wallet Model Manager."""
    
    def queryWeb3(address, walletID, mutex):
        pass

    def queryEtherscan(address, walletID, mutex):
        pass

    def queryOpensea(address, walletID, mutex):
        # From settings.py
        OPENSEA_API_URL = settings.OPENSEA_API_URL

        if hasattr(settings, 'OPENSEA_API_KEY'):
            OPENSEA_API_KEY = settings.OPENSEA_API_KEY
        else:
            OPENSEA_API_KEY = ""

        url = OPENSEA_API_URL
        querystring = {
            "X-API-KEY":OPENSEA_API_KEY,
            "owner":address,
            "order_direction":"desc",
            "offset":"0",
            "limit":"20"    # TODO modify order limit, caps at 50
        }
        response = requests.request("GET", url, params=querystring)
        if response.ok:
            respJSON = response.json()
            for key in respJSON:
                itemCount = 1
                for item in respJSON[key]:

                    asset_contract  = item.get("asset_contract")
                    if asset_contract["schema_name"] == "NFT":
                        pass
                    elif asset_contract["schema_name"] == "ERC1155":
                        pass
                    else:
                        pass

                    id = item.get("id")
                    token_id = item.get("token_id")
                    num_sales = item.get("num_sales")
                    image_url = item.get("image_url")
                    image_thumbnail_url = item.get("image_thumbnail_url")
                    animation_url  = item.get("animation_url")
                    name  = item.get("name")
                    description  = item.get("description")
                    external_link  = item.get("external_link")
                    owner  = item.get("owner")
                    permalink  = item.get("permalink")
                    collection  = item.get("collection")
                    top_bid  = item.get("top_bid")
                    decimals  = item.get("decimals")
                    sell_orders  = item.get("sell_orders")
                    traits  = item.get("traits")
                    last_sale  = item.get("last_sale")
                    top_bid  = item.get("top_bid")
                    listing_date  = item.get("listing_date")
                    is_presale  = item.get("is_presale")
                    transfer_fee_payment_token  = item.get("transfer_fee_payment_token")
                    transfer_fee  = item.get("transfer_fee")
                    itemCount += 1


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
        walletID = wallet.id
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
# ---------------------- ETH --------------------
# -------------------------------------------------
class ETHManager(models.Manager):
    """ Represents a basic ETH Model Manager. Contains data of ETH and other ERC20 Tokens by Address."""
    
    def create_ETH(self, **validated_data):
        pass


class ETH(models.Model):
    """ Represents a basic ETH Model. """

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
    """ Represents a basic NFT Model. """

    id      = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False, verbose_name=_('Unique ID'))
    wallet  = models.ForeignKey(Wallet, related_name='NFT', blank=True, null=True, on_delete=models.CASCADE, verbose_name=_('Wallet'))
    name    = models.CharField(default=None, max_length=255, verbose_name=_('Name'))

    # token_id              - The token ID of the NFT asset
    # image_url             - An image for the item
    # background_color      - The background color to be displayed with the item
      
    # external_link         - External link to the original website for the item
    # asset_contract        - Dictionary of data on the contract itself (see asset contract section)
    # owner                 - Dictionary of data on the owner (see account section)
    # traits                - A list of traits associated with the item (see traits section) -> json = JSONField()
    # last_sale             - When this item was last sold (null if there was no last sale)

    objects = NFTManager()

    def __str__(self):
        return str(id)


    
