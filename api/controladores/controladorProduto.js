const modelos = require('../../config/config.js');

class ControladorProduto{
    constructor(){
        this.produto = modelos.produto;
    }

    retornarProdutos(dado){
        return this.produto.findAll()
        .then(resultado => resultado)
        .catch(erro => erro);
    }


}
module.exports = ControladorProduto;
