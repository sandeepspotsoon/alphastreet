jQuery(document).ready(function(){
    jQuery('a[href^="#"]').on('click', function (e) {
            e.preventDefault();
        var target = this.hash;
        var $target = jQuery(target);
        jQuery('html, body').stop().animate({
            'scrollTop': $target.offset().top - 75
        }, 800, 'swing', function () {});
            //return false;
    });
    jQuery('.bxslider').bxSlider({
    minSlides: 1
    , maxSlides: 1
    ,infiniteLoop : true
        ,controls : false
    , pager: false
        ,auto: true
        ,speed:250

    });
    $('.bxslidertestimonials').bxSlider({
         minSlides: 1,
         maxSlides: 1,
        auto: true,
        autoStart: true,
      autoControls: true,
        infiniteLoop: false,
        hideControlOnEnd: false,
        pager:true,
        pagerType:'full',
        controls:false,
        
    });

    $('.bxslider-products').bxSlider({
    pagerCustom: '#bx-pager',
        controls:false,
         autoStart: true,
         auto: true,
        infiniteLoop : true
});
    $('.teamslider').bxSlider({
    pagerCustom: '#bx-pager-for-teammembers',
        controls:false,
         autoStart: true,
         auto: true,
        infiniteLoop : true
});
   
    var checkwidth = $(window).width();
    if(checkwidth >= 992){
        $(document).on("scroll", onScroll);
      
    }
    function onScroll(){
        var check_position_of_customer_div = $('.customers-container').position().top;
        var top = jQuery(window).scrollTop();
        
        if(top > check_position_of_customer_div){
            $('header').addClass('stickyheader');   
        }
        else{
            $('header').removeClass('stickyheader'); 
        }
    }
});