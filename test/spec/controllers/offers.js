'use strict';

describe('Controller: OffersCtrl', function () {

  // load the controller's module
  beforeEach(module('barcelandoApp'));

  var OffersCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    OffersCtrl = $controller('OffersCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(OffersCtrl.awesomeThings.length).toBe(3);
  });
});
