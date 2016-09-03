//'use strict';

// controllers 

watchApp.controller("AppCtrl", function ($scope) {
   $scope.$root.page_is_not_loading = true;
   console.log.info( ' AppCtrl is running, pathname is "' + location.pathname + '"' ); 
});

watchApp.controller("LandingCtrl", function ($scope, page, global ) {
   $scope.$root.page_is_not_loading = true;  
   console.log.info( 'LandingCtrl is running, pathname is "' + location.pathname + '"'); 
   $scope.page = page; // get page data for prodacts 
   $scope.global = global; // get global data
});

watchApp.controller("SigninupCtrl", function ($scope, 
$routeParams, signinupExpServ ) {
   $scope.$root.page_is_not_loading = true;
   console.log.info( 'SigninupCtrl is running, pathname is "' + location.pathname + '"' );
   
   $scope.$root.step2form = 1;    
   $routeParams.buystep ? $scope.buystep = $routeParams.buystep : '';       
   $routeParams.step ? $scope.step = $routeParams.step : '' ;       
   if (  ($scope.step || $routeParams.buystep) && settings.old_token != settings._token ) {
      $scope.$parent.nextStep ? $scope.$parent.nextStep() : '';   
   }
   signinupExpServ($scope); // expend scope with methods
});

watchApp.controller("SearchCtrl", function ($scope, $timeout, $http, $filter,
searchExpServ, scrollServ, safeApply,
global, page ) {
   $scope.$root.page_is_not_loading = true;
 
   console.log.info( 'SearchCtrl is running, pathname is "' + location.pathname );
   $scope.$root.settings = settings;

   $scope.global = global;
   $scope.page = page;
   console.log( 'page ', page );
   //$scope.search = page.add_to_scope.search;
   //$scope.defaultmin = page.add_to_scope.defaultmin;
   //$scope.defaultmax = page.add_to_scope.defaultmax;
   //$scope.tax = page.add_to_scope.tax;
   //$scope.sort = page.add_to_scope.sort;

     $scope.filters_search = [];
     $scope.filters_search['checkbox']       = {};
     $scope.filters_search['switch']         = {}; 
     $scope.filters_search['range']          = {};
     $scope.filters_search['brand']          = {};
     $scope.filters_search['input']          = '';      
     $scope.filters_search['pagination'] = [];    
     $scope.filters_search['pagination']['per_page'] = 24;
     $scope.filters_search['pagination']['carrent_page'] = 1;
     $scope.filters_search['pagination']['number_of_pages'] = 0;           
     //$scope.filters_search['pagination']['sorting_order'] = '';
     //$scope.filters_search['pagination']['reverse'] = false;
     //$scope.filters_search['pagination']['filtered_items'] = [];
     //$scope.filters_search['pagination']['grouped_tems'] = [];
     $scope.filters_search['pagination']['paged_items'] = [];


    $scope.filter_paged_items = function () {
        //console.log( $scope.search_sort );
        if ( ! $scope.search_sort ) return ;
        if ( $scope.search_sort == 'price_asc' || $scope.search_sort == 'price_desc' ) { 
              var sort_func = $scope.sort_funcs.compareNumbers; }
        if ( $scope.search_sort == 'name_asc' || $scope.search_sort == 'name_desc' ) { 
              var sort_func = $scope.sort_funcs.compareStrings; }
        console.log( $scope.search_sort );
        $scope.filters_search['pagination']['paged_items'].sort(sort_func);
        if ( $scope.search_sort == 'name_desc' || $scope.search_sort == 'price_desc' ) {           
              $scope.filters_search['pagination']['paged_items'] = $scope.filters_search['pagination']['paged_items'].reverse();
        }
    };

$scope.sort_funcs = {};
$scope.sort_funcs.compareStrings = function(as, bs){
    as = as['name']  ; bs = bs['name']  ;
    //console.log(as, bs)
    var a, b, a1, b1, i= 0, n, L,
    rx=/(\.\d+)|(\d+(\.\d+)?)|([^\d.]+)|(\.\D+)|(\.$)/g;
    if(as=== bs) return 0;
    a= as.toLowerCase().trim().match(rx);
    b= bs.toLowerCase().trim().match(rx);
    L= a.length;
    while(i<L){
        if(!b[i]) return 1;
        a1= a[i],
        b1= b[i++];
        if(a1!== b1){
            n= a1-b1;
            if(!isNaN(n)) return n;
            return a1>b1? 1:-1;
        }
    }
    return b[i]? -1:0;
};
$scope.sort_funcs.compareNumbers = function(a, b){
            return a['price'] - b['price'] ;
};

    $scope.change_per_page = function(per_page){
      $scope.filters_search['pagination']['carrent_page'] = 1;
      $scope.filters_search['pagination']['per_page'] = per_page;
      $scope.init_filters();
   };

   $scope.count_pages = function(){
         $scope.filters_search['pagination']['number_of_pages']  = Math.ceil(
           $scope.main_search_filters['items'].length / $scope.filters_search['pagination']['per_page'] );       
         //console.log ( 'number_of_pages ' , $scope.filters_search['pagination']['number_of_pages'] ); 
   };

   $scope.count_start_item = function(){
      $scope.filters_search['pagination']['start_item'] = $scope.filters_search['pagination']['carrent_page'] == 1 ? 
            1 : $scope.filters_search['pagination']['per_page'] * $scope.filters_search['pagination']['carrent_page'] - 
            ($scope.filters_search['pagination']['per_page'] - 1);
            //console.log( $scope.filters_search['pagination']['per_page'], 
            //      $scope.filters_search['pagination']['carrent_page'],
            //      $scope.filters_search['pagination']['start_item'] );
   }; 

   $scope.count_end_item = function(){
      $scope.filters_search['pagination']['end_item'] = $scope.filters_search['pagination']['start_item'] + 
            $scope.filters_search['pagination']['per_page'] - 1;
   };

   $scope.count_last_page_items = function(){

       if ( $scope.main_search_filters['items'].length < $scope.filters_search['pagination']['per_page'] )   {
            $scope.filters_search['pagination']['last_page_items'] = $scope.main_search_filters['items'].length;    
            //console.log( 'in ', $scope.filters_search['pagination']['last_page_items'] )   ;    
      } else {
            $scope.filters_search['pagination']['last_page_items'] = $scope.filters_search['pagination']['per_page'] -
                  ( $scope.filters_search['pagination']['number_of_pages'] *
                  $scope.filters_search['pagination']['per_page'] - $scope.main_search_filters['items'].length );
           //console.log( 'out ', $scope.filters_search['pagination']['last_page_items'] )   ;              
      }

      $scope.filters_search['pagination']['last_page_items'] = $scope.filters_search['pagination']['last_page_items'] +
      ($scope.filters_search['pagination']['per_page'] * ($scope.filters_search['pagination']['carrent_page']-1) );
      /*
       console.log( 'last ', 
       $scope.filters_search['pagination']['number_of_pages'],
       $scope.filters_search['pagination']['per_page'] ,
       $scope.main_search_filters['items'].length ,
       $scope.filters_search['pagination']['last_page_items'] );
      */
   };

   $scope.show_info_pagination = function(){
         var info = '';
         if ( $scope.main_search_filters['items'].length != 0 ) {
            info += 'Showing ';
            info += $scope.filters_search['pagination']['start_item'];
            info += ' - ';
            info += ( $scope.filters_search['pagination']['carrent_page'] == $scope.filters_search['pagination']['number_of_pages'] ?
            $scope.filters_search['pagination']['last_page_items'] : $scope.filters_search['pagination']['end_item'] );
            info += ' of ';
            info += $scope.main_search_filters['items'].length;
            info += ' results ';
         } else {
            info = 'Showing 0 results';   
         }
         return info;
   };

   $scope.create_grouped_tems = function(){  
     $scope.filters_search['pagination']['paged_items'] = [];
     Object.keys($scope.main_search_filters['items']).forEach(function(key , index) {
           if ( $scope.filters_search['pagination']['start_item'] <= index+1 && 
                $scope.filters_search['pagination']['end_item'] >= index+1 ) {
              //console.log( index+1, start , end ,  $scope.filters_search['pagination']['paged_items'] ) ;
              //console.log( $scope.filters_search['pagination']['paged_items'] ) ;   
              $scope.filters_search['pagination']['paged_items'].push($scope.main_search_filters['items'][index]);
           }
     });
     //console.log( $scope.filters_search['pagination']['start_item'],
     //       $scope.filters_search['pagination']['end_item'],
     //      $scope.filters_search['pagination']['paged_items'] );
   }; 

   $scope.pagination_init = function(){
       $scope.count_pages();
       $scope.count_start_item();
       $scope.count_end_item();
       $scope.count_last_page_items();
       $scope.create_grouped_tems();
       $scope.filter_paged_items();
   };

   $scope.change_carrent_page = function(page){
         $scope.filters_search['pagination']['carrent_page'] = page;
         scrollServ(500);
         $scope.init_filters(); 
   };

   $scope.change_search_page_diraction = function (diraction) {
      //console.log( diraction);
      var add = 0;
      if ( diraction == 'down' ) { 
            add = $scope.filters_search['pagination']['carrent_page'] <= 1 ? 0 : -1 ; }
      if ( diraction == 'up' ) { 
            add = $scope.filters_search['pagination']['carrent_page'] >= $scope.filters_search['pagination']['number_of_pages'] ? 0 : +1 ; } 
      $scope.filters_search['pagination']['carrent_page'] = $scope.filters_search['pagination']['carrent_page']+ add ;           
      scrollServ(500); 
      $scope.init_filters(); 
   };



    $scope.push_item_to_search_items = function ( item ) {
         var push = true;
         $scope.main_search_filters['items'].forEach(function(search_item, i, result){
              search_item.id ==  item.id ? push = false : '' ;
         });
         push ? $scope.main_search_filters['items'].push(item) : '' ;
    };  

    $scope.check_brand_filters = function(item){
          var item_brand_name = item['basic_info']['brand'][0]['items'][0]['name']
          //console.log(item_brand);
          var pass = false;
          if ( ! window.count_prop_in_obj($scope.filters_search['brand']) ) {
                pass = true;
                return pass;
          }
                                  
          Object.keys($scope.filters_search['brand']).forEach(function(filter_key , filter_index) {
              //console.log( item_brand_name.trim() , filter_key.trim() );
              if( item_brand_name.trim() == filter_key.trim() ) {
              //console.log( item_brand_name.trim() , filter_key.trim() );
                   pass = true;
                   return pass;         
              }
          });

          return pass;
          /*
          for( category in item['basic_info'] ){
            if(item['basic_info'].hasOwnProperty(category)) {  
               if ( item['basic_info'][category][0]['type'] == 'brand' ) {
                 pass = false;    
                 for( brand in $scope.filters_search['brand'] ){
                   if( $scope.filters_search['brand'].hasOwnProperty(brand)) {  
                     if ( item['basic_info'][category][0]['items'][0].name && 
                        (brand == item['basic_info'][category][0]['items'][0].name) )  {    
                         //console.log( item, brand.trim() );
                         return true;
                     }
                   }
                 }
               }
            }
          }
          return true;
          */
    };

    $scope.check_range_filters = function(item){
          var pass = true;
          //console.log(item);
          for( category in item['basic_info'] ){
            if(item['basic_info'].hasOwnProperty(category)) {
                if ( item['basic_info'][category][0]['type'] == 'range' ) {
                    var range_val = +item['basic_info'][category][0]['items']['name'];
                    //console.log( $scope.filters_search['range'] );
                    //console.log( category , $scope.filters_search['range'][category] , range_val );
                              if( $scope.filters_search['range'][category]                   &&
                                  ($scope.filters_search['range'][category].min > range_val  ||
                                  $scope.filters_search['range'][category].max < range_val ) ){
                                  pass = false;      
                              }

                }
            }
          }  
          return pass;        
    }; 

   $scope.check_switch_filters = function(item){
          var pass = true;
          if ( ! window.count_prop_in_obj($scope.filters_search['switch']) ) return pass;
          for( category in item['basic_info'] ){
            if(item['basic_info'].hasOwnProperty(category)) {
                if ( item['basic_info'][category][0]['type'] == 'switch' && 
                   item['basic_info'][category][0]['items']['name'] ) {
                    var switch_name = category.trim();
                    pass = false;
                    for( switch_filter in $scope.filters_search['switch'] ){
                        if($scope.filters_search['switch'].hasOwnProperty(switch_filter)) {
                              // console.log(' eee ', switch_filter, switch_name );                             
                              if( switch_name == switch_filter ) {
                                    //console.log(' eee ', switch_filter, switch_name );
                                    pass = true;
                                    return pass;
                              }
                        }
                    }
                }
            }
          }  
          return pass;
   };    


   $scope.check_checkbox_filters = function(item){
          var pass = true;
          if ( ! window.count_prop_in_obj($scope.filters_search['checkbox']) ) return pass;
          for( category in item['basic_info'] ){
            if(item['basic_info'].hasOwnProperty(category)) {
                  //console.log( item['basic_info'][category][0]);
                if ( item['basic_info'][category][0]['type'] == 'checkbox' && 
                   item['basic_info'][category][0]['items'] ) {
                    var checkbox_item = item['basic_info'][category][0];                   
                    for( filtered_checkbox_item in $scope.filters_search['checkbox'] ){
                       if ( ! window.count_prop_in_obj($scope.filters_search['checkbox'][filtered_checkbox_item]) ) continue;
                       var pass = false;
                       if ( filtered_checkbox_item == checkbox_item.id ) {  
                         for( filtered_checkbox_prop in $scope.filters_search['checkbox'][filtered_checkbox_item] ){
                             //console.log( filtered_checkbox_prop, checkbox_item.items ) 
                             for( checkbox_item_last in checkbox_item.items ){
                                 //console.log( filtered_checkbox_prop, checkbox_item.items[checkbox_item_last] )   
                                 if( checkbox_item.items[checkbox_item_last].id == filtered_checkbox_prop ) return true;
                             } 
                         }
                       }
                    }

                }
            }
          }
          return pass;
   };

   $scope.check_input_filters = function(item){

          var pass = false;
          if ( !$scope.filters_search['input'] ) {
                'input is empty ';
                pass = true;
          } else {
                var go = false;
                var matcher = new RegExp($scope.filters_search["input"], "i");
                matcher.test(item.brand) ? go = true : '' ; 
                matcher.test(item.name) ? go = true : '' ;
                matcher.test(item.description) ? go = true : '' ;
                console.log( $scope.filters_search['input'] , go );
                pass = go;
          } 
          return pass;
          
   };



   $scope.init_filters = function(){
     $scope.reload_menu = true;    

     $scope.main_search_filters = [];
     $scope.main_search_filters['range'] = {}; 
     $scope.main_search_filters['checkbox'] = {};
     $scope.main_search_filters['switch']   = { exist: false, items: {} }; 
     $scope.main_search_filters['brand']    = { exist: false, items: {} };
     $scope.main_search_filters['items']    = []; 

     if( !page ) {
           alert( ' server was not send data ' );
           return;
     }


     page.result.forEach(function(item, i, result){
        var go = true;   
        if( !$scope.search_without_input ) {
            if ( ! $scope.check_input_filters(item) ) go = false ; 
        }
        //if ( ! $scope.check_brand_filters(item['basic_info']['brand'][0]['items'][0]['name']) ) return ;
        if ( ! $scope.check_range_filters(item) ) go = false ;
        if ( ! $scope.check_switch_filters(item) ) go = false ;
        if ( ! $scope.check_checkbox_filters(item) ) go = false ;
        //console.log( item )
        for( category in item['basic_info'] ){
           if(item['basic_info'].hasOwnProperty(category)) {
            

             if( ! item['basic_info'][category][0] || 
                 ! item['basic_info'][category][0]['type'] ) continue ;

               if ( item['basic_info'][category][0]['type'] == 'brand' ) {
                  if( ! item['basic_info'][category][0]['items'][0] || 
                      ! item['basic_info'][category][0]['items'][0]['name']) continue ;
                  var brand_name = item['basic_info'][category][0]['items'][0]['name'].trim() ;

                  //if ( ! $scope.check_range_filters(item) ) continue ;
                  //if ( ! $scope.check_switch_filters(item) ) continue ;
                  //if ( ! $scope.check_checkbox_filters(item) ) continue ;
                  if ( go ) {
                  $scope.main_search_filters['brand']['items'][brand_name] ? 
                      $scope.main_search_filters['brand']['items'][brand_name]++ :
                      $scope.main_search_filters['brand']['items'][brand_name] = 1 ;
                  $scope.main_search_filters['brand'].exist = $scope.main_search_filters['brand']['items'][brand_name];
                  } else {
                  $scope.main_search_filters['brand']['items'][brand_name] ? 
                      '' : $scope.main_search_filters['brand']['items'][brand_name] = 0 ;                        
                  }
                  //$scope.push_item_to_search_items(item); 
               }
           }
        };
     });   
              

     page.result.forEach(function(item, i, result){
        var go = true;
        if( !$scope.search_without_input ) {
            if ( ! $scope.check_input_filters(item) ) go = false ; 
        }
        if ( ! $scope.check_brand_filters(item) ) go = false ;
        if ( ! $scope.check_range_filters(item) ) go = false ;
        if ( ! $scope.check_checkbox_filters(item) ) go = false ;
        for( category in item['basic_info'] ){
           if(item['basic_info'].hasOwnProperty(category)) {

             if( ! item['basic_info'][category][0] || 
                 ! item['basic_info'][category][0]['type'] ) continue ;


                  //if ( ! $scope.check_range_filters(item) ) continue ;
                  //if ( ! $scope.check_switch_filters(item) ) continue ;
                  //if ( ! $scope.check_checkbox_filters(item) ) continue ;
                 

             if(item['basic_info'][category][0]['type'] == 'switch' ){
                  if( ! item['basic_info'][category][0]['items'] || 
                      ! item['basic_info'][category][0]['items']['name'] ) continue ;
                      //if ( ! $scope.check_brand_filters(window.clone_obj(item)) ) continue ;
                      //if ( ! $scope.check_brand_filters(item) ) continue ;
                      var switch_name = item['basic_info'][category][0]['name'].trim();
                      var switch_id = item['basic_info'][category][0]['id'].trim();
                      var switch_boolean = +item['basic_info'][category][0]['items']['name'];
                      if ( ! switch_boolean ) go = false ;
                      //console.log( switch_name , category , switch_boolean, switch_id );
                      if ( go ) {
                      $scope.main_search_filters['switch']['items'][switch_id] ? 
                        $scope.main_search_filters['switch']['items'][switch_id].count++ :
                        $scope.main_search_filters['switch']['items'][switch_id] = { name: switch_name, count: 1 };
                       $scope.main_search_filters['switch'].exist = $scope.main_search_filters['switch']['items'][switch_id] ; 
                       //$scope.push_item_to_search_items(item); 
                      } else {
                      $scope.main_search_filters['switch']['items'][switch_id] ? 
                        '' : $scope.main_search_filters['switch']['items'][switch_id] = { name: switch_name, count: 0 };                            
                      }

//console.log($scope.main_search_filters['switch']['items'][switch_id]['name'] == 'Box',  item );
                }
           }
        };
     });   

     
     page.result.forEach(function(item, i, result){  
        if( !$scope.search_without_input ) {
            if ( ! $scope.check_input_filters(item) ) return ; 
        }   
        //if ( ! $scope.check_brand_filters(item) ) return ;
        //if ( ! $scope.check_switch_filters(item) ) return ;
        //if ( ! $scope.check_checkbox_filters(item) ) return ;
          for( category in item['basic_info'] ){
           if(item['basic_info'].hasOwnProperty(category)) {

             if( ! item['basic_info'][category][0] || 
                 ! item['basic_info'][category][0]['type'] ) continue ;


               if(item['basic_info'][category][0]['type'] == 'range' ){ 
                                   
                  if( ! item['basic_info'][category][0]['items'] || 
                      ! +item['basic_info'][category][0]['items']['name'] ) continue ;
                      //if ( ! $scope.check_brand_filters(window.clone_obj(item)) ) continue ;

                      //var range_name = item['basic_info'][category][0]['name'];
                      var range_val = item['basic_info'][category][0]['items']['name'];
                      var range_name = item['basic_info'][category][0].name;
                      //console.log( range_val, range_name, item['basic_info'][category][0]);
                      !$scope.main_search_filters['range'][category] ? 
                        $scope.main_search_filters['range'][category] = { name: range_name, min: 0 , max: 0, exist : false } : '';
                      $scope.main_search_filters['range'][category].max < +range_val ?
                        $scope.main_search_filters['range'][category].max = +range_val : '';
                      $scope.main_search_filters['range'][category].exist = true; 
                      //console.log( $scope.$root.search_filters['range'][category] );
                      //$scope.push_item_to_search_items(item); 
                      //safeApply($scope);
               }
           }
         } 

     });  


     

     page.result.forEach(function(item, i, result){
     var go = true;
     if( !$scope.search_without_input ) {
          if ( ! $scope.check_input_filters(item) ) go = false ; 
     }          
     if ( ! $scope.check_brand_filters(item) ) go = false ;
     if ( ! $scope.check_range_filters(item) ) go = false ;
     if ( ! $scope.check_switch_filters(item) ) go = false ;
        for( category in item['basic_info'] ){
           if(item['basic_info'].hasOwnProperty(category)) {

             if( ! item['basic_info'][category][0] || 
                 ! item['basic_info'][category][0]['type'] ) continue ;


               if(item['basic_info'][category][0]['type'] == 'checkbox' ){             
                  if( ! item['basic_info'][category][0]['items'] ) continue ;
                      //if ( ! $scope.check_brand_filters(window.clone_obj(item)) ) continue ;
                      //if ( ! $scope.check_brand_filters(item) ) continue ;
                      var checkbox_name = item['basic_info'][category][0]['name'].trim();
                      var checkbox_id = item['basic_info'][category][0]['id'].trim();
                        //console.log( item['basic_info'][category][0] ) ; 
                      !$scope.main_search_filters['checkbox'][checkbox_id] ?
                        $scope.main_search_filters['checkbox'][checkbox_id] = { name:checkbox_name , 
                              exist:false, items:{} } : '';
                      item['basic_info'][category][0]['items'].forEach(function(checkbox, i, result){
                        if ( !checkbox.name ) return ;   
                        var item_name = checkbox.name.trim();
                        var item_id = checkbox.id;
                        if ( go ) {
                        $scope.main_search_filters['checkbox'][checkbox_id]['items'][item_id] ? 
                          $scope.main_search_filters['checkbox'][checkbox_id]['items'][item_id].count++ :
                          $scope.main_search_filters['checkbox'][checkbox_id]['items'][item_id] = { name: item_name, 
                                count: 1 } ; 
                        $scope.main_search_filters['checkbox'][checkbox_id].exist = true;
                        } else {
                        $scope.main_search_filters['checkbox'][checkbox_id]['items'][item_id] ? 
                          '' : $scope.main_search_filters['checkbox'][checkbox_id]['items'][item_id] = { name: item_name, 
                                count: 0 } ;                               
                        } 

                        //$scope.push_item_to_search_items(item);                                                
                      }); // end of forEach
               }
           }
        };
     });

     page.result.forEach(function(item, i, result){
        if ( ! $scope.check_input_filters(item) ) return ; 
        if ( ! $scope.check_brand_filters(item) ) return ;
        if ( ! $scope.check_range_filters(item) ) return ;
        if ( ! $scope.check_switch_filters(item) ) return ;
        if ( ! $scope.check_checkbox_filters(item) ) return ; 
            $scope.push_item_to_search_items(item);  
     });    


     console.log( 'search_filters ' , $scope.main_search_filters, 'filters_search', $scope.filters_search );    
     $scope.reload_menu = false; 

     if( $scope.main_search_filters['items'].length == 0 && !$scope.search_without_input ) {
          $scope.search_without_input = true;
          $scope.init_filters();
     } 
     
     if ( $scope.search_without_input ) {
          $scope.search_without_input = false;          
     }
     $scope.pagination_init(); 
     //if ( )
   }; // end of init_filters
   $scope.init_filters(); 

   $scope.change_brand_filter = function ( brand_name ) {
         $scope.filters_search['brand'][brand_name] ? delete $scope.filters_search['brand'][brand_name] :
         $scope.filters_search['brand'][brand_name] = true;
         console.log( 'change_brand_filter', $scope.filters_search['brand'] );
         $scope.init_filters();  
   };

   $scope.change_checkbox_filter = function (checkbox_name, item_id) {
         //console.log( 'change_checkbox_filter', checkbox_name  );
         //console.log(checkbox_name, item_id);
         !$scope.filters_search['checkbox'][checkbox_name] ? $scope.filters_search['checkbox'][checkbox_name] = {} : '' ;         

         $scope.filters_search['checkbox'][checkbox_name][item_id] ? delete $scope.filters_search['checkbox'][checkbox_name][item_id] :
         $scope.filters_search['checkbox'][checkbox_name][item_id] = true;
         //console.log( 'change_checkbox_filter', checkbox_name, item_id, $scope.filters_search['checkbox']  );
         $scope.init_filters();  
   };

   $scope.change_switch_filter = function (switch_name) {
         //console.log( switch_name );
         //return;
         $scope.filters_search['switch'][switch_name] ? delete $scope.filters_search['switch'][switch_name] :
         $scope.filters_search['switch'][switch_name] = true;
         //console.log( 'change_switch_filter', switch_name, $scope.filters_search['switch'][switch_name] );  
         $scope.init_filters();      
   };

   $scope.$root.change_range_filter = function (path, obj) {
         $scope.main_search_filters['range'][path] = obj
         //console.log( 'change_range_filter' );
         $scope.filters_search['range'] = window.clone_obj( $scope.main_search_filters['range'] );
         //console.log($scope.filters_search['range']);
         $scope.init_filters();
   };

   $scope.input_search = function () {
       $scope.filters_search['checkbox']       = {};
       $scope.filters_search['switch']         = {}; 
       $scope.filters_search['range']          = {};
       $scope.filters_search['brand']          = {};
       //$scope.filters_search['pagination'] = [];    
            //$scope.filters_search['pagination']['per_page'] = 24;
       $scope.init_filters();  
   };


   $scope.change_search_view = function(search_view){
         $scope.search_view = !$scope.search_view; 
         //$scope.body_search();
   };

   $scope.change_search_sort = function(sort) {
      $scope.search_sort = sort;
      //scrollServ(1000); 
      $scope.filters_search['pagination']['carrent_page'] = 1;
      $scope.init_filters();
   };


   $scope.count_brand_items = function($index) {
        $scope.brands_length = $index;
        //console.log( $scope.brand_items_length, $index );
   };

   $scope.all_brands_func = function () {
      $scope.all_brands = !$scope.all_brands;
   }

   $scope.create_arr = function (n) {
         //console.log( n );
         return new Array(n);
   };

   $scope.refreshSlider = function () {
      $timeout(function () {
            $scope.$broadcast('rzSliderForceRender');
      });
   };

});

