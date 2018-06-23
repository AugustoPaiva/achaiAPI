var ControladorUsuario = require('../controladores/ControladorUsuario');
const db = require('../../config/config.js');


module.exports = function(app){
    const controladorUsuario = new ControladorUsuario(db.usuario);
    
    app.get('/usuarios', (req,res) => {
        controladorUsuario.retornaTodosUsuarios()
        .then(usuarios => {
            res.send(usuarios);
        });
    });

    app.get('/usuarios/:id',(req,res) => {
        controladorUsuario.usuarioPorId(req.params)
        .then(usuario => {
            res.send(usuario);
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
            res.send(resposta);
        })
    });

    //app.post('/usuarios/get', controladorUsuario.usuarioPorEmail);
    
}
