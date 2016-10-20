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
	
	$( () => {
	  const rootEl = $('.tetris-game');
	  new View(rootEl);
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Board = __webpack_require__(2);
	
	class View {
	  constructor($el) {
	    this.$el = $el;
	    this.board = new Board;
	    this.setupGrid();
	  }
	
	  setupGrid() {
	    let html = "";
	
	    for (let i = 0; i < this.board.width; i++) {
	      html += "<ul>";
	      for (var j = 0; j < this.board.height; j++) {
	        html += "<li></li>";
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

	const Tetrimino = __webpack_require__(3);
	const Coord = __webpack_require__(4);
	
	
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


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const Coord = __webpack_require__(4);
	
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


/***/ },
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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map