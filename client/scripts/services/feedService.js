angular.module('Hamsterace.Services').factory('FeedService',
['$cookieStore', '$http', '$rootScope',
function ($cookieStore, $http, $rootScope) {
	var _urls = {
	  feed: Config.api.url + 'me/feed',
	  comment: Config.api.url + 'me/feed/comment/'
	}, self = {}

	self.getFeed = function (callback) {
		return $http.get(_urls.feed)
	}

  self.comment = function (id, value, $scope) {
    return $http.post(_urls.comment + id, {content : value})
  }
	return self;
}]);