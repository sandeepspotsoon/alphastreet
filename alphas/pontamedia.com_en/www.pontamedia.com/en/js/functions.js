
$(document).bind("mobileinit", function () {
    $.mobile.autoInitializePage = false;
});

var scene;

$(document).ready(function() {
    if($(this).find('.modal-loading img:visible').length > 0) {
        $(this).find('.modal-loading img').fadeOut(500, function () {
            $(this).parent().fadeOut(500);
        });
    } else {
        $(this).find('.modal-loading').fadeOut(500);
    }

    $(window).resize(function () {
        bubblesPositioning();

        $('.globo1').globoAnimation();
        $('.globo2').globoAnimation2();
        $('.cloud1').cloudAnimation();
        $('.cloud2').cloudAnimation2();
        $('.cloud3').cloudAnimation3();
        $('.cloud4').cloudAnimation4();
        $('.plane1').planeAnimation();
    });
    bubblesPositioning(true);

    $('.globo1').globoAnimation();
    $('.globo2').globoAnimation2();
    $('.cloud1').cloudAnimation();
    $('.cloud2').cloudAnimation2();
    $('.cloud3').cloudAnimation3();
    $('.cloud4').cloudAnimation4();
    $('.plane1').planeAnimation();


    var cont = 0;

    $('#header').autoHidingNavbar();

    $(window).scroll(function (e) {
        var st = $(this).scrollTop();

        checkAnimation();
        if(st > 0) {
            $('#header').addClass('scrolled');
            $('body').addClass('scrolled');
        } else {
            $('#header').removeClass('scrolled');
            $('body').removeClass('scrolled');
        }
        checkMenuPosition(st);
    });

    $('.slide-home-5 li').on('click',function() {
        if($('body').width() > 970) {
            var el = $(this);
            var modal = $('.modal-team');
            modal.find('.img').attr('src', el.find('img').data('img')).attr('alt', el.find('.name').html());
            modal.find('.name').html(el.find('.name').html())
            modal.find('.position').html(el.find('.position').html());
            modal.find('.description').html(el.find('.description').html());
            modal.find('.btn').attr('href', el.find('.linkedin').html());
            $('.modal-team').fadeIn(300);
        }

    });

    $('.slide-publishers-1 li').hide();
    var maxSlides = $('.slide-publishers-1 li').length;
    var currentSlide = 0;
    var el = $($('.slide-publishers-1 li')[currentSlide]);
    el.fadeIn(300);
    setInterval(function(){
        var el = $($('.slide-publishers-1 li')[currentSlide]);
        el.hide("drop");
        currentSlide++;
        if(currentSlide == maxSlides) {
            currentSlide = 0;
        }
        var el = $($('.slide-publishers-1 li')[currentSlide]);
        el.show("drop",{direction:'right'});

    },2000);

    $('.slide-publishers-3 ul.menu li').on('click',function(e) {
        if(!$(this).hasClass('active') && $('body').width() > 970) {
            var numCurrent = $(this).parent().find('li').index($(this).parent().find('li.active').get(0));
            $(this).parent().find('li').removeClass('active');
            var num = $(this).parent().find('li').index(this);
            $(this).addClass('active');

            var images = $('.slide-publishers-3 ul.images');

            if(numCurrent < num) {
                var anim = '-';
                var css = '';
            } else {
                var anim = '';
                var css = '-';
            }

            images.find('li.active').removeClass('active').animate({
                'margin-left': anim+'50%',
                opacity: '0'
            }, 400, "easeInSine");

            images.find('li').eq(num).addClass('active').show().css('opacity', 0).css('margin-left', css+'50%');
            images.find('li').eq(num).addClass('active').animate({
                'margin-left': '0px',
                opacity: '1'
            }, 400, "easeInSine");
        }

    });
    $('.slide-publishers-3 ul.images li.active').css('opacity',1);

    $('.bubbles').on('animate',function() {
        $(this).css('visibility','visible');
        var page = $(this).data('page') !== undefined ? $(this).data('page') : 1;
        var count = 0;
        $.each($(this).find('li'),function() {
            count++;
            var inPage = Math.ceil(count/20);
            if(inPage == page) {

                var timeout = Math.floor((Math.random() * 500) + 0);
                $(this).css('visibility','visible');
                $(this).css('opacity',0);
                $(this).delay(timeout).animate({
                    'opacity': '1',
                    'margin-top': 0

                }, 500, "easeOutCubic");
            }
        });
    });

    var animatedElements = $('.anim-left, .anim-right, .anim-fade');

    animatedElements.css('visibility','hidden');

    animatedElements.on('animate',function() {
        var el = $(this).css('visibility','hidden').css('transition','none');
        if(el.hasClass('anim-delay-200')) {
            el.delay(200);
        }
        if(el.hasClass('anim-delay-400')) {
            el.delay(400);
        }
        if(el.hasClass('anim-delay-600')) {
            el.delay(600);
        }
        if(el.hasClass('anim-delay-800')) {
            el.delay(800);
        }
        if(el.hasClass('anim-delay-1000')) {
            el.delay(1000);
        }
        if(el.hasClass('anim-left')){
            el.queue(function (next) {
                $(this).css('visibility','visible');
                $(this).hide();
                next();
            }).show("drop",{direction:'right'},function(){$(this).css('opacity','').css('transition','')});
        }
        if(el.hasClass('anim-right')){
            el.queue(function (next) {
                $(this).css('visibility','visible');
                $(this).hide();
                next();
            }).show("drop",{direction:'left'},function(){$(this).css('opacity','').css('transition','')});
        }
        if(el.hasClass('anim-fade')){
            el.queue(function (next) {
                $(this).css('visibility','visible');
                $(this).hide();
                next();
            }).fadeIn(400,function(){$(this).css('opacity','').css('transition','')});
        }

    });


    $('.slide-home-3 .marcas li').on('click',function() {
        var numCurrent = $(this).parent().find('li').index($(this));
        if(!$(this).hasClass('active')) {

            var active = $(this).parent().parent().find('.marcas-content > li:nth-child('+(numCurrent+1)+')');
            active.trigger('show');
        }
    });

    $('.marcas-content li').on('show',function() {
        var numCurrent = $(this).parent().children('li').index($(this));
        $(this).parent().parent().find('.marcas > li').removeClass('active');
        $(this).parent().parent().find('.marcas > li:nth-child('+(numCurrent+1)+')').addClass('active');
        var active = $(this);
        var pages = Math.ceil(active.find('.bubbles li').length / 20);

        var current = $(this).parent().parent().find('.marcas-content > li.active');

        current.find('.bubbles').data('page',1).trigger('hide');
        current.find('.title').delay(600).fadeOut();
        current.delay(1000).hide(0,function(){ $(this).removeClass('active'); checkMenuPosition();});

        active.delay(1000).queue(function(next){ $(this).addClass('active'); next();}).show(0);
        active.find('.title').hide().delay(1000).fadeIn();
        active.find('.bubbles').delay(1000).show(0).queue(function(next){ bubblesPositioning(true);$(this).trigger('animate'); checkMenuPosition(); next();});

    });

    $('#header .menu li a:not([href])').on('click',function() {
        $(this).parents('#header').removeClass('full');
        var li = $(this).parent();
        var numCurrent = li.parent().find('li').index(li) + 1;
        var el = $('[data-menu="'+numCurrent+'"]');
        if(el != undefined) {
            el.scrollTo();
        }

    });

    $('[href="#contacto"]').on('click',function(e) {
        e.preventDefault();
        e.stopPropagation();
        var modal = $('.modal-contact');
        BrandCaptcha.initAsync("70ce245d7cc4fa2dedf3687517c9d9f10d18a2bd", "captchaContainer");
        modal.fadeIn(300, function() {
          Stretchy.resizeAll();
        });
    });


    $('[href="#login"]').on('click',function(e) {
        e.preventDefault();
        e.stopPropagation();
        var modal = $('.modal-login');
        modal.fadeIn(300);

    });


    $('[href="#privacidad"]').on('click',function(e) {
        e.preventDefault();
        e.stopPropagation();
        var modal = $('.modal-privacy');
        modal.slideDown(300);
    });


    $('.modal-privacy .cerrar').click(function(e){
        e.preventDefault();
        e.stopPropagation();
        $(this).parents('.modal').slideUp(300);
        return true;
    });

    $('.modal .cerrar').click(function(){
        $(this).parents('.modal').fadeOut(300);
    });

    $.each($('select.custom'),function() {
        $(this).selectCustom();
    });

    $('.modal-contact form a').on('click',function() {
        $(this).parents('form').submit();
    });

    $('.modal-contact form input').on('keydown',function() {
        $(this).removeClass('error');
    });

    $('.modal-contact form').on('submit',function(e) {

        var form = $(this);

        e.preventDefault();
        e.stopPropagation();

        if(!form.hasClass('loading')) {

            form.addClass('loading');
            form.find('input').removeClass('error');


            $.ajax({
                url: "contact.ajax",
                data: form.serialize(),
                type: 'POST',
                dataType: 'JSON',
                success: function (response) {
                    form.removeClass('loading');
                    if (!response.result) {
                        $.each(response.error, function (id, input) {
                            if(input=='captcha'){
                                BrandCaptcha.reload();
                                document.getElementById('brand_cap_message').style.display='block';
                                setTimeout(function(){
                                    document.getElementById('brand_cap_message').style.display='none';
                                }, 5000);
                            }else{
                                form.find('[name="' + input + '"]').addClass('error');
                            }
                        });
                    } else {
                        form.css('opacity', 0);
                        form.parent().find('.success').fadeIn(300);
                        form.parents('.modal-contact').find('.cerrar span').html(response.close);
                    }
                }
            });
        }

    });

    $('#signup').hide();
    $('#signup').load(function() {
        $('.loading').hide();

        $('iframe').contents().find("head")
            .append('<link rel="stylesheet" type="text/css" href="/css/signup.css" />');

        $.each($('iframe').contents().find('.row label'),function() {
            var label = $(this).html();
            if(label.indexOf('*') == -1) {
                label = label + ' (opcional)';
            }
            label = label.replace('*','').toLowerCase();
            $(this).parents('.row').find('input, textarea').attr('placeholder',label);
            $(this).parents('.row').find('select option:first-child').html(label);
        });

        $(this).show();
    });

    $(window).bind( 'hashchange', function(e) { checkHash(); });

    checkHash();

    checkAnimation();

    $('.hamburguer').click(function() {
        if($(this).is(':visible')) {
            $(this).parents('#header').toggleClass('full');
        }
    });

    if($(window).width() < 970) {
        $('.slide-home-2 li').css('display','inline-block');

        $('.slide-home-2').on('swipeleft', function (e) {
            $('.slide-home-2 .nextArrow').fadeOut(300);
            $.each($(this).find('ul'), function () {
                var ul = $(this);
                if (parseInt(ul.css('left')) > (ul.find('li').length - 1) * -($(window).width()-40)) {
                    ul.animate({
                        left: "-=100%",
                    }, 200);
                }
            });
        });

        $('.slide-home-2').on('swiperight', function (e) {
            $.each($(this).find('ul'), function () {
                var ul = $(this);
                if (parseInt(ul.css('left')) < 0) {
                    ul.animate({
                        left: "+=100%",
                    }, 200);
                }
            });
        });

        $('.slide-home-5 > div:not(.title)').on('swiperight', function (e) {
            var ul = $(this).find('ul');
            if (parseInt(ul.css('left')) < 0) {
                ul.animate({
                    left: "+=220",
                }, 200);
            }
        });

        $('.slide-home-5 > div:not(.title)').on('swipeleft', function (e) {
            var ul = $(this).find('ul');
            if (parseInt(ul.css('left')) > (ul.find('li').length - 1) * -220) {
                ul.animate({
                    left: "-=220",
                }, 200);
            }
        });

        $('.slide-home-5 > div:not(.title)').on('swiperight', function (e) {
            var ul = $(this).find('ul');
            if (parseInt(ul.css('left')) < 0) {
                ul.animate({
                    left: "+=220",
                }, 200);
            }
        });

        $('.slide-publishers-3 .content').on('swiperight', function (e) {
            var ul = $(this).find('ul');
            $.each(ul, function () {
                if (parseInt($(this).css('left')) < 0) {
                    var numCurrent = $(this).find('li').index($(this).find('li.active').get(0));
                    $(this).find('li.active').removeClass('active');
                    numCurrent--;
                    $(this).find('li:nth-child(' + (numCurrent + 1) + ')').addClass('active');
                    $(this).animate({
                        left: "+=84.2vw",
                    }, 200);
                }
            });
        });


        $('.slide-publishers-3 .content').on('swipeleft', function (e) {
            var ul = $(this).find('ul');
            $.each(ul, function () {
                var width = $(this).find('li:first-child').width();
                if (parseInt($(this).css('left')) > ($(this).find('li').length - 1) * -$(this).find('li:first-child').width()) {
                    var numCurrent = $(this).find('li').index($(this).find('li.active').get(0));
                    $(this).find('li.active').removeClass('active');
                    numCurrent++;
                    $(this).find('li:nth-child(' + (numCurrent + 1) + ')').addClass('active');
                    $(this).animate({
                        left: "-=84.2vw",
                    }, 200);
                }
            });
        });

        $('.slide-advertisers-3').on('swipeleft', function (e) {
            var ul = $(this).find('ul');
            var width = $(this).find('li:first-child').width();
            if (parseInt(ul.css('left')) - width / 2 > (ul.find('li').length - 1) * -width) {
                ul.animate({
                    left: "-=61vw",
                }, 200);
            }
        });

        $('.slide-advertisers-3').on('swiperight', function (e) {
            var ul = $(this).find('ul');
            if (parseInt(ul.css('left')) < 0) {
                ul.animate({
                    left: "+=61vw",
                }, 200);
            }
        });
    }

    $('.bubbles').on('hide',function() {
        $.each($(this).find('li'),function() {
            var timeout = Math.floor((Math.random() * 500) + 0);
            $(this).delay(timeout).animate({
                'opacity': '0',
                'margin-top': -20

            }, 500, "easeOutCubic");
        });
    });

    $('[data-vermas]').click(function() {
        var active = $(this).parents('.bubbles');
        var pages = Math.ceil(active.find('li').length / 20);
        var pageActive = active.data('page') !== undefined ? active.data('page') : 1;

        var nextPage = pageActive+1 <= pages ? pageActive+1 : 1;
        active.data('page',nextPage);
        if(nextPage != pageActive) {
            active.trigger('hide');
            active.delay(500).trigger('animate');
        }
    });

    // init
    var controller = new ScrollMagic.Controller();

    var width = $('body').width();

    var wipeAnimation = new TimelineMax()
            .to('.slide.slide-home-2 .pc .content ul li', 0.5, {top: "-100%", delay:1})
            .to('.slide.slide-home-2 .pc .content ul li', 0.5, {top: "-200%", delay:1})
            // .to('.slide.slide-home-2 .pc .content ul li', 0.5, {top: "-300%", delay:1})
            // .to('.slide.slide-home-2 .pc .content ul li', 0.5, {top: "-400%", delay:1})
            // .to('.slide.slide-home-2 .pc .content ul li', 0.5, {top: "-500%", delay:1})

            .to("#sequenceContainer", 1, {})
    ;


    var wipeAnimation2 = new TimelineMax()
            .to('.slide.slide-home-2 .texts li:first-child', 0.25, {top: "-5%", opacity:0, delay:1})
            .to('.slide.slide-home-2 .texts li:nth-child(2)', 0, {top: "5%", opacity:0, display:"block"})
            .to('.slide.slide-home-2 .texts li:nth-child(2)', 0.25, {top: "-5%", opacity:1})

            .to('.slide.slide-home-2 .texts li:nth-child(2)', 0.25, {top: "-5%", opacity:0, delay:1})
            .to('.slide.slide-home-2 .texts li:nth-child(3)', 0, {top: "5%", opacity:0, display:"block"})
            .to('.slide.slide-home-2 .texts li:nth-child(3)', 0.25, {top: "-5%", opacity:1})

            // .to('.slide.slide-home-2 .texts li:nth-child(3)', 0.25, {top: "-5%", opacity:0, delay:1})
            // .to('.slide.slide-home-2 .texts li:nth-child(4)', 0, {top: "5%", opacity:0, display:"block"})
            // .to('.slide.slide-home-2 .texts li:nth-child(4)', 0.25, {top: "-5%", opacity:1})
            //
            // .to('.slide.slide-home-2 .texts li:nth-child(4)', 0.25, {top: "-5%", opacity:0, delay:1})
            // .to('.slide.slide-home-2 .texts li:nth-child(5)', 0, {top: "5%", opacity:0, display:"block"})
            // .to('.slide.slide-home-2 .texts li:nth-child(5)', 0.25, {top: "-5%", opacity:1})
            //
            // .to('.slide.slide-home-2 .texts li:nth-child(5)', 0.25, {top: "-5%", opacity:0, delay:1})
            // .to('.slide.slide-home-2 .texts li:nth-child(6)', 0, {top: "5%", opacity:0, display:"block"})
            // .to('.slide.slide-home-2 .texts li:nth-child(6)', 0.25, {top: "-5%", opacity:1})
            .to("#sequenceContainer", 1, {})
        ;

    var offset = (width >970) ? 0 : 0;

    var masterTimeline = new TimelineMax();
    masterTimeline.insert(wipeAnimation);
    masterTimeline.insert(wipeAnimation2);


    // create scene to pin and link animation
    scene = new ScrollMagic.Scene({
        triggerElement: "#sequenceContainer",
        triggerHook: "onLeave",
        duration: "300%",
        offset: offset
    })
        .setPin("#sequenceContainer")
        .setTween(masterTimeline);
        //.addIndicators() // add indicators (requires plugin)
        //.addTo(controller);

    scene
        .on('enter', function () {
          $('#sequenceContainer').removeClass('is-left');
        })
        .addTo(masterTimeline);

    scene
        .on('leave', function (event) {
          if (event.scrollDirection == 'FORWARD') {
            $('#sequenceContainer').addClass('is-left');
          } else {
            return;
          }
        })
        .addTo(masterTimeline);

    if($(window).width() > 970) {
        scene.addTo(controller);
    }

    $.each($('#sequenceContainer video'),function() {
        $(this).get(0).play();
    });

    $.each($('.nextArrow'),function() {
        $(this).nextArrowAction();
    });

    $('.metricas li').tooltip({ placement:'top', container:'body'});

    $('a').on('click touchend', function(e) {
        var el = $(this);
        var link = el.attr('href');
        if(link != undefined) {
            window.location = link;
        }
    });

});

