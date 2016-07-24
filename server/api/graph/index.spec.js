'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var graphCtrlStub = {
  index: 'graphCtrl.index'
};

var routerStub = {
  get: sinon.spy()
};

// require the index with our stubbed out modules
var graphIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './graph.controller': graphCtrlStub
});

describe('Graph API Router:', function() {

  it('should return an express router instance', function() {
    expect(graphIndex).to.equal(routerStub);
  });

  describe('GET /api/graphs', function() {

    it('should route to graph.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'graphCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

});
