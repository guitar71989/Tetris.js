const Coord = require('./coord.js');

const PIECE_TYPE = [
  "I",
  "L",
  "J",
  "O",
  "S",
  "T",
  "Z",
];

const SHAPES = [
  ["I",
    [ new Coord([2,5], "red"),
      new Coord([1, 5], "red"),
      new Coord([0, 5], "red"),
      new Coord([3, 5],"red")],
      "red"
    ],

  ["L",
    [ new Coord([1,4], "purple"),
    new Coord([0, 5], "purple"),
    new Coord([0, 4], "purple"),
    new Coord([2, 4],"purple")],
    "purple"
  ],

  ["J",
    [ new Coord([1,5], "blue"),
    new Coord([0, 5], "blue"),
    new Coord([0, 4], "blue"),
    new Coord([2, 5],"blue")],
    "blue"
  ],

  ["O",
    [ new Coord([0,4], "yellow"),
    new Coord([0, 5], "yellow"),
    new Coord([1, 4], "yellow"),
    new Coord([1, 5],"yellow")],
    "yellow"
  ],

  ["S",
    [ new Coord([1,5], "orange"),
      new Coord([1, 4], "orange"),
      new Coord([0, 5], "orange"),
      new Coord([0, 6],"orange")],
      "orange"
    ],

  ["T",
    [ new Coord([1,5], "green"),
    new Coord([1, 4], "green"),
    new Coord([0, 5], "green"),
    new Coord([2, 5],"green")],
    "green"
  ],

  ["Z",
    [ new Coord([0,5], "grey"),
    new Coord([1, 5], "grey"),
    new Coord([0, 4], "grey"),
    new Coord([1, 6],"grey")],
    "grey"
  ],
];

const MOVES = {
  LEFT: "left",
  RIGHT: "right",
  DOWN: "down",
  ROTATE: "rotate"
};



class Piece {
  constructor () {
    this.randPiece = SHAPES[Math.floor(Math.random() * SHAPES.length)];
    this.pieceType = this.randPiece[0];
    this.pieceCoords = this.randPiece[1];
    this.pieceColor = this.randPiece[2];
    this.validMove.bind(this);
  }

  pieceOrigin(){
    return this.pieceCoords[0];
  }

  occupyCells(){
    this.pieceCoords.forEach( (coord) => {
      coord.occupyCell();
    });
  }

  unoccupyCells(){
    this.pieceCoords.forEach( (coord) => {
      coord.unoccupyCell();
    });
  }

  move(direction){
    let newCoords;
    let relativeVectors;
    let rotatedVectors;
    let finalVectors;

    switch (direction) {
      case MOVES.LEFT: {
        newCoords = this.pieceCoords.map(
          (coord) => new Coord([coord.y, coord.x - 1], coord.color)
        );
        break;
      }
      case MOVES.RIGHT: {
        newCoords = this.pieceCoords.map(
         (coord) => new Coord([coord.y, coord.x + 1], coord.color)
       );
       break;
      }
      case MOVES.DOWN: {
        newCoords = this.pieceCoords.map(
         (coord) => new Coord([coord.y + 1, coord.x], coord.color)
       );
       break;
     }
     case MOVES.ROTATE: {
       if (this.pieceType === "O") {
         break;
       } else {
         relativeVectors = this.pieceCoords.map(
           (coord) => ([(coord.y - this.pieceOrigin().y), (coord.x - this.pieceOrigin().x)])
         );

         rotatedVectors = relativeVectors.map(
           (vector) => ([(0*vector[0] + -1*vector[1]), (1*vector[0] + 0*vector[1])])
         );

         newCoords = rotatedVectors.map(
           (vector) => new Coord([ (vector[0] + this.pieceOrigin().y), (vector[1] + this.pieceOrigin().x) ], this.pieceColor)
         );
         break;
       }
     }
      default:
    }

    newCoords = newCoords || this.pieceCoords;

    const validMove = this.validMove(newCoords);

    if(validMove) {
      this.unoccupyCells();
      this.pieceCoords = newCoords;
      this.occupyCells();
    }
    return validMove;
  }

  validMove(newCoords) {
    let valid = true;

    const nonOverlappingCoords = newCoords.filter( (coord) => {
      for (var i = 0; i < this.pieceCoords.length; i++) {
        if (this.pieceCoords[i].equals(coord)) {
          return false;
        }

      }
      return true;
    });

    nonOverlappingCoords.forEach( (coord) => {
      if (!coord.empty() || !coord.inBounds()) {
          valid = false;
          return valid;
        }
    });

    return valid;
  }

  occupyPreview() {
    this.pieceCoords.forEach( (coord) => {
      coord.occupyPreview();
    });
  }

  unoccupyPreview() {
    this.pieceCoords.forEach( (coord) => {
      coord.unoccupyPreview();
    });
  }


  occupyHold() {
    this.unoccupyCells();

    this.pieceCoords = SHAPES[PIECE_TYPE.indexOf(this.pieceType)][1];
    this.pieceCoords.forEach( (coord) => {
      coord.occupyHold();
    });
  }

  unoccupyHold() {
    const defaultCoords = SHAPES[PIECE_TYPE.indexOf(this.pieceType)][1];
    this.pieceCoords.forEach( (coord) => {
      coord.unoccupyHold();
    });
  }


}

module.exports = Piece;
