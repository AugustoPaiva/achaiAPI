const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./config/config.js');


app.use(bodyParser.json());
app.use(function(req,res,next) {
	res.header("Access-Control-Allow-Origin","*");
	res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
	next();
});

db.conexao.sync({force: false}).then(() => {
    console.log('Drop and Resync with { force: false }');
});

require('./api/rotas/rotasUsuario.js')(app);
require('./api/rotas/rotasCliente.js')(app);
require('./api/rotas/rotasEntregador')(app);
require('./api/rotas/rotasProdutos')(app);
require('./api/rotas/rotasListaDeCompra')(app);
   
// Create a Server
var server = app.listen(process.env.PORT || 3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("App listening at http://%s:%s", host, port)
})


