setTimeout(function(){ 

console.log("main.js is going");

// LANDING SLIDERS

/*Слайдер товаров: Используется на Landing Page, Single Product Page*/

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


/*Слайдер отзывов с одним блоком на экран: Используется на Landing Page*/

$(document).ready(function() { 
  $("#cust-rev-slider").owlCarousel({
  	items: 1,
  	navigation: true,
    slideSpeed: 1500,
    rewindSpeed: 1500,
  	navigationText: ["<",">"],
  	pagination: false,
  	afterAction : afterAction,
  	itemsTablet: [1199,1],
	autoHeight: true
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


/*Слайдер отзывов с двумя блоками на экран: Используется на Seller Landing Page, Single Product Page*/

$(document).ready(function() { 
  $("#sell-rev-slider").owlCarousel({
  	items: 2,
    slideSpeed: 1500,
    rewindSpeed: 1500,
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

/*Слайдер для маленьких картинок: Используется на Single Product Page*/

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

/*Инит для селекта: Используется пока только на Buyer Step 2*/


if($('.standart-select')) {
$(function() {
    $('.standart-select').styler();
});
}



// SP PHOTO ZOOM 

/*Зум большой картинки на странице товара: Используется на Single Product Page*/

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


$('.collapse').collapse();


// FILTER MOBILE MENU

/*Код для кнопки фильтров на мобильной версии: Используется на Search Page*/ 

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

  /*Код для работы кнопки отображения мини-корзины: Используется на всех страницах*/ 

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

  /*Код для работы кнопки появления попап полей изменения личных данных: Используется на Personal Page*/ 

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

   /*Код для работы кнопки сокрытия попап окна: Используется везде где есть попап*/ 

  $(document).ready(function(){
    if($(".modal-close-btn, #close-personal-info")){
      $(".modal-close-btn, #close-personal-info").click(function() {
        if (!($(".cart-modal-container").hasClass("cart-modal-container_visible"))) {
          $(".cart-modal-container").addClass("cart-modal-container_visible");
        } else {
        $(".cart-modal-container").removeClass("cart-modal-container_visible");
         }
      });
    }
  });
  
  
    // Video Modal + BTN 
    // код для работы модального окна с видео и кнопки: Используется на Landing Page;


    $(".video-btn").click(function() {
      $(".video-modal").addClass("cart-modal-container_visible");
	  $('#modal-video').get(0).load();
      $('#modal-video').get(0).play();

      $(".modal-close-btn").click(function() {
        $('#modal-video').get(0).pause();
        $('#modal-video').get(0).currentTime = 0;
      });
    });
	
	// Zoom 
    // код для работы zoom: Используется на Personal Page;
	
	 $("#image-for-zoom").imagezoomsl({
        
         zoomrange: [3, 3],
         magnifierborder: '2px solid #d2b356'
      });
	  
	// affix
    // код для работы affix: Используется на FAQ;
	  
	  $('#faq-nav').affix({
      offset: {
      top: function () {
        return ($('.main-header').outerHeight(true) + $('.photo-block-container').outerHeight(true) - 40)
        },
      bottom: function () {
        return (this.bottom = $('.main-footer').outerHeight(true))
        }
      }
    });
	
		// affix
    // код для работы affix: Используется на Summary;
	  
	  $('#summary-box').affix({
      offset: {
      top: function () {
        return ($('.main-header').outerHeight(true) + $('.bottom-header-part').outerHeight(true) + $('.breadcrumbs-container-main').outerHeight(true));
        },
      bottom: function () {
        return (this.bottom = $('.main-footer').outerHeight(true))
        }
      }
    });
	
	// ScrollSpy
    // код для работы ScrollSpy: Используется на FAQ;

    $('body').scrollspy({ target: '#faq-nav-container' })
	
	//  Плавный Скролинг
    // код для работы со скролингом до якорей: Используется на FAQ;
	
    $(document).ready(function() {
		$('a[href^="#"]').click(function(){
			var el = $(this).attr('href');
		$('body').animate({
			scrollTop: $(el).offset().top}, 300);
			return false;
		});
    });
	
	 // Support popup code
	 // Код для работы всплывающего окна Саппорта

    var supBtn = $('.support-btn');
    var supPopUp = $('.contacts-block_header-part');
    var supPopUpBg = $('.support-popup-bg')

    supBtn.click(function() {
      supBtn.attr('disabled', 'disabled');

      if(supBtn.hasClass('active')) {
        supPopUp.removeClass('active');
        supPopUpBg.css('opacity','0');
        setTimeout(function() {
          supPopUpBg.css('display','none');
          supBtn.removeClass('active');
          supBtn.removeAttr('disabled');
        }, 700);
      } else {
        supBtn.addClass('active');
        supPopUp.addClass('active');
        supPopUpBg.css('display','block');
        supPopUpBg.css('opacity','1');
        supBtn.removeAttr('disabled');
      }
    })

     supPopUpBg.click(function(){
      if(supBtn.hasClass('active')) {
        supPopUp.removeClass('active');
        supPopUpBg.css('opacity','0');
        setTimeout(function() {
          supPopUpBg.css('display','none');
          supBtn.removeClass('active');
          supBtn.removeAttr('disabled');
        }, 700);
      }
	   if($(".mobile-menu-btn").hasClass("mobile-menu-btn_active")) {
          $(".mobile-menu-btn").removeClass("mobile-menu-btn_active");
          $(".mobile-menu-content").addClass("mobile-menu-content_hidden");
          supPopUpBg.css('opacity','0');
          setTimeout(function() {
            supPopUpBg.css('display','none');
          }, 700);
        }	
    });

    // MENU BTN

    /*Код для работы кнопки мобильного меню: Используется на всех страницах*/ 

    $(document).ready(function(){
      $(".mobile-menu-btn").click(function() {
        if($(".mobile-menu-btn").hasClass("mobile-menu-btn_active")) {
          $(".mobile-menu-btn").removeClass("mobile-menu-btn_active");
          $(".mobile-menu-content").addClass("mobile-menu-content_hidden");
          supPopUpBg.css('opacity','0');
          setTimeout(function() {
            supPopUpBg.css('display','none');
          }, 700);
        } else {
          $(".mobile-menu-btn").addClass("mobile-menu-btn_active");
          $(".mobile-menu-content").removeClass("mobile-menu-content_hidden");
          supPopUpBg.css('display','block');
          supPopUpBg.css('opacity','1');
        }
      })
    });
	

}, 1000);