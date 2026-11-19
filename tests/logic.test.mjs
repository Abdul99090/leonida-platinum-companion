// Behaviour contracts for the Leonida Platinum Companion (TDD: these were written
// before app/src/logic.js and app/data/trophies.json existed, watched failing,
// then made to pass). Run: node --test tests/
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const data = JSON.parse(readFileSync(join(here, '..', 'app', 'data', 'trophies.json'), 'utf8'));
const official = JSON.parse(
  readFileSync('/home/hatch/workspace/makefun/work/gta6-trophy-guide/kitref/gta6-trophy-guide-01-kit/starter/app/data/trophies.json', 'utf8'),
).trophies;
const logic = await import('../app/src/logic.js');

test('data: exactly the 55 official trophies, names and grades untouched', () => {
  assert.equal(data.trophies.length, 55);
  const byId = new Map(data.trophies.map((t) => [t.id, t]));
  assert.equal(byId.size, 55);
  for (const o of official) {
    const t = byId.get(o.id);
    assert.ok(t, `missing id ${o.id}`);
    assert.equal(t.name, o.name, `name drift on id ${o.id}`);
    assert.equal(t.description, o.description, `description drift on id ${o.id}`);
    assert.equal(t.grade, o.grade, `grade drift on id ${o.id}`);
  }
  const grades = {};
  for (const t of data.trophies) grades[t.grade] = (grades[t.grade] ?? 0) + 1;
  assert.deepEqual(grades, { platinum: 1, gold: 2, silver: 6, bronze: 46 });
});

test('data: every trophy carries an authored guide, steps, sources and curation', () => {
  const kinds = new Set(['story', 'collectibles', 'activities', 'completion']);
  for (const t of data.trophies) {
    assert.ok(t.guide && t.guide.length >= 80, `guide too thin on id ${t.id}`);
    assert.ok(Array.isArray(t.steps) && t.steps.length >= 2, `steps missing on id ${t.id}`);
    assert.ok(Array.isArray(t.sources) && t.sources.length >= 2, `sources missing on id ${t.id}`);
    assert.ok(t.sources.some((s) => /Exophase|PSNProfiles/.test(s)), `no named source on id ${t.id}`);
    assert.ok(kinds.has(t.kind), `bad kind on id ${t.id}`);
    assert.equal(typeof t.secret, 'boolean', `secret flag missing on id ${t.id}`);
    assert.ok(Number.isInteger(t.stage) && t.stage >= 1 && t.stage <= 6, `bad stage on id ${t.id}`);
    if (t.missable) assert.ok(t.missableNote && /INFERRED/.test(t.missableNote), `missable without inferred note on id ${t.id}`);
  }
  assert.equal(data.trophies.filter((t) => t.secret).length, 28, 'official hidden count is 28');
});

test('filter: kind, grade, query and missable compose', () => {
  const all = data.trophies;
  assert.equal(logic.filterTrophies(all, {}).length, 55);
  assert.ok(logic.filterTrophies(all, { kind: 'story' }).every((t) => t.kind === 'story'));
  assert.equal(logic.filterTrophies(all, { grade: 'silver' }).length, 6);
  const stunt = logic.filterTrophies(all, { query: 'stunt' });
  assert.ok(stunt.some((t) => t.name === 'Cunning Stunts'));
  const miss = logic.filterTrophies(all, { missableOnly: true });
  assert.ok(miss.length >= 1 && miss.every((t) => t.missable));
  assert.equal(logic.filterTrophies(all, { query: 'zzzz-no-match' }).length, 0);
});

test('spoiler masking: secret + unearned + spoiler on hides name and description', () => {
  const secret = data.trophies.find((t) => t.secret && t.id !== 4);
  const shown = logic.displayTrophy(secret, { spoiler: true, earned: new Set() });
  assert.equal(shown.masked, true);
  assert.ok(!shown.name.includes(secret.name) || secret.name.includes('*'));
  assert.notEqual(shown.description, secret.description);
  const earnedShown = logic.displayTrophy(secret, { spoiler: true, earned: new Set([secret.id]) });
  assert.equal(earnedShown.masked, false);
  assert.equal(earnedShown.name, secret.name);
  const offShown = logic.displayTrophy(secret, { spoiler: false, earned: new Set() });
  assert.equal(offShown.masked, false);
  const open = data.trophies.find((t) => !t.secret);
  assert.equal(logic.displayTrophy(open, { spoiler: true, earned: new Set() }).masked, false);
});

test('progress: counts, per-grade counters and percent', () => {
  const p = logic.progress(data.trophies, new Set([1, 14, 15]));
  assert.equal(p.earned, 3);
  assert.equal(p.total, 55);
  assert.equal(p.perGrade.platinum.earned, 1);
  assert.equal(p.perGrade.gold.earned, 1);
  assert.equal(p.perGrade.silver.earned, 1);
  assert.equal(p.perGrade.bronze.total, 46);
  assert.equal(p.pct, Math.round((3 / 55) * 100));
  assert.equal(logic.progress(data.trophies, new Set()).pct, 0);
});

test('export/import: serialize then parse round-trips and rejects garbage', () => {
  const state = { earned: [3, 4, 15, 30], spoiler: true };
  const text = logic.serializeProgress(state);
  assert.deepEqual(logic.parseProgress(text), state);
  assert.equal(logic.parseProgress('not json'), null);
  assert.equal(logic.parseProgress('{"earned":"nope"}'), null);
  assert.deepEqual(logic.parseProgress('{"earned":[3,9999,"x",3],"spoiler":1}'), { earned: [3], spoiler: true });
});

test('roadmap: stages are ordered and cover every trophy exactly once', () => {
  const stages = logic.roadmap(data.trophies);
  assert.ok(stages.length >= 5);
  const seen = stages.flatMap((s) => s.trophies.map((t) => t.id));
  assert.equal(seen.length, 55);
  assert.equal(new Set(seen).size, 55);
  for (let i = 1; i < stages.length; i++) assert.ok(stages[i].stage > stages[i - 1].stage);
  const last = stages[stages.length - 1];
  assert.ok(last.trophies.some((t) => t.grade === 'platinum'), 'platinum closes the roadmap');
});
