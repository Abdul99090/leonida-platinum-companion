// Contract tests for Leonida Platinum Companion.
// Run: node --test tests/logic.test.mjs
// They pin the behaviours the guide promises: the data matches the official
// list exactly, every guide is complete and cited, filters compose, spoiler
// masking hides everything it should, progress maths is exact, export/import
// round-trips and rejects garbage, and the roadmap covers all 55 in order.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  filterTrophies,
  displayTrophy,
  roadmapLabel,
  progressOf,
  roadmapGroups,
  exportProgress,
  importProgress,
  isFlagged,
  ROADMAP_STAGES,
} from '../app/src/logic.js';

const here = dirname(fileURLToPath(import.meta.url));
const repo = join(here, '..');
const workspace = join(repo, '..', '..', '..');
const data = JSON.parse(readFileSync(join(repo, 'app/data/trophies.json'), 'utf8'));
const official = JSON.parse(
  readFileSync(
    join(workspace, 'makefun/work/gta6-trophy-guide/kitref/gta6-trophy-guide-01-kit/starter/app/data/trophies.json'),
    'utf8',
  ),
);
const trophies = data.trophies;
const baseState = {
  kind: 'all', grade: 'all', query: '', missableOnly: false,
  hideEarned: false, spoilers: false, earned: new Set(),
};

test('data integrity: all 55 trophies match the official list exactly', () => {
  assert.equal(trophies.length, 55);
  assert.equal(official.trophies.length, 55);
  for (const off of official.trophies) {
    const mine = trophies.find((t) => t.id === off.id);
    assert.ok(mine, `id ${off.id} present`);
    assert.equal(mine.name, off.name);
    assert.equal(mine.description, off.description);
    assert.equal(mine.grade, off.grade);
  }
  const grades = {};
  for (const t of trophies) grades[t.grade] = (grades[t.grade] || 0) + 1;
  assert.deepEqual(grades, { platinum: 1, gold: 2, silver: 6, bronze: 46 });
  assert.equal(trophies.filter((t) => t.secret).length, 28);
});

test('guides complete: every trophy has a real guide, steps and named sources', () => {
  for (const t of trophies) {
    assert.ok(typeof t.guide === 'string' && t.guide.length >= 275, `id ${t.id} guide length`);
    assert.notEqual(t.guide.trim(), t.description.trim(), `id ${t.id} guide must not repeat the description`);
    assert.ok(Array.isArray(t.steps) && t.steps.length >= 2 && t.steps.length <= 4, `id ${t.id} steps`);
    assert.ok(Array.isArray(t.sources) && t.sources.length >= 2 && t.sources.length <= 4, `id ${t.id} sources`);
    for (const s of t.sources) assert.ok(s.length > 10, `id ${t.id} source named`);
    assert.ok(['story', 'collectibles', 'activities', 'completion'].includes(t.kind), `id ${t.id} kind`);
  }
  const flagged = trophies.filter((t) => isFlagged(t)).map((t) => t.id);
  assert.deepEqual(flagged, [44, 48]);
  for (const t of trophies) {
    if (t.id === 44 || t.id === 48) assert.equal(t.missable, 'inferred');
    else assert.equal(t.missable, false);
  }
});

test('filters compose: kind, grade, search, missable-only and hide-earned together', () => {
  assert.equal(filterTrophies(trophies, baseState).length, 55);
  const story = filterTrophies(trophies, { ...baseState, kind: 'story' });
  assert.ok(story.length > 0 && story.every((t) => t.kind === 'story'));
  const silver = filterTrophies(trophies, { ...baseState, grade: 'silver' });
  assert.equal(silver.length, 6);
  const storyBronze = filterTrophies(trophies, { ...baseState, kind: 'story', grade: 'bronze' });
  assert.ok(storyBronze.every((t) => t.kind === 'story' && t.grade === 'bronze'));
  assert.ok(storyBronze.length < story.length);
  const byName = filterTrophies(trophies, { ...baseState, query: 'cunning stunts' });
  assert.deepEqual(byName.map((t) => t.id), [15]);
  const flaggedOnly = filterTrophies(trophies, { ...baseState, missableOnly: true });
  assert.deepEqual(flaggedOnly.map((t) => t.id), [44, 48]);
  const earned = new Set([15, 30]);
  const remaining = filterTrophies(trophies, { ...baseState, hideEarned: true, earned });
  assert.equal(remaining.length, 53);
  assert.ok(!remaining.some((t) => t.id === 15));
  const combo = filterTrophies(trophies, {
    ...baseState, kind: 'activities', missableOnly: true, hideEarned: true, earned: new Set([44]),
  });
  assert.deepEqual(combo.map((t) => t.id), [48]);
});

