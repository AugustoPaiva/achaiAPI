const ControladorCliente = require('../controladores/controladorCliente');
const ControladorUsuario = require('../controladores/controladorUsuario')

module.exports = function(app){
    const controladorCliente = new ControladorCliente();
    const controladorUsuario = new ControladorUsuario();

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
        controladorUsuario.criarUsuario(req.body)
        .then(usuario => {
            if (usuario.status == 'erro'){
                res.status(400).send(usuario);
                return;
            }
            controladorCliente.criarCliente({id_usuario:usuario.id})
            .then((cliente) => {
                let resultado = JSON.parse(JSON.stringify(usuario));
                resultado.id_cliente = cliente.id;
                res.status(201).json(resultado);
            })
        });
    });

}





