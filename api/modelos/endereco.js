module.exports = (sequelize,Sequelize) => {
    const Endereco = sequelize.define('enderecos',{
        rua:{
            type: Sequelize.STRING
        },
        numero:{
            type: Sequelize.STRING
        },
        bairro:{
            type: Sequelize.STRING
        },
        complemento:{
            type: Sequelize.STRING
        },
        latitude:{
            type: Sequelize.STRING
        },
        longitude:{
            type: Sequelize.STRING
        }
    },{
        tableName: 'enderecos'
    });
    return Endereco;

}