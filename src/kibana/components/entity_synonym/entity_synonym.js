define(function (require) {
  return function entitySynonym(config, $http) {
    /**
     * Decorate queries with default parameters
     * @param {query} query object
     * @returns {object}
     */
    return function (query) {
      var url = 'datasource/getQueriesData';
      var queryDefs=[
              {
                open: true,
                queryId: 'Drug-Query',
                showFilterButton: false,
                templateId: 'kibi-table-jade',
                templateVars: {
                }
              }
            ];

      if (queryDefs && !(queryDefs instanceof Array) && (typeof queryDefs === 'object') && queryDefs !== null) {
        queryDefs = [queryDefs];
      }
      var options = {'selectedDocuments':[''], 'replaceText':'Drug', 'replaceWith':'@tobereplaced@'};
      //var options = {'selectedDocuments':['']};
      var params = {
        options: JSON.stringify(options),
        queryDefs: JSON.stringify(queryDefs)
      };

      return $http({
          method: 'GET',
          url: url,
          params: params
        });
    };
  };
});
