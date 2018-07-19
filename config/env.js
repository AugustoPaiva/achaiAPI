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
}


*/
//Conexão Hostinger, funciona até 23/07/2018

const env = {
    database: 'u375227992_a1',
    username: 'u375227992_a1',
    password: 'projetoachai',
    host:'sql157.main-hosting.eu',
    dialect: 'mysql',
    pool:{
        max:5,
        min:0,
        acquire:30000,
        idle:10000
    }
}

/*
Outra conexão free, expirada ;

const env = {
    database: 'sql10246793',
    username: 'sql10246793',
    password: 'swuXDdRwgS',
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