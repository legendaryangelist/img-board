#  ----- RUN THIS FIRST -----
import django_setup_script
#  --------------------------

from django.conf import settings

import random
from core.models import User
from generate_eth_address import generate
from faker import Faker

fakegen = Faker()

def populateUsers(N=100):
    """ Create N Entries of Dates Accessed """

    for entry in range(N):
        # Create Fake Data for entry
        name       = fakegen.pystr()
        email      = fakegen.email()
        password   = fakegen.pystr()
        address    = generate()["address"].hex()
        nonce      = random.randint(1000000, 10000000)

        # Create new User Entry
        user = User.objects.get_or_create(
            username=name, 
            email=email,
            password=password,
            public_address=address,
            nonce=nonce,
            )[0]
        print("Populate Users - Created User " + str(user))
        

if __name__ == '__main__':
    print("Populating the database with users...Please Wait")
    populateUsers()
    print('Population Complete')
