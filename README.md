# underscore-db [![Build Status](https://travis-ci.org/typicode/underscore-db.svg)](https://travis-ci.org/typicode/underscore-db) [![NPM version](https://badge.fury.io/js/underscore-db.svg)](http://badge.fury.io/js/underscore-db) [![Bower version](https://badge.fury.io/bo/underscore-db.svg)](http://badge.fury.io/bo/underscore-db)

> Adds functions to Underscore/Lo-Dash for manipulating database-like objects.

It adds:
* `getById`
* `insert`
* `updateById`
* `updateWhere`
* `replaceById`
* `removeById`
* `removeWhere`
* `save`
* `load`
* `createId`

Data can be persisted using the filesystem or localStorage.

__[Live example](http://typicode.github.io/underscore-db/)__

__Tip__ You can extend [LowDB](https://github.com/typicode/lowdb) with underscore-db.

## Install

__Node__

```bash
$ npm install underscore underscore-db
```

```javascript
var _   = require('underscore');
var _db = require('underscore-db');

_.mixin(_db);
```

__Browser__

```bash
$ bower install underscore underscore-db
```

```html
<script src="underscore.js" type="text/javascript"></script>
<script src="underscore-db.js" type="text/javascript"></script>
```

To use underscore-db with Lo-Dash, just replace `underscore` with `lodash`

## Usage example

Create an empty database object

```javascript
var db = {
  posts: []
}
```

Create a post

```javascript
var newPost = _.insert(db.posts, {title: 'foo'});
```

Display database `console.log(db)`

```javascript
{
  posts: [
    {title: "foo", id: "5ca959c4-b5ab-4336-aa65-8a197b6dd9cb"}
  ]
}
```

Retrieve post using underscore-db `get` or underscore `find` method

```javascript
var post = _.getById(db.posts, newPost.id);

var post = _.find(db.posts, function(post) {
  return post.title === 'foo'
});
```

Persist

```javascript
_.save(db);
```

## API

The following database object is used in API examples.

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

__getById(collection, id)__

Finds and returns document by id or undefined.

```javascript
var post = _.getById(db.posts, 1);
```

__insert(collection, document)__

Adds document to collection, sets an id and returns created document.

```javascript
var post = _.insert(db.posts, {body: 'New post'});
```

If the document has already an id, it will be used to insert or replace.

```javascript
_.insert(db.posts, {id: 1, body: 'New post'});
_.insert(db.posts, {id: 1, title: 'New title'});
_.getById(db.posts, 1) // {id: 1, title: 'New title'}
```

__updateById(collection, id, attrs)__

Finds document by id, copies properties to it and returns updated document or undefined.

```javascript
var post = _.updateById(db.posts, 1, {body: 'Updated body'});
```

__updateWhere(collection, whereAttrs, attrs)__

Finds documents using `_.where`, updates documents and returns updated documents or an empty array.

```javascript
// Publish all unpublished posts
var posts = _.updateWhere(db.posts, {published: false}, {published: true});
```

__replaceById(collection, id, attrs)__

Finds document by id, replaces properties and returns document or undefined.

```javascript
var post = _.replaceById(db.posts, 1, {foo: 'bar'});
```

__removeById(collection, id)__

Removes document from collection and returns it or undefined.

```javascript
var comment = _.removeById(db.comments, 1);
```

__removeWhere(collection, whereAttrs)__

Removes documents from collection using `_.where` and returns removed documents or an empty array.

```javascript
var comments = _.removeWhere(db.comments, {postId: 1});
```

__save(db, [destination])__

Persists database using localStorage or filesystem. If no destination is specified it will save to `db` or `./db.json`.

```javascript
_.save(db);
_.save(db, '/some/path/db.json');
```

__load([source])__

Loads database from localStorage or filesystem. If no source is specified it will load from `db` or `./db.json`.

```javascript
var db = _.load();
var db = _.load('/some/path/db.json');
```

__id__

Overwrite it if you want to use another id property.

```javascript
_.id = '_id';
```

__createId(collectionName, doc)__

Called by underscore-db when a document is inserted. Overwrite it if you want to change id generation algorithm.

```javascript
_.createId = function(collectionName, doc) {
  return collectionName + '-' + doc.name + '-' + _.random(1, 9999);
}
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

With Lo-Dash, you can create custom builds and include just what you need.

Minimal build for underscore-db to work (~2kb min gzipped):

```bash
$ npm install -g lodash-cli
$ lodash underscore include=find,where,forEach,indexOf
```

For more build options, see http://lodash.com/custom-builds.

## Changelog

See details changes for each version in the [release notes](https://github.com/typicode/underscore-db/releases).

## License

underscore-db is released under the MIT License.
