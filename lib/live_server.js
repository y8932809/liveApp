var io = require('socket.io')();
var xssEscape = require('xss-escape');
var nickname_list = {};
var currentRoom={};
io.on('connection', function (_socket) {
    //_socket.emit('user_list', nickname_list); //发送当前连接用户列表-不包括自己

    loadData(_socket);
    joinRoom(_socket);
    disconnect(_socket);
    setnickname(_socket);
    say(_socket);
    close(_socket);
});
function loadData(_socket){
    _socket.on('loaddata', function () {
        _socket.emit('need_roomid'); //没有房间，需要回传房间id
        _socket.emit('need_nickname');   //需要回传用户名 并添加到用户集合中
        _socket.emit('server_message', '欢迎进入房间。');
    });
}
function close(_socket){
    _socket.on('close', function () {
        if (_socket.nickname != null && _socket.nickname != "") {
            _socket.broadcast.emit('user_quit', _socket.nickname);
            RemoveNickname(_socket);
        }
    })

}
function joinRoom(_socket){
   _socket.on('joinroom', function (room) {
       _socket.leave(currentRoom[_socket.id]);
       _socket.join(room); //创建房间
       _socket.roomid=room;
       currentRoom[_socket.id]=room;

       //var usersInRoom=io.sockets.clients(room);
       //var usersInRoom = io.sockets.adapter.rooms[room]; //socket 1.0以后使用这种方法获取当前房间的客户
       //var nameList=[];
       //for(var socket in usersInRoom.sockets){
       //        var userSocketId=socket;
       //        if(userSocketId!=_socket.id){
       //            nameList.push(nickname_list[userSocketId]);
       //    }
       //
       //}

     //  _socket.emit('user_list', nameList); //发送当前连接用户列表-不包括自己
   })
}
//退出 --自带的方法
function disconnect(_socket){
    _socket.on('disconnect', function () {
        if (_socket.nickname != null && _socket.nickname != "") {
            _socket.broadcast.emit('user_quit', _socket.nickname);
            RemoveNickname(_socket);
        }
    });
}
 //获取用户名
function setnickname(_socket) {
    _socket.on('set_nickname', function (nickName) {

        var nickname = xssEscape(nickName.trim());
       // var roomId=userinfo.roomId;
        var old_name = "";
        if (_socket.nickname != "" && _socket.nickname != null) {
            old_name = _socket.nickname;
            RemoveNickname(old_name);
        }
        //nickname_list.push(nickname);
        nickname_list[_socket.id]=nickname;
        _socket.nickname = nickname;
        //_socket.emit('set_nickname_done', old_name, nickname); //广播自己
         _socket.broadcast.to(_socket.roomid).emit('user_join', nickname);//除自己以为的所有人

    });
}
//发消息
function say(_socket) {
    _socket.on('say', function (message) {
        if ("" == _socket.nickname || null == _socket.nickname) {
            return _socket.emit('need_nickname');
        }

        content = message.content.trim();
        roomid=message.roomId;
        _socket.broadcast.to(roomid).emit('user_say', _socket.nickname, xssEscape(content));
        //return _socket.emit('say_done', _socket.nickname, xssEscape(content));
    });
}
function RemoveNickname(_socket) {
    delete nickname_list[_socket.id];
}
exports.listen = function (_server) {
    return io.listen(_server);
};