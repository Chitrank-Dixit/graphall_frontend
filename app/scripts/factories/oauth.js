/**
 * Created by chitrankdixit on 8/20/16.
 */
'use strict';

app.factory('oauth', function ($scope, $http) {
  return $http({
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
  });
});


