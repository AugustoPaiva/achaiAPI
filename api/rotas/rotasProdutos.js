const ControladorProduto = require('../controladores/controladorProduto');

module.exports = function(app){
    const controladorProduto = new ControladorProduto();


    app.post('/produtos', (req,res) => {
        res.status(400).send({status:'ok'});
        //controladorProdutos.retornaProdutos(req.body)
        //.then((resposta) => {
        //   if(resposta == null){
        //        res.status(400).send({status:'erro',dados:resposta,mensagem:'Produto nao encontrado.'})
        //    }
        //    res.status(200).send(resposta)
        //});
    });

}
