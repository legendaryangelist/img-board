from django.contrib import admin
from .models import Post, Thread, Board

# class PostAdmin(admin.ModelAdmin):
#     """Post model admin"""


# class ThreadAdmin(admin.ModelAdmin):
#     """Thread model admin"""


# class BoardAdmin(admin.ModelAdmin):
#     """Board model admin"""

admin.site.register(Post)
admin.site.register(Thread)
admin.site.register(Board)
