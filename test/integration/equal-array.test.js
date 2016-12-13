import {expect} from 'chai';
import EqualArray from '../../src/equal-array';

describe('EqualArray', function() {
  describe('with ES6 Map', function() {
    it('should make 2 arrays with same values be the same key', function () {
      const eq = new EqualArray();
      const map = new Map([
        [eq([1,2, new Date(1999, 10)]), 1],
        [eq([1,2, new Date(1999, 10)]), 2]
      ])
      expect(map.size).to.equal(1);
    });
  });
  describe('with ES6 Set', function() {
    it('should make 2 arrays with same values be the same key', function () {
      const eq = new EqualArray();
      const set = new Set([
        eq([1,2, new Date(1999, 10)]),
        eq([1,2, new Date(1999, 10)])
      ]);
      expect(set.size).to.equal(1);
    });
  });
});
