/**
 * Created by chitrankdixit on 1/27/16.
 */
'use strict';
app.controller('LogoutCtrl', function ($scope, $state, $http) {
  $scope.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];
  $scope.user = {};
  //$scope.loginUser = function(){
  //  var authData = $scope.user;
  //  $http.post('http://127.0.0.1:8000/api-token-auth/', authData).success(function(data){
  //    $http({
  //      method  : 'POST',
  //      url     : 'http://127.0.0.1:8000/api/v1/auth/login/',
  //      data    : authData,  // pass in data as strings
  //      headers : { "Content-Type": "application/json", "Authorization": "JWT "+data.token  }  // set the headers so angular passing info as form data (not request payload)
  //    })
  //      .success(function(data){
  //        console.log(data);
  //        $state.go('app.dashboard');
  //
  //
  //      });
  //  });


  //}


});
