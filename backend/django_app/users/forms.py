from django.forms import ModelForm, ModelMultipleChoiceField

from core.models import User, Board

class UserForm(ModelForm):

    sub = ModelMultipleChoiceField(queryset=Board.objects.all(), required=False)

    class Meta:
        model = User
        fields = ('sub',)