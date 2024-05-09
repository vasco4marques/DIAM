from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User
from .models import user as UserProfile


# Gets all questions
class AnswerOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = answerOption
        fields = ['id', 'text', 'voteCount']


class QuestionSerializer(serializers.ModelSerializer):
    answerOption_list = AnswerOptionSerializer(many=True, required=False)

    class Meta:
        model = question
        fields = ['id', 'answerType', 'text', 'description', 'answerOption_list']

    def create(self, validated_data):
        answer_options_data = validated_data.pop('answerOption_list', [])
        question = question.objects.create(**validated_data)
        for answer_data in answer_options_data:
            answerOption.objects.create(question=question, **answer_data)
        return question


# Gets the questions and answers related with the form
class FormSerializer(serializers.ModelSerializer):
    question_list = QuestionSerializer(many=True)

    class Meta:
        model = form
        fields = ['id', 'title', 'description', 'created_at', 'question_list', 'user']
        read_only_fields = ('user',)

    def create(self, validated_data):
        questions_data = validated_data.pop('question_list')
        user = self.context['request'].user
        form_instance = form.objects.create(user=user, **validated_data)
        for question_data in questions_data:
            self.fields['question_list'].create({"form": form_instance, **question_data})
        return form_instance


# User serializer

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = user
        fields = ['id', 'username', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        UserProfile.objects.create(user=user, user_type='2')
        return user

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("This username is already in use.")
        return value


