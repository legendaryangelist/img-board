from rest_framework import serializers

from core.models import Wallet, TokenURI


class WalletSerializer(serializers.ModelSerializer):
    """Serializer for Wallet object"""
    id      = serializers.UUIDField(format='hex', read_only=True)

    class Meta:
        model = Wallet
        fields = (
            'id', 
            'user',
            'address', 
        )
        read_only_Fields = ('id',)
        extra_kwargs = {
            'id':{'read_only':True,},
        }
    
    def create(self, validated_data):
        """Create a new Wallet and return it"""
        return Wallet.objects.create_wallet(**validated_data)

    # def update(self, instance, validated_data):
    #     """Update a Wallet and return it"""
    #     return Wallet.objects.update_wallet(instance, validated_data)


class TokenURISerializer(serializers.ModelSerializer):
    """Serializer for TokenURI object"""
    id      = serializers.UUIDField(format='hex', read_only=True)

    class Meta:
        model = TokenURI
        fields = (
            'id', 
            'address',
            'name',
            'description',
            'imageURL',
            'traits',
        )
        read_only_Fields = ('id',)
        extra_kwargs = {
            'id':{'read_only':True,},
        }
    
    def create(self, validated_data):
        """Create a new TokenURI and return it"""
        return TokenURI.objects.create_TokenURI(**validated_data)