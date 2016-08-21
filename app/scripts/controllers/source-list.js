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
  .controller('ListSourcesCtrl', function ($scope, $resource, $http, $window, oauth, analytics) {
    $scope.page = {
      title: 'List all Sources',
      subtitle: ''
    };
    var tokendata = JSON.parse($window.localStorage.getItem('tokendata'));
    console.log(tokendata);
    var refresh_token = tokendata['refresh_token'];
    var token = tokendata['token'];
    //console.log(token);
    var refreshTokenData = {
      grant_type: 'refresh_token',
      client_id: $scope.main.settings.client_id,
      client_secret: $scope.main.settings.client_secret,
      refresh_token: refresh_token
    };
    analytics.list_tracking_sources($scope.main.settings.apiUrl+'/api/v1/tracking_source/', token).success(function(response){
      $scope.source_list = response.data;
    }).error(function(data){
      oauth.create_or_refresh_token($scope.main.settings.apiUrl+'/o/token/', refreshTokenData).success(function(data){
        var token = data.access_token;
        var refresh_token = data.refresh_token;
        var tokendata = { "token": token, "refresh_token": refresh_token};
        $window.localStorage.setItem('tokendata', JSON.stringify(tokendata));
        analytics.list_tracking_sources($scope.main.settings.apiUrl+'/api/v1/tracking_source/', token).success(function(response){
          $scope.source_list = response.data;
        }).error(function(data){

        });
      }).error(function(data){

      });
    });

    //$http.post($scope.main.settings.apiUrl+'/api-token-refresh/', token ).success(function(data) {
    //  if (data.token) {
    //    $http({
    //      method: 'GET',
    //      url: $scope.main.settings.apiUrl+'/api/v1/tracking_source/',
    //      headers: {"Content-Type": "application/json", "Authorization": "JWT " + data.token}  // set the headers so angular passing info as form data (not request payload)
    //    }).success(function (data) {
    //      $scope.source_list = data;
    //      console.log($scope.source_list);
    //    });
    //  }
    //});

    $scope.mails = $resource('scripts/jsons/mails.json').query();

    $scope.selectedAll = false;

    $scope.selectAll = function () {

      if ($scope.selectedAll) {
        $scope.selectedAll = false;
      } else {
        $scope.selectedAll = true;
      }

      angular.forEach($scope.mails, function(mail) {
        mail.selected = $scope.selectedAll;
      });
    };
  });

