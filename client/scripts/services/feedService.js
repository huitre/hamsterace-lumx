
angular.module('Hamsterace.Services').factory('FeedService',
['$cookieStore', '$http', '$rootScope',
function ($cookieStore, $http, $rootScope) {
	var _urls = {
	  feed: Config.api.url + 'me/feed',
	  signup: Config.api.url + 'signup'
	}, self = {}

	self.getFeed = function (callback) {
		return $http.get(_urls.feed)/*.then(function (res) {
          res.success = true;
          callback(res);
        }, function (e) {
          callback({success: false, message: e})
        });*/
	}

	return self;
}]);