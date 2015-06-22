/* 
* @Author: huitre
* @Date:   2015-06-12 18:30:03
* @Last Modified by:   huitre
* @Last Modified time: 2015-06-22 22:08:58
*/

'use strict';

angular.module('Hamsterace.Services').factory('MeService',
['$http', '$rootScope', '$q',
function ($http, $rootScope, $q) {
  var _urls = {
    me: Config.api.url + 'me/',
    friends: Config.api.url + 'me/friends',
    stats: Config.api.url + 'me/stats'
  }, self = {}, cStats = {data : [], time : new Date()};  

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

    // on retourne les datas en cache des 30 dernieres secondes
    if (cStats[type]) {
      if (new Date() - cStats[type].time < 30 * 1000) {
        return $q(function (resolve, reject) {
          resolve(cStats[type].data);
        });
      }
    }

    return $http.get(url).then(function (stats) {
      cStats[type] = {};
      cStats[type].data = stats.data;
      cStats[type].time = new Date();
      return stats.data;
    })
  }
  return self;
}]);