# a) Criação dos dois dicionários
disciplinas_semestre_passado = {
    'PCD': 18,
    'PI': 17,
    'AA': 19,
    'AR': 16,
    'OPT': 15
}

disciplinas_este_semestre = {
    'DIAM': 20,
    'PISID': 18,
    'ES': 17,
    'IPM': 16,
    'OPT2': 19
}

print("Disciplinas do semestre passado e notas:", disciplinas_semestre_passado)
print("Disciplinas deste semestre e notas previstas:", disciplinas_este_semestre)

# b) Concatenação dos dicionários
disciplinas_ano_letivo = {**disciplinas_semestre_passado, **disciplinas_este_semestre}
print("Dicionário com todas as disciplinas do ano letivo:", disciplinas_ano_letivo)

# c) Lista apenas com as chaves (disciplinas)
lista_disciplinas = list(disciplinas_ano_letivo.keys())
print("Lista de disciplinas:", lista_disciplinas)

# d) Lista apenas com os valores (notas)
lista_notas = list(disciplinas_ano_letivo.values())
print("Lista de notas:", lista_notas)

# e) Dicionário ordenado por ordem alfabética
disciplinas_ano_letivo_ordenado = dict(sorted(disciplinas_ano_letivo.items()))
print("Dicionário ordenado por disciplinas:", disciplinas_ano_letivo_ordenado)

# f) Verificar se uma disciplina existe no dicionário
def verificar_disciplina(disciplina):
    if disciplina in disciplinas_ano_letivo:
        print(f'{disciplina} existe no dicionario')
    else:
        print(f'{disciplina} não existe no dicionario')

# g) Lista de disciplinas com nota superior a um valor
def disciplinas_nota_superior(valor):
    result = []
    for disciplina in disciplinas_ano_letivo:
        if disciplinas_ano_letivo[disciplina] > valor:
            result.append(disciplina)
    return result

# h) Calcular a média das notas
def calcular_media_notas():
    soma = sum(disciplinas_ano_letivo.values())
    total = len(disciplinas_ano_letivo)
    return  soma / total

# i) Lista das três disciplinas com as melhores notas
def top_tres_disciplinas():
    disciplinas_e_notas = list(disciplinas_ano_letivo.items())
    disciplinas_e_notas.sort(key=lambda item: item[1], reverse=True)
    result = []
    for i in range(3):
        result.append(disciplinas_e_notas[i][0])
    return result

# Testes das funções
print("--- Testes das Funções ---")
verificar_disciplina('DIAM')
verificar_disciplina('DIAM2')
print("Disciplinas com nota superior a 17:", disciplinas_nota_superior(17))
print("Média das notas:", calcular_media_notas())
print("Três disciplinas com as melhores notas:", top_tres_disciplinas())
