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
	
	const $overlay = $('<div id="overlay"></div>');
	const $modal = $('<div id="modal"></div>');
	const $play = $('<button id="play" href="#">Play</a>');
	
	const $instructions = $('<div id="instructions"><div>');
	const $instructionsTitle = $('<h1 id="instructions-title">Instructions</h1>');
	const $moveUp = $('<div class="key-instruction-ctn"><p class="arrow up">&#x2B05</p><p class="rotatetext">Rotate</p><div>');
	const $moveLeft = $('<div class="key-instruction-ctn"><p class="arrow right">&#x2B05</p><p right-text>Move Right</p></div>');
	const $moveRight = $('<div class="key-instruction-ctn"><p class="arrow down">&#x2B05</p><p down-text>Move Down</p></div>');
	const $moveDown = $('<div class="key-instruction-ctn"><p class="arrow left">&#x2B05</p><p left-text>Move Left</p></div>');
	
	
	$modal.hide();
	$overlay.hide();
	$instructions.append($instructionsTitle, $moveUp, $moveLeft, $moveRight, $moveDown);
	$modal.append($play, $instructions);
	
	var modal = (function(){
	  var method = {};
	
	  method.center =  function () {
	    var top, left;
	
	    top = 200;
	    left = Math.max($(window).width() - $modal.outerWidth(), 0) / 2;
	
	    $modal.css({
	      top:top + $(window).scrollTop(),
	      left:left + $(window).scrollLeft()
	    });
	  };
	
	  method.open = function () {
	    method.center();
	    $(window).bind('resize.modal', method.center);
	    $modal.show();
	    $overlay.show();
	  };
	
	  method.close = function () {
	    $modal.hide();
	    $overlay.hide();
	  };
	
	  return method;
	}());
	
	
	
	$( () => {
	  const rootEl = $('.tetris-game');
	
	  $('body').append($overlay, $modal);
	  modal.open();
	
	  $('#play').click(function () {
	    modal.close();
	    newGame.startGame();
	  });
	
	  const newGame = new View(rootEl);
	
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
	
	
	}
	
	
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
	
	  startGame() {
	    const currentPiece = new Piece;
	    window.currentPiece = currentPiece;
	
	    window.setInterval(this.gravity, 500);
	
	    $(window).keydown(function (e) {
	       if (e.keyCode === 37) {
	           e.preventDefault();
	           window.currentPiece.move('left');
	       } else if (e.keyCode === 39) {
	           e.preventDefault();
	           window.currentPiece.move('right');
	       } else if (e.keyCode === 38) {
	            e.preventDefault();
	            window.currentPiece.move('rotate');
	        } else if (e.keyCode === 40) {
	            e.preventDefault();
	            window.currentPiece.move('down');
	       }
	     }
	   );
	  }
	
	  gravity(){
	    if (window.currentPiece.move("down")) {
	      // window.currentPiece.move("down");
	    } else {
	      this.currentPiece = new Piece();
	      window.currentPiece = this.currentPiece;
	    }
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
	
	const PIECE_TYPE = {
	  I: "I",
	  J: "J",
	  L: "L",
	  O: "O",
	  S: "S",
	  T: "T",
	  Z: "Z",
	};
	
	const SHAPES = [
	  ["I", [[2,5], [1, 5], [0, 5], [3, 5]], "red"],
	  ["L", [[1,4], [0, 5], [0, 4], [2,4]], "purple"],
	  ["J", [[1,5], [0, 5], [0, 4], [2,5]], "blue"],
	  ["O", [[0,4], [0, 5], [1, 4], [1,5]], "yellow"],
	  ["S", [[1,5], [0, 5], [1, 4], [2, 4]], "orange"],
	  ["T", [[1,5], [1, 4], [0, 5], [2,5]], "green"],
	  ["Z", [[0,5], [1, 5], [0, 4], [1,6]], "grey"],
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
	    this.occupyCell = this.occupyCell.bind(this);
	    this.occupyCells();
	  }
	
	  occupyCells(){
	    this.pieceCoords.forEach( (coord) => {
	      this.occupyCell(coord);
	    });
	  }
	
	  pieceOrigin(){
	    return this.pieceCoords[0];
	  }
	
	  // gravity(){
	  //   if (this.currentPiece.move("down")) {
	  //     // window.currentPiece.move("down");
	  //   } else {
	  //
	  //     this.currentPiece = new Piece();
	  //     window.currentPiece = this.currentPiece;
	  //   }
	  // }
	
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
	    let relativeVectors;
	    let transformedVectors;
	    let finalVectors;
	
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
	     case MOVES.ROTATE: {
	       if (this.pieceType === "O") {
	         break;
	       } else {
	         relativeVectors = this.pieceCoords.map(
	           (coord) => ([(coord[0] - this.pieceOrigin()[0]), (coord[1] - this.pieceOrigin()[1])])
	         );
	
	         transformedVectors = relativeVectors.map(
	           (coord) => ([(0*coord[0] + -1*coord[1]), (1*coord[0] + 0*coord[1])])
	         );
	
	         newCoords = transformedVectors.map(
	           (coord) => ([ (coord[0] + this.pieceOrigin()[0]), (coord[1] + this.pieceOrigin()[1]) ])
	         );
	         break;
	       }
	     }
	      default:
	    }
	
	    newCoords = newCoords || this.pieceCoords;
	
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