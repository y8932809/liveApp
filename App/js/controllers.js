angular.module('liveApp.controllers', ['liveApp.services'])

  .controller('mainCtrl', function ($scope,liveRoomList) {
      $scope.allroomlist=liveRoomList.getList("ALL");
      $scope.lolroomlist=liveRoomList.getList("LOL");
      $scope.divertingroomlist=liveRoomList.getList("Diverting");
      $scope.csroomlist=liveRoomList.getList("CS");
      $scope.redroomlist=liveRoomList.getList("Red");
  });
