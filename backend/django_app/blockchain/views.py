from rest_framework import viewsets, mixins, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response

from core.models import Wallet, TokenURI

from .serializers import WalletSerializer, TokenURISerializer


# -----------------------------------------------------
# ------------------- Wallet Viewset -------------------
# -----------------------------------------------------
class WalletViewSet(viewsets.ModelViewSet):
    """A viewset that provides the standard actions for 'Wallet' model"""
    serializer_class = WalletSerializer
    queryset = Wallet.objects.all()

    def get_queryset(self):
        """Retrieve the Wallets"""
        return Wallet.objects.all() # .order_by('created')  # Return all Wallets queryset to reload REST Viewset
    
    def get_serializer_class(self):
        """Return appropriate serializer class"""
        return self.serializer_class
    
    def perform_create(self, serializer):
        """Create a new Wallet"""
        serializer.save()


# -----------------------------------------------------
# ------------------- TokenURI Viewset -------------------
# -----------------------------------------------------
class TokenURIViewSet(viewsets.ModelViewSet):
    """A viewset that provides the standard actions for 'TokenURI' model"""
    serializer_class = TokenURISerializer
    queryset = TokenURI.objects.all()

    def get_queryset(self):
        """Retrieve the TokenURIs"""
        return TokenURI.objects.all() # .order_by('created')  # Return all TokenURIs queryset to reload REST Viewset
    
    def get_serializer_class(self):
        """Return appropriate serializer class"""
        return self.serializer_class
    
    def perform_create(self, serializer):
        """Create a new TokenURI"""
        serializer.save()