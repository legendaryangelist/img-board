from django.contrib import admin
from django.utils.translation import gettext as _
from easy_thumbnails.fields import ThumbnailerImageField
from easy_thumbnails.widgets import ImageClearableFileInput
from core.models import Post, Thread, Board
from .forms import BoardForm

class BoardAdmin(admin.ModelAdmin):
    """Board model admin"""

    def id_hex(self, obj):
        return obj.id.hex
    id_hex.admin_order_field = 'id'
    id_hex.short_description = 'ID' 

    ordering = ['created']
    list_display = ['__str__', 'tag', 'id_hex', 'creator', 'created', 'updated',]
    readonly_fields = ['id_hex', 'created', 'updated',]
    fieldsets = [
        (_('Base Info'), {'fields': ('tag', 'id_hex',)}),
        (_('Creation Info'), {'fields': ('creator','created','updated', 'link',)}),
        (_('Board Info'), {'fields': ('isPrivate','title','description',)}),
        (_('Image Info'), {'fields': ('fileName', 'thumbnail', 'avatar', 'image',)}),
    ]
    # form = BoardForm
    formfield_overrides = {
        ThumbnailerImageField: {'widget': ImageClearableFileInput},
    }

class ThreadAdmin(admin.ModelAdmin):
    """Thread model admin"""

    def id_hex(self, obj):
        return obj.id.hex
    id_hex.admin_order_field = 'id'
    id_hex.short_description = 'ID' 

    ordering = ['created']
    list_display = ['__str__', 'id_hex', 'creator', 'created', 'updated']
    readonly_fields = ['id_hex', 'created', 'updated',]
    fieldsets = [
        (_('Base Info'), {'fields': ('id_hex', )}),
        (_('Creation Info'), {'fields': ('creator','created','updated', 'link',)}),
        (_('Thread Info'), {'fields': ('isPinned','isPruned','subject', 'text', 'board',)}),
        (_('Image Info'), {'fields': ('fileName', 'thumbnail', 'avatar', 'image',)}),
    ]
    # form = BoardForm
    formfield_overrides = {
        ThumbnailerImageField: {'widget': ImageClearableFileInput},
    }


class PostAdmin(admin.ModelAdmin):
    """Post model admin"""

    def id_hex(self, obj):
        return obj.id.hex
    id_hex.admin_order_field = 'id'
    id_hex.short_description = 'ID' 

    ordering = ['created']
    list_display = ['__str__', 'id_hex', 'creator', 'created', 'updated']
    readonly_fields = ['id_hex', 'created', 'updated',]
    fieldsets = [
        (_('Base Info'), {'fields': ('id_hex', )}),
        (_('Creation Info'), {'fields': ('creator','created','updated', 'link',)}),
        (_('Post Info'), {'fields': ('text', 'board', 'thread', 'replyto',)}),
        (_('Image Info'), {'fields': ('fileName', 'thumbnail', 'avatar', 'image',)}),
    ]
    # form = BoardForm
    formfield_overrides = {
        ThumbnailerImageField: {'widget': ImageClearableFileInput},
    }


admin.site.register(Board, BoardAdmin)
admin.site.register(Thread, ThreadAdmin)
admin.site.register(Post, PostAdmin)


