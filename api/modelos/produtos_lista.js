module.exports = (sequelize,Sequelize) => {
    const Produtos_Listas = sequelize.define('produtos_lista',{//troquei o nome produtos_listas para produtos_lista pq em todo outro canto o lista ta no singular
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
        quantidade:{
            type: Sequelize.INTEGER
        }
    },{
        tableName: 'produtos_lista'
    });
    return Produtos_Listas;

}