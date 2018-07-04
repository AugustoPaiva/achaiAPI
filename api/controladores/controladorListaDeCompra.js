
const db = require('../../config/config.js');

class ControladorListaDeCompra{
    constructor(){
        this.listaDeCompra = db.listaDeCompra;
    }

    listasPorCliente(parametros){
        return this.listaDeCompra.findAll({where: parametros})
        .then(resultado => resultado)
        .catch(erro => erro);
    }
    retornarLista(dados){
        return this.listaDeCompra.sequelize.query('SELECT nome FROM listaProduto WHERE id = ' + dado.id)
        .then(resultado => resultado)
        .catch(erro => erro);
    }

    criarLista(dados){
        return this.consultarLista(dados)
        .then( resultado => {
            if (resultado == null){
                return this.listaDeCompra.create(dados)
                .then(resultado => resultado)
                .catch(erro => {
                    throw erro;
                });  
            }
        })
    }

    consultarLista(dados){
        return this.listaDeCompra.findOne({where:dados})
        .then(resultado => resultado);
    }
}

module.exports = ControladorListaDeCompra;