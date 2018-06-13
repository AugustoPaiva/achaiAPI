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
    const worker = req.body;
    res.locals.connection.query("INSERT INTO entregadores SET ?", user,
    function(error,results,fields){
        if (error){
            res.send(error);
            return;
        }
        res.send(results);
    });
};