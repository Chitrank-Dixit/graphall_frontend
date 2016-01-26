'use strict';
app.controller('SignupCtrl', function ($scope, $state, $http) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.user = {};
    $scope.registerUser = function(){
    	var postDict = $scope.user;
    	$http.post('http://127.0.0.1:8000/api/v1'+'/accounts/', postDict).success(function(data){
    		$scope.userRegistered = data;
        var authData = {
          username: data.username,
          password: data.password
        };
        $http.post('http://127.0.0.1:8000/api-token-auth/', authData).success(function(data){
          $http({
            method  : 'POST',
            url     : 'http://127.0.0.1:8000/api/v1/auth/login/',
            data    : authData,  // pass in data as strings
            headers : { "Content-Type": "application/json", "Authorization": "JWT "+data.token  }  // set the headers so angular passing info as form data (not request payload)
          })
          .success(function(data){
            console.log(data);
              $state.go('app.dashboard');
          });
        });
    	});
    }
});