watchApp.controller("SingleProductCtrl", function ($scope, 
singleProductExpServ,
page, global, scrollServ
 ) {
   $scope.$root.page_is_not_loading = true;   
   console.log.info( 'SingleProductCtrl is running, pathname is "' + location.pathname );

   $scope.page = page;

   if( !$scope.page ) {
      location.href = '/search-page';
      return;
   }
   scrollServ(500);
   $scope.breadcrumbtext = 'Single product'; 
   $scope.breadcrumbtext2 = $scope.page.product.name;

   singleProductExpServ($scope); // expend scope with methods
});


watchApp.controller("SellerStepCtrl", function ($scope, 
$routeParams,
sellerStepExpServ, signinupExpServ ) {
   $scope.$root.page_is_not_loading = true; 
   console.log.info( 'SellerStepCtrl is running, pathname is "' + location.pathname + '" , '+
   '$routeParams.step is '+ $routeParams.step);

   $scope.step = $routeParams.step;
  
   sellerStepExpServ($scope); // expend scope with methods
   signinupExpServ($scope); // expend scope with methods

   $scope.start_choose_case(); // choose which step is going when page is loaded
});

watchApp.controller("BuyerPartCtrl", function ($scope, 
cartOrderServ ) {
   $scope.$root.page_is_not_loading = true;    
   console.log.info( 'BuyerPartCtrl is running, pathname is "' + location.pathname + '"' );
     
   location.pathname == '/buyer-step/3' ? '' : cartOrderServ() ;

   $scope.$root.settings = settings;
   $scope.$root.settings_card = settings_card;
        
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

   $scope.$root.hide_cart = function(){
         //console.log( location.pathname , " /buyer-step/1" , location.pathname == "/buyer-step/1");
         if ( location.pathname == "/buyer-step/1" || 
              location.pathname == "/buyer-step/2" ||
              location.pathname == "/buyer-step/3" ){
            return true;        
         }
   }; 
});

