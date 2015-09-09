/* 
* @Author: huitre
* @Date:   2015-06-27 14:38:20
* @Last Modified by:   huitre
* @Last Modified time: 2015-07-05 19:59:40
*/

'use strict';
 
angular.module('Hamsterace').controller('TeamsController',
['$stateParams', '$scope', 'Sidebar', 'TeamService', '$translate', 'LxNotificationService',
function ($stateParams, $scope, Sidebar, TeamService, $translate, LxNotificationService) {
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
          $scope.request[teamId] = true
;      })
    }
  }

  $scope.deleteMember = function (memberId) {
    LxNotificationService.confirm(
      '',
      $translate.instant('ui.confirm.delete'),
      { cancel:$translate.instant('ui.disagree'), ok: $translate.instant('ui.agree') }, 
      function(answer) {
        if (answer && $scope.team)
          TeamService.rm($scope.team.id, memberId).then(function () {
            debugger;
          })
      }
    )
  }
  
  TeamService.getMine().then(function (team) {
    if (team) {
      $scope.user.hasteam = true;
      $scope.team = team;
      TeamService.getPendingUsers(team.id).then(function (users) {
        $scope.pending = users;
      })
    } else {
      TeamService.getTeams().then(function (teams) {
        $scope.foundTeams = teams
      });
    }
    $scope.dataLoading = false;
  });

}])