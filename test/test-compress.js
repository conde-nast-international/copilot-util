'use strict';

var compress = require('../lib/internal/compress');
var expect = require('chai').expect;
var zlib = require('zlib');

describe('Compress', function() {
  var res = {};

  var str = '綾波 レイ Ayanami Rei';

  beforeEach(function() {
    res.headers = {
      'content-encoding': ''
    };
  });

  describe('unzip', function() {
    it('should uncompress gzip response data', function(done) {
      res.headers['content-encoding'] = 'gzip';

      zlib.gzip(new Buffer(str), function(err, buffer) {
        expect(err).to.equal(null);
        compress.unzip(res, buffer).done(function(buf) {
          expect(buf.toString()).to.equal(str);

          done();
        });
      });
    });

    it('should uncompress deflate response data', function(done) {
      res.headers['content-encoding'] = 'deflate';

      zlib.deflate(new Buffer(str), function(err, buffer) {
        expect(err).to.equal(null);
        compress.unzip(res, buffer).done(function(buf) {
          expect(buf.toString()).to.equal(str);

          done();
        });
      });
    });

    it('should reject non-buffer data', function(done) {
      res.headers['content-encoding'] = 'deflate';

      compress.unzip(res, str).done(null, function(err) {
        expect(err.code).to.eql('Z_DATA_ERROR');

        done();
      });
    });

    it('should not uncompress identity response data', function(done) {
      res.headers['content-encoding'] = 'identity';

      compress.unzip(res, new Buffer(str)).done(function(buf) {
        expect(buf.toString()).to.equal(str);

        done();
      });
    });

    it('should ignore empty/other encodings', function(done) {
      res.headers['content-encoding'] = '';

      compress.unzip(res, new Buffer(str)).done(function(buf) {
        expect(buf.toString()).to.equal(str);

        done();
      });
    });
  });
});
