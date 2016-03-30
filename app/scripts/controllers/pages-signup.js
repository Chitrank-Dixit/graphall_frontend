'use strict';
app.controller('SignupCtrl', function ($scope, $state, $http, $window) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.user = {};
    $scope.registerUser = function(){
    	var postDict = $scope.user;
    	$http.post($scope.main.settings.serverUrl +'/api/v1'+'/accounts/', postDict).success(function(data){
    		$scope.userRegistered = data;
        var authData = {
          username: data.username,
          password: data.password
        };
        $http.post($scope.main.settings.serverUrl +'/api-token-auth/', authData).success(function(data){
          var token = data.token;
          $http({
            method  : 'POST',
            url     : $scope.main.settings.serverUrl +'/api/v1/auth/login/',
            data    : authData,  // pass in data as strings
            headers : { "Content-Type": "application/json", "Authorization": "JWT "+data.token  }  // set the headers so angular passing info as form data (not request payload)
          })
          .success(function(data){
            console.log(data);
              var userdata = { "username": data.username, "first_name": data.first_name , "token": token , "last_name": data.last_name , "email": data.email};
              $window.localStorage.setItem('userdata', JSON.stringify(userdata));
              $state.go('app.dashboard');
          });
        });
    	});
    }
});
