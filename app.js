const express = require('express');
const app = express();

const userRoutes = require('./api/routes/user');

var mysql = require("mysql");

//Database connection
app.use(function(req, res, next){
	res.locals.connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : ' ',
		database : 'achai_db'
	});
	res.locals.connection.connect();
	next();
});

app.use('/user', userRoutes);


module.exports = app;