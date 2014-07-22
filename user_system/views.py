from django.shortcuts import render
from django.http import HttpResponse
from django.template import RequestContext, loader
from django.shortcuts import render

# Create your views here.

def default(request):
    # return HttpResponse("Default view of user_system")
#    template = loader.get_template('default.html')
    #context = RequestContext(request,
    context = {
        'list': [
            {'text': '123'},
            {'text': 'abc'},
        ],
    }#)

    # return HttpResponse(template.render(context))
    return render(request, 'default.html', context)

def register(request):
    return HttpResponse("Hello. user_system -> view.py -> register")
