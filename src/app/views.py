from django.shortcuts import render
from django.http import HttpResponse
from app.models import User
from app.forms import FormName

# Create your views here.
def index(request):
    return render(request, 'app/index.html')

def users(request):
    user_list = User.objects.order_by('first_name')
    user_dict = {"users": user_list}
    return render(request, 'app/users.html', context=user_dict)

def form_name_view(request):
    form = FormName()

    if request.method == 'POST':
        form = FormName(request.POST)
        if form.is_valid():
            # DO SOMETHING CODE
            print("VALIDATION SUCCESS!")
            print("NAME: "+form.cleaned_data['name'])
            print("EMAIL: "+form.cleaned_data['email'])
            print("TEXT: "+form.cleaned_data['text'])

    return render(request, 'app/forms_page.html', {'form': form})
