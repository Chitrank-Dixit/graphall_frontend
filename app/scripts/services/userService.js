/**
 * Created by chitrankdixit on 1/27/17.
 */
(function(){

  function userService($q, $http, $rootScope) {

    var services = {}; //Object to return
    var base_url = $rootScope.settings.api_base_url;

    services.getFilters = function(){
      var deferred = $q.defer();

      $http.get(base_url + 'get_time_slots')
        .success(handleSuccess)
        .error(handleError);

      return deferred.promise;
    }

    // private functions
    function handleSuccess(data) {
      deferred.resolve(data);
    }

    function handleError(error) {
      deferred.reject(error);
    }

    return services;

  }

  var userServiceArray = [
    "$q",
    "$http",
    "$rootScope",
    userService
  ];

  angular.module('minovateApp').service('userService', userServiceArray);

})();
