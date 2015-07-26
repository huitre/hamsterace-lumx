angular.module('Hamsterace.Directives').directive(
'embedVideo', 
[ '$timeout',
function ($timeout) {
  return {
    restrict : 'E',
    replace : true,
    link : function (scope, element, attrs) {
      var videoType = function (src) {
          var replace = {
              youtube : function (src, html) {
                return html.replace('{{src}}', src)
              },
              html5 : function (src, html) {
                return html.replace('{{src}}', src)
              }
            }, type = [
                { rx : /.*youtube*/, type : 'youtube' },
                { rx : /.*vimeo*/, type : 'vimeo' },
                { rx : /.*(mp4|ogg)*/, type : 'html5' }
              ], code = [
                '<iframe width="100%" src="{{src}}" frameborder="0" allowfullscreen></iframe>',
                '<iframe src="{{src}}" width="100%" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>',
                '<video src="{{src}}" style="width: 100%" controls></video>'
              ];

          for (var i in type) {
            if (src.match(type[i].rx)) {
              return replace[type[i].type](src, code[i]);
            }
          }
          return '<video src="' + src + '" style="width: 100%" controls></video>';
        }
      $timeout(function () {
        element[0].innerHTML = videoType(element[0].innerText);
      })
    }
  }
}]);