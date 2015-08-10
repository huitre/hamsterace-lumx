/* 
* @Author: huitre
* @Date:   2015-06-12 18:30:03
* @Last Modified by:   huitre
* @Last Modified time: 2015-07-05 20:04:25
*/

'use strict';

angular.module('Hamsterace.Services').factory('MeService',
['$http', '$rootScope', '$q',
function ($http, $rootScope, $q) {
  var _urls = {
    me: Config.api.url + 'me/',
    friends: Config.api.url + 'me/friends',
    stats: Config.api.url + 'me/stats',
    waiting: Config.api.url + 'me/request',
    accept: Config.api.url + 'me/accept',
    refuse: Config.api.url + 'me/refuse',
    remove: Config.api.url + 'me/remove'

  }, self = {}, cStats = {data : [], time : new Date()};  

  self.getBasicProfil = function () {
    return $http.get(_urls.me).then(function (profil) {
      return profil.data.PersonDetail;
    })
  }

  self.getFriends = function () {
    return $http.get(_urls.friends).then(function (friends) {
      return friends.data;
    })
  }

  self.getWaitingFriends = function () {
    return $http.get(_urls.waiting).then(function (friends) {
      return friends.data;
    }) 
  }

  self.acceptFriend = function (id) {
    return $http.post(_urls.accept + '/' + id).then(function (friends) {
      return friends.data;
    }) 
  }

  self.deleteFriend = function (id) {
    return $http.post(_urls.remove + '/' + id).then(function (friends) {
      return friends.data;
    }) 
  }

  self.refuseFriend = function (id) {
    return $http.post(_urls.refuse + '/' + id).then(function (friends) {
      return friends.data;
    }) 
  }

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