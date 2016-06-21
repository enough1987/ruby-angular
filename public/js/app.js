
var customFilters = angular.module("customFilters", []);
var customDirectives = angular.module("customDirectives", []);
var customServices = angular.module("customServices", []);


var watchApp = angular.module("watchApp", 
	["customServices", "customDirectives","customFilters", 
	'ngRoute', 'ngSanitize']);

watchApp.config(function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'views/landing/init.html',
        controller: 'LandingCtrl'
      }). 
       when('/search-page/:search', {
        templateUrl: 'views/search-page/init.html',
        controller: 'SearchCtrl'        
      }). 
      when('/single-product/:product', { 
        templateUrl: 'views/single-product/init.html',
        controller: 'SingleProductCtrl'        
      }). 
      when('/signinup', {
        templateUrl: 'views/signinup.html',
        controller: 'SigninupCtrl'        
      }).
       when('/buyer-step1', {
        templateUrl: 'views/buyer-steps/init1.html',
        controller: 'TestCtrl'        
      }). 
       when('/buyer-step2', {
        templateUrl: 'views/buyer-steps/init2.html',
        controller: 'TestCtrl'        
      }). 
       when('/buyer-step3', {
        templateUrl: 'views/buyer-steps/init3.html',
        controller: 'TestCtrl'        
      }).  
       when('/seller-landing', {
        templateUrl: 'views/seller-landing/init.html',
        controller: 'TestCtrl'        
      }).
       when('/seller-step1', {
        templateUrl: 'views/seller-steps/init1.html',
        controller: 'TestCtrl'        
      }). 
       when('/seller-step2', {
        templateUrl: 'views/seller-steps/init2.html',
        controller: 'TestCtrl'        
      }). 
       when('/seller-step3', {
        templateUrl: 'views/seller-steps/init3.html',
        controller: 'TestCtrl'        
      }).              
       when('/UIKit', {
        templateUrl: 'views/UIKit.html',
        controller: 'TestCtrl'        
      }).       
       when('/test', {
        templateUrl: 'views/test.html',
        controller: 'TestCtrl'        
      }).         
      otherwise({
        templateUrl: '404.html',
        controller: 'TestCtrl'         
      });

      $locationProvider.html5Mode(true);
  });

watchApp.run(['$route', '$rootScope', '$location', function ($route, $rootScope, $location) {
    var original = $location.path;
    $location.path = function (path, reload) {
        if (reload === false) {
            var lastRoute = $route.current;
            var un = $rootScope.$on('$locationChangeSuccess', function () {
                $route.current = lastRoute;
                un();
            });
        }
        return original.apply($location, [path]);
    };
}]);