watchApp.controller("BuyerStepsCtrl", function ($scope, 
$routeParams, 
buyerStepsExpServ ) {
   $scope.$root.page_is_not_loading = true;
   console.log.info( 'BuyerStepsCtrl is running, pathname is "' + location.pathname + '" ' +
   '$routeParams.buystep ' + $routeParams.buystep );

   if ( $routeParams.buystep ) {
      $scope.buystep = $routeParams.buystep;
   }  
   $scope.$root.settings = settings;
   $scope.$root.settings_card = settings_card;
   $scope.$root.cardpayment = {};
   //$scope.$root.hide_cart = true;
   
   buyerStepsExpServ($scope); // expend scope with methods
   
   $scope.breadcrumbtext = 'Shoping Cart'; 
  //$scope.breadcrumbtext2 = $scope.page.product.name; 

  $scope.start_choose_case(); // set step when page is loaded
  
});

watchApp.controller('PersonalPageCtrl', function ($scope, 
save_userExpServ, personal_page_validate_userExpServ, deleteHeartExpServ, favoriteHeartExpServ,
cabinet ) {
   $scope.$root.page_is_not_loading = true;
   console.log.info( 'PersonalPageCtrl is running, pathname is "' + location.pathname + '"' );
   
   //$scope.$root.settings = settings;
   //$scope.$root.settings_user = settings_user; 
   
   $scope.breadcrumbtext = 'Personal Page';
   if ( cabinet )  {
   $scope.page = cabinet;
   $scope.new_user = window.clone_obj($scope.page.user);
   //console.log($scope.page.user);
   //console.log( $scope.new_user );
   $scope.breadcrumbtext2 = settings._token == settings.old_token ? 'Register / Login' : $scope.new_user.name;
   $scope.seller = $scope.page.seller; 
   $scope.buyer = $scope.page.order; 
   $scope.favorites = $scope.page.favorites; 
   }

   save_userExpServ($scope); // expend $scope with method save_user
   personal_page_validate_userExpServ($scope); // expend $scope with method personal_page_validate_user  
   deleteHeartExpServ($scope)  // expend $scope with method deleteHeart 
   favoriteHeartExpServ($scope); // expend scope with methods

   $scope.merge_hearts();      
});

