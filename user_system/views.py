from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.

def default(request):
    return HttpResponse("Default view of user_system")

def register(request):
    return HttpResponse("Hello. user_system -> view.py -> register")
