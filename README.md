
# Calendário de Eventos

Essas instruções vão deixar uma cópia funcional do projeto em sua máquina local.

## Pré-requisitos

* [Git](https://git-scm.com/book/pt-br/v2/Come%C3%A7ando-Instalando-o-Git)
* [MySQL](https://dev.mysql.com/downloads/mysql/)
* [Nodejs e NPM](https://nodejs.org/)


## Clonando

Primeiro é necessário clonar o projeto:
```
$ git clone https://github.com/jacksonvictor/CalendarioDeEventos
```
## Banco De Dados

É necessário que o serviço do banco de dados(MySQL) esteja ativo e disponível. Para isso execute o script .sql que se encontra na pasta:
```
$ cd CalendarioDeEventos/src/server/
```

## Variáveis de ambiente (Env)
Renomeie o arquivo .env.example para .env e adicione as configurações do seu MySQL.

```
DB_HOST =  

DB_USER = 

DB_PASSWORD = 

DB_NAME = CALENDAR
```

# Back-End

Entre na pasta do projeto:
```
$ cd CalendarioDeEventos
```
Instale as dependências com:
```
$ npm install
```
Entre na pasta do back-end:
```
$ cd src/server/
```
Suba o servidor:
```
$ node server.js
```


# Front-End

Entre na pasta do front-end:
```
$ cd CalendarioDeEventos/src/view
```

Execute o arquivo index:
```js
$ start index.html // (windows)
```

## Ferramentas usadas

* [FullCalendar](https://fullcalendar.io/) - Framework para uso do calendário.

* [Express](http://www.expressjs.com/) - O framework usado para criação da API REST.

 * [Knex](http://knexjs.org/) - Query Builder.

* [MySQL](https://dev.mysql.com/downloads/mysql/) - Banco de dados.

* [Booststrap](https://getbootstrap.com/) - Framework CSS.

* [AlertifyJS](https://alertifyjs.com/) - Framework para diálogos e notificações.


## Criado por
* **[Jackson V. Teodoro](https://github.com/jacksonvictor)**
