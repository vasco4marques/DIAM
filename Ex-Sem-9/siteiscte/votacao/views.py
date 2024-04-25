from django.shortcuts import get_object_or_404, render
from django.http import HttpResponse, Http404, HttpResponseRedirect
from django.template import loader 
from django.urls import reverse 
from .models import Questao, Opcao, Aluno
from django.utils import timezone 
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.shortcuts import render 
from django.conf import settings 
from django.core.files.storage import FileSystemStorage 
from django.contrib.auth.decorators  import login_required, user_passes_test


# Create your views here.

def index(request): 
    if request.method=="POST":
        if request.POST["logout"]:
            logout(request)
     
    latest_question_list = Questao.objects.order_by('-pub_data')[:5] 
    context = { 
        'latest_question_list': latest_question_list, 
    }
    return render(request,"votacao/index.html", context)

def detalhe(request, questao_id):
    questao = get_object_or_404(Questao, pk=questao_id)
    return render(request, "votacao/detalhe.html", {"questao":questao})


def resultados(request, questao_id):
    questao = get_object_or_404(Questao, pk=questao_id)
    return render(request, "votacao/resultados.html",{"questao":questao})


@login_required(login_url="/votacao/login/")
def voto(request, questao_id):
    questao= get_object_or_404(Questao, pk=questao_id) 
    
    if request.POST.get("delete-question",False):
        questao.delete()    
        return HttpResponseRedirect(reverse('votacao:index'))
    elif request.POST.get("delete-option",False):
        try: 
            opcao_seleccionada = questao.opcao_set.get(pk=request.POST['opcao'])  
        except (KeyError, Opcao.DoesNotExist): 
            return render(request, 'votacao/detalhe.html', { 
                'questao': questao, 
                'errorMessage': "Não escolheu uma opção", 
            }) 
        else: 
            opcao_seleccionada.delete()
        
        return HttpResponseRedirect(reverse('votacao:detalhe',args=(questao.id,))) 

    elif request.POST["voto"]:
        try: 
            opcao_seleccionada = questao.opcao_set.get(pk=request.POST['opcao'])  
        except (KeyError, Opcao.DoesNotExist): 
            return render(request, 'votacao/detalhe.html', { 
                'questao': questao, 
                'errorMessage': "Não escolheu uma opção", 
            }) 
        else:
            aluno = request.user.aluno
            if aluno.voteCounter < aluno.maxVotes:
                opcao_seleccionada.votos += 1 
                opcao_seleccionada.save()
                aluno.incrementVotes()
                aluno.save() 
                return HttpResponseRedirect(reverse('votacao:resultados',args=(questao.id,))) 
            else: 
                questao = get_object_or_404(Questao, pk=questao_id)
                errorMessage="Não pode votar mais"
                return render(request,"votacao/detalhe.html",{"questao":questao,"errorMessage":errorMessage})

def isSuperUser(user):
    return user.is_superuser

@user_passes_test(isSuperUser,login_url="/votacao/login")
def createQuestion(request):
    errorMessage=None
    if request.user.is_superuser:
        if request.method == "POST":
            if request.POST["question"]:
                q = Questao(questao_texto=request.POST["question"], pub_data=timezone.now())
                q.save()
                return HttpResponseRedirect(reverse('votacao:detalhe',args=(q.id,)))
    else:
        errorMessage="Não tem permissões para aceder a esta página"

    return render(request, "votacao/questao.html",{"errorMessage":errorMessage} )

@user_passes_test(isSuperUser,login_url="/votacao/login")
def createOption(request, questao_id):
    errorMessage=None
    if request.user.is_superuser:
        questao = Questao.objects.get(id=questao_id)
        opcoes = questao.opcao_set.all()
        if request.method=="POST":
            if request.POST["opcao_texto"]:
                if request.POST["votos"]:
                    questao.opcao_set.create(opcao_texto=request.POST["opcao_texto"],votos=request.POST["votos"])
                else:
                    questao.opcao_set.create(opcao_texto=request.POST["opcao_texto"])
                questao.save()
    else:
        errorMessage="Não tem permissões para aceder a esta página"
    
    return render(request, "votacao/option.html",{"questao_id":questao_id,"errorMessage":errorMessage,"opcoes":opcoes})
    


def logIn(request):
    errorMessage=None
    if request.method == "POST":
        if request.POST["login"]:
            user = authenticate(username=request.POST["username"], password=request.POST["password"])
            if user is not None:
                login(request, user)
                return HttpResponseRedirect(reverse('votacao:index'))
            else: 
                return HttpResponseRedirect(reverse('votacao:index'))
    
    return render(request,"votacao/login.html",{})




def register(request):
    errorMessage=None
    if request.method=="POST":
        if request.POST["register"]:
            data=request.POST
            if data["username"] and data["email"] and data["curso"] and data["password"] and data["grupo"]:
                username=data["username"]
                email=data["email"]
                curso=data["curso"]
                grupo=data["grupo"]
                password=data["password"]
                if not User.objects.filter(username= username).first():
                    user = User.objects.create_user(username,email,password)
                    user.save()
                    aluno = Aluno(user=user,curso=curso,grupo=grupo)
                    aluno.defineMaxVotes()  
                    aluno.save()
                    return HttpResponseRedirect(reverse('votacao:login'))
                else:
                    errorMessage="This username already exists"
                
            else:
                errorMessage="Não inseriu todos os campos necessários, tente novamente!"
            
            
    return render(request,"votacao/register.html",{"errorMessage":errorMessage})

@login_required(login_url="/votacao/login/")
def personalInfo(request):
    errorMessage=None
    user=request.user
    if user.is_authenticated:
        aluno = user.aluno
        remainingVotes = aluno.maxVotes - aluno.voteCounter
        return render(request,"votacao/personalInfo.html",{"aluno":aluno,"remaining":remainingVotes})
    else:
        errorMessage="Tem de ter efetuado o LogIn para poder aceder às suas informações"
        return render(request,"votacao/personalInfo.html",{"errorMessage":errorMessage})

       
@login_required(login_url="/votacao/login/")      
def updatePicture(request):
    if request.method == "POST" and request.FILES.get("myfile"):
        myfile = request.FILES["myfile"]
        
        fs = FileSystemStorage()
        # Apagar a imagem anterior do sistema
        if fs.exists(str(request.user.aluno.user)+".png"):
            fs.delete(str(request.user.aluno.user)+".png")
        filename= fs.save(str(request.user.aluno.user)+".png", myfile)
        uploaded_file_url = fs.url(filename)
        aluno = request.user.aluno
        aluno.hasPicture= True
        aluno.save()
        
        return render(request, "votacao/updatePicture.html", {
            "uploaded_file_url":uploaded_file_url
        })
    
    return render(request, "votacao/updatePicture.html")
        