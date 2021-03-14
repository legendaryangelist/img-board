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

import etherscan

es = etherscan.Client(
    api_key=ETHERSCAN_API_KEY,
    cache_expire_after=5,
)

eth_price = es.get_eth_price()
print("----- eth_price -----\n", eth_price)

eth_supply = es.get_eth_supply()
print("----- eth_supply -----\n", eth_supply)

eth_balance = es.get_eth_balance(ETH_ADDRESS_LIST[0])
print("----- eth_balance -----\n", eth_balance)

eth_balances = es.get_eth_balances(ETH_ADDRESS_LIST)
print("----- eth_balances -----\n", eth_balances)

gas_price = es.get_gas_price()
print("----- gas_price -----\n", gas_price)

block = es.get_block_by_number(block_number=12345)
print("----- block -----\n", block)

transactions = es.get_transactions_by_address(ETH_ADDRESS_LIST[0])
print("----- transactions -----\n", transactions)

token_transations = es.get_token_transactions(
    contract_address='0xEF68e7C694F40c8202821eDF525dE3782458639f',
    address='0xEF68e7C694F40c8202821eDF525dE3782458639f',
)
print("----- token_transations -----\n", token_transations)