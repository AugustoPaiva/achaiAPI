const controladorUsuario = require('../controladores/controladorUsuario');
const db = require('../../config/config.js');

const UsuarioDao = require('../dao/UsuarioDao');

module.exports = function(app){
    const usuarioDao = new UsuarioDao(db.usuario);
    
    app.get('/usuarios', (req,res) => {
        
        controladorUsuario.retornaTodosUsuarios(req,res)
        .then(usuario => {
            res.send(usuario);
        })
        
    });

    app.get('/usuarios/:id',(req,res) => {
        usuarioDao.usuarioPorInfo(req.params)
        .then(usuario => {
            res.send(usuario);
        })
    });
    
    app.post('/usuarios', (req,res) => {
        usuarioDao.criarUsuario(req.body)
        .then(resposta => {
            res.send(resposta)
        });
    });

    app.post('/login', (req,res) => {
        usuarioDao.login(req.body)
        .then(resposta => {
            res.send(resposta);
        })
    });

    //app.post('/usuarios/get', controladorUsuario.usuarioPorEmail);
    
}
//INSERT INTO `usuarios` (`id`, `nome`, `cpf`, `email`, `senha`) VALUES (1, 'ndsdome', 'sdsd', 'fdfdf', 'fgfgf');