/* 
* @Author: huitre
* @Date:   2015-05-10 19:41:04
* @Last Modified by:   huitre
* @Last Modified time: 2015-05-13 23:08:33
*/

'use strict';

angular.module('Hamsterace').controller('RankingController',
['$scope', '$rootScope', '$location', '$translate', 'Sidebar', 'RankingService',
function ($scope, $rootScope, $location, $translate, Sidebar, RankingService) {
  $scope.SideBar = Sidebar;
  $scope.title = 'appbar.ranking';

  $scope.rankingChoice = [
      { url: 'friends', text: 'Le plus loin' },
      { url: 'friends/max', text: 'Le plus endurant' },
      { url: 'friends/average', text: 'Le plus regulier' },
      { url: 'friends/activity', text: 'Le sur-excite !' },
  ];


  $scope.cbSelect = {
    exec: function(newVal, oldVal) {
      console.log(newVal);
      $scope.dataLoading = true;
      RankingService.getRanking(newVal.newValue.url).success(function(response) {
        $scope.dataLoading = false;
        $scope.ranking = response.ranking;
      });
    }
  };


}])