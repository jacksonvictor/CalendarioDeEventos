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

router.post('/search', (request, response, next) => {
    const username = request.body.USERNAME
    const password = request.body.PASS
     knex('USERS')
        .where('USERNAME', username)
        .andWhere('PASS', password)
        .then((dados) => {
            console.log(dados)
            
            if(dados.length == 0) {
                response.send({message:'Usuário Não Encontrado!', status: 404})
            }else{
                response.send({message:'Usuário Encontrado!', id : dados[0].ID, status:200})
            }
        }, next)
})



module.exports = router;