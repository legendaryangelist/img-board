
from django.forms import ModelForm, ModelMultipleChoiceField

from versatileimagefield.fields import SizedImageCenterpointClickDjangoAdminField

from core.models import Post, Thread, Board

class BoardForm(ModelForm):
    image = SizedImageCenterpointClickDjangoAdminField(required=False)

    # threads = ModelMultipleChoiceField(queryset=Thread.objects.filter(board_id=self.id).order_by('created'))

    # def threads(self, obj):
    #     return Thread.objects.filter(
    #             board_id=obj.id
    #         ).order_by('created')
    # threads.admin_order_field = 'id'
    # threads.short_description = 'Threads' 

    class Meta:
        model = Board
        fields = ('image',)