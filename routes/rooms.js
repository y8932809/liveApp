var express = require('express');
var router = express.Router();
var Rooms = require('../models/Rooms');
var multiparty = require('multiparty');
var util = require('util');
var fs = require('fs');
router.get('/getallrooms', function (req, res, next) {
    var count = parseInt(req.query.count);
    Rooms.find({}, function (err, rooms) {
        if (err) {
            return next(err);
        }
        //console.log(rooms);
        res.send({rooms: rooms});
    }).limit(count); //只查询4条数据
});
//按分类查找房间列表
router.get('/getcategoryrooms', function (req, res, next) {
    var bigCategory = req.query.bigCategory;
    var smallCategory = req.query.smallCategory;
    var count = parseInt(req.query.count);
    Rooms.find({BigCategory: bigCategory, SmallCategory: smallCategory}, function (err, rooms) {
        if (err) {
            return next(err);
        }
        res.send({rooms: rooms});
    }).limit(count);
});
//查找我的房间列表
router.get('/getmyrooms', function (req, res, next) {
    var userId = req.query.userId;
    var count = parseInt(req.query.count);
    Rooms.find({UserId: userId}, function (err, rooms) {
        if (err) {
            return next(err);
        }
        res.send({rooms: rooms});
    }).limit(count);
});
//添加房间照片
router.post('/addroomphoto/:id', function (req, res) {
    //生成multiparty对象，并配置上传目标路径
    var id = req.params.id;
    var form = new multiparty.Form({uploadDir: './App/resource/photos/'});
    //上传完成后处理
    form.parse(req, function (err, fields, files) {
        // console.log(fields.tname); //前台的字段名
        //生成multiparty对象，并配置上传目标路径
        var filesTmp = JSON.stringify(files, null, 2);
        //上传完成后处理
        if (err) {
            console.log('parse error: ' + err);
        } else {
            console.log('parse files: ' + filesTmp);
            var inputFile = files.file[0];
            var uploadedPath = inputFile.path;
            var dstPath = './App/resource/photos/' + inputFile.originalFilename;
            //重命名为真实文件名
            fs.rename(uploadedPath, dstPath, function (err) {
                if (err) {
                    console.log('rename error: ' + err);
                } else {
                    console.log('rename ok');
                }
                Rooms.findById(id, function (err, room) {
                    if (err) {
                        return err;
                    }
                    room.Img = inputFile.originalFilename;
                    room.save(function (err) {
                        if (err) {
                            return err;
                        }
                        res.writeHead(200, {'content-type': 'text/plain;charset=utf-8'});
                        res.write('success');
                        res.end();
                    });
                })
                //var room = new Rooms();
                //room.Name = fields.Name;
                //room.BigCategory = fields.BigCategory;
                //room.SmallCategory = fields.SmallCategory;
                //room.Img = inputFile.originalFilename;
                //room.CreateTime = Date.now();
                //
                //room.save(function (err) {
                //    if (err) {
                //        console.log('save failed');
                //    }
                //    console.log('save success');
                //    res.writeHead(200, {'content-type': 'text/plain;charset=utf-8'});
                //    res.write('success');
                //    res.end();
                //});
            });
        }
    });


});
//创建房间
router.post('/addroom', function (req, res) {
    var room = new Rooms();
    room.Name = req.body.Name;
    room.BigCategory = req.body.BigCategory;
    room.SmallCategory = req.body.SmallCategory;
    room.Img = "base.jpg";
    room.CreateTime = Date.now();
    room.UserId = req.body.UserId;
    room.save(function (err, room) {
        if (err) {
            console.log('save failed');
        }
        console.log('save success');
        res.send({state: 'success', room: room});
    });
});
//检查房间所有者
router.post('/checkRoomByUserId', function (req, res) {

    var roomId = req.body.RoomId;
    var userId = req.body.UserId;

    Rooms.find({_id: roomId, UserId: userId}, function (err, room) {
        if (err) {
            console.log('find failed');
        }
        if (room && room.length > 0) {
            res.send({state: 'success'});
        }
        else {
            res.send({state: 'error'});
        }
    });
});
module.exports = router;
