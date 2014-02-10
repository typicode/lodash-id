[![Build Status](https://travis-ci.org/typicode/underscore.db.png)](https://travis-ci.org/typicode/underscore.db)
[![NPM version](https://badge.fury.io/js/underscore.db.png)](http://badge.fury.io/js/underscore.db)
[![NPM version](https://badge.fury.io/bo/underscore.db.png)](http://badge.fury.io/bo/underscore.db)

# Underscore.db

## Introduction

__Little pure JavaScript database based on Underscore/Lo-Dash.__

It can be used in Node, node-webkit and the browser.

It adds `get`, `insert`, `update`, `updateWhere`, `remove`, `removeWhere`, `save`, `load` and `createId` to Underscore and Lo-Dash.

## Example

You can try it online [here](http://typicode.github.io/underscore.db/).

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

### Underscore or Lo-Dash?

It's a matter of preference, both are great and work well with Underscore.db.

However, Lo-Dash may be a better choice if you're focused on size due to the ability to create custom builds and also because some functions have more options.

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

### How to create a custom build?

With Lo-Dash, you can create optimal builds and include just what you need. 

Example:

```bash
$ npm install -g lodash-cli

# Minimal build for Underscore.db to work (~2kb min gzipped)
$ lodash underscore include=find,where,clone,indexOf
```

For more build options, see http://lodash.com/custom-builds.

## License

Underscore.db is released under the MIT License.
