const ControladorCliente = require('../controladores/controladorCliente');
const db = require('../../config/config.js');
const controladorCliente = new ControladorCliente(db.cliente);

const carro ={
    "oi":"oo"
}
module.exports = function(app){
    app.get('/clientes', (req,res) => {
        res.send("Oii");
    })

    app.post('/clientes', (req,res) => {
        controladorCliente.criarCliente(req.body)
        .then(resposta => {
            res.send(resposta);
        });
    });

}





