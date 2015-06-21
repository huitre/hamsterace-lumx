angular.module('Hamsterace.Services').factory('StatsService',
['$translate', '$http', '$rootScope',
function ($translate, $http, $rootScope) {
  var _urls = {
    
  }, self = {}

  self.contentToUnits = function (data) {
    var units = ['units.cm', 'units.m', 'units.km'],
        a = 0;
        tmp = data;

    // check if meter
    data /= 100;
    if (data >= 1) 
      a = 1;
    // check if km
    data /= 10000;
    if (data > 0.1)
      a = 2;
    else
      data *= 10000;
    if (a == 0)
      data = tmp;
    
    return Math.round(data*100)/100 + $translate.instant(units[a]);
  }
  return self;
}]);