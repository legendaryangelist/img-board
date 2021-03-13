import os
import sys
sys.path.append(os.getcwd())
sys.path.append(os.path.normpath(os.getcwd() + os.sep + os.pardir))
# Need to run this before calling models from application!
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'mainapp.settings')

import django
django.setup()