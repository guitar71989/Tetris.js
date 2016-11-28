const Board = require('./../lib/board.js');
const Piece = require('./../lib/piece.js');
const Coord = require('./../lib/coord.js');
const $cinnaDOM = require('./../cinnaDOM/lib/main');

class View {
  constructor($el) {
    this.$el = $el;
    this.board = new Board;
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


  setupGrid() {
    let html = "<div class='tetris-grid'>";

    for (let i = 0; i < this.board.height + 2; i++) {
      ( i <= 1 ) ? html += `<ul style="display:none" data=${i} >`
      : html += `<ul data=${i} >`;
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

    $cinnaDOM(".lines-result").html(`${this.numLines}`);
    $cinnaDOM(".score-result").html(`${this.score}`);
    $cinnaDOM(".level-result").html(`${this.level}`);


    const $pause = $cinnaDOM(".pause-btn");
    const view = this;


    if (!this.hasPauseListener) {
      $pause.on("click", function(){
        !view.gamePaused ? view.pauseGame() : view.resumeGame();
      });
      this.hasPauseListener = true;
    }

    $pause.show();


    this.currentPiece = new Piece;
    window.currentPiece = this.currentPiece;
    this.currentPiece.occupyCells();


    if (!this.nextPiece) {
        this.nextPiece = new Piece;
    }

    this.addToPreview(this.nextPiece);

    let currentSpeed = 100*Math.log(this.numLines + 1);
    this.timeout = setTimeout(this.gravity, 500 - currentSpeed);

    $cinnaDOM(window).on('keydown', this.addKeydownListeners);
  }

  gravity(){
    if (this.currentPiece.move("down")) {
      // window.currentPiece.move("down");
    } else {
      let lines = 0;
      for (var i = 2; i < this.board.height + 2; i++) {
        if ($cinnaDOM(`ul[data=\"${i}\"] li[empty=\"${true}\"]`).array.length === 0) {
          this.clearRow(i);
          this.numLines += 1;
          lines += 1;

          if (this.numLines >= this.level * 10) {
            this.level += 1;
          }

          $cinnaDOM(".lines-result").html(`${this.numLines}`);
          $cinnaDOM(".level-result").html(`${this.level}`);

          for (var y = i - 1; y > 0; y--) {
            for (var x = 0; x < this.board.width; x++) {
              const color = $cinnaDOM(`ul[data=\"${y}\"] li[data=\"${x}\"]`).attr("class");
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


      $cinnaDOM(".score-result").html(`${this.score}`);

      if (!this.gameOver) {
        this.currentPiece = this.nextPiece;
        this.removefromPreview(this.nextPiece);
        window.currentPiece = this.currentPiece;
        this.nextPiece = new Piece;
        this.addToPreview(this.nextPiece);
        this.pieceHeld = false;
      }

      if (!this.currentPiece.move("down")) {
        this.gameOver = true;
        this.endGame();

        const $gameoverOverlay = $cinnaDOM('div#gameoveroverlay');
        const $gameoverModal = $cinnaDOM('div#gameovermodal');

        $gameoverOverlay.show();
        $gameoverModal.show();

        const view = this;

        $cinnaDOM('#playagain').on('click', function () {
          $gameoverModal.hide();
          $gameoverOverlay.hide();
          clearTimeout(view.interval);

          $cinnaDOM(window).off('keydown', view.addKeydownListeners);

          view.setupGrid();
          view.startGame();
        });
      }
    }
    if (!this.gameOver) {
      let currentSpeed = 100*Math.log(this.numLines + 1);
      this.timeout = setTimeout(this.gravity, 500 - currentSpeed);
    }
  }

    addKeydownListeners () {
       const e =  arguments[0];
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

            if (this.pieceHeld){
              return;
            }

            if (this.holdPiece){
              this.holdPiece.unoccupyHold();
              this.currentPiece.occupyHold();
              [this.holdPiece, this.currentPiece] = [this.currentPiece, this.holdPiece];
              window.currentPiece = this.currentPiece;
              this.pieceHeld = true;
            } else {
              this.currentPiece.occupyHold();
              this.holdPiece = this.currentPiece;
              this.currentPiece = this.nextPiece;
              this.removefromPreview(this.nextPiece);
              window.currentPiece = this.currentPiece;
              this.nextPiece = new Piece;
              this.addToPreview(this.nextPiece);
              this.pieceHeld = true;
            }
       }
     }

    endGame() {
      clearTimeout(this.timeout);
      this.timeout = null;

      $cinnaDOM(window).off('keydown', this.addKeydownListeners);

      this.removefromPreview(this.nextPiece);

      if (this.holdPiece) {
        this.holdPiece.unoccupyHold();
      }

      this.holdPiece = null;
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
      $cinnaDOM(".pause-btn").html("&#9654");
      $cinnaDOM(window).off('keydown', this.addKeydownListeners);
      this.gamePaused = true;
    }

    resumeGame() {
      let currentSpeed = 100*Math.log(this.numLines + 1);
      this.timeout = setTimeout(this.gravity, 500 - currentSpeed);

      $cinnaDOM(".pause-btn").html("&nbsp &#9612 &#9612");
      $cinnaDOM(window).on('keydown', this.addKeydownListeners);
      this.gamePaused = false;
    }

    clearRow(i) {
      for (var j = 0; j < this.board.width; j++) {

        $cinnaDOM(`ul[data=\"${i}\"] li[data=\"${j}\"]`)
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
