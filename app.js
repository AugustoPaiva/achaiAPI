const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const userRoutes = require('./api/routes/user');

var mysql = require("mysql");
app.use(bodyParser.json());
/*
Database connection
*/
app.use(function(req, res, next){
	res.locals.connection = mysql.createConnection({
		host     : 'db4free.net',
		port     : 3306,
		user     : 'achaidb',
		password : 'projetoachai',
		database : 'achaidb'
	});
	res.locals.connection.connect();
	next();
});


app.use('/user', userRoutes);




module.exports = app;