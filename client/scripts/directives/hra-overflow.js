'use strict';

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
      scope : false,
      link: link
    }
  }
])