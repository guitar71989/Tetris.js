const Board = require('./../lib/board.js');
const Piece = require('./../lib/piece.js');
const Coord = require('./../lib/coord.js');
const Modal = require('./../lib/modal.js');

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
    $pause.on("click", function(){
      !view.gamePaused ? view.pauseGame() : view.resumeGame();
    });

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

          if (this.numlines >= 10 && this.lines % 10 === 0) {
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

        Modal.$modal.hide();
        Modal.$overlay.hide();

        Modal.modal.open();

        const view = this;

        $('#play').click(function () {
          Modal.modal.close();
          clearTimeout(view.interval);
          $(window).off('keydown');
          view.setupGrid();
          view.startGame();
        });

      }
    }
    this.timeout = setTimeout(this.gravity, 500 - (this.level*50));
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
