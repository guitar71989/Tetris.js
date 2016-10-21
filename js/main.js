const View = require('./tetris-view.js');
const Piece = require('./../lib/piece.js');

window.Piece = Piece;

$( () => {
  const rootEl = $('.tetris-game');
  new View(rootEl);

});
