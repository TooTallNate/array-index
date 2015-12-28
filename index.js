
/**
 * Module dependencies.
 */

var Symbol = require('es6-symbol');
var debug = require('debug')('array-index');

var get = Symbol('get');
var set = Symbol('set');

/**
 * JavaScript Array "length" is bound to an unsigned 32-bit int.
 * See: http://stackoverflow.com/a/6155063/376773
 */

var MAX_LENGTH = Math.pow(2, 32);

/**
 * Module exports.
 */

module.exports = ArrayIndex;
ArrayIndex.get = get;
ArrayIndex.set = set;

/**
 * Subclass this.
 */

function ArrayIndex (length) {
  Object.defineProperty(this, 'length', {
    get: getLength,
    set: setLength,
    enumerable: false,
    configurable: true
  });

  Object.defineProperty(this, '__length', {
    value: 0,
    writable: true,
    enumerable: false,
    configurable: true
  });

  if (arguments.length > 0) {
    this.length = length;
  }
}

/**
 * You overwrite the "get" Symbol in your subclass.
 */

ArrayIndex.prototype[ArrayIndex.get] = function () {
  throw new Error('you must implement the `ArrayIndex.get` Symbol');
};

/**
 * You overwrite the "set" Symbol in your subclass.
 */

ArrayIndex.prototype[ArrayIndex.set] = function () {
  throw new Error('you must implement the `ArrayIndex.set` Symbol');
};

Object.defineProperty(ArrayIndex.prototype, '__get__', function () {

});

Object.defineProperty(ArrayIndex.prototype, '__get__', function () {

});

/**
 * Converts this array class into a real JavaScript Array. Note that this
 * is a "flattened" array and your defined getters and setters won't be invoked
 * when you interact with the returned Array. This function will call the
 * getter on every array index of the object.
 *
 * @return {Array} The flattened array
 * @api public
 */

ArrayIndex.prototype.toArray = function toArray () {
  var i = 0;
  var l = this.length;
  var array = new Array(l);
  for (; i < l; i++) {
    array[i] = this[i];
  }
  return array;
};

/**
 * Basic support for `JSON.stringify()`.
 */

ArrayIndex.prototype.toJSON = function toJSON () {
  return this.toArray();
};

/**
 * toString() override. Use Array.prototype.toString().
 */

ArrayIndex.prototype.toString = function toString () {
  var a = this.toArray();
  return a.toString.apply(a, arguments);
};

/**
 * inspect() override. For the REPL.
 */

ArrayIndex.prototype.inspect = function inspect () {
  var a = this.toArray();
  Object.keys(this).forEach(function (k) {
    a[k] = this[k];
  }, this);
  return a;
};

/**
 * Getter for the "length" property.
 * Returns the value of the "__length" property.
 */

function getLength () {
  debug('getting "length": %o', this.__length);
  return this.__length;
};

/**
 * Setter for the "length" property.
 * Calls "ensureLength()", then sets the "__length" property.
 */

function setLength (v) {
  debug('setting "length": %o', v);
  return this.__length = ensureLength(this, v);
};

/**
 * Ensures that getters/setters from 0 up to "_length" have been defined
 * on `Object.getPrototypeOf(this)`.
 *
 * @api private
 */

function ensureLength (self, _length) {
  var length;
  if (_length > MAX_LENGTH) {
    length = MAX_LENGTH;
  } else {
    length = _length | 0;
  }
  var proto = Object.getPrototypeOf(self);
  var cur = proto.__length | 0;
  var num = length - cur;
  if (num > 0) {
    var desc = {};
    debug('creating a descriptor object with %o entries', num);
    for (var i = cur; i < length; i++) {
      desc[i] = setup(i);
    }
    debug('calling `Object.defineProperties()` with %o entries', num);
    Object.defineProperties(proto, desc);
    proto.__length = length;
  }
  return length;
}

/**
 * Returns a property descriptor for the given "index", with "get" and "set"
 * functions created within the closure.
 *
 * @api private
 */

function setup (index) {
  function get () {
    return this[ArrayIndex.get](index);
  }
  function set (v) {
    return this[ArrayIndex.set](index, v);
  }
  return {
    enumerable: true,
    configurable: true,
    get: get,
    set: set
  };
}
