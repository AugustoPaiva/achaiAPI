const ControladorUsuario = require('../controladores/controladorUsuario');

module.exports = function(app){
    const controladorUsuario = new ControladorUsuario();
    
    app.get('/usuarios', (req,res) => {
        controladorUsuario.retornaTodosUsuarios()
        .then((resposta) => {
            res.status(200).send(resposta)
        });
    });

    app.get('/usuarios/:id',(req,res) => {
        controladorUsuario.usuarioPorId(req.params)
        .then( (resposta) => {
            res.status(200).send(resposta)
        });
    });

    app.put('/usuarios', (req,res) => {
        controladorUsuario.editarUsuario(req.body)
        .then ( resposta => {
            res.send(resposta);
        })
    });
    
    app.post('/usuarios', (req,res) => {
        controladorUsuario.criarUsuario(req.body)
        .then(resposta => {
            res.send(resposta)
        });
    });

    app.post('/login', (req,res) => {
        controladorUsuario.login(req.body)
        .then(resposta => {
            if (resposta == null){
                res.status(400).send({status:'erro',dados:resposta,mensagem:"Informações incorretas"});
                return;
            }
            res.status(200).send({status:'sucesso',dados:resposta,mensagem:"Usuário logado"});
        });
    });
    
    
}
