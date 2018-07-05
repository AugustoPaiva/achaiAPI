module.exports = (sequelize,Sequelize) => {
    let Preco = sequelize.define('precos',{
        id_supermercado:{
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            references:{
                model:'supermercados',
                key: 'id'
            }
        },
        id_produto: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            references:{
                model:'produtos',
                key: 'id'
            }
        },
        preco: {
            type: Sequelize.FLOAT,
            allowNull: false
        }
    },{
        tableName: 'precos'
    });
    return Preco;
}