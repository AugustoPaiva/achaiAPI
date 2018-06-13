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
    res.locals.connection.query('SELECT * from clientes WHERE id = ' + id,
    function(error,results,fields){
        if (error){
            res.send(error);
            return;
        }
        res.send(results);
    });
};

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
};