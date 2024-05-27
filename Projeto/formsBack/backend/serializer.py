from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User

class FormSerializer(serializers.ModelSerializer):
    class Meta:
        model = form
        fields = ['id', 'title', 'description', 'user', 'active', 'created_at']

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = question
        fields = ['id', 'form', 'type', 'title', 'mandatory', 'description']

class AnswerOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = answerOption
        fields = ['id', 'question', 'text', 'voteCount']

class UserAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = userAnswer
        fields = ['id', 'question', 'form', 'user', 'answerText']

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['id', 'username', 'user_type', 'created_at']

    def create(self, validated_data):
        user = User.objects.create_user(username=validated_data['username'], password=validated_data['password'])
        return user

class QuestionDetailSerializer(serializers.ModelSerializer):
    options = AnswerOptionSerializer(many=True, required=False)

    class Meta:
        model = question
        fields = ['id', 'type', 'title', 'description', 'mandatory', 'options']

class FormDetailSerializer(serializers.ModelSerializer):
    question_list = QuestionDetailSerializer(many=True)

    class Meta:
        model = form
        fields = ['id', 'title', 'description', 'active', 'created_at', 'question_list', 'user']
        read_only_fields = ('user',)

class userReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = userReview
        fields = ['id', 'user', 'username', 'review', 'grade']
