from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.

def default(request):
    context = {
        'list': [
            {'text': '123'},
            {'text': 'abc'},
        ],
    }
    return render(request, 'user_system/default.html', context)

def register(request):
    request.session['key'] = 'sample'
    return HttpResponse("Hello. user_system -> view.py -> register")

def login(request):
    if 'key' in request.session:
        return HttpResponse("This is login with session value: " + request.session['key'])
    else:
        return HttpResponse("Without session value, goto register to obtain one")

