const ControladorEndereco = require('../controladores/controladorEndereco');

module.exports = function(app){
    const controladorEndereco = new ControladorEndereco();

    app.get('/enderecos/:id', (req,res) => {
        controladorEndereco.retornaEnderecoId(req.params)
        .then( resposta =>    {
            res.status(200).send(resposta);
        });
    });

    app.post('/enderecos', (req,res) => {
        //console.log('teste');
        //res.send(req.body);
        controladorEndereco.registrarEndereco(req.body)
        .then( resposta => {
            res.send(resposta)
        });
    });

}