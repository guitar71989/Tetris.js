const $overlay = $('<div id="gameoveroverlay"></div>');
const $modal = $('<div id="gameovermodal"></div>');
const $play = $('');

const $pic = ('<div id="graphic"><img width="100%"  height="100%" src="./assets/game_over.gif" controls="controls"> </img><button id="playagain" href="#">Click here to play again</a></div>');

$modal.hide();
$overlay.hide();
$modal.append($play, $pic);

var modal = (function(){
  var method = {};

  method.center =  function () {
    var top, left;

    top = 200;
    left = Math.max($(window).width() - $modal.outerWidth(), 0) / 2;

    $modal.css({
      top:top + $(window).scrollTop(),
      left:left + $(window).scrollLeft()
    });
  };

  method.open = function () {
    method.center();
    $(window).bind('resize.modal', method.center);
    $modal.show();
    $overlay.show();
  };

  method.close = function () {
    $modal.hide();
    $overlay.hide();
  };

  return method;
}());


module.exports = { modal,
        $modal,
        $overlay,
        $play,
        $pic
      };
