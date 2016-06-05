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
                count=count||20;
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
    .factory('userService', function ($http,$q,apiurl) {
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
                    return userInfo;
                }
                else{
                    return null;//待修改
                }
            },
            setUserInfo: function (user) {
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
    .service('sessionService', function (user) {
        this.create= function (sessionId,user) {
            this.id=sessionId;
            this.user=user;
        }
        this.destory= function () {
            this.id=null;
            this.user=null;
        }
        return this;
    })



//    .factory('liveRoomList', function ($http,apiurl) {
//        var LiveRoomFactory = {
//            createRoomList : function( model ){
//                var roomList;
//                switch( model ){
//                    case "ALL":
//                        roomList = new AllRoomList();
//                        break;
//                    case "LOL":
//                        roomList = new LolRoomList();
//                        break;
//                    case "Red":
//                        roomList = new RedRoomList();
//                        break;
//                    case "CS":
//                        roomList = new CsRoomList();
//                        break;
//                    case "Diverting":
//                        roomList = new DivertingRoomList();
//                        break;
//                    default:
//                        roomList = new AllRoomList();
//                        break;
//                }
//                return roomList;
//            }
//        }
//
//        var GetRoomList = function(){};
//        GetRoomList.prototype = {
//            getList : function( model ){
//                var roomList = LiveRoomFactory.createRoomList(model);
//                return roomList;
//            }
//        };
//
////全部列表
//        function AllRoomList(){
//            //this.data=[{Id:'1',Name:'好声音',Img:'../resource/images/lol_rooms_1.jpg'},
//            //    {Id:'2',Name:'瑞文专场',Img:'../resource/images/lol_rooms_2.jpg'},
//            //    {Id:'3',Name:'跑男',Img:'../resource/images/lol_rooms_3.jpg'},
//            //    {Id:'4',Name:'上海联赛',Img:'../resource/images/lol_rooms_4.jpg'}];
//            $http.get(apiurl+'rooms/getroom')
//                .success(function (data) {
//                    console.log(data);
//                    this.data=data;
//                })
//        }
//        function DivertingRoomList(){
//            this.data=[{Id:'1',Name:'上海联赛',Img:'../resource/images/lol_rooms_1.jpg'},
//                {Id:'2',Name:'Runing Man',Img:'../resource/images/lol_rooms_2.jpg'},
//                {Id:'3',Name:'跑男',Img:'../resource/images/lol_rooms_3.jpg'},
//                {Id:'4',Name:'极限挑战',Img:'../resource/images/lol_rooms_4.jpg'}];
//        }
//
////LoL数据列表
//        function LolRoomList(){
//            this.data=[{Id:'1',Name:'Facker的直播',Img:'../resource/images/lol_rooms_1.jpg'},
//                {Id:'2',Name:'瑞文专场',Img:'../resource/images/lol_rooms_2.jpg'},
//                {Id:'3',Name:'上单蛮王',Img:'../resource/images/lol_rooms_3.jpg'},
//                {Id:'4',Name:'瞎子专场',Img:'../resource/images/lol_rooms_4.jpg'}];
//        }
//
//        function CsRoomList(){
//            this.data=[{Id:'1',Name:'全国大赛',Img:'../resource/images/lol_rooms_1.jpg'},
//                {Id:'2',Name:'wcg直播',Img:'../resource/images/lol_rooms_2.jpg'},
//                {Id:'3',Name:'上海联赛',Img:'../resource/images/lol_rooms_3.jpg'},
//                {Id:'4',Name:'精彩回放',Img:'../resource/images/lol_rooms_4.jpg'}];
//        }
//
//        function RedRoomList(){
//            this.data=[{Id:'1',Name:'wcg2016',Img:'../resource/images/lol_rooms_1.jpg'},
//                {Id:'2',Name:'1V5',Img:'../resource/images/lol_rooms_2.jpg'},
//                {Id:'3',Name:'中国专场',Img:'../resource/images/lol_rooms_3.jpg'},
//                {Id:'4',Name:'随机国家',Img:'../resource/images/lol_rooms_4.jpg'}];
//        }
//
//        return{
//            getList: function (roomType) {
//                var roomModel = new GetRoomList();
//                var myList = roomModel.getList(roomType);
//                return myList.data;
//            }
//        }
//    })



//.service('tree', function () {
//    var self=this;
//    var enhanceItem= function (item,childrenName) {
//      item.$hasChildren= function () {
//        var subItems=this[childrenName];
//        return angular.isArray(subItems)&&subItems.length;
//      };
//      item.$foldToggle= function () {
//        this.$folded=!this.$folded;
//      };
//      item.$isFolded=function(){
//        return this.$folded;
//      };
//    };
//    this.enhance= function (items,childrenName) {
//      if(angular.isUndefined(childrenName)) {
//        childrenName='items';
//      }
//      angular.forEach(items, function (item) {
//        enhanceItem(item,childrenName);
//        if(item.$hasChildren()){
//          self.enhance(item[childrenName],childrenName);
//        }
//      });
//      return items;
//    }
//  })
;
