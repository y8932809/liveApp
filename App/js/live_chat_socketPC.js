var roomid='r2'
var userid=Date.now().toString();
var chat_server = 'http://' + location.hostname + ':3000';
console.log('server: ' + chat_server);
var socket = io.connect(chat_server);
//首次需要一个用户名
socket.on('need_nickname', function () {
     changeNickname(userid);
});
//首次进入需要一个房间号
socket.on('need_roomid',function(){
    joinroom(roomid)
});

socket.on('server_message', function (_message) {
    addServerMessage(getLocalHMS(), _message);
});

socket.on('set_nickname_done', function (_old_name, _new_nickname) {
    $('#my-nickname').html('昵称：' + _new_nickname);
    updateListCount();
});

socket.on('say_done', function (_nick_name, _content) {
    console.log('user_say(' + _nick_name + ', ' + _content + ')');
    addMessage(_nick_name, getLocalHMS(), _content);
});

socket.on('user_list', function (_list) {
    useUserList(_list);
});


socket.on('user_join', function (_nick_name) {
    addUserToList(_nick_name);
    updateListCount();
    addServerMessage(getLocalHMS(), '[' + _nick_name + '] 进入了聊天室。');
});

socket.on('user_quit', function (_nick_name) {
    console.log('user_quit(' + _nick_name + ')');
    removeListUser(_nick_name);
    updateListCount();
    addServerMessage(getLocalHMS(), '[' + _nick_name + '] 离开了聊天室。');
});

socket.on('user_say', function (_nick_name, _content) {
    console.log('user_say(' + _nick_name + ', ' + _content + ')');
    addMessage(_nick_name, getLocalHMS(), _content);
});

function changeNickname(_nickname) {
    var userInfo={
        roomId:roomid,
        nickName:_nickname
    }
    socket.emit('set_nickname', userInfo);
}

function joinroom(roomid){
    socket.emit('joinroom', roomid);
}
function say(_content) {
    var message={
        roomId:roomid,
        content:_content
    }
    socket.emit('say', message);
}


function getLocalHMS() {
    var time = (new Date()).getTime();
    var d = new Date();
    return appendZero(d.getHours()) + ":" + appendZero(d.getMinutes()) + ":" + appendZero(d.getSeconds());
}

function appendZero(obj) {
    if (obj < 10) return "0" + "" + obj;
    else return obj;
}