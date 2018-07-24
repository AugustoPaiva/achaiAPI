module.exports = (sequelize,Sequelize) => {
    let Distancias = sequelize.define('distancias',{
        supermercado1:{
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            references:{
                model:'supermercados',
                key: 'id'
            }
        },
        supermercado2: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            references:{
                model:'supermercados',
                key: 'id'
            }
        },
        distancia: {
            type: Sequelize.FLOAT,
            allowNull: false
        }
    },{
        tableName: 'distancias'
    });
    return Distancias;
}