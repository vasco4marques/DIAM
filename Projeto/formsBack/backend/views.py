from .models import *
from .serializer import *
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.http import JsonResponse
from rest_framework import viewsets
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from django.views.decorators.http import require_http_methods
User = get_user_model()

# Ao criar este viewset temos logo as operações que pretendemos, 
# como o CRUD e gestão de permissões e para isso usamos o ModelViewSet. 
# Mais diferenças nos viewset estão na página da API

# Com este view set dá para ver os forms em "/forms"
# Ver um form específico com "/forms/id"
# Criar, editar e apagar forms


from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response

from rest_framework.decorators import action

class FormViewSet(viewsets.ModelViewSet):
    serializer_class = FormSerializer
    queryset = form.objects.all()

    @action(detail=False, methods=['post'], url_path='create-form')
    def create_form(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
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
    
class LoginView(APIView): 
    def post(self, request): 
        username = request.data.get('username') 
        password = request.data.get('password') 
        user = authenticate(username=username, password=password) 
        if user: 
            token, _ = Token.objects.get_or_create(user=user) 
            return JsonResponse({
                'token': token.key, 
                'username': username,
                'message': 'User logged in!'
            }) 
        else: 
            return JsonResponse({'message': 'Credenciais inválidas'}, status=400) 

class RegisterView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return JsonResponse({'message': 'Missing username or password'}, status=400)

        if User.objects.filter(username=username).exists():
            return JsonResponse({'message': 'Username already exists'}, status=409)

        user = User.objects.create_user(username=username, password=password)
        user.save()

        return JsonResponse({
            'message': 'User registered successfully!'
        }, status=201)
    
