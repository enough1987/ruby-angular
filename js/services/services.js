//'use strict';

// services


watchApp.factory('promisesServ', function($http, $location) {

           var store = {};
           
           store.get_api_buy = function(){
                return $http.get('api/buy?token='+settings._token+'&currency='+settings.appcur).
                then(function (res){
                    console.log.get('promisesServ.get_api_buy got page data ( api/buy?token='+settings._token+
                    '&currency='+settings.appcur +" ) ", res.data);       
                    return res.data;    
                }, function (error){
                    console.error(error.status); console.error(error.statusText);
                });
           };          
           store.get_api_global = function(){
                return  $http.get('api/global?token='+settings._token).then(function success(res){
                    console.log.get('promisesServ.get_api_global got global data ( api/global?token='+settings._token +" ) ", res.data);         
                    return res.data;          
                }, function error(error){
                    console.error(error.status); console.error(error.statusText);
                });
           };
           store.get_api_cabinet = function(){
                return  $http.get('api/cabinet?token='+settings._token+
                    '&currency='+settings.appcur).
                    then(function success(res){ 
                        console.log.get('promisesServ.get_api_cabinet got user data ( api/cabinet?token='+
                        settings._token+'&currency='+settings.appcur+ ' )', res.data);      

                        return res.data;         
                }, function error(error){
                    console.error(error.status); console.error(error.statusText);
                }); 
           };
/*
           store.get_api_search_page = function(){
                return $http.get('api/search_page?token='+settings._token)
                .then(function success(res){     
                    console.log.get('promisesServ.get_api_search_page got prop data ( api/search_page?token='+
                    settings._token+' )', res.data);  
                    //$scope.prop = res.data; 
                    return res.data;    
                }, function error(error){ 
                    console.error(error.status); console.error(error.statusText);
                }); 
           };
*/
           store.get_api_search = function(){

            /*

            var add_to_scope = {};     
            var searchres = $location.search();
            //console.log( searchres ); 
            if ( searchres && 
             searchres['page'] && 
             searchres['per_page'] 
             ) {
                var searchstart = 'page='+searchres['page']+'&per_page='+searchres['per_page'];
            if ( !searchres['name'] || searchres['name'] == 'all' ) {
                add_to_scope.search = 'all';
                searchres['name'] = '';
            } else {
                add_to_scope.search = searchres['name'];
                searchstart += '&q[name_cont]='+searchres['name'];         
            }
            if ( searchres['price_min'] && searchres['price_max'] ) { 
                searchstart += '&price_min='+searchres['price_min'];
                searchstart += '&price_max='+searchres['price_max']; 
                add_to_scope.defaultmin = searchres['price_min'];
                add_to_scope.defaultmax = searchres['price_max'];        
            };
            if ( searchres['tax'] ) { 
                searchstart += '&tax='+searchres['tax']; 
                add_to_scope.tax = searchres['tax'];
            }; 
            if ( searchres['sort'] ) { 
                searchstart += '&sort='+searchres['sort']; 
                add_to_scope.sort = searchres['sort'];
            };
            } else {
               add_to_scope.search = 'all';
               var searchstart = 'page=1&per_page=6';
            } 

            */
                   //console.log(searchstart);
                   var data = $location.search();
                   //data = data['data'];
                   //console.log( data );
                   //return ;

                   var query = 'api/search?';
                   //data ?  query += '&data=' + data : '' ;
                   query += 'token='+settings._token ;
                   query += '&currency='+settings.appcur ;  

                   console.log( data )                 

                   return $http.get(query).
                    then(function success(res){   
                        console.log.get('promisesServ.get_api_search got page data ( ' + query +
                         ' )', res.data);  
                         //$scope.page = res.data; 
                         //data ? res.data.search = JSON.parse(data) : '' ;
                         return res.data;
                    }, function error(error){
                        console.error(error.status); console.error(error.statusText);
                    });
           };

           store.get_api_single_page = function(){
            var path = $location.path().split('/');
            var id = path[2] ? path[2] : '';
            //console.log(path);
            return $http.get('api/single_page/?id='+path[2]+
             '&token='+settings._token+'&currency='+settings.appcur).
            then(function success(res){ 
                //$scope.page = res.data;
                //$scope.breadcrumbtext2 = $scope.page.product.name;  
                console.log.get('promisesServ.get_api_search got page data ( '+
                'api/single_page/?id='+path[2]+
               '&token='+settings._token+'&currency='+settings.appcur +' )', res.data); 
                return res.data;           
            }, function error(error){
                console.error(error.status); console.error(error.statusText);
            });
           };

           return {
               get_api_buy: store.get_api_buy,
               get_api_global: store.get_api_global,
               get_api_cabinet: store.get_api_cabinet,
               get_api_search_page: store.get_api_search_page,
               get_api_search: store.get_api_search,
               get_api_single_page: store.get_api_single_page
           };
});

