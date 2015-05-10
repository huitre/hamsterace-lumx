/* 
* @Author: huitre
* @Date:   2015-05-10 12:33:09
* @Last Modified by:   huitre
* @Last Modified time: 2015-05-10 19:42:54
*/

'use strict';
  
angular.module('Hamsterace').controller('MeController',
['$scope', '$rootScope', '$location', 'Sidebar',
function ($scope, $rootScope, $location, Sidebar) {
  $scope.SideBar = Sidebar;
}])