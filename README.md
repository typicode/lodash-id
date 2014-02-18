[![Build Status](https://travis-ci.org/typicode/underscore.db.png)](https://travis-ci.org/typicode/underscore.db)
[![NPM version](https://badge.fury.io/js/underscore.db.png)](http://badge.fury.io/js/underscore.db)
[![NPM version](https://badge.fury.io/bo/underscore.db.png)](http://badge.fury.io/bo/underscore.db)

# Underscore.db

__Adds functions to Underscore/Lo-Dash for manipulating database-like objects.__

It can be used in Node, node-webkit and the browser.

It adds `get`, `insert`, `update`, `updateWhere`, `remove`, `removeWhere`, `save`, `load` and `createId`.

## Example

```javascript
db = {};
db.posts = [];

var post = _.insert(db.posts, {title: 'foo'});

_.save(db);
```

Or you can try it online [here](http://typicode.github.io/underscore.db/).

## Install

```bash
$ npm install underscore underscore.db
```

```javascript
var _ = require('underscore');
require('underscore.db').mixWith(_);
```

```bash
$ bower install underscore underscore.db
```

```html
<script src="underscore.js" type="text/javascript"></script>
<script src="underscore.db.js" type="text/javascript"></script>
```

Underscore.db is compatible with Lo-Dash, just replace `underscore` with `lodash`

## API

Database example:

```javascript
var db = {
  posts: [
    {id: 1, body: 'one', published: false},
    {id: 2, body: 'two', published: true}
  ],
  comments: [
    {id: 1, body: 'foo', postId: 1},
    {id: 2, body: 'bar', postId: 2}
  ]
}
```

### id

Overwrite it if you want to use another id property.

```javascript
_.id = '_id';
```

### createId

__createId(collectionName, doc)__

Called by Underscore.db when a document is inserted. Overwrite it if you want to change id generation algorithm.

```javascript
_.createId = function(collectionName, doc) {
  return collectionName + '-' + doc.name + '-' + _.random(1, 9999);
}
```

### get

__get(collection, id)__

Finds and returns document by id or undefined.

```javascript
var post = _.get(db.posts, 1);
```

### insert

__insert(collection, document)__

Adds document to collection, sets an id and returns created document.

```javascript
var post = _.insert(db.posts, {body: 'New post'});
```

### update

__update(collection, id, attrs)__

Finds document by id, copies properties to it and returns updated document or undefined.

```javascript
var post = _.update(db.posts, 1, {body: 'Updated body'});
```

### updateWhere

__updateWhere(collection, whereAttrs, attrs)__

Finds documents using `_.where`, updates documents and returns updated documents or an empty array.

```javascript
// Publish all unpublished posts
var posts = _.updateWhere(db.posts, {published: false}, {published: true});
```

### remove

__remove(collection, id)__

Removes document from collection and returns it or undefined.

```javascript
var comment = _.remove(db.comments, 1);
```

### removeWhere

__removeWhere(collection, whereAttrs)__

Removes documents from collection using `_.where` and returns removed documents or an empty array.

```javascript
var comments = _.removeWhere(db.comments, {postId: 1});
```

### save

save(db, [destination])

Persists database using localStorage or filesystem. If no destination is specified it will save to `db` or `./db.json`.

```javascript
_.save(db);
```

### load

load([source])

Loads database from localStorage or filesystem. If no source is specified it will load from `db` or `./db.json`.

```javascript
var db = _.load();
```

## FAQ

### How to query?

Everything you need for querying is present in Underscore and Lo-Dash: `where`, ```find```, ```map```, ```reduce```, ```filter```, ```reject```, ```sortBy```, ```groupBy```, ```countBy```, ...

See http://underscorejs.org/ or http://lodash.com/docs.

Example:

```javascript
// Using Underscore
var topFivePosts = _(db.posts)
  .chain()
  .where({published: true})
  .sortBy(function(post) {
     return post.views;   
   })
  .first(5)
  .value();

// Using Lo-Dash
var topFivePosts = _(db.posts)
  .where({published: true})
  .sortBy('views')
  .first(5)
  .value();
```

### How to reduce file size?

With Lo-Dash, you can create optimal builds and include just what you need. 

Minimal build for Underscore.db to work (~2kb min gzipped):

```bash
$ npm install -g lodash-cli
$ lodash underscore include=find,where,clone,indexOf
```

For more build options, see http://lodash.com/custom-builds.

## License

Underscore.db is released under the MIT License.
