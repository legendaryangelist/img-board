import os
# Configure settings for project
# Need to run this before calling models from application!
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'mainapp.settings')

import django
# Import settings
django.setup()

import random
from users.models import User
from faker import Faker

fakegen = Faker()

def populate(N=5):
    """ Create N Entries of Dates Accessed """

    for entry in range(N):
        # Create Fake Data for entry
        fake_name = fakegen.name().split()[0]
        fake_email = fakegen.email()

        # Create new User Entry
        user = User.objects.get_or_create(username=fake_name, email=fake_email)[0]
        # TODO add password gen

if __name__ == '__main__':
    print("Populating the databases...Please Wait")
    populate(10)
    print('Populating Complete')
