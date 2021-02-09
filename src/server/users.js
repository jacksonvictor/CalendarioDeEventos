const express = require('express')
const router = express.Router()
const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: 'root',
        database: 'CALENDAR'
    }
})

router.get('/', (request, response, next) => {
    knex('USERS').then((dados) => {
        response.send(dados)
    }, next)

})

router.post('/', (request, response, next) => {
    knex('USERS')
        .insert(request.body)
        .then((dados) => {
            response.send(dados)
        }, next)


})



module.exports = router;