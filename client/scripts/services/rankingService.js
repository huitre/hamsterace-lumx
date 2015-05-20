/* 
* @Author: huitre
* @Date:   2015-05-10 19:41:04
* @Last Modified by:   huitre
* @Last Modified time: 2015-05-20 22:01:47
*/

angular.module('Hamsterace.Services').factory('RankingService',
['$http', '$rootScope', '$q', '$translate',
function ($http, $rootScope, $q, $translate) {
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
              data = {}, p = 1;

          ranking.data.map(function (ranking, index) {
            var rank = [], k;
            data[index] = {};
            for (var i in order) {
              for (var j in order[i]) {
                if (i == 'summary') {
                  rank.push({
                    text: $translate.instant('ranking.' + i), 
                    value : toKm(ranking[i][order[i][j]]) 
                  });
                } else {
                  rank.push({
                    text: $translate.instant('ranking.' + i), 
                    value: Math.round(ranking[i][order[i][j]]*100)/100 + '%'
                  })
                }
              }
            }
            k = p > 3 ? 4 : p;
            data[index].pos = { text: $translate.instant('ranking.rank.' + k), value : p, css : k };
            data[index].ranking = rank;
            data[index].friend = ranking.friend;
            p += 1;
          })
          resolve(data);
        }, function (err) { reject(err) });
    });
  }

  return self;
}]);