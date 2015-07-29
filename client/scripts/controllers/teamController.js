/* 
* @Author: huitre
* @Date:   2015-06-27 14:38:20
* @Last Modified by:   huitre
* @Last Modified time: 2015-07-05 19:59:40
*/

'use strict';
 
angular.module('Hamsterace').controller('TeamsController',
['$scope', 'Sidebar', 'TeamService', 'LxNotificationService', '$translate',
function ($scope, Sidebar, TeamService, UserService, LxNotificationService, $translate) {
  var self = this;

  $scope.title = 'ui.teams';
  // main template dependency
  $scope.SideBar = Sidebar;
  $scope.dataLoading = true;

  $scope.$watch('searchTeams', function(newValue, oldValue) {
    console.log(newValue, oldValue)
    if (newValue != oldValue && newValue)
      TeamService.getTeamByName(newValue).then(function (team) {
        console.log(team)
        $scope.foundTeams = team;
      })
    }, true);


}])