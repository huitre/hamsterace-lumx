/* 
* @Author: huitre
* @Date:   2015-06-12 18:30:03
* @Last Modified by:   huitre
* @Last Modified time: 2015-06-20 11:59:53
*/

'use strict';

angular.module('Hamsterace.Services').factory('MeService',
['$cookieStore', '$http', '$rootScope',
function ($cookieStore, $http, $rootScope) {
  var _urls = {
    me: Config.api.url + 'me/',
    friends: Config.api.url + 'me/friends',
    stats: Config.api.url + 'me/stats'
  }, self = {}

  self.getBasicProfil = function (callback) {
    return $http.get(_urls.me).then(function (profil) {
      return profil.data.PersonDetails[0];
    })
  }

  self.getFriends = function (callback) {
    return $http.get(_urls.friends).then(function (friends) {
      return friends.data;
    }
)  }

  self.getStats = function (type, value, $scope) {
    var url = _urls.stats;
    if (type != null)
      url = _urls.stats + '/' + type;

    return $http.get(url).then(function (stats) {
      return stats.data;
    })
  }
  return self;
}]);