var mongoose=require('mongoose');
var schema=new mongoose.Schema({
    Name:String,
    BigCategory:String, //房间类别
    SmallCategory:String, //房间类别
    Img:String,
    CreateTime:Date,
    UserId:String
});
module.exports=mongoose.model('Rooms',schema);