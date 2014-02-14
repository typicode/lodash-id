// Set an empty reference to _ because it's not known yet if it will be
// underscore or lodash
var _;

// UUID
// https://gist.github.com/LeverOne/1308368
/* jshint ignore:start */
function uuid(a,b){for(b=a='';a++<36;b+=a*51&52?(a^15?8^Math.random()*(a^20?16:4):4).toString(16):'-');return b}
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
  return uuid();
}

function insert(collection, doc) {
  var clone = _.clone(doc);

  if (!clone.hasOwnProperty('id')) clone.id = _.createId(collection, doc);

  collection.push(clone);

  return clone;
}

function update(collection, id, attrs) {
  var doc = _.get(collection, id);

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

function get_() {
  return _;
}

function mixWith(lib) {
  set_(lib);
  lib.mixin(this);
}

module.exports = {
  get_: get_,
  set_: set_,
  mixWith: mixWith,
  get: get,
  createId: createId,
  insert: insert,
  update: update,
  updateWhere: updateWhere,
  remove: remove,
  removeWhere: removeWhere  
};
