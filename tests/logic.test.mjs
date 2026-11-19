// Contract tests for the Leonida Platinum Companion.
// Run with: node --test tests/
// They pin down: data integrity against the official starter list, guide
// completeness on all 55 trophies, filter composition, spoiler masking,
// progress maths, export/import round-trip with garbage rejection, and
// roadmap coverage and order.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  STAGE_TITLES,
  displayFor,
  filterTrophies,
  isMasked,
  parseProgress,
  progressSummary,
  roadmapStages,
  serializeProgress,
} from '../app/src/logic.js';

const here = dirname(fileURLToPath(import.meta.url));
const entryRoot = join(here, '..');

const doc = JSON.parse(readFileSync(join(entryRoot, 'app/data/trophies.json'), 'utf8'));
const trophies = doc.trophies;

function findOfficial(rel) {
  const candidates = [
    join(entryRoot, '..', '..', rel),
    join(entryRoot, '..', '..', '..', 'workspace/makefun', rel),
  ];
  for (const c of candidates) if (existsSync(c)) return c;
  throw new Error('official source not found: ' + rel);
}

const starter = JSON.parse(
  readFileSync(
    findOfficial('work/gta6-trophy-guide/kitref/gta6-trophy-guide-01-kit/starter/app/data/trophies.json'),
    'utf8',
  ),
);
const forecastCase = JSON.parse(
  readFileSync(
    findOfficial('work/gta6-trophy-rarity/kitref/gta6-trophy-rarity-forecast-01-kit/input/p00.in'),
    'utf8',
  ),
);

const noFilters = { kinds: new Set(), grade: 'all', query: '', onlyWatch: false, hideEarned: false, spoilerOn: false };

test('data integrity: all 55 trophies match the official starter list', () => {
  assert.equal(trophies.length, 55);
  const byId = new Map(trophies.map((t) => [t.id, t]));
  for (const o of starter.trophies) {
    const t = byId.get(o.id);
    assert.ok(t, `missing trophy id ${o.id}`);
    assert.equal(t.name, o.name, `name mismatch id ${o.id}`);
    assert.equal(t.description, o.description, `description mismatch id ${o.id}`);
    assert.equal(t.grade, o.grade, `grade mismatch id ${o.id}`);
  }
  const grades = {};
  for (const t of trophies) grades[t.grade] = (grades[t.grade] ?? 0) + 1;
  assert.deepEqual(grades, { platinum: 1, gold: 2, silver: 6, bronze: 46 });
  // Secret flags match the official forecast case file, id by id.
  const secretById = new Map(forecastCase.trophies.map((t) => [t.id, t.secret === true]));
  for (const t of trophies) assert.equal(t.secret, secretById.get(t.id), `secret flag id ${t.id}`);
  assert.equal(trophies.filter((t) => t.secret).length, 28);
});

test('guide completeness: every trophy carries a real guide, steps and sources', () => {
  for (const t of trophies) {
    assert.ok(typeof t.guide === 'string' && t.guide.trim().length >= 80, `guide too short id ${t.id}`);
    assert.notEqual(t.guide.trim(), t.description.trim(), `guide repeats description id ${t.id}`);
    assert.ok(Array.isArray(t.steps) && t.steps.length >= 2 && t.steps.length <= 4, `steps id ${t.id}`);
    assert.ok(Array.isArray(t.sources) && t.sources.length >= 2 && t.sources.length <= 4, `sources id ${t.id}`);
    assert.ok(t.sources.some((s) => s.includes('Exophase')), `Exophase cited id ${t.id}`);
    assert.ok(['story', 'collectibles', 'activities', 'completion'].includes(t.kind), `kind id ${t.id}`);
    assert.ok(Number.isInteger(t.stage) && t.stage >= 1 && t.stage <= 6, `stage id ${t.id}`);
    assert.equal(t.missable, 'none-confirmed', `no confirmed missables id ${t.id}`);
  }
  // The watch-list is exactly the two inferred ids, and both say so in the guide.
  assert.deepEqual(trophies.filter((t) => t.watch).map((t) => t.id), [44, 48]);
  for (const t of trophies.filter((x) => x.watch)) {
    assert.ok(t.guide.includes('INFERRED'), `watch guide must label the inference id ${t.id}`);
  }
});

