//'use strict';

// directives

watchApp.directive('rzSliderInitDir', function () {
    return {
        restrict: 'E', 
        scope : false,       
        link: function (scope, element, attr) {
           element.ready(function () {

// https://github.com/angular-slider/angularjs-slider           
function body_of_this_dir(){
                var min = +attr.min;
                var max = +attr.max;
                var id = attr.id;

                
                !scope.slider ? scope.slider = {} : '' ;

             
                scope.onEnd = function () {
                    //scope.$root.search_filters['range'][scope.slider[id].options.id] =
                    //scope.$root.search.range_arr[scope.slider[id].options.id] =
                    //{ 
                    //    min : scope.slider[id].minValue,
                    //    max: scope.slider[id].maxValue, 
                    //    exist : true                        
                    //}
                    //$scope.$root.search_filters['range'][category].max
                    //console.log( scope.$root.search_filters );
                    scope.$root.change_range_filter(scope.slider[id].options.id,   { 
                        min : scope.slider[id].minValue,
                        max: scope.slider[id].maxValue, 
                        exist : true                        
                    });
                }; 


                var body = {
                    minValue: min,
                    maxValue: max,
                    options: {
                        floor: min,
                        ceil: max,
                        step: 1,
                        id: id,
                        onEnd: scope.onEnd
                    }
                };

                //console.log( body );

                scope.slider[id] = body; 
}   
                body_of_this_dir();
                scope.$watch('range_item_reload', function(){
                    //console.log( ' reload  ' );
                      body_of_this_dir();      
                });

            });
        }
    }
});



watchApp.directive('cssLazyLoad', function () {
    return {
        restrict: 'A', 
        scope : false,       
        link: function (scope, element, attr) {
                element.ready(function () {

    var href = attr['href'];

    var link = document.createElement('link');
    link.rel = "stylesheet";
    link.href = href;

    var head = document.getElementsByTagName('head')[0];
    
    head.appendChild(link);        


                });
        }
    }
});



watchApp.directive('jsLazyLoad', function () {
    return {
        restrict: 'A', 
        scope : false,       
        link: function (scope, element, attr) {
                element.ready(function () {

    var src = attr['src'];

    var script = document.createElement('script');
    script.src = src;

    var head = document.getElementsByTagName('head')[0];
    
    head.appendChild(script);        

                });
        }
    }
});

watchApp.directive('scrollDir', function () {
    return {
        restrict: 'A', 
        scope : false,       
        link: function (scope, element, attr) {       
                element.ready(function () { 
         var time = attr['scrollDir']  ?  attr['scrollDir']  : 1000;      
         $('html, body').animate({
            scrollTop:$("#startposition").offset().top
         }, time);
                });
        }
    }
});

watchApp.directive('checkedDir', function () {
    return {
        restrict: 'A', 
        scope : false,       
        link: function (scope, element, attr) {       
                element.ready(function () {  
    var tax = attr['tax'];              
    var sid = attr['sid'];
    var all = attr['all'];  
    var check = (tax.split(sid).length - 1) > 0 ? true : false;

    if ( all == 'all' && !tax ) { check = true };

    element.attr('checked' , check );
                });
        }
    }
});



watchApp.directive('addToCardDir', function (safeApply) {
    return {
        restrict: 'A', 
        scope : false,       
        link: function (scope, element, attr) {       
                element.ready(function () {  
            
            element.bind( 'click' , function( e ) {
                
try {

var massege = {'status': 1, 'error': ''};
var card = JSON.parse(window.localStorage.getItem("settings_card")) ? JSON.parse(window.localStorage.getItem("settings_card")) : [];
var item = JSON.parse(attr['addToCardDir']);
var gotocard = attr['gotocard'] ? attr['gotocard'] : false ;
//console.log( card );
//console.log( item );
if( massege.status && !Array.isArray(card) ) { 
    massege = {'status': 0, 'error': 'card is not array'};
};
if( massege.status && typeof item != 'object' || !item.id ) { 
    massege = {'status': 0, 'error': 'item is not object'};
};
if (  massege.status ) {
    card.forEach(function(goods){
        if (goods.id == item.id ){
            massege = {'status': 0, 'error': 'item is in card already'};
            scope.$root.product_added_already_modal = !scope.$root.product_added_already_modal; 
            safeApply(scope.$root);
            //alert('item is in card already');      
        };
    });
};
if (  massege.status ) {
    card.push( item );
    settings_card = card;
    scope.$root.settings_card = settings_card;
    window.localStorage.setItem( "settings_card", JSON.stringify(settings_card) );
    safeApply(scope.$root);
};
console.log( massege );
if ( gotocard ) {
    console.log( gotocard );
    location.href = '/buyer-step/1';
}
} catch(e) {
    window.localStorage.setItem( "settings_card", JSON.stringify([]) );
    console.log( e ); 
}
            }); 

                });
        }
    }
});

