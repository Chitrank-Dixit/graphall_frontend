/**
 * Created by chitrankdixit on 1/27/16.
 */
'use strict';

/**
 * @ngdoc function
 * @name minovateApp.controller:MailInboxCtrl
 * @description
 * # MailInboxCtrl
 * Controller of the minovateApp
 */
app
  .controller('ListSourcesCtrl', function ($scope, $resource, $http, $window) {
    $scope.page = {
      title: 'List all Sources',
      subtitle: ''
    };
    var userdata = JSON.parse($window.localStorage.getItem('userdata'));
    console.log(userdata);
    var token = { 'token': userdata['token']};
    console.log(token);
    $http.post('http://127.0.0.1:8000/api-token-refresh/', token ).success(function(data) {
      if (data.token) {
        $http({
          method: 'GET',
          url: 'http://127.0.0.1:8000/api/v1/tracking_source/',
          headers: {"Content-Type": "application/json", "Authorization": "JWT " + data.token}  // set the headers so angular passing info as form data (not request payload)
        }).success(function (data) {
          $scope.source_list = data;
        });
      }
    });
  });

