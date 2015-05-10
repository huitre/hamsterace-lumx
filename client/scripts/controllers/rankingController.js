/* 
* @Author: huitre
* @Date:   2015-05-10 19:41:04
* @Last Modified by:   huitre
* @Last Modified time: 2015-05-10 19:48:50
*/

'use strict';

angular.module('Hamsterace').controller('RankingController',
['$scope', '$rootScope', '$location', '$translate', 'Sidebar',
function ($scope, $rootScope, $location, $translate, Sidebar) {
  $scope.SideBar = Sidebar;
  $scope.title = 'appbar.ranking';

}])