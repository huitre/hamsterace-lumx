/* 
* @Author: huitre
* @Date:   2015-05-10 12:33:09
* @Last Modified by:   huitre
* @Last Modified time: 2015-06-19 19:03:56
*/

'use strict';
  
angular.module('Hamsterace').controller('MeController',
['$scope', '$rootScope', '$location', 'Sidebar', 'MeService',
function ($scope, $rootScope, $location, Sidebar, MeService) {
  var self = this;

  // main template dependency
  $scope.SideBar = Sidebar;
  $scope.dataLoading = true;


  // actions
  this.getStats = function (type) {
    MeService.getStats(type).then(function(stats) {
      $scope.dataLoading = false;
      $scope.stats = stats.stats;
      if ($scope.stats) {
        $scope.bar = $scope.stats.distance.data;
        $scope.activity = $scope.stats.activity.percent;
      }
    })
  }

  this.getProfil = function () {
    MeService.getBasicProfil().then(function(profil) {
      MeService.getFriends().then(function (friends) {
        $scope.dataLoading = false;
        $scope.profil = profil;
        $scope.friends = friends;
      })
    });
  }

  $scope.profil = $scope.profil || this.getProfil();;
  
  // other

  // graphs
  $scope.stats = $scope.stats || this.getStats();
  $scope.bar = null;
  $scope.activity = null;

  $scope.changeGranulosity = function (type) {
    $scope.stats = self.getStats(type);
  }

}])