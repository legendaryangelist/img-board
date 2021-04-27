#  ----- RUN THIS FIRST -----
import django_setup_script
#  --------------------------

from django.conf import settings

from core.models import Board, Thread
from random import randint, choice
from string import ascii_letters

MIN_THREADS = settings.MIN_THREADS
MAX_THREADS = settings.MAX_THREADS
MIN_POSTS = settings.MIN_POSTS
MAX_POSTS = settings.MAX_POSTS

def populateThreads(numThreads=200):
    board = Board.objects.get_or_create(
            creator=''.join(choice(ascii_letters) for i in range(30)) if randint(0, 1) else "Anonymous",
            isPrivate=randint(0, 1),
            tag=''.join(choice(ascii_letters) for i in range(10)),
            title=''.join(choice(ascii_letters) for i in range(100)),               
            description=''.join(choice(ascii_letters) for i in range(randint(0, settings.MAX_SUBJECT_CHAR_COUNT))),
            maxThreads=randint(MIN_THREADS, MAX_THREADS),
            # image=validated_data['image'],                    # TODO:
        )[0]
    for nThreads in range(numThreads):
        thread = Thread.objects.get_or_create(
            board=board,
            creator=''.join(choice(ascii_letters) for i in range(30)) if randint(0, 1) else "Anonymous",
            isPinned=randint(0, 1),
            isPruned=randint(0, 1),
            subject=''.join(choice(ascii_letters) for i in range(randint(0, settings.MAX_SUBJECT_CHAR_COUNT))),
            text=''.join(choice(ascii_letters) for i in range(randint(0, settings.MAX_CHAR_COUNT))),            
            maxPosts=randint(MIN_POSTS, MAX_POSTS),   
            # image=validated_data['image'],                    # TODO:       
        )[0]
        print("Populate Threads - Created Thread " + str(thread))

if __name__ == '__main__':
    print("Populating the database with Threads...Please Wait")
    populateThreads()
    print('Population Complete')