watchApp.directive('showModalRemoveFromCardDir', function (safeApply) {
    return {
        restrict: 'A', 
        scope : false,       
        link: function (scope, element, attr) {       
                element.ready(function () {  
            
            element.bind( 'click' , function( e ) {
                
                var item = JSON.parse(attr['showModalRemoveFromCardDir']);
                scope.$root.remove_item = item;                
                scope.$root.modal_remove_if_want = true;
                safeApply(scope);
            }); 

                });
        }
    }
});

watchApp.directive('hideModalRemoveFromCardDir', function (safeApply) {
    return {
        restrict: 'A', 
        scope : false,       
        link: function (scope, element, attr) {       
                element.ready(function () {  
            
            element.bind( 'click' , function( e ) {
                scope.$root.remove_item = false;
                scope.$root.modal_remove_if_want = false;                
                safeApply(scope);
            }); 

                });
        }
    }
});
                
                

watchApp.directive('removeFromCardDir', function (safeApply) {
    return {
        restrict: 'A', 
        scope : false,       
        link: function (scope, element, attr) {       
                element.ready(function () {  
            
            element.bind( 'click' , function( e ) {
                
try {
var massege = {'status': 1, 'error': ''};
var card = JSON.parse(window.localStorage.getItem("settings_card")) ? JSON.parse(window.localStorage.getItem("settings_card")) : [];
//var item = JSON.parse(attr['removeFromCardDir']);
if(scope.$root.remove_item){
    var item = scope.$root.remove_item;
} else {
    var item = JSON.parse(attr['removeFromCardDir']);
}
console.log( card );
console.log( item );
if( massege.status && !Array.isArray(card) ) { 
    massege = {'status': 0, 'error': 'card is not array'};
};
if( massege.status && typeof item != 'object' || !item.id ) { 
    massege = {'status': 0, 'error': 'item is not object'};
};
if (  massege.status ) {
    card.forEach(function(goods, i, arr){
        if (goods.id == item.id ){
            card.splice(i, 1);
            massege = {'status': 1, 'error': 'item # '+item.id+' is removed'};       
        };
    });
};
if (  massege.status ) {
    settings_card = card;
    scope.$root.settings_card = settings_card;
    scope.$root.remove_item = false;
    scope.$root.modal_remove_if_want = false;
    window.localStorage.setItem( "settings_card", JSON.stringify(settings_card) );
    safeApply(scope.$root);
};
console.log( massege );
} catch(e) {
    window.localStorage.setItem( "settings_card", JSON.stringify([]) );
    console.log( e ); 
}
            }); 

                });
        }
    }
});


watchApp.directive( 'redirectToDir' , function(){
    return {
        restrict: 'A',
        link: function( scope , element , attr ) {
            
            element.bind( 'click' , function( e ) {
                console.log( ' we are going to ', attr['redirectToDir'])
                //$location.path( attr['redirectToDir'] );
                location.href = attr['redirectToDir'];

            });
        }
    };
});

watchApp.directive( 'logOutDir' , function(){
    return {
        restrict: 'A',
        link: function( scope , element , attr ) {
            
            element.bind( 'click' , function( e ) {

                window.localStorage.setItem( "_token", settings.old_token );
                location.reload();

            });
        }
    };
});


