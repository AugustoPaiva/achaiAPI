module.exports = (sequelize,Sequelize) => {
    let Supermercado = sequelize.define('supermercados',{
        nome: {
            type: Sequelize.STRING,
            allowNull: false
        },
        id_endereco:{
            type: Sequelize.INTEGER,
            references:{
                model:'enderecos',
                key: 'id'
            }
        },
    });
    return Supermercado;
}