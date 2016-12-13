# equal-array

[![Build Status](https://travis-ci.org/couralex/equal-array.svg?branch=master)](https://travis-ci.org/couralex/equal-array)
[![Coverage Status](https://coveralls.io/repos/github/couralex/equal-array/badge.svg?branch=master)](https://coveralls.io/github/couralex/equal-array?branch=master)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

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

## Installation

```
npm install equal-array
```

## Usage

```js
import EqualArray from 'equal-array';

const eq = new EqualArray();
// eq is a function

console.log(eq([1, 2, 3]) === eq([1, 2, 3])); //returns true

const map = new Map();
map.set(eq([1, 2 ,3]), 'a');
map.set(eq([1, 2 ,3]), 'b');
map.size(); // returns 1
map.has(eq([1, 2, 3])); // returns true
```

## Options

```js
const eq = new EqualArray({
 returnArray: false
 conversion: true
})
```

#### `returnArray`
*accepted values: `false` (default) or `true`*
If `returnArray` is `true`, the `eq` function returns a cloned array, otherwise a unique integer. The default is `false` to maximize performances.

#### `conversion`
*accepted values: `true` (default), `false`, or a callback*
Apply a conversion to the array elements before making the comparison. This is important if the array contains objects because they are compared by references, so :
```js
new Date(1995, 10) !== new Date(1995, 10)
```

if `conversion` is `false` then :
```js
eq([1, 2, new Date(1995, 10)]) !== eq([1, 2, new Date(1995, 10)])
```

if `conversion` is `true` then :
```js
eq([1, 2, new Date(1995, 10)]) === eq([1, 2, new Date(1995, 10)])
```
Setting `conversion` to `true` means that `EqualArray` will call the `valueOf()` function on each element (when applicable).

The `conversion` option also accepts a callback which takes as a parameter an element of an array and returns the value to be compared:
```js
const obj1 = {dummy: 1};
const obj2 = {dummy: 1};
const obj3 = {dummy: 99};
const callback = element => element.dummy;
const eq = new EqualArray({conversion: callback});
eq([obj1]) === eq([obj2])); // true
eq([obj1]) === eq([obj3])); // false
```
