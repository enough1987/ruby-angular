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

   $scope.auth = function(result, user){
       console.log( result );
       if ( result && result.status == 4 ) {
            window.localStorage.setItem("token", JSON.stringify(result.token) );
            document.getElementById("form-error").innerHTML = 'it is done';
            document.getElementsByTagName('input');           

       } else {
            document.getElementById("form-error").innerHTML = result.text;
       }
   };

   $scope.downcase = function (user) {
      if ( !user ) var user  = {};
      for (var prs in user) {
         if(user.hasOwnProperty(prs)) {
            user[prs] = user[prs].toLowerCase();            
         }
      }
      return user;
   };

});

watchApp.controller("TestCtrl", function ($scope, 
$routeParams, $location, $route, $log,
safeApply ) {
  

   $log.debug( $location.path() + " TestCtrl" );


});
 
