#  ----- RUN THIS FIRST -----
import django_setup_script
#  --------------------------

import sys
from django.conf import settings
from web3 import Web3
from web3.middleware import geth_poa_middleware

rinkebyWS = settings.RINKEBY_WS

print("----- Initiating connection to Ethereum Rinkeby testnet -----")
print("Using Websocket endpoint - " + rinkebyWS)
w3 = Web3(Web3.WebsocketProvider(endpoint_uri=rinkebyWS, websocket_timeout=60))

if not w3.isConnected():
    print("Connection failed")
    sys.exit(1)

print("Web3 is Connected")

# inject the poa compatibility middleware to the innermost layer
w3.middleware_onion.inject(geth_poa_middleware, layer=0) 
latest_block = w3.eth.get_block('latest')
for key in latest_block:
    if isinstance(latest_block[key], bytes):
        print(key + ": " + str(latest_block[key].hex()))
    else:
        print(key + ": " + str(latest_block[key]))
sys.exit(0)

    
    