var mongoose=require('mongoose');
var schema=new mongoose.Schema({
    Name:String,
    BigCategory:String, //�������
    SmallCategory:String, //�������
    Img:String,
    CreateTime:Date,
    UserId:String
});
module.exports=mongoose.model('Rooms',schema);