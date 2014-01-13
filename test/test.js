var assert = require('assert'),
    _  = require('underscore');

_.mixin(require('../src/'));

describe('underscore.db', function() {
  var db;
  
  beforeEach(function() {
    db = {
      posts: [
        {id: 1, body: 'foo', published: true},
        {id: 2, body: 'bar', published: false}
      ],
      comments: [
        {id: 1, body: 'baz', postId: 1},
        {id: 2, body: 'qux', postId: 2}
      ]
    };
  });

  describe('get', function() {
    it('find row by id', function() {
      var expect = db.posts[0],
          row = _.get(db.posts, 1);

      assert.deepEqual(row, expect);
    });
  });

  describe('exist', function() {
    it('return true if row exist', function() {
      assert(_.exist(db.posts, 1));
    });

    it('return false if row doesn\'t exist', function() {
      assert(!_.exist(db.posts, 999));
    });
  });

  describe('createId', function() {
    beforeEach(function() {
      // Flipping posts to check that createId
      // takes the highest id whatever the order is 
      db.posts = [db.posts[1], db.posts[0]];
    });

    it('return an id to be used in table', function() {
      assert.equal(_.createId(db.posts), 3);
    });

    it('return 1 if table is empty', function() {
      db.posts = [];
      assert.equal(_.createId(db.posts), 1);
    });
  });

  describe('insert', function() {
    it('insert row', function() {
      var expected = { id: 3, body: 'foo' },
          insertedRow = _.insert(db.posts, { body: 'foo' });

      assert.equal(db.posts.length, 3);
      assert.deepEqual(insertedRow, expected);
    });
  });

  describe('update', function() {
    it('update row', function() {
      var expected = { id: 1, body: 'foo', published: false },
          updatedRow =_.update(db.posts, 1, { published: false });

      // Asserting both the db and the returned object 
      // are what we expect
      assert.deepEqual(db.posts[0], expected);
      assert.deepEqual(updatedRow, expected);
    });
  });

  describe('remove', function() {
    it('remove row', function() {
      var expected = db.posts[0],
          removedRow = _.remove(db.posts, 1);

      assert.equal(db.posts.length, 1);
      assert.deepEqual(removedRow, expected);
    });
  });

  describe('removeWhere', function() {
    it('remove rows', function() {
      var expected = [db.comments[0]],
          removedRows = _.removeWhere(db.comments, {postId: 1});

      assert.equal(db.comments.length, 1);
      assert.deepEqual(removedRows, expected);
    });
  });
});