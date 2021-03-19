#  ----- RUN THIS FIRST -----
import django_setup_script
#  --------------------------

from django.conf import settings

# if not hasattr(settings, 'OPENSEA_API_KEY'):
#     raise ValueError("OPENSEA_API_KEY not found in local_settings")

# OPENSEA_API_KEY = settings.OPENSEA_API_KEY

if not hasattr(settings, 'ETH_ADDRESS_LIST'):
    raise ValueError("ETH_ADDRESS_LIST not found in local_settings")

ETH_ADDRESS_LIST = settings.ETH_ADDRESS_LIST


OPENSEA_API_URL = settings.OPENSEA_API_URL

import json
import requests
url = "https://api.opensea.io/api/v1/assets"
querystring = {
    "owner":ETH_ADDRESS_LIST[0],
    "order_direction":"desc",
    "offset":"0",
    "limit":"20"
    }

response = requests.request("GET", url, params=querystring)

print(response.text)