function checkHash() {

    var match = location.hash.match(/^#?(.*)$/)[1];
    if (match)
    {
        if(match == 'nosotros' && $('.slide-home-5').length > 0) {
            $('.slide-home-5').scrollTo();
        }
    }

}

function bubblesPositioning(first) {
    $.each($('.bubbles'),function() {
        var count = 0;
        $.each($(this).find('li'), function () {

            if($('body').width() > 970) {

                var cols = 11;
                var rows = 2;

            } else {

                var cols = 5;
                var rows = 4;

            }

            var parentWidth = $(this).parent().removeAttr('style').width();
            var parentHeight = $(this).parent().parent().height();
            var width = parentWidth / cols;

            var heightSpace = width / 10;

            var height = (parentHeight - heightSpace) / (rows +.5);

            var size = (height < width) ? height : width;

            count++;

            var pos = (count % 20 == 0) ? 20 : count%20;

            var row = parseInt((pos - 1) / cols);
            var col = (pos-1) % cols;

            if($('body').width() > 970) {

                if (pos <= 9) {
                    col++;
                } else if (pos > 9 && pos <= 11) {
                    col -= 9;
                    row++;
                } else if (pos > 11) {
                    col += 2;
                }
            }

            var x = col*size;
            var y = row*size + row*heightSpace;

            if($('body').width() > 970) {
                y+=size/2
            }

            if((col+1) % 2 == 1) {
                if($('body').width() > 970) {
                    y -= size / 2;
                } else {
                    y += size / 2;
                }
            }

            var newHeight = size*(rows +.5) + (rows - 1)*heightSpace;
            $(this).parent().css('height',newHeight);
            $(this).parent().css('width',size*cols);
            $(this).parent().css('left',$(this).parent().parent().width()/2 - size*cols/2);

            $(this).css('left', x).css('top', y).css('font-size',size/125);

            if (first) {
                $(this).css('opacity', 0);
                $(this).css('margin-top', '+50px');
            }

        });

        var pages = Math.ceil($(this).find('li').length / 20);
        if(pages > 1) {
            $(this).find('[data-vermas]').stop().fadeIn();
        } else {
            $(this).find('[data-vermas]').stop().fadeOut();
        }
    });

}

$.fn.globoAnimation = function() {
    var el = $(this);
    el.stop();
    el.clearQueue();
    el.removeAttr('style');
    el.animate({
        left: ["+=250", "swing"]
    }, 12000, function() {
        el.animate({
            left: ["-=250", "swing"]
        }, 10000, function() {
            el.globoAnimation();
        });
    });
};

$.fn.globoAnimation2 = function() {
    var el = $(this);
    el.stop();
    el.clearQueue();
    el.removeAttr('style');
    el.animate({
        left: ["-=150", "swing"]
    }, 7000, function() {
        el.animate({
            left: ["+=150", "swing"]
        }, 4000, function() {
            el.globoAnimation2();
        });
    });
};


$.fn.cloudAnimation = function() {
    var el = $(this);
    el.stop();
    el.clearQueue();
    el.removeAttr('style');
    el.animate({
        left: ["+=400", "linear"]
    }, 15000, function() {
        el.animate({
            left: ["-=400", "linear"]
        }, 15000, function() {
            el.cloudAnimation();
        });
    });
};


$.fn.cloudAnimation2 = function() {
    var el = $(this);
    el.stop();
    el.clearQueue();
    el.removeAttr('style');
    el.animate({
        left: ["-=300", "linear"]
    }, 20000, function() {
        el.animate({
            left: ["+=300", "linear"]
        }, 20000, function() {
            el.cloudAnimation2();
        });
    });
};


$.fn.cloudAnimation3 = function() {
    var el = $(this);
    el.stop();
    el.clearQueue();
    el.removeAttr('style');
    el.animate({
        left: ["+=400", "linear"]
    }, 20000, function() {
        el.animate({
            left: ["-=400", "linear"]
        }, 20000, function() {
            el.cloudAnimation3();
        });
    });
};

$.fn.cloudAnimation4 = function() {
    var el = $(this);
    el.stop();
    el.clearQueue();
    el.removeAttr('style');
    el.animate({
        left: ["-=400", "linear"]
    }, 50000, function() {
        el.animate({
            left: ["+=400", "linear"]
        }, 50000, function() {
            el.cloudAnimation4();
        });
    });
};

$.fn.planeAnimation = function() {
    var el = $(this);
    el.stop();
    el.animate({
        left: ["+="+$(window).width()*2, "linear"]
    }, {
        step: function( now, fx ) {
            if(parseInt($(this).css('left')) > $(window).width()) {
                $(this).css('left','-300px');
                $(this).planeAnimation();
            }
        },
        duration: 50000
    });
}

function isMainVisibleElement(elem) {
    var $elem = $(elem);

    // Get the scroll position of the page.
    var scrollElem = ((navigator.userAgent.toLowerCase().indexOf('webkit') != -1) ? 'body' : 'html');
    var viewportTop = $(scrollElem).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    // Get the position of the element on the page.
    var elemTop = Math.round( $elem.offset().top );
    var elemBottom = elemTop + $elem.height();

    var visiblePoint = $(window).height()/2;

    return ((elemTop + visiblePoint < viewportBottom) && (elemBottom - visiblePoint > viewportTop));


}

function isElementInViewport(elem) {
    var $elem = $(elem);

    var headerOffset = 0;
    if($(window).width > 970) {
        headerOffset = $('#header').outerHeight();
    }

    // Get the scroll position of the page.
    var scrollElem = ((navigator.userAgent.toLowerCase().indexOf('webkit') != -1) ? 'body' : 'html');
    var viewportTop = $(scrollElem).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    // Get the position of the element on the page.
    if ($elem.size()>0){
        var elemTop = Math.round( $elem.offset().top );
        var elemBottom = elemTop + $elem.height();
    }else {
        var elemTop = 0;
        var elemBottom = elemTop;
    }

    var margin = $(window).height()*.2;
    if(elemTop < $(window).height()) {
        margin = 0;
    }

    //$('body').append('<div style="height:1px; width:100%; position:fixed; background-color:#F00; left:0; bottom: '+(margin - headerOffset)+'px;"></div>');

    return ((elemTop + margin + headerOffset < viewportBottom) && (elemBottom - margin - headerOffset > viewportTop));
}

function checkCurrentSlide(st) {

}

// Check if it's time to start the animation.
function checkAnimation() {

    $.each($('.animated-block'),function(i, el) {
        if (isElementInViewport($(this)) || $(this).hasClass('onload')) {
            if(!$(this).hasClass('start')) {
                $(this).addClass('start');
                $.each($(this).find('.animated'),function() {
                    $(this).addClass('start').trigger('animate');
                });
            }
        }
    });

    $.each($('.animated'),function(i, el) {
        if (isElementInViewport($(this)) || $(this).hasClass('onload')) {
            if(!$(this).hasClass('start')) {
                // Start the animation
                $(this).addClass('start');
                $(this).trigger('animate');

                //Animo los hijos
                $.each($(this).find('.animated'),function() {
                    $(this).addClass('start').trigger('animate');
                });
            }
        }
    });
}

function checkMenuPosition(st){
    var menu = $('#header .menu');
    menu.find('li').removeClass('active');
    $.each($('[data-menu]:visible'),function() {
        var opt = $(this).data('menu');
        if(isMainVisibleElement($(this))) {
            menu.find('li:nth-child('+opt+')').addClass('active');
        }
    });

}

$.fn.selectCustom = function() {
    var el = $(this);
    var labelDefault = '';

    $.each(el.find('option'),function() {
        var option = $(this);
        if (option.prop('selected') == true) {
            labelDefault = $(this).html();
        }
    });

    var label = $('<label tabindex="3">');
    label.html(labelDefault);

    //var label = $('<label>');
    var list = $('<ul>').css('display','none');
    var span = $('<span>').append(label).addClass('select').on('click keypress',function(e) {
        e.preventDefault();
        e.stopPropagation();
        el.parents('.modal').find('.hover').fadeIn(200);
        list.fadeIn(200);
    });
    if(el.hasClass('big')) {
        list.addClass('big');
    }
    $.each(el.find('option'),function() {
        var option = $(this);
        var li = $('<li>').html($(this).html()).on('click',function(e) {
            e.preventDefault();
            e.stopPropagation();

            var val = $(this).html();

            el.parents('.modal').find('.hover').fadeOut(200);

            list.fadeOut(200,function() {

                option.prop('selected',true);
                label.html(val);
                span.addClass('selected');
            });
        });
        list.append(li);
    });
    el.parents('.modal').find('.hover').on('click',function() {
        list.fadeOut(200);
        $(this).fadeOut(200);
    });
    span.append(list);

    el.after(span);

    el.hide();
};

$.fn.scrollTo = function() {

    var el = $(this);

    var top = el.offset().top;

    var headerOffset = 0;
    if($('body').width() > 970) {
        headerOffset = 0;
    }
    if(el.parents('.slide').length > 0) {
        top = el.parents('.slide').offset().top;
    }
    if(!el.is(':visible')) {
        el.trigger('show');
    }

    scrollTo(top - headerOffset);
};

function scrollTo(top) {

    $('body,html').stop().animate({scrollTop: top}, '500', 'swing');
    prevSt = top;
}

$.fn.nextArrowAction = function() {
    var arrow = $(this);

    var tl = new TimelineMax({repeat:-1});

    tl.to(arrow, 0, { bottom:"40px", opacity:0})
        .to(arrow,2, { bottom:"-10px", ease:Linear.easeNone})
        .to(arrow,0.8, { opacity:1},0)
        .to(arrow,0.8, { opacity:0},1.2);

        arrow.click(function () {
            if($(window).width() > 970) {
                if (arrow.parents('#sequenceContainer').length > 0) {
                    var num = Math.floor(scene.progress() * 8.5 / 1.5) + 1;
                    num = num > 0 ? num : 1;
                    num++;
                    if (num < 6) {
                        var startPos = scene.scrollOffset() + scene.duration() / 8.5 * num * 1.6;
                        scrollTo(startPos);
                    } else {
                        $(this).parents('.scrollmagic-pin-spacer').next().find('.slide').scrollTo();

                    }
                } else {
                    arrow.parents('.slide').next().scrollTo();
                }
                ;
            }
        });

};

function Bird(x, y, vx, vy, speed, size, color) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.svx = vx;
    this.vy = vy;
    this.svy = vy;
    this.speed = speed;
    this.size = size;
    this.color = color;
    this.reset = false;
    this.yoffset = Math.random() * (this.size / 4) - this.size / 8;
}
Bird.prototype = {
    constructor: Bird,
    update: function (height, width) {
        this.x += this.vx;
        this.y += this.vy;
        if (this.reset) {
            this.vx = this.svx;
            this.vy = this.svy;
            this.reset = false;
        }
        if (mx && my) {
            var dx = mx - this.x,
                dy = my - this.y,
                d = Math.sqrt(dx * dx + dy * dy),
                a = Math.atan2(dy, dx);
            var speed = d / 100;
            this.vx = Math.cos(a + (Math.random() * 2 - 1)) * (speed + this.svx);
            this.vy = Math.sin(a + (Math.random() * 2 - 1)) * (speed + this.svy);
        } else {
            // this is ugly.. i'll be doing something else with the checks later.
            if (this.x - this.size / 2 - this.yoffset / 2 < 0) {
                this.vx *= -1;
            }
            if (this.x + this.size / 2 + this.yoffset / 2 > width) {
                this.vx *= -1;
            }
            if (this.y - this.size / 5 + this.yoffset < 0) {
                this.vy *= -1;
            }
            if (this.y - this.size / 5 + this.yoffset > height) {
                this.vy *= -1;
            }
        }
        this.yoffset += this.speed;

        if (Math.abs(this.yoffset) > this.size / 8) {
            this.speed *= -1;
        }
    },
    render: function (context) {
        context.beginPath();
        context.strokeStyle = this.color;
        context.moveTo(this.x, this.y);
        context.quadraticCurveTo(this.x - this.size / 4, this.y - this.size / 5 + this.yoffset, this.x - this.size / 2 - this.yoffset / 2, this.y + this.yoffset);
        context.stroke();
        context.moveTo(this.x, this.y);
        context.quadraticCurveTo(this.x + this.size / 4, this.y - this.size / 5 + this.yoffset, this.x + this.size / 2 + this.yoffset / 2, this.y + this.yoffset);
        context.stroke();
        context.closePath();
    }
};

