const Board = require('./../lib/board.js');
const Piece = require('./../lib/piece.js');


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
