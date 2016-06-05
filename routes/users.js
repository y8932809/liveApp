var express = require('express');
var router = express.Router();
var Users = require('../models/Users');
var user = new Users();
/* GET users listing. */
router.post('/login', function(req, res, next) {
  var userName=req.body.UserName;
  var passWord=req.body.PassWord;
  Users.find({UserName:userName,PassWord:passWord}, function (err, user) {
      if(err){
       return err;
      }
    if(user&&user.length>0){
      res.send({state:'success',user:user});
    }
    else{
      res.send({state:'error'});
    }

  })
});
router.post('/adduser', function (req, res) {
  user.Name = req.body.Name;
  user.UserName = req.body.UserName;
  user.PhoneNumber = req.body.PhoneNumber;
  user.IdCard = req.body.IdCard;
  user.Identity = req.body.Identity;
  user.PassWord = req.body.PassWord;
  user.CreateTime = Date.now();

  //user.Name = '¹þ¹þ';
  //user.UserName = 'y8932809';
  //user.RealName = 'ÓÚ¿­·É';
  //user.PhoneNumber = '13552984926';
  //user.IdCard = '231004199004250016';
  //user.Identity = '1'; //Ö÷²¥
  //user.CreateTime = Date.now();
  //user.Sex = 'ÄÐ';
  //user.PassWord='8932809';
  user.save(function (err) {
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
