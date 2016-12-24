$(document).ready(function() {
  (function() {
    var TAU = Math.PI * 2;
    var density = 1;
    var speed = 1;
    var res = 0.005; // percentage of screen per x segment
    var outerScale = 0.025 / density;
    var inc = 0;

    var c = document.getElementById('waveOne');
    var ctx = c.getContext('2d');

    // var grad = ctx.createLinearGradient(0, 0, 0, c.height * 4);
    // grad.addColorStop(0, 'rgba(223, 191, 32, 1)');
    // grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    function onResize() {
      $('.slide-advertisers-6 #waveOne').attr({
        width: $('.slide-advertisers-6').outerWidth() + "px",
        height: $('.slide-advertisers-6').outerHeight() + "px"
      });
    }

    $(window).resize(onResize);

    $(document).ready(function() {
      onResize();
      loop();
    });

    function loop() {
      inc -= speed;
      drawWave();
      requestAnimationFrame(loop);
    }

    function drawWave() {
      var w = c.offsetWidth;
      var h = c.offsetHeight;
      var cx = w * 0.5;
      var cy = h * 0.8;
      ctx.clearRect(0, 0, w, h);
      var segmentWidth = w * res;
      ctx.fillStyle = '#71bf48';
      ctx.beginPath();
      ctx.moveTo(0, cy);
      for (var i = 0, endi = 1 / res; i <= endi; i++) {
        var _y = cy + Math.sin((i + inc) * TAU * res * density) * cy * Math.sin(i * TAU * res * density * outerScale);
        var _x = i * segmentWidth;
        ctx.lineTo(_x, _y);
      }
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      ctx.fill();
    }
  })();

  (function() {
    var TAU = Math.PI * 2;
    var density = 1;
    var speed = 0.75;
    var res = 0.005; // percentage of screen per x segment
    var outerScale = 0.025 / density;
    var inc = 0;

    var c = document.getElementById('waveTwo');
    var ctx = c.getContext('2d');

    // var grad = ctx.createLinearGradient(0, 0, 0, c.height * 4);
    // grad.addColorStop(0, 'rgba(223, 191, 32, 1)');
    // grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    function onResize() {
      $('.slide-advertisers-6 #waveTwo').attr({
        width: $('.slide-advertisers-6').outerWidth() + "px",
        height: $('.slide-advertisers-6').outerHeight() + "px"
      });
    }

    $(window).resize(onResize);

    $(document).ready(function() {
      onResize();
      loop2();
    });

    function loop2() {
      inc -= speed;
      drawWave();
      requestAnimationFrame(loop2);
    }

    function drawWave() {
      var w = c.offsetWidth;
      var h = c.offsetHeight;
      var cx = w * 0.5;
      var cy = h * 0.8;
      ctx.clearRect(0, 0, w, h);
      var segmentWidth = w * res;
      ctx.fillStyle = '#ACD03C';
      ctx.beginPath();
      ctx.moveTo(0, cy);
      for (var i = 0, endi = 1 / res; i <= endi; i++) {
        var _y = cy + Math.sin((i + inc) * TAU * res * density) * cy * Math.sin(i * TAU * res * density * outerScale);
        var _x = i * segmentWidth;
        ctx.lineTo(_x, _y);
      }
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      ctx.fill();
    }
  })();
});
