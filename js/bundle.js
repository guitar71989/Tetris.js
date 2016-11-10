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
	const Piece = __webpack_require__(3);
	const Modal = __webpack_require__(6);
	
	
	$( () => {
	  const $pause = $('pause-btn');
	  $pause.hide();
	
	  const rootEl = $('.tetris-board');
	
	  $('body').append(Modal.$overlay, Modal.$modal);
	
	  Modal.modal.open();
	
	  $('#play').click(function () {
	    Modal.modal.close();
	    newGame.startGame();
	  });
	  const newGame = new View(rootEl);
	
	
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Board = __webpack_require__(2);
	const Piece = __webpack_require__(3);
	const Coord = __webpack_require__(4);
	const GameOver = __webpack_require__(5);
	
	class View {
	  constructor($el) {
	    this.$el = $el;
	    this.board = new Board;
	    this.setupGrid();
	    this.gravity = this.gravity.bind(this);
	    this.gamePaused = false;
	    this.currentPiece = null;
	    this.nextPiece = null;
	    this.numLines = null;
	    this.score = null;
	    this.level = null;
	    this.gameOver = null;
	    this.timeout = null;
	}
	
	
	  setupGrid() {
	    let html = "<div class='tetris-grid'>";
	
	    for (let i = 2; i < this.board.height + 2; i++) {
	      html += `<ul data=${i} >`;
	      for (var j = 0; j < this.board.width; j++) {
	        html += `<li empty=${true} data=${j}></li>`;
	      }
	      html += "</ul>";
	    }
	    html += "</div>";
	
	    this.$el.html(html);
	    this.$li = this.$el.find("li");
	  }
	
	  startGame() {
	    clearTimeout(this.timeout);
	    this.timeout = null;
	    this.numLines = 0;
	    this.score = 0;
	    this.level = 0;
	    this.gameOver = false;
	
	    $(".lines-result").html(`${this.numLines}`);
	    $(".score-result").html(`${this.score}`);
	    $(".level-result").html(`${this.level}`);
	
	
	    const $pause = $(".pause-btn");
	    const view = this;
	
	    if (!$._data( $pause[0], 'events' )) {
	      $pause.on("click", function(){
	        !view.gamePaused ? view.pauseGame() : view.resumeGame();
	      });
	    }
	
	    $pause.show();
	
	    this.currentPiece = new Piece;
	    window.currentPiece = this.currentPiece;
	    this.currentPiece.occupyCells();
	
	
	    if (!this.nextPiece) {
	        this.nextPiece = new Piece;
	    }
	
	    this.addToPreview(this.nextPiece);
	
	    this.timeout = setTimeout(this.gravity, 500);
	
	    $(window).keydown(
	      this.addKeydownListeners
	   );
	  }
	
	  gravity(){
	    if (this.currentPiece.move("down")) {
	      // window.currentPiece.move("down");
	    } else {
	      let lines = 0;
	      for (var i = 2; i < this.board.height + 2; i++) {
	
	        if ($(`ul[data=${i}] li[empty=${true}]`).length === 0) {
	          this.clearRow(i);
	          this.numLines += 1;
	          lines += 1;
	
	          if (this.numLines >= this.level * 10) {
	            this.level += 1;
	          }
	
	          $(".lines-result").html(`${this.numLines}`);
	          $(".level-result").html(`${this.level}`);
	
	          for (var y = i - 1; y > 0; y--) {
	            for (var x = 0; x < this.board.width; x++) {
	              const color = $(`ul[data=${y}] li[data=${x}]`).attr("class");
	              const pos = [y, x];
	              const coord = new Coord(pos, color);
	              const newCoord = new Coord([coord.y + 1, coord.x], coord.color);
	              if (!coord.empty()) {
	                coord.unoccupyCell();
	                newCoord.occupyCell();
	              }
	            }
	          }
	        }
	
	      }
	      this.updateScore(lines);
	
	
	      $(".score-result").html(`${this.score}`);
	
	      if (!this.gameOver) {
	        this.currentPiece = this.nextPiece;
	        this.removefromPreview(this.nextPiece);
	        window.currentPiece = this.currentPiece;
	        this.nextPiece = new Piece;
	        this.addToPreview(this.nextPiece);
	      }
	
	      if (!this.currentPiece.move("down")) {
	        this.gameOver = true;
	        this.endGame();
	
	        $('body').append(GameOver.$overlay, GameOver.$modal);
	
	        GameOver.$modal.hide();
	        GameOver.$overlay.hide();
	
	        GameOver.modal.open();
	
	        const view = this;
	
	        $('#playagain').click(function () {
	          GameOver.modal.close();
	          clearTimeout(view.interval);
	          $(window).off('keydown');
	          view.setupGrid();
	          view.startGame();
	        });
	
	      }
	    }
	    let currentSpeed = 100*Math.log(this.numLines + 1);
	    this.timeout = setTimeout(this.gravity, 500 - currentSpeed);
	  }
	
	    addKeydownListeners (e) {
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
	
	    endGame() {
	      clearTimeout(this.timeout);
	      this.timeout = null;
	      $(window).off('keydown');
	      this.removefromPreview(this.nextPiece);
	      this.currentPiece = null;
	      this.nextPiece = null;
	      window.currentPiece = null;
	    }
	
	
	    addToPreview(piece){
	      piece.occupyPreview();
	    }
	
	    removefromPreview(piece){
	      piece.unoccupyPreview();
	    }
	
	    pauseGame() {
	      clearTimeout(this.timeout);
	      this.timeout = null;
	      $(".pause-btn").html("&#9654");
	      $(window).off('keydown');
	      this.gamePaused = true;
	    }
	
	    resumeGame() {
	      this.timeout = setTimeout(this.gravity, 500 - 50*this.level);
	      $(".pause-btn").html("&nbsp &#9612 &#9612");
	      $(window).keydown(
	        this.addKeydownListeners
	     );
	      this.gamePaused = false;
	    }
	
	    clearRow(i) {
	      for (var j = 0; j < this.board.width; j++) {
	        $(`ul[data=${i}] li[data=${j}]`)
	        .removeClass("red")
	        .removeClass("green")
	        .removeClass("yellow")
	        .removeClass("blue")
	        .removeClass("orange")
	        .removeClass("green")
	        .removeClass("purple")
	        .removeClass("grey")
	        .attr("empty", `${true}`);
	      }
	    }
	
	    updateScore(lines) {
	      switch(lines) {
	          case 4: {
	            this.score += 800;
	            break;
	          }
	          case 3: {
	            this.score += 400;
	            break;
	          }
	          case 2: {
	            this.score += 200;
	            break;
	          }
	          case 1: {
	            this.score += 100;
	            break;
	          }
	          default: {
	            break;
	          }
	        }
	    }
	}
	
	module.exports = View;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Piece = __webpack_require__(3);
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
	
	
	}
	
	Board.BLANK_SYMBOL = ".";
	
	module.exports = Board;


/***/ },
/* 3 */
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
	
	}
	
	module.exports = Piece;


