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
                value: 'divertings',
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
    .controller('addliveroomphotoCtrl',function($scope, $stateParams,FileUploader,apiurl){
      $scope.roomid= $stateParams.roomid;

        var uploader = $scope.uploader = new FileUploader({
            url:apiurl+'rooms/addroomphoto',
            //data: { 'roomid':  $scope.roomid },
            //filters: [{
            //    roomid:  $scope.roomid ,
            //    // A user-defined filter
            //    fn: function(item) {
            //        return true;
            //    }
            //}]
        });

        // FILTERS

        uploader.filters.push({
            name: 'imageFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });

        // CALLBACKS

        uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
        };
        uploader.onAfterAddingFile = function(fileItem) {
            console.info('onAfterAddingFile', fileItem);
        };
        uploader.onAfterAddingAll = function(addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        uploader.onBeforeUploadItem = function(item) {
            console.info('onBeforeUploadItem', item);
        };
        uploader.onProgressItem = function(fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        uploader.onProgressAll = function(progress) {
            console.info('onProgressAll', progress);
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCancelItem = function(fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
        };
        uploader.onCompleteAll = function() {
            console.info('onCompleteAll');
        };

        console.info('uploader', uploader);
    })
;
