const Tetrimino = require('./tetrimino.js');
const Coord = require('./coord.js');


class Board {
  constructor(height = 20, width = 10){
    this.height = height;
    this.width = width;
  }

  setupGrid(height, width) {
    const grid = [];
    for (var i = 0; i < width ; i++) {
      const row = [];
      for (var j = 0; j < height; j++) {
        row.push(Board.BLANK_SYMBOL);
      }
      grid.push(row);
    }
    return grid;
  }

  render() {
    const grid = Board.setupGrid(this.height, this.width);

  }

  validPosition(coord){
    return (coord.i >= 0) && (coord.i < this.width) &&
      (coord.j >= 0) && (coord.j < this.height);
  }
}

Board.BLANK_SYMBOL = ".";

module.exports = Board;
