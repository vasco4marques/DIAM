from django.db import models
from six import string_types
import datetime
from django.utils import timezone 
from django.contrib.auth.models import User
# Create your models here.



class Questao(models.Model):
    questao_texto=models.CharField(max_length=400)
    pub_data=models.DateTimeField('data de publicacao')

    def __str__(self):
        return self.questao_texto
    
    def foi_pub_recentemente(self):
        return self.pub_data >= timezone.now() - datetime.timedelta(days=1)
    
    def get_pub_data(self):
        return self.pub_data



class Opcao(models.Model):
    questao = models.ForeignKey(Questao, on_delete=models.CASCADE)
    opcao_texto=models.CharField(max_length=400)
    votos = models.IntegerField(default=0)

    def __str__(self):
        return self.opcao_texto
    
    def votes(self):
        return self.votos



class Aluno(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    curso = models.CharField(max_length=100)
    grupo = models.CharField(max_length=100)
    maxVotes=models.IntegerField(default=0)
    voteCounter=models.IntegerField(default=0)
    hasPicture=models.BooleanField(default=False)
    
    

    def __str__(self):
        return self.user.username


    def defineMaxVotes(self):
        grupo=self.grupo
        self.maxVotes = int(grupo[-1])+5

    def incrementVotes(self):
        self.voteCounter = self.voteCounter +1