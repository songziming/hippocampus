from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from notes.models import Note
from user_system.models import UserProfile
import json

# Create your views here.
def do_get_notes(request):
    res = {}
    print 'getting posts'
    if request.user.is_authenticated() and request.user.is_active:
        res['status'] = 0
        arr = Note.objects.all().filter(user = request.user)
        res['notes'] = [];
        for e in arr:
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
#        if 'index' in request.POST:
#            note.index = request.POST['index']
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
#            if 'index' in request.POST:
#                note.index = request.POST['index']
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