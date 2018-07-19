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
        status:{
            type: Sequelize.STRING
        }
    });
    return Pedido;
}