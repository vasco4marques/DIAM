from rest_framework.permissions import IsAuthenticated 
from .models import *
from .serializer import *
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.http import JsonResponse
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth import get_user_model

User = get_user_model()

# Form views 
class FormViewSet(viewsets.ModelViewSet):
    serializer_class = FormSerializer
    queryset = form.objects.all()
    permission_classes = [IsAuthenticated]

class FormPerUser(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, pk):
        form_list = form.objects.filter(user=pk)
        serializer = FormDetailSerializer(form_list, many=True)
        return Response(serializer.data)

class FormDetailView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, pk):
        form_instance = form.objects.get(pk=pk)
        serializer = FormDetailSerializer(form_instance)
        return Response(serializer.data)

class FormByIdActive(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, pk):
        form_instance = form.objects.get(id=pk, active=True)
        serializer = FormDetailSerializer(form_instance)
        return Response(serializer.data)

# Question views
class QuestionViewSet(viewsets.ModelViewSet):
    serializer_class = QuestionSerializer
    queryset = question.objects.all()
    permission_classes = [IsAuthenticated]

class QuestionDetailView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, pk):
        question_instance = question.objects.get(pk=pk)
        serializer = QuestionSerializer(question_instance)
        return Response(serializer.data)

# AnswerOption views
class AnswerOptionViewSet(viewsets.ModelViewSet):
    serializer_class = AnswerOptionSerializer
    queryset = answerOption.objects.all()
    permission_classes = [IsAuthenticated]

class AnswerDetailView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, pk):
        answer_instance = answerOption.objects.get(pk=pk)
        serializer = AnswerOptionSerializer(answer_instance)
        return Response(serializer.data)

# UserAnswer views
class UserAnswerViewSet(viewsets.ModelViewSet):
    serializer_class = UserAnswerSerializer
    queryset = userAnswer.objects.all()
    permission_classes = [IsAuthenticated]

class UserAnswerDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        user_answer_instance = userAnswer.objects.get(pk=pk)
        serializer = AnswerOptionSerializer(user_answer_instance)
        return Response(serializer.data)

class UserAnswerByForm(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, pk):
        userAnswer_list = userAnswer.objects.filter(form=pk)
        serializer = UserAnswerSerializer(userAnswer_list, many=True)
        return Response(serializer.data)

# Authentication views
class LoginView(APIView): 
    
    def post(self, request): 
        username = request.data.get('username') 
        password = request.data.get('password') 
        user = authenticate(username=username, password=password)
        if user:  
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
            return JsonResponse({'message': 'Invalid credentials'}, status=400) 

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
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        if request.user.is_authenticated:
            request.user.auth_token.delete()
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

# UserReview views
class userReviewViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = userReviewSerializer
    queryset = userReview.objects.all()

class userReviewView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        review = userReviewView.objects.get(user=pk)
        serializer = userReviewSerializer(review)
        return Response(serializer.data)

# User views
class userViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()
