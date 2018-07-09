const modelos = require('../../config/config.js');
const crypto = require("crypto");
const ControladorEndereco = require('../controladores/controladorEndereco');

class ControladorUsuario{
    constructor(){
        this.usuario = modelos.usuario;
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

    editarUsuario(id,dados){
        const controladorEndereco = new ControladorEndereco();
        dados.senha = this.criptografar(dados.senha);
        return modelos.conexao.transaction( transacao => {
            return controladorEndereco.registrarEndereco(dados.endereco)
            .then(resultado => {
                return this.usuario.findOne({where:id})
                .then(usuario => {
                    const newinfo = {nome:dados.nome,email:dados.email,senha:this.criptografar(dados.senha),endereco:resultado.id}
                    return usuario.updateAttributes(newinfo)
                    .then(usuario => {
                        return usuario;
                    })
                    .catch(erro => {
                        let campo = erro.errors[0].path;
                        return {status:"erro",dados:null,mensagem: campo +" já cadastrado"}
                    })
                })
                
            });
        });
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

