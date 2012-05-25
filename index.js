
/**
 * Module dependencies.
 */

var debug = require('debug')('array-index')

/**
 * Here's a pure JS implementation.
 * A harmony proxy impl could help.
 */

var e = module.exports = {}

e.__ensureLength__ = function ensureLength (_length) {
  var length = _length | 0
  var cur = e.__length__ | 0
  var num = length - cur
  if (num > 0) {
    var desc = {}
    debug('creating a descriptor object with %d entries', num)
    for (var i = cur; i < length; i++) {
      desc[i] = setup(i)
    }
    debug('done creating descriptor object')
    debug('calling Object.defineProperties() with %d entries', num)
    Object.defineProperties(e, desc);
    debug('finished Object.defineProperties()')
    e.__length__ = length
  }
}

e.__get__ = function () {
  throw new Error('you have to implement the __get__ function')
}

e.__set__ = function () {
  throw new Error('you have to implement the __set__ function')
}

function setup (index) {
  function get () {
    return this.__get__(index)
  }
  function set (v) {
    return this.__set__(index, v)
  }
  return {
      enumerable: true
    , configurable: true
    , get: get
    , set: set
  }
}

// just define the 100,000 entries for you.
// takes like 450ms on my comp :\
debug('defining the first 100,000 entries')
e.__ensureLength__(100 * 1000)
debug('DONE defining the first 100,000 entries!')
