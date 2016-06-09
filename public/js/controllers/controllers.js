'use strict';

// controllers

watchApp.controller("LandingCtrl", function ($scope, 
$routeParams, $location, $route, $log,
safeApply ) {
  
   $log.debug( $location.path() + " LandingCtrl" );

   var path = '';
   var xhr = new XMLHttpRequest();
   xhr.open("GET", path); 
   xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        console.log( xhr.responseText );
      }
   }
   xhr.send();


});

watchApp.controller("SigninupCtrl", function ($scope, 
$routeParams, $location, $route, $log,
safeApply ) {

   $log.debug( $location.path() + " SigninupCtrl" ); 

   $scope.formSubmit = function(user, path) {
      $log.debug( user ); 
      if ( ! path ) var path = '';
      var xhr = new XMLHttpRequest();
      xhr.open("POST", path); 
      xhr.onreadystatechange = function () {
         if (xhr.readyState == 4 && xhr.status == 200) {
            console.log( xhr.responseText );
         }
      }
      var obj = {};
      obj.user = user;
      console.log( obj );
      xhr.send( JSON.stringify(obj) );
      return false;
   };


});

watchApp.controller("TestCtrl", function ($scope, 
$routeParams, $location, $route, $log,
safeApply ) {
  

   $log.debug( $location.path() + " TestCtrl" );


});
 
