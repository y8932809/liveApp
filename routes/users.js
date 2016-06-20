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
  user.save(function (err,result) {
    if (err) {
      console.log('save failed');
      res.send({state:'error',user:result});
    }
    res.send({state:'success',user:result});
  });
});
module.exports = router;
