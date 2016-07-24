'use strict';

describe('Component: ReflectionComponent', function () {

  // load the controller's module
  beforeEach(module('footstepsApp'));

  var ReflectionComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    ReflectionComponent = $componentController('reflection', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
