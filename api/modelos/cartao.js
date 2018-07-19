module.exports = (sequelize,Sequelize) => {
    const Cartao = sequelize.define('cartoes',{
        numero:{
            type: Sequelize.STRING
        },
        validade:{
            type: Sequelize.STRING
        },
        cvc:{
            type: Sequelize.STRING
        },
        titular:{
            type: Sequelize.STRING
        },
        cpftitular:{
            type: Sequelize.STRING
        }
    },{
        tableName: 'cartoes'
    });
    return Cartao;
    
}