/***/ },
/* 4 */
/***/ function(module, exports) {

	class Coord {
	  constructor(array, color) {
	    this.y = array[0];
	    this.x = array[1];
	    this.color = color;
	  }
	
	    occupyCell() {
	      $(`div[class=tetris-grid] ul[data=${this.y}] li[data=${this.x}]`)
	        .addClass(`${this.color}`);
	      $(`div[class=tetris-grid] ul[data=${this.y}] li[data=${this.x}]`)
	        .attr('empty', 'false');
	    }
	
	    unoccupyCell() {
	      $(`div[class=tetris-grid] ul[data=${this.y}] li[data=${this.x}]`)
	        .removeClass(`${this.color}`);
	      $(`div[class=tetris-grid] ul[data=${this.y}] li[data=${this.x}]`)
	        .attr('empty', 'true');
	    }
	
	    equals(coord) {
	      return (this.y === coord.y) && (this.x === coord.x);
	    }
	
	    empty() {
	      const $cell = ($(`div[class=tetris-grid]
	        ul[data=${this.y}]
	        li[data=${this.x}]`
	      ));
	      return (
	        $cell.attr('empty') === "true" || $cell.attr('empty') === undefined
	      );
	    }
	
	    inBounds() {
	      return (this.x >= 0 && this.x <= 9 && this.y >= 0 && this.y <= 21);
	    }
	
	    occupyPreview(){
	      $(`div[class=nextPiece-ctn]
	        ul[data=${this.y + 1}]
	        li[data=${this.x - 2}]`)
	        .addClass(`${this.color}`)
	        .attr('empty', false);
	    }
	
	    unoccupyPreview(){
	      $(`div[class=nextPiece-ctn]
	        ul[data=${this.y + 1}]
	        li[data=${this.x - 2}]`)
	        .removeClass(`${this.color}`)
	        .attr('empty', true);
	    }
	
	}
	
	module.exports = Coord;


/***/ },
/* 5 */
/***/ function(module, exports) {

	const $overlay = $('<div id="gameoveroverlay"></div>');
	const $modal = $('<div id="gameovermodal"></div>');
	const $play = $('');
	
	const $pic = ('<div id="graphic"><img width="100%"  height="100%" src="./assets/gameover.gif" controls="controls"> </img><button id="playagain" href="#">Click here to play again</a></div>');
	
	$modal.hide();
	$overlay.hide();
	$modal.append($play, $pic);
	
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
	
	
	module.exports = { modal,
	        $modal,
	        $overlay,
	        $play,
	        $pic
	      };


/***/ },
/* 6 */
/***/ function(module, exports) {

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
	
	
	module.exports = { modal,
	        $modal,
	        $overlay,
	        $instructions,
	        $play,
	        $instructionsTitle,
	        $moveUp,
	        $moveLeft,
	        $moveRight,
	        $moveDown
	      };


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map