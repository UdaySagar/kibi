define(function (require) {
  var _ = require('lodash');

  return function joinFields(relations, indexPatternId, fieldName) {
    return _(relations).map(function (relation) {
      var indices = relation.indices;

      if (indices[0].indexPatternId === indexPatternId && indices[0].path === fieldName) {
        return {
          indexPatternId: indices[1].indexPatternId,
          path: indices[1].path
        };
      }
      if (indices[1].indexPatternId === indexPatternId && indices[1].path === fieldName) {
        return {
          indexPatternId: indices[0].indexPatternId,
          path: indices[0].path
        };
      }
    }).compact().value();
  };
});
