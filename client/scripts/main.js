angular.module('Hamsterace').config(function($httpProvider, $stateProvider, $urlRouterProvider) {
    /*$urlRouterProvider.html5Mode({
        enabled: true,
        requireBase: false
    });*/
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.withCredentials = true;

    $stateProvider.state('home', {
        url: "/",
        templateUrl: 'views/home.html',
        controller: 'LoginController'
    });

    $stateProvider.state('me', {
        url: "/me",
        templateUrl: 'views/me.html',
        controller: 'MeController'
    });

    $stateProvider.state('ranking', {
        url: "/classement",
        templateUrl: 'views/ranking.html',
        controller: 'RankingController'
    });

}).run(['$rootScope', '$location', '$cookieStore', '$http',
  function ($rootScope, $location, $cookieStore, $http) {
    // keep user logged in after page refresh
    $rootScope.globals = $cookieStore.get('globals') || {};
    
    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        // redirect to login page if not logged in
        if ($location.path() !== '/' && !$rootScope.globals.currentUser) {
            $location.path('/');
        }
    });
}]);

angular.module('Hamsterace').config(['$translateProvider', function ($translateProvider) {
  
  $translateProvider.translations('en', {
    'ui.validate': 'Validate',
    'ui.connect': 'Sign up',
    'ui.ranking': 'Ranking',
    'ui.ranking.type' : 'toto',
    'appbar.ranking': 'Ranking'
  });
 
  $translateProvider.translations('fr', {
    'ui.validate': 'Valider',
    'ui.connect': 'S\'inscrire',
    'ui.ranking': 'Classement',
    'ui.ranking.type' : 'toto',
    'appbar.ranking': 'Classements'
  });
 
  $translateProvider.preferredLanguage('fr');
}]);