setTimeout(function(){ 

console.log("test");

// LANDING SLIDERS

$(document).ready(function() { 
  $("#watches-slider").owlCarousel({
  	items: 4,
  	navigation: true,
  	navigationText: ["<",">"],
  	pagination: false,
    itemsMobile : [650,1],
  	itemsTablet: [1199,2]
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



// SINGLE PRODUCT SLIDER


$(document).ready(function() { 
  $(".little-imgs-slider").owlCarousel({
    items: 6,
    navigation: true,
    navigationText: ["<",">"],
    pagination: false,
    itemsTablet: [1199,4],
    itemsMobile : [479,3]
  }); 
});

// SELECTS INIT
/*
if($('.standart-select')) {
    $('.standart-select').styler();
}
*/

// SP PHOTO ZOOM 

$(document).ready(function(){
  $(".big-img-container").click(function() {
    $(".zoom-popup-img").attr("src", $(".big-product-img").attr("src"));
    $(".zoom-popup-bg").removeClass("no-active");
    $(".zoom-popup-img-container").removeClass("no-active");
  })
  $(".zoom-popup-close-btn").click(function() {
    $(".zoom-popup-bg").addClass("no-active");
    $(".zoom-popup-img-container").addClass("no-active");
  })
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
        if (!($(".search-sidebar_mobile-header_btn").hasClass("active"))) {
        $(".search-sidebar_mobile-header_btn").addClass("active");
        $(".filter-tabs").removeClass("filter-tabs_hidden-m");
        $('#slider-price-range').editRangeSlider('resize');
        } else {
        $(".search-sidebar_mobile-header_btn").removeClass("active");
        $(".filter-tabs").addClass("filter-tabs_hidden-m");
         }
      });
    }
  });

  // CART BTN

  $(document).ready(function(){
    if($(".cart-btn")){
      $(".cart-btn").click(function() {
        if ($(".active-cart-list-container").hasClass("no-active")) {
          $(".active-cart-list-container").removeClass("no-active");
        } else {
        $(".active-cart-list-container").addClass("no-active");
         }
      });
    }
  });

  // PERSONAL PAGE EDIT BTN 

$(document).ready(function(){
    if($(".personal-info-edit-btn")){
      $(".personal-info-edit-btn").click(function() {
        if (!($(".cart-modal-container").hasClass("cart-modal-container_visible"))) {
          $(".cart-modal-container").addClass("cart-modal-container_visible");
        } else {
        $(".cart-modal-container").removeClass("cart-modal-container_visible");
         }
      });
    }
  });

 
  // MODAL CLOSE BTN 

  $(document).ready(function(){
    if($(".modal-close-btn")){
      $(".modal-close-btn").click(function() {
        if (!($(".cart-modal-container").hasClass("cart-modal-container_visible"))) {
          $(".cart-modal-container").addClass("cart-modal-container_visible");
        } else {
        $(".cart-modal-container").removeClass("cart-modal-container_visible");
         }
      });
    }
  });

}, 2000);