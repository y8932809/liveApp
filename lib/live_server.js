//var io = require('socket.io')();
//var xssEscape = require('xss-escape');
//var nickname_list = {};
//var currentRoom = {};
//io.on('connection', function (_socket) {
//    //_socket.emit('user_list', nickname_list); //发送当前连接用户列表-不包括自己
//    loadData(_socket);
//    joinRoom(_socket);
//    disconnect(_socket);
//    setnickname(_socket);
//    say(_socket);
//    close(_socket);
//});
//function loadData(_socket) {
//    _socket.on('loaddata', function () {
//        _socket.emit('need_roomid'); //没有房间，需要回传房间id
//        _socket.emit('need_nickname');   //需要回传用户名 并添加到用户集合中
//        _socket.emit('server_message', '欢迎进入房间。');
//    });
//}
//function close(_socket) {
//    _socket.on('close', function () {
//        if (_socket.nickname != null && _socket.nickname != "") {
//            //_socket.broadcast.emit('user_quit', _socket.nickname);
//            _socket.broadcast.emit('user_leave',{nickName: _socket.nickname,socketId:_socket.id});
//            RemoveNickname(_socket);
//        }
//    })
//
//}
//function joinRoom(_socket) {
//    _socket.on('joinroom', function (room) {
//        _socket.leave(currentRoom[_socket.id]);
//        _socket.join(room); //创建房间
//        _socket.roomid = room;
//        currentRoom[_socket.id] = room;
//    })
//}
////退出 --自带的方法
//function disconnect(_socket) {
//    _socket.on('disconnect', function () {
//        if (_socket.nickname != null && _socket.nickname != "") {
//            _socket.broadcast.emit('user_leave',{nickName: _socket.nickname,socketId:_socket.id});
//            RemoveNickname(_socket);
//        }
//    });
//}
////获取用户名
//function setnickname(_socket) {
//    _socket.on('set_nickname', function (nickName) {
//        var nickname = xssEscape(nickName.trim());
//        var old_name = "";
//        if (_socket.nickname != "" && _socket.nickname != null) {
//            old_name = _socket.nickname;
//            RemoveNickname(old_name);
//        }
//
//        nickname_list[_socket.id] = nickname;
//        _socket.nickname = nickname;
//        _socket.broadcast.to(_socket.roomid).emit('user_join', {nickName:nickname,socketId:_socket.id});//除自己以为的所有人
//
//        var usersInRoom = io.sockets.adapter.rooms[_socket.roomid]; //socket 1.0以后使用这种方法获取当前房间的客户
//        var nameList=[];
//        for(var socket in usersInRoom.sockets){
//                var userSocketId=socket;
//                if(userSocketId!=_socket.id){
//                    nameList.push({nickName:nickname_list[userSocketId],socketId:userSocketId});
//            }
//        }
//         _socket.emit('user_list', nameList); //发送当前连接用户列表-只发自己
//    });
//}
////发消息
//function say(_socket) {
//    _socket.on('say', function (message) {
//        //if ("" == _socket.nickname || null == _socket.nickname) {
//        //    return _socket.emit('need_nickname');
//        //}
//        content = message.content.trim();
//        roomid = message.roomId;
//        _socket.broadcast.to(roomid).emit('user_say', _socket.nickname, xssEscape(content));
//    });
//}
//function RemoveNickname(_socket) {
//    delete nickname_list[_socket.id];
//}
//exports.listen = function (_server) {
//    return io.listen(_server);
//};

var io = require('socket.io')();
var xssEscape = require('xss-escape');
var userList = [];
//var currentRoom = []//用于存放当前连接用户在哪个房间的集合;
io.on('connection', function (socket) {
    joinRoom(socket);
    disconnect(socket);
    say(socket);
    close(socket);
});