$(document).ready(function() {
    if($('#canvas').size()) {
        var canvas = document.getElementById('canvas'),
        context = canvas.getContext('2d'),
        height, width, xm, my, birds;
        setTimeout(init, 10);
    }


    function init() {
        height = canvas.height = canvas.parentNode.offsetHeight;
        width = canvas.width = canvas.parentNode.offsetWidth;
        mx = null;
        my = null;
        birds = [];
      for (var i = 0; i < 10; i++) {
            var x = Math.random() * width,
                y = Math.random() * height,
                vx = Math.random() * 2 - 1,
                vy = Math.random() * 2 - 1,
                size = Math.random() * 9 + 17,
                speed = size / 40,
                color = 'rgba('+~~(Math.random()*90)+','+~~(Math.random()*90)+','+~~(Math.random()*90)+',.5)';
            var bird = new Bird(x, y, vx, vy, speed, size, color);
            birds.push(bird);
        }

        update();
        render();
        // canvas.addEventListener('mousedown', function (e) {
        //     listen(e);
        //     canvas.addEventListener('mousemove', listen, false);
        // }, false);
        // canvas.addEventListener('mouseup', function () {
        //     canvas.removeEventListener('mousemove', listen, false);
        //     mx = null;
        //     my = null;
        //     for (var i = 0, l = birds.length; i < l; i++) {
        //         birds[i].reset = true;
        //     }
        // }, false);
    }

    function listen(e) {
        mx = e.clientX;
        my = e.clientY;

    }

    function update() {
        for (var i = 0, l = birds.length; i < l; i++) {
            birds[i].update(height, width);
        }
        setTimeout(update, 1000 / 30);
    }

    function render() {
        context.clearRect(0, 0, width, height);
        for (var i = 0, l = birds.length; i < l; i++) {
            birds[i].render(context);
        }
        requestAnimationFrame(render);
    }
});

