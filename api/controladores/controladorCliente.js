const modelos = require('../../config/config.js');

class ControladorCliente{
    constructor(){
        this.cliente = modelos.cliente;
    }

    retornaTodosClientes(){
        return this.cliente.findAll()
        .then(resultado => resultado)
        .catch(erro => erro);
    }

    clientePorId(parametros){
        return this.cliente.findOne({where:parametros})
        .then(resultado => resultado)
        .catch(erro => erro); 
    }

    criarCliente(dados){
        const controladorUsuario = new ControladorUsuario();
        return modelos.conexao.transaction( transacao => {
            return controladorUsuario.criarUsuario(dados,{transaction:transacao})
            .then(usuario => {
                let resultado = JSON.parse(JSON.stringify(usuario))
                return this.cliente.create({id_usuario:usuario.id},{transaction:transacao})
                .then(cliente => {
                    resultado.id_cliente = cliente.id;
                    return resultado;
                });
            });
        })
        .then(retorno => retorno)
        .catch( erro => {
            let campo = erro.errors[0].path;
            return {status:"erro",dados:null,mensagem: campo +" já cadastrado"}
        });
    }
}

module.exports = ControladorCliente;
















/*
module.exports.criarCliente =  function(req,res) {
    idUsuario = 0
    var usuario = {
        "nome" :req.nome,
        "email":req.email,
        "cpf"  :req.cpf,
        "senha":req.senha
        
    }

    usuarioDao.criarUsuario(usuario)
        .then(resposta => resposta/*idUsuario = resposta[0].id;);*/

    /*var cliente = {
        "id_usuario": idUsuario
    }


    return clienteDao.criarCliente(cliente)
        .then(usuarios => {
            res.send(usuarios);
    });*/
//};
/*
module.exports.criarCliente = function(novoCliente){
    idUsuario = 0
    var usuario = {
        "nome" :novoCliente.nome,
        "email":novoCliente.email,
        "cpf"  :novoCliente.cpf,
        "senha":novoCliente.senha
        
    }

    usuarioDao.criarUsuario(usuario)
        .then(resposta => {
            idUsuario = resposta[0].id;
        });

    var cliente = {
        "id_usuario": isUsuario
    }

    return  clienteDao.criarCliente(cliente)
    .then(resultado =>resultado )
    .catch(erro => erro);              
        
        
    

    
} 
*/