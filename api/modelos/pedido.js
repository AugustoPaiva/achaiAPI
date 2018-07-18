module.exports = (sequelize,Sequelize) => {4
    let Pedido = sequelize.define('pedidos',{
        dataEntrega:{
            type: Sequelize.DATE
        },
        id_usuario:{
            type: Sequelize.INTEGER,
            references:{
                model:'usuarios',
                key:'id'
            }
        },
        status:{
            type: Sequelize.STRING
        }
    });
}