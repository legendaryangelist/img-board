import os
import sys
sys.path.append(os.getcwd())
sys.path.append(os.path.normpath(os.getcwd() + os.sep + os.pardir))
# Need to run this before calling models from application!
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'mainapp.settings')

import django
django.setup()
from django.conf import settings

import random
from core.models import User
from faker import Faker

fakegen = Faker()

def populateUsers(N=100):
    """ Create N Entries of Dates Accessed """

    for entry in range(N):
        # Create Fake Data for entry
        fake_name       = fakegen.pystr()
        fake_email      = fakegen.email()
        fake_password   = fakegen.pystr()

        # Create new User Entry
        user = User.objects.get_or_create(
            username=fake_name, 
            email=fake_email,
            password=fake_password,
            )[0]
        print("Populate Users - Created User " + str(user))
        

if __name__ == '__main__':
    print("Populating the database with users...Please Wait")
    populateUsers()
    print('Population Complete')
