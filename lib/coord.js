const $cinnaDOM = require('./../cinnaDOM/lib/main');

class Coord {
  constructor(array, color) {
    this.y = array[0];
    this.x = array[1];
    this.color = color;
  }

    occupyCell() {
      $cinnaDOM(`div.tetris-grid ul[data=\"${this.y}\"] li[data=\"${this.x}\"]`)
        .addClass(`${this.color}`);
      $cinnaDOM(`div.tetris-grid ul[data=\"${this.y}\"] li[data=\"${this.x}\"]`)
        .attr('empty', 'false');
    }

    unoccupyCell() {
      $cinnaDOM(`div.tetris-grid ul[data=\"${this.y}\"] li[data=\"${this.x}\"]`)
        .removeClass(`${this.color}`);
      $cinnaDOM(`div.tetris-grid ul[data=\"${this.y}\"] li[data=\"${this.x}\"]`)
        .attr('empty', 'true');
    }

    equals(coord) {
      return (this.y === coord.y) && (this.x === coord.x);
    }

    empty() {
      const $cell = ($cinnaDOM(`div.tetris-grid
        ul[data=\"${this.y}\"]
        li[data=\"${this.x}\"]`)
      );
      return (
        $cell.attr('empty') === "true" || $cell.attr('empty') === undefined
      );
    }

    inBounds() {
      return (this.x >= 0 && this.x <= 9 && this.y >= 0 && this.y <= 21);
    }

    occupyPreview(){
      $cinnaDOM(`div.nextPiece-ctn
        ul[data=\"${this.y + 1 }\"]
        li[data=\"${this.x - 2}\"]`)
        .addClass(`${this.color}`)
        .attr('empty', false);
    }

    unoccupyPreview(){
      $cinnaDOM(`div[class=nextPiece-ctn]
        ul[data=\"${this.y + 1 }\"]
        li[data=\"${this.x - 2}\"]`)
        .removeClass(`${this.color}`)
        .attr('empty', true);
    }

}

module.exports = Coord;
