from votacao.models import Questao, Opcao
from datetime import datetime, timedelta
from django.utils import timezone 


def questionList():
    print(list(Questao.objects.all()))
    print("\n")

questionList()

def questionWithPrefix():
    questoes = list(Questao.objects.all())

    for questao in questoes:
        if str(questao).startswith("Gostas de"):
            for opcao in questao.opcao_set.all():
                print(opcao)


questionWithPrefix()
            
def optionMoreThen2():
    questoes = list(Questao.objects.all())

    for questao in questoes:
        if(str(questao).startswith("Gostas de")):
            for opcao in questao.opcao_set.all():
                if(opcao.votes() > 2):
                    print(str(opcao) + "\n")


optionMoreThen2()

def pubInLast3years():
    questoes = list(Questao.objects.all())

    final=[]

    for questao in questoes:
        if questao.get_pub_data() >= timezone.now()- timedelta(days=1095):
            final.append(questao)
                    
    print(final)
    print("\n")


pubInLast3years()




def numberOfTotalVotes():
    questoes = list(Questao.objects.all())

    counter = 0

    for questao in questoes:
        for opcao in questao.opcao_set.all():
            counter += opcao.votes()

    
    print("Total Votes in DB: " + str(counter))
    print("\n")


numberOfTotalVotes()



def mostVotedOptionFromAllQuestions():

    questoes = list(Questao.objects.all())

    for questao in questoes:
        print("For this question: " + str(questao))
        maxVotes=0
        maxOpcao = None
        for opcao in questao.opcao_set.all():
            if opcao.votes() > maxVotes:
                maxVotes,maxOpcao = opcao.votes(), opcao
        
        print("This option has the most votes: " + str(maxOpcao))

        print("\n")

mostVotedOptionFromAllQuestions()
