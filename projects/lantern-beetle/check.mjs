#!/usr/bin/env node
/**
 * Lantern Beetle — the measurement.
 *
 * Drives the real game model from outside the browser and fails loudly. Checks 1
 * to 8 are defined in `specs/model/grid.spec.md`, section 4.
 *
 *   node check.mjs            the game's own position. The beetle must be able to
 *                             reach the lantern by legal moves, so this run must
 *                             exit 0.
 *   node check.mjs --blocked  a walled harness scenario the game can never
 *                             produce. The lantern must be reported unreachable,
 *                             so this run must exit non-zero. It is the proof
 *                             that the measurement can fail.
 *
 * No browser, no server, no dependencies.
 */
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const LanternBeetle = require('./logic.js');

const blockedRun = process.argv.includes('--blocked');
const scenarioName = blockedRun ? 'blocked' : 'default';

/** A full wall across row 1 of an 8x8 grid seals the beetle's start in row 0. */
function blockedScenario() {
  const { rows, cols, beetle, lantern } = LanternBeetle.DEFAULT_OPTIONS;
  const blocked = [];
  for (let col = 0; col < cols; col += 1) blocked.push({ row: 1, col });
  return { rows, cols, beetle, lantern, blocked };
}

function defaultScenario() {
  const { rows, cols, beetle, lantern } = LanternBeetle.DEFAULT_OPTIONS;
  return { rows, cols, beetle, lantern, blocked: [] };
}

const results = [];
const arrivals = { applied: 0 };

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function deepEqual(left, right, message) {
  const a = JSON.stringify(left);
  const b = JSON.stringify(right);
  assert(a === b, `${message} — expected ${b}, got ${a}`);
}

function check(number, name, run) {
  try {
    const detail = run();
    results.push({ ok: true, number, name, detail: detail || '' });
  } catch (error) {
    results.push({
      ok: false,
      number,
      name,
      detail: error && error.message ? error.message : String(error)
    });
  }
}

check(1, 'load', () => {
  assert(LanternBeetle, 'logic.js exported nothing');
  for (const member of ['createGame', 'canReach', 'DEFAULT_OPTIONS']) {
    assert(typeof LanternBeetle[member] === 'function' || typeof LanternBeetle[member] === 'object',
      `the model API is missing ${member}`);
  }
  return 'the model loads under Node with createGame, canReach and DEFAULT_OPTIONS';
});

check(2, 'start state', () => {
  const game = LanternBeetle.createGame();
  const state = game.state();
  deepEqual(state.beetle, { row: 0, col: 0 }, 'the beetle starts at the top-left cell');
  deepEqual(state.lantern, { row: 5, col: 6 }, 'the lantern glows at (5,6)');
  assert(state.won === false, 'a fresh game is not won');
  assert(state.moves === 0, 'a fresh game has counted no moves');
  assert(state.status === 'idle', `a fresh game is idle, got ${state.status}`);
  assert(state.rows === 8 && state.cols === 8, 'the grid is 8x8 by default');
  return '8x8, beetle (0,0), lantern (5,6), won false, moves 0, status idle';
});

check(3, 'one step per move', () => {
  const game = LanternBeetle.createGame();
  const before = game.state();
  const right = game.move('right');
  deepEqual(right.beetle, { row: 0, col: 1 }, 'right moves one column');
  assert(right.moves === 1, `moves should be 1, got ${right.moves}`);
  const down = game.move('down');
  deepEqual(down.beetle, { row: 1, col: 1 }, 'down moves one row');
  const left = game.move('left');
  deepEqual(left.beetle, { row: 1, col: 0 }, 'left moves one column back');
  const up = game.move('up');
  deepEqual(up.beetle, { row: 0, col: 0 }, 'up moves one row back');
  assert(up.moves === 4, `moves should be 4, got ${up.moves}`);
  assert(before.moves === 0, 'the earlier snapshots are copies, not views');
  let refused = null;
  try {
    game.move('sideways');
  } catch (error) {
    refused = error.reason;
  }
  assert(refused === 'unknown direction', `an unknown direction must be refused, got ${refused}`);
  return 'each direction moves exactly one cell, one move counted each, unknown directions refused';
});

check(4, 'blocked edges', () => {
  const game = LanternBeetle.createGame();
  const before = game.state();
  const afterUp = game.move('up');
  deepEqual(afterUp, before, 'moving up from row 0 must change nothing');
  const afterLeft = game.move('left');
  deepEqual(afterLeft, before, 'moving left from column 0 must change nothing');
  const walk = (directions) => {
    let state = game.state();
    for (const direction of directions) state = game.move(direction);
    return state;
  };
  const corner = walk([
    'down', 'down', 'down', 'down', 'down',
    'right', 'right', 'right', 'right', 'right', 'right'
  ]);
  assert(corner.won === true, 'the walk to the lantern should have won');
  const frozen = game.move('up');
  assert(frozen.moves === corner.moves, 'a move after the win must not count');
  return 'edges block silently, the state is untouched, and the win stops further moves';
});

