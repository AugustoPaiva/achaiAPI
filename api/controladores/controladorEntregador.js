const db = require('../../config/config.js');

class ControladorEntregador{
    constructor(){
        this.entregador = db.entregador;
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
        //criar funções de verificar cpf e email e chamar aqui
        return this.entregador.create(dados)
        .then(resultado => resultado)
        .catch(erro => erro); 
        
    }

    
}

module.exports = ControladorEntregador;

