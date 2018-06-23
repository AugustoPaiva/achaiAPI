module.exports = (sequelize,Sequelize) => {
    const Clientes = sequelize.define('clientes',{
        id_usuario:{
            type: Sequelize.STRING
        }
    });
    return Clientes;
}