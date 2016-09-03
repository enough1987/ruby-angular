


watchApp.factory('save_userExpServ', function($http) {
           return function ($scope){

$scope.save_user = function(new_user){
         
         if ( ! $scope.personal_page_validate_user(new_user) ) {
               return false;
         }
         
         $("#save-btn").attr( "style", 'background-color:#b0b3b0 !important;' );

         $http.post('/api/edit_profile', {
               'token' : settings._token,
               'user' : new_user 
         }).
         then(function success(res){
            console.log.get("save_userExpServ got response from ( /api/edit_profile )", res);
            $scope.page.user = window.clone_obj($scope.new_user);
 
            
            $(".cart-modal-container").removeClass("cart-modal-container_visible"); 
            $("#save-btn").attr( "style", '' );
      }, function error(error){
            console.error(error.status); console.error(error.statusText);
      }); 
      
};
   
           };
});

watchApp.factory('personal_page_validate_userExpServ', function(validateServ) {
           return function ($scope){

      
   $scope.personal_page_validate_user = function( new_user ) {
         var go = true;
         var re = '';
         document.getElementById("form-error").innerHTML = '';
         
         validateServ.is_not_empty( new_user.name, 'name' ) ? '' : go = false; 
         validateServ.is_not_empty( new_user.last_name, 'last_name' ) ? '' : go = false; 
         validateServ.phone( new_user.phone ) ? '' : go = false; 
         validateServ.email( new_user.email ) ? '' : go = false; 

          return go;                     
   };
   
           };
});

