


var watchApp = angular.module("watchApp", 
	['ngRoute', 'ngSanitize', 'rzModule'] );

watchApp.config(function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'views/landing/init.html',
        controller: 'LandingCtrl',
        resolve: {
            page: function(promisesServ){
                return promisesServ.get_api_buy();
            },
            global: function(promisesServ){
                return promisesServ.get_api_global();
            }
        }
      }). 
       when('/search-page', {
        templateUrl: 'views/search-page/init.html',
        controller: 'SearchCtrl',
        resolve: {
/*           
            prop: function(promisesServ){
                return promisesServ.get_api_search_page();
            },
*/           
            page: function(promisesServ){
                return promisesServ.get_api_search();
            },
            global: function(promisesServ){
                return promisesServ.get_api_global();
            }
        }        
      }).  
      when('/single-product/:product', { 
        templateUrl: 'views/single-product/init.html',
        controller: 'SingleProductCtrl',
        resolve: {
            page: function(promisesServ){
                return promisesServ.get_api_single_page();
            },
            global: function(promisesServ){
                return promisesServ.get_api_global();
            }
        }           
      }). 
       when('/seller-landing', {
        templateUrl: 'views/seller-landing/init.html',
        controller: 'TestCtrl'        
      }).
       when('/seller-step/:step', {
        templateUrl: 'views/seller-steps/init.html',
        controller: 'SellerStepCtrl'        
      }). 
      when('/personal-page', {
        templateUrl: 'views/personal-page/init.html',
        controller: 'PersonalPageCtrl',
        resolve: {
            cabinet: function(promisesServ){
                return promisesServ.get_api_cabinet();
            }
        }       
      }).
       when('/buyer-step/:buystep', {
        templateUrl: 'views/buyer-steps/init.html',
        controller: 'BuyerStepsCtrl'        
      }).        
      when('/add-privacy', {
        templateUrl: 'views/add-privacy/init.html',
        controller: 'TestCtrl'        
      }).                  
       when('/add-terms', {
        templateUrl: 'views/add-terms/init.html',
        controller: 'TestCtrl'        
      }). 
       when('/faq-page', {
        templateUrl: 'views/faq-page/init.html',
        controller: 'TestCtrl'        
      }).
       when('/contact-page', {
        templateUrl: 'views/contact-page/init.html',
        controller: 'TestCtrl'        
      }). 
       when('/watch-service', {
        templateUrl: 'views/watch-service/init.html',
        controller: 'WatchServiceCtrl'        
      }).
       when('/career-page', {
        templateUrl: 'views/career-page/init.html',
        controller: 'CareerCtrl'        
      }). 
       when('/career-page/:career', {
        templateUrl: 'views/career-page/init.html',
        controller: 'CareerCtrl'        
      }).
       when('/api/paypal', {
        templateUrl: 'views/test1.html',
        controller: 'TestCtrl'        
      }). 
       when('/test1', {
        templateUrl: 'views/test1.html',
        controller: 'TestCtrl'        
      }).    
       when('/test2', {
        templateUrl: 'views/test2.html',
        controller: 'TestCtrl'        
      }).       
      otherwise({
        templateUrl: '404.html',
        controller: 'TestCtrl'         
      });

      $locationProvider.html5Mode(true);  
  });

/*
watchApp.config(['$httpProvider', function ($httpProvider) {
            // enable http caching
           $httpProvider.defaults.cache = true;
}]);  
*/

watchApp.run(['$route', '$rootScope', '$location', function ($route, $rootScope, $location) {
    var original = $location.path;
    $location.path = function (path, no_reload) {
        if (no_reload === 'no_reload') {
            var lastRoute = $route.current;
            var un = $rootScope.$on('$locationChangeSuccess', function () {
                $route.current = lastRoute;
                un();
            });
        }
        return original.apply($location, [path]);
    };
}]);


watchApp.run(['$rootScope',function($rootScope){

    $rootScope.stateIsLoading = false;

    $rootScope.$on('$routeChangeStart', function() {
        $rootScope.stateIsLoading = true;
       // console.log.info( '$routeChangeStart ' );

    });
    $rootScope.$on('$routeChangeSuccess', function() {
        $rootScope.stateIsLoading = false;
       // console.log.info( '$routeChangeSuccess ' );
    });


}]);





