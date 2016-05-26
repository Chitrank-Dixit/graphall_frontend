'use strict';

/**
 * @ngdoc function
 * @name minovateApp.controller:PagesProfileCtrl
 * @description
 * # PagesProfileCtrl
 * Controller of the minovateApp
 */
app
  .controller('ProfileCtrl', function ($scope, $window) {
    $scope.page = {
      title: 'Profile Page',
      subtitle: 'Place subtitle here...'
    };

    var user_data = JSON.parse($window.localStorage.getItem('userdata'));
    $scope.username = user_data['username'];
    $scope.first_name = user_data['first_name'];
    $scope.last_name = user_data['last_name'];
    $scope.email = user_data['email'];



  });
