var express = require('express');
var router = express.Router();
var Rooms = require('../models/Rooms');

var multiparty = require('multiparty');
var util = require('util');
var fs = require('fs');
/* GET rooms listing. */
router.get('/getallrooms', function(req, res, next) {
    var count= parseInt(req.query.count);
    Rooms.find({}, function (err,rooms) {
        if(err){
            return next(err);
        }
        //console.log(rooms);
        res.send({rooms:rooms});
    }).limit(count); //ֻ��ѯ4������
});
//��������ҷ����б�
router.get('/getcategoryrooms', function(req, res, next) {
   var bigCategory=  req.query.bigCategory;
    var smallCategory=  req.query.smallCategory;
    var count= parseInt(req.query.count);
    Rooms.find({BigCategory:bigCategory,SmallCategory:smallCategory}, function (err,rooms) {
        if(err){
            return next(err);
        }
        //console.log(rooms);
        res.send({rooms:rooms});
    }).limit(count);
});
//�����ҵķ����б�
router.get('/getmyrooms', function(req, res, next) {
   var userId=req.query.userId;
    var count= parseInt(req.query.count);
    Rooms.find({UserId:userId}, function (err,rooms) {
        if(err){
            return next(err);
        }
        //console.log(rooms);
        res.send({rooms:rooms});
    }).limit(count);
});

//��ӷ�����Ƭ
router.post('/addroomphoto/:id', function (req, res) {
    //����multiparty���󣬲������ϴ�Ŀ��·��
    var id=req.params.id;
    var form = new multiparty.Form({uploadDir: './App/resource/photos/'});
    //�ϴ���ɺ���
    form.parse(req, function (err, fields, files) {
        // console.log(fields.tname); //ǰ̨���ֶ���
        //����multiparty���󣬲������ϴ�Ŀ��·��
        var filesTmp = JSON.stringify(files, null, 2);
        //�ϴ���ɺ���
        if (err) {
            console.log('parse error: ' + err);
        } else {
            console.log('parse files: ' + filesTmp);
            var inputFile = files.file[0];
            var uploadedPath = inputFile.path;
            var dstPath = './App/resource/photos/' + inputFile.originalFilename;
            //������Ϊ��ʵ�ļ���
            fs.rename(uploadedPath, dstPath, function (err) {
                if (err) {
                    console.log('rename error: ' + err);
                } else {
                    console.log('rename ok');
                }
                Rooms.findById(id, function (err,room) {
                        if(err){
                            return err;
                        }
                    room.Img=inputFile.originalFilename;
                    room.save(function (err) {
                        if(err){
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

//��������
router.post('/addroom', function (req, res) {
    var room = new Rooms();
    room.Name = req.body.Name;
    room.BigCategory = req.body.BigCategory;
    room.SmallCategory = req.body.SmallCategory;
    room.Img = "base.jpg";
    room.CreateTime = Date.now();
    room.UserId=req.body.UserId;
    room.save(function (err,room) {
        if (err) {
            console.log('save failed');
        }
        console.log('save success');
        //res.writeHead(200, {'content-type': 'text/plain;charset=utf-8'});
        //res.write('success');
        //res.end();
        res.send({state:'success',room:room});
    });
});


module.exports = router;
