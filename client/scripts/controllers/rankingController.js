/* 
* @Author: huitre
* @Date:   2015-05-10 19:41:04
* @Last Modified by:   huitre
* @Last Modified time: 2015-05-20 22:51:46
*/

'use strict';

angular.module('Hamsterace').controller('RankingController',
['$scope', '$rootScope', '$location', '$translate', 'Sidebar', 'RankingService',
function ($scope, $rootScope, $location, $translate, Sidebar, RankingService) {
  $scope.SideBar = Sidebar;
  $scope.title = 'appbar.ranking';
  $scope.ranking = [];

  $scope.rankingFriendsChoice = [
      { url: 'friends', text: 'Le plus loin' },
      { url: 'friends/max', text: 'Le plus endurant' },
      { url: 'friends/average', text: 'Le plus regulier' },
      { url: 'friends/activity', text: 'Le sur-excite !' },
  ];

  $scope.rankingAllChoice = [
      { url: 'distance', text: 'Le plus loin' },
      { url: 'distance/max', text: 'Le plus endurant' },
      { url: 'distance/average', text: 'Le plus regulier' },
      { url: 'activity', text: 'Le sur-excite !' },
  ];


  console.log($scope.ranking);
  
  $scope.cbSelect = {
    exec: function(newVal, oldVal) {
      $scope.dataLoading = true;
      RankingService.getRanking(newVal.newValue.url).then(function(ranking) {
        $scope.dataLoading = false;
        $scope.ranking = ranking;
      });
    }
  };


}])