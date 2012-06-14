
var ArrayIndex = require('./')
var inherits = require('util').inherits
var assert = require('assert')


/**
 * Create a "subclass".
 */

function Arrayish (length) {
  ArrayIndex.call(this, length)
}

// inherit from `ArrayIndex`
inherits(Arrayish, ArrayIndex)


// create an instance and run some tests
var a = new Arrayish(5)

assert.throws(function () {
  a[0]
}, /__get__/)

assert.throws(function () {
  a[0] = 0
}, /__set__/)


// now define an index getter/setter function
Arrayish.prototype.__get__ = function get (index) {
  return index
}

Arrayish.prototype.__set__ = function set (index, value) {
  this['_' + index] = value
}


assert.equal(0, a[0])
assert.equal(1, a[1])
assert.equal(2, a[2])
assert.equal(3, a[3])
assert.equal(4, a[4])

a[0] = 1
assert.equal(1, a['_0'])
a[1] = 2
assert.equal(2, a['_1'])
