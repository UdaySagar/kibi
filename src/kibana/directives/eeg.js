define(function (require) {

  var Eeg = require('eeg');

  require('modules')
  .get('kibana')
  .directive('eeg', function ($rootScope) {
    return {
      restrict: 'E',
      replace:true,
      scope: {
        eegId: '=',
        // we expect the graph to contain
        // nodes: []
        // links: [
        // option: {}
        // nodes and links and option format same as in Eeg
        graph: '=?'
      },
      template: '<div></div>',
      link: function ($scope, element, attrs) {
        if ($scope.graph === undefined) {
          element.empty();
          $scope.g = new Eeg(element);
        }

        $scope.$watch('graph', function (graph) {
          if (graph) {
            element.empty();

            if ($scope.graph.options) {
              $scope.g = new Eeg(element, $scope.graph.options);
            }

            if ($scope.graph.nodes) {
              $scope.g.addNodes($scope.graph.nodes);
            }
            if ($scope.graph.links) {
              $scope.g.addLinks($scope.graph.links);
            }
            $rootScope.$emit('egg:' + $scope.eegId + ':results', 'exportGraph', $scope.g.exportGraph());
          }
        });

        var off = $rootScope.$on('egg:' + $scope.eegId + ':run', function (event, method) {
          if ($scope.g) {
            if (method === 'importGraph') {
              element.empty();
            }

            var args = Array.prototype.slice.apply(arguments);
            args.shift();
            args.shift();
            var result = $scope.g[method].apply($scope.g, args);
            $rootScope.$emit('egg:' + $scope.eegId + ':results', method, result);
          }
        });
        $scope.$on('$destroy', off);
      }
    };
  });

});
