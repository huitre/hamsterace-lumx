angular.module('Hamsterace.Directives', []).directive(
'bars', 
['StatsService',
function (StatsService) {
  return {
    restrict: 'E',
    replace: true,
    template: '<div class="chart"></div>',
    scope: {
      bar: '=data'
    },
    link: function (scope, element, attrs) {
      var domain = { x : 0, y : 0}, max, min,
          svg, focus, context, line,
          xAxis, yAxis,
          ow = element.width(), oh = element.height() || 300, eh = oh + 90,
          margin = {left: 8, top: 8, right: 8, bottom: 8},
          barWidth = 5,
          delta = 0;

      scope.$watch(attrs.data, function (newValue, oldValue) {    
        var data = newValue, chart;
        svg = d3.select(element[0])
        if (!data) 
          return;
        // domain
        min = d3.min(data, function (d) { return new Date(d.createdAt) }),
        max = d3.max(data, function (d) { return new Date(d.createdAt) })
        domain.x = [min, max];

        min = d3.min(data, function (d) { return d.content });
        max = d3.max(data, function (d) { return d.content });
        domain.y = [0, max];
        
        if (svg.select('svg')[0][0] == null) {
          // drawing elements
          svg = svg.append('svg')
            .attr('class', 'd3')
            .attr('width', ow - margin.left - margin.right)
            .attr('height', eh)
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
          focus = svg.append("g")
            .attr("class", "focus")
            .attr('width', ow - margin.left - margin.right)
            .attr('height', eh)
            .attr("transform", "translate(" + 40 + "," + margin.top + ")");

          focus.append('path')
          focus.append('g').attr('class', 'x axis')
          focus.append('g').attr('class', 'y axis')

        } else {
          focus = svg.select('.focus');
          svg.select('svg').attr('height', oh + 90);
          focus.attr('height', oh + 90)
        }


        // scales
        var x, x2, y, y2;

        x = d3.time.scale()
          .domain(domain.x)
          .rangeRound([margin.left, ow - margin.right -margin.left]);

        y = d3.scale.linear()
          .domain(domain.y)
          .rangeRound([oh - margin.top -margin.bottom, -margin.bottom]);


        // axxis
        xAxis = d3.svg.axis()
          .scale(x)
          .orient("bottom")
          .ticks(10)

        yAxis = d3.svg.axis()
          .scale(y)
          .orient("left")
          .tickFormat(function (d) { return StatsService.contentToUnits(d) })

        focus.select('.x.axis').attr('transform', 'translate(0,' + (oh - margin.bottom) + ')')
          .call(xAxis).selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", "-.55em")
            .attr("transform", "rotate(-90)" );
        focus.select('.y.axis').attr('transform', 'translate(' + (margin.left) + ',' + (margin.top) + ')').call(yAxis);

        // bar
        focus = focus.selectAll('.d3b').remove().data([]).data(data);
        focus.enter().append("rect")
          .attr("x", function(d) { return x(new Date(d.createdAt)); })
          .attr("y", function(d) { return y(d.content); })
          .attr("height", function(d) { return oh - margin.top - y(d.content); })
          .attr("width", barWidth - 2)
          .attr('class', 'd3b')
        focus.exit();

        var average = 40;

        var drawLines = d3.svg.line()
                //.defined(function(d) { return d.y != null; })
                .x(function (d) { 
                  return x(new Date(d.createdAt));
                })
                .y(function (d) {return y(average); })

        svg.select('path')
          .datum(data)
          .attr('class', 'chart')
          .attr('d', drawLines)
          .style('stroke-width', 1)
          .style('fill', '#fff')
          .style('stroke', '#3F51B5')
      });
    } 
  };
}]);