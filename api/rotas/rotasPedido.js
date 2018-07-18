const ControladorPedido = require('../controladores/controladorPedido');

module.exports = function(app){
    const controladorPedido = new ControladorPedido();

    app.post('/pedido', (req,res) =>{
        controladorPedido.adicionarPedido(req.body)
        .then(resposta => {
            res.status(200).send({
                messagem:'Pedido adicionado',
                dado:resposta
            });
        });
    });

    app.get('/pedido/:id', (req, res) => {
        controladorPedido.retornarPedido(req.params)
        .then(resposta => resposta);
    });

}