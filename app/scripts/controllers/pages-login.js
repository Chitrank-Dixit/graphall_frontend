'use strict';
app.controller('LoginCtrl', function ($scope, $state, $http, $window, oauth, user, $location, $auth, toastr, AuthenticationFactory, Facebook) {
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

  window.fbAsyncInit = function() {
    FB.init({
      appId: '955689487890084',
      status: true,
      cookie: true,
      xfbml: true,
      version: 'v2.4'
    });
  };

  (function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));


  $scope.fbLogin = function() {
    // facebook login
    Facebook.login().then(function(response){
      var name=response.data.name.split(" ");
      var temp_mixpanel={
        "FacebookID":$rootScope.fbId,
        "EmailID":"",
        "FirstName":name[0],
        "LastName":name[1]
      };

      console.log('facebook Login');
      var temp={
        "social_id": response.authResponse.userID,
        "backend": "facebook",// or "google-plus"
        "token": response.authResponse.accessToken
      };


      var graphallAuth =  AuthenticationFactory.graphallAuth(temp);
      return graphallAuth;
    })
      .then(function(response){
        $state.go('root');
        vm.useraccessToken=response.data.access_token;
        if(API.isLocalStorageSupported) {
          window.localStorage.setItem("graphall_auth",JSON.stringify({"access_token":response.data.access_token}));
        }
        vm.existenceUserDetails();
      });
  };



  // This flag we use to show or hide the button in our HTML.
  $scope.signedIn = false;

  // Here we do the authentication processing and error handling.
  // Note that authResult is a JSON object.
  $scope.processAuth = function(authResult) {
    // Do a check if authentication has been successful.
    if(authResult['access_token']) {
      // Successful sign in.
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
      console.log(authResult);
    });
  };

  // Render the sign in button.
  $scope.renderSignInButton = function() {
    gapi.signin.render('signInButton',
      {
        'callback': $scope.signInCallback, // Function handling the callback.
        'clientid': '724790743603-cfa3cipn23la46p1acq0umbrdhrptkap.apps.googleusercontent.com', // CLIENT_ID from developer console which has been explained earlier.
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
