const db = require('../../config/config.js');

class ControladorUsuario{
    constructor(){
        this.usuario = db.usuario;
    }

    retornaTodosUsuarios(){
        return this.usuario.findAll()
        .then(resultado => resultado)
        .catch(erro => erro);
    }

    usuarioPorId(parametros){
        
        return this.usuario.findOne({where:parametros})
        .then(resultado => resultado)
        .catch(erro => erro); 
    }

    criarUsuario(dados,transaction){
        return this.usuario.create(dados)
        .then(resultado => resultado)
        .catch(erro => erro);s
    }

    verificarCPF(cpf){
        return this.usuario.findOne({where:{cpf:cpf}})
        .then(resultado => resultado);
    }

    verificarEmail(email){
        return this.usuario.findOne({where:{email:email}})
        .then(resultado => resultado);
    }

    login(login){
        return this.usuario.findOne({where:login})
        .then(resultados => resultados)
        .catch(erro => erro);
    }
}

module.exports = ControladorUsuario;

