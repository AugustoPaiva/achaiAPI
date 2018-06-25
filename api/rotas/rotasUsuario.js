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
    
    app.post('/usuarios', (req,res) => {
        controladorUsuario.criarUsuario(req.body)
        .then(resposta => {
            res.send(resposta)
        });
    });

    app.post('/login', (req,res) => {
        controladorUsuario.login(req.body)
        .then(resposta => {
            res.send(resposta)
        });
    });

    //app.post('/usuarios/get', controladorUsuario.usuarioPorEmail);
    
}
//INSERT INTO `usuarios` (`id`, `nome`, `cpf`, `email`, `senha`) VALUES (1, 'ndsdome', 'sdsd', 'fdfdf', 'fgfgf');