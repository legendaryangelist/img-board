import os
import sys
sys.path.append(os.getcwd())
# Need to run this before calling models from application!
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'mainapp.settings')

import django
django.setup()
from django.conf import settings

from populate_boards import populateBoards
from populate_users import populateUsers


def populateDB(users=100, boards=10, threads=10, posts=10):
    populateBoards(numBoards=boards, numThreads=threads, numPosts=posts);
    populateUsers(N=users);

if __name__ == '__main__':
    print("Populating the database...Please Wait")
    populateDB()
    print('Population Complete')