(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var index = require('./');

index.save = function(db, destination) {
  destination = destination || 'db';
  localStorage.setItem(destination, JSON.stringify(db, null, 2));
};

index.load = function(source) {
  source = source || 'db';
  return JSON.parse(localStorage.getItem(source));
};

index.mixWith = function(lib) {
  index.set_(lib);
  lib.mixin(index);
};

index.mixWith(_);
},{"./":2}],2:[function(require,module,exports){
// Set an empty reference to _
var _;

// UUID
// https://gist.github.com/jed/982883
/* jshint ignore:start */
function b(
  a                  // placeholder
){
  return a           // if the placeholder was passed, return
    ? (              // a random number from 0 to 15
      a ^            // unless b is 8,
      Math.random()  // in which case
      * 16           // a random number from
      >> a/4         // 8 to 11
      ).toString(16) // in hexadecimal
    : (              // or otherwise a concatenated string:
      [1e7] +        // 10000000 +
      -1e3 +         // -1000 +
      -4e3 +         // -4000 +
      -8e3 +         // -80000000 +
      -1e11          // -100000000000,
      ).replace(     // replacing
        /[018]/g,    // zeroes, ones, and eights with
        b            // random hex digits
      )
}
/* jshint ignore:end */

// Copies properties from an docect to another
function __update(dest, src) {
  _.each(src, function(value, key) {
    dest[key] = value;
  });
}

// Removes an item from an array
function __remove(array, item) {
  var index = _.indexOf(array, item);
  if (index != -1) array.splice(index, 1);
}

function get(collection, id) {
  return _.find(collection, function (doc) {
    return doc.id === id;
  });
}

function createId(collection, doc) {
  return b();
}

function insert(collection, doc) {
  var clone = _.clone(doc);

  if (!clone.hasOwnProperty('id')) clone.id = _.createId(collection, doc);

  collection.push(clone);

  return clone;
}

function update(collection, id, attrs) {
  var doc = get(collection, id);

  if (doc) __update(doc, attrs);

  return doc;
}

function updateWhere(collection, whereAttrs, attrs) {
  var docs = _.where(collection, whereAttrs);

  docs.forEach(function(doc) {
    __update(doc, attrs);
  });

  return docs;
}

function remove(collection, id) {
  var doc = get(collection, id);

  __remove(collection, doc);

  return doc;
}

function removeWhere(collection, attrs) {
  var docs = _.where(collection, attrs);

  docs.forEach(function(doc) {
    __remove(collection, doc);
  });

  return docs;
}

function set_(lib) {
  _ = lib;
}

module.exports = {
  set_: set_,
  get: get,
  createId: createId,
  insert: insert,
  update: update,
  updateWhere: updateWhere,
  remove: remove,
  removeWhere: removeWhere  
};

},{}]},{},[1])