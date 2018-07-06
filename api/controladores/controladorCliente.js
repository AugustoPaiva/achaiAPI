const modelos = require('../../config/config.js');
const ControladorUsuario = require('../controladores/controladorUsuario');


class ControladorCliente{
    constructor(){
        this.cliente = modelos.cliente;
    }

    retornaTodosClientes(){
        return this.cliente.findAll()
        .then(resultado => resultado)
        .catch(erro => erro);
    }

    clientePorId(id){ 
        return this.cliente.findOne({where:id})
        .then(resultado => resultado)
        .catch(erro => erro); 
    }

    editarCliente(dados){
        return this.entregadorPorId({id:dados.id})
        .then(cliente => {
            return cliente.updateAttributes(dados)
            .then(cliente => {
                return {status:"sucesso",dados:cliente,mensagem:"Dados atualizados"}
            }) 
            .catch(erro => {
                let campo = erro.errors[0].path;
                return {status:"erro",dados:null,mensagem: campo +" já cadastrado"}
            }) 
        })
    }

    clientePorUsuario(id_usuario){
        return this.cliente.findOne({where:id_usuario})
        .then(resultado => resultado)
        .catch(erro => erro);
    }

    criarCliente(dados){
        const controladorUsuario = new ControladorUsuario();
        return modelos.conexao.transaction( transacao => {
            return controladorUsuario.criarUsuario(dados,{transaction:transacao})
            .then(usuario => {
                let resultado = JSON.parse(JSON.stringify(usuario))
                return this.cliente.create({id_usuario:usuario.id},{transaction:transacao})
                .then(cliente => {
                    resultado.id_cliente = cliente.id;
                    return {status:"sucesso",dados:resultado,mensagem:"Cadastrado com sucesso"}                    
                })
            });
        })
        .then(retorno => retorno)
        .catch( erro => {
            let campo = erro.errors[0].path;
            return {status:"erro",dados:null,mensagem: campo +" já cadastrado"}
        });
    }
}

module.exports = ControladorCliente;


/*
    editarUsuarioCliente(dados){
        const controladorUsuario = new ControladorUsuario();
        return modelos.conexao.transaction(transacao => {
            return controladorUsuario.editarUsuario(dados, {transaction: transacao})
            .then(usuario => {
                return this.clientePorUsuario({id_usuario:usuario.id})
                .then(cliente => {
                    let resultado = JSON.parse(JSON.stringify(usuario));
                    resultado.cliente_id = cliente.id;
                    return resultado;s
                });
            });
        })
        .then(retorno => retorno)
        .catch( erro => {
            let campo = erro.errors[0].path;
            return {status:"erro",dados:null,mensagem: campo +" já cadastrado"}
        });
    }
*/


