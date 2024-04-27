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

# Com este view set dá para ver os forms em "/forms"
# Ver um form específico com "/forms/id"
# Criar, editar e apagar forms



class FormViewSet(viewsets.ModelViewSet):
    serializer_class = formSerializer
    queryset = form.objects.all()
    
# Form detail
class FormDetailView(APIView):
    def get(self, request, pk):
        form_instance = form.objects.get(pk=pk)
        serializer = FormSerializer(form_instance)
        return Response(serializer.data)
    
    
# Question detail

class QuestionDetailView(APIView):
    def get(self, request, pk):
        question_instance = question.objects.get(pk=pk)
        serializer = QuestionSerializer(question_instance)
        return Response(serializer.data)
    
# Answer detail

class AnswerDetailView(APIView):
    def get(self, request, pk):
        answer_instance = answerOption.objects.get(pk=pk)
        serializer = AnswerOptionSerializer(answer_instance)
        return Response(serializer.data)
    
# User Answer detail

class UserAnswerDetailView(APIView):
    def get(self, request, pk):
        user_answer_instance = userAnswer.objects.get(pk=pk)
        serializer = AnswerOptionSerializer(user_answer_instance)
        return Response(serializer.data)
    
# User detail

class UserDetailView(APIView):
    def get(self, request, pk):
        user_instance = user.objects.get(pk=pk)
        serializer = UserSerializer(user_instance)
        return Response(serializer.data)
    
    
    
    


