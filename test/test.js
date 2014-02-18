var assert = require('assert'),
    sinon = require('sinon'),
    fs = require('fs'),
    _db = require('../src/node');

// Test underscore.db against Undersocre and Lo-Dash
var libs = {
  underscore: require('underscore'),
  lodash: require('lodash')
};

Object.keys(libs).forEach(function(name) {

  describe(name + ' + underscore.db', function() {

    var db;
    var _ = libs[name];
    
    beforeEach(function() {
      _db.mixWith(_);
      db = {
        posts: [
          {id: 1, body: 'one', published: true},
          {id: 2, body: 'two', published: false},
          {id: 3, body: 'three', published: false}
        ],
        comments: [
          {id: 1, body: 'foo', postId: 1},
          {id: 2, body: 'bar', postId: 2}
        ]
      };
    });


    describe('id', function() {
      beforeEach(function() { _.id = 'body'; });
      afterEach(function() { _.id = 'id'; });

      it('is the property used by get to find document', function() {
        var expect = db.posts[0],
            doc =_.get(db.posts, 'one');

        assert.deepEqual(doc, expect);
      });
    });

    describe('createId', function() {
      it('returns an id', function() {
        assert(_.createId());
      });
    });

    describe('get', function() {
      it('returns doc by id', function() {
        var expect = db.posts[0],
            doc = _.get(db.posts, 1);

        assert.deepEqual(doc, expect);
      });

      it('returns undefined if doc is not found', function() {
        var doc = _.get(db.posts, 9999);

        assert.equal(doc, undefined);
      });
    });

    describe('insert', function() {
      describe('id is not set', function() {
        it('inserts, and returns inserted doc', function() {
          var doc = _.insert(db.posts, {id: 'foo', body: 'one' });

          assert.equal(db.posts.length, 4);
          assert.equal(doc.id, 'foo');
          assert.equal(doc.body, 'one');
        });
      });

      describe('id is set', function() {
        it('inserts, sets id, and returns inserted doc', function() {
          var doc = _.insert(db.posts, {body: 'one' });

          assert.equal(db.posts.length, 4);
          assert(doc.id);
          assert.equal(doc.body, 'one');
        });
      });
    });

    describe('update', function() {
      it('updates doc and returns updated doc', function() {
        var doc =_.update(db.posts, 1, {published: false});

        assert(!db.posts[0].published);
        assert(!doc.published);
      });

      it('returns undefined if doc is not found', function() {
        var doc =_.update(db.posts, 9999, {published: false});

        assert.equal(doc, undefined);
      });
    });

    describe('updateWhere', function() {
      it('updates docs and returns updated docs', function() {
        var docs =_.updateWhere(db.posts, {published: false}, {published: true});

        assert.equal(docs.length, 2);
        assert(db.posts[1].published);
        assert(db.posts[2].published);
      });

      it('returns an empty array if no docs match', function() {
        var docs =_.updateWhere(db.posts, {published: 'draft'}, {published: true});

        assert.equal(docs.length, 0);
      });
    });


    describe('remove', function() {
      it('removes and returns doc ', function() {
        var expected = db.posts[0],
            doc = _.remove(db.posts, 1);

        assert.equal(db.posts.length, 2);
        assert.deepEqual(doc, expected);
      });

      it('returns undefined if doc is not found', function() {
        var doc =_.remove(db.posts, 9999);

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

