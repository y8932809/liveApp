var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/liveroom_app');
var schema=new mongoose.Schema({
    Name:String,
    UserName:String,
    PhoneNumber:String,
    IdCard:String,
    Identity:String,
    CreateTime:Date,
    PassWord:String,
});
module.exports=mongoose.model('Users',schema);