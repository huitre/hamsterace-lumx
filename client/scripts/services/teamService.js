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
  var url = Config.api.url + 'team/';
  var _urls = {
    exists: url + 'by',
    request: url + ':id/request',
    teams: url + '',
    mine: url + 'mine',
  }, self = {}, cStats = {data : [], time : new Date()};  

  self.get = function (url, data) {
    return $http.get(url, data).then(function (team) {
      if (team.hasOwnProperty('data'))
        return team.data;
      return [];
    })
  }

  self.getTeamByName = function (name) {
    return self.get(_urls.exists + '/' + name);
  };

	self.requestInvitation = function (teamId) {
    return $http.post(_urls.request.replace(':id', teamId)).then(function (team) {
    	if (team.hasOwnProperty('data'))
      	return team.data;
      return [];
    })
  };

  self.getTeams = function (offset) {
    return self.get(_urls.teams);
  }

  self.getMine = function (offset) {
    return self.get(_urls.mine);
  }

  return self;
}]);