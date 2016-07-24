'use strict';

describe('Component: VideoComponent', function () {

  // load the controller's module
  beforeEach(module('footstepsApp'));

  var VideoComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    VideoComponent = $componentController('video', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
