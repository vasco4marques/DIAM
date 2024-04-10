from django.contrib import admin
from .models import Questao, Opcao, Aluno

# Register your models here.

admin.site.register(Questao)
admin.site.register(Opcao)
admin.site.register(Aluno)