from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from .models import *
from .serializer import *
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from rest_framework import viewsets
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import action
User = get_user_model()

# Ao criar este viewset temos logo as operações que pretendemos, 
# como o CRUD e gestão de permissões e para isso usamos o ModelViewSet. 
# Mais diferenças nos viewset estão na página da API

# Com este view set dá para ver os forms em "/forms"
# Ver um form específico com "/forms/id"
# Criar, editar e apagar forms

class FormViewSet(viewsets.ModelViewSet):
    serializer_class = FormSerializer
    queryset = form.objects.all()
    # permission_classes = [IsAuthenticated]

    # @action(detail=False, methods=['post'], url_path='create-form')
    # def create(self, request):
    #     serializer = self.get_serializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save(user=request.user)
    #         serializer.create(serializer.validated_data)
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     else:
    #         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    # @action(detail = False, methods=['put'], url_path='edit-form')
    # def update(self,request,pk):
    #     serializer = self.get_serializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save(user=request.user)
    #         serializer.edit(serializer.validated_data,pk)
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     else:
    #         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class QuestionViewSet(viewsets.ModelViewSet):
    serializer_class = QuestionSerializer
    queryset = question.objects.all()
    # permission_classes = [IsAuthenticated]
    
    
class AnswerOptionViewSet(viewsets.ModelViewSet):
    serializer_class = AnswerOptionSerializer
    queryset=answerOption.objects.all()
    # permission_classes = [IsAuthenticated]
    
    
class UserAnswerViewSet(viewsets.ModelViewSet):
    serializer_class = UserAnswerSerializer
    queryset=userAnswer.objects.all()
    # permission_classes = [IsAuthenticated]
    
class FormPerUser(APIView):
    def get(self, request, pk):
        form_list = form.objects.filter(user = pk)
        serializer = FormDetailSerializer(form_list, many=True)
        return Response(serializer.data)
    
    

# Esta view só serve para, com um pedido ao backend, receber um form especifico e todas as questões e opções
class FormDetailView(APIView):
    def get(self, request, pk):
        form_instance = form.objects.get(pk=pk)
        serializer = FormDetailSerializer(form_instance)
        return Response(serializer.data)
    
    
class FormByIdActive(APIView):
    def get(self,request,pk):
        form_list = form.objects.get(id = pk, active = True)
        serializer = FormDetailSerializer(form_list)
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
    
class UserAnswerByForm(APIView):
    def get(self,request,pk):
        userAnswer_list = userAnswer.objects.filter(form = pk)
        serializer = UserAnswerSerializer(userAnswer_list, many=True)
        return Response(serializer.data)

    
class LoginView(APIView): 
    authentication_classes = [TokenAuthentication]
    def post(self, request): 
        username = request.data.get('username') 
        password = request.data.get('password') 
        user = authenticate(username=username, password=password)
        if user: 
            login(request, user) 
            profile = Profile.objects.get(username=username)
            token, _ = Token.objects.get_or_create(user=user) 
            return JsonResponse({
                'token': token.key, 
                'username': username,
                'userId': profile.id,
                'userType': profile.user_type,
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
        
        costumUser = Profile(user=user, username=username, user_type='Default')
        costumUser.save()

        return JsonResponse({
            'message': 'User registered successfully!'
        }, status=201)
    


class LogoutView(APIView):
    def get(self, request):
        print(request.user)
        if request.user.is_authenticated:
            request.user.auth_token.delete()
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
class userReviewView(APIView):

    def get(self,request,pk):
        review = userReviewView.objects.get(user = pk)
        serializer = userReviewSerializer(review)
        return Response(serializer.data)


class userReviewViewSet(viewsets.ModelViewSet):

    serializer_class = userReviewSerializer
    queryset = userReview.objects.all()
    # permission_classes = [IsAuthenticated]
    
    
class userViewSet(viewsets.ModelViewSet):
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()
    
    