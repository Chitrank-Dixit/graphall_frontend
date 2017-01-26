'use strict';

/**
 * @ngdoc function
 * @name minovateApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the minovateApp
 */
app
  .controller('MainCtrl', function ($scope, $http, $translate) {

    $scope.main = {
      title: 'Graphall',
      settings: {
        navbarHeaderColor: 'scheme-light',
        sidebarColor: 'scheme-light',
        brandingColor: 'scheme-light',
        activeColor: 'black-scheme-color',
        headerFixed: true,
        asideFixed: true,
        rightbarShow: false,
        apiUrl : 'http://127.0.0.1:8000',
        //apiUrl: 'https://api.graphall.in',
        // local app
        client_id: 'KRUcQy50AUZXehIWmPjwJBHWeMjTOBEcEZpamD7L',
        client_secret: 'hp1A3nq0h3KSsI2VnuX6SXlQoUEY7ntBFGAga3GU1Yo7mxrFPQkahWm1vG84bSPGV7feziBrlejvDxtSyMiNb242dQ4ZhgwMOc0YxAeKnnW2Ip6W1Q8fNBSHgigOVfQK',
        google_plus_client_id: '724790743603-cfa3cipn23la46p1acq0umbrdhrptkap.apps.googleusercontent.com',
        google_plus_client_secret: 'GoAz7892aXpYxTIKlhxtyO_k'
        // server app (now on ec2 not on rds)
        //client_id: "wmNGhxclGCFcSx7VD1DYqKmyjV3ha7qExRVoMHQl",
        //client_secret: "goXbQ6i35w4cTrrpdERFwI8SL0CFHcjmvKMACgXr2fmipDG9Os3x2KjqVIK1iUtuAPYc58pzKrPuRk0uAtaKAhnS90rvbRsE123qc2R7qtpufR1rTp7MrfL1Vt5Oedhw"
      }
    };

    // simple variable to test the karmajs tests
    $scope.todos = [1];

    $scope.ajaxFaker = function(){
      $scope.data=[];
      var url = 'http://www.filltext.com/?rows=10&fname={firstName}&lname={lastName}&delay=5&callback=JSON_CALLBACK';

      $http.jsonp(url).success(function(data){
        $scope.data=data;
        angular.element('.tile.refreshing').removeClass('refreshing');
      });
    };

    $scope.changeLanguage = function (langKey) {
      $translate.use(langKey);
      $scope.currentLanguage = langKey;
    };
    $scope.currentLanguage = $translate.proposedLanguage() || $translate.use();
  });
