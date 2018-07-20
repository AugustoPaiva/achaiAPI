const modelos = require('../../config/config.js');

class ControladorPedido{
    constructor(){
        this.pedido = modelos.pedido;
        this.produtos_lista = modelos.produtos_lista;

    }
    adicionarPedido(dados){
        let novoDado = {
           "dataEntrega" : dados.dataEntrega,
           "id_usuario": dados.id_usuario,
           "status":dados.status

        }
        
        var dia = ((novoDado.dataEntrega).split(" ")[0]).split("/");
        var hora = ((novoDado.dataEntrega).split(" ")[1]).split(":");
        let data = new Date(dia[2],dia[1]-1,dia[0]);
        
        novoDado.dataEntrega = data;
        return this.pedido.create(novoDado)
        .then(resposta => resposta )
        .catch(erro => {
            throw erro;
        });
    }

    adicionarCompra(lista,pedido){
        lista.forEach(produto =>{
            console.log(pedido);
            // console.log(produto.id);
            // console.log(produto.quantidade);

            this.produtos_lista.create({
                "id_produto": produto.id,
                "id_pedido": pedido,
                "quantidade":produto.quantidade
            });
        });
    }
    
    retornarPedido(parametros){
        produtos =  this.produtos_lista.sequelize.query("SELECT P.id, P.nome, P.marca, L.quantidade " +
                                                "FROM produtos as P, produtos_listas as L" + 
                                                "WHERE P.id = L.id_produto and L.id_pedido = '" + parametros.id + "'");
        pedido = this.pedido.sequelize.query("SELECT dataEntrega, id_usuario, status from pedidos where id = '" + parametros.id + "'");
        return ({"produtos": produtos, "pedido":pedido});
    }



}
module.exports = ControladorPedido;