watchApp.factory('signinupExpServ', function($http, $location, cartOrderServ, validateServ, safeApply ) {
           return function ($scope){


   $scope.changestep2form = function(form){
      $scope.$root.step2form = form;
      $scope.clearError();

   };


   $scope.clearError = function () {
      document.querySelector('#form-error').innerHTML = '';
   };
  
   $scope.$root.formSubmit = function(user, path, cp) {

      if ( ! path ) var path = '';
      if ( ! cp ) var cp = '';
      user = $scope.downcase(user);
      if ( ! $scope.validate(user, cp) ) { return '' };
      var obj = {};
      obj.user = user;
      $scope.$root.social_block_hide ? obj.state = 'social_registration' : '' ;
      $http.post( path, obj ).then(function success(res){ 
         console.log.get('$root.formSubmit form signinupExpServ got response ( post msg to '+path+' )', res); 
         $scope.auth(res.data);     
      }, function error(error){
         console.error(error.status);  console.error(error.statusText);
      });
      return false;
     
   };

   $scope.validate = function(user, cp){ 
      var go = true;
      document.getElementById("form-error").innerHTML = '';    
      if ( cp ) { 

         validateServ.is_not_empty(  user.name, 'name' ) ? '' : go = false; 
         validateServ.is_not_empty(  user.last_name, 'last_name' ) ? '' : go = false;          
         validateServ.phone( user.phone ) ? '' : go = false; 
         validateServ.email( user.email ) ? '' : go = false; 
         if ( !$scope.$root.social_block_hide ) {
            validateServ.password( user.password ) ? '' : go = false; 
            validateServ.password_is_equal( user.password , user.password_confirmation ) ? '' : go = false; 
         }
         if ( location.pathname == '/seller-step/2' ) {
            validateServ.is_not_empty( user.full_adress , 'adress' ) ? '' : go = false;  
         } else {
            //validateServ.is_not_empty( user.adres , 'adress' ) ? '' : go = false;  
         }

      }     
      if ( ! cp ) {   
        validateServ.email( user.email ) ? '' : go = false; 
        validateServ.password( user.password ) ? '' : go = false;
         if ( location.pathname == '/seller-step/2' ) {
            validateServ.is_not_empty( user.full_adress , 'adress' ) ? '' : go = false;  
         } 
                                         
      }
      return go;
   };

   $scope.downcase = function (user) {
      if ( !user ) var user  = {};
      for (var prs in user) {
         if(user.hasOwnProperty(prs)) {
            if ( typeof user[prs] != "string" ) { 
               continue;
            };
            user[prs] = user[prs].toLowerCase();            
         }
      }
      return user;
   };
  
   $scope.auth = function(result){
       if ( result && (result.status == 4 || result.status == 200) ) {
            settings._token = result.user.spree_api_key;            
            settings_user = result.user;  
            try {
                window.localStorage._token = settings._token;  
                window.localStorage.settings_user = JSON.stringify(settings_user); 
                cartOrderServ('merge');
                document.getElementById("form-error").innerHTML = '';
                $scope.$parent.nextStep ? $scope.$parent.nextStep(1) : location.href = $location.absUrl(); 
                //$scope.$parent.nextStep ? $scope.$parent.nextStep(1) : '' ; 

            } catch(e) { console.error( e ); }                    
       } else {
            msg = '';
            if ( result['error'] ) {
                  for (var prs in result['error']) {
                        if(result['error'].hasOwnProperty(prs)) {
                              msg += 'field ' + prs + ' ' + result['error'][prs] + '</br>';
                        }
                  }
            }
            if ( result['text'] ) { 
               msg += ' ' + result['text'];   
            }
            document.getElementById("form-error").innerHTML = msg;
       }
   };

 window.oneall_my_on_login_mobile = function(token){
    console.log(' mobile ALLAH ACBAR ')
    $scope.oneall_token = token;
    $scope.send_to_oneall( $scope.oneall_token );   
 };

  window.oneall_my_on_login = function(args) {
    console.log(' ALLAH ACBAR ')
    //console.log('on_login_redirect ',  args);
    $scope.oneall_token = args.connection.connection_token;          
    $scope.send_to_oneall( $scope.oneall_token );    
    return;
  };

  $scope.send_to_oneall = function(token, phone){
    phone = phone ? phone : '' ; 
    var state_social = $scope.$root.step2form == 1 ? 'registration' : 'login' ;
    $http.get( "/api/oauth?connection_token=" + token +
    '&phone='+phone+
    '&state='+state_social )
    .then(function success(res){   
        console.log( "/api/oauth?connection_token=" + token +'&phone='+phone+'&state='+state_social , res );

        if ( state_social == 'registration' && res.data.status == 200 ) {
              console.log( 'registration 200', res.data.one_all_data[0] );
                  !$scope.$root.userup ? $scope.$root.userup = {} : '' ;
                  $scope.$root.userup.name = res.data.one_all_data[0].name;
                  $scope.$root.userup.last_name = res.data.one_all_data[0].last_name;
                  $scope.$root.userup.email = res.data.one_all_data[0].email;
                  $scope.$root.userup.phone = res.data.one_all_data[0].phone;
                  $scope.$root.social_block_hide = true;
                  document.getElementById("form-error").innerHTML = 
              'we got only part of needed data, you need to fill in the blanks';
        }
        if ( state_social == 'registration' && res.data.status == 400 ) {
              console.log( 'registration 400', res.data );
              document.getElementById("form-error").innerHTML = res.data.error; 
        } 
        if ( state_social == 'registration' && res.data.status == 500 ) {
              console.log( 'registration 500', res.data.error );
              document.getElementById("form-error").innerHTML = res.data.error;
        } 
        if ( state_social == 'login' && res.data.status == 200 ) {
              console.log( 'login 200', res.data );
              if ( location.pathname == '/seller-step/2' ) {
                  //console.log( location.pathname );
                  $scope.$root.social_login_new = {
                        user : res.data.user,
                        token : res.data.user.spree_api_key
                  };
                  $scope.$root.userin = $scope.$root.social_login_new.user
                  $scope.$root.seller_full_adress = $scope.$root.userin.full_adress;

                  safeApply($scope);
                  document.getElementById("form-error").innerHTML = '';
                  //console.log( $scope.$root.social_login_new )
              } else {
                  $scope.auth( res.data );
              }
        }        
        if ( state_social == 'login' && res.data.status == 500 ) {
              console.log( 'login 500', res.data );
              document.getElementById("form-error").innerHTML = res.data.error; 
        }

        //console.log("/api/oauth?connection_token=" + token +'&phone='+phone, res );
/*
        if ( res.data.status == 500 ) {
              console.log( ' Хакуна Матата ' );
              $scope.block_oneall_phone = true;
              $scope.oneall_need_phone(token);
              console.log( res );
        } 
        if ( res.data.status == 4 ) { 
              $scope.block_oneall_phone = false;   
              var settings_oneall_user = res.data.user;
              settings._token = res.data.user.spree_api_key;
              window.localStorage.setItem( "settings_user", JSON.stringify( settings_oneall_user ) ); 
              window.localStorage.setItem( "_token", settings._token );   
              document.getElementById("form-error").innerHTML = '';
              if ( $scope.$parent.nextStep ) {
                 cartOrderServ('merge', 'not_change_root_scope');   
                 $scope.$parent.nextStep(1);
              } else {
                 location.href = $location.absUrl(); 
              }              

        }  
*/
     }, function error(error){
         console.error(error.status); console.error(error.statusText);
     });
  };  

  $scope.oneall_need_phone = function () {
      console.log( $scope.oneall );
      if( $scope.oneall && $scope.oneall.phone ) {
        $scope.send_to_oneall($scope.oneall_token, $scope.oneall.phone);
      }
  };

           };
});

