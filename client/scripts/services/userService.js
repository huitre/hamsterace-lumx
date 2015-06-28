/* 
* @Author: huitre
* @Date:   2015-06-27 14:58:10
* @Last Modified by:   huitre
* @Last Modified time: 2015-06-27 15:02:46
*/

'use strict';

angular.module('Hamsterace.Services').factory('UserService',
['$http', '$rootScope', '$q',
function ($http, $rootScope, $q) {
  var _urls = {
    index: Config.api.url + 'user/$id',
    friends: Config.api.url + 'user/$id/friends',
    followers: Config.api.url + 'user/$id/followers',
    badges: Config.api.url + 'user/$id/badges',
    wall: Config.api.url + 'user/$id/wall',
    request: Config.api.url + 'user/request',
    find: Config.api.url + 'user/find/$name'
  }, self = {};  

  
  return self;
}]);