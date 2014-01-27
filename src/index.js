(function(root) {

  var _ = root._ || require('underscore');
  
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

  // Copies properties from an object to another
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

  function createId(collection) {
    return b();
  }

  function insert(collection, obj) {
    var clone = _.clone(obj);

    if (!clone.hasOwnProperty('id')) clone.id = _.createId(collection);

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

  _.get = get;
  _.createId = createId;
  _.insert = insert;
  _.update = update;
  _.updateWhere = updateWhere;
  _.remove = remove;
  _.removeWhere = removeWhere;
})(this);