test('spoiler masking: secret trophies hide name, description, guide and roadmap label until earned', () => {
  const secret = trophies.find((t) => t.id === 4);
  assert.equal(secret.secret, true);
  const hidden = displayTrophy(secret, { ...baseState, spoilers: true });
  assert.equal(hidden.masked, true);
  assert.equal(hidden.name, 'Hidden Trophy');
  assert.ok(!hidden.description.includes('Chapter 2'));
  assert.ok(!hidden.guide.includes('Chapter 2'));
  assert.deepEqual(hidden.steps, []);
  assert.equal(roadmapLabel(secret, { ...baseState, spoilers: true }), 'Hidden Trophy');
  const revealed = displayTrophy(secret, { ...baseState, spoilers: true, earned: new Set([4]) });
  assert.equal(revealed.masked, false);
  assert.equal(revealed.name, secret.name);
  const open = displayTrophy(secret, { ...baseState, spoilers: false });
  assert.equal(open.masked, false);
  const plain = trophies.find((t) => t.id === 15);
  assert.equal(displayTrophy(plain, { ...baseState, spoilers: true }).masked, false);
  const searchLeak = filterTrophies(trophies, { ...baseState, spoilers: true, query: 'drug money' });
  assert.equal(searchLeak.length, 0);
});

test('progress maths: totals, percent and per-grade counters are exact', () => {
  const none = progressOf(trophies, new Set());
  assert.deepEqual([none.earned, none.total, none.percent], [0, 55, 0]);
  const some = progressOf(trophies, new Set([1, 7, 14, 15]));
  assert.equal(some.earned, 4);
  assert.equal(some.percent, 7);
  assert.deepEqual(some.byGrade.platinum, { earned: 1, total: 1 });
  assert.deepEqual(some.byGrade.gold, { earned: 2, total: 2 });
  assert.deepEqual(some.byGrade.silver, { earned: 1, total: 6 });
  assert.deepEqual(some.byGrade.bronze, { earned: 0, total: 46 });
  const all = progressOf(trophies, new Set(trophies.map((t) => t.id)));
  assert.equal(all.percent, 100);
});

test('export/import: round-trip is lossless and garbage is rejected', () => {
  const earned = new Set([3, 15, 30, 55]);
  const text = exportProgress(earned);
  const back = importProgress(text, trophies);
  assert.equal(back.ok, true);
  assert.deepEqual([...back.earned].sort((a, b) => a - b), [3, 15, 30, 55]);
  for (const junk of ['not json', '', '{"earned":"all"}', '{"earned":[999]}', '{"earned":[3,3]}', '[1,2]']) {
    const res = importProgress(junk, trophies);
    assert.equal(res.ok, false, `rejects: ${junk}`);
    assert.ok(res.error.length > 0);
  }
  const empty = importProgress(exportProgress(new Set()), trophies);
  assert.equal(empty.ok, true);
  assert.equal(empty.earned.size, 0);
});

test('roadmap: six stages in order cover all 55 trophies exactly once', () => {
  const groups = roadmapGroups(trophies, new Set([2, 3]));
  assert.equal(groups.length, 6);
  assert.deepEqual(groups.map((g) => g.n), [1, 2, 3, 4, 5, 6]);
  assert.deepEqual(groups.map((g) => g.title), ROADMAP_STAGES.map((s) => s.title));
  const seen = groups.flatMap((g) => g.items.map((t) => t.id));
  assert.equal(seen.length, 55);
  assert.equal(new Set(seen).size, 55);
  assert.equal(groups[0].earned, 2);
  assert.equal(groups.reduce((sum, g) => sum + g.total, 0), 55);
  for (const t of trophies) assert.ok(t.stage >= 1 && t.stage <= 6);
});
