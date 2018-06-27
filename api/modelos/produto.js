module.exports = (sequelize,Sequelize) => {
    const Produtos = sequelize.define('produtos',{
        nome:{
            type: Sequelize.STRING
        },
        marca:{
            type: Sequelize.STRING
        },
        imagem:{
            type: sequelize.BLOP
        },
        codBarras:{
            type: Sequelize.STRING
        }
    });
    return Produtos;
}