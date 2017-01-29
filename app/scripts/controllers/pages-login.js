'use strict';
app.controller('LoginCtrl', function ($scope, $state, $http, $window, oauth, user, $location, $auth, toastr, AuthenticationFactory, Facebook,facebookService) {
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



  // Facebook sign in starts

  $scope.fbLogin = function() {
    FB.login()
      .then(function(response) {
        $scope.last_name = response.last_name;
      }
    );
  };




  // Google Sign in Auth Starts

  // This flag we use to show or hide the button in our HTML.
  $scope.signedIn = false;

  // Here we do the authentication processing and error handling.
  // Note that authResult is a JSON object.
  $scope.processAuth = function(authResult) {
    // Do a check if authentication has been successful.
    if(authResult['access_token']) {
      // Successful sign in.
      var data = {
        "grant_type": "convert_token",
        "client_id": $scope.main.settings.client_id,
        "client_secret": $scope.main.settings.client_secret,
        "backend": "facebook",
        "token": authResult["access_token"]
      };
      oauth.convert_social_token($scope.main.settings.apiUrl+"/auth/convert-token/", data).success(function(data){
        $state.go("app.dashboard");
      }).error(function(data){

      });
      $scope.signedIn = true;


      //     ...
      // Do some work [1].
      //     ...
    } else if(authResult['error']) {
      // Error while signing in.
      $scope.signedIn = false;

      // Report error.
    }
  };

  // When callback is received, we need to process authentication.
  $scope.signInCallback = function(authResult) {
    $scope.$apply(function() {
      $scope.processAuth(authResult);
      var data = {
        "grant_type": "convert_token",
        "client_id": $scope.main.settings.client_id,
        "client_secret": $scope.main.settings.client_secret,
        "backend": "google-oauth2",
        "token": authResult["access_token"]
      };
      oauth.convert_social_token($scope.main.settings.apiUrl+"/auth/convert-token/", data).success(function(data){
        $state.go("app.dashboard");
      }).error(function(data){

      });
      console.log(authResult);
    });
  };

  // Render the sign in button.
  $scope.renderSignInButton = function() {
    gapi.signin.render('signInButton',
      {
        'callback': $scope.signInCallback, // Function handling the callback.
        'clientid': $scope.main.settings.google_plus_client_id, // CLIENT_ID from developer console which has been explained earlier.
        'requestvisibleactions': 'http://schemas.google.com/AddActivity', // Visible actions, scope and cookie policy wont be described now,
                                                                          // as their explanation is available in Google+ API Documentation.
        'scope': 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email',
        'cookiepolicy': 'single_host_origin'
      }
    );
  };

  // Start function in this example only renders the sign in button.
  $scope.start = function() {
    $scope.renderSignInButton();
  };

  // Call start function on load.
  $scope.start();

  // Process user info.
// userInfo is a JSON object.
  $scope.processUserInfo = function(userInfo) {
    // You can check user info for domain.
    if(userInfo['domain'] == 'mycompanydomain.com') {
      // Hello colleague!
    }

    // Or use his email address to send e-mails to his primary e-mail address.
    sendEMail(userInfo['emails'][0]['value']);
  }

// When callback is received, process user info.
  $scope.userInfoCallback = function(userInfo) {
    $scope.$apply(function() {
      $scope.processUserInfo(userInfo);
    });
  };

// Request user info.
  $scope.getUserInfo = function() {
    gapi.client.request(
      {
        'path':'/plus/v1/people/me',
        'method':'GET',
        'callback': $scope.userInfoCallback
      }
    );
  };

  // TODO: This way we can signout
  // gapi.auth.signOut();



});
