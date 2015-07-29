/* 
* @Author: huitre
* @Date:   2015-06-12 18:30:03
* @Last Modified by:   huitre
* @Last Modified time: 2015-07-05 20:04:25
*/

'use strict';

angular.module('Hamsterace.Services').factory('TeamService',
['$http', '$rootScope', '$q',
function ($http, $rootScope, $q) {
  var _urls = {
    exists: Config.api.url + 'team/by'

  }, self = {}, cStats = {data : [], time : new Date()};  

  self.getTeamByName = function (name) {
    return $http.get(_urls.exists + '/' + name).then(function (team) {
    	if (team.hasOwnProperty('data'))
      	return team.data;
      return [];
    })
  }

 
  return self;
}]);