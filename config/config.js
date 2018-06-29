const env = require('./env.js');
const Sequelize = require('sequelize');

const conexao = new Sequelize(env.database,env.username,env.password,{
    host: env.host,
    dialect: env.dialect,
    operatorsAliases: false,
    pool:{
        max: env.max,
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
module.exports = db;