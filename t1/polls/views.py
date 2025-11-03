from django.shortcuts import render
from django.http import HttpResponse
def index(request):
    return HttpResponse("Hello I'm Alireza Poursoleymani. You are at the poll apps index.")