test('filter composition: kind, grade, search, watch-only and hide-earned combine', () => {
  const none = new Set();
  assert.equal(filterTrophies(trophies, noFilters, none).length, 55);

  const story = filterTrophies(trophies, { ...noFilters, kinds: new Set(['story']) }, none);
  assert.ok(story.length > 0 && story.every((t) => t.kind === 'story'));

  const silver = filterTrophies(trophies, { ...noFilters, grade: 'silver' }, none);
  assert.equal(silver.length, 6);

  const storySilver = filterTrophies(
    trophies,
    { ...noFilters, kinds: new Set(['story']), grade: 'silver' },
    none,
  );
  assert.ok(storySilver.every((t) => t.kind === 'story' && t.grade === 'silver'));

  const watch = filterTrophies(trophies, { ...noFilters, onlyWatch: true }, none);
  assert.deepEqual(watch.map((t) => t.id), [44, 48]);

  const searched = filterTrophies(trophies, { ...noFilters, query: 'shooting range' }, none);
  assert.deepEqual(searched.map((t) => t.id), [17]);

  const earned = new Set([17]);
  const hidden = filterTrophies(trophies, { ...noFilters, hideEarned: true }, earned);
  assert.equal(hidden.length, 54);
  assert.ok(!hidden.some((t) => t.id === 17));
});

test('spoiler masking: secret trophies hide name, description, guide and stage until earned', () => {
  const secret = trophies.find((t) => t.id === 4);
  const publicTrophy = trophies.find((t) => t.id === 15);
  const none = new Set();

  assert.equal(isMasked(secret, none, true), true);
  assert.equal(isMasked(publicTrophy, none, true), false);
  assert.equal(isMasked(secret, none, false), false);

  const masked = displayFor(secret, none, true);
  assert.equal(masked.masked, true);
  assert.equal(masked.name, 'Hidden Trophy');
  assert.ok(!masked.description.includes(secret.description));
  assert.ok(!masked.guide.includes(secret.guide));
  assert.equal(masked.stageLabel, 'Hidden stage');
  assert.deepEqual(masked.steps, []);

  const earned = new Set([4]);
  assert.equal(isMasked(secret, earned, true), false);
  assert.equal(displayFor(secret, earned, true).name, secret.name);

  // A search for a masked trophy's real name must not surface it.
  const hits = filterTrophies(trophies, { ...noFilters, query: 'drug money', spoilerOn: true }, none);
  assert.ok(!hits.some((t) => t.id === 4));
});

test('progress maths: totals, percentage and per-grade counters', () => {
  const none = new Set();
  const zero = progressSummary(trophies, none);
  assert.deepEqual([zero.earned, zero.total, zero.percent], [0, 55, 0]);

  const earned = new Set([1, 7, 14, 15, 17, 25, 30, 31]);
  const s = progressSummary(trophies, earned);
  assert.equal(s.earned, 8);
  assert.equal(s.percent, Math.round((8 / 55) * 100));
  assert.deepEqual(s.byGrade.platinum, { earned: 1, total: 1 });
  assert.deepEqual(s.byGrade.gold, { earned: 2, total: 2 });
  assert.deepEqual(s.byGrade.silver, { earned: 5, total: 6 });
  assert.deepEqual(s.byGrade.bronze, { earned: 0, total: 46 });

  const all = new Set(trophies.map((t) => t.id));
  assert.equal(progressSummary(trophies, all).percent, 100);
});

test('export/import: round-trip is exact and garbage is rejected', () => {
  const validIds = trophies.map((t) => t.id);
  const earned = new Set([3, 9, 27, 55]);
  const text = serializeProgress(earned);
  const back = parseProgress(text, validIds);
  assert.deepEqual([...back.earned].sort((a, b) => a - b), [3, 9, 27, 55]);
  assert.deepEqual(back.dropped, []);

  assert.throws(() => parseProgress('not json at all', validIds), /not valid JSON/);
  assert.throws(() => parseProgress('{"hello": true}', validIds), /does not look like/);
  assert.throws(() => parseProgress('[1,2,3]', validIds), /does not look like/);
  assert.throws(() => parseProgress('42', validIds), /does not look like/);

  const mixed = parseProgress('{"earned": [5, 5, 999, "x", 12]}', validIds);
  assert.deepEqual([...mixed.earned].sort((a, b) => a - b), [5, 12]);
  assert.deepEqual(mixed.dropped, [999, 'x']);
});

test('roadmap: six stages in order cover every trophy exactly once', () => {
  const stages = roadmapStages(trophies, new Set());
  assert.equal(stages.length, 6);
  assert.deepEqual(stages.map((s) => s.title), STAGE_TITLES);
  assert.deepEqual(stages.map((s) => s.stage), [1, 2, 3, 4, 5, 6]);

  const seen = stages.flatMap((s) => s.trophies.map((t) => t.id));
  assert.equal(seen.length, 55);
  assert.equal(new Set(seen).size, 55);

  // The platinum sits alone in the final stage.
  const last = stages[5];
  assert.deepEqual(last.trophies.map((t) => t.id), [1]);

  const withEarned = roadmapStages(trophies, new Set([2, 3]));
  assert.equal(withEarned[0].earned, 2);
  assert.equal(withEarned[0].total, withEarned[0].trophies.length);
});
