const ControladorPedido = require('../controladores/controladorPedido');

module.exports = function(app){
    const controladorPedido = new ControladorPedido();

    app.post('/pedidos', (req,res) =>{
        let id = 0;
        controladorPedido.adicionarPedido(req.body)
        .then(resposta => {
            id = resposta.id;
            res.status(200).send({
                         messagem:'Pedido adicionado',
                         dado:resposta
                     });
        controladorPedido.adicionarCompra(req.body.lista,id);
        });
    });

    app.get('/pedidos/:id', (req, res) => {
        controladorPedido.retornarPedido(req.params)
        .then(resposta => resposta);
    });

}