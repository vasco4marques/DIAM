from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User
from .models import Profile as UserProfile

# Gets all questions

class FormSerializer(serializers.ModelSerializer):
    class Meta:
        model = form
        fields = ['id', 'title', 'description','user', 'active', 'created_at']

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = question
        fields = ['id','form' ,'type', 'title', 'mandatory', 'description']

class AnswerOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = answerOption
        fields = ['id', 'question', 'text', 'voteCount']

class UserAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = userAnswer
        fields = ['id','question','form','user','answerText']

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['id', 'username']

    def create(self, validated_data):
        user = User.objects.create_user(username=validated_data['username'], password=validated_data['password'])
        #UserProfile.objects.create(user=user, user_type='2')
        return user



class QuestionDetailSerializer(serializers.ModelSerializer):
    options = AnswerOptionSerializer(many=True, required=False)

    class Meta:
        model = question
        fields = ['id', 'type', 'title', 'description', 'mandatory', 'options']

    # def create(self, validated_data):
    #     answer_options_data = validated_data.pop('answerOption_list', [])
    #     question = question.objects.create(**validated_data)
    #     for answer_data in answer_options_data:
    #         answerOption.objects.create(question=question, **answer_data)
    #     return question




# Gets the questions and answers related with the form
class FormDetailSerializer(serializers.ModelSerializer):
    question_list = QuestionDetailSerializer(many=True)

    class Meta:
        model = form
        fields = ['id', 'title', 'description', 'active', 'created_at', 'question_list', 'user']
        read_only_fields = ('user',)

    # def create(self, validated_data):
    #     questions_data = validated_data.pop('question_list')
    #     user = self.context['request'].user
    #     form_instance = form.objects.create(user=user, **validated_data)
    #     for question_data in questions_data:
    #         self.fields['question_list'].create({"form": form_instance, **question_data})
    #     return form_instance
    
    # def edit(self,validated_data,pk):
    #     form_instance = form.objects.get(pk=pk)
    #     form_instance.title = validated_data['title']
    #     form_instance.description = validated_data['description']
    #     question_list = validated_data.pop('question_list')
    #     for question_data in question_list:
    #         answer_list = question_data.pop('answerOption_list')
    #         question_instance = question.objects.get(pk=question_data["id"])
    #         question_instance.text = question_data["text"]
    #         question_instance.description = question_data["description"]
    #         question_instance.answerType = question_data["answerType"]
    #         question_instance.save()
    #         for answer_data in answer_list:
    #             answer_instance = answerOption.objects.get(pk=answer_data["id"])
    #             answer_instance.text = answer_data["text"]
    #             answer_instance.voteCount = answer_data["voteCount"]
    #             answer_instance.save()
    #     form_instance.save()
        
        



class userReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = userReview
        fields = ['id','user','review','grade']




