'use strict';
app.controller('SignupCtrl', function ($scope, $state, $http, $window, oauth, user) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.user = {};
    //$scope.registerUser = function(){
    //	var postDict = $scope.user;
    //	$http.post($scope.main.settings.apiUrl+'/api/v1'+'/accounts/', postDict).success(function(data){
    //		$scope.userRegistered = data;
    //    var authData = {
    //      username: data.username,
    //      password: data.password
    //    };
    //
    //
    //
    //    $http.post($scope.main.settings.apiUrl+'/api-token-auth/', authData).success(function(data){
    //      var token = data.token;
    //      var client_dict = {
    //        "user": data.id,
    //        "plan": 1,
    //        "access_level": 1
    //      };
    //      //$http.post($scope.main.settings.apiUrl+'/api/v1/clients/', client_dict).success(function(data){
    //      //  console.log(data);
    //      //});
    //
    //      $http({
    //        method  : 'POST',
    //        url     : $scope.main.settings.apiUrl+'/api/v1/clients/',
    //        data    : client_dict,  // pass in data as strings
    //        headers : { "Content-Type": "application/json", "Authorization": "JWT "+data.token  }  // set the headers so angular passing info as form data (not request payload)
    //      })
    //      .success(function(data){
    //        console.log(data);
    //      });
    //
    //      $http({
    //        method  : 'POST',
    //        url     : $scope.main.settings.apiUrl+'/api/v1/auth/login/',
    //        data    : authData,  // pass in data as strings
    //        headers : { "Content-Type": "application/json", "Authorization": "JWT "+data.token  }  // set the headers so angular passing info as form data (not request payload)
    //      })
    //      .success(function(data){
    //        console.log(data);
    //          var userdata = { "username": data.username, "first_name": data.first_name , "token": token , "last_name": data.last_name , "email": data.email};
    //          $window.localStorage.setItem('userdata', JSON.stringify(userdata));
    //          $state.go('app.dashboard');
    //      });
    //    });
    //	});
    //}
  $scope.registerUser = function(){
    var postDict = $scope.user;

    user.register_user($scope.main.settings.apiUrl+'/api/v1/accounts/', postDict).success(function(response){
      $scope.userRegistered = response.data;
      var authData = {
        username: response.data.username,
        password: response.data.password,
        grant_type: "password",
        client_id: $scope.main.settings.client_id,
        client_secret: $scope.main.settings.client_secret
      };
      oauth.create_or_refresh_token($scope.main.settings.apiUrl+'/o/token/', authData).success(function(data){
        var token = data.access_token;
        var refresh_token = data.refresh_token;
        var client_dict = {
          "user": $scope.userRegistered.id,
          "plan": 1,
          "access_level": 1
        };
        user.create_client($scope.main.settings.apiUrl+'/api/v1/clients/', client_dict, token).success(function(data){
          var loginData = {
            username: authData.username,
            password: authData.password
          };
          user.login($scope.main.settings.apiUrl+'/api/v1/auth/login/', loginData, token).success(function(data){
            var userdata = { "username": $scope.userRegistered.username, "first_name": $scope.userRegistered.first_name , "token": token, "refresh_token": refresh_token, "last_name": $scope.userRegistered.last_name , "email": $scope.userRegistered.email};
            $window.localStorage.setItem('userdata', JSON.stringify(userdata));
            $state.go('app.dashboard');
          }).error(function(data){

          });
        }).error(function(data){

        });

      }).error(function(data){

      });
    }).error(function(data){

    });


    }




});
