const db = require('../../config/config.js');
const UsuarioDao = require('../dao/UsuarioDao');
const usuarioDao = new UsuarioDao(db.usuario);

var mensagem = {
    "carro" : "carro",
    "coroa": "coroa"
}
module.exports.retornaTodosUsuarios =  function(req,res) {
    return usuarioDao.retornaTodosUsuarios()
        .then(usuarios => {
            var userio = teste(usuarios);
            res.send(userio);
    });
};

function teste(variavel){
    if(variavel != "ndsdome"){
        return "true baby";
    }

}