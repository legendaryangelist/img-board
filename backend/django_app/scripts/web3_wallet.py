#  ----- RUN THIS FIRST -----
import django_setup_script
#  --------------------------

import sys
from django.conf import settings
from web3 import Web3
from web3.middleware import geth_poa_middleware

if not hasattr(settings, 'INFURA_API_KEY'):
    raise ValueError("INFURA_API_KEY not found in local_settings")

mainnetWS = settings.MAINNET_INFURA_WS + settings.INFURA_API_KEY

if not hasattr(settings, 'ETH_ADDRESS_LIST'):
    raise ValueError("ETH_ADDRESS_LIST not found in local_settings")

ETH_ADDRESS_LIST = settings.ETH_ADDRESS_LIST

print("----- Initiating connection to Ethereum Mainnet -----")
w3 = Web3(Web3.WebsocketProvider(endpoint_uri=mainnetWS, websocket_timeout=60))

if not w3.isConnected():
    print("Connection failed")
    sys.exit(1)
else:
    print("Web3 is Connected")

for address in ETH_ADDRESS_LIST:
    print(address)