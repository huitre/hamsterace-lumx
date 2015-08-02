/* 
* @Author: huitre
* @Date:   2015-06-27 14:38:20
* @Last Modified by:   huitre
* @Last Modified time: 2015-07-05 19:59:40
*/

'use strict';
 
angular.module('Hamsterace').controller('TeamsController',
['$scope', 'Sidebar', 'TeamService', '$translate',
function ($scope, Sidebar, TeamService, $translate) {
  var self = this;

  $scope.title = 'ui.teams';
  // main template dependency
  $scope.SideBar = Sidebar;
  $scope.dataLoading = true;
  $scope.request = {};
  $scope.search = { term: '' };
  $scope.user = {};

  $scope.$watch('search.term', function(newValue, oldValue) {
    if (newValue != oldValue && newValue)
      TeamService.getTeamByName(newValue).then(function (team) {
        $scope.foundTeams = team;
      })
    }, true);
  
  $scope.makeRequest = function (teamId) {
    if (teamId) {
      TeamService.requestInvitation(teamId).then(function (r) {
        if (r)
          $scope.request[teamId] = true;
      })
    }
  }
  
  TeamService.getMine().then(function (team) {
    if (team) {
      $scope.user.hasteam = true;
      $scope.team = team;
      console.log(team);
    } else {
      TeamService.getTeams().then(function (teams) {
        $scope.foundTeams = teams
      });
    }
  });
}])