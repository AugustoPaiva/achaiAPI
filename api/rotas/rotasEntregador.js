const ControladorEntregador = require('../controladores/controladorEntregador');

module.exports = function(app){
    const controladorEntregador = new ControladorEntregador();

    app.get('/entregadores', (req,res) => {
        controladorEntregador.retornaTodosEntregadores()
        .then((resposta) => {
            res.status(200).send(resposta)
        });
    });

    app.get('/entregadores/:id',(req,res) => {
        controladorEntregador.entregadorPorId(req.params)
        .then( (resposta) => {
            res.status(200).send(resposta)
        });
    });
    
    

    app.post('/entregadores',(req,res)=>{
        if (req.body.id_usuario){
            controladorEntregador.criarEntregador(req.body)
            .then( resposta => {
                res.status(200).send(resposta);
            })
        } else {
            controladorEntregador.criarUsuarioEntregador(req.body)
            .then (resposta => {
                res.status(200).send(resposta);
            });  
        }
    });

    app.put('/entregadores', (req,res) => {
        controladorEntregador.editarUsuarioEntregador(req.body)
        .then ( resposta => {
            res.send(resposta);
        })
    });
}
