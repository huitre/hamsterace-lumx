angular.module('Hamsterace').config(function($httpProvider, $stateProvider, $urlRouterProvider) {
    
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

    $stateProvider.state('feed', {
        url: "/feed",
        templateUrl: 'views/feed.html',
        controller: 'FeedController'
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
    'ui.ranking.type': 'toto',
    'ui.feed': 'News feed',
    'ui.feed.text.reply': 'Comment',
    'appbar.ranking': 'Ranking',
    'appbar.feed': 'Feed',
    'ranking.summary': 'Distance',
    'ranking.max': 'Max',
    'ranking.average': 'Moyenne',
    'ranking.activity': 'Activité',
    'ranking.rank.1': 'st',
    'ranking.rank.2': 'nd',
    'ranking.rank.3': 'rd',
    'ranking.rank.4': 'th'
  });
 
  $translateProvider.translations('fr', {
    'ui.validate': 'Valider',
    'ui.connect': 'S\'inscrire',
    'ui.ranking': 'Classement',
    'ui.ranking.type' : 'toto',
    'ui.feed': 'Vos actus !',
    'ui.feed.text.reply': 'Commentez...',
    'appbar.ranking': 'Classements',
    'appbar.feed': 'Actus',
    'ranking.summary': 'Distance',
    'ranking.max': 'Max',
    'ranking.average': 'Moyenne',
    'ranking.activity': 'Activité',
    'ranking.rank.1': 'er',
    'ranking.rank.2': 'eme',
    'ranking.rank.3': 'eme',
    'ranking.rank.4': 'eme'
  });
 
  $translateProvider.preferredLanguage('fr');
}]);