/**
 * Created by chitrankdixit on 1/27/17.
 */
'use strict';

app.factory('Facebook', function($q, $window, $rootScope) {
  var resolve = function(errval, retval, deferred) {
    $rootScope.$apply(function() {
      if (errval) {
        deferred.reject(errval);
      } else {
        retval.connected = true;
        deferred.resolve(retval);
      }
    });
  };

  var _login = function(){
    var deferred = $q.defer();
    //first check if we already have logged in
    FB.getLoginStatus(function(response) {
      $rootScope.fbId=response.userID;
      if (response.status === 'connected') {
        // the user is logged in and has authenticated your
        // app
        console.log("fb user already logged in");
        deferred.resolve(response);
      } else {
        // the user is logged in to Facebook,
        // but has not authenticated your app
        FB.login(function(response){
          if(response.authResponse){
            console.log("fb user logged in");
            resolve(null, response, deferred);
          }else{
            console.log("fb user could not log in");
            resolve(response.error, null, deferred);
          }
        });
      }

    });

    return deferred.promise;
  };

  return{
    login: _login
  };
});
