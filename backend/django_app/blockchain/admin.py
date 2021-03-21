from django.contrib import admin
from django.utils.translation import gettext as _
from core.models import Wallet, ERC20, ERC721, ERC1155

class WalletAdmin(admin.ModelAdmin):
    """Wallet model admin"""
    
    ordering = ['id']
    list_display = ['id',]
    fieldsets = (
        (_('Base Info'), {'fields': ('id',)}),
        (_('Wallet Info'),{'fields': ('address',)}),
    )
    


class ERC20Admin(admin.ModelAdmin):
    """ERC20 model admin"""
    
    ordering = ['id']
    list_display = ['id',]
    fieldsets = (
        (_('Base Info'), {'fields': ('id',)}),
        (_('Wallet Info'),{'fields': ('wallet',)}),
    )


class ERC721Admin(admin.ModelAdmin):
    """ERC20 model admin"""
    
    ordering = ['id']
    list_display = ['id',]
    fieldsets = (
        (_('Base Info'), {'fields': ('id',)}),
        (_('Wallet Info'),{'fields': ('wallet',)}),
    )


class ERC1155Admin(admin.ModelAdmin):
    """ERC20 model admin"""
    
    ordering = ['id']
    list_display = ['id',]
    fieldsets = (
        (_('Base Info'), {'fields': ('id',)}),
        (_('Wallet Info'),{'fields': ('wallet',)}),
    )
    


# Register Admins

admin.site.register(Wallet,     WalletAdmin)
admin.site.register(ERC20,      ERC20Admin)
admin.site.register(ERC721,     ERC721Admin)
admin.site.register(ERC1155,    ERC1155Admin)