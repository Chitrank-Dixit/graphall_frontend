/**
 * Created by chitrankdixit on 1/26/17.
 */
/**
 * Created by chitrankdixit on 8/20/16.
 */
'use strict';

app.factory('gplus', function ($http, $q) {
    var signIn;
    signIn = function () {
      var defered = $q.defer();
      $window.signinCallback = function (response) {
        $window.signinCallback = undefined;
        defered.resolve(response);
      };

      gapi.auth.signIn({
        clientid: '724790743603-cfa3cipn23la46p1acq0umbrdhrptkap.apps.googleusercontent.com',
        cookiepolicy: "single_host_origin",
        requestvisibleactions: "http://schemas.google.com/AddActivity",
        scope: "https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read",
        callback: "signinCallback"

      });
      return defered.promise;
    };
    return {
      signIn: signIn
    }

});



