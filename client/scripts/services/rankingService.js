/* 
* @Author: huitre
* @Date:   2015-05-10 19:41:04
* @Last Modified by:   huitre
* @Last Modified time: 2015-05-17 22:31:26
*/

angular.module('Hamsterace.Services').factory('RankingService',
['$http', '$rootScope', '$q',
function ($http, $rootScope, $q) {
  var _urls = {
    ranking: Config.api.url + 'ranking/',
  }, self = {}

  var getOrder = function (url) {
    switch (url) {
      case '/max':
        return { summary : ['max', 'sum', 'average'], activity : ['percent'] }
      break;
      case '/average':
        return { summary : ['average', 'sum', 'max'], activity : ['percent'] }
      break;
      case '/activity':
        return { activity : ['percent'], summary : ['sum', 'max', 'average']}
      break;
      default :
        return { summary : ['sum', 'max', 'average'], activity : ['percent'] }
      break;
    }
  };

  var toKm =function (distance) {
    var i = 0,
        units = ['cm', 'm', 'km'];
    while (distance > 1000) {
      i++;
      distance = distance / 1000;
    }

    return Math.round(distance * 100) /100 + units[i];
  }

  self.getRanking = function (url) {
     return $q(function(resolve, reject) {
        $http.get(_urls.ranking + url).then(function (ranking) {
          var order = getOrder(url.substr(url.lastIndexOf('/'))),
              data = {};

          ranking.data.map(function (ranking, index) {
            var rank = [];
            data[index] = {};
            for (var i in order) {
              for (var j in order[i]) {
                if (i == 'summary') {
                  rank.push(toKm(ranking[i][order[i][j]]));
                } else {
                  rank.push(Math.round(ranking[i][order[i][j]]*100)/100 + '%');
                }
              }
            }
            data[index].ranking = rank;
            data[index].friend = ranking.friend;
          })
          resolve(data);
        }, function (err) { reject(err) });
    });
  }

  return self;
}]);