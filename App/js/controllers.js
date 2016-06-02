angular.module('liveApp.controllers', ['liveApp.services',
    'liveApp.constants'])

    .controller('mainCtrl', function ($scope, $rootScope) {

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
;
