angular.module('liveApp.services', [  'liveApp.constants'])
    .factory("liveRoomList", function ($http,$q,apiurl) {
        return{
            getAllList: function (count) {
                count=count||20;
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http({
                    url:apiurl+'rooms/getallrooms',
                    method:'GET',
                    params:{
                        'count':count
                    }
                }).success(function(result,header,config,status){
                    deferred.resolve(result);

                }).error(function(result,header,config,status){
                    deferred.reject(error);
                });
                return promise;
            },
            getCategoryList: function (bigCategory,smallCategory,count) {
                count=count||20;
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http({
                    url:apiurl+'rooms/getcategoryrooms',
                    method:'GET',
                    params:{
                        'bigCategory':bigCategory,
                        'smallCategory':smallCategory,
                        'count':count
                    }
                }).success(function(result,header,config,status){
                    deferred.resolve(result);

                }).error(function(result,header,config,status){
                    deferred.reject(error);
                });
                return promise;
            },
            getMyroomList: function (userid,count) {
                count=count||100;
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http({
                    url:apiurl+'rooms/getmyrooms',
                    method:'GET',
                    params:{
                        'userId':userid,
                        'count':count
                    }
                }).success(function(result,header,config,status){
                    deferred.resolve(result);

                }).error(function(result,header,config,status){
                    deferred.reject(error);
                });
                return promise;
            }
        }
    })
    .factory('userService', function ($rootScope,$http,$q,apiurl) {
        return{
            login: function (user) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http({
                    url:apiurl+'users/login',
                    method:'POST',
                    data:user
                }).success(function(result,header,config,status){
                    deferred.resolve(result);

                }).error(function(result,header,config,status){
                    deferred.reject(error);
                });
                return promise;
            },
            register: function (user) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http({
                    url:apiurl+'users/adduser',
                    method:'POST',
                    data:user
                }).success(function(result,header,config,status){
                    deferred.resolve(result);

                }).error(function(result,header,config,status){
                    deferred.reject(error);
                });
                return promise;
            },
            getUserInfo: function () {
                if(window.localStorage) {
                    var userInfoJson=localStorage.getItem('user');
                    var userInfo=JSON.parse(userInfoJson)
                    if(userInfo!=null){
                        $rootScope.loginCheck=true;
                        return userInfo[0];
                    }
                    else {
                        return null
                    }
                }
                else{
                    return null;//待修改
                }
            },
            setUserInfo: function (user) {
                $rootScope.loginCheck=true;
                if(window.localStorage) {
                    var userJson=JSON.stringify(user);
                    localStorage.setItem('user', userJson);
                }
                else{
                    //待添加不支持
                }
            },
            logout: function () {
                if(window.localStorage) {
                    localStorage.removeItem('user');
                }
                else{
                    //待添加不支持
                }
            }

        }
    })
    .factory('navigationBarService', function () {
        return{
            getNavBar: function (navBarType) {
                //暂时用本地数据代替
                var slides=[];
                switch (navBarType){
                    case  'main':
                        slides.push({ image: '../resource/images/lolbar1.jpg', text: '' });
                        slides.push({ image: '../resource/images/lolbar2.jpg', text: '' });
                        slides.push({ image: '../resource/images/lolbar3.jpg', text: '' });
                        slides.push({ image: '../resource/images/divertingbar.jpg', text: '' });
                        break;
                    case  'discovermain':
                        slides.push({ image: '../resource/images/divertingbar.jpg', text: '' });
                        slides.push({ image: '../resource/images/divertingbar1.jpg', text: '' });
                        slides.push({ image: '../resource/images/divertingbar2.jpg', text: '' });
                        slides.push({ image: '../resource/images/divertingbar3.jpg', text: '' });
                        break;
                }
                return slides;
            }
        }
    })
    .factory('liveRoomService', function ($http,$q,apiurl) {
            return {
                addRoom:function(roomDetails){
                    var deferred = $q.defer();
                    var promise = deferred.promise;
                    $http({
                        url:apiurl+'rooms/addroom',
                        method:'POST',
                        data:roomDetails
                    }).success(function(result,header,config,status){
                        deferred.resolve(result);

                    }).error(function(result,header,config,status){
                        deferred.reject(error);
                    });
                    return promise;
                },
                checkRoomByUserId: function (roomId,userId) {
                    var deferred = $q.defer();
                    var promise = deferred.promise;
                   var roomInfo={RoomId:roomId,UserId:userId}
                    $http({
                        url:apiurl+'rooms/checkRoomByUserId',
                        method:'POST',
                        data:roomInfo
                    }).success(function(result,header,config,status){
                        deferred.resolve(result);

                    }).error(function(error,header,config,status){
                        deferred.reject(error);
                    });
                    return promise;
                }

            }
    })
    .factory('socket', function ($rootScope) {
        var socket=io.connect();
        var events=[];
        return{
            on: function (eventName, callback) {
                //if(events.indexOf(eventName)==-1) {

                    if(events.indexOf(eventName)!==-1){
                        socket.removeListener(eventName);
                    }
                    socket.on(eventName, function () {
                        var args = arguments;
                        $rootScope.$apply(function () {
                            callback.apply(socket, args);
                        });
                    });
                    events.push(eventName);
                //}
            },
            emit: function (eventName, data, callback) {
                socket.emit(eventName, data, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        if (callback) {
                            callback.apply(socket, args);
                        }
                    });
                })
            },
            getEvents: function () {
                return events;
            }
        }
    })
;
