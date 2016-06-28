'use strict';

// controllers 

watchApp.controller("AppCtrl", function ($scope, 
$log ) {
  
    $log.debug( " AppCtrl is running" );  

});

watchApp.controller("LandingCtrl", function ($scope, 
$routeParams, $location, $route, $http, $log,
safeApply ) {

   $log.debug( $location.path() + " LandingCtrl" );

   $http.get('api/buy?token='+settings._token).then(function success(res){
      $log.debug("we got page data");       
      $scope.page = res.data; 
      $log.debug($scope.page);      
   }, function error(error){
      $log.error(error.status); $log.error(error.statusText);
   });

   $http.get('api/global?token='+settings._token).then(function success(res){
      $log.debug("we got global data");       
      $scope.global = res.data; 
      $log.debug($scope.global);      
   }, function error(error){
      $log.error(error.status); $log.error(error.statusText);
   });

});

watchApp.controller("SigninupCtrl", function ($scope, 
$routeParams, $location, $route, $log,
safeApply ) {

   $scope.console = console;

   $log.debug( $location.path() + " SigninupCtrl" ); 

   $scope.formSubmit = function(user, path, cp) {
      if ( ! path ) var path = '';
      if ( ! cp ) var cp = '';
      user = $scope.downcase(user);
      if ( ! $scope.validate(user, cp) ) { return '' };
      var xhr = new XMLHttpRequest();
      xhr.open("POST", path); 
      xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8')
      xhr.onreadystatechange = function () {
         if (xhr.readyState == 4 && xhr.status == 200) {
            var result = JSON.parse ( xhr.responseText );
            $scope.auth(result);
         }
      }
      var obj = {};
      obj.user = user;
      $log.debug( obj );
      xhr.send( JSON.stringify(obj) );
      return false;
   };

   $scope.validate = function(user, cp){
      if ( !user.password || user.password.length < 6 ) {
         document.getElementById("form-error").innerHTML = 'password is less than 6 letters';
         return false;         
      }
      if ( !user.email || user.email.length < 6 ) {
         var re = /^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})$/ ;
         if ( ! re.test(user.email) ) {
            document.getElementById("form-error").innerHTML = 'email is not valid';
            return false; 
         }        
      } 
      if( cp ) {
         if ( !user.password_confirmation || 
            user.password_confirmation != user.password ) {
               document.getElementById("form-error").innerHTML = 'passwords is not the same';
               return false; 
         }
      }

      return true;
   };

   $scope.downcase = function (user) {
      if ( !user ) var user  = {};
      for (var prs in user) {
         if(user.hasOwnProperty(prs)) {
            user[prs] = user[prs].toLowerCase();            
         }
      }
      return user;
   }

   $scope.auth = function(result){
       console.log( result );
       if ( result && result.status == 4 ) {
            window.localStorage.setItem("token", JSON.stringify(result.token) );
            settings._token = result.token;
            document.getElementById("form-error").innerHTML = '';
            if ( $scope.$parent.nextStep ) {
               $scope.$parent.nextStep();
            }
       } else {
            document.getElementById("form-error").innerHTML = result.text;
       }
   };

});

