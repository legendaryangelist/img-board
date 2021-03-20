import os
import sys
sys.path.append(os.path.dirname(os.path.realpath(__file__)))
sys.path.append(os.getcwd())
sys.path.append(os.path.normpath(os.getcwd() + os.sep + os.pardir))
# Need to run this before calling models from application!
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'mainapp.settings')

import django
print("----- Setting up Django environment... -----")
django.setup()
print("----- Django Setup complete. -----")
