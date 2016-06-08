/**
 * Created by user on 2016-04-20.
 */
angular.module('liveApp.directives', [
    'liveApp.constants'
])
    .directive('bannersLiveRoom', function () {
        return{
            restrict:'EA',
            link: function (scope, element, attrs) {
                scope.myInterval = 5000;
            },
            scope:{
                roomImages:"=roomImages" //传入的参数名，如果有大写，需要和指令的规则一样，有一个 “-”
            },
            templateUrl:"../components/bannersLiveRoomTemp.html"
        }
    })
    .directive('navigationBar', function () {
        return{
            restrict:'EA',
            link: function (scope,element,attrs) {
                scope.menuArray=[]; //暂时用假数据，以后用外部传入的数据。
               switch (scope.barType){
                   case'main':
                       scope.menuArray.push({menu:'全部直播',sref:'.index_1'});
                       scope.menuArray.push({menu:'英雄联盟',sref:'.index_2'});
                       scope.menuArray.push({menu:'主机游戏',sref:'.index_3'});
                       scope.menuArray.push({menu:'反恐精英',sref:'.index_4'});
                       break;
                   case'divertingmain':
                      scope.menuArray.push({menu:'全部直播',sref:'.index_1'});
                      scope.menuArray.push({menu:'颜值',sref:'.index_2'});
                      scope.menuArray.push({menu:'舞蹈',sref:'.index_3'});
                      scope.menuArray.push({menu:'脱口秀',sref:'.index_4'});
                       break;
               }
            },
            scope:{
                barType:'@barType'
            },
            templateUrl:"../components/navigationBarTemp.html"
        }
    })
    //直播间列表
    .directive('liveRooms', function ($location,imgurl,userService,liveRoomService) {
        return{
            restrict:'EA',
            link: function (scope, element, attrs) {
                scope.imgurl=imgurl;
                scope.comeroom= function (roomid) {
                    //调试方便，暂时注释，直接跳转
                    //if(userService.getUserInfo()!=null){
                    //    userid=userService.getUserInfo()[0]._id;
                    //    liveRoomService.checkRoomByUserId(roomid,userid).then(
                    //        function (result) {
                    //            if(result.state=='success'){
                    //                $location.path('/myliveroom/'+roomid);
                    //            }
                    //            else{
                    //                $location.path('/liveroom/'+roomid);
                    //            }
                    //        },
                    //        function () {
                    //            alert('错误');
                    //        }
                    //    )
                    //}
                    //else{
                    //    $location.path('/liveroom/'+roomid);
                    //}
                    if(scope.roomType=="1"){
                        $location.path('/liveroom/'+roomid);
                    }
                    else{
                        $location.path('/myliveroom/'+roomid);
                    }
                }
            },
            scope:{
                roomTitle:"@roomTitle",
                roomList:"=roomList",
                roomType:'@roomType'
            },
            templateUrl:"../components/liveRoomsTemp.html"
        }
    })
    .directive('ngThumb', ['$window', function($window) {
        var helper = {
            support: !!($window.FileReader && $window.CanvasRenderingContext2D),
            isFile: function(item) {
                return angular.isObject(item) && item instanceof $window.File;
            },
            isImage: function(file) {
                var type =  '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        };

        return {
            restrict: 'A',
            template: '<canvas/>',
            link: function(scope, element, attributes) {
                if (!helper.support) return;

                var params = scope.$eval(attributes.ngThumb);

                if (!helper.isFile(params.file)) return;
                if (!helper.isImage(params.file)) return;

                var canvas = element.find('canvas');
                var reader = new FileReader();

                reader.onload = onLoadFile;
                reader.readAsDataURL(params.file);

                function onLoadFile(event) {
                    var img = new Image();
                    img.onload = onLoadImage;
                    img.src = event.target.result;
                }

                function onLoadImage() {
                    var width = params.width || this.width / this.height * params.height;
                    var height = params.height || this.height / this.width * params.width;
                    canvas.attr({ width: width, height: height });
                    canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
                }
            }
        };
    }]);
;
