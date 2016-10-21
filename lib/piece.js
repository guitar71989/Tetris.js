const Coord = require('./coord.js');

const SHAPES = [
  ["I", [[0,5], [1, 5], [2, 5], [3, 5]], "red"],
  ["J", [[0,4], [0, 5], [1, 4], [1,5]], "yellow"],
  ["L", [[0,4], [0, 5], [1, 5], [2,5]], "purple"],
  ["O", [[0,4], [0, 5], [1, 4], [1,5]], "blue"],
  ["S", [[0,5], [1, 5], [1, 4], [2, 4]], "orange"],
  ["T", [[0,5], [1, 4], [1, 5], [2,5]], "green"],
  ["Z", [[0,4], [0, 5], [1, 5], [1,6]], "grey"],
];

const MOVES = {
  LEFT: "left",
  RIGHT: "right",
  DOWN: "down",
  ROTATE_LEFT: "rotate_left"
};



class Piece {
  constructor () {
    this.randPiece = SHAPES[Math.floor(Math.random() * SHAPES.length)];
    this.pieceColor = this.randPiece[2];
    this.pieceCoords = this.randPiece[1];
    this.occupyCell = this.occupyCell.bind(this);
    this.occupyCells();
  }

  occupyCells(){
    this.pieceCoords.forEach( (coord) => {
      this.occupyCell(coord);
    });
  }

  gravity(){
    if (this.currentPiece.move("down")) {
      // window.currentPiece.move("down");
    } else {
      this.currentPiece = new Piece();
      window.currentPiece = this.currentPiece;
    }
  }

  occupyCell(coord) {
    $(`ul[data=${coord[0]}] li[data=${coord[1]}]`)
      .addClass(`${this.pieceColor}`);
    $(`ul[data=${coord[0]}] li[data=${coord[1]}]`)
      .attr('empty', 'false');
  }

  unoccupyCells(){
    this.pieceCoords.forEach( (coord) => {
      this.unoccupyCell(coord);
    });
  }

  unoccupyCell(coord) {
    $(`ul[data=${coord[0]}] li[data=${coord[1]}]`)
      .removeClass(`${this.pieceColor}`);
    $(`ul[data=${coord[0]}] li[data=${coord[1]}]`)
      .attr('empty', 'true');
  }


  move(direction){
    let newCoords;

    switch (direction) {
      case MOVES.LEFT: {
        newCoords = this.pieceCoords.map(
          (coord) => ([coord[0], (coord[1] - 1)])
        );
        break;
      }
      case MOVES.RIGHT: {
        newCoords = this.pieceCoords.map(
         (coord) => ([coord[0], (coord[1] + 1)])
       );
       break;
      }
      case MOVES.DOWN: {
        newCoords = this.pieceCoords.map(
         (coord) => ([coord[0] + 1, (coord[1])])
       );
       break;
     }
      default:
    }
    const validMove = this.validMove(this.pieceCoords, newCoords);

    if(validMove) {
      this.unoccupyCells();
      this.pieceCoords = newCoords;
      this.occupyCells();
    }
    return validMove;
  }

  validMove(oldCoords, newCoords) {
    let valid = true;

    const oldCoordsStringify = oldCoords.map( (coord) => {
      return JSON.stringify(coord);
    });


      const filteredCoords = newCoords.filter( (coord) => {
        return !oldCoordsStringify.includes(JSON.stringify(coord));
      });


    filteredCoords.forEach( (coord) => {
      if (($(`ul[data=${coord[0]}] li[data=${coord[1]}]`).attr('empty') !== "true")
        || coord[1] < 0
          || coord[1] > 9) {
          valid = false;
          return valid;
        }
    });
    return valid;
  }

}

module.exports = Piece;
