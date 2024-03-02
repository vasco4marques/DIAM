poema ="Eu hoje fiz um samba bem pra frente / Dizendo realmente o que é que eu acho / Eu acho que o meu samba é uma corrente / E coerentemente assino embaixo / Hoje é preciso refletir um pouco / E ver que o samba está tomando jeito / Só mesmo embriagado ou muito louco / Pra contestar e pra botar defeito / Precisa ser muito sincero e claro / Pra confessar que andei sambando errado / Talvez precise até tomar na cara / Pra ver que o samba está bem melhorado / Tem mais é que ser bem cara de tacho / Não ver a multidão sambar contente / Isso me deixa triste e cabisbaixo / Por isso eu fiz um samba bem pra frente / Dizendo realmente o que é que eu acho / Eu acho que o meu samba é uma corrente / E coerentemente assino embaixo / Hoje é preciso refletir um pouco / E ver que o samba está tomando jeito / Só mesmo embriagado ou muito louco / Pra contestar e pra botar defeito / Precisa ser muito sincero e claro / Pra confessar que andei sambando errado / Talvez precise até tomar na cara / Pra ver que o samba está bem melhorado / Tem mais é que ser bem cara de tacho / Não ver a multidão sambar contente / Isso me deixa triste e cabisbaixo"

append="Eu hoje fiz um samba bem pra frente\nDizendo realmente o que é que eu acho\nEu acho que o meu samba é uma corrente"

def printList(lista):
    for algo in lista:
        print(algo)


# 3.1
# a)
def poemToList(poema):
    final = poema.split(" / ")
    return final


# printList(poemToList(poema))

# b)
def appendToPoem(poema,append):
    poema = poemToList(poema)
    append = append.split("\n")
    poema.extend(append)
    
    return poema

# printList(appendToPoem(poema,append))

# c) 
def lastTwoLines(poema):
    final = appendToPoem(poema, append)[-2:]
    return final
# printList(lastTwoLines(poema))

# d)
def countWord(word):
    final = appendToPoem(poema, append)
    i = 0
    for line in final:
        if (" " + word + " ") in line:
            i+=1
    return i

# print(countWord("samba"))

# e)
def countVowels():
    final = appendToPoem(poema, append)
    
    # Dicionário mas em duas partes
    key = ["a","e","i","o","u"]
    value=[0,0,0,0,0]
    

    for frase in final:
        for letter in frase.lower():
            if letter in key:
                pos = key.index(letter)
                value[pos] += 1
    
    for join in zip(key,value):
        print(join[0] + " " + str(join[1]))

countVowels()
