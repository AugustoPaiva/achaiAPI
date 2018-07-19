const modelos = require('../../config/config.js');

class ControladorPedido{
    constructor(){
        this.pedido = modelos.pedido;

    }
    adicionarPedido(dados){
        

        var dia = ((dados.dataEntrega).split(" ")[0]).split("/");
        var hora = ((dados.dataEntrega).split(" ")[1]).split(":");
        
        let data = new Date(dia[2],dia[1]-1,dia[0]);
        
        dados.dataEntrega = data;
        return this.pedido.create(dados)
        .then(resposta => resposta )
        .catch(erro => {
            throw erro;
        });
    }



}
module.exports = ControladorPedido;