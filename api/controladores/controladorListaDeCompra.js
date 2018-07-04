const db = require('../../config/config.js');

class ControladorListaDeCompra{
    constructor(){
        this.listaDeCompra = db.listaDeCompra;
    }

    retornarListasDeCompra(parametros){
        return this.listaDeCompra.findAll({where: parametros})
        .then(resultado => resultado)
        .catch(erro => erro);
    }
    retornarLista(dado){
        return this.listaDeCompra.sequelize.query('SELECT nome FROM listaProduto WHERE id = ' + dado.id)
        .then(resultado => resultado)
        .catch(erro => erro);
    }
}

module.exports = ControladorListaDeCompra;