/**
 * Created by chitrankdixit on 1/27/17.
 */
app.factory('AuthenticationFactory', function($q, $window, $rootScope) {
  // Private Variables
  var base_url ="http://api.flyrobeapp.com"//"http://localhost:8000";
  var services = {}; //API functions attached to this
  var OATH = {}; // Auth provider variable
  OATH.graphallAuth = {
    "grant_type": "convert_token",
    "client_id": "KRUcQy50AUZXehIWmPjwJBHWeMjTOBEcEZpamD7L",
    "client_secret": "hp1A3nq0h3KSsI2VnuX6SXlQoUEY7ntBFGAga3GU1Yo7mxrFPQkahWm1vG84bSPGV7feziBrlejvDxtSyMiNb242dQ4ZhgwMOc0YxAeKnnW2Ip6W1Q8fNBSHgigOVfQK"
    //"client_secret_web": "JTEMPAAqQwUCCDZUCx0JOgMDXxswCgEMOF0GBTESRBoDHiEKBEsnHRxbHjsjSwAEWVo2VSQFBTgpHhwjAEUjW1gIKRkhCxxbDSsWIg0BFyQOLRwnAAUXDDhZWzpVKwMRIzwKODAHOlgdPSI6MTc5HQQPViIfFkQEGDtdARQ2JQw=",// only  web and dashboard
  };

  // Return these function as api

  //Initialize Google authentication
  services.initGoogleAuth = function() {
    gapi.load('auth2', function() {
      var auth2 = gapi.auth2.init({
        client_id:'724790743603-cfa3cipn23la46p1acq0umbrdhrptkap.apps.googleusercontent.com',
        // client_id: '184913560004-2qv6qspe2ch0gm06tf9h0bm4pj6h9hfm.apps.googleusercontent.com',
        scope: "profile email"
      });
      var gAuth = gapi.auth2.getAuthInstance();
      // return google auth object in callback
      OATH.googleAuth = gAuth;
      console.log(OATH.googleAuth);
    });
  };

  // Social Login for Google
  services.googleLogin = function() {
    var deferred = $q.defer();

    OATH.googleAuth.signIn({
      'scope': 'profile email'
    }).then(function(response){
      deferred.resolve(response);
    });

    return deferred.promise; //return pomise
  };

  // Function for getting Flyrobe's Access Token, after Successful
  // Social Login
  services.graphallAuth = function(request_data){
    var deferred = $q.defer();

    // Extending request oject flyrobe auth
    $.extend(request_data, OATH.flyrobeAuth);

    //Making post request, to get Flyrobe's access-token
    $http({
      url: 'http://127.0.0.1:8000/auth/convert-token/',
      method: "POST",
      headers: {
        //'Content-Type': "application/x-www-form-urlencoded",
        'Content-Type':"application/json"
      },
      /*transformRequest: function(obj) {
       var str = [];
       for(var p in obj)
       str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
       return str.join("&");
       },*/
      data: request_data
    }).success(function (data) {
      deferred.resolve(data);
      vm.userCurrentWarehouse(data.data.access_token);
    })
      .error(function(error){
        deferred.reject(error);
      });
    return deferred.promise;
  };

  // Fetch user details from server

  services.userDetails=function(token){
    var local_cart = JSON.parse(localStorage.getItem("wishList"));
    if(local_cart) {
      vm.wishlistList = local_cart;
    }
    if(vm.wishlistList) {
      var wishlistData=[];
      if (vm.wishlistList.length > 0) {
        vm.wishlistList.forEach(function(col){
          wishlistData.push(col.id);
        });
        var wistlistItem={
          "parent_items": wishlistData
        };
        $http({
          method: 'POST',
          url: $rootScope.settings.api_url +'wishlist-items/',
          data:wistlistItem,
          headers: {
            Authorization  : 'Bearer '+vm.useraccessToken
          }
        }).success(function (response) {
          vm.wishlistLength=vm.wishlistList.length;
          window.localStorage.removeItem("wishList");
          if(response.meta.status==400){
            if(data.parent_items[0]=='Object with parent_id=3556 does not exist.'){
              window.localStorage.removeItem("wishList");
            }
          }
        });
      }
    }


    var deferred = $q.defer();
    $http({
      method: 'GET',
      url: $rootScope.settings.api_url +'users/',
      headers: {
        'Authorization'  : 'Bearer '+token,
        'Content-Type'   : 'application/json'
      }
    }).success(function (data) {
      deferred.resolve(data);
    }).error(function(error){
      deferred.reject(error);
    });
    return deferred.promise;
  };

  // Fetch user shopping cart details from server

  // logout
  // TODO: need to look into the logout
  // gapi.auth.signOut();






  return services;
});
