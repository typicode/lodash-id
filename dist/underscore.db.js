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

index.mixWith(_);
},{"./":2}],2:[function(require,module,exports){
var _;

// UUID
// https://gist.github.com/LeverOne/1308368
/* jshint ignore:start */
function uuid(a,b){for(b=a='';a++<36;b+=a*51&52?(a^15?8^Math.random()*(a^20?16:4):4).toString(16):'-');return b}
/* jshint ignore:end */

module.exports = {
  // Copies properties from an docect to another
  __update: function(dest, src) {
    _.each(src, function(value, key) {
      dest[key] = value;
    });
  },
  
  // Removes an item from an array
  __remove: function(array, item) {
    var index = _.indexOf(array, item);
    if (index != -1) array.splice(index, 1);
  },
  
  get: function(collection, id) {
    return _.find(collection, function(doc) {
      return doc[_.id] === id;
    });
  },
  
  createId: function(collection, doc) {
    return uuid();
  },
  
  insert: function(collection, doc) {
    doc[_.id] = doc[_.id] || _.createId(collection, doc);
  
    collection.push(doc);
  
    return doc;
  },
  
  update: function(collection, id, attrs) {
    var doc = _.get(collection, id);
  
    if (doc) _.__update(doc, attrs);
  
    return doc;
  },
  
  updateWhere: function(collection, whereAttrs, attrs) {
    var docs = _.where(collection, whereAttrs);
  
    docs.forEach(function(doc) {
      _.__update(doc, attrs);
    });
  
    return docs;
  },
  
  remove: function(collection, id) {
    var doc = _.get(collection, id);
  
    _.__remove(collection, doc);
  
    return doc;
  },
  
  removeWhere: function(collection, attrs) {
    var docs = _.where(collection, attrs);
  
    docs.forEach(function(doc) {
      _.__remove(collection, doc);
    });
  
    return docs;
  },
  
  mixWith: function(lib) {
    _ = lib;
    _.id = 'id';
    _.mixin(this);

  }
};
},{}]},{},[1])