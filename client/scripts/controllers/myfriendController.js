/* 
* @Author: huitre
* @Date:   2015-06-27 14:38:20
* @Last Modified by:   huitre
* @Last Modified time: 2015-06-28 22:18:14
*/

'use strict';
 
angular.module('Hamsterace').controller('MyFriendController',
['$rootScope', '$scope', 'Sidebar', 'MeService', 'UserService',
function ($rootScope, $scope, Sidebar, MeService, UserService) {
  var self = this;

  $scope.title = 'ui.myfriend';
  // main template dependency
  $scope.SideBar = Sidebar;
  $scope.dataLoading = true;

  (function () {
    MeService.getFriends().then(function (data) {
      $scope.friends = data;
    })
    MeService.getWaitingFriends().then(function (data) {
      console.log(data);
      $scope.waiting = data;
    });
  })()

}])