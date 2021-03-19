#  ----- RUN THIS FIRST -----
import django_setup_script
#  --------------------------

from django.conf import settings

if not hasattr(settings, 'ETHERSCAN_API_KEY'):
    raise ValueError("ETHERSCAN_API_KEY not found in local_settings")

ETHERSCAN_API_KEY = settings.ETHERSCAN_API_KEY

if not hasattr(settings, 'ETH_ADDRESS_LIST'):
    raise ValueError("ETH_ADDRESS_LIST not found in local_settings")

ETH_ADDRESS_LIST = settings.ETH_ADDRESS_LIST

# ERC721 data (NFT)
import requests
url = f"https://api.etherscan.io/api?module=account&action=tokennfttx&address={ETH_ADDRESS_LIST[0]}&startblock=0&endblock=999999999&sort=asc&apikey={ETHERSCAN_API_KEY}"
response = requests.get(url)
print(response.content)