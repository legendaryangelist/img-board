
import sys
from web3 import Web3

rinkebyWS = "wss://rinkeby-light.eth.linkpool.io/ws"

print("----- Initiating connection to Ethereum Rinkeby testnet -----")
print("Using Websocket endpoint - " + rinkebyWS)
w3 = Web3(Web3.WebsocketProvider(endpoint_uri=rinkebyWS, websocket_timeout=60))

if not w3.isConnected():
    print("Connection failed")
    sys.exit(1)

print("Web3 is Connected")


sys.exit(0)

    
    