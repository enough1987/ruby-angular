'use strict';

// filters


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
