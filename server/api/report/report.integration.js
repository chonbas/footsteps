'use strict';

var app = require('../..');
import request from 'supertest';

describe('Report API:', function() {

  describe('GET /api/reports', function() {
    var reports;

    beforeEach(function(done) {
      request(app)
        .get('/api/reports')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          reports = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(reports).to.be.instanceOf(Array);
    });

  });

});
