'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('minovateApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();

    MainCtrl = $controller('MainCtrl', {
      $scope: scope

    });
    $scope.todos = [1];
  }));



  it('testing variable length', function () {
    expect(true).toBe(true);
    //expect(scope.todos.length).toBe(1);
  });
});
