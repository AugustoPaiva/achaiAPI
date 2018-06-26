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
    

    app.post('/entregadores', (req,res) => {
        let usuario = {nome:req.body.nome,email:req.body.email,cpf:req.body.cpf,senha:req.body.senha}
        let entregador = {cnh:req.body.cnh}
        controladorUsuario.criarUsuario(usuario)
            .then(usuario => {
                entregador.id_usuario = usuario.id;
                controladorEntregador.criarEntregador(entregador)
                .then((entregador) => {
                    let resultado = JSON.parse(JSON.stringify(usuario));;
                    resultado.id_entregador = entregador.id;
                    resultado.cnh = entregador.cnh;
                    resultado.nota = entregador.nota;
                    res.json(resultado);
                })
            }).catch( error => {
                console.log(error);
            });   
    });

}
