var assert = require('assert'),
    sinon = require('sinon'),
    fs = require('fs'),
    _db = require('../src/node');

// Test underscore-db against Undersocre and Lo-Dash
var libs = {
  underscore: require('underscore'),
  lodash: require('lodash')
};

Object.keys(libs).forEach(function(name) {

  describe(name + ' + underscore-db', function() {

    var db;
    var _ = libs[name];

    beforeEach(function() {
      _.mixin(_db);
      db = {
        posts: [
          {id: 1, body: 'one', published: true},
          {id: 2, body: 'two', published: false},
          {id: 3, body: 'three', published: false},
          {id: '4', body: 'four', published: false}
        ],
        comments: [
          {id: 1, body: 'foo', postId: 1},
          {id: 2, body: 'bar', postId: 2}
        ]
      };
    });

    describe('id', function() {
      beforeEach(function() { _.id = 'body'; });
      afterEach(function() { delete _.id; });

      it('is the property used by get to find document', function() {
        var expect = db.posts[0],
            doc =_.getById(db.posts, 'one');

        assert.deepEqual(doc, expect);
      });
    });

    describe('createId', function() {
      it('returns an id', function() {
        assert(_.createId());
      });
    });

    describe('getById', function() {
      it('returns doc by id', function() {
        var expect = db.posts[0],
            doc = _.getById(db.posts, 1);

        assert.deepEqual(doc, expect);
      });

      it('returns undefined if doc is not found', function() {
        var doc = _.getById(db.posts, 9999);

        assert.equal(doc, undefined);
      });

      it('returns doc (with string id) by number id', function() {
        var expect = db.posts[3],
            doc = _.getById(db.posts, 4);

        assert.deepEqual(doc, expect);
      });

      it('returns doc (with string id) by string id', function() {
        var expect = db.posts[3],
            doc = _.getById(db.posts, '4');

        assert.deepEqual(doc, expect);
      });
    });

    describe('insert', function() {
      describe('and id is set', function() {
        it('inserts and returns inserted doc', function() {
          var doc = _.insert(db.posts, {id: 'foo', body: 'one' });

          assert.equal(db.posts.length, 5);
          assert.deepEqual(doc, {id: 'foo', body: 'one' });
          assert.deepEqual(_.getById(db.posts, doc.id), {id: 'foo', body: 'one' });
        });

        it('replaces in place and returns inserted doc', function() {
          var length = db.posts.length;
          doc = _.insert(db.posts, {id: 2, title: 'one'});
          assert.equal(db.posts.length, length);
          assert.deepEqual(doc, {id: 2, title: 'one'});
          assert.deepEqual(_.getById(db.posts, doc.id), {id: 2, title: 'one'});
          assert.deepEqual(_.map(db.posts, 'id'), [1, 2, 3, '4']);
        });
      });

      describe('and id is not set', function() {
        it('inserts, sets an id and returns inserted doc', function() {
          var doc = _.insert(db.posts, {body: 'one' });

          assert.equal(db.posts.length, 5);
          assert(doc.id);
          assert.equal(doc.body, 'one');
        });
      });
    });

    describe('updateById', function() {
      it('updates doc and returns updated doc', function() {
        var doc =_.updateById(db.posts, 1, {published: false});

        assert(!db.posts[0].published);
        assert(!doc.published);
      });

      it('returns undefined if doc is not found', function() {
        var doc =_.updateById(db.posts, 9999, {published: false});

        assert.equal(doc, undefined);
      });
    });

    describe('updateWhere', function() {
      it('updates docs and returns updated docs', function() {
        var docs =_.updateWhere(db.posts, {published: false}, {published: true});

        assert.equal(docs.length, 3);
        assert(db.posts[1].published);
        assert(db.posts[2].published);
      });

      it('returns an empty array if no docs match', function() {
        var docs =_.updateWhere(db.posts, {published: 'draft'}, {published: true});

        assert.equal(docs.length, 0);
      });
    });

    describe('replaceById', function() {
      it('replaces doc and returns it', function() {
        var doc = _.replaceById(db.posts, 1, {foo: 'bar'});

        assert.deepEqual(db.posts[0], {id: 1, foo: 'bar'});
      });

      it('returns undefined if doc is not found', function() {
        var doc = _.replaceById(db.posts, 9999, {});

        assert.equal(doc, undefined);
      });
    });


    describe('removeById', function() {
      it('removes and returns doc ', function() {
        var expected = db.posts[0],
            doc = _.removeById(db.posts, 1);

        assert.equal(db.posts.length, 3);
        assert.deepEqual(doc, expected);
      });

      it('returns undefined if doc is not found', function() {
        var doc =_.removeById(db.posts, 9999);

        assert.equal(doc, undefined);
      });
    });

    describe('removeWhere', function() {
      it('removes docs', function() {
        var expected = [db.comments[0]],
            docs = _.removeWhere(db.comments, {postId: 1});

        assert.equal(db.comments.length, 1);
        assert.deepEqual(docs, expected);
      });

      it('returns an empty array if no docs match', function() {
        var docs = _.removeWhere(db.comments, {postId: 9999});

        assert.equal(docs.length, 0);
      });
    });

    describe('save and load', function() {
      function clean() {
        ['db.json', 'mydb.json'].forEach(function(path) {
          if (fs.existsSync(path)) fs.unlinkSync(path);
        });
      }

      beforeEach(clean);
      afterEach(clean);

      describe('with no options', function() {
        it('saves and loads database using defaults', function() {
          var actual;

          _.save(db);
          actual = _.load();

          assert.deepEqual(actual, db);
        });
      });

      describe('with options', function() {
        it('saves and loads database using options', function() {
          var actual;

          _.save(db, 'mydb.json');
          actual = _.load('mydb.json');

          assert.deepEqual(actual, db);
        });
      });
    });
  });
});
