array-index
===========
### Invoke getter/setter functions on array-like objects
[![Build Status](https://secure.travis-ci.org/TooTallNate/array-index.png)](http://travis-ci.org/TooTallNate/array-index)


This little module provides an `ArrayIndex` constructor function that you can
inherit from with your own objects. When a numbered property gets read, then the
`__get__` function on the object will be invoked. When a numbered property gets
set, then the `__set__` function on the object will be invoked.


Installation
------------

Install with `npm`:

``` bash
$ npm install array-index
```


Examples
--------

``` js
var ArrayIndex = require('array-index')
var inherits = require('util').inherits

function MyArray (length) {
  // be sure to call the ArrayIndex constructor in your own constructor
  ArrayIndex.call(this, length)
}

// inherit from the ArrayIndex's prototype
inherits(MyArray, ArrayIndex)

MyArray.prototype.__get__ = function (index) {
  return index * 2
}


// and now you can create some instances
var a = new MyArray(100)
a[0] // 0
a[1] // 2
a[2] // 4
a[3] // 6

a[0] = 1
// Error: you must implement the __set__ function
```


License
-------

(The MIT License)

Copyright (c) 2012 Nathan Rajlich &lt;nathan@tootallnate.net&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
