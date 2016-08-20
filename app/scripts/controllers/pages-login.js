'use strict';
app.controller('LoginCtrl', function ($scope, $state, $http, $window) {
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

    $http({
      method: 'POST',
      url:   $scope.main.settings.apiUrl+'/o/token/',
      headers : { "Content-Type": "application/x-www-form-urlencoded"},
      transformRequest: function(obj) {
        var str = [];
        for(var p in obj)
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
      },
      data: authData
    }).success(function(data){
      var token = data.access_token;
      var refresh_token = data.refresh_token;
      $http({
        method  : 'POST',
        url     : $scope.main.settings.apiUrl+'/api/v1/auth/login/',
        data    : authData,  // pass in data as strings
        headers : { "Content-Type": "application/json", "Authorization": "bearer "+token  }  // set the headers so angular passing info as form data (not request payload)
      })
        .success(function(data){
          console.log(data, data.username , data.first_name, token, data.last_name, data.email);
          var userdata = { "username": data.username, "first_name": data.first_name , "token": token , "refresh_token": refresh_token,"last_name":data.last_name , "email": data.email};
          $window.localStorage.setItem('userdata', JSON.stringify(userdata));
          $state.go('app.dashboard');


        });
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

  }

});
