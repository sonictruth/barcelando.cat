'use strict';

describe('Controller: MobileCtrl', function () {

  // load the controller's module
  beforeEach(module('barcelandoApp'));

  var MobileCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MobileCtrl = $controller('MobileCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MobileCtrl.awesomeThings.length).toBe(3);
  });
});
