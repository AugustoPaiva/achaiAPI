const ControladorProduto = require('../controladores/controladorProduto');
const ControladorPreco = require('../controladores/controladorPreco');
module.exports = function(app){
    const controladorProduto = new ControladorProduto();
    const controladorPreco = new ControladorPreco();

    app.get('/produtos', (req,res) => {
        controladorProduto.retornarProdutos()
        .then((resposta) => {
            res.status(200).send(resposta)
        });
    });

    app.post('/distancia', (req,res) => {
        controladorPreco.calcularDistancia(req.body);
    })



}
