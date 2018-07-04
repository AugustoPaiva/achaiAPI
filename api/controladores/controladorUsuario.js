const db = require('../../config/config.js');
const crypto = require("crypto");

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

    criarUsuario(dados,transacao){
        dados.senha = this.criptografar(dados.senha);
        return this.usuario.create(dados,transacao)
        .then(resultado => resultado)
        .catch(erro => {
            throw erro;
        });   
    }

    editarUsuario(dados){
        dados.senha = this.criptografar(dados.senha);
        return this.usuarioPorId({id:dados.id})
        .then(usuario => {
            return usuario.updateAttributes(dados)
            .then(usuario => usuario)
            .catch(erro => {
                let campo = erro.errors[0].path;
                return {status:"erro",dados:null,mensagem: campo +" já cadastrado"}
            })
        })
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
        login.senha = this.criptografar(login.senha);
        return this.usuario.findOne({where:login})
        .then(resultados => resultados)
        .catch(erro => erro);
    }

    criptografar(senha){
        var criptografia = crypto.createCipher("aes256","chaves");
        criptografia.update(senha,'utf8','hex');
        return criptografia.final("hex");
    }
}

module.exports = ControladorUsuario;

