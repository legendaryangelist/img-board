import os
# Configure settings for project
# Need to run this before calling models from application!
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'earthshatter.settings')

import django
# Import settings
django.setup()

import random
from backend.models import User
from faker import Faker

fakegen = Faker()

def populate(N=5):
    """ Create N Entries of Dates Accessed """

    for entry in range(N):
        # Create Fake Data for entry
        fake_name = fakegen.name().split()[0]
        fake_email = fakegen.email()

        # Create new User Entry
        # pylint: disable=no-member
        # user = User.objects.get_or_create(name=fake_name,
        #                                   email=fake_email)[0] # TODO fix populate

if __name__ == '__main__':
    print("Populating the databases...Please Wait")
    populate(50)
    print('Populating Complete')
