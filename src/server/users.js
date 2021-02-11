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