module.exports.getAllWorkers = function(req, res, next) {
    res.locals.connection.query('SELECT * from entregadores', 
    function (error, results, fields) {
        if (error){
            res.send(error);
            return;
        }
        res.send(results);
    });
};

module.exports.getWorkerbyId = function(req,res,next){
    const id = parseInt(req.params.id);
    res.locals.connection.query('SELECT * from entregadores WHERE id = ' + id,
    function(error,results,fields){
        if (error){
            res.send(error);
            return;
        }
        res.send(results);
    });
};

module.exports.createWorker = function(req,res){
    const user = {"nome":req.body.nome,"email":req.body.email,"senha":req.body.senha};
    const worker = {"user_id":"","cpf":req.body.cpf,"nota":0,"cnh":req.body.cnh};
    res.locals.connection.query("INSERT INTO usuarios SET ?", user,
    function(error, results, fields){
        if(error){
            res.send({sucess:false,message:'database error',error:error});
            return;
        }
        worker.user_id = results.insertId;
        res.locals.connection.query("INSERT INTO entregadores SET ?", worker,
        function(error,results,fields){
            if (error){
                res.send(error);
                return;
            }
            res.send({ success: true, messagem: 'Entregador cadastrado com sucesso', results:results });
        });
    });
}    
/*
module.exports.createWorker = function(req,res){
    const worker = req.body;
    res.locals.connection.query("INSERT INTO entregadores SET ?", user,
    function(error,results,fields){
        if (error){
            res.send(error);
            return;
        }
        res.send(results);
    });
};*/