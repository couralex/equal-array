import {expect} from 'chai';
import EqualArray from '../../src/equal-array';

describe('EqualArray', function() {
  describe('options: default', function() {
    it('should work with primitive elements', function () {
      const eq = new EqualArray();
      expect(eq([1, 2, 'a']) === eq([1, 2, 'a'])).to.be.true;
      expect(eq([1, 2, 'a']) === eq([1, 2, 'b'])).to.be.false;
    });
    it('should works with Date elements', function () {
      const eq = new EqualArray();
      expect(eq([1, 2, new Date(1997, 10)]) === eq([1, 2, new Date(1997, 10)])).to.be.true;
    });
    it('should work with undefined elements', function () {
      const eq = new EqualArray();
      expect(eq([1, undefined, 'a']) === eq([1, undefined, 'a'])).to.be.true;
      expect(eq([1, undefined, 'a']) === eq([1, 'a', undefined])).to.be.false;
    });
    it('should work with null elements', function () {
      const eq = new EqualArray();
      expect(eq([1, null, 'a']) === eq([1, null, 'a'])).to.be.true;
      expect(eq([1, null, 'a']) === eq([1, 'a', null])).to.be.false;
    });
    it('should work with empty arrays', function () {
      const eq = new EqualArray();
      expect(eq([]) === eq([])).to.be.true;
    });
    it('should return an id instead of an array', function () {
      const eq = new EqualArray();
      expect(eq([1, 2, 'a'])).not.to.deep.equal([1, 2, 'a']);
    });
  });
  describe('options: {returnArray: true}', function() {
    it('should return an array with the same values', function () {
      const eq = new EqualArray({returnArray: true});
      expect(eq([1, 2, new Date(1997, 10)])).to.deep.equal([1, 2, new Date(1997, 10)]);
    });
  });
  describe('options: {conversion: false}', function() {
    it('should turn off conversion', function () {
      const eq = new EqualArray({conversion: false});
      expect(eq([1, 2, new Date(1997, 10)]) === eq([1, 2, new Date(1997, 10)])).to.be.false;
    });
  });
  describe('options: {conversion: [callback]}', function() {
    it('should use the conversion', function () {
      const obj1 = {dummy: 1};
      const obj2 = {dummy: 1};
      const obj3 = {dummy: 2};
      const callback = ({dummy}) => dummy;
      const eq = new EqualArray({conversion: callback});
      expect(eq([obj1]) === eq([obj2])).to.be.true;
      expect(eq([obj1]) === eq([obj3])).to.be.false;
    });
  });
});
