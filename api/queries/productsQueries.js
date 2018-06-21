module.exports.getProductByName = function(req, res, next) {
    name = req.body.name;
    res.locals.connection.query("SELECT * from products where = '" + name + "'", 
    function (error, results, fields) {
        if (error){
            res.send(error);
            return;
        }
        res.send(results);
	});
};