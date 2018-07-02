var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json())

const db = require('./config/config.js');

db.conexao.sync({force: false}).then(() => {
    console.log('Drop and Resync with { force: false }');
});
   
require('./api/rotas/rotasUsuario.js')(app);
require('./api/rotas/rotasCliente.js')(app);
require('./api/rotas/rotasEntregador')(app);
require('./api/rotas/rotasProdutos')(app);
require('./api/rotas/rotasListaDeCompra')(app);
require('./api/rotas/rotasEndereco')(app);
   
// Create a Server
var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port 
  console.log("App listening at http://%s:%s", host, port)
})


