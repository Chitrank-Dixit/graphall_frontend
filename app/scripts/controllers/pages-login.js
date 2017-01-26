'use strict';
app.controller('LoginCtrl', function ($scope, $state, $http, $window, oauth, user, gplus, $location, $auth, toastr) {
    $scope.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
    ];
    $scope.user = {};
    //$scope.loginUser = function(){
    //    var authData = $scope.user;
    //    $http.post($scope.main.settings.apiUrl+'/api-token-auth/', authData).success(function(data){
    //        var token = data.token;
    //        $http({
    //            method  : 'POST',
    //            url     : $scope.main.settings.apiUrl+'/api/v1/auth/login/',
    //            data    : authData,  // pass in data as strings
    //            headers : { "Content-Type": "application/json", "Authorization": "JWT "+data.token  }  // set the headers so angular passing info as form data (not request payload)
    //        })
    //                .success(function(data){
    //                    console.log(data, data.username , data.first_name, token, data.last_name, data.email);
    //                    var userdata = { "username": data.username, "first_name": data.first_name , "token": token , "last_name": data.last_name, "email": data.email};
    //                    $window.localStorage.setItem('userdata', JSON.stringify(userdata));
    //                    $state.go('app.dashboard');
    //
    //
    //          });
    //    });
    //
    //}

  $scope.loginUser = function(){
    // var user_data = JSON.parse($window.localStorage.getItem('userdata'));
    var authData = {
      username: $scope.user.username,
      password: $scope.user.password,
      grant_type: 'password',
      client_id: $scope.main.settings.client_id,
      client_secret: $scope.main.settings.client_secret
    };

    oauth.create_or_refresh_token( $scope.main.settings.apiUrl+'/o/token/',authData).success(function(data){
      var token = data.access_token;
      var refresh_token = data.refresh_token;
      console.log(token, refresh_token);
      user.login($scope.main.settings.apiUrl+'/api/v1/auth/login/', authData, token).success(function(data){
        console.log(data, data.username , data.first_name, token, data.last_name, data.email);
        var userdata = { "username": data.username, "first_name": data.first_name , "last_name":data.last_name , "email": data.email};
        $window.localStorage.setItem('userdata', JSON.stringify(userdata));
        var tokendata = {"token": token , "refresh_token": refresh_token};
        $window.localStorage.setItem('tokendata', JSON.stringify(tokendata));
        $state.go('app.dashboard');
      }).error(function(data){

      });
    }).error(function (data) {

    });





    //$http.post($scope.main.settings.apiUrl+'o/token/', authData).success(function(data){
    //  var token = data.token;
    //  $http({
    //    method  : 'POST',
    //    url     : $scope.main.settings.apiUrl+'/api/v1/auth/login/',
    //    data    : authData,  // pass in data as strings
    //    headers : { "Content-Type": "application/json", "Authorization": "JWT "+data.token  }  // set the headers so angular passing info as form data (not request payload)
    //  })
    //    .success(function(data){
    //      console.log(data, data.username , data.first_name, token, data.last_name, data.email);
    //      var userdata = { "username": data.username, "first_name": data.first_name , "token": token , "last_name": data.last_name, "email": data.email};
    //      $window.localStorage.setItem('userdata', JSON.stringify(userdata));
    //      $state.go('app.dashboard');
    //
    //
    //    });
    //});

  };

  $scope.login = function() {
    $auth.login($scope.user)
      .then(function() {
        toastr.success('You have successfully signed in!');
        $location.path('/');
      })
      .catch(function(error) {
        toastr.error(error.data.message, error.status);
      });
  };

  $scope.authenticate = function(provider) {
    $auth.authenticate(provider)
      .then(function(data) {
        console.log(data);
        toastr.success('You have successfully signed in with ' + provider + '!');
        $location.path('/');
      })
      .catch(function(error) {
        if (error.message) {
          // Satellizer promise reject error.
          toastr.error(error.message);
        } else if (error.data) {
          // HTTP response error from server
          toastr.error(error.data.message, error.status);
        } else {
          toastr.error(error);
        }
      });
  };

});
