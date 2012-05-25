
var ArrayIndex = require('./')


/**
 * Create a "subclass".
 */

function Arrayish (length) {
  ArrayIndex.__ensureLength__(length)
}

// inherit from `ArrayIndex`
Arrayish.prototype = Object.create(ArrayIndex)

// define the index getter function
Arrayish.prototype.__get__ = function get (index) {
  console.error('invoking indexed getter: %d!', index)
  return index
}

module.exports = Arrayish
