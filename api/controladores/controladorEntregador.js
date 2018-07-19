const modelos = require('../../config/config.js');
const ControladorUsuario = require('../controladores/controladorUsuario');

class ControladorEntregador{
    constructor(){
        this.entregador = modelos.entregador;
    }

    retornaTodosEntregadores(){
        return this.entregador.findAll()
        .then(resultado => resultado)
        .catch(erro => erro);
    }

    entregadorPorId(parametros){
        return this.entregador.findOne({where:parametros})
        .then(resultado => resultado)
        .catch(erro => erro); 
    }

    entregadorPorUsuario(id_usuario){
        return this.entregador.findOne({where:id_usuario})
        .then(resultado => resultado)
        .catch(erro => erro);
    }

    editarEntregador(dados){
        return this.entregadorPorId({id:dados.id})
        .then(entregador => {
            return entregador.updateAttributes(dados)
            .then(entregador => entregador)  
            .catch(erro => {
                let campo = erro.errors[0].path;
                return {status:"erro",dados:null,mensagem: campo +" já cadastrado"}
            })
        })
    }

    criarEntregador(dados){
        return this.entregador.create(dados)
        .then(resultado => resultado)
        .catch(erro => {
            let campo = erro.errors[0].path;
            return {status:"erro",dados:null,mensagem: campo +" já cadastrado"}
        });
    }

    criarUsuarioEntregador(dados){
        const controladorUsuario = new ControladorUsuario();
        let novousuario = {nome:dados.nome,cpf:dados.cpf,email:dados.email,senha: dados.senha};
        let entregador = {cnh: dados.cnh};
        return modelos.conexao.transaction( transacao => {
            return controladorUsuario.criarUsuario(novousuario,{transaction:transacao})
            .then(usuario => {
                entregador.id_usuario = usuario.id;
                return this.entregador.create(entregador,{transaction:transacao})
                .then(entregador => {
                    return {status:"sucesso",dados:this.retornar(usuario,entregador),mensagem:"Cadastrado com sucesso"};
                },{transaction:transacao});
            },{transaction:transacao})
        })
        .then( retorno => retorno)
        .catch( erro => {
            if (erro.errors){
                let campo = erro.errors[0].path;
                return {status:"erro",dados:null,mensagem: campo +" já cadastrado"}
            } return erro;
        });
    }

    retornar(usuario,entregador){
        let resultado = JSON.parse(JSON.stringify(usuario));
        resultado.id_entregador = entregador.id;
        resultado.nota = entregador.nota;
        resultado.cnh = entregador.cnh;

        return resultado;
    }

}

module.exports = ControladorEntregador;


/*
    entregadorPorUsuario(id_usuario){
        return this.entregador.findOne({where:id_usuario})
        .then(resultado => resultado)
        .catch(erro => erro);
    }

    editarUsuarioEntregador(dados){
        const controladorUsuario = new ControladorUsuario();
        return modelos.conexao.transaction(transacao => {
            return controladorUsuario.editarUsuario(dados, {transaction: transacao})
            .then(usuario => {
                return this.entregadorPorUsuario({id_usuario:usuario.id})
                .then(entregador => {
                    return this.retornar(usuario,entregador);
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
