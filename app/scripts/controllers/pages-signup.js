'use strict';
app.controller('SignupCtrl', function ($scope, $state, $http, $window) {
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
    $http.post($scope.main.settings.apiUrl+'/api/v1'+'/accounts/', postDict).success(function(response){
      console.log(response.data.username);
      $scope.userRegistered = response.data;
      var authData = {
        username: response.data.username,
        password: response.data.password,
        grant_type: "password",
        client_id: $scope.main.settings.client_id,
        client_secret: $scope.main.settings.client_secret
      };


      $http({
        method  : 'POST',
        url     : $scope.main.settings.apiUrl+'/o/token/',
        headers : { "Content-Type": "application/x-www-form-urlencoded" },
        transformRequest: function(obj) {
          var str = [];
          for(var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
        },
        data    : authData
      }).success(function(data){
        console.log(data);
        var token = data.access_token;
        var refresh_token = data.refresh_token;
        var client_dict = {
          "user": $scope.userRegistered.id,
          "plan": 1,
          "access_level": 1
        };

        $http({
          method  : 'POST',
          url     : $scope.main.settings.apiUrl+'/api/v1/clients/',
          data    : client_dict,
          headers : { "Content-Type": "application/json", "Authorization": "bearer "+token}
        }).success(function(data){
          console.log(data);
          var loginData = {
            username: authData.username,
            password: authData.password
          };
          $http({
            method  : 'POST',
            url     : $scope.main.settings.apiUrl+'/api/v1/auth/login/',
            data    : loginData,
            headers : { "Content-Type": "application/json", "Authorization": "bearer "+token  }
          }).success(function(data){
            console.log(data);
            var userdata = { "username": $scope.userRegistered.username, "first_name": $scope.userRegistered.first_name , "token": token, "refresh_token": refresh_token, "last_name": $scope.userRegistered.last_name , "email": $scope.userRegistered.email};
            $window.localStorage.setItem('userdata', JSON.stringify(userdata));
            $state.go('app.dashboard');
          })
        });
      });

      //$http.post($scope.main.settings.apiUrl+'/o/token/', authData).success(function(data){
      //  var token = data.token;
      //  var client_dict = {
      //    "user": data.id,
      //    "plan": 1,
      //    "access_level": 1
      //  };
      //  //$http.post($scope.main.settings.apiUrl+'/api/v1/clients/', client_dict).success(function(data){
      //  //  console.log(data);
      //  //});
      //
      //  $http({
      //    method  : 'POST',
      //    url     : $scope.main.settings.apiUrl+'/api/v1/clients/',
      //    data    : client_dict,  // pass in data as strings
      //    headers : { "Content-Type": "application/json", "Authorization": "JWT "+data.token  }  // set the headers so angular passing info as form data (not request payload)
      //  })
      //    .success(function(data){
      //      console.log(data);
      //    });
      //
      //  $http({
      //    method  : 'POST',
      //    url     : $scope.main.settings.apiUrl+'/api/v1/auth/login/',
      //    data    : authData,  // pass in data as strings
      //    headers : { "Content-Type": "application/json", "Authorization": "JWT "+data.token  }  // set the headers so angular passing info as form data (not request payload)
      //  })
      //    .success(function(data){
      //      console.log(data);
      //      var userdata = { "username": data.username, "first_name": data.first_name , "token": token , "last_name": data.last_name , "email": data.email};
      //      $window.localStorage.setItem('userdata', JSON.stringify(userdata));
      //      $state.go('app.dashboard');
      //    });
      //});
    });
  }



});
