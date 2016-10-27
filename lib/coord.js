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
        li[data=${this.x - 3}]`)
        .addClass(`${this.color}`)
        .attr('id', 'withborder')
        .attr('empty', false);
    }

    unoccupyPreview(){
      $(`div[class=nextPiece-ctn]
        ul[data=${this.y + 1}]
        li[data=${this.x - 3}]`)
        .removeClass(`${this.color}`)
        .removeAttr('withborder')
        .attr('empty', true);
    }

}

module.exports = Coord;
