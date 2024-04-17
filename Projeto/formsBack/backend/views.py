from django.shortcuts import render
from rest_framework import status, viewsets
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from .models import *
from rest_framework.response import Response
from .serializer import *

from django.shortcuts import get_object_or_404


# Create your views here.

# Ao criar este viewset temos logo as operações que pretendemos, como o CRUD e gestão de permissões e para isso usamos o ModelViewSet. Mais diferenças nos viewset estão na página da API

class FormViewSet(viewsets.ModelViewSet):
    serializer_class = formSerializer
    queryset = form.objects.all()
    