watchApp.directive( 'ifHasValDirtyDir' , function(){
    return {
        restrict: 'A',
        link: function( scope , element , attr ) {
                 element.ready(function () { 
                      if( attr['ngModel'] ) {
                         element.addClass('ng-dirty'); 
                      }                     
                 });                           
        }
    };
});


watchApp.directive( 'beforeUloginDir' , function(){
    return {
        restrict: 'A',
        link: function( scope , element , attr ) {
            
            element.bind( 'click' , function( e ) {

          var phone = attr['phone'];
          var re = /^[0-9]{5,20}$/;        
          if ( ! phone || ! re.test(phone) ) {
              e.stopPropagation ? e.stopPropagation() : (e.cancelBubble=true);
          }

            });
        }
    };
});


watchApp.directive( 'requiredAttrDir' , function(){
    return {
        restrict: 'A',
        link: function( scope , element , attr ) {
                 element.ready(function () { 
                      if( attr['requiredAttrDir'] ) {
                         element.attr('required', 'required'); 
                      }                     
                 });                           
        }
    };
});


watchApp.directive( 'requiredAttrDir' , function(){
    return {
        restrict: 'A',
        link: function( scope , element , attr ) {
                 element.ready(function () { 
                      if( attr['requiredAttrDir'] ) {
                         element.attr('required', 'required'); 
                      }                     
                 });                           
        }
    };
});


watchApp.directive( 'autocompleteDir' , function(){
    return {
        restrict: 'A',
        link: function( scope , element , attr ) {
                 //console.log( attr['autocompleteval'] )
                 var eventfunc = function( e ) {    
                      if( attr['autocompleteDir'] && element[0].value ) {
   var data = JSON.parse(attr['autocompleteDir']);
   var val = element[0].value;
   scope[attr['autocompleteobj']][attr['autocompleteprop']] = val;
   var autocomplete_is_not_valid = true;
   data.forEach(function(item, i){
        if ( val == item ) {
            autocomplete_is_not_valid = false;        
        }
   }); 
   autocomplete_is_not_valid ? element.addClass('autocomplete_is_not_valid') : 
   element.removeClass('autocomplete_is_not_valid') ;
   
                   
                      } 
                 }; 
                 eventfunc();
 
                element.bind( 'input' , eventfunc ); 
                element.parent().parent().bind('mousemove', eventfunc );
                                      
                       
        }
    };
});

watchApp.directive( 'heartDir' , function($http){
    return {
        restrict: 'A',
        link: function( scope , element , attr ) {

        var spartainterval = setInterval(sparta, 1500);    

 function sparta () {
                
        if( ! attr['heartDir'] ) {
             console.log(' SPARTA ');
             return;             
        }
            clearInterval(spartainterval); 
            var hearts = JSON.parse(window.localStorage.getItem("settings_hearts")) ? 
            JSON.parse(window.localStorage.getItem("settings_hearts")) : [];
            var item = JSON.parse( attr['heartDir'] );  
            var chosen = false;
            for(var i = 0; i < hearts.length; i++)  {
                if(hearts[i] == item ) {
                    chosen = true;
                }
            }
            if (chosen) {
                element.addClass('fa-heart');
                element.removeClass('fa-heart-o');
            } else {
                element.addClass('fa-heart-o');
                element.removeClass('fa-heart');
            }

            element.bind( 'click' , function( e ) {


                var hearts = JSON.parse(window.localStorage.getItem("settings_hearts")) ? 
                JSON.parse(window.localStorage.getItem("settings_hearts")) : [];


                var item = JSON.parse( attr['heartDir'] );
                console.log( hearts );                
                console.log( item );


    for(var i = 0; i < hearts.length; i++)  {
        if(hearts[i] == item ) {

   $http.get('/api/favorite/destroy?token='+settings._token+
   '&id='+item).then(function success(res){
      console.log.get('heartDir got respons ( /api/favorite/destroy?token='+settings._token+
   '&id='+item + ' )', res );
      hearts.splice(i, 1);  
      window.localStorage.setItem( "settings_hearts", JSON.stringify(hearts) );  
                element.addClass('fa-heart-o');
                element.removeClass('fa-heart');
      console.log( 'now is ' , hearts ) 
   }, function error(error){
      console.log(error.status); console.log(error.statusText);
   });
            return;

        }
    }


                hearts.push( item ); 

                if ( settings.old_token == settings._token ) {
                    window.localStorage.setItem( "settings_hearts", JSON.stringify(hearts) );
                    element.addClass('fa-heart');
                    element.removeClass('fa-heart-o');
                    return;
                } else {

   var ids = hearts.join(',');
                 
   $http.get('/api/favorite/pack?token='+settings._token+
   '&ids='+ids).then(function success(res){
      console.log.get( '/api/favorite/pack?token='+settings._token+'&ids='+ids, res );  
      window.localStorage.setItem( "settings_hearts", JSON.stringify(hearts) ); 
                element.addClass('fa-heart');
                element.removeClass('fa-heart-o');
      console.log( 'now is ' , hearts )   
   }, function error(error){
      console.log(error.status); console.log(error.statusText);
   });
                }


            });
} // end of sparta           

        }
    };
});


