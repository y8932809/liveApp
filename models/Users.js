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
//mongoose.model('Photo',schema);
module.exports=mongoose.model('Users',schema);