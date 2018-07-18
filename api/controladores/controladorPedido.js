const modelos = require('../../config/config.js');

class ControladorPedido{
    constructor(){
        this.pedido = modelos.pedido;

    }
    
    adicionarPedido(dado){
        return this.pedido.create(dado)
        .then(resultado => resultado)
        .catch(erro => erro);
    }

  //  retornarPedido(dado){
   ///     return this.pedido.sequelize.query('SELECT ')
   /// }

}
module.exports = ControladorPedido;