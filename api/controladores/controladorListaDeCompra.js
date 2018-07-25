
const modelos = require('../../config/config.js');

class ControladorListaDeCompra{
    constructor(){
        this.listaDeCompra = modelos.listaDeCompra;
        this.produtos_lista = modelos.produtos_lista;
    }

    listasPorCliente(parametros){
        return this.listaDeCompra.findAll({where: parametros})
        .then(resultado => resultado)
        .catch(erro => erro);
    }

    listaPorId(parametros){ 
        return this.produtos_lista.findAll({where:parametros})
        .then(resultado => resultado)
        .catch(erro => erro);
    }
    //corrigir
    retornarLista(parametros){
        return this.listaDeCompra.sequelize.query(
            "SELECT P.id, P.nome, P.marca, L.quantidade " +
            "FROM produtos as P, produtos_listas as L " + 
            "WHERE P.id = L.id_produto and L.id_lista = '" + parametros.id + "'")
        .then(resultado => resultado[0])
        .catch(erro => erro);
    }

    criarLista(dados){
        //{nomeLista,lista,id_usuario}
        return modelos.conexao.transaction(transacao => {
            return this.consultarLista({nome:dados.nomeLista,id_cliente:dados.id_usuario}, 
            {transaction:transacao}).then(verificacao => {
                if (verificacao == false){
                    return this.listaDeCompra.create({nome:dados.nomeLista,id_cliente:dados.id_usuario},
                    {transaction:transacao}).then(resultado => {
                        this.preencheProdutos(dados.lista,resultado.id);
                        return {status:"sucesso", mensagem: "Lista salva com sucesso"};
                    })
                }else{
                    throw new Error();
                } 
            })            
        })
        .then(resultado => resultado)
        .catch(erro => {
            return {status:"erro",mensagem:"Você já possui uma lista com esse nome"};
        });
    }

    preencheProdutos(lista, id_lista){
        lista.forEach(produto =>{
            this.produtos_lista.create({
                id_lista:id_lista,
                id_produto:produto.id,
                quantidade:produto.quantidade
            })
        });
    }

    adicionarProduto(dados){
            return this.produtos_lista.create(dados)
            .then(resposta => resposta)
            .catch(erro => {
            throw erro;
        });
    }

    consultarLista(dados){
        return this.listaDeCompra.findOne({where:dados})
        .then(resultado => {
            if (resultado == null) {
                return false;
            } else{
                return true;
            }
        });
    }

    
    

    

}

module.exports = ControladorListaDeCompra;




