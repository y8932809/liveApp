var mongoose=require('mongoose');
//mongoose.connect('mongodb://localhost/liveroom_app');
var schema=new mongoose.Schema({
    Name:String,
    BigCategory:String, //房间类别
    SmallCategory:String, //房间类别
    Img:String,
    CreateTime:Date,
    UserId:String
});
//mongoose.model('Photo',schema);
module.exports=mongoose.model('Rooms',schema);