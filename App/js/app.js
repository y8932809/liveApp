angular.module('liveApp',
    ['liveApp.controllers',
        'liveApp.services',
        'liveApp.directives',
        //'liveApp.filters',
        'liveApp.constants',
        'ui.router',
        'ui.bootstrap',
        'ng-iscroll'
    ])
    .run(['$rootScope', '$location', function ($scope, $location) {
        $scope.$on('$stateChangeSuccess', function (event) {
            $scope.$broadcast('refreshScroll', '');
        })
    }])
    .config(function ($stateProvider, $urlRouterProvider ) {
        $stateProvider
            .state('main', {
                url: '/main',
                templateUrl: './views/main.html',
                controller: 'mainCtrl'
            })
            .state('liveroom', {
                url: '/liveroom',
                templateUrl: './views/liveroom.html',
                controller: 'liveRoomCtrl'
            })

            .state('register', {
                url: '/register',
                templateUrl: 'views/register.html',
                controller: 'registerCtrl'
            })
            .state('addliveroom', {
                url: '/addliveroom',
                templateUrl: 'views/addliveroom.html',
                controller: 'addliveroomCtrl'
            })
            .state('addliveroomphoto', {
                url: '/addliveroomphoto/:roomid',
                templateUrl: 'views/addliveroomphoto.html',
                controller: 'addliveroomphotoCtrl'
            })
        //.state('login', {
        //    url:'/login',
        //    templateUrl: 'templates/login.html',
        //    controller:'LoginCtrl'
        //})

        //.state('main', {
        //    url:'/main/:userName',
        //    templateUrl: 'templates/main.html',
        //    controller:'MainCtrl'
        //})
        //.state('main.news', {
        //    url:'/main/:userName',
        //    templateUrl: 'templates/main.html',
        //    controller:'MainCtrl'
        //})
        //.state('thread',{
        //    url:'/thread',
        //    template:'<div ui-view=""></div>',
        //    // abstract:true
        //})
        //.state('thread.list',{
        //    url:'/list',
        //    templateUrl:'templates/threadlist.html',
        //    controller:'ThreadListCtrl as vm'
        //})
        //.state("tree",{
        //    url:'/tree',
        //    templateUrl:'templates/tree.html',
        //    controller:'ThreadTreeCtrl as vm'
        //})
        $urlRouterProvider.otherwise('/login');
    });
