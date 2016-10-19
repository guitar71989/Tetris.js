## Tetris

### Background

Tetris is a tile-matching puzzle game.  The original Tetris is a 1-player
game that plays out on a rectangular grid.  

The board's grid start off empty as game pieces (four-square blocks also
known as "tetriminos") fall from the top of the board one-by-one until
they land on the bottom of the grid or on top of another piece.

The player can move position the "tetriminos" to the left or right, as
well as rotate them 90 degrees - whichever way they see fit. If an entire
horizontal row of the grid is filled in, then that row will disappear from
the grid, and all of the pieces resting on top of it will move down to
take its place.

As the game progresses, Tetris pieces move down the board with increasing
pace.

The game is over when new pieces are unable to enter the board (i.e.
Tetris pieces reach the board to the top).

### Functionality & MVP  

With this version of Tetris, users will be able to:

- [ ] Start, pause, and reset the game board
- [ ] Position and rotate "tetriminos" as they move down the board
- [ ] Review game instructions
- [ ] Review game leaderboard

### Wireframes

This app will consist of a single screen with game board, game controls,
and nav links to the Github and my LinkedIn.  

Game controls will include Start, Stop, and Reset buttons as well as buttons
to manipulate the "tetriminos" from side-to-side and 90-degress.

[wireframes][wireframes]

### Architecture and Technologies

This project will be implemented with the following technologies:

- Vanilla JavaScript and `jQuery` for overall structure and game logic,
- Webpack to bundle and serve up the various scripts.

In addition to the webpack entry file, there will be three scripts involved in this project:

`board.js`: this script will handle the logic for creating and updating the necessary "tetrimino" objects elements and rendering them to the DOM.

`tetrimino.js`: this lightweight script will house the constructor and update functions for the `Tetrimino` objects.  Each `Tetrimino` will contain a `type` () and a 2D array of cells.

### Implementation Timeline

**Day 1**: Setup all necessary Node modules, including getting webpack up and running.  Create `webpack.config.js` as well as `package.json`.  Write a basic entry file and the bare bones of all 3 scripts outlined above.  Build the static board and buttons. Goals for the day:

- Get a green bundle with `webpack`
- Render a basic outline of the board

**Day 2**: First, build out the `Tetrimino` object to connect to the `Board` object.  Then, use `board.js` to create and render at least one shape, ideally all 3 "tetrimino" types. Goals for the day:

- Complete the `tetrimino.js` module (constructor, update functions)
- Make each cell in the grid clickable, toggling the state of the square on click
- Do the same for triangular and hexagonal grids

**Day 3**: Buildout the multi-shape logic on the board. Incorporate logic for
clearing out a horizontal row, placing shapes on top of each other, counting lines.
Goals for the day:

- Export an `Tetrimino` object with correct type and handling logic
- Have a functional grid on the frontend that correctly handles different shapes on the board


**Day 4**: Install the controls for the user to interact with the game.  Style the frontend, making it polished and professional.  Goals for the day:

- Create controls for game speed, stop, start, reset, and shape type
- Have a styled board, nice looking controls and title


### Bonus features

- [ ] Add leaderboard
- [ ] Add different color palates
- [ ] Explore head-to-head competition
