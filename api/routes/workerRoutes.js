const express = require('express');
const router = express.Router();

const database = require('../queries/workerQueries');



router.get('/workers', database.getAllWorkers); //pega todos
router.get('/workers/:id', database.getWorkerbyId); //pega pelo id
router.post('/workers',database.createWorker); //insere

/*
PRA CRIAR ENTREGADOR, MANDAR PELO BODY:
{ "user_id" : X, "nota" : null,"cnh" : "XXXXXXX"}
(CNH duplicada retorna erro)
*/

module.exports = router;