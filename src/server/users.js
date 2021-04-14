require('dotenv').config({ path: '../../.env' })
const express = require('express')
const md5 = require('md5');
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
        .insert({USERNAME: request.body.USERNAME, PASS: md5(request.body.PASS)})
        .then((dados) => {
            response.send(dados)
        }, next)
})

router.post('/login', (request, response, next) => {
    const username = request.body.USERNAME
    const password = request.body.PASS
     knex('USERS')
        .where('USERNAME', username)
        .andWhere('PASS', md5(password))
        .then((dados) => {
            
            if(dados.length == 0) {
                response.send({message:'Usuário Não Encontrado!', status: 404})
            }else{
                response.send({message:'Usuário Encontrado!', id : dados[0].ID, status:200})
            }
        }, next)
}) 



router.post('/searchByUser', (request, response, next) => {
    const username = request.body.USERNAME
     knex('USERS')
        .where('USERNAME', username)
        .then((dados) => {
            
            if(dados.length == 0) {
                response.send({message:'Usuário Não Encontrado!', status: 404})
            }else{
                response.send({message:'Usuário Encontrado!', id : dados[0].ID, status:200})
            }
        }, next)
})



module.exports = router;