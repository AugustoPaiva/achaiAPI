const express = require('express');
const router = express.Router();

const database = require('../queries/clientQueries');

router.get('/clients',database.getAllClients); //mostra todos
router.get('/clients/:id', database.getClientbyId); //pega pelo id
router.post('/clients',database.createClient); //insere

module.exports = router;