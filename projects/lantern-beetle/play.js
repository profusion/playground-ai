/**
 * Lantern Beetle — the page wiring.
 *
 * Turns arrow-key presses into model moves and draws whatever the model reports.
 * This file owns no rules: every decision about the grid, the beetle, the lantern,
 * and the win belongs to logic.js.
 *
 * See `specs/pages/play.spec.md`.
 */
(function () {
  'use strict';

  var ARROW_DIRECTIONS = Object.freeze({
    ArrowUp: 'up',
    ArrowDown: 'down',
    ArrowLeft: 'left',
    ArrowRight: 'right'
  });

  /* The model reports these reasons; the page says them in plain words. */
  var PLAIN_REASONS = Object.freeze({
    'invalid grid size': 'The grid is too small to light. (invalid grid size)',
    'outside the grid': 'The lantern must glow inside the grid. (outside the grid)',
    'beetle starts on the lantern': 'The lantern and the beetle cannot share a cell.'
  });

  var board = document.getElementById('board');
  var status = document.getElementById('status');
  var beetle = document.getElementById('beetle');
  var lantern = document.getElementById('lantern');

  /* One visible failure state: never a silent dark page that swallows keys. */
  function showError(message) {
    if (status) {
      status.textContent = message;
      status.dataset.state = 'error';
    }
    if (board) board.dataset.state = 'error';
  }

  var model = typeof globalThis !== 'undefined' ? globalThis.LanternBeetle : undefined;
  if (!model || typeof model.createGame !== 'function') {
    showError('The lantern failed to light.');
    return;
  }
  if (!board || !status || !beetle || !lantern) {
    showError('The lantern failed to light.');
    return;
  }

  var game;
  try {
    game = model.createGame();
  } catch (error) {
    var reason = error && error.reason;
    showError(PLAIN_REASONS[reason] || (error && error.message) || 'The lantern failed to light.');
    return;
  }

  var start = game.state();
  board.style.setProperty('--rows', String(start.rows));
  board.style.setProperty('--cols', String(start.cols));

  /* The cells are built once, at startup. A move repaints at most two pieces. */
  for (var row = 0; row < start.rows; row += 1) {
    for (var col = 0; col < start.cols; col += 1) {
      var cell = document.createElement('div');
      cell.className = 'cell';
      cell.setAttribute('aria-hidden', 'true');
      board.appendChild(cell);
    }
  }

  function place(piece, position) {
    piece.style.left = ((position.col * 100) / start.cols) + '%';
    piece.style.top = ((position.row * 100) / start.rows) + '%';
  }

  place(lantern, start.lantern);
  place(beetle, start.beetle);

  var HINT_TEXT = 'Use the arrow keys to find the lantern.';
  var WIN_TEXT = 'You found the lantern. Press R to play again.';

  var finished = start.won;

  /* The won board is not a dead end: R begins a fresh run, with no reload. */
  function restart() {
    var next = game.reset();
    finished = false;
    board.classList.remove('won');
    delete board.dataset.state;
    status.textContent = HINT_TEXT;
    delete status.dataset.state;
    place(beetle, next.beetle);
    place(lantern, next.lantern);
  }

  document.addEventListener('keydown', function (event) {
    var direction = ARROW_DIRECTIONS[event.key];

    if (finished) {
      if (event.key === 'r' || event.key === 'R') {
        restart();
      } else if (direction) {
        event.preventDefault();  /* arrows still must not scroll the won page */
      }
      return;
    }

    if (!direction) return;      /* any other key is left to the page */
    event.preventDefault();      /* arrow keys must never scroll the page */

    var next = game.move(direction);
    place(beetle, next.beetle);

    if (next.won) {
      finished = true;
      board.classList.add('won');
      board.dataset.state = 'won';
      status.textContent = WIN_TEXT;
      status.dataset.state = 'won';
    }
    /* A blocked move changes nothing, so the hint line stays as it was. */
  });
})();
