'use strict';

var core = require('..').core;
var expect = require('chai').expect;

describe('Core', function() {
  describe('Interface', function() {
    it('should export a promise implementation', function() {
      expect(core.Promise).to.be.a('function');
      expect(core.Promise.resolve).to.be.a('function');
    });

    it('should export a collection implementation', function() {
      expect(core.collection).to.be.a('object');
      expect(core.collection.List).to.be.a('function');
      expect(core.collection.Set).to.be.a('function');
    });
  });
});
