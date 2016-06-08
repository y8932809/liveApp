
function chatBodyToBottom() {
    var chat_body = $('.chat-body');
    var height = chat_body.prop("scrollHeight");
    chat_body.prop('scrollTop', height);
}

function addMessage(_name, _time, _content) {
    var msg_list = $(".msg-list-body");
	//_content = QxEmotion.Parse(_content);
    msg_list.append(
            '<div class="clearfix msg-wrap"><div class="msg-head">' +
            '<span class="msg-name label label-primary pull-left">' +
            '<span class="glyphicon glyphicon-user"></span>&nbsp;&nbsp;' + _name + '</span>' +
            '<span class="msg-time label label-default pull-left">' +
            '<span class="glyphicon glyphicon-time"></span>&nbsp;&nbsp;' + _time + '</span>' +
            '</div><div class="msg-content">' + _content + '</div></div>'
    );
    chatBodyToBottom();
}

function addServerMessage(_time, _content) {
    var msg_list = $(".msg-list-body");
	//_content = QxEmotion.Parse(_content);
    msg_list.append(
            '<div class="clearfix msg-wrap"><div class="msg-head">' +
            '<span class="msg-name label label-danger pull-left">' +
            '<span class="glyphicon glyphicon-info-sign"></span>&nbsp;&nbsp;系统消息</span>' +
            '<span class="msg-time label label-default pull-left">' +
            '<span class="glyphicon glyphicon-time"></span>&nbsp;&nbsp;' + _time + '</span>' +
            '</div><div class="msg-content">' + _content + '</div></div>'
    );
    chatBodyToBottom();
}

function removeListUser(_user) {
    $(".list-table tr").each(function () {
        if (_user == $(this).find('td').text()) {
            $(this).remove();
        }
    });
}

function addUserToList(_user) {
    $(".list-table").append('<tr><td>' + _user + '</td></tr>');
}

function useUserList(_user_list) {
    $(".list-table").html("");
    addUserToList(userid); // 暂时添加自己列表
    for (var i = 0; i < _user_list.length; i++) {
        addUserToList(_user_list[i]);
    }
    updateListCount();
}

function updateListCount() {
    //var list_count = $('.list-table').find('tr').length + 1;  // 暂时添加自己列表
    var list_count = $('.list-table').find('tr').length ;
    $('#list-count').text("当前在线：" + list_count + "人");
}

//各种元素响应---------------------------------------------------------
function onClickSendMessage() {

    var edit = $("#input-edit");
    var content = edit.val();
    if ("" == content) {
        return;
    }
    say(content);
    edit.val("");
}
