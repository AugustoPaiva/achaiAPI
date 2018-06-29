const ControladorListaDeCompra = require('../controladores/controladorListaDeCompra');

module.exports = function(app){
    const controladorListaDeCompra = new ControladorListaDeCompra();

    app.get('/listaDeCompra/:id', (req,res) =>{
        controladorListaDeCompra.retornarListasDeCompra(req.params)
        .then((resposta)=> {
            res.status(200).send(resposta);
        });
    });

    app.post('/listaDeCompra', (req, res) => {
        controladorListaDeCompra.retornarLista(req.body)
        .then(resposta => {
            res.send(resposta);
        });
    });
}