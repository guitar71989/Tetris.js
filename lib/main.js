const $cinnaDOM = require('./../cinnaDOM/lib/main');
const View = require('./tetris-view.js');
const Piece = require('./piece.js');

$cinnaDOM( () => {
  const $pause = $cinnaDOM('pause-btn');
  $pause.hide();


  const $gameoverOverlay = $cinnaDOM('div#gameoveroverlay');
  const $gameoverModal = $cinnaDOM('div#gameovermodal');

  $gameoverOverlay.hide();
  $gameoverModal.hide();

  const $overlay = $cinnaDOM('div#overlay');
  const $modal = $cinnaDOM('div#modal');

  const rootEl = $cinnaDOM('.tetris-board');

  $cinnaDOM('#play').on('click', function () {
    $overlay.hide();
    $modal.hide();
    newGame.startGame();
  });

  const newGame = new View(rootEl);
});
