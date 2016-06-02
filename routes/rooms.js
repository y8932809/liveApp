var express = require('express');
var router = express.Router();
var Rooms = require('../models/Rooms');
var room = new Rooms();
/* GET rooms listing. */
router.get('/getroom', function(req, res, next) {
    Rooms.find({}, function (err,rooms) {
        if(err){
            return next(err);
        }
        console.log(rooms);
        res.send({rooms:rooms});
    });
});
router.post('/addroom', function (req, res) {
    room.Name = req.body.Name;
    room.Category = req.body.Category;
    room.Img = req.body.Img;
    room.CreateTime = Date.now();

    room.save(function (err) {
        if (err) {
            console.log('save failed');
        }
        console.log('save success');
        res.writeHead(200, {'content-type': 'text/plain;charset=utf-8'});
        res.write('success');
        res.end();
    });
});
module.exports = router;
