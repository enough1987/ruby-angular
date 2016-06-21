

setTimeout(function(){
console.log("main.js is running");

// TEXT FIELD PLACEHOLDER

$('.text-field').focus(function() {
    $(this).next('.text-field-placeholder').hide();
});

$('.text-field').blur(function() {
    if ($(this).val().trim() === '') {
        $(this).next('.text-field-placeholder').show();
    }
});

if($('.standart-select')) {
$(function() {
  	$('.standart-select').styler();
});
}

// LANDING SLIDERS

$(document).ready(function() { 
  $("#watches-slider").owlCarousel({
  	items: 4,
  	navigation: true,
  	navigationText: ["<",">"],
  	pagination: false,
  	itemsTablet: [1199,1]
  }); 
});

$(document).ready(function() { 
  $("#cust-rev-slider").owlCarousel({
  	items: 1,
  	navigation: true,
  	navigationText: ["<",">"],
  	pagination: false,
  	afterAction : afterAction,
  	itemsTablet: [1199,1]
  });

 
  function afterAction(){

  	$itemsLength = this.owl.owlItems.length;
  	$currentItem = this.owl.currentItem;

  	if($itemsLength < 10) {
  		$itemsLengthString = '0' + this.owl.owlItems.length;
  		$(".owlItems").text($itemsLengthString);
  	} else {
  		$(".owlItems").text($itemsLength);
  	}

  	if($currentItem < 10) {
  		$currentItemString = '0' + (this.owl.currentItem + 1);
  		$(".currentItem").text($currentItemString);
  	} else {
  		$(".currentItem").text($currentItem + 1);
  	}

    // $(".owlItems").text(this.owl.owlItems.length);
    // $(".currentItem").text(this.owl.currentItem);
	}
});

$(document).ready(function() { 
  $("#sell-rev-slider").owlCarousel({
  	items: 2,
  	navigation: true,
  	navigationText: ["<",">"],
  	pagination: false,
  	afterAction : afterAction,
  	itemsTablet: [1199,1]
  });

 
  function afterAction(){

  	$itemsLength = this.owl.owlItems.length;
  	$currentItem = this.owl.currentItem;

  	if($itemsLength < 10) {
  		$itemsLengthString = '0' + this.owl.owlItems.length;
  		$(".owlItems").text($itemsLengthString);
  	} else {
  		$(".owlItems").text($itemsLength);
  	}

  	if($currentItem < 10) {
  		$currentItemString = '0' + (this.owl.currentItem + 1);
  		$(".currentItem").text($currentItemString);
  	} else {
  		$(".currentItem").text($currentItem + 1);
  	}

    // $(".owlItems").text(this.owl.owlItems.length);
    // $(".currentItem").text(this.owl.currentItem);
	}
});


 

// MENU BTN 

$(document).ready(function(){
  $(".mobile-menu-btn").click(function() {
    if($(".mobile-menu-btn").hasClass("mobile-menu-btn_active")) {
      $(".mobile-menu-btn").removeClass("mobile-menu-btn_active");
      $(".mobile-menu-content").addClass("mobile-menu-content_hidden");
    } else {
      $(".mobile-menu-btn").addClass("mobile-menu-btn_active");
      $(".mobile-menu-content").removeClass("mobile-menu-content_hidden");
    }
  })
});


$('.collapse').collapse();


// FILTER MOBILE MENU 

  $(document).ready(function(){
    if($(".search-sidebar_mobile-header_btn")){
      $(".search-sidebar_mobile-header_btn").click(function() {
        console.log('1');
        if (!($(".search-sidebar_mobile-header_btn").hasClass("active"))) {
        $(".search-sidebar_mobile-header_btn").addClass("active");
        $(".filter-tabs").removeClass("filter-tabs_hidden-m");
        } else {
        $(".search-sidebar_mobile-header_btn").removeClass("active");
        $(".filter-tabs").addClass("filter-tabs_hidden-m");
         }
      });
    }
  });

}, 1000);
