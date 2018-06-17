module.exports.getAllClients = function(req, res, next) {
    res.locals.connection.query('SELECT * from clientes', 
    function (error, results, fields) {
        if (error){
            res.send(error);
            return;
        }
        res.send(results);
	});
};

module.exports.getClientbyId = function(req,res,next){
    var id = parseInt(req.params.id);
    client = {};
    res.locals.connection.query('SELECT * from clientes WHERE id = ' + id,
    function(error,results,fields){
        if (error){
            res.send(error);
            return;
        }
        client = results[0];
        res.locals.connection.query('SELECT * from usuarios WHERE id = ' + client.user_id,
        function(error,results,fields){
            if (error){
                res.send(error);
                return;
            }
            client.nome = results[0].nome;
            client.cpf = results[0].cpf;
            client.email = results[0].email;
            client.senha = results[0].senha;
            res.send(client)
        });

    });
};
/*
module.exports.createClient = function(req,res){
    const client = req.body;
    res.locals.connection.query("INSERT INTO clientes SET ?", client,
    function(error,results,fields){
        if (error){
            res.send(error);
            return;
        }
        res.send(results);
    });
};*/

module.exports.createClient = function(req,res){
    const user = {"nome":req.body.nome, "cpf":req.body.cpf,"email":req.body.email,"senha":req.body.senha};
    const client = {"user_id": null};
    res.locals.connection.query("INSERT INTO usuarios SET ?", user,
    function(error, results, fields){
            if (error){
                res.send({ success: false, message: 'database error', error: error });
                return;
            }
            client.user_id = results.insertId;
            res.locals.connection.query("INSERT INTO clientes SET ?", client,
            function(error,results,fields){
                res.send({ success: true, messagem: 'Cliente cadastrado com sucesso', results:results });
            });
        });
}