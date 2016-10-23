const Piece = require('./piece.js');
const Coord = require('./coord.js');


class Board {
  constructor(height = 20, width = 10){
    this.height = height;
    this.width = width;
  }

  setupGrid(height, width) {
    const grid = [];
    for (var i = 0; i < height ; i++) {
      const row = [];
      for (var j = 0; j < width; j++) {
        row.push(Board.BLANK_SYMBOL);
      }
      grid.push(row);
    }
    return grid;
  }


}

Board.BLANK_SYMBOL = ".";

module.exports = Board;
