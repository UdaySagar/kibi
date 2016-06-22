define(function (require) {
  return function CacheHelperFactory($rootScope, Promise) {

    // we will store values in memory
    var cache = {};


    // We wrap cache library in simple helper
    // in case we would like to change the underlying implementation in future (e.g. use localStorage)
    // it will be easy to do it here
    function CacheHelper() {
    }

    CacheHelper.prototype.set = function (key, value) {
      cache[key] = value;
    };

    CacheHelper.prototype.get = function (key) {
      return cache[key] ? cache[key] : null;
    };

    CacheHelper.prototype.flush = function () {
      cache = {};
    };

    var cacheHelperInstance =  new CacheHelper();

    // flush the cache on route change
    $rootScope.$on('$routeChangeSuccess', function () {
      cacheHelperInstance.flush();
    });

    return cacheHelperInstance;
  };
});
