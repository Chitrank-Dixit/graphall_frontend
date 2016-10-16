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
        //apiUrl : 'http://127.0.0.1:8000',
        apiUrl: 'https://api.graphall.in',
        // local app
        //client_id: 'pVxBe7J4E36fYYyxisURBv3GplUFMyg49b9guxXV',
        //client_secret: 'HMwtvPvZGhgCpfcC52mSDpcMJv6Ys1RqCtX0SKXmJfHAAnMnE7BhGLBRiawxGr83Jj5tsl2NT9YGWtTJLskSzJLrK3PBFGTX5XqnEciDmMG73FSTUUJms1XThxQbGxxt'
        // server app (now on ec2 not on rds)
        client_id: "wmNGhxclGCFcSx7VD1DYqKmyjV3ha7qExRVoMHQl",
        client_secret: "goXbQ6i35w4cTrrpdERFwI8SL0CFHcjmvKMACgXr2fmipDG9Os3x2KjqVIK1iUtuAPYc58pzKrPuRk0uAtaKAhnS90rvbRsE123qc2R7qtpufR1rTp7MrfL1Vt5Oedhw"
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
