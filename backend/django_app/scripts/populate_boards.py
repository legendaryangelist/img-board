#  ----- RUN THIS FIRST -----
import django_setup_script
#  --------------------------

from django.conf import settings

from core.models import Board, Thread, Post
from random import randint, choice
from string import ascii_letters

MIN_THREADS = settings.MIN_THREADS
MAX_THREADS = settings.MAX_THREADS
MIN_POSTS = settings.MIN_POSTS
MAX_POSTS = settings.MAX_POSTS

def populateBoards(numBoards=10, numThreads=10, numPosts=10):

    for nBoards in range(numBoards):
        board = Board.objects.get_or_create(
                creator=''.join(choice(ascii_letters) for i in range(30)) if randint(0, 1) else "Anonymous",
                isPrivate=randint(0, 1),
                tag=''.join(choice(ascii_letters) for i in range(10)),
                title=''.join(choice(ascii_letters) for i in range(100)),               
                description=''.join(choice(ascii_letters) for i in range(255)),
                maxThreads=randint(MIN_THREADS, MAX_THREADS),
                # image=validated_data['image'],                    # TODO:
            )[0]
        print("Populate Boards - Created Board " + str(board))
        for nThreads in range(numThreads):
            thread = Thread.objects.get_or_create(
                board=board,
                creator=''.join(choice(ascii_letters) for i in range(30)) if randint(0, 1) else "Anonymous",
                isPinned=randint(0, 1),
                isPruned=randint(0, 1),
                subject=''.join(choice(ascii_letters) for i in range(255)),
                text=''.join(choice(ascii_letters) for i in range(40000)),            
                maxPosts=randint(MIN_POSTS, MAX_POSTS),          
            )[0]
            print("Populate Boards - Created Thread " + str(thread))
            for nPosts in range(numPosts):
                post = Post.objects.get_or_create(
                    board=board,
                    thread=thread,
                    creator=''.join(choice(ascii_letters) for i in range(30)) if randint(0, 1) else "Anonymous",
                    text=''.join(choice(ascii_letters) for i in range(40000)),
                )[0]
                print("Populate Boards - Created Post " + str(post))

if __name__ == '__main__':
    print("Populating the database with Boards...Please Wait")
    populateBoards()
    print('Population Complete')
