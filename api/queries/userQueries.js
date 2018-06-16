module.exports.getAllUsers = function(req, res, next) {
    res.locals.connection.query('SELECT * from usuarios', 
    function (error, results, fields) {
        if (error){ 
            res.send(error); 
            return; 
        }
        res.send(results);
	});
};

module.exports.getUserbyId = function(req,res,next){
    const id = parseInt(req.params.id);
    res.locals.connection.query('SELECT * from usuarios WHERE id = ' + id,
    function(error,results,fields){
        if (error){
            res.send(error);
            return;
        }
        res.send(results);
    });
};

module.exports.getUserbyEmail = function(req,res,next){
    const email = req.body;
    res.locals.connection.query('SELECT * from usuarios WHERE email = ' + email,
    function(error,results,fields){
        if (error){
            res.send(error);
            return;
        }
        res.send(results);
    });
};



module.exports.createUser = function(req,res){
    const user = req.body;
    res.locals.connection.query("INSERT INTO usuarios SET ?", user,
    function(error,results,fields){
        if (error){
            res.send(error);
            return;
        }
        res.send(results);
    });
};



module.exports.login = function(req,res,next){
    const login = req.body;
    res.locals.connection.query("SELECT * FROM usuarios WHERE email = '" + login.email + "' AND senha = '" + login.senha +"'",
    function(error,results,fields){
        if (error) {
            res.send(error);
            return;
        }
        res.send(results);
    });
};
