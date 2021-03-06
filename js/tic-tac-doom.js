$(document).ready(function () {
  var horiz, vert, diag, board, remainingSpots, canMove;
  var pcPiece = 'X';
  var npcPiece = 'O';

  clearBoard();

  $('#reset').click(clearBoard);

  $('button').click(function () {
    var index = parseInt($(this).attr('id'));

    // If the spot is taken, do nothing
    if (board[index] !== '' || !canMove) return;

    if (updateBoard(pcPiece, index)) return;

    canMove = false;
    setTimeout(npcMove, 500);
  });

  function npcMove() {
    var index = npcPickIndex();

    if (updateBoard(npcPiece, index)) return;

    canMove = true;
  }

  function npcPickIndex() {

    if (remainingSpots.length <= 0)
      throw 'No free index available!';

    // TODO make intelligent
    return remainingSpots[Math.floor(Math.random() * remainingSpots.length)];
  }

  function updateBoard(piece, index) {
    board[index] = piece;
    $('#' + index).html(piece);
    remainingSpots.splice(remainingSpots.indexOf(index), 1);

    var hIndex = piece + (index % 3);
    horiz[hIndex]++;

    var vIndex = piece + Math.floor(index / 3);
    vert[vIndex]++;

    var diagCount = getMaxDiagCount(piece);

    // check for win condition
    if (horiz[hIndex] > 2 ||
      vert[vIndex] > 2 ||
      diagCount > 2) {

      gameComplete(piece);
      return true;
    }

    // check for a draw
    if (remainingSpots.length <= 0) {
      gameComplete(null);
      return true;
    }

    return false; // win condition unmet
  }

  function getMaxDiagCount(piece) {
    var left = 0;
    var right = 0;

    if (board[0] === piece)
      left++;
    if (board[2] === piece)
      right++;

    if (board[4] === piece) {
      left++;
      right++;
    }

    if (board[6] === piece)
      right++;
    if (board[8] === piece)
      left++;

    return left > right ? left : right;
  }

  function gameComplete(npcPiece) {
    canMove = false;
  }

  function clearBoard() {
    canMove = true;

    horiz = {
      'X0': 0,
      'X1': 0,
      'X2': 0,

      'O0': 0,
      'O1': 0,
      'O2': 0
    };

    vert = {
      'X0': 0,
      'X1': 0,
      'X2': 0,

      'O0': 0,
      'O1': 0,
      'O2': 0
    };

    diag = {
      'X0': 0,
      'X1': 0,

      'O0': 0,
      'O1': 0,
    };

    board = [
      '', '', '',
      '', '', '',
      '', '', ''
    ];

    remainingSpots = [board.length];

    for (var k = 0; k < board.length; k++) {
      $('#' + k).html('');
      remainingSpots[k] = k;
    }
  }
});