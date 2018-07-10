const ControladorListaDeCompra = require('../controladores/controladorListaDeCompra');

module.exports = function(app){
    const controladorListaDeCompra = new ControladorListaDeCompra();

    
    app.get('/listaDeCompra/:id_cliente', (req,res) =>{
        controladorListaDeCompra.listasPorCliente(req.params)
        .then((resposta)=> {
            res.status(200).send(resposta);
        });
    });

    //por algum motivo essa rota n pega
    app.get('/listaDeProdutos/lista/:id', (req, res) => {
        controladorListaDeCompra.retornarLista(req.params)
        .then(resposta => {
            res.send(resposta);
        });
    });

    app.post('/listaDeCompra', (req,res) => {
        controladorListaDeCompra.criarLista(req.body)
        .then(resposta => {
            res.send(resposta);
        });
    });
}