reduce = function(collection, iterator, accumulator) {
  if (Array.isArray(collection)) {
    if (accumulator === undefined) {
      accumulator = collection[0];
      for (var j = 1; j < collection.length; j++) {
        accumulator = iterator(accumulator, collection[j]);
      }
    } else {
      for (var i = 0; i < collection.length; i++) {
        accumulator = iterator(accumulator, collection[i]);
      }
    }
  } else {
    var objectKeys = Object.keys(collection);
    if (accumulator === undefined) {
      accumulator = collection[objectKeys[0]];
      for (var l = 1; l < objectKeys.length; l++) {
        accumulator = iterator(accumulator, collection[objectKeys[l]]);
      }
    } else {
      for (var k in collection) {
        accumulator = iterator(accumulator, collection[k]);
      }
    }
  }
  return accumulator;
};


each = function(collection, iterator) {
 if (Array.isArray(collection)) {
    for (var i = 0; i < collection.length; i++) {
      iterator (collection[i], i, collection);
    }
  } else {
    for (var key in collection) {
      iterator (collection[key], key, collection);
    }
  }
};

// Extend a given object with all the properties of the passed in
// object(s).
//
// Example:
//   var obj1 = {key1: "something"};
//   _.extend(obj1, {
//     key2: "something new",
//     key3: "something else new"
//   }, {
//     bla: "even more stuff"
//   }); // obj1 now contains key1, key2, key3 and bla

//Using for loop
  extend = function (obj) {
    var newObj = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
      newObj = Object.assign(newObj, arguments[i]);
    }
    return newObj;
  }


/*using each
  extend = function(obj) {
    var newObj = {};
    each(arguments, function(arg) {
      console.log(arg);
      newObj = Object.assign(newObj, arg);
    });
  return newObj;
};
*/

/*using reduce
// make arguments into explicit array
// arguments = array-like object, not an actual array
// not returning newObj appropriately in looping
  extend = function(obj) {
    var newObj = {};
    return reduce(arguments, function(newObj, arg) {
      return Object.assign(newObj, arg);
    }, arguments[0]);

};
*/
// console.log(extend({}));
// console.log({ a: 'b' }.a);
// console.log(extend({ a: 'b' }.a));
// console.log(extend({ a: 1 },{ b: 1 }, { c: 1 }));
// console.log(Object.assign(Object.assign({ a: 1}, { b: 1}), {c: 1}));

// Like extend, but doesn't ever overwrite a key that already
// exists in obj
defaults = function(obj) {
  var newObj = arguments[0];
  for (var i = 1; i < arguments.length; i++) {
    for (var key in arguments[i]) {
      console.log('newObj: ', newObj,' arguments[i]: ', arguments[i], ' key: ', key)
      console.log('Object.keys: ', Object.keys(newObj));
      if (!Object.keys(newObj).includes(key)) {
        newObj[key] = arguments[i][key];
      }
    }
  }
  return newObj;
};

/*
var destination = {};
var source = { a: 1, b: 2, c: 'three' };
console.log(defaults(destination, source));
*/

// console.log(Object.assign(Object.assign({ a: 1}, { b: 1}), {c: 1}));

// Memorize an expensive function's results by storing them. You may assume
// that the function only takes primitives as arguments.
// memoize could be renamed to oncePerUniqueArgumentList; memoize does the
// same thing as once, but based on many sets of unique arguments.
//
// _.memoize should return a function that, when called, will check if it has
// already computed the result for the given argument and return that value
// instead if possible.
memoize = function(func) {
  var scenario = { };

  return function () {
    console.log(arguments);
    func.apply(this, arguments);
  }
};

add = function(a, b) {
  return a + b;
};

// console.log(add(1, 2));
memoize(add(1, 2));
memoize(add(1, 2));
