from django.contrib import admin
from .models import Post, Page, Board

# class PostAdmin(admin.ModelAdmin):
#     """Post model admin"""


# class PageAdmin(admin.ModelAdmin):
#     """Page model admin"""


# class BoardAdmin(admin.ModelAdmin):
#     """Board model admin"""

admin.site.register(Post)
admin.site.register(Page)
admin.site.register(Board)
