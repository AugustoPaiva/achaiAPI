module.exports = (sequelize,Sequelize) => {
    let Entregador = sequelize.define('entregadores',{
        id_usuario:{
            type: Sequelize.INTEGER,
            allowNull: false,
            references:{
                model:'usuarios',
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
    },{
        tableName: 'entregadores'
    });
    return Entregador;
}