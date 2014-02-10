var fs = require('fs'),
  index = require('./');

index.save = function(db, destination) {
  destination = destination || 'db.json';
  fs.writeFileSync(destination, JSON.stringify(db));
};

index.load = function(source) {
  source = source || 'db.json';
  return JSON.parse(fs.readFileSync(source, 'utf-8'));
};

// index.throttledSave = index._.throttle(index.save, 100);

var __throttledSave;

index.throttledSave = function() {
  __throttledSave = __throttledSave || index.get_().throttle(index.save, 100);
  __throttledSave.apply(this, arguments);
};

module.exports = index;