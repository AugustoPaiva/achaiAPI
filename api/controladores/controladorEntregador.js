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

    criarEntregador(dados){
        const controladorUsuario = new ControladorUsuario();
        let novousuario = {nome:dados.nome,cpf:dados.cpf,email:dados.email,senha: dados.senha};
        let entregador = {cnh: dados.cnh};
        return modelos.conexao.transaction( transacao => {
            return controladorUsuario.criarUsuario(novousuario,{transaction:transacao})
            .then(usuario => {
                let resultado = JSON.parse(JSON.stringify(usuario))
                entregador.id_usuario = resultado.id;
                return this.entregador.create(entregador,{transaction:transacao})
                .then(entregador => {
                    resultado.id_entregador = entregador.id;
                    resultado.cnh = entregador.cnh;
                    resultado.nota = entregador.nota;
                    return resultado;
                },{transaction:transacao});
            },{transaction:transacao})
        })
        .then( retorno => retorno)
        .catch( erro => {
            let campo = erro.errors[0].path;
            return {status:"erro",dados:null,mensagem: campo +" já cadastrado"}
        });
    }

    
}

module.exports = ControladorEntregador;

