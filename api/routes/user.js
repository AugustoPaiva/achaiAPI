const express = require('express');
const router = express.Router();

const database = require('../queries/userQueries');

/*
Embaixo das rotas tem as instruções do que se deve passar no Body da request
*/

router.get('/users',database.getAllUsers);
router.get('/users/:id',database.getUserbyId);
router.post('/users',database.createUser);
router.post('/login/', database.login);
/*
PRA CRIAR USUARIO, USAR:
{ "nome" : "teu nome", "cpf" : "12345678910", "email" : "XXXXXXX", "senha" : "XXX" }
(CPF E EMAIL REPETIDOS DEVEM RETORNAR ERRO)
*/

module.exports = router;








/*
A função abaixo cadastra um cliente + usuario, exemplo de body:
{
    nome: nome,
    cpf: cpf,
    email: email,
    senha: senha 
}
router.post('/createclient',function(req,res){
    const user = req.body;
    res.locals.connection.query("INSERT INTO usuarios SET ?", user,
    function(error, results, fields){
        if (error){
            res.send({ success: false, message: 'database error', error: error });
            return;
        }
        const client = {"user_id":results.insertId};
        res.locals.connection.query("INSERT INTO clientes SET ?", client,
        function(error,results,fields){
            res.send({ success: true, messagem: 'Cliente cadastrado com sucesso', results:results });
        });
    });
});


Essa função cadastra um entregador + ususuario, exemplo de body abaixo:
{   
    user: {
        nome: nome,
        cpf: cpf,
        email: email,
        senha: senha 
    },
    worker:{
        user_id: null,
        nota: null,
        cnh: "12345678910"
    }
}

router.post('/createworker',function(req,res){
    const user = req.body.user;
    const worker = req.body.worker;
    res.locals.connection.query("INSERT INTO usuarios SET ?", user,
    function(error, results, fields){
        if(error){
            res.send({sucess:false,message:'database error',error:error});
            return;
        }
        worker.user_id = results.insertId;
        res.locals.connection.query("INSERT INTO entregadores SET ?", worker,
        function(error,results,fields){
            res.send({ success: true, messagem: 'Entregador cadastrado com sucesso', results:results });
        });
    });
});
*/
