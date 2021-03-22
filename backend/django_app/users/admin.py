from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext as _
from core.models import User
from users.forms import UserForm

class UserAdmin(admin.ModelAdmin):
    """User model admin"""

    def id_hex(self, obj):
        return obj.id.hex
    id_hex.admin_order_field = 'id'
    id_hex.short_description = 'ID' 

    def _sub(self, obj):
        return obj.sub
    _sub.admin_order_field = 'sub'
    _sub.short_description = 'sub' 
    
    ordering = ['created']
    list_display = ['__str__', 'id_hex', 'email', 'created', 'updated']
    readonly_fields = ['id_hex', 'created', 'updated',]
    fieldsets = (
        (_('Base Info'), {'fields': ('id_hex', 'email', 'password',)}),
        (_('Personal Info'), {'fields': ('username',)}),
        (_('Permissions'),{'fields': ('is_active', 'is_staff', 'is_superuser',)}),
        (_('Cryptographic Info'),{'fields': ('nonce', 'public_address',)}),
        (_('Creation Info'), {'fields': ('created','updated', 'link',)}),
        (_('Image Info'), {'fields': ('fileName','thumbnail', 'avatar', 'image',)}),
        (_('Board Info'),{'fields': ('sub', 'super_sub', 'user_boards', 'user_threads', 'user_posts',)}),        
        (_('Important dates'), {'fields': ('last_login',)}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2')
        }),
    )
    


admin.site.register(User, UserAdmin)