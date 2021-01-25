
from django.forms import ModelForm

from versatileimagefield.fields import SizedImageCenterpointClickDjangoAdminField

from .models import Post, Thread, Board

class BoardForm(ModelForm):
    image = SizedImageCenterpointClickDjangoAdminField(required=False)

    class Meta:
        model = Board
        fields = ('image',)