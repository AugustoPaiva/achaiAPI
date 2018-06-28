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
        return this.verificarCPF(dados.cpf)
        .then( cpf => {
            if (cpf) return {status:"erro",mensagem:"CPF já cadastrado"}
            return this.verificarEmail(dados.email)
            .then(email => {
                if (email) return {status:"erro",mensagem:"Email já cadastrado"}
                return this.usuario.create(dados)
                .then(resultado => resultado)
                })
        });
    }

    verificarCPF(cpf){
        return this.usuario.findOne({where:{cpf:cpf}})
        .then(resultado => {
            if (resultado == null){
                return false;
            } else {
                return true;
            }
        });
    }

    verificarEmail(email){
        return this.usuario.findOne({where:{email:email}})
        .then(resultado => {
            return resultado;
            /*if (resultado == null){
                return false;
            } else {
                return true;
            }*/
        });
    }

    login(login){
        return this.usuario.findOne({where:login})
        .then(resultados => resultados)
        .catch(erro => erro);
    }
}

module.exports = ControladorUsuario;

