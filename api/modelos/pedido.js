module.exports = (sequelize,Sequelize) => {
    let Pedido = sequelize.define('pedidos',{
        dataEntrega:{
            type: Sequelize.DATEONLY
        },
        id_usuario:{
            type: Sequelize.INTEGER,
            references:{
                model:'usuarios',
                key:'id'
            }
        },
        id_cartao:{
            type: Sequelize.INTEGER,
            references:{
                model:'cartoes',
                key:'id'
            }
        },
        status:{
            type: Sequelize.STRING
        }
    });
    return Pedido;
}