// Check element visibility for Advertisers animated illustration
$(document).ready(function() {
  var shouldAnimate = true;

  var animateDialog = function() {
    if (shouldAnimate) {
      var dialog = new TimelineMax();

      dialog
        .staggerFromTo('.bubble-1', .25,
          {opacity: 0, scale: .5, transformOrigin: '50% 50%', ease: Back.easeIn},
          {opacity: 1, scale: 1, transformOrigin: '50% 50%', ease: Back.easeIn},
          0.15)
        .staggerFromTo('.bubble-2', .25,
          {opacity: 0, scale: .5, transformOrigin: '50% 50%', ease: Back.easeIn},
          {opacity: 1, scale: 1, transformOrigin: '50% 50%', ease: Back.easeIn},
          0.15)
        .staggerFromTo('.bubble-3', .25,
          {opacity: 0, scale: .5, transformOrigin: '50% 50%', ease: Back.easeIn},
          {opacity: 1, scale: 1, transformOrigin: '50% 50%', ease: Back.easeIn},
          0.15)
        .staggerFromTo('.bubble-4', .4,
          {opacity: 0, scale: .5, transformOrigin: '50% 50%', ease: Back.easeIn},
          {opacity: 1, scale: 1, transformOrigin: '50% 50%', ease: Back.easeIn},
          0.15);

      shouldAnimate = false;
    } else {
      return;
    }
  };

  $(window).on('scroll', function() {
    if (isElementInViewport($('.animate-dialog'))) {
      setTimeout(function() {
        animateDialog();
      }, 500);
    }
  });
});

$(document).ready(function() {
  $('.marcas-mobile li').on('click', function() {
    var target = $(this).attr('data-target');

    $('.marcas-mobile li').removeClass('active');
    $(this).addClass('active');

    $('.marcas-slider ul.active').fadeOut(500);
    setTimeout(function() {
      $('.marcas-slider ul.active').removeClass('active')
      $('.marcas-slider ul#' + target).fadeIn(500).addClass('active');
    }, 500);
  });
});
