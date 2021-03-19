from django.contrib import admin
from django.utils.translation import gettext as _
from core.models import Wallet

class WalletAdmin(admin.ModelAdmin):
    """Wallet model admin"""
    
    ordering = ['id']
    list_display = ['id',]
    fieldsets = (
        (_('Base Info'), {'fields': ('id',)}),
        # (_('User Info'), {'fields': ('user',)}),
        (_('Wallet Info'),{'fields': ('wallet_address',)}),
    )
    


admin.site.register(Wallet, WalletAdmin)