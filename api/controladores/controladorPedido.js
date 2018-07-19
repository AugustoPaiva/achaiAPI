const modelos = require('../../config/config.js');

class ControladorPedido{
    constructor(){
        this.pedido = modelos.pedido;

    }
    adicionarPedido(dados){
        

        var dia = ((dados.dataEntrega).split(" ")[0]).split("/");
        var hora = ((dados.dataEntrega).split(" ")[1]).split(":");
        
        let data = new Date(dia[2],dia[1]-1,dia[0],1,5,1,10);
        var s = new Date(1912,2,12,10,65,27,23);
        console.log(s);
        
        
        dados.dataEntrega = s;
        return this.pedido.create(dados)
        .then(resposta => resposta )
        .catch(erro => {
            throw erro;
        });
    }

    //   adicionarPedido(dado){
    //       return this.pedido.create(dado)
    //       .then(resultado => resultado)
    //       .catch(erro => erro);
    //   }

    //  retornarPedido(dado){
    //      return this.pedido.sequelize.query('SELECT ')
    //  }

}
module.exports = ControladorPedido;