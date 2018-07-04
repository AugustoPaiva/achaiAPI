const ControladorCliente = require('../controladores/controladorCliente');


module.exports = function(app){
    const controladorCliente = new ControladorCliente();

    app.get('/clientes', (req,res) => {
        controladorCliente.retornaTodosClientes()
        .then((resposta) => {
            res.status(200).send(resposta)
        });
    });

    app.get('/clientes/:id',(req,res) => {
        controladorCliente.clientePorId(req.params)
        .then( (resposta) => {
            res.status(200).send(resposta)
        });
    });
    

    app.post('/clientes', (req,res) => {
        controladorCliente.criarCliente(req.body)
        .then (resposta => {
            res.send(resposta);
        });
    });

    app.put('/clientes', (req,res) => {
        controladorCliente.editarUsuarioCliente(req.body)
        .then ( resposta => {
            res.send(resposta);
        })
    });

    

}





