var mongoose=require('mongoose');
//mongoose.connect('mongodb://localhost/liveroom_app');
var schema=new mongoose.Schema({
    Name:String,
    BigCategory:String, //�������
    SmallCategory:String, //�������
    Img:String,
    CreateTime:Date,
    UserId:String
});
//mongoose.model('Photo',schema);
module.exports=mongoose.model('Rooms',schema);