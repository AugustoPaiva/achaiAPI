module.exports = (sequelize,Sequelize) => {
    const Produtos_Listas = sequelize.define('produtos_listas',{
        id_produto:{
            type: Sequelize.INTEGER,
            references:{
                model:'produtos',
                key: 'id'
            }
        },
        id_lista:{
            type: Sequelize.INTEGER,
            references:{
                model:'listasDeCompra',
                key: 'id'
            }
        },
        id_pedido:{
            type: Sequelize.INTEGER,
            references:{
                model:'pedido',
                key: 'id'
            }

        },
        quantidade:{
            type: Sequelize.INTEGER
        }
    },{
        tableName: 'produtos_lista'
    });
    return Produtos_Listas;

}