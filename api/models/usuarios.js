module.exports = (sequelize,Sequelize) => {
    const Usuario = sequelize.define('usuarios',{
        nome:{
            type: Sequelize.STRING
        },
        cpf: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        senha: {
            type: Sequelize.INTEGER
        }
    });
    return Usuario;
}