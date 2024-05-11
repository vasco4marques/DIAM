# Documentação da API de Gestão de Formulários

Este documento explica os endpoints da API Sistema de Formulários

## URL Backend

O URL base para todos os endpoints: http://localhost:8000

## Endpoints de Autenticação

### Login

- **URL:** `/login/`
- **Método:** `POST`
- **Corpo:**

```json
{
  "username": "utilizador",
  "password": "senha"
}
```

Resposta de Sucesso:

```json
{
  "token": "token_gerado",
  "username": "utilizador"
}
```

Resposta de Erro:

```json
{
  "message": "Credenciais inválidas"
}
```

### Registar

- **URL:** `/register/`
- **Método:** `POST`
- **Corpo:**

```json
{
  "username": "novoutilizador",
  "password": "novasenha"
}
```

Resposta de Sucesso:

```json
{
  "message": "Utilizador registado com sucesso!"
}
```

Resposta de Erro:

```json
{
  "message": "Nome de utilizador já existe"
}
```

## Endpoints para os Formulários

### Obter Todos os Formulários

- **URL:** `/forms/{userId}/`
- **Método:** `GET`
- **Nota:** Requer autenticação por token.

Resposta de Sucesso:

```json
[
  {
    "id": 1,
    "title": "Título do Formulário",
    "description": "Descrição do Formulário",
    "questions": [
      {
        "id": 1,
        "title": "Pergunta 1",
        "options": ["Opção 1", "Opção 2", "Opção 3"]
      },
      {
        "id": 2,
        "title": "Pergunta 2",
        "options": ["Opção 1", "Opção 2"]
      }
    ],
    "created_at": "AAAA-MM-DDTHH:MM:SSZ"
  }
]
```

### Obter Formulário por ID

- **URL:** `/form/{id}/`
- **Método:** `GET`
- **Nota:** Requer autenticação por token.

Resposta de Sucesso:

```json
{
  "id": 1,
  "title": "Título do Formulário",
  "description": "Descrição do Formulário",
  "questions": [
    {
      "id": 1,
      "title": "Pergunta 1",
      "options": ["Opção 1", "Opção 2", "Opção 3"]
    },
    {
      "id": 2,
      "title": "Pergunta 2",
      "options": ["Opção 1", "Opção 2"]
    }
  ],
  "created_at": "AAAA-MM-DDTHH:MM:SSZ"
}
```

### Criar Novo Formulário

- **URL:** `/forms/new/`
- **Método:** `POST`
- **Corpo:**

```json
{
  "title": "Novo Formulário",
  "description": "Descrição do Formulário",
  "questions": [
    {
      "title": "Pergunta 1",
      "options": ["Opção 1", "Opção 2", "Opção 3"]
    },
    {
      "title": "Pergunta 2",
      "options": ["Opção 1", "Opção 2"]
    }
  ],
  "createdBy": "userId"
}
```

Resposta de Sucesso:

```json
{
  "id": 2,
  "title": "Novo Formulário",
  "description": "Descrição do Formulário",
  "questions": [
    {
      "id": 3,
      "title": "Pergunta 1",
      "options": ["Opção 1", "Opção 2", "Opção 3"]
    },
    {
      "id": 4,
      "title": "Pergunta 2",
      "options": ["Opção 1", "Opção 2"]
    }
  ],
  "created_at": "AAAA-MM-DDTHH:MM:SSZ"
}
```

### Atualizar Formulário

- **URL:** `/forms/edit/{formId}/`
- **Método:** `PUT`
- **Corpo:**

```json
{
  "title": "Título Atualizado",
  "description": "Descrição Atualizada",
  "questions": [
    {
      "id": 1,
      "title": "Pergunta 1 Atualizada",
      "options": ["Opção 1", "Opção 2", "Opção 3"]
    },
    {
      "id": 2,
      "title": "Pergunta 2 Atualizada",
      "options": ["Opção 1", "Opção 2"]
    }
  ]
}
```

Resposta de Sucesso:

```json
{
  "id": "formId",
  "title": "Título Atualizado",
  "description": "Descrição Atualizada",
  "questions": [
    {
      "id": 1,
      "title": "Pergunta 1 Atualizada",
      "options": ["Opção 1", "Opção 2", "Opção 3"]
    },
    {
      "id": 2,
      "title": "Pergunta 2 Atualizada",
      "options": ["Opção 1", "Opção 2"]
    }
  ],
  "created_at": "AAAA-MM-DDTHH:MM:SSZ"
}
```

## Gestão de Respostas

### Submeter Resposta

- **URL:** `/answer/`
- **Método:** `POST`
- **Corpo:**

```json
{
  "formId": 1,
  "questionId": 1,
  "answer": "Resposta do Utilizador"
}
```

Resposta de Sucesso:

```json
{
  "message": "Resposta submetida com sucesso."
}
```
