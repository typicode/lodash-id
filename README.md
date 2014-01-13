[![Build Status](https://travis-ci.org/typicode/underscore.db.png)](https://travis-ci.org/typicode/underscore.db)
[![NPM version](https://badge.fury.io/js/underscore.db.png)](http://badge.fury.io/js/underscore.db)
[![NPM version](https://badge.fury.io/bo/underscore.db.png)](http://badge.fury.io/bo/underscore.db)

# Underscore.db

> __Lightweight__ pure JavaScript database library for __Node and the browser__.

## Why

__With Underscore.db, you can use simple JavaScript objects as databases.__

For Node projects, it can be a way to free users from running a database or for front-end/mobile projects, it can be a lightweight alternative to store data.

Moreover, since Underscore.db is a set of mixins for Underscore or Lo-Dash, you can get advantages from either project: 

* Underscore - 10000+ stars project with familiar API and powerful data manipulation functions
* Lo-Dash - performance oriented code and optimal custom builds

## Features

* __One of the smallest pure JavaScript database *__
* __Built on top of Underscore and compatible with Lo-Dash__
* Can be extended by other mixins
* Native functions can be used
* Cross-browser
* Doesn't mess with your objects

_* Only ~200 bytes minified and gzipped, ~5kb with Underscore or ~3kb with the custom minimal Lo-Dash build._

## Try it!

[Demo page](http://typicode.github.io/underscore.db)

## Setup

Browser

```html
<script src="underscore.js" type="text/javascript"></script>
<script src="underscore.db.js" type="text/javascript"></script>
```

Node

```javascript
var _ = require('underscore');
_.mixin(require('underscore.db'));
```

## API

JavaScript objects must respect this format:

```javascript
var db = {
  posts: [
    {id: 1, body: 'foo', views: 10, published: false},
    {id: 2, body: 'bar', views: 20, published: true}
  ],
  comments: [
    {id: 1, body: 'baz', postId: 1},
    {id: 2, body: 'qux', postId: 2}
  ]
}
```

```javascript
var post            = _.get(db.posts, 1);

var insertedPost    = _.insert(db.posts, {body: 'new post', published: false});

var updatedPost     = _.update(db.posts, 1, {published: true});

var removedPost     = _.remove(db.posts, 1);

var removedComments = _.removeWhere(db.comments, {postId: 1});
```

## How to

Here are some common use cases to get you started.

Most of them rely on [Underscore](http://underscorejs.org/) or even native functions since the database is a simple JavaScript object.

__Query__

```javascript
var publishedPosts = _.where(db.posts, {published: true});
```

__Sort__

```javascript
var mostViewedPosts = _.sortBy(db.posts, function(post) {
  return post.views;
});
```

__Batch update__

```javascript
_.each(db.posts, function unpublish(post) {
  post.published = false;
})
```

__Batch remove__

```javascript
var db.posts = _.reject(db.posts, function isDraft(post) {
  return !post.published;
})
```

__Replace, empty or destroy table__

```javascript
db.posts = newPosts; // replace
db.posts = [];       // empty
delete db.posts;     // destroy
```

__Persist and load data__

Browser

```javascript
// persist
localStorage.setItem('db', JSON.stringify(db));
// load
var db = JSON.parse(localStorage.getItem('db'));
```

Node

```javascript
// persist
var fs = require('fs');
fs.writeFileSync('db.json', JSON.stringify(db));
// load
var db = require('./db.json');
```

__Third-party libraries__

Also, since Underscore.db works with plain objects, it plays well with other libraries like schema validators, inflectors, ... 

## Using Lo-Dash

With Lo-Dash, you can create optimal builds and include just what you need. 

```bash
$ npm install -g lodash-cli
# Minimal set for Underscore.db to work
$ lodash underscore include=find,isUndefined,isEmpty,max,clone,extend,indexOf,where
# Generic data manipulation build for modern browsers
$ lodash modern category=collections,arrays,chaining
```

For more builds, see [Lo-Dash custom builds page](http://lodash.com/custom-builds).

## License

Underscore.db is released under the MIT License.
