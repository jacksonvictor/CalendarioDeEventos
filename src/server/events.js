require('dotenv').config({ path: '../../.env' })
const express = require('express')
const router = express.Router()
const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
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

router.post('/searchEvent/:userId', (request, response, next) => {
    const { userId} = request.params
    knex('EVENTS')
    .where('ID_USER', userId)
        .then((data) => {
            
            let conflict = 0
              data.forEach(i => {
                if (dateConflits(new Date(i.START_EVENT), new Date(i.END_EVENT), new Date(request.body.START_EVENT), new Date(request.body.END_EVENT))) {
                  conflict++
                }
              })

            if(conflict === 0) {
                response.send({message:'Evento Não Encontrado!', status: 404})
            }else{
                response.send({message:'Evento Encontrado!', status:200})
            }
        }, next)

})

router.post('/searchEventEdit/:userId', (request, response, next) => {
    const { userId} = request.params
    knex('EVENTS')
    .where('ID_USER', userId)
    .andWhereNot('ID',request.body.ID)
        .then((data) => {
            
            let conflict = 0
              data.forEach(i => {
                if (dateConflits(new Date(i.START_EVENT), new Date(i.END_EVENT), new Date(request.body.START_EVENT), new Date(request.body.END_EVENT))) {
                  conflict++
                }
              })

            if(conflict === 0) {
                response.send({message:'Evento Não Encontrado!', status: 404})
            }else{
                response.send({message:'Evento Encontrado!', status:200})
            }
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

function dateConflits(start1, end1, start2, end2) {
    return (start1.getTime() === start2.getTime() || end1.getTime() === end2.getTime() || (start1.getTime() < end2.getTime() && start1.getTime() > start2.getTime()) || (start2.getTime() < end1.getTime() && start2.getTime() > start1.getTime()) || (end1.getTime() < end2.getTime() && end1.getTime() > start2.getTime()) || (end2.getTime() < end1.getTime() && end2.getTime() > start1.getTime())) ? true : false
  
  }

module.exports = router;