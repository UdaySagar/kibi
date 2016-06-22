/**
 * main app level module
 */
define(function (require) {
  var angular = require('angular');
  var _ = require('lodash');
  var $ = require('jquery');
  var modules = require('modules');
  var routes = require('routes');

  require('elasticsearch');
  require('angular-route');
  require('angular-bindonce');

  var c = JSON.parse(require('text!config'));
  var configFile = c.configFile;

  var kibana = modules.get('kibana', [
    // list external requirements here
    'elasticsearch',
    'pasvaz.bindonce',
    'ngRoute',
    'ngClipboard',
    'angular-jqcloud'
  ]);


  kibana
    // This stores the Kibana revision number, @REV@ is replaced by grunt.
    .constant('kbnVersion', window.KIBANA_VERSION)
    // The build number is placed by grunt, represents a sequence to provide nothing really but order.
    // If NaN, use the max value of a JS number, that way we always have a number here, even in dev
    .constant('buildNum', _.parseInt(window.KIBANA_BUILD_NUM) || Number.MAX_SAFE_INTEGER)
    // This stores the build number, @REV@ is replaced by grunt.
    .constant('commitSha', window.KIBANA_COMMIT_SHA)
    // Use this for cache busting partials
    .constant('cacheBust', window.KIBANA_COMMIT_SHA)
    // The Elasticsearch engine version required to run Kibana (semver syntax)
    .constant('elasticsearchEngineVersion', '^1.4.4')
    // When we need to identify the current session of the app, ef shard preference
    .constant('sessionId', Date.now())
    // attach the route manager's known routes
    .config(routes.config)
    .config(['ngClipProvider', function (ngClipProvider) {
      ngClipProvider.setPath('bower_components/zeroclipboard/dist/ZeroClipboard.swf');
    }]);

  // setup routes
  routes
    .otherwise({
      redirectTo:  '/default'
    });

  // tell the modules util to add it's modules as requirements for kibana
  modules.link(kibana);

  kibana.load = _.onceWithCb(function (cb) {
    var firstLoad = [ 'plugins/kibana/index' ];
    var thenLoad = _.difference(configFile.plugins, firstLoad);
    require(firstLoad, function loadApps() {
      require(thenLoad, cb);
    });
  });

  kibana.init = _.onceWithCb(function (cb) {
    kibana.load(function () {
      $(function () {
        angular
          .bootstrap(document, ['kibana'])
          .invoke(function () {
            $(document.body).children(':not(style-compile)').show();
            cb();
          });
      });
    });
  });

  return kibana;
});