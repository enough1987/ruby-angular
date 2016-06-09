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


watchApp.controller("TestCtrl", function ($scope, 
$routeParams, $location, $route, $log,
safeApply ) {
  

   $log.debug( $location.path() + " TestCtrl" );


});
 
