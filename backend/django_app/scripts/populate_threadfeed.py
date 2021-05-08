#  ----- RUN THIS FIRST -----
import django_setup_script
#  --------------------------

from django.conf import settings

from core.models import Board, Thread
from random import randint, choice
from string import ascii_letters
import uuid

MIN_THREADS = settings.MIN_THREADS
MAX_THREADS = settings.MAX_THREADS
MIN_POSTS = settings.MIN_POSTS
MAX_POSTS = settings.MAX_POSTS

import os
imageList = []
imagePath = settings.MEDIA_ROOT
for filename in os.listdir(imagePath):
    newFilename =  "{}.{}".format(uuid.uuid4().hex, filename.split(".")[-1])
    os.rename(
        os.path.join(imagePath, filename), 
        os.path.join(imagePath, newFilename)
    )
    imageList.append(newFilename)

def imageRand():
    res = {}
    # imageRandNum = randint(0, 2*len(imageList) - 1)  # 50% chance
    imageRandNum = randint(0, len(imageList) - 1)
    if imageRandNum < len(imageList):
        res['image'] = imageList[imageRandNum]
        res['fileName']  = imageList[imageRandNum]
        res['thumbnail'] = res['image']
        res['avatar'] = res['image']
    else:
        res['image'] = None
        res['fileName']  = None
        res['thumbnail'] = None
        res['avatar'] = None
    return res

def populateThreads(numThreads=200):
    imageRes = imageRand()
    board = Board.objects.get_or_create(
            creator=''.join(choice(ascii_letters) for i in range(30)) if randint(0, 1) else "Anonymous",
            isPrivate=randint(0, 1),
            tag=''.join(choice(ascii_letters) for i in range(10)),
            title=''.join(choice(ascii_letters) for i in range(100)),               
            description=''.join(choice(ascii_letters) for i in range(randint(0, settings.MAX_SUBJECT_CHAR_COUNT))),
            image=imageRes['image'],
            fileName = imageRes['fileName'],
            thumbnail = imageRes['thumbnail'],
            # maxThreads=randint(MIN_THREADS, MAX_THREADS),           
        )[0]
    for nThreads in range(numThreads):
        imageRes = imageRand()
        thread = Thread.objects.get_or_create(
            board=board,
            creator=''.join(choice(ascii_letters) for i in range(30)) if randint(0, 1) else "Anonymous",
            isPinned=randint(0, 1),
            # isPruned=randint(0, 1),
            subject=''.join(choice(ascii_letters) for i in range(randint(0, settings.MAX_SUBJECT_CHAR_COUNT))),
            text=''.join(choice(ascii_letters) for i in range(randint(0, settings.MAX_CHAR_COUNT))),                         
            image=imageRes['image'],
            fileName = imageRes['fileName'],
            thumbnail = imageRes['thumbnail'],
            likesCount  = randint(0, 100) if randint(0, 100) < 70 else randint(0, 1500),
            postsCount  = randint(0, 100) if randint(0, 100) < 70 else randint(0, 300),
            sharesCount = randint(0, 100) if randint(0, 100) < 70 else randint(0, 1500),
            viewsCount  = randint(0, 1000) if randint(0, 100) < 70 else randint(0, 10000),
            # maxPosts=randint(MIN_POSTS, MAX_POSTS),    
        )[0]
        print("Populate Threads - Created Thread " + str(thread))

if __name__ == '__main__':
    print("Populating the database with Threads...Please Wait")
    imageRes = imageRand()
    populateThreads()
    print('Population Complete')
