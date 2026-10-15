/**
 * Lantern Beetle — the game model.
 *
 * Pure rules: no DOM, no browser API, no network, no timers.
 *
 * This file is a classic script on purpose. Browsers refuse ES modules over
 * `file://`, and the brief requires opening the page with no server; Node can
 * still require the very same file, which is what lets the measurement prove the
 * beetle can reach the lantern with no build step. See
 * `specs/pages/play.spec.md`, section 4, and `specs/model/grid.spec.md`.
 */
(function (root, factory) {
  'use strict';
  var api = factory();
  root.LanternBeetle = api;
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  var DEFAULT_OPTIONS = Object.freeze({
    rows: 8,
    cols: 8,
    beetle: Object.freeze({ row: 0, col: 0 }),
    lantern: Object.freeze({ row: 5, col: 6 })
  });

  var DIRECTIONS = Object.freeze({
    up: Object.freeze({ row: -1, col: 0 }),
    down: Object.freeze({ row: 1, col: 0 }),
    left: Object.freeze({ row: 0, col: -1 }),
    right: Object.freeze({ row: 0, col: 1 })
  });

  function refuse(reason, detail) {
    var error = new Error(detail ? reason + ': ' + detail : reason);
    error.reason = reason;
    return error;
  }

  function isCell(value) {
    return !!value && Number.isInteger(value.row) && Number.isInteger(value.col);
  }

  function inside(cell, rows, cols) {
    return (
      isCell(cell) &&
      cell.row >= 0 &&
      cell.row < rows &&
      cell.col >= 0 &&
      cell.col < cols
    );
  }

  function sameCell(a, b) {
    return a.row === b.row && a.col === b.col;
  }

  function cellKey(row, col) {
    return row + ',' + col;
  }

  function createGame(options) {
    var opts = options || {};
    var rows = opts.rows === undefined ? DEFAULT_OPTIONS.rows : opts.rows;
    var cols = opts.cols === undefined ? DEFAULT_OPTIONS.cols : opts.cols;
    var beetle = opts.beetle === undefined ? DEFAULT_OPTIONS.beetle : opts.beetle;
    var lantern = opts.lantern === undefined ? DEFAULT_OPTIONS.lantern : opts.lantern;

    if (!Number.isInteger(rows) || !Number.isInteger(cols) || rows < 2 || cols < 2) {
      throw refuse(
        'invalid grid size',
        'rows and cols must be whole numbers of at least 2, got ' + rows + ' x ' + cols
      );
    }
    if (!inside(beetle, rows, cols) || !inside(lantern, rows, cols)) {
      throw refuse(
        'outside the grid',
        'the beetle and the lantern must stand inside ' + rows + ' x ' + cols
      );
    }
    if (sameCell(beetle, lantern)) {
      throw refuse('beetle starts on the lantern', 'the lantern must glow on another cell');
    }

    var start = {
      rows: rows,
      cols: cols,
      beetle: { row: beetle.row, col: beetle.col },
      lantern: { row: lantern.row, col: lantern.col }
    };
    var current = freshState();

    function freshState() {
      return {
        beetle: { row: start.beetle.row, col: start.beetle.col },
        won: false,
        moves: 0
      };
    }

    function state() {
      return {
        rows: start.rows,
        cols: start.cols,
        beetle: { row: current.beetle.row, col: current.beetle.col },
        lantern: { row: start.lantern.row, col: start.lantern.col },
        won: current.won,
        moves: current.moves,
        status: current.won ? 'won' : current.moves === 0 ? 'idle' : 'playing'
      };
    }

    function move(direction) {
      if (!Object.prototype.hasOwnProperty.call(DIRECTIONS, direction)) {
        throw refuse(
          'unknown direction',
          'expected up, down, left or right, got ' + String(direction)
        );
      }
      if (current.won) {
        return state();
      }
      var delta = DIRECTIONS[direction];
      var destination = {
        row: current.beetle.row + delta.row,
        col: current.beetle.col + delta.col
      };
      if (!inside(destination, start.rows, start.cols)) {
        return state();
      }
      current.beetle = destination;
      current.moves += 1;
      if (sameCell(destination, start.lantern)) {
        current.won = true;
      }
      return state();
    }

    function reset() {
      current = freshState();
      return state();
    }

    return Object.freeze({ state: state, move: move, reset: reset });
  }

  /**
   * Breadth-first search over walkable cells.
   *
   * `blocked` is a list of cells that may not be entered. It defaults to empty and
   * the game never passes walls; the measurement uses it to show that a blocked
   * path is detected rather than assumed away.
   */
  function canReach(options) {
    var opts = options || {};
    var rows = opts.rows === undefined ? DEFAULT_OPTIONS.rows : opts.rows;
    var cols = opts.cols === undefined ? DEFAULT_OPTIONS.cols : opts.cols;
    var from = opts.beetle === undefined ? DEFAULT_OPTIONS.beetle : opts.beetle;
    var to = opts.lantern === undefined ? DEFAULT_OPTIONS.lantern : opts.lantern;
    var blocked = opts.blocked || [];

    var walls = Object.create(null);
    var i;
    for (i = 0; i < blocked.length; i += 1) {
      walls[cellKey(blocked[i].row, blocked[i].col)] = true;
    }

    if (!inside(from, rows, cols) || !inside(to, rows, cols) || walls[cellKey(to.row, to.col)]) {
      return { reachable: false, distance: null, cellsVisited: 0 };
    }

    var seen = Object.create(null);
    var queue = [{ row: from.row, col: from.col, distance: 0 }];
    var visited = 0;
    seen[cellKey(from.row, from.col)] = true;

    while (queue.length > 0) {
      var cell = queue.shift();
      visited += 1;

      if (cell.row === to.row && cell.col === to.col) {
        return { reachable: true, distance: cell.distance, cellsVisited: visited };
      }

      for (var name in DIRECTIONS) {
        var delta = DIRECTIONS[name];
        var nextRow = cell.row + delta.row;
        var nextCol = cell.col + delta.col;
        var key = cellKey(nextRow, nextCol);
        if (nextRow < 0 || nextRow >= rows || nextCol < 0 || nextCol >= cols) continue;
        if (walls[key] || seen[key]) continue;
        seen[key] = true;
        queue.push({ row: nextRow, col: nextCol, distance: cell.distance + 1 });
      }
    }

    return { reachable: false, distance: null, cellsVisited: visited };
  }

  return Object.freeze({
    createGame: createGame,
    canReach: canReach,
    DEFAULT_OPTIONS: DEFAULT_OPTIONS
  });
});
