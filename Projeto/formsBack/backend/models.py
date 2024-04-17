from django.db import models
from django.contrib.auth.models import User

# Create your models here.

# username e password guardados pelo próprio django
class user(models.Model):
    user_type_choices=(
        ("1","Admin"),
        ("2","Default")
    )
    
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    
    email =  models.CharField(max_length=30)
    
    user_type = models.CharField(max_length=30,choices = user_type_choices)
    
    created_at = models.DateTimeField("data de criacao do user")
    


class form(models.Model):
    title = models.CharField(max_length=300)
    
    description = models.CharField(max_length=500)
    
    user = models.OneToOneField(user, on_delete=models.DO_NOTHING,default=None, null=True )
    
    created_at = models.DateTimeField("data de criacao do form")
    
    def __str__(self):
        return self.title


class question(models.Model):
    answerType_choices =  (
        ("1","radio"),
        ("2","text")
    )
    
    form = models.OneToOneField(form,on_delete=models.CASCADE)
    
    answerType=models.CharField(max_length=300,choices=answerType_choices)
    
    text = models.CharField(max_length=300) 
    
    description = models.CharField(max_length=300,null=True)
    
    def __str__(self):
        return self.text


class answerOption(models.Model):
    
    text = models.CharField(max_length=300)
    
    question = models.OneToOneField(question,on_delete=models.CASCADE)
    
    def __str__(self):
        return self.text + " - " + self.question.text + " - " + self.question.form.title
    


class userAnswer(models.Model):
    
    question = models.OneToOneField(question,on_delete=models.CASCADE)
    
    form = models.ForeignKey(form, on_delete=models.CASCADE)
    
    user = models.ForeignKey(user, on_delete=models.CASCADE)
    
    answerText = models.CharField(max_length=300, null=True)
    
    answerOption = models.ForeignKey(answerOption, on_delete=models.CASCADE)
    