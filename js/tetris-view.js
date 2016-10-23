const Board = require('./../lib/board.js');
const Piece = require('./../lib/piece.js');


class View {
  constructor($el) {
    this.$el = $el;
    this.board = new Board;
    this.setupGrid();
    this.gravity = this.gravity.bind(this);
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
      for (var i = 0; i < this.board.height; i++) {
        if ($(`ul[data=${i}] li[empty=${true}]`).length === 0) {
            for (var j = 0; j < this.board.width; j++) {
              $(`ul[data=${i}] li[data=${j}]`)
                .removeClass('red')
                .removeClass('purple')
                .removeClass('blue')
                .removeClass('yellow')
                .removeClass('orange')
                .removeClass('green')
                .removeClass('grey');
              $(`ul[data=${i}] li[data=${j}]`)
                .attr('empty', 'true');

            }
          }
        }

      this.currentPiece = new Piece();
      window.currentPiece = this.currentPiece;
      }

    }

}

module.exports = View;
