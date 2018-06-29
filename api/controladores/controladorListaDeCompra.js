const db = require('../../config/config.js');

class ControladorListaDeCompra{
    constructor(){
        this.listaDeCompra = db.listaDeCompra;
    }

    retornarListasDeCompra(parametros){
        return this.listaDeCompra.findOne({where: parametros})
        .then(resultado => resultado)
        .catch(erro => erro);
    }
    retornarLista(dado){
        return this.listaDeCompra.sequelize.query('SELECT produto FROM listaProduto WHERE id_cliente = ' + dado)
        .then(resultado => resultado)
        .catch(erro => erro);
    }
}

module.exports = ControladorListaDeCompra;