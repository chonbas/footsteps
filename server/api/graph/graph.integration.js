'use strict';

var app = require('../..');
import request from 'supertest';

describe('Graph API:', function() {

  describe('GET /api/graphs', function() {
    var graphs;

    beforeEach(function(done) {
      request(app)
        .get('/api/graphs')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          graphs = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(graphs).to.be.instanceOf(Array);
    });

  });

});
