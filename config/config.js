const env = require('./env.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database,env.username,env.password,{
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
db.sequelize = sequelize;

db.usuario = require('../api/modelos/usuario')(sequelize,Sequelize);
db.cliente = require('../api/modelos/cliente')(sequelize,Sequelize);
module.exports = db;