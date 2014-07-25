from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login as dlogin, logout

# Create your views here.

def default(request):
    # check if current user is authenticated
    if request.user.is_authenticated():
        context = { 'username': request.user.username, }
        return render(request, 'user_system/default.html', context)
    else:
        return HttpResponseRedirect('/user_system/login/')

def register(request):
    return render(request, 'user_system/register.html', {})

def do_register(request):
    # POSTed here
    if ('username' in request.POST) and ('password' in request.POST):
        user = User.objects.create_user(request.POST['username'], password=request.POST['password'])
        # return HttpResponse("done")
        return HttpResponseRedirect("/user_system/login/")
    else:
        return HttpResponse("Please POST with params!")

def login(request):
    return render(request, 'user_system/login.html', {})

def do_login(request):
    if ('username' in request.POST) and ('password' in request.POST):
        #user = User.objects.get(username_exact=request.POST['username'])
        user = authenticate(username=request.POST['username'], password=request.POST['password'])
        if user is not None:
            dlogin(request, user)
            if user.is_active:
                return HttpResponse("OK, and active")
            else:
                return HttpResponse("OK, but disabled")
        else:
            return HttpResponse("Failed to auth")
    else:
        return HttpResponse("Please POST with data!")

def do_logout(request):
    logout(request)
    return HttpResponseRedirect("/user_system/login/")

