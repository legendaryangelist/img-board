from django.contrib import admin
from django.utils.translation import gettext as _
from core.models import Wallet, ETH, NFT, TokenURI


class WalletAdmin(admin.ModelAdmin):
    """Wallet model admin"""
    
    ordering = ['id']
    list_display = ['id', 'address',]
    readonly_fields = ['id',]
    fieldsets = (
        (_('Base Info'), {'fields': ('id',)}),
        (_('User Info'), {'fields': ('user',)}),
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
    list_display = ['id', 'address', 'erc_type',]
    readonly_fields = ['id',]
    fieldsets = (
        (_('Base Info'), {'fields': ('id',)}),
        (_('Wallet Info'),{'fields': ('wallet', 'address',)}),
        (_('Chain Info'),{'fields': ('erc_type', 'asset_object',)}),
    )
    

class TokenURIAdmin(admin.ModelAdmin):
    """TokenURI model admin"""
    
    ordering = ['id']
    list_display = ['id', 'address',]
    readonly_fields = ['id',]
    fieldsets = (
        (_('Base Info'), {'fields': ('id',)}),
        (_('Address Info'), {'fields': ('address',)}),
        (_('TokenURI Info'),{'fields': ('name', 'description', 'imageURL', 'traits',)}),
    )


# Register Admins

admin.site.register(Wallet, WalletAdmin)
admin.site.register(ETH,    ETHAdmin)
admin.site.register(NFT,    NFTAdmin)
admin.site.register(TokenURI, TokenURIAdmin)