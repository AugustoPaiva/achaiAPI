import { getUserbyEmail } from '../queries/userQueries';

const express = require('express');
const router = express.Router();

const clienteDatabase = require('../queries/clientQueries');
const userDatabase = require('../queries/userQueries');

module.exports.registerClient = function(email){
    const emailJson =  {
        "email" : email
    }
    userDatabase.getUserbyEmail(emailJson)
}