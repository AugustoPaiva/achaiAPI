module.exports = (sequelize,Sequelize) => {
    const Produtos = sequelize.define('produtos',{
        nome:{
            type: Sequelize.STRING
        },
        marca:{
            type: Sequelize.STRING
        },
        imagem:{
            type: Sequelize.BLOB
        },
        codBarras:{
            type: Sequelize.STRING
        }
    });
    return Produtos;
}