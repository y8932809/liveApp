/**
 * Created by user on 2016-04-20.
 */
angular.module('liveApp.directives', [])
    .directive('bannersLiveRoom', function () {
        return{
            restrict:'EA',
            link: function (scope, element, attrs) {
                scope.myInterval = 5000;
                scope.slides=[];
                scope.slides.push({ image: '../resource/images/red.jpg', text: '' });
                scope.slides.push({ image: '../resource/images/cs.jpg', text: '' });
                scope.slides.push({ image: '../resource/images/lol.jpg', text: '' });
            },
            scope:{
                roomImages:"@roomImages" //传入的参数名，如果有大写，需要和指令的规则一样，有一个 “-”
            },
            templateUrl:"../components/bannersLiveRoomTemp.html"
        }
    })

    .directive('navigationBar', function () {
        return{
            restrict:'EA',
            link: function (scope,element,attrs) {

            },
            scope:{},
            templateUrl:"../components/navigationBarTemp.html"
        }
    })
    .directive('liveRooms', function () {
        return{
            restrict:'EA',
            link: function (scope, element, attrs) {
            },
            scope:{
                roomTitle:"@roomTitle",
                roomList:"=roomList"
            },
            templateUrl:"../components/liveRoomsTemp.html"
        }
    })

    //.directive('registerFieldError', function ($compile) {
    //  return {
    //    restrict: 'A',
    //    require: 'ngModel',
    //    link: function (scope, element, attrs, ngModel) {
    //      var subScope = scope.$new(true);
    //
    //      subScope.hasError = function () {
    //        //如果是无效格式并且用户输入过
    //        return ngModel.$invalid && ngModel.$dirty
    //      };
    //      subScope.errors = function () {
    //        return ngModel.$error;
    //      }
    //      subScope.customMessages=scope.$eval(attrs.registerFieldError);
    //      var hint = $compile('<ul class="" ng-if="hasError()"><li ng-repeat="(name,wrong) in errors()" ng-if="wrong">{{name|error:customMessages}}</li></ul>')
    //      (subScope);
    //      element.after(hint);
    //    }
    //  };
    //})
    //.directive('passwordFieldSame', function () {
    //  return {
    //    restrict: 'A',
    //    require: 'ngModel',
    //    link: function (scope, element, attrs, ngModel) {
    //      var isSame = function (value) {
    //        var anotherValue = scope.$eval(attrs.passwordFieldSame);
    //        return value === anotherValue;
    //      };
    //      ngModel.$parsers.push(function (value) {
    //        ngModel.$setValidity('same', isSame(value));
    //        return isSame(value) ? value : undefined;
    //      });
    //      scope.$watch(
    //        function () {
    //          return scope.$eval(attrs.passwordFieldSame);
    //        },
    //        function () {
    //          ngModel.$setValidity('same', isSame(ngModel.$modelValue));
    //        }
    //      );
    //    }
    //  }
    //})
    //.directive('imageCaptcha', function () {
    //  return{
    //    restrict:'A',
    //    link: function (scope,elemet) {
    //      var changeSrc= function () {
    //        elemet.attr('src','/img/captcha.jpg?random='+new Date().getTime());
    //        changeSrc();
    //        elemet.on('click', function () {
    //          changeSrc();
    //        });
    //      }
    //    }
    //  }
    //})
    //.directive('bfTemplate', function () {
    //  return{
    //    restrict:'A',
    //    priority:2000,
    //    compile: function (element) {
    //      var template=element[0].outerHTML;
    //      return function (scope,element,attrs) {
    //        scope.$template=template;
    //        if(!scope.$dataSource){
    //          scope.$dataSource=scope.$eval(attrs.bfTemplate);
    //        }
    //      };
    //    }
    //  }
    //})
    //.directive('bfRecurse',function bfRecurse($compile){
    //  return{
    //    restrice:'A',
    //    link: function (scope,element,attrs) {
    //      var subScope=scope.$new(true);
    //      subScope.$dataSource=scope.$eval(attrs.bfRecurse);
    //      var dom=$compile(scope.$template)(subScope);
    //      element.replaceWith(dom);
    //    }
    //  }
    //})
;
