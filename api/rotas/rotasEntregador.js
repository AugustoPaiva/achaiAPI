const ControladorEntregador = require('../controladores/controladorEntregador');
const ControladorUsuario = require('../controladores/controladorUsuario')

module.exports = function(app){
    const controladorEntregador = new ControladorEntregador();
    const controladorUsuario = new ControladorUsuario();

    app.get('/entregadores', (req,res) => {
        controladorEntregador.retornaTodosEntregadores()
        .then((resposta) => {
            res.status(200).send(resposta)
        });
    });

    app.get('/entregadores/:id',(req,res) => {
        controladorEntregador.EntregadoresPorId(req.params)
        .then( (resposta) => {
            res.status(200).send(resposta)
        });
    });
    
    app.post('/entregadores',(req,res)=>{
        controladorEntregador.criarEntregador(req.body)
        .then (resposta => {
            res.status(200).send(resposta);
        });    
    });
}
