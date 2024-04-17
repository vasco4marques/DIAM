from django.db import models

# Create your models here.
class form(models.Model):
    title = models.CharField(max_length=300)
    description = models.CharField(max_length=500)
    
    def __str__(self):
        return self.title


class question(models.Model):
    answerType_choices =  (
        ("1","radio"),
        ("2","text")
    )
    text = models.CharField(max_length=300) 
    answerType=models.CharField(max_length=300,choices=answerType_choices)
    form = models.ForeignKey(form,on_delete=models.CASCADE)
    
    def __str__(self):
        return self.text


class answer(models.Model):
    text = models.CharField(max_length=300)
    question = models.ForeignKey(question,on_delete=models.CASCADE)
    
    
    
    def __str__(self):
        return self.text + " - " + self.question.text + " - " + self.question.form.title
    
    