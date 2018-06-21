const db = require('../../config/config.js');
const usuarios = db.usuarios;

module.exports.getAll = (req,res) => {
    usuarios.findAll().then(usuarios =>{
        res.send(usuarios);
        return;
    });
}