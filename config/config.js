const env = require('./env.js');
const Sequelize = require('sequelize');

const conexao = new Sequelize(env.database,env.username,env.password,{
    host: env.host,
    dialect: env.dialect,
    operatorsAliases: false,
    pool:{
        max: env.pool.max,
        min: env.pool.min,
        acquire: env.pool.acquire,
        idle: env.pool.idle
    },
    define:{
        timestamps:false
    }
});

const db = {};

db.Sequelize = Sequelize;
db.conexao = conexao;

 db.usuario = require('../api/modelos/usuario')(conexao,Sequelize);
 db.cliente = require('../api/modelos/cliente')(conexao,Sequelize);
 db.entregador = require('../api/modelos/entregador')(conexao,Sequelize);
 db.produto = require('../api/modelos/produto')(conexao,Sequelize);
 db.listaDeCompra = require('../api/modelos/listaDeCompra')(conexao,Sequelize);
 db.endereco = require('../api/modelos/endereco')(conexao,Sequelize);
 db.supermercado = require('../api/modelos/supermercado')(conexao,Sequelize);
 db.preco = require('../api/modelos/preco')(conexao,Sequelize);
 db.produtos_lista = require('../api/modelos/produtos_lista')(conexao,Sequelize);
 db.pedido = require('../api/modelos/pedido')(conexao,Sequelize);
 db.cartao = require('../api/modelos/cartao')(conexao,Sequelize);
 db.distancia = require('../api/modelos/distancia')(conexao,Sequelize);
module.exports = db;

