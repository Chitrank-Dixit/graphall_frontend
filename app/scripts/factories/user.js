/**
 * Created by chitrankdixit on 8/20/16.
 */
'use strict';

app.factory('user', function ($http, $q) {
  return {
    login : function (url, authData, token) {
      return $http({
        method  : 'POST',
        url     : url,
        data    : authData,  // pass in data as strings
        headers : { "Content-Type": "application/json", "Authorization": "bearer "+token  }  // set the headers so angular passing info as form data (not request payload)
      });
    },

    logout: function(url, authData, token){
      return $http({
        method: 'POST',
        url: url, //,
        data : authData,
        headers: { "Content-Type": "application/json", "Authorization": "bearer "+token }
      })
    },

    register_user: function(url, postDict) {
      return $http({
        method : 'POST',
        url:   url,
        data: postDict,
        headers: { "Content-Type": "application/json"}
      });
    },

    create_client: function (url, client_data, token) {
      return $http({
        method  : 'POST',
        url     : url,
        data    : client_data,
        headers : { "Content-Type": "application/json", "Authorization": "bearer "+token}
      });
    }

  }

});
