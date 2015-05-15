/* 
* @Author: huitre
* @Date:   2015-05-10 19:41:04
* @Last Modified by:   huitre
* @Last Modified time: 2015-05-13 23:06:09
*/

angular.module('Hamsterace.Services').factory('RankingService',
['$http', '$rootScope',
function ($http, $rootScope) {
  var _urls = {
    ranking: Config.api.url + 'ranking/',
  }, self = {}

  self.getRanking = function (url) {
    return $http.get(_urls.ranking + url)
  }

  return self;
}]);