
;(function(){

setTimeout(function(){

	  // PRICE SLIDER BEFORE 


var style = document.createElement('style');
    style.innerHTML = ".ui-rangeSlider-label-value:before {"+
    "content:'"+ settings.appcurrency +"' !important;}";
    document.querySelector('head').appendChild(style);


    var sli = $("#slider-price-range");   
    var min = sli.attr('min') ? sli.attr('min') : 0;              
    var max = sli.attr('max');
    var defaultmin = sli.attr('defaultmin') ? sli.attr('defaultmin') : min;               
    var defaultmax = sli.attr('defaultmax') ? sli.attr('defaultmax') : max;  
       
    //console.log(+defaultmin);
    //console.log(+defaultmax);
    
	sli.editRangeSlider({
    	arrows:false,
		symmetricPositionning: true,
		range: {min: 0},  
    	bounds:{min: +min, max: +max},
    	defaultValues:{min: +defaultmin, max: +defaultmax}
	});
    

	sli.editRangeSlider('resize');

	console.log( 'RangeSlider is going ' );

}, 2000);


})();
