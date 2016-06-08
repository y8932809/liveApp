//添加路由权限，添加房间页面需要进行登录验证
//直播发送两次才能收到
//iscroll每次进入页面需要刷新
//每次收到消息，自动滑到最底部。
angular.module('liveApp',
    ['liveApp.controllers',
        'liveApp.services',
        'liveApp.directives',
        //'liveApp.filters',
        'liveApp.constants',
        'ui.router',
        'ui.bootstrap',
        'ng-iscroll',
        'ngAnimate'
    ])
    .run(['$rootScope', '$location', 'socket', function ($scope, $location, socket) {
        $scope.$on('$stateChangeSuccess', function (event, to, toParams, from, fromParams) {
            if (to.name !== 'liveroom') {
                if (from.name === 'liveroom') {
                    socket.emit('close');
                }
            }
            else {
                socket.emit('loaddata');
            }
        })
    }])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('main', {
                url: '/main',
                templateUrl: './views/main.html',
                controller: 'mainCtrl'
            })
            .state('main.index_1', {
                url: '/index_1',
                templateUrl: './views/mainView/index_1.html',
                controller: 'mainIndex1Ctrl'
            })
            .state('main.index_2', {
                url: '/index_2',
                templateUrl: './views/mainView/index_2.html',
                controller: 'mainIndex2Ctrl'
            })
            .state('main.index_3', {
                url: '/index_3',
                templateUrl: './views/mainView/index_3.html',
                controller: 'mainIndex3Ctrl'
            })
            .state('main.index_4', {
                url: '/index_4',
                templateUrl: './views/mainView/index_4.html',
                controller: 'mainIndex4Ctrl'
            })
            .state('divertingmain', {
                url: '/divertingmain',
                templateUrl: 'views/divertings/divertingmain.html',
                controller: 'divertingMainCtrl'
            })
            .state('divertingmain.index_1', {
                url: '/index_1',
                templateUrl: './views/divertingMainView/index_1.html',
                controller: 'divertingMainIndex1Ctrl'
            })
            .state('divertingmain.index_2', {
                url: '/index_2',
                templateUrl: './views/divertingMainView/index_2.html',
                controller: 'divertingMainIndex2Ctrl'
            })
            .state('divertingmain.index_3', {
                url: '/index_3',
                templateUrl: './views/divertingMainView/index_3.html',
                controller: 'divertingMainIndex3Ctrl'
            })
            .state('divertingmain.index_4', {
                url: '/index_4',
                templateUrl: './views/divertingMainView/index_4.html',
                controller: 'divertingMainIndex4Ctrl'
            })
            .state('liveroom', {
                url: '/liveroom/:roomid',
                templateUrl: './views/rooms/liveroom.html',
                controller: 'liveRoomCtrl'
            })
            .state('myliveroom', {
                url: '/myliveroom/:roomid',
                templateUrl: './views/rooms/myliveroom.html',
                controller: 'myLiveRoomCtrl'
            })
            .state('register', {
                url: '/register',
                templateUrl: 'views/register.html',
                controller: 'registerCtrl'
            })
            .state('addliveroom', {
                url: '/addliveroom',
                templateUrl: 'views/rooms/addliveroom.html',
                controller: 'addliveroomCtrl'
            })
            .state('addliveroomphoto', {
                url: '/addliveroomphoto/:roomid',
                templateUrl: 'views/rooms/addliveroomphoto.html',
                controller: 'addliveroomphotoCtrl'
            })
            .state('myroomlist', {
                url: '/myroomlist',
                templateUrl: 'views/rooms/myroomlist.html',
                controller: 'myRoomListCtrl'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'views/login.html',
                controller: 'loginCtrl'
            })
            .state('my', {
                url: '/my',
                templateUrl: 'views/my.html',
                controller: 'myCtrl'
            })

            .state('discovermain', {
                url: '/discovermain',
                templateUrl: 'views/discovers/discovermain.html',
                controller: 'discoverMainCtrl'
            })
        $urlRouterProvider.otherwise('/login');
    });
