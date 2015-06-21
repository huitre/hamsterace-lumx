/* 
* @Author: huitre
* @Date:   2015-05-10 12:33:09
* @Last Modified by:   huitre
* @Last Modified time: 2015-06-20 17:52:22
*/

'use strict';
  
angular.module('Hamsterace').controller('MeController',
['$scope', 'Sidebar', 'MeService', 'StatsService',
function ($scope, Sidebar, MeService, StatsService) {
  var self = this;

  // main template dependency
  $scope.SideBar = Sidebar;
  $scope.dataLoading = true;

  // graphs
  $scope.stats = null;
  $scope.bar = null;
  $scope.activity = null;
  $scope.resume = null;
  $scope.type = null;


  // actions
  this.getStats = function (type) {
    return MeService.getStats(type).then(function(stats) {
      $scope.dataLoading = false;
      $scope.stats = stats.stats;
    })
  }

  this.getBar = function () {
    if ($scope.stats) {
      $scope.bar = $scope.stats.distance.data;
    }
  }

  this.getActivity = function () {
    if ($scope.stats) {
      $scope.activity = $scope.stats.activity.percent;
    }
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

  // event handler

  $scope.setStats = function (type) {
    if ($scope.type == type && $scope.stats)
      return self.getBar();
    self.getStats(type).then(function (stats) {
      self.getBar();
    })
    $scope.type = type;
  }

  $scope.setActivity = function (type) {
    if ($scope.type == type && $scope.stats)
      return self.getActivity();
    self.getStats(type).then(function (stats) {
      self.getActivity();
    })
    $scope.type = type;
  }

  $scope.getResume = function () {
    self.getStats('monthly').then(function () {
      $scope.resume = $scope.stats.summary;
      if (!$scope.resume.average)
        $scope.resume.average = $scope.resume.sum;
      $scope.resume.sum = StatsService.contentToUnits($scope.resume.sum);
      $scope.resume.max = StatsService.contentToUnits($scope.resume.max);
      $scope.resume.average = StatsService.contentToUnits($scope.resume.average);
    })
  }

  $scope.setStats('hourly');
  $scope.setActivity('weekly');
  $scope.getResume();
  this.getProfil();

}])