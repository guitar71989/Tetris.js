# Tetris

[Play the game here][live]

[live]: https://guitar71989.github.io/Tetris.js/

## Features

A browser Tetris game implemented with Javascript, jQuery, HTML5, and
CSS3.

## Controls:

  * ← move block left
  * → move block right
  * ↑ rotate block 90 degrees clockwise
  * ↓ soft drop

## Intro Modal

Upon loading the game, an introductory modal appears with a "Play" button
and the basic game instructions. For the sake of clean code, I created
all of the modal-related html as variables using jQuery, along with a modal
function to call them. Within jQuery's version the DOMContentLoaded event
listener, I opened the modal.

Code Snippet:

![Modal Code](./screenshots/modal.png)

User View:

![Play Game Modal](./screenshots/playmodal.png)

## Game Layout

Once the user clicks play, the modal closes and a new game is started.
The board consists of three main containers: score, tetris board, and t
he next piece preview. When the game starts, I create two tetris pieces
— currentPiece and nextPiece — the nextPiece sits in the Next Piece
container while the Current Piece begins its descent to the bottom of the
tetris board. The score level and lines are all set at zero when the game
starts as well.

![Game View](./screenshots/gameview.png)

## Moving Pieces

When a user wants to move a piece, a keydown listener and switch-case
statement translates the given keycode into a move on the piece object.

To successfully move a piece, I first move the piece to the intended location,
check to see if that is a valid move, and if it is, then I complete the move.
Otherwise, the piece remains in the same position.

While moving left, right, and down, were simple changes to the y and x coordinates,
rotating pieces used vector matrix logic. Specifically, I assigned a center
block for each piece, find each blocks relative vector to this block, rotate that vector, and then translate it back to its absolute position.

To keep my code DRY, I created a Coord class to handle the movements of the individual cells within a piece as well as non-piece movements.
blocks into Javascript and a switch case

[logo]:(http://gph.is/2eEuR42) Title Text 2"


![Game View](./screenshots/gameview.png)