watchApp.controller("SearchCtrl", function ($scope, 
$routeParams, $location, $route, $http, $log,
safeApply, scrollServ ) {


   $log.debug( $location.path() + " SearchCtrl" );
   $log.debug( $routeParams.search );


   var searchres = $location.search();
    console.log( searchres ); 
   if ( searchres && 
      searchres['page'] && 
      searchres['per_page'] 
      ) {
      var searchstart = 'page='+searchres['page']+
                        '&per_page='+searchres['per_page'];
      if ( !searchres['name'] || searchres['name'] == 'all' ) {
         $scope.search = 'all';
         searchres['name'] = '';
      } else {
         $scope.search = searchres['name'];
         searchstart += '&q[name_cont]='+searchres['name'];         
      }
      if ( searchres['price_min'] && searchres['price_max'] ) { 
         searchstart += '&price_min='+searchres['price_min'];
         searchstart += '&price_max='+searchres['price_max']; 
         $scope.defaultmin = searchres['price_min'];
         $scope.defaultmax = searchres['price_max'];        
      };
      if ( searchres['tax'] ) { 
         searchstart += '&tax='+searchres['tax']; 
         $scope.tax = searchres['tax'];
      }; 
      if ( searchres['sort'] ) { 
         searchstart += '&sort='+searchres['sort']; 
         $scope.sort = searchres['sort'];
      };

   } else {
      $scope.search = 'all';
      var searchstart = 'page=1&per_page=6';

   } 

   $http.get('api/search_page?token='+settings._token).then(function success(res){
      $log.debug("we got prop data");       
      $scope.prop = res.data; 
      $log.debug($scope.prop);      
   }, function error(error){ 
      $log.error(error.status); $log.error(error.statusText);
   });

   console.log(searchstart);
   $http.get('api/search?'+searchstart+'&token='+settings._token).
   then(function success(res){
      $log.debug("we got page data");       
      $scope.page = res.data; 
      $log.debug($scope.page);      
   }, function error(error){
      $log.error(error.status); $log.error(error.statusText);
   });

   $http.get('api/global?token='+settings._token).then(function success(res){
      $log.debug("we got global data");       
      $scope.global = res.data; 
      $log.debug($scope.global);      
   }, function error(error){
      $log.error(error.status); $log.error(error.statusText);
   }); 

   $scope.sortBy = function ( sort ) {

if ( sort ) {
   console.log( sort );
   $scope.sort = sort;
   $location.search('sort', sort);      
   return '&sort='+ sort;
}
      return '';
   };

   $scope.checkprop = function () {
      var topath = '&tax=', tosearch = '';
      var props = document.getElementsByClassName('prop-search-checkbox');
      Array.prototype.forEach.call(props, function(item){
          if( item.checked ) {
            if ( topath == '&tax=' ) {
              topath += item.getAttribute('data-item-id');
              tosearch += item.getAttribute('data-item-id');
              return ''; 
            }
            topath += "," + item.getAttribute('data-item-id'); 
            tosearch += "," + item.getAttribute('data-item-id'); 
          }
      });
      var gendObj = $scope.gender(topath,tosearch);
      topath = gendObj.topath;
      tosearch = gendObj.tosearch;
      if ( topath == '&tax=' ) {  
         topath = '' 
         $location.search('tax', 0);
      }; 
      if ( topath ) {    $location.search('tax', tosearch)  };
      return topath;
   };

   $scope.searchonkeyup = function (e) {
        e = e || window.event;
        if (e.keyCode === 13) {
            $scope.searchInput();
        }
        return false;
   };

   $scope.gender = function(topath, tosearch){
      var woman = document.getElementById('gender-woman');
      var man = document.getElementById('gender-man');
      if( man.checked ) {
            if ( topath == '&tax=' ) {
               topath += man.getAttribute('data-item-id');
               tosearch += man.getAttribute('data-item-id');
            } else {
               topath += "," + man.getAttribute('data-item-id'); 
               tosearch += "," + man.getAttribute('data-item-id');
            } 
      }
      if( woman.checked ) {
            if ( topath == '&tax=' ) {
               topath += woman.getAttribute('data-item-id');
               tosearch += woman.getAttribute('data-item-id');
            } else {
               topath += "," + woman.getAttribute('data-item-id'); 
               tosearch += "," + woman.getAttribute('data-item-id');
            } 
      }
      if( !woman.checked && !man.checked ) {
            if ( topath == '&tax=' ) {
topath += man.getAttribute('data-item-id') + ','+
woman.getAttribute('data-item-id');
tosearch += man.getAttribute('data-item-id') + ','+
woman.getAttribute('data-item-id');
            } else {
topath += "," + man.getAttribute('data-item-id') + ','+
woman.getAttribute('data-item-id'); 
tosearch += "," + man.getAttribute('data-item-id') + ','+
woman.getAttribute('data-item-id');
            } 
      }
      return { topath, tosearch }; 
   };

   $scope.minmaxprice = function () {
      var topath = '';
      var min = document.querySelector("input[name='slider-price-rangeleft']").value;
      var max = document.querySelector("input[name='slider-price-rangeright']").value;

      $location.search('price_min', min);
      $location.search('price_max', max);

      topath += '&price_min='+min;
      topath += '&price_max='+max;

      return topath;
   };

   $scope.searchbody = function(search) {
      console.log( search );
      var path ='page=1&per_page=6&token='+settings._token ;
      $location.search('page', '1');
      $location.search('per_page', '6');
      path += "&q[name_cont]="+
      ( search  ? search : '' );
      $location.search('name', search);   
      path += $scope.checkprop();
      path += $scope.sortBy();
      path += $scope.minmaxprice(); 
            console.log( path );
      $scope.search = search.toLowerCase();
      var newurl = '/search-page/'+($scope.search ? $scope.search : 'all');
      $location.path(newurl, false);
      console.log($location.url());
      path = 'api/search?'+path;
      $http.get( path ).then(function success(res){
         $log.debug("we got page data");       
         $scope.page = res.data;
         $scope.searchfield = '' ;

         $log.debug($scope.page);     
      }, function error(error){
         $log.error(error.status); $log.error(error.statusText);
      }); 
   };

   $scope.searchClick = searchFunction;
   $scope.searchInput = searchFunction;

   function searchFunction () {
      var search = $scope.searchfield;
      if ( !search ) { search = '' };
      $scope.searchbody(search);
   };

   $scope.newPage = function ( sort ) {
      var path ='per_page=6&token='+settings._token ;
      $location.search('per_page', '6');      
      path += $scope.checkprop();
      path += $scope.sortBy(sort);
      path += $scope.minmaxprice(); 
      path += "&page="+$scope.page['current_page'];
      $location.search('page', $scope.page['current_page']);          
      if( $scope.search ) {
         path += "&q[name_cont]="+searchres['name'];
         $location.search('name', $scope.search);          
      }    
      console.log( path );
      var newurl = '/search-page/'+($scope.search ? $scope.search : 'all');
      $location.path(newurl, false); 
      path = 'api/search?'+path;  
      $http.get( path ).then(function success(res){
         $log.debug("we got page data");       
         $scope.page = res.data; 
         $log.debug($scope.page);    
      }, function error(error){
         $log.error(error.status); $log.error(error.statusText);
      });       
   };
    
   $scope.newSearch = function (page, next) {
      var go = true;
      if ( go && !next ) {
         $scope.page['current_page'] = page;
         $scope.newPage(); go = false;
      }
      if ( go && next == '-' && $scope.page['current_page'] == 1 ) {
         $scope.page['current_page'] = $scope.page['pages']; 
         $scope.newPage(); go = false;      
      }
      if ( go && next == '-' ) {
         $scope.page['current_page']-- ; 
         $scope.newPage(); go = false;      
      }
      if ( go && next == '+' && $scope.page['current_page'] == $scope.page['pages'] ) {
         $scope.page['current_page'] = 1;
         $scope.newPage(); go = false;
      } 
      if ( go && next == '+' ) {
         $scope.page['current_page']++ ;
         $scope.newPage(); go = false;        
      }

      scrollServ(1500);
      

   };   

});

