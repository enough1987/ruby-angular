
var customFilters = angular.module("customFilters", []);
var customDirectives = angular.module("customDirectives", []);
var customServices = angular.module("customServices", []);


var watchApp = angular.module("watchApp", 
	["customServices", "customDirectives","customFilters", 
	'ngRoute', 'ngSanitize'])
.config(function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl: '../views/landing-page.html',
        controller: 'LandingCtrl'
      }).      
       when('/test/:test', {
        templateUrl: '../views/test.html',
        controller: 'TestCtrl'        
      }).         
      otherwise({
        templateUrl: '../404.html',
        controller: 'TestCtrl'         
      });

      $locationProvider.html5Mode(true);
  });





