'use strict';
app.controller('LoginCtrl', function ($scope, $state, $http, $window) {
    $scope.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
    ];
    $scope.user = {};
    $scope.loginUser = function(){
        var authData = $scope.user;
        $http.post('http://127.0.0.1:8000/api-token-auth/', authData).success(function(data){
            var token = data.token;
            $http({
                method  : 'POST',
                url     : 'http://127.0.0.1:8000/api/v1/auth/login/',
                data    : authData,  // pass in data as strings
                headers : { "Content-Type": "application/json", "Authorization": "JWT "+data.token  }  // set the headers so angular passing info as form data (not request payload)
            })
                    .success(function(data){
                        console.log(data, data.username , data.first_name, token, data.last_name, data.email);
                        var userdata = { "username": data.username, "first_name": data.first_name , "token": token , "last_name": data.last_name, "email": data.email};
                        $window.localStorage.setItem('userdata', JSON.stringify(userdata));
                        $state.go('app.dashboard');


              });
        });

    }
});
