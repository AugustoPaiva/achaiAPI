module.exports = (sequelize,Sequelize) => {
    let Usuario = sequelize.define('usuarios',{
        nome:{
            type: Sequelize.STRING,
            allowNull: false
        },
        cpf: {
            type: Sequelize.STRING,
            unique:true,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            unique:true,
            allowNull: false
        },
        senha: {
            type: Sequelize.STRING,
            allowNull: false
        },
        foto:{
            type: Sequelize.BLOB
        },
        id_endereco:{
            type: Sequelize.INTEGER,
            references:{
                model:'enderecos',
                key: 'id'
            }
        }
    });
    return Usuario;
}