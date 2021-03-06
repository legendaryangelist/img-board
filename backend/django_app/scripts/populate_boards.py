import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'mainapp.settings')

import django
django.setup()
from django.conf import settings

from boards.models import Board, Thread, Post
from random import randint, choice
from string import ascii_letters

MIN_THREADS = settings.MIN_THREADS
MAX_THREADS = settings.MAX_THREADS

def populateBoards(numBoards=10, numThreads=10, numPosts=10):

    for nBoards in range(numBoards):
        letters = ascii_letters
        board = Board.objects.get_or_create(
                # id=validated_data['id'],
                creator=''.join(choice(letters) for i in range(30)) if randint(0, 1) else None,
                isPrivate=randint(0, 1),
                tag=''.join(choice(letters) for i in range(10)),
                title=''.join(choice(letters) for i in range(100)),               
                description=''.join(choice(letters) for i in range(255)),
                maxThreads=randint(MIN_THREADS, MAX_THREADS),
                # image=validated_data['image'],                    # TODO
                # thumbnail=validated_data['thumbnail'],            # TODO
                # fileName=validated_data["fileName"],              # TODO
            )
        for nThreads in range(numThreads):
            pass
            for nPosts in range(numPosts):
                pass

        # user = User.objects.get_or_create(username=fake_name, email=fake_email)[0]

if __name__ == '__main__':
    print("Populating the database with Boards...Please Wait")
    populateBoards()
    print('Population Complete')