check(5, 'win by arrival', () => {
  const game = LanternBeetle.createGame();
  const { lantern } = game.state();
  let applied = 0;
  let wonAt = null;

  const step = (direction) => {
    const wasWon = game.state().won;
    const next = game.move(direction);
    applied += 1;
    if (!wasWon && next.won) wonAt = applied;
    return next;
  };

  for (let row = 0; row < lantern.row; row += 1) {
    const state = step('down');
    const isLast = row === lantern.row - 1;
    if (!isLast) assert(state.won === false, 'the game was won before reaching the lantern');
  }
  for (let col = 0; col < lantern.col; col += 1) {
    const state = step('right');
    const isLast = col === lantern.col - 1;
    if (!isLast) assert(state.won === false, 'the game was won before reaching the lantern');
  }

  const final = game.state();
  assert(final.won === true, 'the beetle stands on the lantern but won is false');
  deepEqual(final.beetle, final.lantern, 'the beetle should end on the lantern cell');
  assert(wonAt === applied, `won fired after ${wonAt} of ${applied} accepted moves, not on the last`);
  assert(final.moves === applied, `moves is ${final.moves}, expected ${applied}`);

  const walk = game.move('right');
  deepEqual(walk, final, 'winning is absorbing');

  arrivals.applied = applied;
  return `reached the lantern at (${lantern.row},${lantern.col}) in ${applied} accepted moves; won fired exactly on the last`;
});

check(6, 'win freeze', () => {
  const game = LanternBeetle.createGame();
  for (let i = 0; i < 5; i += 1) game.move('down');
  for (let i = 0; i < 6; i += 1) game.move('right');
  const won = game.state();
  assert(won.won === true, 'the setup for this check must win first');
  for (const direction of ['up', 'down', 'left', 'right']) {
    deepEqual(game.move(direction), won, `a move after the win (${direction}) must change nothing`);
  }
  assert(game.state().won === true, 'won must never return to false');
  return 'four directions after the win leave the state deeply equal to the won state';
});

check(7, 'reachability', () => {
  const scenario = blockedRun ? blockedScenario() : defaultScenario();
  const result = LanternBeetle.canReach(scenario);
  const target = `(${scenario.lantern.row},${scenario.lantern.col})`;
  const start = `(${scenario.beetle.row},${scenario.beetle.col})`;

  assert(
    result.reachable,
    `the lantern at ${target} is NOT reachable from the beetle at ${start} by legal moves — ` +
      `${result.cellsVisited} of ${scenario.rows * scenario.cols} cells reachable` +
      (scenario.blocked.length ? `, ${scenario.blocked.length} cells walled` : '')
  );

  if (!blockedRun) {
    assert(
      result.distance === arrivals.applied,
      `the search found a path of ${result.distance} moves, but the walk needed ${arrivals.applied}`
    );
    return `the beetle at ${start} can reach the lantern at ${target} in ${result.distance} legal moves (shortest path), matching the walk in check 5`;
  }
  return `the beetle at ${start} can reach the lantern at ${target} in ${result.distance} legal moves`;
});

check(8, 'setup errors', () => {
  const cases = [
    ['invalid grid size', { rows: 1 }],
    ['invalid grid size', { cols: 2.5 }],
    ['outside the grid', { beetle: { row: 8, col: 0 } }],
    ['outside the grid', { lantern: { row: -1, col: 0 } }],
    ['beetle starts on the lantern', { beetle: { row: 0, col: 0 }, lantern: { row: 0, col: 0 } }]
  ];

  for (const [reason, options] of cases) {
    let caught = null;
    try {
      LanternBeetle.createGame(options);
    } catch (error) {
      caught = error.reason;
    }
    assert(
      caught === reason,
      `${JSON.stringify(options)} must be refused with "${reason}", got ${caught === null ? 'no error at all' : `"${caught}"`}`
    );
  }

  const other = LanternBeetle.createGame({ rows: 3, cols: 4, beetle: { row: 2, col: 3 }, lantern: { row: 0, col: 0 } });
  assert(other.state().rows === 3 && other.state().cols === 4, 'a valid setup other than the default must build');

  return `${cases.length} impossible setups refused with their named reason; a valid 3x4 setup still builds`;
});

const failed = results.filter((result) => !result.ok);
const width = Math.max(...results.map((result) => result.name.length));

console.log('Lantern Beetle — measurement');
console.log(`scenario: ${scenarioName}`);
console.log(
  blockedRun
    ? 'expects:   the lantern is walled off, so this run must exit non-zero'
    : 'expects:   the beetle can reach the lantern, so this run must exit 0'
);
console.log('');

for (const result of results) {
  const label = result.name.padEnd(width, ' ');
  console.log(`${result.ok ? 'ok  ' : 'FAIL'}  ${result.number} ${label}  ${result.detail}`);
}

console.log('');
console.log(`measured: ${results.length - failed.length} ok, ${failed.length} FAIL`);

if (failed.length > 0) {
  console.log(
    blockedRun
      ? 'exit: 1 — the path is blocked, exactly as this scenario requires; the measurement can fail'
      : 'exit: 1 — the primary workflow is broken'
  );
  process.exit(1);
}

console.log('exit: 0 — the beetle can reach the lantern by legal moves');