watchApp.controller("SingleProductCtrl", function ($scope, 
$http, $routeParams, $location, $route, $log,
safeApply ) {
  
   $log.debug( $location.path() + " SingleProductCtrl" );
   $log.debug( $routeParams.product );

   $http.get('api/single_page/?id='+$routeParams.product+'&token='+settings._token).
   then(function success(res){
      $log.debug("we got page data");       
      $scope.page = res.data; 
      $log.debug($scope.page);      
   }, function error(error){
      $log.error(error.status); $log.error(error.statusText);
   });

   $http.get('api/global?token='+settings._token).then(function success(res){
      $log.debug("we got global data");       
      $scope.global = res.data; 
      $log.debug($scope.global);      
   }, function error(error){
      $log.error(error.status); $log.error(error.statusText);
   });   

});


watchApp.controller("SellerStepCtrl", function ($scope, 
$http, $routeParams, $location, $route, $log, 
safeApply, scrollServ ) {
  
   $log.debug( $location.path() + " SingleProductCtrl" );
   $log.debug( $routeParams.step );
   $scope.step = $routeParams.step

   switch($scope.step) {
      case '3':  
         $scope.maincontent = 'views/seller-steps/seller-step-3-main-content.html';
      break;
      case '2':  
         $scope.maincontent = 'views/seller-steps/seller-step-2-main-content.html';
         $scope.step2form = 1;
      break;
      default:
         $scope.maincontent = 'views/seller-steps/seller-step-1-main-content.html';
         $location.path('/seller-step/1', false); 
         $scope.newgoods = {
            "brand" : "",
            "model" : "",
            "condition" : "",
            "reference" : "",
            "content" : "",
            "comment" : ""
         };

      break;
   };

   $scope.nextStep = function() {

      switch($scope.step) {
         case '3':  
            
            break;
         case '2':  
            $scope.secondStep();
            break;
         default:
            $scope.firstStep();
            break;
      }

   };

   $scope.secondStep = function(){
         console.log( ' go go go' );
      if ( settings._token == settings.old_token ) {
         alert( 'register or login first' );
         scrollServ(1500); 
      } else {
         $scope.step = '3';     
         $location.url('/seller-step/3');         
         $scope.maincontent = 'views/seller-steps/seller-step-3-main-content.html'; 
         safeApply($scope); 
         scrollServ(1500);        
      }
   };

   $scope.firstStep = function () {

      console.log( $scope.newgoods );
     

      /*
      store['first_name'] = '111';
      store['last_name'] = '111';
      store['phone'] = '111';
      store['adres'] = '111';
      store['images'] = '111';
      store['period'] = '111';

      store['email'] = '+++';      
      */

      var valid = $scope.validate($scope.newgoods) ;

      if ( ! valid.status ) {
         alert( valid.error ); 
      } else {
         $scope.step = '2'; 
         $scope.step2form = 1;         
         $location.url( '/seller-step/2' );          
         $scope.maincontent = 'views/seller-steps/seller-step-2-main-content.html';
         scrollServ(1500);
         $scope.savelocal( 'sellerinfo', $scope.newgoods );
      }


   };

   $scope.validate = function (newgoods) {
      var ret = {'status' : true, 'error': ''};
      Array.prototype.forEach.call(newgoods, function(item){
         console.log( item );
         if( item == '' ) {
            ret.status = false;
            ret.error = 'field ' + item + ' is not valid';          
         }
      });
      return false ; ret;
   };



   $scope.savelocal = function(name, store){
      window.localStorage.setItem( name, JSON.stringify(store) );
   };

   $scope.getlocal = function(name){
         return JSON.parse ( window.localStorage.getItem(name) );
   };

   $scope.changestep2form = function(form){
      $scope.step2form = form;
      $scope.clearError();
   };
   $scope.clearError = function () {
      document.querySelector('#form-error').innerHTML = '';
   };

   $scope.endstep = function () {

      var xhr = new XMLHttpRequest();
      xhr.open( "POST", "/api/seller/add" ); 
      xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8')
      xhr.onreadystatechange = function () {
         if (xhr.readyState == 4 && xhr.status == 200) {
            var result = JSON.parse ( xhr.responseText );
            console.log(result);
         }
      }

      var obj = {};
      obj['seller_add'] = store;
      $log.debug( obj );
      console.log( JSON.stringify(obj) );      

      xhr.send( JSON.stringify(obj) );

   };


});

watchApp.controller("TestCtrl", function ($scope, 
$routeParams, $location, $route, $log,
safeApply ) {
  
   $log.debug( $location.path() + " TestCtrl" );

});
 
