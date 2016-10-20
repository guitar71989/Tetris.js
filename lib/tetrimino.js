const Coord = require('./coord.js');

const MOVES = {
  LEFT: "left",
  RIGHT: "right",
  DOWN: "down",
  ROTATE_LEFT: "rotate_left"
};

class Tetrimino {
  constructor (board) {
    this.board = board.getBoard;
    this.set = false;
    this.color = null;
    this.coords = [];
  }

  move(direction){
    switch(direction){
      case MOVES.RIGHT:
        }
    }
}

module.exports = Tetrimino;
