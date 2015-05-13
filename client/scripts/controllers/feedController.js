angular.module('Hamsterace').controller('FeedController',
['$scope', '$rootScope', '$location', 'Sidebar', 'FeedService', '$http',
function ($scope, $rootScope, $location, Sidebar, FeedService, $http) {
  	$scope.SideBar = Sidebar;
  	$scope.title = 'appbar.feed';
	$scope.dataLoading = true;
	$scope.feed = [];
	FeedService.getFeed().success(function(response) {
	    $scope.dataLoading = false;
	    $scope.feed = response.feed;
	});
}]);