function joinRoom(socket) {
    socket.on('joinRoom', function (userInfo) {
        socket.join(userInfo.roomId);
        socket.userInfo = userInfo;
        userList[socket.id] = userInfo;
        socket.emit('userList', getUserNameList(socket));//向自己传回当前房间的用户列表 to(socket.userInfo.roomId).
        socket.broadcast.to(socket.userInfo.roomId).emit('userJoin', {
            userId: userInfo.userId,
            nickName: userInfo.nickName,
            socketId: socket.id
        }); //通知其他用户有人进入房间
        socket.emit('serverMessage', '欢迎进入房间！');
        socket.emit("test","test");
    })
}
function getUserNameList(socket) {
    var nameList = [];
    var usersInRoom = io.sockets.adapter.rooms[socket.userInfo.roomId];
    for (var socketId in usersInRoom.sockets) {
        if(userList[socketId]!=null) {
            nameList.push({
                userId: userList[socketId].userId,
                nickName: userList[socketId].nickName,
                socketId: socketId
            }); //传递用户Id 昵称 sockedid
        }
    }
    return nameList;
}
//退出房间
function close(socket) {
    socket.on('close', function () {
        socket.leave(socket.id);
        socket.broadcast.to(socket.userInfo.roomId).emit('userLeave', {
            userId: socket.userInfo.userId,
            nickName: socket.userInfo.nickName,
            socketId: socket.id
        });
        RemoveNickname(socket.id);
    })
}

//关闭页面
function disconnect(socket) {
    socket.on('disconnect', function () {
        socket.leave(socket.id);
        if (socket.userInfo != null) {
            socket.broadcast.to(socket.userInfo.roomId).emit('userLeave', {
                userId: socket.userInfo.userId,
                nickName: socket.userInfo.nickName,
                socketId: socket.id
            });
            RemoveNickname(socket.id);
        }
    });
}
//发消息
function say(socket) {
    socket.on('say', function (message) {
        content = message.content.trim();
        roomid = message.roomId;
        socket.broadcast.to(roomid).emit('userSay',{title:socket.userInfo.nickName, msg:xssEscape(content)});
    });
}
function RemoveNickname(socketId) {
    delete userList[socketId];
}

//function loadData(_socket) {
//    _socket.on('loaddata', function () {
//        _socket.emit('need_roomid'); //没有房间，需要回传房间id
//        _socket.emit('need_nickname');   //需要回传用户名 并添加到用户集合中
//        _socket.emit('server_message', '欢迎进入房间。');
//    });
//}
//function close(_socket) {
//    _socket.on('close', function () {
//        if (_socket.nickname != null && _socket.nickname != "") {
//            //_socket.broadcast.emit('user_quit', _socket.nickname);
//            _socket.broadcast.emit('user_leave',{nickName: _socket.nickname,socketId:_socket.id});
//            RemoveNickname(_socket);
//        }
//    })
//
//}
//
////退出 --自带的方法
//function disconnect(_socket) {
//    _socket.on('disconnect', function () {
//        if (_socket.nickname != null && _socket.nickname != "") {
//            _socket.broadcast.emit('user_leave',{nickName: _socket.nickname,socketId:_socket.id});
//            RemoveNickname(_socket);
//        }
//    });
//}
////获取用户名
//function setnickname(_socket) {
//    _socket.on('set_nickname', function (nickName) {
//        var nickname = xssEscape(nickName.trim());
//        var old_name = "";
//        if (_socket.nickname != "" && _socket.nickname != null) {
//            old_name = _socket.nickname;
//            RemoveNickname(old_name);
//        }
//
//        nickname_list[_socket.id] = nickname;
//        _socket.nickname = nickname;
//        _socket.broadcast.to(_socket.roomid).emit('user_join', {nickName:nickname,socketId:_socket.id});//除自己以为的所有人
//
//        var usersInRoom = io.sockets.adapter.rooms[_socket.roomid]; //socket 1.0以后使用这种方法获取当前房间的客户
//        var nameList=[];
//        for(var socket in usersInRoom.sockets){
//            var userSocketId=socket;
//            if(userSocketId!=_socket.id){
//                nameList.push({nickName:nickname_list[userSocketId],socketId:userSocketId});
//            }
//        }
//        _socket.emit('user_list', nameList); //发送当前连接用户列表-只发自己
//    });
//}
////发消息
//function say(_socket) {
//    _socket.on('say', function (message) {
//        //if ("" == _socket.nickname || null == _socket.nickname) {
//        //    return _socket.emit('need_nickname');
//        //}
//        content = message.content.trim();
//        roomid = message.roomId;
//        _socket.broadcast.to(roomid).emit('user_say', _socket.nickname, xssEscape(content));
//    });
//}
//function RemoveNickname(_socket) {
//    delete nickname_list[_socket.id];
//}
exports.listen = function (_server) {
    return io.listen(_server);
};