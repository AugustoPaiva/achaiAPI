const db = require('../../config/config.js');

class ControladorProdutos{
    constructor(){
        this.produto = db.produto;
    }

    retornarProdutos(dado){
        //console.log("teste");
        return this.produto.findAll({where: dado.nome})
        .then(resultado => resultado)
        .catch(erro => erro); 
    }

}