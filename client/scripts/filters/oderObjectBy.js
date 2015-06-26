angular.module('Hamsterace.Filters').filter('orderObjectBy', function(){
 return function(input, attribute) {
    if (!angular.isObject(input)) return input;

    var array = [];
    for(var objectKey in input) {
        array.push(input[objectKey]);
    }

    array.sort(function(a, b){
      var filter = '';
      if (attribute.indexOf('.')) {
        filter = attribute.split('.')
        for (var i in filter) { 
          a = a[filter[i]];
          b = b[filter[i]];
        }
      }
      return parseInt(a) - parseInt(b);
    });
    return array;
 }
});
