angular.module('liveApp.controllers', ['liveApp.services',
    'liveApp.constants',
    'angularFileUpload'
])

    .controller('mainCtrl', function ($scope, $rootScope, liveRoomList, navigationBarService) {
        $scope.$on('refreshScroll', function (event, ags) {
            setTimeout(function () {
                $scope.$parent.myScroll['wrapper'].refresh();

            }, 500);
        });
    })
    .controller('mainIndex1Ctrl', function ($scope, $rootScope, liveRoomList, navigationBarService) {
        liveRoomList.getAllList(4).then(function (result) {  //在route中使用resolve时，controller中注入数据，仍然是异步为空，采用这种方式可以避免
            $scope.allroomlist = result;
        });
        liveRoomList.getCategoryList('game', 'LOL', 4).then(function (result) {
            $scope.lolroomlist = result;
        });
        liveRoomList.getCategoryList('diverting', 'GoodVoice', 4).then(function (result) {
            $scope.divertingroomlist = result;
        });
        $scope.images = navigationBarService.getNavBar('main');
    })
    .controller('mainIndex2Ctrl', function ($scope, $rootScope, liveRoomList, navigationBarService) {
        liveRoomList.getCategoryList('game', 'LOL', 20).then(function (result) {
            $scope.roomlist = result;
        });
        $scope.images = navigationBarService.getNavBar('main');
        //$scope.$emit('refreshScroll', '');
    })
    .controller('mainIndex3Ctrl', function ($scope, $rootScope, liveRoomList, navigationBarService) {
        liveRoomList.getCategoryList('game', 'StandAlone', 20).then(function (result) {
            $scope.roomlist = result;
        });
        $scope.images = navigationBarService.getNavBar('main');
    })
    .controller('mainIndex4Ctrl', function ($scope, $rootScope, liveRoomList, navigationBarService) {
        liveRoomList.getCategoryList('game', 'CS', 20).then(function (result) {
            $scope.roomlist = result;
        });
        $scope.images = navigationBarService.getNavBar('main');
    })
    .controller('bodyCtrl', function ($scope) {
        //$scope.refreshiScroll = function () {
        //    $scope.$parent.myScroll['wrapper'].refresh();
        //};
        //$scope.$on('refreshScroll', function (event, ags) {
        //    setTimeout(function () {
        //        $scope.$parent.myScroll['wrapper'].refresh();
        //
        //    }, 500);
        //});
        $scope.currentUser = null;
        $scope.setCurrentUser = function (user) {
            $scope.currentUser = user;

        }
    })
    .controller('liveRoomCtrl', function ($scope, $stateParams, socket, userService) {
        //var roomid = $stateParams.roomid;
        //var userid = Date.now().toString();
        //if (userService.getUserInfo() != null) {
        //    userid = userService.getUserInfo().Name;
        //}
        //$scope.message = [];
        //socket.on('need_nickname', function () {
        //    var userInfo = {
        //        roomId: roomid,
        //        nickName: userid
        //    }
        //    socket.emit('set_nickname', userid);
        //});
        //socket.on('need_roomid', function () {
        //    joinroom(roomid)
        //});
        //socket.on('server_message', function (_message) {
        //    var msg = {type: "系统消息", msg: _message, time: getLocalHMS()};
        //    $scope.message.push(msg);
        //    chatBodyToBottom();
        //});
        //socket.on('user_say', function (_nick_name, _content) {
        //    var msg = {type: _nick_name, msg: _content, time: getLocalHMS()};
        //    if ($scope.message.count > 500) { //超过500条记录情况数组
        //        $scope.message = [];
        //    }
        //    $scope.message.push(msg);
        //});
        //function joinroom(roomid) {
        //    socket.emit('joinroom', roomid);
        //}
        //
        //function getLocalHMS() {
        //    var time = (new Date()).getTime();
        //    var d = new Date();
        //    return appendZero(d.getHours()) + ":" + appendZero(d.getMinutes()) + ":" + appendZero(d.getSeconds());
        //}
        //
        //function appendZero(obj) {
        //    if (obj < 10) return "0" + "" + obj;
        //    else return obj;
        //}
        //
        //function chatBodyToBottom() {
        //    //var chat_body = $('.chat-body');
        //    //var height = chat_body.prop("scrollHeight");
        //    //chat_body.prop('scrollTop', height);
        //}
    })
    .controller('myLiveRoomCtrl', function ($scope, $stateParams, socket, userService) {
        //var roomid = $stateParams.roomid;
        //var userid = Date.now().toString();
        //
        ////过滤判断非法请求  调试方便，暂时注释，直接跳转
        ////liveRoomService.checkRoomByUserId(roomid,userid).then(
        ////    function (result) {
        ////        if(result.state=='success'){
        ////            $location.path('/myliveroom/'+roomid);
        ////        }
        ////        else{
        ////            $location.path('/liveroom/'+roomid);
        ////        }
        ////    },
        ////    function () {
        ////        alert('错误');
        ////    }
        ////)
        //
        //if (userService.getUserInfo() != null) {
        //    userid = userService.getUserInfo().Name;
        //}
        //$scope.message = [];
        //socket.on('need_nickname', function () {
        //    var userInfo = {
        //        roomId: roomid,
        //        nickName: userid
        //    }
        //    socket.emit('set_nickname', userid);
        //});
        //socket.on('need_roomid', function () {
        //    joinroom(roomid)
        //});
        ////socket.on('user_join', function (_nick_name) {
        ////    var msg={type:"系统消息",msg:'[' + _nick_name + '] 进入了聊天室。',time:getLocalHMS()};
        ////    $scope.message.push(msg);
        ////    chatBodyToBottom();
        ////});
        //socket.on('server_message', function (_message) {
        //    var msg = {type: "系统消息", msg: _message, time: getLocalHMS()};
        //    $scope.message.push(msg);
        //    chatBodyToBottom();
        //});
        ////socket.on('user_quit', function (_nick_name) {
        ////    var msg={type:"系统消息",msg:'[' + _nick_name + '] 离开了聊天室。',time:getLocalHMS()};
        ////    $scope.message.push(msg);
        ////    chatBodyToBottom();
        ////});
        //socket.on('user_say', function (_nick_name, _content) {
        //    var msg = {type: _nick_name, msg: _content, time: getLocalHMS()};
        //    if ($scope.message.count > 500) { //超过500条记录情况数组
        //        $scope.message = [];
        //    }
        //    $scope.message.push(msg);
        //});
        //$scope.say = function (content) {
        //    if(content==""||content==undefined){
        //        return;
        //    }
        //    var message = {
        //        roomId: roomid,
        //        content: content
        //    }
        //    var msg = {type: userid, msg: content, time: getLocalHMS()};
        //    $scope.message.push(msg);
        //    socket.emit('say', message);
        //    $scope.sayMessage = '';
        //}
        //
        //function joinroom(roomid) {
        //    socket.emit('joinroom', roomid);
        //}
        //
        //function getLocalHMS() {
        //    var time = (new Date()).getTime();
        //    var d = new Date();
        //    return appendZero(d.getHours()) + ":" + appendZero(d.getMinutes()) + ":" + appendZero(d.getSeconds());
        //}
        //
        //function appendZero(obj) {
        //    if (obj < 10) return "0" + "" + obj;
        //    else return obj;
        //}
        //
        //function chatBodyToBottom() {
        //    var chat_body = $('.chat-body');
        //    var height = chat_body.prop("scrollHeight");
        //    chat_body.prop('scrollTop', height);
        //}
    })
    .controller('registerCtrl', function ($scope, $location, userService) {
        $scope.submit = function (userDetails) {
            var user = angular.copy(userDetails);
            user.Identity = 1;
            userService.register(user).then(function (result) {
                if (result.state == 'success') {
                    alert("注册成功！");//   需要修改自带alert样式。
                    userService.setUserInfo(result.user);
                    $location.path('/main/index_1'); //暂时跳转至主目录
                }
            }, function (err) {
                alert('操作错误！')
            });
        }
    })
    .controller('addliveroomCtrl', function ($scope, $location, userService, apiurl, liveRoomService) {
        $scope.categoryData = [
            {
                label: '游戏',
                value: 'game',
                provinces: [
                    {
                        label: '英雄联盟',
                        value: 'LOL'
                    },
                    {
                        label: '反恐精英',
                        value: 'CS'
                    },
                    {
                        label: '主机游戏',
                        value: 'StandAlone'
                    }]
            },
            {
                label: '娱乐',
                value: 'diverting',
                provinces: [
                    {
                        label: '好声音',
                        value: 'GoodVoice'

                    },
                    {
                        label: '颜值',
                        value: 'GoodLook'

                    },
                    {
                        label: '舞蹈',
                        value: 'Dance'

                    },
                    {
                        label: '脱口秀',
                        value: 'TalkShow'

                    },

                ]
            }
        ]
        $scope.submit = function (roomDetails) {
            var room = angular.copy(roomDetails);
            room.BigCategory = room.category.value;
            room.SmallCategory = room.category.province.value;
            room.UserId = userService.getUserInfo()._id;

            liveRoomService.addRoom(room).then(function (data) {
                if (data.state == 'success') {
                    alert("创建成功！");//   需要修改自带alert样式。
                    $location.path('/addliveroomphoto/' + data.room._id); //直接上传图片
                }
            }, function () {
                alert('操作错误！')
            })
        }

    })
    .controller('addliveroomphotoCtrl', function ($scope, $stateParams, $location, FileUploader, apiurl) {

        var uploader = $scope.uploader = new FileUploader({
            url: apiurl + 'rooms/addroomphoto/' + $stateParams.roomid,
        });

        $scope.UploadFile = function () {
            uploader.uploadAll();
        }


        $scope.clearItems = function () {    //重新选择文件时，清空队列，达到覆盖文件的效果
            uploader.clearQueue();
        }

        uploader.onAfterAddingFile = function (fileItem) {
            $scope.fileItem = fileItem._file;    //添加文件之后，把文件信息赋给scope
        };

        uploader.onSuccessItem = function (fileItem, response, status, headers) {
            $scope.uploadStatus = true;   //上传成功则把状态改为true
            alert("上传成功！")
            $location.path('/main/index_1'); //暂时跳转至主目录
        };

        uploader.filters.push({
            name: 'imageFilter',
            fn: function (item /*{File|FileLikeObject}*/, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });
    })
    .controller('loginCtrl', function ($scope, $http, $location, userService) {
        $scope.login = function (user) {
            userService.login(user).then(function (result) {
                if (result.state == 'success') {
                    userService.setUserInfo(result.user)
                    $location.path('/main/index_1'); //暂时跳转至主目录
                }
                else {
                    alert('用户名或密码错误！')
                }

            }, function () {
                alert('访问失败。')
            })
        }

    })
    .controller('myCtrl', function ($scope, $location, userService) {
        if (userService.getUserInfo() != null) {
            $scope.user = userService.getUserInfo();
        }
        $scope.login = function () {
            $location.path('/login')
        }
        $scope.addliveroom = function () {
            $location.path('/addliveroom')
        }
        $scope.myroomlist = function () {
            $location.path('/myroomlist')
        }
        $scope.logout = function () {
            userService.logout();
            window.location.reload();
        }
        $scope.register = function () {
            $location.path('/register')
        }
    })
    .controller('myRoomListCtrl', function ($scope, $location, liveRoomList, userService) {
        if( userService.getUserInfo()!=null){
            var userId = userService.getUserInfo()._id;
            liveRoomList.getMyroomList(userId).then(function (result) {  //在route中使用resolve时，controller中注入数据，仍然是异步为空，采用这种方式可以避免
                $scope.myroomlist = result;
            });
        }
    })
    .controller('divertingMainCtrl', function ($scope, $location, liveRoomList, navigationBarService) {

    })
    .controller('divertingMainIndex1Ctrl', function ($scope, $location, liveRoomList, navigationBarService) {
        liveRoomList.getCategoryList('diverting', 'GoodVoice').then(function (result) {
            $scope.divertingroomlist = result;
        });
        liveRoomList.getCategoryList('diverting', 'GoodLook').then(function (result) {
            $scope.goodlookroomlist = result;
        });
        liveRoomList.getCategoryList('diverting', 'Dance').then(function (result) {
            $scope.danceroomlist = result;
        });
        liveRoomList.getCategoryList('diverting', 'TalkShow').then(function (result) {
            $scope.talkshowroomlist = result;
        });
        $scope.images = navigationBarService.getNavBar('discovermain');
    })
    .controller('divertingMainIndex2Ctrl', function ($scope, $location, liveRoomList, navigationBarService) {
        liveRoomList.getCategoryList('diverting', 'GoodLook').then(function (result) {
            $scope.goodlookroomlist = result;
        });
        $scope.images = navigationBarService.getNavBar('discovermain');
    })
    .controller('divertingMainIndex2Ctrl', function ($scope, $location, liveRoomList, navigationBarService) {
        liveRoomList.getCategoryList('diverting', 'GoodLook').then(function (result) {
            $scope.roomlist = result;
        });
        $scope.images = navigationBarService.getNavBar('discovermain');
    })
    .controller('divertingMainIndex3Ctrl', function ($scope, $location, liveRoomList, navigationBarService) {
        liveRoomList.getCategoryList('diverting', 'Dance').then(function (result) {
            $scope.roomlist = result;
        });
        $scope.images = navigationBarService.getNavBar('discovermain');
    })
    .controller('divertingMainIndex4Ctrl', function ($scope, $location, liveRoomList, navigationBarService) {
        liveRoomList.getCategoryList('diverting', 'TalkShow').then(function (result) {
            $scope.roomlist = result;
        });
        $scope.images = navigationBarService.getNavBar('discovermain');
    })
    .controller('discoverMainCtrl', function ($scope, $location, liveRoomList) {

    })
    .controller('userInfoCtrl', function ($scope,userService) {
        $scope.userInfo=userService.getUserInfo();
    })
;