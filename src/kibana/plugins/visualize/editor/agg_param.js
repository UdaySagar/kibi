define(function (require) {
  var _ = require('lodash');
  require('ng-tags-input');
  require('modules')
  .get('app/visualize')
  .directive('visAggParamEditor', function (config, $parse, Private, $http) {
  var entitySynonyms = Private(require('components/entity_synonym/entity_synonym'));      
    return {
      restrict: 'E',
      scope: true,
      template: function ($el) {
        return $el.html();
      },
      link: {
        pre: function ($scope, $el, attr) {
          $scope.$bind('aggParam', attr.aggParam);
          if ($scope.aggParam.name == 'filters') {
            _.forEach($scope.aggParam.filters, function(filter, i) {
              console.log(filter + ', ' + i);
              $scope['tags' + i] = [];
            });
          }
        },
        post: function ($scope, $el, attr) {
          $scope.config = config;
                

        /*$scope.tags = [
                    { text: '*' },
                    { text: 'some' },
                    { text: 'cool' },
                    { text: 'tags' }
                console.log(resp);
                ]; */
/*SELECT ?resource ?label FROM <http://knoesis.org/ontology/duao> WHERE { ?resource rdfs:label ?label } */
          entitySynonyms().then(function(resp) {
console.log(resp);
//console.log(resp.data.snippets[0].results.bindings);
                var values = resp.data.snippets[0].results.bindings;
                var log=[];

                $scope.loadTags = function(query) {
                    angular.forEach(values, function(value, key) {
                      this.push(value.slangTerm.value);
                    }, log);
                    //console.log(log);
                    return log; 
                };
          });

          $scope.optionEnabled = function (option) {
            if (option && _.isFunction(option.enabled)) {
              return option.enabled($scope.agg);
            }

            return true;
          };

          if ($scope.aggParam.name == 'filters') {
            $scope.$watch('tags', function(newValue, oldValue) {
              _.map()
            });
          }
        }
      }
    };
  });
});
