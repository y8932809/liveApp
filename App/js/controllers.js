angular.module('liveApp.controllers', ['liveApp.services',
    'liveApp.constants',
   'angularFileUpload'
])

    .controller('mainCtrl', function ($scope, $rootScope,liveRoomList,navigationBarService) {
        liveRoomList.getAllList(4).then(function (result) {  //在route中使用resolve时，controller中注入数据，仍然是异步为空，采用这种方式可以避免
            $scope.allroomlist = result;
        });
        liveRoomList.getCategoryList('game','LOL',4).then(function (result) {
            $scope.lolroomlist = result;
        });
        liveRoomList.getCategoryList('diverting','GoodVoice',4).then(function (result) {
            $scope.divertingroomlist = result;
        });
        $scope.images=navigationBarService.getNavBar('main')
    })
    .controller('bodyCtrl', function ($scope) {
        $scope.refreshiScroll = function () {
            $scope.$parent.myScroll['wrapper'].refresh();
        };
        $scope.$on('refreshScroll', function (event, ags) {
            setTimeout(function () {
                $scope.$parent.myScroll['wrapper'].refresh();

            }, 500);
        });
        $scope.currentUser=null;
        $scope.setCurrentUser= function (user) {
            $scope.currentUser=user;

        }
    })
    .controller('liveRoomCtrl', function ($scope) {

    })
    .controller('registerCtrl', function ($scope,$location,userService) {
        $scope.submit = function (userDetails) {
            var user = angular.copy(userDetails);
            user.Identity = 1;
            userService.register(user).then(function(data){
                if (data == 'success') {
                    alert("注册成功！");//   需要修改自带alert样式。
                    //$scope.setCurrentUser(user);
                    userService.setUserInfo(user);
                    $location.path('/main'); //暂时跳转至主目录
                }
            }, function (err) {
                alert('操作错误！')
            });
            //$http.post(apiurl+'users/adduser', user)
            //    .success(function (data) {
            //        if (data == 'success') {
            //            alert("注册成功！");//   需要修改自带alert样式。
            //            $location.path('/main'); //暂时跳转至主目录
            //        }
            //    });
        }
    })
    .controller('addliveroomCtrl', function ($scope,$http,$location,userService,apiurl) {
        $scope.categoryData=[
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
                    }]
            },
            {
                label: '娱乐',
                value: 'diverting',
                provinces: [
                    {
                        label: '好声音',
                        value:'GoodVoice'

                    },
                    {
                        label: '颜值',
                        value:'GoodLook'

                    },
                    {
                        label: '舞蹈',
                        value:'Dance'

                    },
                    {
                        label: '脱口秀',
                        value:'TalkShow'

                    },

                ]
            }
        ]
        $scope.submit= function (roomDetails) {
            var room = angular.copy(roomDetails);
            room.BigCategory=room.category.value;
            room.SmallCategory=room.category.province.value;
            //room.UserId=$scope.currentUser[0]._id;
            room.UserId=userService.getUserInfo()[0]._id;
            //待修改创建service
            $http.post(apiurl+'rooms/addroom', room)
                .success(function (data) {
                    if (data.state == 'success') {
                        alert("创建成功！");//   需要修改自带alert样式。
                        $location.path('/addliveroomphoto/'+data.room._id); //直接上传图片
                    }
                });
        }

    })
    .controller('addliveroomphotoCtrl',function($scope, $stateParams,$location,FileUploader,apiurl){

        var uploader = $scope.uploader = new FileUploader({
            url:apiurl+'rooms/addroomphoto/'+$stateParams.roomid,

        });

        $scope.UploadFile = function(){
            uploader.uploadAll();
        }


        $scope.clearItems = function(){    //重新选择文件时，清空队列，达到覆盖文件的效果
            uploader.clearQueue();
        }

        uploader.onAfterAddingFile = function(fileItem) {
            $scope.fileItem = fileItem._file;    //添加文件之后，把文件信息赋给scope
        };

        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            $scope.uploadStatus = true;   //上传成功则把状态改为true
            alert("上传成功！")
            $location.path('/main'); //暂时跳转至主目录
        };


        uploader.filters.push({
            name: 'imageFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });
    })
    .controller('loginCtrl', function ($scope,$http,$location,userService) {
        $scope.login= function (user) {
            userService.login(user).then(function (result) {
                if(result.state=='success') {
                   // $scope.setCurrentUser(result.user);
                    userService.setUserInfo(result.user)
                    //?????存放session？
                    $location.path('/main'); //暂时跳转至主目录
                }
                else{
                    alert('用户名或密码错误！')
                }

            }, function () {
                alert('访问失败。')
            })
        }
        $scope.register= function () {
            $location.path('/register')
        }
    })
    .controller('myCtrl', function ($scope,$location,userService) {
        //if($scope.currentUser!=null) {
        //    $scope.user = $scope.currentUser[0];
        //}
        if(userService.getUserInfo()!=null){
            $scope.user=userService.getUserInfo()[0];
        }
        $scope.login= function () {
            $location.path('/login')
        }
        $scope.addliveroom= function () {
            $location.path('/addliveroom')
        }
        $scope.myroomlist= function () {
            $location.path('/myroomlist')
        }
        $scope.logout= function () {
            userService.logout();
            window.location.reload();
        }
    })
    .controller('myRoomListCtrl', function ($scope,$location,liveRoomList,userService) {
        //var userId=$scope.currentUser[0]._id;
        var userId=userService.getUserInfo()[0]._id;
        liveRoomList.getMyroomList(userId).then(function (result) {  //在route中使用resolve时，controller中注入数据，仍然是异步为空，采用这种方式可以避免
            $scope.myroomlist = result;
        });
    })
    .controller('divertingMainCtrl', function ($scope,$location,liveRoomList,navigationBarService) {
        liveRoomList.getCategoryList('diverting','GoodVoice').then(function (result) {
            $scope.divertingroomlist = result;
        });
        liveRoomList.getCategoryList('diverting','GoodLook').then(function (result) {
            $scope.goodlookroomlist = result;
        });
        liveRoomList.getCategoryList('diverting','Dance').then(function (result) {
            $scope.danceroomlist = result;
        });
        liveRoomList.getCategoryList('diverting','TalkShow').then(function (result) {
            $scope.talkshowroomlist = result;
        });
        $scope.images=navigationBarService.getNavBar('discovermain');
    })
    .controller('discoverMainCtrl', function ($scope,$location,liveRoomList) {

    })
;