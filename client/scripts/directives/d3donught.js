angular.module('Hamsterace.Directives').directive(
'donught', [
function ($parse) {
  return {
    restrict: 'E',
    replace: true,
    template: '<div id="donught"></div>',
    scope: {
      activity: '=percent'
    },
    link: function (scope, element, attrs) {
      scope.$watch(attrs.percent, function (newValue, oldValue) {        
        if (newValue) {
          var data = [],
              chart,
              width = element.width(),
              height = 300,
              radius = Math.min(width, height) / 1.7,
              color, pie, arc, background, path,
              svg = d3.select(element[0]);

          data = [100 - scope.activity, scope.activity];

          color = d3.scale.category20();

          pie = d3.layout.pie()
              .sort(null);

          arc = d3.svg.arc()
              .innerRadius(radius - 80)
              .outerRadius(radius - 50)
              .cornerRadius(50)
              
          if (svg.select('svg')[0][0] == null) {
            svg = svg.append("svg")
                .attr("width", width)
                .attr("height", height)
                .append("g")
                .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

            background = svg.append("path")
                .data(pie([100]))
                .style("fill", "rgb(215, 215, 215)")
                .attr("d", arc)
          } else {
            svg = svg.select('g');
          }
          
          path = svg.selectAll(".p").remove().data([]).data(pie(data));
          path.enter().append("path")
              .attr("fill", function(d, i) { color = ['rgb(215, 215, 215)', '#2196F3']; return color[i]; })
              .attr("d", arc)
              .attr('class', 'p')
          path.exit();

          svg.select('text').remove();
          svg.append("text").text(Math.round(scope.activity) + ' %')
              .attr("text-anchor", "middle")
              .attr("dy",15)
              .attr("dx",2);
              
        }
      });
    } 
  };
}]);