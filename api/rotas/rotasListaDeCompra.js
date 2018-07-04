const ControladorListaDeCompra = require('../controladores/controladorListaDeCompra');

module.exports = function(app){
    const controladorListaDeCompra = new ControladorListaDeCompra();

    app.get('/listaDeCompra/:id_cliente', (req,res) =>{
        controladorListaDeCompra.retornarListasDeCompra(req.params)
        .then((resposta)=> {
            res.status(200).send(resposta);
        });
    });

    app.get('/listaDeProdutos/:id', (req, res) => {
        controladorListaDeCompra.retornarLista(req.params)
        .then(resposta => {
            res.send(resposta);
        });
    });
}