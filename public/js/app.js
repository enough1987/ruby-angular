
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
      when('/signinup', {
        templateUrl: '../views/signinup.html',
        controller: 'SigninupCtrl'        
      }).
       when('/buy-check-step-1mobile', {
        templateUrl: '../views/buy-check-step-1mobile.html',
        controller: 'TestCtrl'        
      }). 
       when('/buy-check-step-2mobile', {
        templateUrl: '../views/buy-check-step-2mobile.html',
        controller: 'TestCtrl'        
      }). 
       when('/buy-check-step-3mobile', {
        templateUrl: '../views/buy-check-step-3mobile.html',
        controller: 'TestCtrl'        
      }). 
       when('/search-page', {
        templateUrl: '../views/search-page.html',
        controller: 'TestCtrl'        
      }).  
       when('/seller-landing-page', {
        templateUrl: '../views/seller-landing-page.html',
        controller: 'TestCtrl'        
      }).
       when('/seller-step-1', {
        templateUrl: '../views/seller-step-1.html',
        controller: 'TestCtrl'        
      }). 
       when('/seller-step-2', {
        templateUrl: '../views/seller-step-2.html',
        controller: 'TestCtrl'        
      }). 
       when('/seller-step-3', {
        templateUrl: '../views/seller-step-3.html',
        controller: 'TestCtrl'        
      }).         
       when('/single-product-page', {
        templateUrl: '../views/single-product-page.html',
        controller: 'TestCtrl'        
      }).      
       when('/UIKit', {
        templateUrl: '../views/UIKit.html',
        controller: 'TestCtrl'        
      }).       
       when('/test', {
        templateUrl: '../views/test.html',
        controller: 'TestCtrl'        
      }).         
      otherwise({
        templateUrl: '../404.html',
        controller: 'TestCtrl'         
      });

      $locationProvider.html5Mode(true);
  });





