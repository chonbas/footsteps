'use strict';

describe('Component: SentimenttestComponent', function () {

  // load the controller's module
  beforeEach(module('footstepsApp'));

  var SentimenttestComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    SentimenttestComponent = $componentController('sentimenttest', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
