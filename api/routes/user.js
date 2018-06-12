const express = require('express');
const router = express.Router();

const database = require('../queries/userQueries');

/*
Embaixo das rotas tem as instruções do que se deve passar no Body da request
*/

router.get('/',database.getAllUsers);
router.get('/clients',database.getAllClients);
router.get('/workers', database.getAllWorkers);
router.get('/:id',database.getUserbyId);
router.get('/client/:id', database.getClientbyId);
router.get('/worker/:id', database.getWorkerbyId);
router.post('/user',database.createUser);
router.post('/client',database.createClient);
router.post('/worker',database.createWorker);
router.post('/', database.login);


/*
PRA CRIAR USUARIO, USAR:
CPF E SENHA REPETIDOS DEVEM RETORNAR ERROR
{ "nome" : "teu nome", "cpf" : "12345678910", "email" : "XXXXXXX", "senha" : "XXX" }

PRA CRIAR UM CLIENTE, USAR:
{ user_id = id}

PRA CRIAR ENTREGADOR, USAR:
CNH DUPLICADA DA ERRO:
{ "user_id" : X, "nota" : null,"cnh" : "XXXXXXX"}
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
