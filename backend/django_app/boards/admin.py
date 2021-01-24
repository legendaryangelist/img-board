from django.contrib import admin
from .models import Post, Thread, Board
from django.utils.translation import gettext as _


class BoardAdmin(admin.ModelAdmin):
    """Board model admin"""
    ordering = ['created']
    list_display = ['__str__', 'tag', 'id', 'creator', 'created', 'updated']
    readonly_fields = ['tag', 'id', 'created', 'updated',]
    fieldsets = [
        (_('Base Info'), {'fields': ('tag', 'id')}),
        (_('Creation Info'), {'fields': ('creator','created','updated', 'link',)}),
        (_('Board Info'), {'fields': ('isPrivate','title','description', 'maxThreads',)}),
        (_('Image Info'), {'fields': ('fileName','thumbnail','image',)}),
    ]

class ThreadAdmin(admin.ModelAdmin):
    """Thread model admin"""
    ordering = ['created']
    list_display = ['__str__', 'id', 'creator', 'created', 'updated']
    readonly_fields = ['id', 'created', 'updated',]
    fieldsets = [
        (_('Base Info'), {'fields': ('id', )}),
        (_('Creation Info'), {'fields': ('creator','created','updated', 'link',)}),
        (_('Thread Info'), {'fields': ('isPinned','isPruned','subject', 'text', 'maxPosts', 'board',)}),
        (_('Image Info'), {'fields': ('fileName','thumbnail','image',)}),
    ]


class PostAdmin(admin.ModelAdmin):
    """Post model admin"""
    ordering = ['created']
    list_display = ['__str__', 'id', 'creator', 'created', 'updated']
    readonly_fields = ['id', 'created', 'updated',]
    fieldsets = [
        (_('Base Info'), {'fields': ('id', )}),
        (_('Creation Info'), {'fields': ('creator','created','updated', 'link',)}),
        (_('Post Info'), {'fields': ('text', 'board', 'thread', 'replyto',)}),
        (_('Image Info'), {'fields': ('fileName','thumbnail','image',)}),
    ]


admin.site.register(Board, BoardAdmin)
admin.site.register(Thread, ThreadAdmin)
admin.site.register(Post, PostAdmin)


