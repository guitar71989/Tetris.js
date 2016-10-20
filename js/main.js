const View = require('./tetris-view.js');

$( () => {
  const rootEl = $('.tetris-game');
  new View(rootEl);
});
