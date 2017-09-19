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

/*Using for loop
  extend = function (obj) {
    var newObj = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
      newObj = Object.assign(newObj, arguments[i]);
    }
    return newObj;
  }
*/

/*//using each
  extend = function(obj) {
    var newObj = obj;
    each(arguments, function(arg) {
      console.log(arg);
      newObj = Object.assign(newObj, arg);
    });
  return newObj;
};
*/

//using reduce
// make arguments into explicit array
// arguments = array-like object, not an actual array
// not returning newObj appropriately in looping
  extend = function(obj) {
    var newObj = obj;
    return reduce(arguments, function(newObj, arg) {
      return Object.assign(newObj, arg);
    }, arguments[0]);
};

// console.log(extend({}));
// console.log({ a: 'b' }.a);
// console.log(extend({ a: 'b' }.a));
 console.log(extend({ a: 1 },{ b: 1 }, { c: 1 }));
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



once = function(func) {
  // TIP: These variables are stored in a "closure scope" (worth researching),
  // so that they'll remain available to the newly-generated function every
  // time it's called.
  var alreadyCalled = false;
  var result;

  // TIP: We'll return a new function that delegates to the old one, but only
  // if it hasn't been called before.
  return function() {
    if (!alreadyCalled) {
      // TIP: .apply(this, arguments) is the standard way to pass on all of the
      // infromation from one function call to another.
      result = func.apply(this, arguments);
      alreadyCalled = true;
    }
    // The new function always returns the originally computed result.
    return result;
  };
};

// Memorize an expensive function's results by storing them. You may assume
// that the function only takes primitives as arguments.
// memoize could be renamed to oncePerUniqueArgumentList; memoize does the
// same thing as once, but based on many sets of unique arguments.
//
// _.memoize should return a function that, when called, will check if it has
// already computed the result for the given argument and return that value
// instead if possible.
/*
memoize = function(func) {
  var scenario={};

  return function() {
    if (scenario[JSON.stringify(arguments)] === undefined) {
      scenario[JSON.stringify(arguments)] = func.apply(this, arguments);
    }
    return scenario[JSON.stringify(arguments)];
  };
};

add = function(a, b) {
  return a + b;
};
*/

// console.log(add(1, 2));
// memoize(add(1, 2));
// memoize(add(1, 2));

/*
// Delays a function for the given number of milliseconds, and then calls
// it with the arguments supplied.
//
// The arguments for the original function are passed after the wait
// parameter. For example _.delay(someFunction, 500, 'a', 'b') will
// call someFunction('a', 'b') after 500ms
delay = function(func, wait) {
  var argArray = [];
  for (var i = 2; i < arguments.length; i++) {
    argArray.push(arguments[i]);
  }
  console.log(argArray);
  setTimeout(function () {
    func.apply(this, argArray);
  }, wait);

//  setTimeout(func, wait, func.apply(this, arguments));
//  console.log(this.arguments);
//  setTimeout(func, wait, arguments[2], arguments[3], arguments[4]);
};

function sayHello (name1, name2, name3) {
  console.log('helllllloooooo ', name1, name2, name3);
}

delay(sayHello, 3000, 'steve', 'nemo');
*/

/*
// TIP: This function's test suite will ask that you not modify the original
// input array. For a tip on how to make a copy of an array, see:
// http://mdn.io/Array.prototype.slice
shuffle = function(array) {
// create new empty array
// copy originating array into a working array
// using math.random * array.length, choose random element from working array
// push into new array and remove from working array
// repeat starting two steps above until all working array elements have been placed
  var shuffledArray = [];
  var workingArray = array.slice();
  var currentIndex = 0;
  for (var i = 0; i < array.length; i++) {
    currentIndex = Math.floor(Math.random() * workingArray.length);
    shuffledArray.push(workingArray[currentIndex]);
    workingArray.splice(currentIndex, 1);
  }
  return shuffledArray;
};

inputArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
shuffle(inputArray);
*/