watchApp.factory('validateServ', function ($rootScope) {

    var validate = {};

    validate.clean = function (id) {
          id = id ? id : "form-error";
          document.getElementById(id).innerHTML = ''; 
    };

    validate.is_not_empty = function (field, name, id, msg) {
          var id = id ? id : "form-error";
          var msg = msg ? msg : ' is empty</br>';
          if ( ! field ) {
            document.getElementById(id).innerHTML += name+msg; 
            return false;               
          }
          return true; 
    };
    validate.phone = function (phone, id) {
          id = id ? id : "form-error";
          var re = /^[0-9]{5,20}$/;  
          if ( ! phone || ! re.test(phone) ) {
            document.getElementById(id).innerHTML += 
            'phone is not correct it should contain only numbers</br>'; 
            return false;               
          }
          return true; 
    };  
    validate.email = function (email, id) {
          id = id ? id : "form-error";
          var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i; 
          if ( ! email || ! re.test(email) ) {
            document.getElementById(id).innerHTML += 
            'email is not correct</br>'; 
            return false;               
          } 
          return true;          
    }; 
    validate.password = function (password, id) {
          id = id ? id : "form-error";
          var re = /^[a-zA-Z0-9]\w{5,20}$/; 
          if ( ! password || ! re.test(password) ) {
            document.getElementById(id).innerHTML += 
            'password is less than 6 letters also it should contain only letters and numbers </br>';  
            return false;               
          } 
          return true;          
    }; 
    validate.password_is_equal = function (password, password_confirmation, id) {
          id = id ? id : "form-error";
          if ( password != password_confirmation ) {
            document.getElementById(id).innerHTML += 
            'password is not equal to password_confirmation</br>';  
            return false;               
          } 
          return true;          
     }; 

    return {
        clean : validate.clean,
        is_not_empty : validate.is_not_empty,
        phone : validate.phone,
        email : validate.email,
        password : validate.password,
        password_is_equal : validate.password_is_equal
    };

})

watchApp.factory('safeApply', [function($rootScope) {
            return function($scope, fn) {
                var phase = $scope.$root.$$phase;
                if(phase == '$apply' || phase == '$digest') {
                    if (fn) {
                        $scope.$eval(fn);
                    }
                } else {
                    if (fn) {
                        $scope.$apply(fn);
                    } else {
                        $scope.$apply();
                    }
                }
            }
}]);

watchApp.factory('localServ', function () {
    return {

        get : function(name){
            return JSON.parse ( window.localStorage.getItem(name) );
        },
        save : function(name, store){
            window.localStorage.setItem( name, JSON.stringify(store) );
        },
        remove : function(name){
            localStorage.removeItem(name);
        }  

    };
});



watchApp.factory('scrollServ', function ($rootScope) {
    return function (time){
         $('html, body').animate({
            scrollTop:$("#startposition").offset().top
         }, time);
    };
});


watchApp.factory('cartOrderServ', function ($http, $rootScope, reloadCartServ, localServ, safeApply) {
    return function (status){
        
      if ( settings._token == settings.old_token ) { 
          console.log( 'CartOrderServ is not going because user is a guest ' ) ;
          return false
      };

      for ( var i = 0, line_items = []; i < settings_card.length; i++ ) {
      //console.log('settings_card ', settings_card[i]);  
             line_items.push({
               "variant_id": settings_card[i]['master'].id ,
               "product_id": settings_card[i].id ,
               "quantity": 1
             });
      } 
      
      // status - merge, delivery
      status ? status = status : '' ;   
         
      $http.post('/api/cart', {
      'token' : settings._token , 
      'currency' : settings.appcur,
      'status' : status ,
      'order' : {
            "line_items": line_items
      },
      'coupon' : 'zuzya'
      }).then(function success(res){     
        var page = res.data;
        console.log.get('cartOrderServ got user data ( /api/cart )', page);
       
        if ( status == 'delivery' && page.status == 'return' ) {
            localServ.save('buy_delivery_problem', 'true');
            //alert ( ' delivery return ');
            location.reload();
        } 
        if ( status == 'delivery' && page.status != 'return' ) {
            //alert ( ' NO delivery return ');            
            localServ.remove('buy_delivery_problem'); 
            console.log(  ' delivery_response ', page.delivery_response  );
            $rootScope.delivery_response = page.delivery_response;  
            safeApply($rootScope);        
        }

        if ( page.line_items ) {
            reloadCartServ(page.line_items); 
        } else {
            console.log( ' reloadCardServ can not be started because no line_items field' );
        }
                  
   }, function error(error){
        console.error(error.status);  console.error(error.statusText);
   });
    };
    
});


watchApp.factory('reloadCartServ', function ($http, $rootScope, $log, safeApply) {
    return function (line_items){
        
        if ( ! line_items ) { 
            console.log( ' reloadCardServ can not be started because line_items is not exist ' ) ;
            return false 
        };
     
                 
         for ( var i = 0, ids = ''; i < line_items.length; i++ ) {
             ids += line_items[i]['variant'].product_id ;
             console.log()
             if ( i != line_items.length - 1 ) {
                  ids += ',' ;
             }
         }
         
         $http.get( '/api/cart/sync?ids='+ids+
         '&token='+settings._token+'&currency='+settings.appcur ).then(function success(res){   
            if( res.data && res.data.products ) {
                console.log( res.data );
                console.log.get('reloadCartServ got res.data.products ( /api/products?ids='+ids+
         '&token='+settings._token+'&currency='+settings.appcur+' )', res.data.products); 
                settings_card = res.data.products ;
                window.localStorage.setItem( "settings_card", JSON.stringify(settings_card) );
                $rootScope.settings_card = settings_card ;
                safeApply($rootScope);
            } else {
                console.log( ' Cart can not be reload because no products field ' );
            }
      }, function error(error){
         console.error(error.status); console.error(error.statusText);
      }); 
      
    };   
});





















