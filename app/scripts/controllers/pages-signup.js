'use strict';
app.controller('SignupCtrl', function ($scope, $http) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.user = {};
    $scope.registerUser = function(){
    	var postDict = $scope.user;
    	console.log(postDict);
    	$http.post(serverUrl+'/accounts', postDict).success(function(data){
    		$scope.userRegistered = data;
    		console.log($scope.userRegistered);
    	});
    }
});
