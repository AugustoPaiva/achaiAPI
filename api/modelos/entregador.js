module.exports = (sequelize,Sequelize) => {
    let Entregador = sequelize.define('entregadores',{
        id_usuario:{
            type: Sequelize.STRING,
            references:{
                model:'usuario',
                key: 'id'
            }
        },
        cnh: {
            type: Sequelize.STRING,
            unique:true,
            allowNull: false
        },
        nota: {
            type: Sequelize.FLOAT,
            defaultValue: 0
        },
    });
    return Entregador;
}