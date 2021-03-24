from django.contrib import admin
from django.utils.translation import gettext as _
from core.models import Wallet, ETH, NFT

class WalletAdmin(admin.ModelAdmin):
    """Wallet model admin"""
    
    ordering = ['id']
    list_display = ['id',]
    readonly_fields = ['id',]
    fieldsets = (
        (_('Base Info'), {'fields': ('id',)}),
        (_('Wallet Info'),{'fields': ('address',)}),
    )
    


class ETHAdmin(admin.ModelAdmin):
    """ETH model admin"""
    
    ordering = ['id']
    list_display = ['id',]
    readonly_fields = ['id',]
    fieldsets = (
        (_('Base Info'), {'fields': ('id',)}),
        (_('Wallet Info'),{'fields': ('wallet',)}),
    )


class NFTAdmin(admin.ModelAdmin):
    """ETH model admin"""
    
    ordering = ['id']
    list_display = ['id',]
    readonly_fields = ['id',]
    fieldsets = (
        (_('Base Info'), {'fields': ('id',)}),
        (_('Wallet Info'),{'fields': ('wallet',)}),
    )
    


# Register Admins

admin.site.register(Wallet, WalletAdmin)
admin.site.register(ETH,    ETHAdmin)
admin.site.register(NFT,    NFTAdmin)