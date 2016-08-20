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
        apiUrl : 'http://127.0.0.1:8000',//'https://api.graphall.in' //'http://52.37.136.11/'
        // local app
        client_id: 'gAlrtlR74JzfLovtq3dpfvm7P1P1yOUvOwzXgfHe',
        client_secret: 'Yn8hagxRokUN6aEC1Ms4Mu7QGTd6n4Cy4yD2bFGdiWD68cWxa1YmtbpcRUmH0IsqB0Jw6PFpeCoauTXw3BwWPtEsRLiQmIWmITvRkOazOWXMG7dbC3FqCSQVlFu2cuH3'

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
