
# AttendEase

Projeto cujo o objetivo é auxiliar na contabilidade de alunos em sala de aula.

Oque foi usado?:
Usamos mongo como banco de dados, NodeJS e módulos como: Express, Mongoose; Bcrypt para o desenvolvimento da API; Dart/Flutter para desenvolvimento mobile e Delphi/Pascal para desenvolvimentoda aplicação desktop.




## Documentação da API

# Necessario no cabeçalho da requisição possuir o 'x-auth-token' com a chave gerada no login para a API funcionar,


### Lida com o login de usuário e gera o token de autenticação
```http
  Post /loginhandle
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `matricula` | `int` |Não pode ser nulo|
|`password`|`string`|Não pode ser nulo|

### Retorna um JSON
| Parâmetro   | Tipo       | 
| :---------- | :--------- | 
| `finalResult` | `boleano` |
|`token`|`string`|



### Retorna os dados

```http
  Post /dataFind
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `matricula`      | `int` |Recebe o numero da matricula e retorna os dados para a aplicação,Importante que armazene a o parametro "funcao" pois é necessario para as demais rotas|

### Lida com a criação de dados, nescessário serAdmin para utilizar essa rota

```http
    Post /dataCreate
```
|Parâmetro|Tipo|
|:--------|:---|
|`matricula`|`int`|
|`nome`|`string`|
|`classe`|`string`|
|`serie`|`int`|
|`email`|`string`|
|`dataNascimento`|`date`|
|`funcao`|`string`|

## Confirmar a presença ou saída;

```http
    Post /presenceConfirm
```
|Parâmetro|Tipo|
|:--------|:---|
|`matricula`|`int`|
|`user`|`string`|
|`classe`|`string`|
|`serie`|`int`|
|`funcao`|`string`|

## Usado para criar login de usuário, necessario ser admin

```http
    Post /loginCreate
```
|Parâmetro|Tipo|
|:--------|:---|
|`matricula`|`int`|
|`user`|`string`|
|`password`|`string`|
|`funcao`|`string`|



