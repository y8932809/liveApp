/**
 * Created by user on 2016-06-15.
 */

angular.module('liveApp.directives')
    .directive('liveRoomByHost', function ($stateParams,$location,$anchorScroll, socket, userService) {
        return {
            restrict: 'EA',
            //link: function (scope, element, attrs) {
            //    var roomid = $stateParams.roomid;
            //    var userid = Date.now().toString();
            //    scope.sayMessage = {msg:''};
            //
            //    if (userService.getUserInfo() != null) {
            //        userid = userService.getUserInfo().Name;
            //    }
            //    scope.userList=[
            //        {
            //            nickName: userid,
            //            socketId:socket.id
            //        }
            //    ];
            //    scope.message = [];
            //    socket.on('need_nickname', function () {
            //        var userInfo = {
            //            roomId: roomid,
            //            nickName: userid
            //        }
            //        socket.emit('set_nickname', userid);
            //    });
            //    socket.on('need_roomid', function () {
            //        joinroom(roomid)
            //    });
            //    //socket.on('user_join', function (_nick_name) {
            //    //    var msg={type:"系统消息",msg:'[' + _nick_name + '] 进入了聊天室。',time:getLocalHMS()};
            //    //    $scope.message.push(msg);
            //    //    chatBodyToBottom();
            //    //});
            //    socket.on('server_message', function (_message) {
            //        var msg = {type: "系统消息", msg: _message, time: getLocalHMS()};
            //        scope.message.push(msg);
            //        chatBodyToBottom();
            //    });
            //    //socket.on('user_quit', function (_nick_name) {
            //    //    var msg={type:"系统消息",msg:'[' + _nick_name + '] 离开了聊天室。',time:getLocalHMS()};
            //    //    $scope.message.push(msg);
            //    //    chatBodyToBottom();
            //    //});
            //
            //    socket.on('user_list', function (userlist) {
            //        scope.userList=scope.userList.concat(userlist);
            //    });
            //    socket.on('user_join', function (userinfo) {
            //        scope.userList.push(userinfo);
            //    });
            //    socket.on('user_leave', function (userinfo) {
            //        var index =  scope.userList.indexOf(userinfo);
            //        scope.userList.splice(index,1);
            //    });
            //
            //    socket.on('user_say', function (nick_name, _content) {
            //        var msg = {type: nick_name, msg: _content, time: getLocalHMS()};
            //        if (scope.message.count > 500) { //超过500条记录情况数组
            //            scope.message = [];
            //        }
            //        scope.message.push(msg);
            //    });
            //    scope.say = function (content) {
            //        if (content == "" || content == undefined) {
            //            return;
            //        }
            //        var message = {
            //            roomId: roomid,
            //            content: content
            //        }
            //        var msg = {type: userid, msg: content, time: getLocalHMS()};
            //        scope.message.push(msg);
            //        socket.emit('say', message);
            //        scope.sayMessage.msg='';
            //    }
            //
            //    function joinroom(roomid) {
            //        socket.emit('joinroom', roomid);
            //    }
            //
            //    function getLocalHMS() {
            //        var time = (new Date()).getTime();
            //        var d = new Date();
            //        return appendZero(d.getHours()) + ":" + appendZero(d.getMinutes()) + ":" + appendZero(d.getSeconds());
            //    }
            //
            //    function appendZero(obj) {
            //        if (obj < 10) return "0" + "" + obj;
            //        else return obj;
            //    }
            //
            //    function chatBodyToBottom() {
            //        //var chat_body = $('.chat-body');
            //        //var height = chat_body.prop("scrollHeight");
            //        //chat_body.prop('scrollTop', height);
            //    }
            //},
            link: function (scope, element, attrs) {
                scope.sayMessage = []; //为什么必须是对象才能访问到？嵌套指令的作用域
                scope.userInfo = {
                    roomId: $stateParams.roomid
                };
                scope.messages = [];
                var logUser = userService.getUserInfo();
                if (logUser == null) {
                    scope.userInfo.userId = Date.now().toString();
                    scope.userInfo.nickName = '游客_' + Date.now().toString();
                } else {
                    scope.userInfo.userId = logUser._id;
                    scope.userInfo.nickName = logUser.Name;
                }
                //进入房间
                socket.emit('joinRoom', scope.userInfo);

                //获取房间用户列表
                socket.on('userList', function (userList) {
                    scope.userList = userList;
                });

                //获取进入成功的欢迎信息
                socket.on('serverMessage', function (msg) {
                    var msg = {title: '系统消息', msg: msg, time: getLocalHMS()}
                    scope.messages.push(msg);
                });
                //获取其他用户进入房间显示在用户列表中
                socket.on('userJoin', function (userInfo) {
                    scope.userList.push(userInfo);
                });
                //获取用户离开房间
                socket.on('userLeave', function (userInfo) {
                    var index = 0;
                    for (var i = 0; i < scope.userList.length; i++) {
                        if (scope.userList[i].socketId == userInfo.socketId) {
                            index = i;
                            break;
                        }
                    }
                    scope.userList.splice(index, 1);
                });
                //获取消息
                socket.on('userSay', function (message) {
                    var msg = {title: message.title, msg: message.msg, time: getLocalHMS()};
                    if (scope.messages.count > 500) { //超过500条清空
                        scope.messages = [];
                    }
                    scope.messages.push(msg);
                });

                //发送消息
                scope.say = function (content) {
                    if (content == "" || content == undefined) {
                        return;
                    }
                    var message = {
                        roomId: scope.userInfo.roomId,
                        content: content
                    }
                    var msg = {title: scope.userInfo.nickName, msg: content, time: getLocalHMS()};
                    scope.messages.push(msg);
                    socket.emit('say', message);
                    scope.sayMessage.msg="";

                    $location.hash('bottom');
                    $anchorScroll();
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
            },
            templateUrl: '../components/liveRoomByHost.html'
        }
    })
