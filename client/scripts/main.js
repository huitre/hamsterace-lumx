angular.module('Hamsterace').config( 
function($httpProvider, $stateProvider, $urlRouterProvider) {
    
    $httpProvider.defaults.withCredentials = true;

    $stateProvider.state('home', {
        url: "/",
        templateUrl: 'views/home.html',
        controller: 'LoginController'
    }).state('me', {
        url: "/me",
        templateUrl: 'views/me.html',
        controller: 'MeController'
    }).state('me/friends', {
        url: "/me/friends",
        templateUrl: 'views/friend.html',
        controller: 'MyFriendController'
    }).state('feed', {
        url: "/feed",
        templateUrl: 'views/feed.html',
        controller: 'FeedController'
    }).state('ranking', {
        url: "/ranking",
        templateUrl: 'views/ranking.html',
        controller: 'RankingController'
    }).state('user', {
        url: "/user/:id",
        templateUrl: 'views/teams.html',
        controller: 'TeamsController'
    }).state('teams', {
        url: "/teams",
        templateUrl: 'views/teams.html',
        controller: 'TeamsController'
    }).state('teams/edit', {
        url: "/teams/edit/:id",
        templateUrl: 'views/teams.html',
        controller: 'TeamsController'
    });

    // handle 403/401
    $httpProvider.interceptors.push([
    '$rootScope', '$q', '$location',
    function($rootScope, $q, $location) {
        return {
           'responseError': function(rejection) {
                if (rejection.status === 403 || rejection.status === 401) {
                    $rootScope.User = null;
                    $location.path('/');
                }
                return $q.reject(rejection);
            }
        };
    }]);

}).run(['$rootScope', '$location', '$cookieStore', '$http',
  function ($rootScope, $location, $cookieStore, $http) {
    // keep user logged in after page refresh
    $rootScope.User = $cookieStore.get('user') || {};
    
    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        // redirect to login page if not logged in
        if ($location.path() !== '/' && !$rootScope.User) {
            $location.path('/');
        }
    });

}]);

angular.module('Hamsterace').config(['$translateProvider', function ($translateProvider) {
  
  $translateProvider.translations('en', {
    'units.cm': 'cm',
    'units.m': 'm',
    'units.km': 'km',
    'ui.validate': 'Validate',
    'ui.connect': 'Sign up',
    'ui.ranking': 'Ranking',
    'ui.ranking.type': 'toto',
    'ui.profil' : 'Mon profil',
    'ui.feed': 'News feed',
    'ui.feed.text.reply': 'Comment',
    'ui.myfriend': 'My friends',
    'appbar.ranking': 'Ranking',
    'appbar.feed': 'Feed',
    'ranking.sum': 'Total',
    'ranking.max': 'Max',
    'ranking.average': 'Moyenne',
    'ranking.activity': 'Activité',
    'ranking.rank.1': 'st',
    'ranking.rank.2': 'nd',
    'ranking.rank.3': 'rd',
    'ranking.rank.4': 'th',
    'me.max': 'distance maximale',
    'me.sum': 'distance totale',
    'me.average': 'distance moyenne'
  });
 
  $translateProvider.translations('fr', {
    'units.cm': 'cm',
    'units.m': 'm',
    'units.km': 'km',
    'ui.validate': 'Valider',
    'ui.connect': 'S\'inscrire',
    'ui.ranking': 'Classement',
    'ui.ranking.type' : 'toto',
    'ui.profil' : 'Mon profil',
    'ui.feed': 'Vos actus !',
    'ui.feed.text.reply': 'Commentez...',
    'ui.myfriend': 'Mes amis',
    'appbar.ranking': 'Classements',
    'appbar.feed': 'Actus',
    'ranking.sum': 'Total',
    'ranking.max': 'Max',
    'ranking.average': 'Moyenne',
    'ranking.activity': 'Activité',
    'ranking.rank.1': 'er',
    'ranking.rank.2': 'eme',
    'ranking.rank.3': 'eme',
    'ranking.rank.4': 'eme',
    'me.max': 'distance maximale',
    'me.sum': 'distance totale',
    'me.average': 'distance moyenne'
  });
 
  $translateProvider.preferredLanguage('fr');
}]);
