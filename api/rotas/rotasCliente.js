var ControladorCliente = require('../controladores/ControladorCliente');
const db = require('../../config/config.js');


module.exports = function(app){
    const controladorCliente = new ControladorCliente(db.cliente);
    
    app.get('/clientes', (req,res) => {
        controladorCliente.retornaTodosClientes()
        .then(clientes => {
            res.send(clientes);
        });
    });

    app.get('/clientes/:id',(req,res) => {
        controladorCliente.clientePorId(req.params)
        .then(cliente => {
            res.send(cliente);
        })
    });
}



/*const express = require('express');
const router = express.Router();

const database = require('../queries/clientQueries');

router.get('/clients',database.getAllClients); //mostra todos
router.get('/clients/:id', database.getClientbyId); //pega pelo id
router.post('/clients',database.createClient); //insere

module.exports = router;*/