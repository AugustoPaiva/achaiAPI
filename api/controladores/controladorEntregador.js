const modelos = require('../../config/config.js');

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
        let usuario = modelos.usuario;
        let novousuario = {nome:dados.nome,cpf:dados.cpf,email:dados.email,senha:dados.senha};
        let entregador = {cnh: dados.cnh};
        return modelos.conexao.transaction( transacao => {
            return usuario.create(novousuario,{transaction:transacao})
            .then(usuario => {
                let resultado = JSON.parse(JSON.stringify(usuario))
                entregador.id_usuario = resultado.id;
                return this.entregador.create(entregador,{transaction:transacao})
                .then(entregador => {
                    resultado.id_entregador = entregador.id;
                    resultado.cnh = entregador.cnh;
                    resultado.nota = entregador.nota;
                    return resultado;
                });
            })
            .catch(erro => {
                console.log(erro);
                return {status:"erro",mensagem:"informações já cadastradas"}
            });;
        });
        

        
    }

    
}

module.exports = ControladorEntregador;

