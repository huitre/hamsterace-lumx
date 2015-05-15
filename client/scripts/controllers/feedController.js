angular.module('Hamsterace').controller('FeedController',
['$scope', '$rootScope', '$location', 'Sidebar', 'FeedService', '$http', '$timeout',
function ($scope, $rootScope, $location, Sidebar, FeedService, $http, $timeout) {
	$scope.SideBar = Sidebar;
	$scope.title = 'appbar.feed';
	$scope.dataLoading = true;
	$scope.feed = [];
	
  FeedService.getFeed().success(function(response) {
	    $scope.dataLoading = false;
	    $scope.feed = response.feed;
	});

  $scope.onCommentSubmit = function () {
    // $this contains the current form element of feed.html
    var $this = this;
    if ($this.post.id > 0 && $this.reply.length) {
      $scope.dataLoading = true;
      FeedService.comment($this.post.id, $this.reply).success(function (post) {
        $scope.dataLoading = false;
        $timeout(function () {
          $scope.$apply(function () {
            for (var i in $scope.feed) {
              if ($scope.feed[i].id == post.PostId) {
                $scope.feed[i].Comments.push(post);
                $this.reply = '';
              }
            }
          })
        }, 0)
      });
    }
  }
}]);