/* 
* @Author: huitre
* @Date:   2015-06-27 14:38:20
* @Last Modified by:   huitre
* @Last Modified time: 2015-06-27 15:43:11
*/

'use strict';
 
angular.module('Hamsterace').controller('UserController',
['$rootScope', '$scope', 'Sidebar', 'MeService', 'UserService',
function ($rootScope, $scope, Sidebar, MeService, UserService) {
  var self = this;

  // main template dependency
  $scope.SideBar = Sidebar;
  $scope.dataLoading = true;

  $scope.friends;

  console.log($scope)

}])