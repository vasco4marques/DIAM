from django.contrib import admin
from django.urls import path
from . import views
from .views import LoginView 

app_name = "votacao"
urlpatterns = [
    path("", views.index, name = "index"),
    
    path("<int:questao_id>", views.detalhe, name = "detalhe"),
    
    path("<int:questao_id>/resultados", views.resultados, name = "resultados"),
    
    path("<int:questao_id>/voto", views.voto ,name = "voto"),

    path("create-question/", views.createQuestion, name="create-question"),

    path("<int:questao_id>/create-option", views.createOption, name="create-option"),
    
    path("login/", LoginView.as_view(), name="login"),
    
    path("register/",views.register, name="register"),

    path("info/", views.personalInfo,name="personalInfo"),
    
    path("updatePicture/", views.updatePicture,name="updatePicture")
]

