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
        return render(request, 'user_system/default2.html', context)
    else:
        return HttpResponseRedirect('/login/')

def register(request):
    return render(request, 'user_system/register.html', {})

def __is_username_exist__(name):
    try:
        u = User.objects.get(username=name)
    except User.DoesNotExist:
        return False
    else:
        return True


def do_check_existence(request):
    res = {}
    if request.method == 'POST':
        if 'username' in request.POST:
            res['status'] = 0
            res['exist'] = __is_username_exist__(request.POST['username'])
        else:
            res['status'] = 1
    else:
        res['status'] = 1
    return HttpResponse(json.dumps(res), content_type='application/json')

def do_register(request):
    res = {}
    if request.method == 'POST':
        if 'username' in request.POST and 'password' in request.POST and 'email' in request.POST:
            username = request.POST['username'];
            password = request.POST['password'];
            email = request.POST['email'];
            if __is_username_exist__(username):
                res['status'] = 2
            else:
                user = User.objects.create_user(username=username, password=password)
                profile = UserProfile(user=user)
                profile.save()
                res['status'] = 0
        else:
            res['status'] = 1
    else:
        res['status'] = 1
    return HttpResponse(json.dumps(res), content_type='application/json')

def login(request):
    return render(request, 'user_system/login.html', {})

def do_login(request):
    res = {}
    if 'username' in request.POST and 'password' in request.POST:
        username = request.POST['username'];
        password = request.POST['password'];
        user = django_authenticate(username=username, password=password)
        if user is not None:
            if user.is_active:
                django_login(request, user)
                res['status'] = 0
            else:
                res['status'] = 2
        else:
            res['status'] = 2
    else:
        res['status'] = 1
    return HttpResponse(json.dumps(res), content_type='application/json')

def do_logout(request):
    django_logout(request)
    return HttpResponse("")

def settings(request):
    return render(request, 'user_system/settings.html', {});

def do_update_settings(request):
    res = {}
    if request.user.is_authenticated() and request.user.is_active and request.method == 'POST':
        profile = UserProfile.objects.get(user = request.user)
        if 'nickname' in request.POST:
            profile.nickname = request.POST['nickname']
        if 'email' in request.POST:
            request.user.email = request.POST['email']
        if 'gender' in request.POST:
            profile.gender = request.POST['gender']
        request.user.save()
        profile.save()
        res['status'] = 0
    else:
        res['status'] = 1
    return HttpResponse(json.dumps(res), content_type='application/json')

def do_update_preferences(request):
    res = {}
    return HttpResponse(json.dumps(res), content_type='application/json')

def do_check_password(request):
    res = {}
    if request.user.is_authenticated() and request.user.is_active and 'password' in request.POST:
        if request.user.check_password(request.POST['password']):
            res["status"] = 0
        else:
            res["status"] = 2
    else:
        res['status'] = 1
    return HttpResponse(json.dumps(res), content_type="application/json")

def do_set_password(request):
    res = {}
    if request.user.is_authenticated() and request.user.is_active and 'password' in request.POST:
        request.user.set_password(request.POST['password'])
        request.user.save()
        res['status'] = 0
    else:
        res['status'] = 1
    return HttpResponse(json.dumps(res), content_type="application/json")


"""
XXX check password
set password



get email to notes

"""