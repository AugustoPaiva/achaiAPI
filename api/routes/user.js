const express = require('express');
const router = express.Router();



router.get('/', function(req, res, next) {
	res.locals.connection.query('SELECT * from users', function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
	});
});
/*
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "Handling GET request to /users"
    });
});

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