// Preloader animation
var animateLoader = function() {
  var loader = new TimelineMax({ repeat: -1, yoyo: true });

  loader
    .staggerTo('.preloader-layer', .15, {opacity: 1, delay: 1, ease: Back.easeIn}, 0.15)
    .to('#layer-9', .25, {delay: 0.25, scale: 1.15, transformOrigin: '50% 50%', ease: Back.easeIn})
    .to('#layer-9', .25, {scale: 1, transformOrigin: '50% 50%', ease: Back.easeIn});
};

var fadeOutLoader = function() {
  $('.preloader').fadeOut(500);
  var video = document.getElementById('homeVideo');
  if(video){
	  $(video).get(0).play();
  }
};

$(document).ready(animateLoader);

$(document).ready(function() {
  var video = document.getElementById('homeVideo');

  if ($(video).size() > 0 && video.readyState === 4) {
    fadeOutLoader();
  } else {
    setTimeout(fadeOutLoader, 4000);
  }
});
