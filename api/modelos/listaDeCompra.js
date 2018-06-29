module.exports = (sequelize,Sequelize) => {
    let ListaDeCompra = sequelize.define('listaDeCompra',{
        nome:{
            type: Sequelize.STRING
        },
        id_cliente: {
            type: Sequelize.STRING,
            
        }
    });
    return ListaDeCompra;
}