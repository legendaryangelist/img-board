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

if hasattr(settings, 'OPENSEA_API_KEY'):
    OPENSEA_API_KEY = settings.OPENSEA_API_KEY
else:
    OPENSEA_API_KEY = ""

import json
import requests
url = "https://api.opensea.io/api/v1/assets" + "?X-API-KEY=" + OPENSEA_API_KEY
querystring = {
    "owner":ETH_ADDRESS_LIST[0],
    "order_direction":"desc",
    "offset":"0",
    "limit":"20"
    }

print("Querying Opensea =>")
print("URL: " + url)
print("Address: " + ETH_ADDRESS_LIST[0])
response = requests.request("GET", url, params=querystring)

print("Response =>")
respJSON = response.json()
for key in respJSON:
    print("Key: -----> ", key)
    for item in respJSON[key]:
        print(json.dumps(item, indent = 4))


