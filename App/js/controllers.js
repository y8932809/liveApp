angular.module('liveApp.controllers', ['liveApp.services',
    'liveApp.constants',
   'angularFileUpload'
])

    .controller('mainCtrl', function ($scope, $rootScope,liveRoomList) {
        liveRoomList.getAllList().then(function (result) {  //在route中使用resolve时，controller中注入数据，仍然是异步为空，采用这种方式可以避免
            $scope.allroomlist = result;
        });
        liveRoomList.getCategoryList('game','LOL').then(function (result) {
            $scope.lolroomlist = result;
        });
        liveRoomList.getCategoryList('diverting','GoodVoice').then(function (result) {
            $scope.divertingroomlist = result;
        });
    })
    .controller('bodyCtrl', function ($scope) {
        $scope.refreshiScroll = function () {
            $scope.$parent.myScroll['wrapper'].refresh();
        };
        $scope.$on('refreshScroll', function (event, ags) {
            setTimeout(function () {
                $scope.$parent.myScroll['wrapper'].refresh();

            }, 500);
        })
    })
    .controller('liveRoomCtrl', function ($scope,apiurl) {

    })
    .controller('registerCtrl', function ($scope, $http, $location) {
        $scope.submit = function (userDetails) {
            var user = angular.copy(userDetails);
            user.Identity = 1;
            $http.post(apiurl+'users/adduser', user)
                .success(function (data) {
                    if (data == 'success') {
                        alert("注册成功！");//   需要修改自带alert样式。
                        $location.path('/main'); //暂时跳转至主目录
                    }
                });
        }
    })
    .controller('addliveroomCtrl', function ($scope,$http,$location,apiurl) {
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

                    }]
            }
        ]
        $scope.submit= function (roomDetails) {
            var room = angular.copy(roomDetails);
            room.BigCategory=room.category.value;
            room.SmallCategory=room.category.province.value;

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
;
