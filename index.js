
/**
 * Module dependencies.
 */

var debug = require('debug')('array-index')

/**
 * Module exports.
 */

module.exports = ArrayIndex

/**
 * Subclass this.
 */

function ArrayIndex (length) {
  Object.defineProperty(this, 'length', {
    get: getLength,
    set: setLength,
    enumerable: false,
    configurable: false
  })

  Object.defineProperty(this, '__length', {
    value: 0,
    writable: true,
    enumerable: false,
    configurable: false
  })

  if (arguments.length > 0) {
    this.length = length
  }
}

/**
 * You overwrite the "__get__" function in your subclass.
 */

ArrayIndex.prototype.__get__ = function () {
  throw new Error('you must implement the __get__ function')
}

/**
 * You overwrite the "__set__" function in your subclass.
 */

ArrayIndex.prototype.__set__ = function () {
  throw new Error('you must implement the __set__ function')
}

/**
 * Getter for the "length" property.
 * Returns the value of the "__length" property.
 */

function getLength () {
  debug('getting "length"', this.__length)
  return this.__length
}

/**
 * Setter for the "length" property.
 * Calls "ensureLength()", then sets the "__length" property.
 */

function setLength (v) {
  debug('setting "length"', v)
  return this.__length = ensureLength(v)
}

/**
 * Ensures that getters/setters from 0 up to "_length" have been defined
 * on `ArrayIndex.prototype`.
 *
 * @api private
 */

function ensureLength (_length) {
  var length = _length | 0
  var cur = ArrayIndex.prototype.__length__ | 0
  var num = length - cur
  if (num > 0) {
    var desc = {}
    debug('creating a descriptor object with %d entries', num)
    for (var i = cur; i < length; i++) {
      desc[i] = setup(i)
    }
    debug('done creating descriptor object')
    debug('calling Object.defineProperties() with %d entries', num)
    Object.defineProperties(ArrayIndex.prototype, desc);
    debug('finished Object.defineProperties()')
    ArrayIndex.prototype.__length__ = length
  }
  return length
}

/**
 * Returns a property descriptor for the given "index", with "get" and "set"
 * functions created within the closure.
 *
 * @api private
 */

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
