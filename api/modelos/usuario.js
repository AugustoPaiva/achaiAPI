
module.exports = (sequelize,Sequelize) => {
    let Usuario = sequelize.define('usuarios',{
        nome:{
            type: Sequelize.STRING
        },
        cpf: {
            type: Sequelize.STRING,
            unique:true
        },
        email: {
            type: Sequelize.STRING,
            unique:true
        },
        senha: {
            type: Sequelize.STRING

        },
    });
    return Usuario;
}