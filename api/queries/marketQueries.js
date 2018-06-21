module.exports.getAllMarkets = function(req, res, next) {
    res.locals.connection.query('SELECT * from markets', 
    function (error, results, fields) {
        if (error){
            res.send(error);
            return;
        }
        res.send(results);
	});
};

module.exports.getMarketByName = function(req, res, next) {
    name = req.body.name;
    res.locals.connection.query("SELECT * from markets where = '" + name + "'", 
    function (error, results, fields) {
        if (error){
            res.send(error);
            return;
        }
        res.send(results);
	});
};



