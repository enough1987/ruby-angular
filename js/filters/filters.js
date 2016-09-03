//'use strict';

// filters


watchApp.filter('f_upp_low', function() {
  return function(val) {
     if ( !val ) return '';
     val = val.trim();
     return val.charAt(0).toUpperCase() + val.slice(1).toLowerCase();
  };
});

watchApp.filter('range', function() {
  return function(val, range) {
    range = parseInt(range);
    for (var i=0; i<range; i++)
      val.push(i);
    return val;
  };
});

watchApp.filter('trusted', function ($sce) {
    return function(url) {
        if (angular.isString(url)) { 
            return $sce.trustAsResourceUrl(url);
        }
    };
});

watchApp.filter("trustashtml", function ($sce) {
    return function (value) {
        if (angular.isString(value)) {
            return $sce.trustAsHtml(value);
        }
    };
});

watchApp.filter("appcurrency", function () {
    return function (value) {
        if (angular.isString(value)) {
            return settings.appcurrency + value;
        }
    };
});

watchApp.filter('created_at', function() {
  return function(val) {
    var inx = val.indexOf("T");
    var new_val = val.substring(0,inx);
    return new_val;
  };
});