watchApp.controller("WatchServiceCtrl", function ($scope, $http, validateServ) {
   $scope.$root.page_is_not_loading = true;
   console.log.info( 'TestCtrl is running, pathname is "' + location.pathname + '"' ); 

   $scope.send_watch_service = function () {
         console.log( ' go go ' );
         if ( !$scope.service ) {
            document.getElementById("form-error").innerHTML = 'you need to fill all fields';
            return ;
         }
         validateServ.clean();
         var go = true;
         //validateServ.is_not_empty( $scope.service.servicing, 'servicing' ) ? '' : go = false; 
         validateServ.is_not_empty( $scope.service.brand, 'brand' ) ? '' : go = false;  
         validateServ.is_not_empty( $scope.service.model, 'model' ) ? '' : go = false; 
         validateServ.is_not_empty( $scope.service.reference, 'reference' ) ? '' : go = false; 
         //validateServ.is_not_empty( $scope.service.repair, 'repair' ) ? '' : go = false; 
         //validateServ.is_not_empty( $scope.service.revision, 'revision' ) ? '' : go = false; 
         //validateServ.is_not_empty( $scope.service.polishing, 'polishing' ) ? '' : go = false; 
         //validateServ.is_not_empty( $scope.service.wristband, 'wristband' ) ? '' : go = false; 
         validateServ.is_not_empty( $scope.service.name, 'name' ) ? '' : go = false; 
         validateServ.phone( $scope.service.phone ) ? '' : go = false; 
         validateServ.email( $scope.service.email ) ? '' : go = false; 
         if ( go ) {
            $http.post('/api/watch_service', $scope.service).
            then(function success(result){
                  var res = result.data;
                  console.log( 'after http to watchr_service ', res);
                  $scope.end_modal= true;
            }, function error(error){
                  console.error(error.status); console.error(error.statusText);
            }); 
         }
   }
});

watchApp.controller("CareerCtrl", function ( $scope, $routeParams, scrollServ ) {
   $scope.$root.page_is_not_loading = true;
   console.log.info( 'CareerCtrl is running, pathname is "' + location.pathname + '"' ); 

   console.log( '$routeParams.career ' + $routeParams.career );

   $scope.single_career_fnc = function(id){
         $scope.single_career = !$scope.single_career;
         scrollServ(500);
   };

   $scope.hide_single_career = function () {
         $scope.single_career = false;
   };

});

watchApp.controller("TestCtrl", function ($scope) {
   $scope.$root.page_is_not_loading = true;
   console.log.info( 'TestCtrl is running, pathname is "' + location.pathname + '"' ); 
});
 
