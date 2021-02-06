const restify = require('restify');
const errs = require('restify-errors')

const server = restify.createServer({
  name: 'myapp',
  version: '1.0.0'
});

const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : 'root',
      database : 'CALENDAR'
    }
  });

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.get('/echo/:name', function (req, res, next) {
  res.send(req.params);
  return next();
});

server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});


server.get('/', (request,response, next)=>{

    knex('USERS').then((dados) => {
        response.send(dados)
    },next)

})

server.post('/new-user', (request,response, next)=>{

    knex('USERS')
        .insert(request.body)
        .then((dados) => {
        response.send(dados)
    },next)

})

server.get('/list-events', (request,response, next)=>{

    knex('EVENTS').then((dados) => {
        response.send(dados)
    },next)
})

server.get('/list-events/:id', (request,response, next)=>{

    const {id} = request.params;

    knex('EVENTS')
        .where('id',id)
        .first()
        .then((dados) => {
            if(!dados) return response.send(new errs.BadRequestError("Evento Não Encontrado!"))
            response.send(dados)
    },next)
})

server.get('/update-event/:id', (request,response, next)=>{

    const {id} = request.params;

    knex('EVENTS')
        .where('id',id)
        .update(request.body)
        .then((dados) => {
            if(!dados) return response.send(new errs.BadRequestError("Evento Não Encontrado!"))
            response.send("Evento atualizado com sucesso!")
    },next)
})

server.get('/delete-event/:id', (request,response, next)=>{

    const {id} = request.params;

    knex('EVENTS')
        .where('id',id)
        .delete
        .then((dados) => {
            if(!dados) return response.send(new errs.BadRequestError("Evento Não Encontrado!"))
            response.send("Evento apagado com sucesso!")
    },next)
})

server.post('/new-event', (request,response, next)=>{

    knex('EVENTS')
        .insert(request.body)
        .then((dados) => {
        response.send(dados)
    },next)

})