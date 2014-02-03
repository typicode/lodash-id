// Set an empty reference to _
var _;

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

function createId() {
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
