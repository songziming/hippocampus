# -*- coding: utf-8 -*-

from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate as django_authenticate, login as django_login, logout as django_logout
from user_system.models import UserProfile
import json

# Create your views here.

def default(request):
    # check if current user is authenticated
    if request.user.is_authenticated():
        context = { 'username': request.user.username, }
        return render(request, 'user_system/default.html', context)
    else:
        return HttpResponseRedirect('/login/')

def register(request):
    return render(request, 'user_system/register.html', {})

def is_username_exist(name):
    try:
        u = User.objects.get(username=name)
    except User.DoesNotExist:
        return False
    else:
        return True


def do_check_existence(request):
    data = {}
    if request.method == 'POST':
        if 'username' in request.POST:
            data['status'] = 0
            data['exist'] = is_username_exist(request.POST['username'])
        else:
            data['status'] = 1
    else:
        data['status'] = 1
    return HttpResponse(json.dumps(data), content_type='application/json')

def do_register(request):
    data = {}
    if request.method == 'POST':
        if ('username' in request.POST) and ('password' in request.POST):
            user = User.objects.create_user(request.POST['username'], password=request.POST['password'])
            profile = UserProfile(user=user)
            data['status'] = 0
        else:
            data['status'] = 1
    else:
        data['status'] = 1
    return HttpResponse(json.dumps(data), content_type='application/json')

def login(request):
    return render(request, 'user_system/login.html', {})

def do_login(request):
    data = {}
    if ('username' in request.POST) and ('password' in request.POST):
        #user = User.objects.get(username_exact=request.POST['username'])
        user = django_authenticate(username=request.POST['username'], password=request.POST['password'])
        if user is not None:
            if user.is_active:
                django_login(user)
                data['status'] = 0
            else:
                data['status'] = 2
        else:
            data['status'] = 2
    else:
        data['status'] = 1
    return HttpResponse(json.dumps(data), content_type='application/json')

def do_logout(request):
    django_logout(request)
    return HttpResponseRedirect("/login/")

def settings(request):
    return HttpResponse('123');

def do_update_settings(request):
    data = {}
    if request.method == 'POST':
        data['status'] = 0
    else:
        data['status'] = 1
    return HttpResponse(json.dumps(data), content_type='application/json')

def do_update_preferences(request):
    data = {}
