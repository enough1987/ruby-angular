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
            document.getElementById("form-error").innerHTML = '';
       } else {
            document.getElementById("form-error").innerHTML = result.text;
       }
   };

});

watchApp.controller("SearchCtrl", function ($scope, 
$routeParams, $location, $route, $http, $log,
safeApply ) {

   $scope.log = function(log){
    alert(log);
   };

   $log.debug( $location.path() + " SearchCtrl" );
   $log.debug( $routeParams.search );

   var searchres = $location.search();
   if ( searchres && 
      searchres['page'] && 
      searchres['per_page'] &&
      searchres['name'] ) {

      $scope.search = searchres['name'];
      var searchstart = 'page='+searchres['page']+
                        '&per_page='+searchres['per_page']+
                        '&q[name_cont]='+searchres['name'];
      if ( searchres['tax'] ) { 
         searchstart += '&tax='+searchres['tax']; 
         $scope.tax = searchres['tax'];  
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
   document.getElementById('sortByPrice-asc').setAttribute('data-sort', "false");
   document.getElementById('sortByPrice-asc').classList.remove('g-sort-hover');
   document.getElementById('sortByPrice-desc').setAttribute('data-sort', "false");
   document.getElementById('sortByPrice-desc').classList.remove('g-sort-hover');
   document.getElementById('sortByName-asc').setAttribute('data-sort', "false");
   document.getElementById('sortByName-asc').classList.remove('g-sort-hover');
   document.getElementById('sortByName-desc').setAttribute('data-sort', "false");
   document.getElementById('sortByName-desc').classList.remove('g-sort-hover');
   document.getElementById(sort).setAttribute('data-sort', "true");
   document.getElementById(sort).classList.add('g-sort-hover');
}
if ( document.getElementById('sortByPrice-asc').getAttribute('data-sort') == 'true' ) {
   $location.search('sort', 'price_asc');      
   return '&sort=price_asc';
}
if ( document.getElementById('sortByPrice-desc').getAttribute('data-sort') == 'true' ) {
   $location.search('sort', 'price_desc');  
   return '&sort=price_desc';
}
if ( document.getElementById('sortByName-asc').getAttribute('data-sort') == 'true' ) {
   $location.search('sort', 'name_asc');  
   return '&sort=name_asc';
}
if ( document.getElementById('sortByName-desc').getAttribute('data-sort') == 'true' ) {
   $location.search('sort', 'name_desc');  
   return '&sort=name_desc';
}
      return '';
   };

   $scope.checkprop = function () {
      var topath = '&tax=', tosearch = '';
      var props = document.getElementsByClassName('standart-checkbox');
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
    }


   $scope.searchInput = function () {
      var search = document.getElementById('search-field').value ;
      if ( !search || search.length > 40 || search.length < 2 ) {
          document.getElementById('search-field').value = '' ;
          document.getElementById('search-field-label').innerHTML = 'Try to search here:'
          return false;
      }
      console.log( search );
      var path ='page=1&per_page=6&token='+settings._token ;
      $location.search('page', '1');
      $location.search('per_page', '6');
      path += "&q[name_cont]="+search;
      $location.search('name', search);      
      path += $scope.checkprop();
      path += $scope.sortBy(); 
      console.log( path );
      $scope.search = search.toLowerCase();
      var newurl = '/search-page/'+$scope.search;
      $location.path(newurl, false);
      console.log($location.url());
      path = 'api/search?'+path;
      $http.get( path ).then(function success(res){
         $log.debug("we got page data");       
         $scope.page = res.data;
         document.getElementById('search-field').value = '' ;
         $log.debug($scope.page);     
      }, function error(error){
         $log.error(error.status); $log.error(error.statusText);
      });      
   };

   $scope.newPage = function ( sort ) {
      var path ='per_page=6&token='+settings._token ;
      $location.search('per_page', '6');      
      path += $scope.checkprop();
      path += $scope.sortBy(sort);
      path += "&page="+$scope.page['current_page'];
      $location.search('page', $scope.page['current_page']);          
      if( $scope.search ) {
         path += "&q[name_cont]="+$scope.search;
         $location.search('name', $scope.search);          
      }    
      console.log( path );
      var newurl = '/search-page/'+$scope.search;
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
      if ( !next ) {
         $scope.page['current_page'] = page;
         $scope.newPage(); return '';
      }
      if ( next == '-' && $scope.page['current_page'] == 1 ) {
         $scope.page['current_page'] = $scope.page['pages']; 
         $scope.newPage(); return '';      
      }
      if ( next == '-' ) {
         $scope.page['current_page']-- ; 
         $scope.newPage(); return '';      
      }
      if ( next == '+' && $scope.page['current_page'] == $scope.page['pages'] ) {
         $scope.page['current_page'] = 1;
         $scope.newPage(); return '';
      } 
      if ( next == '+' ) {
         $scope.page['current_page']++ ;
         $scope.newPage(); return '';        
      }

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

watchApp.controller("TestCtrl", function ($scope, 
$routeParams, $location, $route, $log,
safeApply ) {
  
   $log.debug( $location.path() + " TestCtrl" );

});
 
