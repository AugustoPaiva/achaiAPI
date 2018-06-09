const express = require('express');
const router = express.Router();


/*
Todas que não tão comentadas funcionam
a rota sempre é "localhost:porta"+primeiro argumento da função router.get
EXEMPLOS:
localhost:3000/users/allusers
localhost:3000/users/singleuser/4 (mostra o id 4)
*/

router.get('/users/allusers', function(req, res, next) {
    res.locals.connection.query('SELECT * from usuarios', 
    function (error, results, fields) {
        if (error) throw error;
        res.send(results);
	});
});

router.get('/users/singleuser/:id',function(req,res,next){
    const id = parseInt(req.params.id);
    res.locals.connection.query('SELECT * from usuarios WHERE id = ' + id,
    function(error,results,fields){
        if (error) throw error;
        res.send(results);
    });
});


/*
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "Handling GET request to /users"
    });
});
/*
router.post('/', (req, res, next) => {
    res.status(200).json({
        message: "Handling POST request to /users"
    });
});

router.get('/:userId', (req, res, next) => {
    const id = req.params.userId;
    if (id === 'special'){
        res.status(200).json({
            message: 'you discovered the ID',
            id: id
        });
    }else{
        res.status(200).json({
            message:'you passed an ID'
        })
    }
});

*/
module.exports = router;