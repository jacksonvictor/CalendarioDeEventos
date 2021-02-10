const express = require('express');
const router = express.Router();
const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: 'root',
        database: 'CALENDAR',
        
    }
})

router.get('/', (request, response, next) => {
    knex('EVENTS').then((dados) => {
        response.send(dados)
    }, next)
})

router.post('/', (request, response, next) => {

   
    knex('EVENTS')

        .insert(request.body)
        .then((dados) => {
            response.send(dados)
        }, next)
})

router.get('/:userId', (request, response, next) => {
    const { userId} = request.params
    knex('EVENTS')
        .where('ID_USER', userId)
        .then((dados) => {
            if (!dados) return response.send(new errs.BadRequestError("Evento Não Encontrado!"))
            response.send(dados)
        }, next)

})

router.delete('/:eventId', (request, response, next) => {
    const {
        eventId
    } = request.params;

    knex('EVENTS')
        .where('ID', eventId)
        .del()
        .then((dados) => {
            if (!dados) return response.send(new errs.BadRequestError("Evento Não Encontrado!"))
            response.send("Evento apagado com sucesso!")
        }, next)
})

router.patch('/:eventId', (request, response, next) => {
    const {
        eventId
    } = request.params;

    knex('EVENTS')
        .where('ID', eventId)
        .update(request.body)
        .then((dados) => {
            if (!dados) return response.send(new errs.BadRequestError("Evento Não Encontrado!"))
            response.send(request.body)
        }, next)
})

module.exports = router;