const modelos = require('../../config/config.js');

class ControladorEndereco{
    constructor(){
        this.endereco = modelos.endereco;
    }

    retornaEnderecoId(dado){
        return this.endereco.findOne({where:dado})
        .then(resultado => resultado)
        .catch(erro => erro);
    }

    editarEndereco(id,dados){
        return this.endereco.findOne({where:{id:id}})
        .then(endereco => {
            return endereco.updateAttributes(dados)
            .then(novoendereco => {
                return novoendereco;   
            })
        });
    }

    registrarEndereco(dado){
        return this.endereco.create(dado)
        .then(resultado => {
            return resultado
        })
        .catch(erro => erro);
    }
}

module.exports = ControladorEndereco;