/* 
* @Author: huitre
* @Date:   2015-06-27 14:38:20
* @Last Modified by:   huitre
* @Last Modified time: 2015-07-05 19:59:40
*/

'use strict';
 
angular.module('Hamsterace').controller('MyFriendController',
['$scope', 'Sidebar', 'MeService', 'UserService', 'LxNotificationService', '$translate',
function ($scope, Sidebar, MeService, UserService, LxNotificationService, $translate) {
  var self = this;

  $scope.title = 'ui.myfriend';
  // main template dependency
  $scope.SideBar = Sidebar;
  $scope.dataLoading = true;

  $scope.$watch('search.terms', function(newValue, oldValue) {
    debugger;
  });

  (function () {
    MeService.getFriends().then(function (data) {
      $scope.friends = data;
    })
    MeService.getWaitingFriends().then(function (data) {
      $scope.waiting = data;
    });
  })()

  this.filterWaiting = function (id) {
    $scope.waiting = $scope.waiting.filter(function (el, i) {
      if (el.id != id) {
        return true;
      }
    })
  }

  $scope.deleteFriend = function (id) {
    LxNotificationService.confirm(
      '',
      $translate.instant('ui.confirm.delete'),
      { cancel:$translate.instant('ui.disagree'), ok: $translate.instant('ui.agree') }, 
      function(answer) {
        if (answer) {
          MeService.deleteFriend(id).then(function (data) {
            $scope.friends = $scope.friends.filter(function (el, i) {
              if (el.id != id) {
                return true;
              }
            })
          })
        }
      }
    );
  }

  $scope.acceptFriend = function (id) {
    MeService.acceptFriend(id).then(function (data) {
      var obj = data.pop(),
          idx = 0;

      self.filterWaiting(id);
      $scope.friends.push(obj);
    })
  }

  $scope.refuseFriend = function (id) {
    LxNotificationService.confirm(
      '',
      $translate.instant('ui.confirm.delete'),
      { cancel:$translate.instant('ui.disagree'), ok: $translate.instant('ui.agree') }, 
      function(answer) {
        if (answer) {
          MeService.refuseFriend(id).then(function (data) {
            self.filterWaiting(data.id);
          })
        }
      }
    );
  }

}])