angular.module('Hamsterace.Services', []);
angular.module('Hamsterace.Components', []);
angular.module('Hamsterace.Directives', []);

angular.module('Hamsterace', [
  'lumx',
  'ui.router', 
  'ngCookies',
  'pascalprecht.translate',
  'Hamsterace.Services',
  'Hamsterace.Components',
  'Hamsterace.Directives'
  ]
);