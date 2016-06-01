/**
 * Created by user on 2016-04-20.
 */
angular.module('liveApp.filters', [])
  .filter('error', function (Errors) {

    return function (name, customMessages) {
      var errors = angular.extend({}, Errors, customMessages)
      return errors[name] || name;
    };
  })
  .filter('page',function () {
  return function (input, page, pagesize) {
    if (!input) {
      return input;
    }
    if (page < 0 || pagesize <= 0) {
      return [];
    }
    var start = page * pagesize;
    var end = (page + 1) * pagesize;
    return input.slice(start, end);
  };
})
  .filter('tree', function (tree) {
    return function(items,childrenName){
      tree.enhance(items,childrenName);
      return items;
    };
  })
;
