var fs = require('fs'),
  index = require('./');

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

index.createId = function(collection, doc) {
  return b();
};

index.save = function(db, destination) {
  destination = destination || 'db.json';
  fs.writeFileSync(destination, JSON.stringify(db));
};

index.load = function(source) {
  source = source || 'db.json';
  return JSON.parse(fs.readFileSync(source, 'utf-8'));
};

index.mixWith = function(lib) {
  index.set_(lib);
  lib.mixin(index);
};

module.exports = index;