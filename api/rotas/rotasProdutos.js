const ControladorProduto = require('../controladores/controladorProduto');

module.exports = function(app){
    const controladorProduto = new ControladorProduto();


    app.get('/produtos', (req,res) => {
        controladorProduto.retornarProdutos()
        .then((resposta) => {
            res.status(200).send(resposta)
        });
    });

}
