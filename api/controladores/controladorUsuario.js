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

    criarUsuario(dados){
        //criar funções de verificar cpf e email e chamar aqui
        return this.usuario.create(dados)
        .then(resultado => resultado)
        .catch(erro => erro); 
        
    }

    verificarCPF(cpf){
        return this.usuario.findOne({where:{cpf:cpf}})
        .then(resultado => resultado)
        .catch(erro => erro);
    }

    login(login){
        return this.usuario.findOne({where:login})
        .then(resultados => resultados)
        .catch(erro => erro);
    }
}

module.exports = ControladorUsuario;