watchApp.factory('deleteHeartExpServ', function($http, safeApply) {
           return function ($scope){

   $scope.deleteHeart =  function( item ) {
      $http.get('/api/favorite/destroy?token='+settings._token+
      '&id='+item).then(function success(res){

      console.log.get('we got favorites (res.data.favorites) from ( /api/favorite/destroy?token='+
      settings._token+'&id='+item +' )' , res);

      window.localStorage.setItem( "settings_hearts", JSON.stringify(res.data.favorites) ); 
      $scope.favorites = res.data.favorites; 
      safeApply($scope);

      }, function error(error){
            console.log(error.status); console.log(error.statusText);
      });
 };      
 
   
           };
});

watchApp.factory('favoriteHeartExpServ', function($http, safeApply) {
           return function ($scope){

   $scope.merge_hearts = function(){             
    if ( settings._token == settings.old_token ) { return '' };
    var hearts = JSON.parse(window.localStorage.getItem("settings_hearts")) ? 
    JSON.parse(window.localStorage.getItem("settings_hearts")) : []; 

    var ids = hearts.join(',');

    //console.log( 'ids ', ids ) ;    
       
    $http.get('/api/favorite/pack?token='+settings._token+
    '&ids='+ids).then(function success(res){
      console.log.get( '/api/favorite/pack?token='+settings._token+'&ids='+ids, res );  
      var favorites = res.data && res.data.favorites ? res.data.favorites : [];
      
      var hearts = [];
      favorites.forEach(function(item){
            hearts.push(item.id);
      }); 

      window.localStorage.setItem( "settings_hearts", JSON.stringify(hearts) );
      //console.log( hearts );
      $scope.favorites = res.data.favorites; 
      safeApply($scope);

    }, function error(error){
      console.error(error.status); console.error(error.statusText);
    });

   };
   
           };
});

watchApp.factory('searchExpServ', function($http, $location, scrollServ) {
           return function ($scope){

/*

   $scope.sortBy = function ( sort ) {
    if ( sort ) {
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
      if( man && man.checked ) {
            if ( topath == '&tax=' ) {
               topath += man.getAttribute('data-item-id');
               tosearch += man.getAttribute('data-item-id');
            } else {
               topath += "," + man.getAttribute('data-item-id'); 
               tosearch += "," + man.getAttribute('data-item-id');
            } 
      }
      if(  woman && woman.checked ) {
            if ( topath == '&tax=' ) {
               topath += woman.getAttribute('data-item-id');
               tosearch += woman.getAttribute('data-item-id');
            } else {
               topath += "," + woman.getAttribute('data-item-id'); 
               tosearch += "," + woman.getAttribute('data-item-id');
            } 
      }
      if( (woman && man) && !woman.checked && !man.checked ) {
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
      var testobj = {};
      testobj.topath = topath;
      testobj.tosearch = tosearch;
      return testobj; 
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

   $scope.searchbody = function(search, sort, page) {
      $scope.local_loader_is_going = true;
      //console.log( search );      
      var path ='per_page=6&token='+settings._token ;
      path += '&page='+(page ? $scope.page['current_page'] : '1'  );
      $location.search('page', (page ? $scope.page['current_page'] : '1'  )  );
      $location.search('per_page', '6');
      path += "&q[name_cont]="+ ( search  ? search : '' );
      $location.search('name', search);   
      path += $scope.checkprop();
      path += $scope.sortBy(sort);
      path += $scope.minmaxprice(); 
            //console.log( path );
      $scope.search = search.toLowerCase();
      var newurl = '/search-page/'+($scope.search ? $scope.search : 'all');
      $location.path(newurl,'no_reload');
      console.log($location.url());
      path = 'api/search?'+path+'&currency='+settings.appcur;
      $http.get( path ).then(function success(res){     
         $scope.page = res.data;
         $scope.local_loader_is_going = false;
         //$scope.searchfield = '' ;
         console.log.get("$scope.searchbody from searchExpServ  got page data ( "+path+" )", $scope.page);
      }, function error(error){
         console.error(error.status); console.error(error.statusText);
      }); 
   }; 
  
   $scope.searchFunction = function (sort, page) {
      var search = $scope.searchfield;
      if ( !search ) { 
            searchres = $location.search();
            if ( ! searchres['name'] ) {
               search = ''
            } else {
               search = searchres['name'];   
            }
       };
      $scope.searchbody(search, sort, page );
   };

   $scope.searchClick = $scope.searchFunction;
   $scope.searchInput = $scope.searchFunction;
   $scope.newPage =$scope.searchFunction; // sort, page   
 

   $scope.newSearch = function (page, next) {
      var go = true;
      if ( go && !next ) {
         $scope.page['current_page'] = page;
         $scope.newPage(false, true); go = false;
      }
      if ( go && next == '-' && $scope.page['current_page'] == 1 ) {
         $scope.page['current_page'] = $scope.page['pages']; 
         $scope.newPage(false, true); go = false;      
      }
      if ( go && next == '-' ) {
         $scope.page['current_page']-- ; 
         $scope.newPage(false, true); go = false;      
      }
      if ( go && next == '+' && $scope.page['current_page'] == $scope.page['pages'] ) {
         $scope.page['current_page'] = 1;
         $scope.newPage(false, true); go = false;
      } 
      if ( go && next == '+' ) {
         $scope.page['current_page']++ ;
         $scope.newPage(false, true); go = false;        
      }
      scrollServ(1500);
      

   }; 

*/  

           }
});


