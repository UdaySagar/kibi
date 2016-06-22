define(function (require) {
  var _ = require('lodash');
  return function mapTermsProvider(Promise, courier) {
    return function (filter) {
      if (filter.dbfilter) {
        return Promise.resolve({ key: filter.meta.key, value: filter.meta.value });
      }
      return Promise.reject(filter);
    };
  };
});
