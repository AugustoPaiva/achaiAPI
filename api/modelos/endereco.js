module.exports = (sequelize,Sequelize) => {
    const Endereco = sequelize.define('endereco',{
        rua:{
            type: Sequelize.STRING
        },
        numero:{
            type: Sequelize.STRING
        },
        complemento:{
            type:Sequelize.STRING
        },
        latitude:{
            type: Sequelize.STRING
        },
        longitude:{
            type: Sequelize.STRING
        }
    });
    return Endereco;

}