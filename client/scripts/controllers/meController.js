/* 
* @Author: huitre
* @Date:   2015-05-10 12:33:09
* @Last Modified by:   huitre
* @Last Modified time: 2015-06-26 18:42:20
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
  $scope.dayActivity = null;
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
      if ($scope.stats.hasOwnProperty('distance') &&
          $scope.stats.distance.hasOwnProperty('data')) {
        $scope.bar = $scope.stats.distance.data;
      } else {
        $scope.bar = null;
      }
    }
  }

  this.getActivity = function () {
    if ($scope.stats) {
      if ($scope.stats.hasOwnProperty('activity')) {
        $scope.activity = $scope.stats.activity.percent;
      } else {
        $scope.activity = null;
      }
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
    self.getStats(type).then(function (stats) {
      self.getActivity();
    })
    $scope.type = type;
  }

  $scope.setActivity = function (type) {
    self.getStats(type).then(function (stats) {
      self.getActivity();
    })
    $scope.type = type;
  }

  $scope.setDayActivity = function (type) {
    self.getStats(type).then(function (stats) {
      if ($scope.stats.hasOwnProperty('summary')) {
        $scope.dayActivity = $scope.stats.summary;
      } else {
        $scope.dayActivity = null;
        return;
      }
      for (var i in $scope.dayActivity) {
        $scope.dayActivity[i] = StatsService.contentToUnits($scope.dayActivity[i]);
      }
    })
  }

  $scope.getResume = function () {
    self.getStats('monthly').then(function () {
      if (!$scope.stats.hasOwnProperty('summary'))
        return;
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
  $scope.setDayActivity('hourly');
  $scope.getResume();
  this.getProfil();

}])