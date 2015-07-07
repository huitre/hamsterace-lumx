angular.module('Hamsterace.Directives').directive(
'embedVideo', 
[ '$timeout',
function ($timeout) {
  return {
    restrict : 'E',
    replace : true,
    link : function (scope, element, attrs) {
      $timeout(function () {
        var videoType = function (src) {
          var type = [
                /.*youtube*/,
                /.*vimeo*/
              ], code = [
                '<iframe width="1280" height="750" src="https://www.youtube.com/embed/gDhbpZmhMC4" frameborder="0" allowfullscreen></iframe>',
                '<iframe src="{{src}}" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'
              ]
          for (var i in type) {
            if (src.match(type[i]))
              return code[i]
          }
          return '<video src="' + src + '" style="width: 100%" controls></video>';
        }
        element[0].innerHTML = videoType(element[0].innerText)
      })
    }
  }
}]);