watchApp.factory('singleProductExpServ', function() {
           return function ($scope){

                $scope.change_main_img = function(item){
                    $scope.main_img = item;
                } ;

                $scope.close_product_added_already_modal = function() {
                      $scope.$root.product_added_already_modal  = !$scope.$root.product_added_already_modal;
                } ;
         
           }
});

watchApp.factory('sellerStepExpServ', function($http, $location, safeApply, localServ, scrollServ, cartOrderServ) {
   return function ($scope){

     

     $scope.defaultswitch = function (){
         $scope.step = 1;
         $scope.breadcrumbtext2 = "Watch information";
         $scope.maincontent = 'views/seller-steps/seller-step-1-main-content.html';
         $location.path('/seller-step/1','no_reload');
         $scope.newgoods = $scope.newgoods ? $scope.newgoods : {
            "brand" : "",
            "model" : "",
            "condition" : "",
            "reference" : "",
            "year" : "",
            "content" : "",
            "comment" : ""
         };

         if( $scope.returnscroll ) {
               scrollServ(1500); 
               $scope.returnscroll = false;
         }
       
     };

     $scope.checkgoodsswitch = function(){
         var go = false;
         $scope.newgoods = localServ.get("sellerinfo");
         if ( !$scope.newgoods || !$scope.newgoods["brand"] )  {
               $scope.defaultswitch ();
               go = true;
         }
         return go;
     };

   $scope.start_choose_case = function(){
      switch($scope.step) {
       case '3':
         if ($scope.checkgoodsswitch()) { break; };
         if (  settings.old_token == settings._token ) {
                $scope.step = 2;
                $scope.breadcrumbtext2 = "Personal details"; 
                $scope.maincontent = 'views/seller-steps/seller-step-2-main-content.html';                
                $location.path('/seller-step/2','no_reload');
                break;              
         }
         $scope.breadcrumbtext2 = "Book your inspection";
         $scope.maincontent = 'views/seller-steps/seller-step-3-main-content.html';

       break;
       case '2':
         if ($scope.checkgoodsswitch()) { break; };
         $scope.breadcrumbtext2 = "Personal details";
         $scope.maincontent = 'views/seller-steps/seller-step-2-main-content.html';

       break;      
       case 'success': 
         $scope.breadcrumbtext2 = "success";              
         $scope.maincontent = "views/global/after-steps-page.html";

       break;
       default:
            $scope.defaultswitch ();
       break;
     };
   };

   $scope.nextStep = function() {
      switch( $scope.step ) {
         case '3' :  

            $scope.endstep();

            break;
         case '2' :  
            $scope.secondStep();
            break;                    
         default:
            //$scope.breadcrumbtext2 = "Watch information";
            $scope.firstStep();
            break;
      }
   };

   $scope.register_or_login_seller = function(){         
         !$scope.$root.userup ? $scope.$root.userup = {} : '' ;
         !$scope.$root.userin ? $scope.$root.userin = {} : '' ;
         $scope.$root.userup.full_adress = document.getElementById('googleaddress').value ;
         $scope.$root.userin.full_adress = document.getElementById('googleaddress').value ; 

         //console.log( $scope.$root.userin.full_adress );
         //console.log( document.getElementById('googleaddress').value );         


         if($scope.$root.step2form == 1 ) { 
            console.log( $scope.$root.userup );
            $scope.$root.formSubmit( $scope.$root.userup, '/api/sign_up', true ) ;// reg
         }
         if ( !$scope.$root.social_login_new ) { $scope.$root.social_login_new = {} }
         if( $scope.$root.step2form == 2 && !$scope.$root.social_login_new.token ) { 
            $scope.$root.formSubmit( $scope.$root.userin, '/api/sign_in' ) ; // log
         }
         if( $scope.$root.step2form == 2 && $scope.$root.social_login_new.token ) { 
            $scope.$root.social_login_new.user.full_adress = document.getElementById('googleaddress').value ;

            $http.post('/api/edit_profile', {
               'token' : $scope.$root.social_login_new.token,
               'user' : $scope.$root.social_login_new.user
            }).
            then(function success(result){
                  console.log.get("$scope.register_or_login_seller got response from ( /api/edit_profile )", result);
                  var res = result.data;
                  settings._token = res.user.spree_api_key;            
                  settings_user = res.user;  
                  window.localStorage._token = settings._token;  
                  window.localStorage.settings_user = JSON.stringify(settings_user); 
                  cartOrderServ('merge');
                  $scope.nextStep(1); 
            }, function error(error){
                  console.error(error.status); console.error(error.statusText);
            }); 
         }

         scrollServ(1500); 
   };

   $scope.backStep = function() {
         $scope.returnscroll = true;
         $scope.defaultswitch();           
   }; 

   $scope.secondStep = function(){
         console.log( ' secondStep is going ' );

      if ( settings._token == settings.old_token ) {
         alert('stop');          
      } else {
         $scope.step = '3';     
         $location.url('/seller-step/3'); 
         $scope.breadcrumbtext2 = "Book your inspection";        
         $scope.maincontent = 'views/seller-steps/seller-step-3-main-content.html'; 
         safeApply($scope); 

         scrollServ(1500);  
    
      }
      
   };

   $scope.firstStep = function () {
      console.log( 'firstStep is going, newgoods is ', $scope.newgoods );   

      var valid = $scope.validate__newgoods($scope.newgoods) ;
      if ( ! valid.status ) {
         document.getElementById('form-error').innerHTML = valid.error;
      } else {
         if ( settings.old_token != settings._token ) {
            $scope.step = '2'; 
            $scope.nextStep();
            localServ.save( 'sellerinfo', $scope.newgoods );
            return '';
         }
         $scope.step = '2';        
         $location.url( '/seller-step/2' ); 
         $scope.breadcrumbtext2 = "Personal details";          
         $scope.maincontent = 'views/seller-steps/seller-step-2-main-content.html';

         scrollServ(1500);
         localServ.save( 'sellerinfo', $scope.newgoods );
      }
   };

   $scope.validate__newgoods = function (newgoods) {
      var ret = {'status' : true, 'error': ''};
      var re = '';
      if ( ! newgoods.brand  ) {
         ret.status = false;
         ret.error = 'field brand is not valid';              
      }      
      if ( ! newgoods.model  ) {
         ret.status = false;
         ret.error = 'field model is not valid';              
      }
      if ( ! newgoods.condition  ) {
         ret.status = false;
         ret.error = 'field condition is not valid';              
      }       
      if ( ! newgoods.reference  ) {
         ret.status = false;
         ret.error = 'field condition is not valid';              
      }
re = /^[0-9]{1,5}$/;           
      if ( !newgoods.year || ! re.test(newgoods.year) ) { 
         ret.status = false;
         ret.error = 'field year is not valid';                  
      }             
      return ret;
   };
/*
   $scope.changestep2form = function(form){
      $scope.step2form = form;
      $scope.clearError();
   };

   $scope.clearError = function () {
      document.querySelector('#form-error').innerHTML = '';
   };
*/

   $scope.endstep = function () {

      if ( settings._token == settings.old_token ) {
         alert(' we can not go next, register first');
         return false;
      }

      var obj = {};
      obj['seller_add'] = localServ.get("sellerinfo");
      obj['seller_add']['period'] = $scope.caldays;
      $http.post("/api/seller/add?token="+settings._token, obj
      ).then(function success(res){
                    console.log.get("response from ( /api/seller/add?token="+
                    settings._token +" ) ", res); 
                    localServ.remove( 'sellerinfo' );   
                    $scope.end_modal = true ;           
                }, function error(error){
                    console.error(error.status); console.error(error.statusText);
      });
   };
   
   Date.prototype.daysInMonth = function() {
		return 33 - new Date(this.getFullYear(), this.getMonth(), 33).getDate();
   };

   $scope.caldays = (function (){        
         var date = new Date();
         var start = date.getDate();
         var lmd = date.daysInMonth();
         var arr = [];
         var day = start;
         var i = 0;
         var len = 14;
         var dayofweek = [
'Sun' , 'Mon' , 'Tue' , 'Wed' , 'Thu' , 'Fri' , 'Sat' 
         ];
         var snd = date.getDay();
                  
         for ( ; i <= len ; i++, day++ ) {
               if ( day > lmd ) {
                     day = 1;
               }
               arr[i] = { 
                     'day' : day ,
                     'name' : dayofweek[ (snd+i) % 7 ],
                     'time' : ''
               };

         }       
         console.log( arr );
         return arr;
   })();
   
   $scope.showcalnow = [];
   $scope.showcalnow = (function(){
         var arr = [];
         for ( var i = 0 ; i <= 14 ; i++ ) {
               if ( i <= 6) { arr[i] = true; 
               } else { arr[i] = false; };
               
         }
         return arr;
   })();

   $scope.showcalnowindex = 0; 
   $scope.showcal = function(index) {
         var go = '';
         go =  $scope.showcalnow[index] ? ' ' : ' g-d-none-ni ' ;
         go += $scope.showcalnowindex == index ? '' : ' hidden-on-mobile ' ;
         return go ;
   };
   
   $scope.nextcal = function (){
         if ( $scope.showcalnow.length != $scope.showcalnowindex+7 ) {
            $scope.showcalnow[$scope.showcalnowindex] = false;    
            $scope.showcalnow[$scope.showcalnowindex+7] = true;
            $scope.showcalnowindex++;
         }        
   };
   
   $scope.prevcal = function (){
         if ( 0 != $scope.showcalnowindex ) {
            $scope.showcalnowindex--;   
            $scope.showcalnow[$scope.showcalnowindex+7] = false;
            $scope.showcalnow[$scope.showcalnowindex] = true;    
         }           
   };


  };
});

