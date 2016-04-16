'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('minovateApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $translate) {
    scope = $rootScope.$new();

    MainCtrl = $controller('MainCtrl', {
      $scope: scope

    });
    //scope.todos = [1];
  }));



  it('testing variable length', function () {
    var todos = [1];
    console.log(todos,todos.length);
    //true === true
    expect(true).toBe(true);
  });
});
