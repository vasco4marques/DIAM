from .models import *
from .serializer import *
from django.shortcuts import render,get_object_or_404

from rest_framework import status, viewsets,mixins
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from drf_multiple_model.views import FlatMultipleModelAPIView
from drf_multiple_model.viewsets import FlatMultipleModelAPIViewSet
from rest_framework.decorators import action


# Create your views here.

# Ao criar este viewset temos logo as operações que pretendemos, como o CRUD e gestão de permissões e para isso usamos o ModelViewSet. Mais diferenças nos viewset estão na página da API
# 
class FormViewSet(viewsets.ModelViewSet):
    serializer_class = formSerializer
    queryset = form.objects.all()
        
# class FullFormView(FlatMultipleModelAPIViewSet):
#     querylist = [
#         {'queryset': form.objects.all(),'serializer_class':formSerializer},
#         {'queryset':question.objects.filter(),'serializer_class':questionSerializer}   
#     ]

class FormDetailView(APIView):
    
    def get(self, request, pk):
        form_instance = form.objects.get(pk=pk)
        serializer = FormSerializer(form_instance)
        return Response(serializer.data)
    
    


