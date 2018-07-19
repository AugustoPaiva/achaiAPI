const modelos = require('../../config/config.js');

class ControladorCartao{
    constructor(){
        this.cartao = modelos.cartao;
    }

    retornaTodosCartoes(){
        return this.cartao.findAll()
        .then(resultado => resultado)
        .catch(erro => erro);
    }
    
    cartaoPorId(dados){
        return this.cartao.findOne({where:dados})
        .then(resultado => resultado)
        .catch(erro => erro);
    }

    criarCartao(dados){
        return this.cartao.create(dados)
        .then(resultado => resultado)
        .catch(erro => erro);
    }

    
}

module.exports = ControladorCartao;
