'use strict';

describe('Component: MyvideoComponent', function () {

  // load the controller's module
  beforeEach(module('footstepsApp'));

  var MyvideoComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    MyvideoComponent = $componentController('myvideo', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
