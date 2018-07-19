const ControladorCartao = require('../controladores/controladorCartao');


module.exports = function(app){
    const controladorCartao = new ControladorCartao();

    app.get('/cartoes', (req,res) => {
        controladorCartao.retornaTodosCartoes()
        .then((resposta) => {
            res.status(200).send(resposta)
        });
    });

    app.post('/cartoes', (req,res) => {
        controladorCartao.criarCartao(req.body)
        .then( resposta => {
            res.status(200).send(resposta)
        });
    });

    app.get('/cartoes/:id', (req,res) => {
        controladorCartao.cartaoPorId(req.params)
        .then( resposta => {
            res.status(200).send(resposta)
        })
    })
}





