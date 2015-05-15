'use strict';
/*
exports.inject = function(app) {
  app.directive('exampleDirective', exports.directive);
  return exports.directive;
};

exports.directive = function() {
  return {
    restrict: 'E',
    template: '<ul><li><em>A simple list</em></li><li><em>But I can be anything you want.</em></li></ul>'
  };
};
*/

angular.module('Hamsterace').directive('hraOverflow', ['$document', 
  function($document) {
    function link (scope, element, attrs) {
      element.css({
       overflowY: 'auto',
       height: window.innerHeight - element.offset().top,
       display: 'block'
      })
    }
    return {
      link: link
    }
  }
])