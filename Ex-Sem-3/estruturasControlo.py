#  3.4
import time

# a) Variante I

str1 = "THE ALIAS MEN"
str2 = "ALAN SMITHEE"
str3 = "BLAB BLABLAB"


str4 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" * 38462
str5 = "ZYXWVUTSRQPONMLKJIHGFEDCBA" * 38462

def variant1(str1,str2):
    start = time.time()
    for letter in str1:
        if letter in str2:
            str2 = str2.replace(letter,"",1)
    
    end = time.time();
        
    if len(str2) == 0:
        print("Run Time:" +  str(end-start))
        return True
    
    
    return False

# print(variant1(str1,str2))
# print(variant1(str2,str3))
# print(variant1(str4,str5))


# a) Variante II
def variant2(str1,str2):
    start = time.time()
    # Retirar blank spaces
    str1,str2 = str1.replace(" ",""),str2.replace(" ","")

    # Como o sorted retorna uma lista, usamos o join para o converter para string juntando-a a ''
    str1,str2 = ''.join(sorted(str1)),''.join(sorted(str2))

    if str1 == str2:
        end = time.time()
        print("Run Time:" +  str(end-start))
        return True
    end = time.time()
    print("Run Time:" +  str(end-start))
    return False    

# print(variant2(str1,str2))
# print(variant2(str2,str3))
print(variant2(str4,str5))

# 3.4 b)

# A primeira variante tem n^2 passos visto que sendo n o tamanho da string 1, para cada letra temos de verificar se esta existe na string 2.
# A segunda variante consta com 2*n*log(n) + 2 passos. 2*n*log(n) visto que usamos o sorted() do python e este é implementado com TimSort que tem uma complexidade de n*log(n) (2 vezes isto porque usamos nas duas listas). Depois + 2 passos visto que ao comparar as strings com o comparador == percorremos ambas + 1 vez.
# Segundo a quantia de passos esperamos que a variante 2 se comporte melhor.

# Em termos de performance, quando testada com strings de 1 milhão de caracteres, a variante 1 obteve um resultado em cerca de 31.65s enquanto a variante 2, com as mesmas strings, demorou apenas 0.19s. Uma diferença incrível de performance quanto levadas ao limite.