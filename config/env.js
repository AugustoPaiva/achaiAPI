// Conexão servidor de testes, bastante lento
// utilizar somente em ultimo caso

/*const env = {
    database: 'achaidb',
    username: 'achaidb',
    password: 'projetoachai',
    host:'db4free.net',
    dialect: 'mysql',
    pool:{
        max:5,
        min:0,
        acquire:30000,
        idle:10000
    }
}*/



//Conexão Hostinger, funciona até 12/07/2018

const env = {
    database: 'u103865086_a1',
    username: 'u103865086_a1',
    password: 'projetoachai',
    host:'sql154.main-hosting.eu',
    dialect: 'mysql',
    pool:{
        max:5,
        min:0,
        acquire:30000,
        idle:10000
    }
}
/*
//Outra conexão free, funciona porém ;
const env = {
    database: 'sql10245399',
    username: 'sql10245399',
    password: 'BYwiBJJAcY',
    host:'sql10.freesqldatabase.com',
    dialect: 'mysql',
    pool:{
        max:5,
        min:0,
        acquire:30000,
        idle:10000
    }
}
*/
module.exports = env;