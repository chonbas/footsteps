'use strict';

var app = require('../..');
import request from 'supertest';

describe('Snapshot API:', function() {

  describe('GET /api/snapshots', function() {
    var snapshots;

    beforeEach(function(done) {
      request(app)
        .get('/api/snapshots')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          snapshots = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(snapshots).to.be.instanceOf(Array);
    });

  });

});
