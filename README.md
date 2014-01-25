[![Build Status](https://travis-ci.org/typicode/underscore.db.png)](https://travis-ci.org/typicode/underscore.db)
[![NPM version](https://badge.fury.io/js/underscore.db.png)](http://badge.fury.io/js/underscore.db)
[![NPM version](https://badge.fury.io/bo/underscore.db.png)](http://badge.fury.io/bo/underscore.db)

# Underscore.db

A small pure JavaScript database for Node, node-webkit and the browser.

## Introduction

Underscore and Lo-Dash are wonderful libraries for manipulating data.

So instead of creating an all new database library, Underscore.db just adds some CRUD functions and builds on what already exists.

It adds ```get```, ```insert```, ```update```, ```updateWhere```, ```remove```, ```removeWhere``` and ```createId```.

This results in a very small mixin that is less than 240 bytes (minified and gzipped) and that can be embedded anywhere.

## When to use

Use it if you:

* ...need a very small embeddable database
* ...love to hack and use native objects

for:

* ...Express-like servers
* ...command-line programs
* ...node-webkit apps
* ...mobile projects

And last, it plays very well with other libraries that deals with Object/JSON.

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

### get(collection, id)

Finds and returns document by id or undefined.

```javascript
var post = _.get(db.posts, 1)
```

### insert(collection, document)

Adds document to collection, sets an id and returns created document.

```javascript
var post = _.insert(db.posts, {body: 'New post'});
```

### update(collection, id, attrs)

Finds document by id, copies properties to it and returns updated document or undefined.

```javascript
var post = _.update(db.posts, 1, {body: 'Updated body'});
```

### updateWhere(collection, attrs, whereAttrs)

Finds documents using ```where```, updates documents and returns updated documents or an empty array.

```javascript
// Publish all unpublished posts
var posts = _.updateWhere(db.posts, {published: true}, {published: false});
```

_Lo-Dash implementation of ```where``` accepts more options. Depending on the library you use with Underscore.db, ```updateWhere``` can accept more or less options._

### remove(collection, id)

Removes document from collection and returns it or undefined.

```javascript
var comment = _.remove(db.comments, 1);
```

### removeWhere(collection, whereAttrs)

Removes documents from collection using ```where``` and returns removed documents or an empty array.

```javascript
var comments = _.removeWhere(db.comments, {postId: 1});
```

_Lo-Dash implementation of ```where``` accepts more options. Depending on the library you use with Underscore.db, ```removeWhere``` can accept more or less options._

## Install

```bash
$ npm install underscore.db
```

```javascript
var _ = require('underscore');
_.mixin(require('underscore.db'));
```

```bash
$ bower install underscore.db
```

```html
<script src="underscore.js" type="text/javascript"></script>
<script src="underscore.db.js" type="text/javascript"></script>
```

## FAQ

### Underscore or Lo-Dash?

It's a matter of preference, both are great and work well with Underscore.db.

However, Lo-Dash may be a better choice if you're focused on size due to the ability to create custom builds and also because some functions have more options.

### How to query?

Everything you need for querying is present in Underscore and Lo-Dash: ```where```, ```find```, ```map```, ```reduce```, ```filter```, ```reject```, ```sortBy```, ```groupBy```, ```countBy```, ...

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
  .range(5)
  .value();

// Using Lo-Dash
var topFivePosts = _(db.posts)
  .where({published: true})
  .sortBy('views')
  .range(5)
  .value();
```

### How to persist?

Persisting and loading an object in JavaScript is very easy and therefore saving a database-like object too.

Example:

```javascript
// Node
var fs = require('fs');
fs.writeFileSync('db.json', JSON.stringify(db));
var db = require('./db.json');

// Browser
localStorage.setItem('db', JSON.stringify(db));
var db = JSON.parse(localStorage.getItem('db'));
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

### How is document id generated?

Underscore.db uses a random V4 UUID based on https://gist.github.com/jed/982883. 

But you can use another algorithm if you want to, just override ```createId``` with your custom algorithm after loading/requiring Underscore.db.

Example:

```javascript
var _ = require('underscore');
_.mixin(require('underscore.db'));

_.createId = function(collection) {
  // ...
  return id;
}
```

See also https://github.com/pid/puid and https://github.com/broofa/node-uuid.

### How to do validation?

You can find many lightweight third-party libraries that do object validation. Just use the one that suits the most your project.

## License

Underscore.db is released under the MIT License.
