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
    .run(['$rootScope','$location', 'socket', function ($rootScope, $location, socket) {
        $rootScope.$on('$stateChangeSuccess', function (event, to, toParams, from, fromParams) {
            //if (to.name !== 'liveroom') { //是否进入了页面多次，导致事件发送了多次？
            //    if (from.name === 'liveroom') {
            //        socket.emit('close');
            //    }
            //}
            //else {
            //    socket.emit('loaddata');
            //}
            //alert(from.name);
            if (to.name !== 'liveroom' && to.name !== 'myliveroom') {
                if (from.name === 'liveroom' || from.name === 'myliveroom') {
                    socket.emit('close');
                }
            }
            else {
               // socket.emit('loadData');
            }
        })
        $rootScope.$on('$stateChangeStart', function(event, toState, toStateParams) {
            if(angular.isDefined($rootScope.loginCheck)){
                if (!$rootScope.loginCheck && toState.data.loginCheck) {
                    //$location.path('/');
                    event.preventDefault();
                    window.location.href="/#/login";
                    //$location.path('/');
                    //  $rootScope.$emit('needLogin');
                }
            }
            else{
               // window.location.href="/#/login";
            }
        })
    }])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('main', {
                url: '/main',
                templateUrl: './views/main.html',
                controller: 'mainCtrl',
                data: {
                    loginCheck: false
                }
            })
            .state('main.index_1', {
                url: '/index_1',
                templateUrl: './views/mainView/index_1.html',
                controller: 'mainIndex1Ctrl',
                data: {
                    loginCheck: false
                }
            })
            .state('main.index_2', {
                url: '/index_2',
                templateUrl: './views/mainView/index_2.html',
                controller: 'mainIndex2Ctrl',
                data: {
                    loginCheck: false
                }
            })
            .state('main.index_3', {
                url: '/index_3',
                templateUrl: './views/mainView/index_3.html',
                controller: 'mainIndex3Ctrl',
                data: {
                    loginCheck: false
                }
            })
            .state('main.index_4', {
                url: '/index_4',
                templateUrl: './views/mainView/index_4.html',
                controller: 'mainIndex4Ctrl',
                data: {
                    loginCheck: false
                }
            })
            .state('divertingmain', {
                url: '/divertingmain',
                templateUrl: 'views/divertings/divertingmain.html',
                controller: 'divertingMainCtrl',
                data: {
                    loginCheck: false
                }
            })
            .state('divertingmain.index_1', {
                url: '/index_1',
                templateUrl: './views/divertingMainView/index_1.html',
                controller: 'divertingMainIndex1Ctrl',
                data: {
                    loginCheck: false
                }
            })
            .state('divertingmain.index_2', {
                url: '/index_2',
                templateUrl: './views/divertingMainView/index_2.html',
                controller: 'divertingMainIndex2Ctrl',
                data: {
                    loginCheck: false
                }
            })
            .state('divertingmain.index_3', {
                url: '/index_3',
                templateUrl: './views/divertingMainView/index_3.html',
                controller: 'divertingMainIndex3Ctrl',
                data: {
                    loginCheck: false
                }
            })
            .state('divertingmain.index_4', {
                url: '/index_4',
                templateUrl: './views/divertingMainView/index_4.html',
                controller: 'divertingMainIndex4Ctrl',
                data: {
                    loginCheck: false
                }
            })
            .state('liveroom', {
                url: '/liveroom/:roomid',
                templateUrl: './views/rooms/liveroom.html',
                controller: 'liveRoomCtrl',
                data: {
                    loginCheck: false
                }
            })
            .state('myliveroom', {
                url: '/myliveroom/:roomid',
                templateUrl: './views/rooms/myliveroom.html',
                controller: 'myLiveRoomCtrl',
                data: {
                    loginCheck: true
                }
            })
            .state('register', {
                url: '/register',
                templateUrl: 'views/register.html',
                controller: 'registerCtrl',
                data: {
                    loginCheck: false
                }
            })
            .state('addliveroom', {
                url: '/addliveroom',
                templateUrl: 'views/rooms/addliveroom.html',
                controller: 'addliveroomCtrl',
                data: {
                    loginCheck: true
                }
            })
            .state('addliveroomphoto', {
                url: '/addliveroomphoto/:roomid',
                templateUrl: 'views/rooms/addliveroomphoto.html',
                controller: 'addliveroomphotoCtrl',
                data: {
                    loginCheck: true
                }
            })
            .state('myroomlist', {
                url: '/myroomlist',
                templateUrl: 'views/rooms/myroomlist.html',
                controller: 'myRoomListCtrl',
                data: {
                    loginCheck: true
                }
            })
            .state('login', {
                url: '/login',
                templateUrl: 'views/login.html',
                controller: 'loginCtrl',
                data: {
                    loginCheck: false
                }
            })
            .state('my', {
                url: '/my',
                templateUrl: 'views/my.html',
                controller: 'myCtrl',
                data: {
                    loginCheck: false
                }
            })
            .state('userinfo', {
                url: '/userinfo',
                templateUrl: 'views/users/userinfo.html',
                controller: 'userInfoCtrl',
                data: {
                    loginCheck: true
                }
            })
            .state('discovermain', {
                url: '/discovermain',
                templateUrl: 'views/discovers/discovermain.html',
                controller: 'discoverMainCtrl',
                data: {
                    loginCheck: false
                }
            })
        $urlRouterProvider.otherwise('/login');
    });
