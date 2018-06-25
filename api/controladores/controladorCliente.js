const db = require('../../config/config.js');
const ClienteDao = require('../dao/ClienteDao');
const clienteDao = new UsuarioDao(db.cliente);

const UsuarioDao = require('../dao/UsuarioDao');
const usuarioDao = new UsuarioDao(db.usuario);


class ControladorCliente{
    
    constructor(db_cliente){
        this.cliente = db_cliente;
    }

    criarCliente(novoCliente){
        cliente = {
            idUsuario = "0"
        }
        
        //criar funções de verificar cpf e email e chamar aqui
         usuarioDao.create(novoClinete)
        .then(resultado => cliente.idUsuario = resultado)
        .catch(erro => erro); 

        clienteDao.create(cliente)
        .then(resultado => resultado)
        .catch(erro => erro);
        

    }
}


















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