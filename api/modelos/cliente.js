module.exports = (sequelize,Sequelize) => {
    const Clientes = sequelize.define('clientes',{
        id_usuario:{
            type: Sequelize.INTEGER,
            unique:true,
            references:{
                model:'usuarios',
                key: 'id'
            }

        }
    });
    return Clientes;
}