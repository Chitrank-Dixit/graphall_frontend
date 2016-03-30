/**
 * Created by chitrankdixit on 1/27/16.
 */
/**
 * Created by chitrankdixit on 1/26/16.
 */
'use strict';

/**
 * @ngdoc function
 * @name minovateApp.controller:SourceCtrl
 * @description
 * # SourceCtrl
 * Controller of the Graphall
 */
app
  .controller('AddSourceCtrl', function ($scope, $window, $http, $state) {
    $scope.page = {
      title: 'Add Source',
      subtitle: 'Place subtitle here...'
    };



    $scope.industry_category_choices = [
      { name: 'Education', id: 1},
      { name: 'Medical',id: 2},
      { name: 'Sports', id: 3},
      { name: 'Entertainment', id: 4},
      { name: 'Government', id: 5},
      { name: 'Personal', id: 6},
      { name: 'Ecommerce', id: 7},
      { name: 'Realestate', id: 8}
    ];


    // function to submit the form after all validation has occurred
    $scope.addSource = function(isValid) {
      console.log('validate form');

      // check to make sure the form is completely valid
      if (isValid) {
        console.log('our form is amazing');
        var userdata = JSON.parse($window.localStorage.getItem('userdata'));
        console.log(userdata);
        var token = { 'token': userdata['token']};
        console.log(token);
        $http.post($scope.main.settings.serverUrl +'/api-token-refresh/', token ).success(function(data){
          if (data.token) {
            $http({
              method: 'POST',
              url: $scope.main.settings.serverUrl +'/api/v1/tracking_source/',
              data: $scope.source.add,  // pass in data as strings
              headers: {"Content-Type": "application/json", "Authorization": "JWT " + data.token}  // set the headers so angular passing info as form data (not request payload)
            })
              .success(function (data) {
                console.log(data);
                $state.go('app.dashboard');


              });
          }
          else if (data.non_field_erros) {
            //var userdata = {'username': userdata['username'], ''}
            //$http.post('http://127.0.0.1:8000/api-token-refresh/', token ).success(function(data){
            //
            //});

          }
        });
      } else {
        console.log('form is invalid');
      }

    };

  });
