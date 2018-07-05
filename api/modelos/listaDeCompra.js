module.exports = (sequelize,Sequelize) => {
    let ListasDeCompra = sequelize.define('listasDeCompra',{
        nome:{
            type: Sequelize.STRING  
        },
        id_cliente: {
            type: Sequelize.INTEGER
        }
    },{
        tableName: 'listasDeCompra'
    });
    return ListasDeCompra;
}