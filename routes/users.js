var express = require('express');
var router = express.Router();
var Users = require('../models/Users');
var user = new Users();
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/adduser', function (req, res) {
  user.Name = req.body.Name;
  user.UserName = req.body.UserName;
  user.PhoneNumber = req.body.PhoneNumber;
  user.IdCard = req.body.IdCard;
  user.Identity = req.body.Identity;
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
