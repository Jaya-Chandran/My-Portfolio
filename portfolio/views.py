from django.shortcuts import render,redirect
from . models import *


# Create your views here.
def index(request):
    return render(request,'portfolio/index.html')

def contact(request):
       
       if request.method == 'POST':
             name = request.POST.get('name')
             email = request.POST.get('email')
             content = request.POST.get('content')
             number = request.POST.get('number')
             data = Contact(name=name,email=email,content=content,number=number)
             data.save()
             return redirect('/')
       return render(request,'portfolio/inc/contact.html')
