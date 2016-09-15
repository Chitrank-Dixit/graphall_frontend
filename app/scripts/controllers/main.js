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
        // server app
        client_id: "Q8aATrW25ZGM9vZ02imbvzE0Akl5NP8VVnNLIHdl",
        client_secret: "OUd9RAcoXhgJZjb1Ui6Es0HW1rjjzNIo4YzbDwZbHOyaos3HS3pcdIwSCsKETNScovrIr52oqWJNyyv7sP7hE4H1cjCuTbqqBPKGPhGA7NKJ4SD1SLkWQ5BR5FnjxFJ0"
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
