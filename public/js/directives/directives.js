'use strict';

// directives


customDirectives.directive('cssLazyLoad', function () {
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



customDirectives.directive('jsLazyLoad', function () {
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


customDirectives.directive('checkedDir', function () {
    return {
        restrict: 'A', 
        scope : false,       
        link: function (scope, element, attr) {
                element.ready(function () {  
    var tax = attr['tax'];              
    var sid = attr['sid']; 
    var check = (tax.split(sid).length - 1) > 0 ? true : false;
    element.attr('checked' , check );
                });
        }
    }
});

