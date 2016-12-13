# equal-array

equal-array compares arrays by values instead of references.

## Why ?

It is mainly useful with an es6 Map or Set, where arrays, used as keys, are compared by references. For example :
```js
const map = new Map();
map.set([1, 2 ,3], 'a');
map.set([1, 2 ,3], 'b'); // the map will consider [1, 2 ,3] as a new key
map.size(); // returns 2 - with equal-array: returns 1
map.has([1, 2, 3]); // returns false - with equal-array: returns true
```
