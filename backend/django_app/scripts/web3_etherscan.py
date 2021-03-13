#  ----- RUN THIS FIRST -----
import django_setup_script
#  --------------------------

from django.conf import settings

from web3 import Web3

if not hasattr(settings, 'ETHERSCAN_API_KEY'):
    raise ValueError("ETHERSCAN_API_KEY not found in local_settings")