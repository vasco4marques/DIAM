from rest_framework import serializers
from .models import *


class formSerializer(serializers.ModelSerializer):
    class Meta:
        model = form
        fields = ["id","title","description"]

class AnswerOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = answerOption
        fields = ['id', 'text', 'voteCount']

class QuestionSerializer(serializers.ModelSerializer):
    answerOption_list = AnswerOptionSerializer(many=True, read_only=True)

    class Meta:
        model = question
        fields = ['id', 'answerType', 'text', 'description', 'answerOption_list']
        depth=2

class FormSerializer(serializers.ModelSerializer):
    question_list = QuestionSerializer(many=True, read_only=True)

    class Meta:
        model = form
        fields = ['id', 'title', 'description', 'created_at', 'question_list']
        depth = 3



# class questionSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = question
#         fields = ["id", "answerType","text","form","description"]