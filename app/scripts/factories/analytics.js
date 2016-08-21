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
        headers: {"Content-Type": "application/json", "Authorization": "bearer "+token}  // set the headers so angular passing info as form data (not request payload)
      });
    },
    search_tracking_source: function(url, token) {
      return $http({
        method: 'GET',
        url: url, //$scope.main.settings.apiUrl+'/api/v1/tracking_data/?tracking_source_id='+$scope.source.show.source,
        headers: {"Content-Type": "application/json", "Authorization": "bearer "+token}  // set the headers so angular passing info as form data (not request payload)
      });
    },
    add_tracking_source : function(url, token, data) {
      return $http({
        method: 'POST',
        url: url, //$scope.main.settings.apiUrl+'/api/v1/tracking_source/',
        data: data, //$scope.source.add,  // pass in data as strings
        headers: {"Content-Type": "application/json", "Authorization": "bearer" +token}  // set the headers so angular passing info as form data (not request payload)
      });
    }
  }

});

