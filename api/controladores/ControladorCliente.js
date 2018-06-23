class ControladorCliente{
    constructor(db_cliente){
        this.cliente = db_cliente;
    }

    retornaTodosClientes(){
        return this.cliente.findAll()
        .then(resultado => resultado)
        .catch(erro => erro);
    }

    clientePorId(parametros){
        return this.cliente.findOne({where:parametros})
        .then(resultado => resultado)
        .catch(erro => erro); 
    }
}


/*import { getUserbyEmail } from '../queries/userQueries';

const express = require('express');
const router = express.Router();

const clienteDatabase = require('../queries/clientQueries');
const userDatabase = require('../queries/userQueries');

module.exports.registerClient = function(email){
    const emailJson =  {
        "email" : email
    }
    userDatabase.getUserbyEmail(emailJson)
}*/