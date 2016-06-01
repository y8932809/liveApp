
angular.module('liveApp',
    ['liveApp.controllers',
        //'liveApp.services',
        'liveApp.directives',
        //'liveApp.filters',
        //'liveApp.constants',
        'ui.router',
        'ui.bootstrap'
    ])
    .config(function($stateProvider, $urlRouterProvider) {

        $stateProvider

            .state('main', {
                url:'/main',
                templateUrl: './views/main.html',
                controller:'mainCtrl'
            })

            //.state('register', {
            //    url:'/register',
            //    templateUrl: 'view/register.html',
            //    controller:'RegisterCtrl'
            //})
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
