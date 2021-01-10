from django.shortcuts import render

def react(request):
  return render(request, 'frontend/react.html')