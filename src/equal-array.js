export default class EqualArray {

  constructor({conversion, returnArray} = {}) {
    this._root = new Map();
    this._id = 0;
    switch (conversion) {
       case undefined : this._convert = element => element ? element.valueOf() : element; break;
      case false : this._convert = element => element; break;
      default : this._convert = conversion;
    }
    this._returnArray = returnArray;
    return this.eq.bind(this);
  }

  eq(arr) {
    let node = this._root;
    for (let i = 0; i < arr.length; ++i) {
      const value = this._convert(arr[i]);
      if (node.has(value)) {
        node = node.get(value);
      } else {
        const child = new Map();
        node.set(value, child);
        node = child;
      }
    }
    if (node.returned === undefined) {
      if (this._returnArray) {
        node.returned = Object.freeze(arr.slice());
      } else {
        node.returned = this._id++;
      }
    }
    return node.returned;
  }
}
