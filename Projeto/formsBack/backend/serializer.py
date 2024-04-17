from rest_framework import serializers
from .models import *

# Gets all forms
class formSerializer(serializers.ModelSerializer):
    class Meta:
        model = form
        fields = ["id","title","description"]
        
        
# Gets all questions
class questionSerializer(serializers.ModelSerializer):
    class Meta:
        model = question
        fields = ["id", "answerType","text","form","description"]   


# Gets all answers
class AnswerOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = answerOption
        fields = ['id', 'text', 'voteCount']

# Gets answers related with the question
class QuestionSerializer(serializers.ModelSerializer):
    answerOption_list = AnswerOptionSerializer(many=True, read_only=True)

    class Meta:
        model = question
        fields = ['id', 'answerType', 'text', 'description', 'answerOption_list']
        depth=2

# Gets the questions and answers related with the form
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