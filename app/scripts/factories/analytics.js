/**
 * Created by chitrankdixit on 8/20/16.
 */
'use strict';

app.factory('analytics', function ($http, $q) {
  return {
    list_tracking_sources : function (url, token) {
      return $http({
        method: 'GET',
        url: url,
        headers: {"Content-Type": "application/json", "Authorization": "bearer " +token}  // set the headers so angular passing info as form data (not request payload)
      });
    }
  }

});

