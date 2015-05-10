/* 
* @Author: huitre
* @Date:   2015-05-09 16:57:33
* @Last Modified by:   huitre
* @Last Modified time: 2015-05-10 12:35:53
*/


'use strict';
  
angular.module('Hamsterace').controller('LoginController',
    ['$scope', '$rootScope', '$location', 'AuthenticationService',
    function ($scope, $rootScope, $location, AuthenticationService) {
        // reset login status
        AuthenticationService.clearCredentials();
  
        $scope.login = function () {
            $scope.dataLoading = true;
            
            AuthenticationService.login({email : $scope.email, password : $scope.password}, function(response) {
                if(response.success) {
                    AuthenticationService.setCredentials(response);
                    $location.path('/me');
                } else {
                    $scope.error = response.message;
                    $scope.dataLoading = false;
                }
            });
        };
    }]);