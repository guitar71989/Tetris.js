const View = require('./tetris-view.js');
const Piece = require('./../lib/piece.js');
const Modal = require('./../lib/modal.js');


$( () => {
  const $pause = $('pause-btn');
  $pause.hide();

  const rootEl = $('.tetris-board');

  $('body').append(Modal.$overlay, Modal.$modal);

  Modal.modal.open();

  $('#play').click(function () {
    Modal.modal.close();
    newGame.startGame();
  });
  const newGame = new View(rootEl);


});
