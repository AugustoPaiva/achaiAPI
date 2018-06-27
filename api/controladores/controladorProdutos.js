const db = require('../../config/config.js');

class ControladorProdutos{
    constructor(){
        this.produto = db.produto;
    }

    retornarProdutos(nome){
        return this.produto.findOne({where:nome})
        .then(resultado => resultado)
        .catch(erro => erro); 
    }

}