watchApp.factory('buyerStepsExpServ', function($http, $location, cartOrderServ, validateServ, localServ, scrollServ) {
  return function ($scope){ 

   $scope.get_user = function (){
      if (settings._token == settings.old_token) {
         console.log("we can not get user because you are guest ");            
      }   
      $http.get('api/cabinet?token='+settings._token+
      '&currency='+settings.appcur).
      then(function success(res){
            if ( res && res.data && res.data.user ) {
                  $scope.new_user = res.data.user;
                  console.log.get("we got user from ( api/cabinet )", $scope.new_user);           
            } else  {
                  console.log("we can not get user", res);
            }            
      }, function error(error){
            console.error(error.status); console.error(error.statusText);
      });
   };  

   $scope.get_sipping = function (){
      $http.get('api/request/countries?token='+settings._token).
      then(function success(res){
          console.log.get("we got sipping ( api/request/countries )", res.data );          
          //  autocomplete countries       
          $scope.autocompletecountries = [];
          $scope.validateautocompletecountries = res.data.countries;
          res.data.countries.forEach(function(item, i){
                $scope.autocompletecountries.push( item.name );
          }); 
                  //console.log( data );       
          $( "#ship-country" ).autocomplete({
                  source: function(request, response) {
                        var results = $.ui.autocomplete.filter($scope.autocompletecountries, request.term);        
                        response(results.slice(0, 10));
                  }             
          });           
          //  autocomplete state      
          $scope.autocompletestate = [];
          $scope.validateautocompletestate = res.data.state;
          res.data.state.forEach(function(item, i){
                $scope.autocompletestate.push( item.name );
          });      
          $( "#ship-state" ).autocomplete({
                  source: function(request, response) {
                        var results = $.ui.autocomplete.filter($scope.autocompletestate, request.term);        
                        response(results.slice(0, 10));
                  }         
          });                                         
      }, function error(error){
            $log.error(error.status); $log.error(error.statusText);
      });
    };  
   
   $scope.get_paymant = function () {        
      $http.get('api/cart/?token='+settings._token+     
      '&currency='+settings.appcur+
      '&status=payments').
      then(function success(res){         
            $scope.payment_methods = res.data.payment_methods; 
            console.log.get("we gotpayment methods ( api/cart/ )", $scope.payment_methods );            
      }, function error(error){
            console.error(error.status); console.error(error.statusText);
      });        
   };   

   
   $scope.get_chackout = function(){
         var re = '';
         var valid = true;
         document.getElementById("form-error").innerHTML = '';

          console.log( $scope.$root.cardpayment );

    re = /^[0-9]{12,20}$/;         
    if ( ! re.test($scope.$root.cardpayment.card_number) ) {
          document.getElementById("form-error").innerHTML = "Card should be from 12 to 20 numbers </br> ";
          valid = false;
    } 

    re = /^[0-9]{3,4}$/;        
    if ( ! re.test($scope.$root.cardpayment.cvv) ) {
          document.getElementById("form-error").innerHTML += "CVV should have 3 or 4 numbers </br> "; 
          valid = false;             
    }  

    re = /^[0-9]{1,2}[/]{1}[0-9]{4}$/;        
    if ( ! re.test($scope.$root.cardpayment.ed) ) {
          document.getElementById("form-error").innerHTML += "Expiry Date should be 1 or 2 numbers + '/' + 4 numbers </br> "; 
          valid = false;             
    }

    if ( ! valid ) return;

    $scope.payment_methods.forEach(function(item, i){
          if (item.type == $scope.$root.cardpayment.paymentmethod ) {
                payment_method_id = item.id;
          }
    });
    if( !payment_method_id ){
          console.log( 'no payment_method_id ' );
          document.getElementById("form-error").innerHTML = 'no payment_method_id';
          return;
    }
    
    var monthcard = '';
    var yearcard = '';   
    if ( $scope.$root.cardpayment.ed ) {
         var midle = $scope.$root.cardpayment.ed.trim();
         //console.log(midle ) ;
         midle = midle.split('/');
         console.log(midle ) ;
         monthcard =  midle[0];
         yearcard =  midle[1];
    }
             
     $http.post('api/cart', 
     {
         'token' : settings._token,
         'currency' : settings.appcur,
         'status' : 'checkout',
         "payment_method_id": payment_method_id , 
         "number": $scope.$root.cardpayment.card_number,
	     "month": monthcard,
	     "year": yearcard,
	     "verification_value": $scope.$root.cardpayment.cvv,
	     "name": $scope.$root.cardpayment.name
     }).
     then(function success(res){ 
            console.log.get("we got response from ( api/cart )", res );   
            if( res.data.status != 200 ) {
               document.getElementById("form-error").innerHTML = res.data.payment_response ? 
               res.data.payment_response.error : res.data.error;  
            } else {
               $scope.done_payment();
               document.getElementById("form-error").innerHTML = '';                    
            }            
      }, function error(error){
            console.error(error.status); console.error(error.statusText);
      });
   };

   $scope.done_payment = function(){
      $scope.end_buyer_modal = true;
      $scope.clean_card();
   };           

   $scope.clean_card = function() {
          settings_card = [];
          $scope.$root.settings_card = [];
          window.localStorage.setItem( "settings_card", JSON.stringify(settings_card) )
          console.log( 'cart is clean ');
   };

   $scope.paypal_first = function() {
      console.log( 'paypal_first is going' );
      $http.post('/api/paypal?payment_method_id=4', {
           'token' : settings._token
      }).
      then(function success(res){ 
            console.log('post to /api/paypal?payment_method_id=4 ', res); 
            if ( res.data.status == 2 ) {
                $scope.paypel_url = res.data.url;
            } else {
                document.getElementById("form-error").innerHTML = res.data.error; 
                $scope.paypel_url = false; 
                $location.path( '/buyer-step/1', true);                
                location.reload();              
            }         
      }, function error(error){
            console.error(error.status); console.error(error.statusText);
      });           
   };


  $scope.start_choose_case = function () {


   if ( ! $scope.$root.settings_card.length ) {
      document.getElementById("form-error").innerHTML = 'choose some watches before going next';
      $scope.buystep = 1 ;      
   }   
   if (+$scope.buystep == 3 && settings._token == settings.old_token || 
      +$scope.buystep == 3 && localServ.get('buy_delivery_problem') == 'true') {
      $scope.buystep = 2; 
   }  
   switch(+$scope.buystep) {
      case 3 :
         $scope.get_paymant();  
         $scope.maincontent = 'views/buyer-steps/buyer-card-fields.html';
         $scope.breadcrumbtext2 = 'Payment';
      break;
      case 2 :
         $scope.get_user();
         $scope.get_sipping();
         $scope.showstep2 = (settings._token == settings.old_token) ? 1 : 2 ;  
         $scope.maincontent = 'views/buyer-steps/justdiv.html';
         $scope.breadcrumbtext2 = 'Shipping Info';
         $location.path( '/buyer-step/2','no_reload');
            
      break;
      case 1 : 
         $scope.maincontent = 'views/buyer-steps/buyer-big-product-list.html';               
         $scope.breadcrumbtext2 = 'Order Summary';
         $location.path( '/buyer-step/1','no_reload');

      break;
      default:      
         console.log( ' default case is going ' );
      break;
   };
  };


   $scope.nextStep = function(step) {
      var step = step ? step : +$scope.buystep ; 
      console.log( 'start from '+ step);
                     
      if ( ! $scope.$root.settings_card.length ) {
          document.getElementById("form-error").innerHTML = 'choose some watches before going next';
          step = 'default' ;
      }
      
      switch( step ) {
         case 3 :
            console.log( ' ---------- ', $scope.$root.cardpayment.paymentmethod ) ;
            if ( $scope.$root.cardpayment.paymentmethod == 'card' ) {
                $scope.get_chackout();
                return;
            }
            if ( $scope.$root.cardpayment.paymentmethod == 'paypal' ) {

                return;
            }    

            if ( $scope.$root.cardpayment.paymentmethod == 'details' ) {
                  $scope.paymentmethod_details();  
                  return;             
            }          

            document.getElementById("form-error").innerHTML = 'first you need to choose payment method ';           
            break;
         case 2  : 
            if ( ! $scope.validate_user() ){
               return false;   
            };
            console.log( $scope.new_user ) ; 
               
            $http.post('/api/ship_address', {
               'token' : settings._token,
               'user' :  $scope.new_user 
            }).
            then(function success(res){
              
                  console.log.get("we got response from ( /api/ship_address )", res );

                  if ( res.data.error ) {
                    console.log ( res.data.error );
                    var error = '';
                    for( var it in res.data.error  ){
                           error += it +' '+ res.data.error[it] +'<br/>';
                           console.log(res.data.error[it]);
                     };
                     document.getElementById("form-error").innerHTML = error;   
                     return false;  
                  }

                  cartOrderServ('delivery') ; 

                  $scope.get_paymant();  
                  //console.log( 2 );
                  console.log( 'third step is going' );
                  $scope.buystep = 3; 
                  $scope.maincontent = 'views/buyer-steps/buyer-card-fields.html'; 
                  $scope.breadcrumbtext2 = 'Payment'; 
                  $location.path( '/buyer-step/3','no_reload');
                  scrollServ(500); 

                  //cartOrderServ(); 
                  //cartOrderServ('delivery') ;            
            }, function error(error){
                  console.error(error.status); console.error(error.statusText);
            });            
            break;
         case 1 :
            
            console.log( 'second step is going' );
            $scope.get_user();
            $scope.get_sipping();
            $scope.showstep2 = (settings._token == settings.old_token) ? 1 : 2 ; 
            $scope.buystep = 2; 
            $scope.maincontent = 'views/buyer-steps/justdiv.html';
            $scope.breadcrumbtext2 = 'Shipping Info';   
            $location.path( '/buyer-step/2', 'no_reload');

            cartOrderServ();    
            scrollServ(500); 
            document.getElementById("form-error").innerHTML = '';       
            break;
         default :
         
            console.log( 'first step is going' );
            $scope.buystep = 1;
            $scope.maincontent = 'views/buyer-steps/buyer-big-product-list.html';
            $scope.breadcrumbtext2 = 'Order Summary'; 
            $location.path( '/buyer-step/1','no_reload');

            cartOrderServ(); 
            scrollServ(500);  
            break;           
      }     
   };

   $scope.paymentmethod_details = function(){
            console.log('details');
               
            $http.post('/send/paymentmet/details', {
               'token' : settings._token,
               'card' :  $scope.$root.settings_card
            }).
            then(function success(res){              
                console.log.get("we got response from ( /api/ship_address )", res );         
            }, function error(error){
                  console.error(error.status); console.error(error.statusText);
            }); 
   };

  
   $scope.validate_user = function(  ) {
         var go = true;
         validateServ.clean();
         //console.log( $scope );
         if ( ! $scope.new_user ) {
            document.getElementById("form-error").innerHTML += 'required fields must be full';
            return '';
         }
         validateServ.is_not_empty($scope.new_user.adres, 'Address 1') ? '' : go = false;         
         $scope.new_user.countries_id = ''; 
         if ( $scope.new_user.country ) {                                    
         $scope.validateautocompletecountries.forEach(function(item, i){      
            if ( $scope.new_user.country == item.name ) {
                console.log( item ) ; 
                $scope.new_user.countries_id = item.id ;        
            }
         });
          }
         validateServ.is_not_empty($scope.new_user.countries_id, 'Country', "form-error", 
         ' is not correct, we do not know this country</br>') ? '' : go = false; 
         $scope.new_user.state_id = ''; 
         if ( $scope.new_user.state ) {                                    
            $scope.validateautocompletestate.forEach(function(item, i){           
            if ( $scope.new_user.state == item.name ) {
                  //console.log( item ) ; 
                  $scope.new_user.state_id = item.id ;        
                  }
            });
         }
         validateServ.is_not_empty($scope.new_user.state_id, 'State', "form-error", 
         ' is not correct, we do not know this state</br>') ? '' : go = false; 
         validateServ.is_not_empty($scope.new_user.city, 'City' ) ? '' : go = false; 
         validateServ.is_not_empty($scope.new_user.house, 'House' ) ? '' : go = false; 
         validateServ.is_not_empty($scope.new_user.postcode, 'Postcode' ) ? '' : go = false; 
         return go;                     
   };

   $scope.$root.gettotal = function(){
      var total = 0;
      if ( $scope.$root.settings_card ) { 
            $scope.$root.settings_card.forEach(function(item){            
                  total += +item['price'] ; 
            });
      }
      total = Math.round(total * 100) / 100;
      return settings.appcurrency + total;
   };

 };
});


