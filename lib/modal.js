const $overlay = $('<div id="overlay"></div>');
const $modal = $('<div id="modal"></div>');
const $play = $('<button id="play" href="#">Play</a>');

const $instructions = $('<div id="instructions"><div>');
const $instructionsTitle = $('<h1 id="instructions-title">Instructions</h1>');
const $moveUp = $('<div class="key-instruction-ctn"><p class="arrow up">&#x2B05</p><p class="rotatetext">Rotate</p><div>');
const $moveLeft = $('<div class="key-instruction-ctn"><p class="arrow right">&#x2B05</p><p right-text>Move Right</p></div>');
const $moveRight = $('<div class="key-instruction-ctn"><p class="arrow down">&#x2B05</p><p down-text>Move Down</p></div>');
const $moveDown = $('<div class="key-instruction-ctn"><p class="arrow left">&#x2B05</p><p left-text>Move Left</p></div>');


$modal.hide();
$overlay.hide();
$instructions.append($instructionsTitle, $moveUp, $moveLeft, $moveRight, $moveDown);
$modal.append($play, $instructions);

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
        $instructions,
        $play,
        $instructionsTitle,
        $moveUp,
        $moveLeft,
        $moveRight,
        $moveDown
      };
