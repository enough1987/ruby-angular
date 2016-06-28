'use strict';

// services

customServices.factory('safeApply', [function($rootScope) {
            return function($scope, fn) {
                var phase = $scope.$root.$$phase;
                if(phase == '$apply' || phase == '$digest') {
                    if (fn) {
                        $scope.$eval(fn);
                    }
                } else {
                    if (fn) {
                        $scope.$apply(fn);
                    } else {
                        $scope.$apply();
                    }
                }
            }
}]);

customServices.factory('scrollServ', function () {
    return function (time){
         $('html, body').animate({
            scrollTop:$("#startposition").offset().top
         }, time);
    };
});












