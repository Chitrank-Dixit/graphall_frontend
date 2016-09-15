/**
 * Created by chitrankdixit on 8/20/16.
 */
'use strict';

app.factory('oauth', function ($http, $q) {
  return {
    create_or_refresh_token : function (url, authData) {
      return $http({
        method: 'POST',
        url:   url,
        headers : { "Content-Type": "application/x-www-form-urlencoded"},
        transformRequest: function(obj) {
          var str = [];
          for(var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
        },
        data: authData
      });
    }
  }

});


