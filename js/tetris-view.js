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
    this.gameOver = false;
    this.gamePaused = false;
}


  setupGrid() {
    let html = "<div class='tetris-grid'>";

    for (let i = 0; i < this.board.height; i++) {
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
    const $pause = $(".pause-btn");
    const view = this;
    $pause.on("click", function(){
      !view.gamePaused ? view.pauseGame() : view.resumeGame();
    });

    $pause.show();

    const currentPiece = new Piece;

    window.currentPiece = currentPiece;

    window.interval = setInterval(this.gravity, 500);

    $(window).keydown(
      this.addKeydownListeners
   );
  }

  gravity(){
    if (window.currentPiece.move("down")) {
      // window.currentPiece.move("down");
    } else {
      for (var i = 0; i < this.board.height; i++) {
        if ($(`ul[data=${i}] li[empty=${true}]`).length === 0) {
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

      if (!this.gameOver) {
        this.currentPiece = new Piece();
        window.currentPiece = this.currentPiece;
      }

      if (!this.currentPiece.move("down")) {
        this.endGame();

        Modal.$modal.hide();
        Modal.$overlay.hide();

        Modal.modal.open();

        const view = this;

        $('#play').click(function () {
          Modal.modal.close();
          window.clearInterval(window.interval);
          $(window).off('keydown');
          view.setupGrid();
          view.startGame();
        });

      }

      }

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
      window.clearInterval(window.interval);
      $(window).off('keydown');
    }


    pauseGame() {
      window.clearInterval(window.interval);
      $(".pause-btn").html("&#9654");
      $(window).off('keydown');
      this.gamePaused = true;
    }

    resumeGame() {
      window.interval = setInterval(this.gravity, 500);
      $(".pause-btn").html("&nbsp &#9612 &#9612");
      $(window).keydown(
        this.addKeydownListeners
     );
      this.gamePaused = false;
    }
}

module.exports = View;
