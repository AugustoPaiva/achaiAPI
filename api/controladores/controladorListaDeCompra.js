
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
    retornarLista(dados){
        return this.listaDeCompra.sequelize.query('SELECT nome FROM listaProduto WHERE id = ' + dado.id)
        .then(resultado => resultado)
        .catch(erro => erro);
    }

    criarLista(dados){
        //{nomeLista,lista,id_usuario}
        return modelos.conexao.transaction(transacao => {
            return this.consultarLista({nome:dados.nomeLista,id_cliente:dados.id_usuario})
            .then(resultado => {
                if (resultado == false){
                    return this.listaDeCompra.create({nome:dados.nomeLista,id_cliente:dados.id_usuario})
                    .then(resultado => { 
                        dados.lista.forEach(element => {
                            this.produtos_lista.create(
                                {id_produto:element.id,
                                    id_lista:resultado.id,
                                    quantidade:element.quantidade
                                }
                            ) 
                        });
                        return "Lista salva com sucesso"
                    })
                    .catch(erro => {
                        throw erro;
                    });  
                } else {
                    return "Já existe uma lista com este nome"    
                }

            })
            
        })
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