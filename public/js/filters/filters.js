'use strict';

// filters

customFilters.filter('range', function() {
  return function(val, range) {
    range = parseInt(range);
    for (var i=0; i<range; i++)
      val.push(i);
    return val;
  };
});

customFilters.filter('trusted', function ($sce) {
    return function(url) {
        if (angular.isString(url)) { 
            return $sce.trustAsResourceUrl(url);
        }
    };
});

customFilters.filter("trustashtml", function ($sce) {
    return function (value) {
        if (angular.isString(value)) {
            return $sce.trustAsHtml(value);
        }
    };
});

customFilters.filter("appcurrency", function () {
    return function (value) {
        if (angular.isString(value)) {
            return settings.appcurrency + value;
        }
    };
});
