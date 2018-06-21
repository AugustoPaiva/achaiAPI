/*const http =  require('http');
const app = require('./app');

const port = process.env.PORT || 3000;

const server = http.createServer(app);



server.listen(port);
*/
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json())

const db = require('./config/config.js');

db.sequelize.sync({force: true}).then(() => {
    console.log('Drop and Resync with { force: true }');
  });
   
  require('./api/routes/userRoutes.js')(app);
   
  // Create a Server
  var server = app.listen(3000, function () {
   
    var host = server.address().address
    var port = server.address().port
   
    console.log("App listening at http://%s:%s", host, port)
  })