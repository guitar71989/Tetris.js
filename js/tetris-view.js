const Board = require('./../lib/board.js');

class View {
  constructor($el) {
    this.$el = $el;
    this.board = new Board;
    this.setupGrid();
  }

  setupGrid() {
    let html = "";

    for (let i = 0; i < this.board.width; i++) {
      html += `<ul data=${i} >`;
      for (var j = 0; j < this.board.height; j++) {
        html += `<li empty=${true} data=${j}></li>`;
      }
      html += "</ul>";
    }

    this.$el.html(html);
    this.$li = this.$el.find("li");
  }

}

module.exports = View;
