'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var snapshotCtrlStub = {
  index: 'snapshotCtrl.index'
};

var routerStub = {
  get: sinon.spy()
};

// require the index with our stubbed out modules
var snapshotIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './snapshot.controller': snapshotCtrlStub
});

describe('Snapshot API Router:', function() {

  it('should return an express router instance', function() {
    expect(snapshotIndex).to.equal(routerStub);
  });

  describe('GET /api/snapshots', function() {

    it('should route to snapshot.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'snapshotCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

});
