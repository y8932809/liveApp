var mongoose=require('mongoose');
//mongoose.connect('mongodb://localhost/liveroom_app');
var schema=new mongoose.Schema({
    Name:String,
    Category:String, //�������
    Img:String,
    CreateTime:Date,

});
//mongoose.model('Photo',schema);
module.exports=mongoose.model('Rooms',schema);