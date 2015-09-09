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
    rm: url + 'team/:id/members/remove',
    ok: url + 'team/:id/request/accept',
    wall: url + 'team/:id/wall',
    badges: url + 'team/:id/badges',
    stats: url + 'team/:id/stats'
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

  self.getPendingUsers = function (teamId) {
    return self.get(_urls.request.replace(':id', teamId));
  }

  self.getTeams = function (offset) {
    return self.get(_urls.teams);
  }

  self.rm = function (teamId, memberID) {
    return $http.post(_urls.request.replace(':id', teamId), {id: memberID});
  }

  self.getMine = function (offset) {
    var me = $rootScope.User;
    return self.get(_urls.mine).then(function (team) {
      var findIndex = function (members) {
        for (var i = members.length - 1; i; --i) {
          if (members[i].id == me.id)
            return i;
          return -1;
        }
      }, index = findIndex(team.members);
      team.owner = team.members.shift();
      team.me = null;
      if (index > -1 && team.owner.id != me.id) {
        team.me = team.members.splice(index, 1);
      }
      return team;
    })
  }

  return self;
}]);