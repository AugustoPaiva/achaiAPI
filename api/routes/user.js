const express = require('express');
const router = express.Router();

const database = require('../queries/userQueries');

/*
Embaixo das rotas tem as instruções do que se deve passar no Body da request
*/

router.get('/users',database.getAllUsers);
router.get('/users/:id',database.getUserbyId);
router.post('/users',database.createUser);
router.post('/users/get',database.getUserbyEmail); //antes eu tinha deixado a rota so como /users e tinha comentado a linha de cima mas da erro ainda
router.post('/login/', database.login);
/*
PRA CRIAR USUARIO, USAR:
{ "nome" : "teu nome", "cpf" : "12345678910", "email" : "XXXXXXX", "senha" : "XXX" }
(CPF E EMAIL REPETIDOS DEVEM RETORNAR ERRO)
*/

module.exports = router;