/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const View = __webpack_require__(1);
	const Piece = __webpack_require__(5);
	
	window.Piece = Piece;
	
	$( () => {
	  const rootEl = $('.tetris-game');
	  new View(rootEl);
	
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Board = __webpack_require__(2);
	const Piece = __webpack_require__(5);
	
	
	class View {
	  constructor($el) {
	    this.$el = $el;
	    this.board = new Board;
	    this.setupGrid();
	
	    const currentPiece = new Piece;
	    window.currentPiece = currentPiece;
	
	    window.setInterval(currentPiece.gravity, 500);
	
	    $(window).keydown(function (e) {
	       if (e.keyCode === 37) {
	           e.preventDefault();
	           currentPiece.move('left');
	       } else if (e.keyCode === 39) {
	           e.preventDefault();
	           currentPiece.move('right');
	       }
	     }
	   );}
	
	
	  setupGrid() {
	    let html = "";
	
	    for (let i = 0; i < this.board.height; i++) {
	      html += `<ul data=${i} >`;
	      for (var j = 0; j < this.board.width; j++) {
	        html += `<li empty=${true} data=${j}></li>`;
	      }
	      html += "</ul>";
	    }
	
	    this.$el.html(html);
	    this.$li = this.$el.find("li");
	
	  }
	
	
	
	}
	
	module.exports = View;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Piece = __webpack_require__(5);
	const Coord = __webpack_require__(4);
	
	
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


/***/ },
/* 3 */,
/* 4 */
/***/ function(module, exports) {

	class Coord {
	  constructor(i, j) {
	    this.i = i;
	    this.j = j;
	  }
	
	  equals(coord2) {
	      return (this.i == coord2.i) && (this.j == coord2.j);
	  }
	
	  isOpposite(coord2) {
	    return (this.i == (-1 * coord2.i)) && (this.j == (-1 * coord2.j));
	  }
	
	  plus(coord2) {
	    return new Coord(this.i + coord2.i, this.j + coord2.j);
	  }
	}
	
	module.exports = Coord;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	const Coord = __webpack_require__(4);
	
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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map