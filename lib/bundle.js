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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $cinnaDOM = __webpack_require__(1);
	var View = __webpack_require__(3);
	var Piece = __webpack_require__(5);
	
	$cinnaDOM(function () {
	  var $pause = $cinnaDOM('pause-btn');
	  $pause.hide();
	
	  var $gameoverOverlay = $cinnaDOM('div#gameoveroverlay');
	  var $gameoverModal = $cinnaDOM('div#gameovermodal');
	
	  $gameoverOverlay.hide();
	  $gameoverModal.hide();
	
	  var $overlay = $cinnaDOM('div#overlay');
	  var $modal = $cinnaDOM('div#modal');
	
	  var rootEl = $cinnaDOM('.tetris-board');
	
	  $cinnaDOM('#play').on('click', function () {
	    $overlay.hide();
	    $modal.hide();
	    newGame.startGame();
	  });
	
	  var newGame = new View(rootEl);
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var DOMNodeCollection = __webpack_require__(2);
	
	var _docReadyCallbacks = [];
	var _docReady = false;
	
	document.addEventListener("DOMContentLoaded", function (event) {
	  _docReady = true;
	  _docReadyCallbacks.forEach(function (callback) {
	    return callback();
	  });
	});
	
	var registerDocReadyCallback = function registerDocReadyCallback(func) {
	  _docReady ? func() : _docReadyCallbacks.push(func);
	};
	
	var $cinnaDOM = function $cinnaDOM(arg) {
	  if (arg === window) {
	    return new DOMNodeCollection([window]);
	  }
	
	  switch (typeof arg === "undefined" ? "undefined" : _typeof(arg)) {
	    case "function":
	      return registerDocReadyCallback(arg);
	    case "string":
	      if (arg[0] === "<") {
	        var tag = arg.slice(1, -1);
	        return new DOMNodeCollection([document.createElement(tag)]);
	      } else {
	        return getNodesFromDom(arg);
	      }
	    case "object":
	      return new DOMNodeCollection([arg]);
	  }
	};
	
	$cinnaDOM.extend = function (base) {
	  for (var _len = arguments.length, otherObjs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    otherObjs[_key - 1] = arguments[_key];
	  }
	
	  otherObjs.forEach(function (obj) {
	    for (var prop in obj) {
	      base[prop] = obj[prop];
	    }
	  });
	  return base;
	};
	
	$cinnaDOM.ajax = function (options) {
	  var request = new XMLHttpRequest();
	
	  var ajaxDefaults = {
	    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
	    method: 'GET',
	    url: "",
	    succeess: function succeess() {},
	    error: function error() {},
	    data: {}
	  };
	  options = $cinnaDOM.extend(ajaxDefaults, options);
	
	  if (options.methd === "GET") {
	    options.url += "?" + toQueryString(options.data);
	  }
	
	  request.open(options.method, options.url, true);
	
	  request.onload = function (e) {
	    if (request.status === 200) {
	      options.success(request.response);
	    } else {
	      options.error(request.resposne);
	    }
	  };
	
	  request.send(JSON.stringify(options.data));
	};
	
	var toQueryString = function toQueryString(obj) {
	  var result = "";
	
	  for (var prop in obj) {
	    if (obj.hasOwnProperty(prop)) {
	      result += prop + "=" + obj[prop] + "&";
	    }
	  }
	  return result.substring(0, result.length - 1);
	};
	
	var getNodesFromDom = function getNodesFromDom(arg) {
	  var arrayify = [];
	  var allSelectors = document.querySelectorAll(arg);
	  arrayify = arrayify.concat(Array.from(allSelectors));
	  return new DOMNodeCollection(arrayify);
	};
	
	module.exports = $cinnaDOM;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var DOMNodeCollection = function () {
	  function DOMNodeCollection(array) {
	    _classCallCheck(this, DOMNodeCollection);
	
	    this.array = array;
	  }
	
	  _createClass(DOMNodeCollection, [{
	    key: "each",
	    value: function each(callback) {
	      this.array.forEach(function (el) {
	        return callback(el);
	      });
	    }
	  }, {
	    key: "html",
	    value: function html() {
	      var _arguments = arguments;
	
	      if (arguments.length === 1) {
	        this.each(function (element) {
	          element.innerHTML = _arguments[0];
	        });
	      } else {
	        return this.array[0].innerHTML;
	      }
	    }
	  }, {
	    key: "empty",
	    value: function empty() {
	      this.html("");
	    }
	  }, {
	    key: "append",
	    value: function append(arg) {
	      if (arg instanceof DOMNodeCollection) {
	        for (var i = 0; i < this.array.length; i++) {
	          for (var j = 0; j < arg.array.length; j++) {
	            this.array[i].innerHTML += arg.array[j].outerHTML;
	          }
	        }
	      } else if (arg instanceof HTMLElement) {
	        for (var _i = 0; _i < this.array.length; _i++) {
	          this.array[_i].innerHTML += arg.outerHTML;
	        }
	      } else if (typeof arg === 'string') {
	        for (var _i2 = 0; _i2 < this.array.length; _i2++) {
	          this.array[_i2].innerHTML += arg;
	        }
	      }
	    }
	  }, {
	    key: "attr",
	    value: function attr() {
	      var _arguments2 = arguments;
	
	      if (arguments.length === 2) {
	        this.each(function (el) {
	          return el.setAttribute(_arguments2[0], _arguments2[1]);
	        });
	      } else if (arguments.length === 1) {
	        return this.array.length === 0 ? "false" : this.array[0].getAttribute(arguments[0]);
	      }
	    }
	  }, {
	    key: "addClass",
	    value: function addClass() {
	      var _arguments3 = arguments;
	
	      this.each(function (el) {
	        var _el$classList;
	
	        return (_el$classList = el.classList).add.apply(_el$classList, _arguments3);
	      });
	      return this;
	    }
	  }, {
	    key: "removeClass",
	    value: function removeClass() {
	      var _arguments4 = arguments;
	
	      this.each(function (el) {
	        var _el$classList2;
	
	        return (_el$classList2 = el.classList).remove.apply(_el$classList2, _arguments4);
	      });
	      return this;
	    }
	  }, {
	    key: "children",
	    value: function children() {
	      var childNodes = [];
	      this.each(function (el) {
	        var childNodeList = el.children;
	        childNodes = childNodes.concat(Array.from(childNodeList));
	      });
	      return new DOMNodeCollection(childNodes);
	    }
	  }, {
	    key: "find",
	    value: function find(selector) {
	      var foundNodes = [];
	      this.each(function (el) {
	        var nodeList = el.querySelectorAll(selector);
	        foundNodes = foundNodes.concat(Array.from(nodeList));
	      });
	    }
	  }, {
	    key: "parent",
	    value: function parent() {
	      var parentNodes = [];
	      this.each(function (el) {
	        return parentNodes.push(el.parentNode);
	      });
	      return new DOMNodeCollection(parentNodes);
	    }
	  }, {
	    key: "remove",
	    value: function remove() {
	      for (var i = 0; i < this.array.length; i++) {
	        this.array[i].outerHTML = "";
	      }
	    }
	  }, {
	    key: "on",
	    value: function on(type, callback) {
	      this.each(function (el) {
	        el.addEventListener(type, callback);
	      });
	    }
	  }, {
	    key: "off",
	    value: function off(type, callback) {
	      this.each(function (el) {
	        el.removeEventListener(type, callback);
	      });
	    }
	  }, {
	    key: "hide",
	    value: function hide() {
	      this.each(function (el) {
	        el.style.display = "none";
	      });
	    }
	  }, {
	    key: "show",
	    value: function show() {
	      this.each(function (el) {
	        el.style.display = "block";
	      });
	    }
	  }]);
	
	  return DOMNodeCollection;
	}();
	
	module.exports = DOMNodeCollection;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Board = __webpack_require__(4);
	var Piece = __webpack_require__(5);
	var Coord = __webpack_require__(6);
	var $cinnaDOM = __webpack_require__(1);
	
	var View = function () {
	  function View($el) {
	    _classCallCheck(this, View);
	
	    this.$el = $el;
	    this.board = new Board();
	    this.setupGrid();
	    this.gravity = this.gravity.bind(this);
	    this.addKeydownListeners = this.addKeydownListeners.bind(this);
	    this.gamePaused = false;
	    this.currentPiece = null;
	    this.nextPiece = null;
	    this.holdPiece = null;
	    this.numLines = null;
	    this.score = null;
	    this.level = null;
	    this.gameOver = null;
	    this.timeout = null;
	    this.hasPauseListener = false;
	    this.pieceHeld = false;
	  }
	
	  _createClass(View, [{
	    key: 'setupGrid',
	    value: function setupGrid() {
	      var html = "<div class='tetris-grid'>";
	
	      for (var i = 0; i < this.board.height + 2; i++) {
	        i <= 1 ? html += '<ul style="display:none" data=' + i + ' >' : html += '<ul data=' + i + ' >';
	        for (var j = 0; j < this.board.width; j++) {
	          html += '<li empty=' + true + ' data=' + j + '></li>';
	        }
	        html += "</ul>";
	      }
	      html += "</div>";
	
	      this.$el.html(html);
	      this.$li = this.$el.find("li");
	    }
	  }, {
	    key: 'startGame',
	    value: function startGame() {
	      clearTimeout(this.timeout);
	      this.timeout = null;
	      this.numLines = 0;
	      this.score = 0;
	      this.level = 0;
	      this.gameOver = false;
	
	      $cinnaDOM(".lines-result").html('' + this.numLines);
	      $cinnaDOM(".score-result").html('' + this.score);
	      $cinnaDOM(".level-result").html('' + this.level);
	
	      var $pause = $cinnaDOM(".pause-btn");
	      var view = this;
	
	      if (!this.hasPauseListener) {
	        $pause.on("click", function () {
	          !view.gamePaused ? view.pauseGame() : view.resumeGame();
	        });
	        this.hasPauseListener = true;
	      }
	
	      $pause.show();
	
	      this.currentPiece = new Piece();
	      window.currentPiece = this.currentPiece;
	      this.currentPiece.occupyCells();
	
	      if (!this.nextPiece) {
	        this.nextPiece = new Piece();
	      }
	
	      this.addToPreview(this.nextPiece);
	
	      var currentSpeed = 100 * Math.log(this.numLines + 1);
	      this.timeout = setTimeout(this.gravity, 500 - currentSpeed);
	
	      $cinnaDOM(window).on('keydown', this.addKeydownListeners);
	    }
	  }, {
	    key: 'gravity',
	    value: function gravity() {
	      var _this = this;
	
	      if (this.currentPiece.move("down")) {
	        // window.currentPiece.move("down");
	      } else {
	        var lines = 0;
	        for (var i = 2; i < this.board.height + 2; i++) {
	          if ($cinnaDOM('ul[data="' + i + '"] li[empty="' + true + '"]').array.length === 0) {
	            this.clearRow(i);
	            this.numLines += 1;
	            lines += 1;
	
	            if (this.numLines >= this.level * 10) {
	              this.level += 1;
	            }
	
	            $cinnaDOM(".lines-result").html('' + this.numLines);
	            $cinnaDOM(".level-result").html('' + this.level);
	
	            for (var y = i - 1; y > 0; y--) {
	              for (var x = 0; x < this.board.width; x++) {
	                var color = $cinnaDOM('ul[data="' + y + '"] li[data="' + x + '"]').attr("class");
	                var pos = [y, x];
	                var coord = new Coord(pos, color);
	                var newCoord = new Coord([coord.y + 1, coord.x], coord.color);
	                if (!coord.empty()) {
	                  coord.unoccupyCell();
	                  newCoord.occupyCell();
	                }
	              }
	            }
	          }
	        }
	        this.updateScore(lines);
	
	        $cinnaDOM(".score-result").html('' + this.score);
	
	        if (!this.gameOver) {
	          this.currentPiece = this.nextPiece;
	          this.removefromPreview(this.nextPiece);
	          window.currentPiece = this.currentPiece;
	          this.nextPiece = new Piece();
	          this.addToPreview(this.nextPiece);
	          this.pieceHeld = false;
	        }
	
	        if (!this.currentPiece.move("down")) {
	          (function () {
	            _this.gameOver = true;
	            _this.endGame();
	
	            var $gameoverOverlay = $cinnaDOM('div#gameoveroverlay');
	            var $gameoverModal = $cinnaDOM('div#gameovermodal');
	
	            $gameoverOverlay.show();
	            $gameoverModal.show();
	
	            var view = _this;
	
	            $cinnaDOM('#playagain').on('click', function () {
	              $gameoverModal.hide();
	              $gameoverOverlay.hide();
	              clearTimeout(view.interval);
	
	              $cinnaDOM(window).off('keydown', view.addKeydownListeners);
	
	              view.setupGrid();
	              view.startGame();
	            });
	          })();
	        }
	      }
	      if (!this.gameOver) {
	        var currentSpeed = 100 * Math.log(this.numLines + 1);
	        this.timeout = setTimeout(this.gravity, 500 - currentSpeed);
	      }
	    }
	  }, {
	    key: 'addKeydownListeners',
	    value: function addKeydownListeners() {
	      var e = arguments[0];
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
	      } else if (e.keyCode === 67) {
	        e.preventDefault();
	
	        if (this.pieceHeld) {
	          return;
	        }
	
	        if (this.holdPiece) {
	          this.holdPiece.unoccupyHold();
	          this.currentPiece.occupyHold();
	          var _ref = [this.currentPiece, this.holdPiece];
	          this.holdPiece = _ref[0];
	          this.currentPiece = _ref[1];
	
	          window.currentPiece = this.currentPiece;
	          this.pieceHeld = true;
	        } else {
	          this.currentPiece.occupyHold();
	          this.holdPiece = this.currentPiece;
	          this.currentPiece = this.nextPiece;
	          this.removefromPreview(this.nextPiece);
	          window.currentPiece = this.currentPiece;
	          this.nextPiece = new Piece();
	          this.addToPreview(this.nextPiece);
	          this.pieceHeld = true;
	        }
	      }
	    }
	  }, {
	    key: 'endGame',
	    value: function endGame() {
	      clearTimeout(this.timeout);
	      this.timeout = null;
	
	      $cinnaDOM(window).off('keydown', this.addKeydownListeners);
	
	      this.removefromPreview(this.nextPiece);
	      this.holdPiece.unoccupyHold();
	      this.holdPiece = null;
	      this.currentPiece = null;
	      this.nextPiece = null;
	      window.currentPiece = null;
	    }
	  }, {
	    key: 'addToPreview',
	    value: function addToPreview(piece) {
	      piece.occupyPreview();
	    }
	  }, {
	    key: 'removefromPreview',
	    value: function removefromPreview(piece) {
	      piece.unoccupyPreview();
	    }
	  }, {
	    key: 'pauseGame',
	    value: function pauseGame() {
	      clearTimeout(this.timeout);
	      this.timeout = null;
	      $cinnaDOM(".pause-btn").html("&#9654");
	      $cinnaDOM(window).off('keydown', this.addKeydownListeners);
	      this.gamePaused = true;
	    }
	  }, {
	    key: 'resumeGame',
	    value: function resumeGame() {
	      var currentSpeed = 100 * Math.log(this.numLines + 1);
	      this.timeout = setTimeout(this.gravity, 500 - currentSpeed);
	
	      $cinnaDOM(".pause-btn").html("&nbsp &#9612 &#9612");
	      $cinnaDOM(window).on('keydown', this.addKeydownListeners);
	      this.gamePaused = false;
	    }
	  }, {
	    key: 'clearRow',
	    value: function clearRow(i) {
	      for (var j = 0; j < this.board.width; j++) {
	
	        $cinnaDOM('ul[data="' + i + '"] li[data="' + j + '"]').removeClass("red").removeClass("green").removeClass("yellow").removeClass("blue").removeClass("orange").removeClass("green").removeClass("purple").removeClass("grey").attr("empty", '' + true);
	      }
	    }
	  }, {
	    key: 'updateScore',
	    value: function updateScore(lines) {
	      switch (lines) {
	        case 4:
	          {
	            this.score += 800;
	            break;
	          }
	        case 3:
	          {
	            this.score += 400;
	            break;
	          }
	        case 2:
	          {
	            this.score += 200;
	            break;
	          }
	        case 1:
	          {
	            this.score += 100;
	            break;
	          }
	        default:
	          {
	            break;
	          }
	      }
	    }
	  }]);
	
	  return View;
	}();
	
	module.exports = View;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Piece = __webpack_require__(5);
	var Coord = __webpack_require__(6);
	
	var Board = function () {
	  function Board() {
	    var height = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 20;
	    var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
	
	    _classCallCheck(this, Board);
	
	    this.height = height;
	    this.width = width;
	  }
	
	  _createClass(Board, [{
	    key: 'setupGrid',
	    value: function setupGrid(height, width) {
	      var grid = [];
	      for (var i = 0; i < height; i++) {
	        var row = [];
	        for (var j = 0; j < width; j++) {
	          row.push(Board.BLANK_SYMBOL);
	        }
	        grid.push(row);
	      }
	      return grid;
	    }
	  }]);
	
	  return Board;
	}();
	
	Board.BLANK_SYMBOL = ".";
	
	module.exports = Board;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Coord = __webpack_require__(6);
	
	var PIECE_TYPE = ["I", "L", "J", "O", "S", "T", "Z"];
	
	var SHAPES = [["I", [new Coord([2, 5], "red"), new Coord([1, 5], "red"), new Coord([0, 5], "red"), new Coord([3, 5], "red")], "red"], ["L", [new Coord([1, 4], "purple"), new Coord([0, 5], "purple"), new Coord([0, 4], "purple"), new Coord([2, 4], "purple")], "purple"], ["J", [new Coord([1, 5], "blue"), new Coord([0, 5], "blue"), new Coord([0, 4], "blue"), new Coord([2, 5], "blue")], "blue"], ["O", [new Coord([0, 4], "yellow"), new Coord([0, 5], "yellow"), new Coord([1, 4], "yellow"), new Coord([1, 5], "yellow")], "yellow"], ["S", [new Coord([1, 5], "orange"), new Coord([1, 4], "orange"), new Coord([0, 5], "orange"), new Coord([0, 6], "orange")], "orange"], ["T", [new Coord([1, 5], "green"), new Coord([1, 4], "green"), new Coord([0, 5], "green"), new Coord([2, 5], "green")], "green"], ["Z", [new Coord([0, 5], "grey"), new Coord([1, 5], "grey"), new Coord([0, 4], "grey"), new Coord([1, 6], "grey")], "grey"]];
	
	var MOVES = {
	  LEFT: "left",
	  RIGHT: "right",
	  DOWN: "down",
	  ROTATE: "rotate"
	};
	
	var Piece = function () {
	  function Piece() {
	    _classCallCheck(this, Piece);
	
	    this.randPiece = SHAPES[Math.floor(Math.random() * SHAPES.length)];
	    this.pieceType = this.randPiece[0];
	    this.pieceCoords = this.randPiece[1];
	    this.pieceColor = this.randPiece[2];
	    this.validMove.bind(this);
	  }
	
	  _createClass(Piece, [{
	    key: "pieceOrigin",
	    value: function pieceOrigin() {
	      return this.pieceCoords[0];
	    }
	  }, {
	    key: "occupyCells",
	    value: function occupyCells() {
	      this.pieceCoords.forEach(function (coord) {
	        coord.occupyCell();
	      });
	    }
	  }, {
	    key: "unoccupyCells",
	    value: function unoccupyCells() {
	      this.pieceCoords.forEach(function (coord) {
	        coord.unoccupyCell();
	      });
	    }
	  }, {
	    key: "move",
	    value: function move(direction) {
	      var _this = this;
	
	      var newCoords = void 0;
	      var relativeVectors = void 0;
	      var rotatedVectors = void 0;
	      var finalVectors = void 0;
	
	      switch (direction) {
	        case MOVES.LEFT:
	          {
	            newCoords = this.pieceCoords.map(function (coord) {
	              return new Coord([coord.y, coord.x - 1], coord.color);
	            });
	            break;
	          }
	        case MOVES.RIGHT:
	          {
	            newCoords = this.pieceCoords.map(function (coord) {
	              return new Coord([coord.y, coord.x + 1], coord.color);
	            });
	            break;
	          }
	        case MOVES.DOWN:
	          {
	            newCoords = this.pieceCoords.map(function (coord) {
	              return new Coord([coord.y + 1, coord.x], coord.color);
	            });
	            break;
	          }
	        case MOVES.ROTATE:
	          {
	            if (this.pieceType === "O") {
	              break;
	            } else {
	              relativeVectors = this.pieceCoords.map(function (coord) {
	                return [coord.y - _this.pieceOrigin().y, coord.x - _this.pieceOrigin().x];
	              });
	
	              rotatedVectors = relativeVectors.map(function (vector) {
	                return [0 * vector[0] + -1 * vector[1], 1 * vector[0] + 0 * vector[1]];
	              });
	
	              newCoords = rotatedVectors.map(function (vector) {
	                return new Coord([vector[0] + _this.pieceOrigin().y, vector[1] + _this.pieceOrigin().x], _this.pieceColor);
	              });
	              break;
	            }
	          }
	        default:
	      }
	
	      newCoords = newCoords || this.pieceCoords;
	
	      var validMove = this.validMove(newCoords);
	
	      if (validMove) {
	        this.unoccupyCells();
	        this.pieceCoords = newCoords;
	        this.occupyCells();
	      }
	      return validMove;
	    }
	  }, {
	    key: "validMove",
	    value: function validMove(newCoords) {
	      var _this2 = this;
	
	      var valid = true;
	
	      var nonOverlappingCoords = newCoords.filter(function (coord) {
	        for (var i = 0; i < _this2.pieceCoords.length; i++) {
	          if (_this2.pieceCoords[i].equals(coord)) {
	            return false;
	          }
	        }
	        return true;
	      });
	
	      nonOverlappingCoords.forEach(function (coord) {
	        if (!coord.empty() || !coord.inBounds()) {
	          valid = false;
	          return valid;
	        }
	      });
	
	      return valid;
	    }
	  }, {
	    key: "occupyPreview",
	    value: function occupyPreview() {
	      this.pieceCoords.forEach(function (coord) {
	        coord.occupyPreview();
	      });
	    }
	  }, {
	    key: "unoccupyPreview",
	    value: function unoccupyPreview() {
	      this.pieceCoords.forEach(function (coord) {
	        coord.unoccupyPreview();
	      });
	    }
	  }, {
	    key: "occupyHold",
	    value: function occupyHold() {
	      this.unoccupyCells();
	
	      this.pieceCoords = SHAPES[PIECE_TYPE.indexOf(this.pieceType)][1];
	      this.pieceCoords.forEach(function (coord) {
	        coord.occupyHold();
	      });
	    }
	  }, {
	    key: "unoccupyHold",
	    value: function unoccupyHold() {
	      var defaultCoords = SHAPES[PIECE_TYPE.indexOf(this.pieceType)][1];
	      this.pieceCoords.forEach(function (coord) {
	        coord.unoccupyHold();
	      });
	    }
	  }]);
	
	  return Piece;
	}();
	
	module.exports = Piece;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var $cinnaDOM = __webpack_require__(1);
	
	var Coord = function () {
	  function Coord(array, color) {
	    _classCallCheck(this, Coord);
	
	    this.y = array[0];
	    this.x = array[1];
	    this.color = color;
	  }
	
	  _createClass(Coord, [{
	    key: 'occupyCell',
	    value: function occupyCell() {
	      $cinnaDOM('div.tetris-grid ul[data="' + this.y + '"] li[data="' + this.x + '"]').addClass('' + this.color);
	      $cinnaDOM('div.tetris-grid ul[data="' + this.y + '"] li[data="' + this.x + '"]').attr('empty', 'false');
	    }
	  }, {
	    key: 'unoccupyCell',
	    value: function unoccupyCell() {
	      $cinnaDOM('div.tetris-grid ul[data="' + this.y + '"] li[data="' + this.x + '"]').removeClass('' + this.color);
	      $cinnaDOM('div.tetris-grid ul[data="' + this.y + '"] li[data="' + this.x + '"]').attr('empty', 'true');
	    }
	  }, {
	    key: 'equals',
	    value: function equals(coord) {
	      return this.y === coord.y && this.x === coord.x;
	    }
	  }, {
	    key: 'empty',
	    value: function empty() {
	      var $cell = $cinnaDOM('div.tetris-grid\n        ul[data="' + this.y + '"]\n        li[data="' + this.x + '"]');
	      return $cell.attr('empty') === "true" || $cell.attr('empty') === undefined;
	    }
	  }, {
	    key: 'inBounds',
	    value: function inBounds() {
	      return this.x >= 0 && this.x <= 9 && this.y >= 0 && this.y <= 21;
	    }
	  }, {
	    key: 'occupyPreview',
	    value: function occupyPreview() {
	      $cinnaDOM('div.nextPiece-ctn\n        ul[data="' + (this.y + 1) + '"]\n        li[data="' + (this.x - 2) + '"]').addClass('' + this.color).attr('empty', false);
	    }
	  }, {
	    key: 'unoccupyPreview',
	    value: function unoccupyPreview() {
	      $cinnaDOM('div[class=nextPiece-ctn]\n        ul[data="' + (this.y + 1) + '"]\n        li[data="' + (this.x - 2) + '"]').removeClass('' + this.color).attr('empty', true);
	    }
	  }, {
	    key: 'occupyHold',
	    value: function occupyHold() {
	      $cinnaDOM('div.holdPiece-ctn\n        ul[data="' + (this.y + 1) + '"]\n        li[data="' + (this.x - 2) + '"]').addClass('' + this.color).attr('empty', false);
	    }
	  }, {
	    key: 'unoccupyHold',
	    value: function unoccupyHold() {
	      $cinnaDOM('div[class=holdPiece-ctn]\n        ul[data="' + (this.y + 1) + '"]\n        li[data="' + (this.x - 2) + '"]').removeClass('' + this.color).attr('empty', true);
	    }
	  }]);
	
	  return Coord;
	}();
	
	module.exports = Coord;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map