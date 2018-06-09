const express = require('express');
const app = express();

//ISSO N É UMA ROTA HTTP SÓ PQ TEM "/" =)
const userRoutes = require('./api/routes/user');

var mysql = require("mysql");

/*
Database connection

MUDA ESSE TROÇO AI PRA TEU BANCO LOCAL HOST
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

app.use('/', userRoutes);


module.exports = app;