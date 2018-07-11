const modelos = require('../../config/config.js');
const crypto = require("crypto");
const ControladorEndereco = require('../controladores/controladorEndereco');
const ControladorCliente = require('../controladores/controladorCliente');
const ControladorEntregador = require('../controladores/controladorEntregador');

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
        .then(retorno => {
            let usuario = JSON.parse(JSON.stringify(retorno));
            //usuario = this.anexarCliente(usuario);
            usuario = this.anexarEntregador(usuario);
            //usuario = this.anexarEndereco(usuario);
            return usuario;
        })
        .catch(erro => erro);
    }

    anexarEntregador(dados){
        let controladorEntregador = new ControladorEntregador();
        let usuario = JSON.parse(JSON.stringify(dados));
        return controladorEntregador.entregadorPorUsuario({id_usuario:dados.id})
        .then(entregador => {
            if (entregador == null){
                return usuario;
            } else {
                usuario.cliente = {id:entregador.id,nota:entregador.nota,cnh:entregador.cnh};
                return usuario;
            }
        })
    }

    anexarCliente(dados){
        let controladorCliente = new ControladorCliente();
        let usuario = JSON.parse(JSON.stringify(dados));
        return controladorCliente.clientePorUsuario({id_usuario:dados.id})
        .then(cliente => {
            if (cliente == null){
                return usuario;
            } else {
                usuario.cliente = {id: cliente.id};
                return usuario;
            }
        })
    }

    anexarEndereco(dados){
        let controladorEndereco = new ControladorEndereco();
        let usuario = JSON.parse(JSON.stringify(dados));
        
        if (usuario.endereco == 'null'){
            return usuario;
        } else {
            return controladorEndereco.retornaEnderecoId({id:usuario.endereco})
            .then(endereco => {
                usuario.endereco = endereco;
                return usuario;
            })
        }
    }

    criptografar(senha){
        var criptografia = crypto.createCipher("aes256","chaves");
        criptografia.update(senha,'utf8','hex');
        return criptografia.final("hex");
    }
}

module.exports = ControladorUsuario;

