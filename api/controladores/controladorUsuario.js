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
        .then(retorno => {
            if (retorno == null){
                return retorno;
            }
            let usuario = JSON.parse(JSON.stringify(retorno));
            return this.anexarTipo(usuario)
            .then( usuarioTipo => {
                return this.anexarEndereco(usuarioTipo)
                .then (usuarioendereco => {
                    return usuarioendereco;
                })
            })
        }) 
    }

    criarUsuario(dados,transacao){
        dados.senha = this.criptografar(dados.senha);
        return this.usuario.create(dados,transacao)
        .then(resultado => resultado)
        .catch(erro => {
            throw erro;
        });   
    }

    verificaEndereco(dados){
        const controladorEndereco = new ControladorEndereco();
        let novoendereco = {rua:dados.rua,numero:dados.numero,bairro:dados.bairro,complemento:dados.complemento,latitude:dados.latitude,longitude:dados.longitude};
        if (dados.id == null){
            return controladorEndereco.registrarEndereco(novoendereco)
            .then( enderecoCriado => {
                return enderecoCriado;
            });
        } 
        return controladorEndereco.editarEndereco(dados.id,novoendereco)
        .then( enderecoatualizado => {
            return enderecoatualizado;
        });    
    }

    editarUsuario(id,dados){
        const novousuario = {nome:dados.nome,email:dados.email}
        if (dados.senha != null){
            novousuario.senha = this.criptografar(dados.senha)
        }
        return modelos.conexao.transaction( transacao => {
            return this.verificaEndereco(dados.endereco)
            .then( novoendereco => {
                return this.usuario.findOne({where:id})
                .then(usuario => {
                    novousuario.endereco = novoendereco.id;
                    return usuario.updateAttributes(novousuario)
                    .then(usuario => {
                        return usuario;
                    });
                })
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
        .then(retorno => {
            if (retorno == null){
                return retorno;
            }
            let usuario = JSON.parse(JSON.stringify(retorno));
            return this.anexarTipo(usuario)
            .then( usuarioTipo => {
                return this.anexarEndereco(usuarioTipo)
                .then (usuarioendereco => {
                    return usuarioendereco;
                })
            })
        })  
    }

    anexarTipo(dados){
        let usuario = JSON.parse(JSON.stringify(dados));
        return modelos.cliente.findOne({where:{id_usuario:dados.id}})
        .then(cliente => {
            if (cliente != null){
                usuario.cliente = {id: cliente.id};
            } 
            return modelos.entregador.findOne({where:{id_usuario:dados.id}})
            .then(entregador => {
                if (entregador != null){
                    usuario.entregador = {id:entregador.id,nota:entregador.nota,cnh:entregador.cnh};
                }
                return usuario;
            })
            
        });
    }
    
    anexarEndereco(dados){
        let usuario = JSON.parse(JSON.stringify(dados));
        if (usuario.endereco == 'null'){
            return usuario;
        } 
        return modelos.endereco.findOne({where:{id:usuario.endereco}})
        .then(endereco => {
            usuario.endereco = endereco;
            return usuario;
        })
    }

    criptografar(senha){
        var criptografia = crypto.createCipher("aes256","chaves");
        criptografia.update(senha,'utf8','hex');
        return criptografia.final("hex");
    }
}

module.exports = ControladorUsuario;

