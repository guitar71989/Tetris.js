class Coord {
  constructor(array, color) {
    this.y = array[0];
    this.x = array[1];
    this.color = color;
  }

    occupyCell() {
      $(`ul[data=${this.y}] li[data=${this.x}]`)
        .addClass(`${this.color}`);
      $(`ul[data=${this.y}] li[data=${this.x}]`)
        .attr('empty', 'false');
    }

    unoccupyCell() {
      $(`ul[data=${this.y}] li[data=${this.x}]`)
        .removeClass(`${this.color}`);
      $(`ul[data=${this.y}] li[data=${this.x}]`)
        .attr('empty', 'true');
    }

    equals(coord) {
      return (this.y === coord.y) && (this.x === coord.x);
    }

    empty() {
      return ($(`ul[data=${this.y}]
        li[data=${this.x}]`)
        .attr('empty') === "true");
    }

    inBounds() {
      return (this.x >= 0 && this.x <= 9 && this.y >= 0 && this.y <= 19);
    }

}

module.exports = Coord;
