const express = require('express');
const router = express.Router();

/*
Acima das rotas tem os exemplos do que é preciso passar no body
lá em baixo tem 2 rotas que cadastram direto entregador + usuario ou cliente + usuario
*/

router.get('/allusers', function(req, res, next) {
    res.locals.connection.query('SELECT * from usuarios', 
    function (error, results, fields) {
        if (error){
            res.send({ success: false, message: 'database error', error: error });
            return;
        }
        res.send(results);
	});
});

router.get('/allclients', function(req, res, next) {
    res.locals.connection.query('SELECT * from clientes', 
    function (error, results, fields) {
        if (error){
            res.send({ success: false, message: 'database error', error: error });
            return;
        }
        res.send(results);
	});
});

router.get('/allworkers', function(req, res, next) {
    res.locals.connection.query('SELECT * from entregadores', 
    function (error, results, fields) {
        if (error){
            res.send({ success: false, message: 'database error', error: error });
            return;
        }
        res.send(results);
	});
});


router.get('/:id',function(req,res,next){
    const id = parseInt(req.params.id);
    res.locals.connection.query('SELECT * from usuarios WHERE id = ' + id,
    function(error,results,fields){
        if (error){
            res.send({ success: false, message: 'database error', error: error });
            return;
        }
        res.send(results);
    });
});

router.get('/client/:id',function(req,res,next){
    var id = parseInt(req.params.id);
    res.locals.connection.query('SELECT * from clientes WHERE id = ' + id,
    function(error,results,fields){
        if (error){
            res.send({ success: false, message: 'database error', error: error });
            return;
        }
        res.send(results);
    });
});

router.get('/worker/:id',function(req,res,next){
    const id = parseInt(req.params.id);
    res.locals.connection.query('SELECT * from entregadores WHERE id = ' + id,
    function(error,results,fields){
        if (error){
            res.send({ success: false, message: 'database error', error: error });
            return;
        }
        res.send(results);
    });
});



/*
PRA CRIAR USUARIO, USAR:
CPF E SENHA REPETIDOS DEVEM RETORNAR ERROR
{
    "nome" : "teu nome",
    "cpf" : "12345678910",
    "email" : "XXXXXXX",
    "senha" : "XXX"
}
*/
router.post('/createuser',function(req,res){
    const user = req.body;
    res.locals.connection.query("INSERT INTO usuarios SET ?", user,
    function(error,results,fields){
        if (error){
            res.send({ success: false, message: 'database error', error: error });
            return;
        }
        res.send(results);
    });
});



/*
PRA CRIAR UM CLIENTE, USAR:
{
    user_id = X
}
*/
router.post('/client/create',function(req,res){
    const client = req.body;
    res.locals.connection.query("INSERT INTO clientes SET ?", client,
    function(error,results,fields){
        if (error){
            res.send({ success: false, message: 'database error', error: error });
            return;
        }
        res.send({ success: true, messagem: 'Cliente cadastrado com sucesso', results:results});
    });
});

/*
PRA CRIAR ENTREGADOR, USAR:
CNH DUPLICADA DA ERRO:
{
    "user_id" : X,
    "nota" : null,
    "cnh" : "XXXXXXX"
}
*/
router.post('/worker/create',function(req,res){
    const worker = req.body;
    res.locals.connection.query("INSERT INTO entregadores SET ?", user,
    function(error,results,fields){
        if (error){
            res.send({ success: false, message: 'database error', error: error });
            return;
        }
        res.send({ success: true, messagem: 'Entregador cadastrado com sucesso', results:results});
    });
});









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
module.exports = router;