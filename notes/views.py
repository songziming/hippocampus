# -*- coding: utf-8 -*-
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from notes.models import Note
from user_system.models import User, UserProfile
import json
from StringIO import StringIO

# Create your views here.
def do_get_notes(request):
    res = {}
    print 'getting posts'
    if request.user.is_authenticated() and request.user.is_active:
        res['status'] = 0
        arr = Note.objects.all().filter(user = request.user)
        res['notes'] = [];
        for e in arr:
            print "getting note %s" % e.title
            res['notes'].append({'id': e.id, 'title': e.title, 'category': e.category, 'content': e.content, 'index': e.index, 'color': e.color});
    else:
        res['status'] = 1
    return HttpResponse(json.dumps(res), content_type='application/json')

def __is_note_exist__(user, title):
    try:
        # u = User.objects.get(username=name)
        note = Note.objects.get(user = user, title = title)
    except Note.DoesNotExist:
        return False
    else:
        return True

def __create_note__(user, title, category = "mail", content = ""):
    try:
        n = Note.objects.get(user=user, title=title)
    except Note.DoesNotExist:
        num = len(Note.objects.all().filter(user=user))
        note = Note(user = user)
        note.title = title
        note.category = category
        note.content = content
        note.index = num + 1
        note.save()
        p = UserProfile.objects.get(user=user)
        ss = p.notesOrder
        ods = json.load(StringIO(ss))
        for i in xrange(len(ods)):
            if ods[i].Category == "全部":
                ods[i].indexs.append({"id":note.id, "index": note.index})
                break
        p.notesOrder = json.dumps(ods)
        p.save()

    else:
        pass

def do_create_note(request):
    res = {}
    if request.user.is_authenticated() and request.user.is_active:
#        note = Note(user = request.user, title = request.POST['title'], content = request.POST['content'])
        note = Note(user = request.user)
        if 'title' in request.POST:
            note.title = request.POST['title']
        if 'category' in request.POST:
            note.category = request.POST['category']
        if 'content' in request.POST:
            note.content = request.POST['content']
        if 'index' in request.POST:
            note.index = request.POST['index']
        if 'color' in request.POST:
            note.color = request.POST['color']
        note.save()
        res['id'] = note.id
        res['status'] = 0
    else:
        res['status'] = 1
    return HttpResponse(json.dumps(res), content_type = "application/json")

def do_update_note(request):
    res = {}
    if request.user.is_authenticated() and request.user.is_active and 'id' in request.POST:
        try:
            note = Note.objects.get(user = request.user, id = request.POST['id'])
        except Note.DoesNotExist:
            res['status'] = 2
        else:
            if 'title' in request.POST:
                note.title = request.POST['title']
            if 'category' in request.POST:
                note.category = request.POST['category']
            if 'content' in request.POST:
                note.content = request.POST['content']
            if 'index' in request.POST:
                note.index = request.POST['index']
            if 'color' in request.POST:
                note.color = request.POST['color']
            note.save()
            res['status'] = 0
    else:
        res['status'] = 1
    return HttpResponse(json.dumps(res), content_type = "application/json")

def do_delete_note(request):
    res = {}
    if request.user.is_authenticated() and request.user.is_active and 'id' in request.POST:
        try:
            note = Note.objects.get(user = request.user, id = request.POST['id'])
        except Note.DoesNotExist:
            res['status'] = 2
        else:
            note.delete()
            res['status'] = 0
    else:
        res['status'] = 1
    return HttpResponse(json.dumps(res), content_type = "application/json")

def do_get_notes_order(request):
    res = {}
    if request.user.is_authenticated() and request.user.is_active:
        try:
            profile = UserProfile.objects.get(user = request.user);
        except UserProfile.DoesNotExist:
            res['status'] = 2
        else:
            res['notesorder'] = profile.notesOrder
            res['status'] = 0
    else:
        res['status'] = 1
    return HttpResponse(json.dumps(res), content_type = "application/json")

def do_update_notes_order(request):
    res = {}
    if request.user.is_authenticated() and request.user.is_active and 'notesorder' in request.POST:
        try:
            profile = UserProfile.objects.get(user = request.user);
        except UserProfile.DoesNotExist:
            res['status'] = 2
        else:
            profile.notesOrder = request.POST['notesorder']
            profile.save()
            res['status'] = 0
    else:
        res['status'] = 1
    return HttpResponse(json.dumps(res), content_type = "application/json")

def __update_index__(request, id, index):
    note = Note.objects.get(user = request.user, id = id)
    note.index = index
    note.save()

# preferred POST data: {"pairs":[{"id":1, "index":5}, {"id":2, "index":4}]}
def do_update_indexes(request):
    res = {}
    if request.user.is_authenticated() and request.user.is_active and 'pairs' in request.POST:
#        try:
#            pairs = request.POST['pairs'];
#            print pairs
#            for e in pairs:
#                __update_index__(request, e.id, e.index)
#        except Note.DoesNotExist:
#            res['status'] = 2
#        else:
#            res['status'] = 0
        str = request.POST['pairs']
        arr = json.load(StringIO(str))
        l = len(arr) / 2
        for i in range(0, l-1):
            print "setting Id %d Index %d" % (arr[2*i], arr[2*i+1])
            __update_index__(request, arr[2*i], arr[2*i+1])
        res['status'] = 0
    else:
        res['status'] = 1
    return HttpResponse(json.dumps(res), content_type = "application/json")

def do_import_notes(request):
    res = {}
    if request.user.is_authenticated() and request.user.is_active and 'username' in request.POST:
        try:
            olduser = User.objects.get(username = request.POST['username'])
            arr = Note.objects.all().filter(user = olduser)
            for e in arr:
                note = Note(user = request.user)
                note.title = e.title
                note.category = e.category
                note.content = e.content
                note.index = e.index
                note.color = e.color
                note.save()
            res['status'] = 0
        except User.DoesNotExist:
            res['status'] = 2
    else:
        res['status'] = 1
    return HttpResponse(json.dumps(res), content_type = "application/json")