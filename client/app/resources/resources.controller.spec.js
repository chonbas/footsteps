'use strict';

describe('Component: ResourcesComponent', function () {

  // load the controller's module
  beforeEach(module('footstepsApp'));

  var ResourcesComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    ResourcesComponent = $componentController('resources', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
