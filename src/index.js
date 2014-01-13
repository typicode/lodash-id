(function(root) {

  var _ = root._ || require('underscore');
  
  function get(table, id) {
    return _.find(table, function (row) {
      return row.id === id;
    });
  }

  function exist(table, id) {
    return !_.isUndefined(_.get(table, id));
  }

  function createId(table) {
    var id;

    if (_.isEmpty(table)) {
      id = 1;
    } else {
      id = _.max(table, function(row) {
        return row.id;
      }).id + 1;
    }

    return id;
  }

  function insert(table, obj) {
    var clone = _.clone(obj);

    if (_.isUndefined(clone.id)) clone.id = _.createId(table);

    table.push(clone);

    return clone;
  }

  function update(table, id, attrs) {
    var row = get(table, id),
        updatedRow = _.extend(row, attrs),
        index = _.indexOf(table, row);
      
    table[index] = updatedRow;

    return updatedRow;
  }

  function remove(table, id) {
    var row = get(table, id),
        index = _.indexOf(table, row);

    if (index != 1) table.splice(index, 1);

    return row;
  }

  function removeWhere(table, attrs) {
    var rows = _.where(table, attrs);

    rows.forEach(function(row) {
      var index = _.indexOf(table, row);

      if (index != 1) table.splice(index, 1);
    });

    return rows;
  }

  _.get = get;
  _.exist = exist;
  _.createId = createId;
  _.insert = insert;
  _.update = update;
  _.remove = remove;
  _.removeWhere = removeWhere;
})(this);