watchApp.directive( 'postToApiSendMessageDir' , function($http, validateServ){
    return {
        restrict: 'A',
        link: function( scope , element , attr ) {
           element.bind( 'click' , function( e ) {

   console.log( scope.chat );
   var go = true;
   validateServ.clean();
   if ( scope.chat ) {
        validateServ.is_not_empty(scope.chat.name, 'name') ? '' : go = false;            
        validateServ.is_not_empty(scope.chat.last_name, 'last name') ? '' : go = false;    
        validateServ.email(scope.chat.email) ? '' : go = false; 
   } else {
       document.getElementById('form-error').innerHTML += 
       'required fields must be full </br>';
       go = false; 
   }        
   if ( ! go ) { return '' };
   $http.post( '/api/send_message', scope.chat).then(function success(res){
      console.log.get('postToApiSendMessageDir got response ( /api/send_message ) ', res );
   }, function error(error){
      console.log(error.status); console.log(error.statusText);
   });
                     
           });                           
        }
    };
});

/*
watchApp.directive( 'paypalFirstClickDir' , function(){
    return {
        restrict: 'A',
        link: function( scope , element , attr ) {
            
            element.bind( 'click' , function( e ) {


            });
        }
    };
});
*/

watchApp.directive( 'cursorWaitDir' , function(){
    return {
        restrict: 'A',
        link: function( scope , element , attr ) {
            
            element.bind( 'click' , function( e ) {
                console.log( 'progress !important' );
                document.querySelector('#watchr-body').classList.add('cursor-progress');
                element.addClass('cursor-progress');
                setInterval(function(){
                    document.querySelector('#watchr-body').classList.remove('cursor-progress');
                    element.removeClass('cursor-progress');
                }, 3000)
            });
        }
    };
});


watchApp.directive( 'showIntercomDir' , function(){
    return {
        restrict: 'A',
        link: function( scope , element , attr ) {

            element.bind( 'click' , function( e ) {
// https://app.intercom.io/a/apps/tf1fehnh/guide/web_integration/web_integration_secure_mode
                try {
                    Intercom('showNewMessage');
                } catch (e){
                    console.log( e );  
                }

            });                          
        }
    };
});

watchApp.directive( 'cleanAppointmentDir' , function(){
    return {
        restrict: 'A',
        link: function( scope , element , attr ) {

            element.bind( 'click' , function( e ) {

                if ( attr["cleanAppointmentDir"] ) {
                    attr["cleanAppointmentDir"] = '1';
                } else {
                    var i = attr["index"];
                    scope.caldays[i]['time'] = '';
                    attr["cleanAppointmentDir"] = '';                    
                }
            
            }); 

        }
    };
});

watchApp.directive('jqdatepicker', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
         link: function (scope, element, attrs, ngModelCtrl) {
            element.datepicker({
                dateFormat: 'm/yy',
                onSelect: function (date) {
                    //scope.date = date;
                    scope.$root.cardpayment.ed = date;
                    scope.$apply();
                }
            });
        }
    };
});