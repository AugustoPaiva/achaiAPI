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

    clientePorId(parametros){
        return this.cliente.findOne({where:parametros})
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
                    return resultado;
                });
            });
        })
        .then(retorno => retorno)
        .catch( erro => {
            if (erro.errors[0].path){
                let campo = erro.errors[0].path;
                return {status:"erro",dados:null,mensagem: campo +" já cadastrado"}
            }

        });
    }
}

module.exports = ControladorCliente;