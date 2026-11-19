// Generator for app/data/trophies.json.
//
// Merges three sources, each used only for what it is authoritative for:
//   1. The kit starter's app/data/trophies.json — official name, description
//      and grade for all 55 trophies (as PlayStation publishes them).
//   2. The forecast kit's official case file p00.in — the secret (hidden)
//      flag for the same 55 ids, in the same order.
//   3. tools/curation.mjs — this entry's own guides, steps, kind, roadmap
//      stage, sources and watch-list flags, written for this entry.
//
// Output is a single compact JSON line, written to app/data/trophies.json.
// The generator refuses to emit anything if a source disagrees with another
// on a trophy's name, or if any trophy lacks a complete curation entry.

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { CURATION, EXOPHASE_LIST_URL } from './curation.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const entryRoot = join(here, '..');
const makefunRoot = join(entryRoot, '..', '..');

const starterPath = join(
  makefunRoot,
  'work/gta6-trophy-guide/kitref/gta6-trophy-guide-01-kit/starter/app/data/trophies.json',
);
const casePath = join(
  makefunRoot,
  'work/gta6-trophy-rarity/kitref/gta6-trophy-rarity-forecast-01-kit/input/p00.in',
);

const starter = JSON.parse(readFileSync(starterPath, 'utf8'));
const forecastCase = JSON.parse(readFileSync(casePath, 'utf8'));

const official = starter.trophies;
if (!Array.isArray(official) || official.length !== 55) {
  throw new Error('starter list does not hold exactly 55 trophies');
}
if (!Array.isArray(forecastCase.trophies) || forecastCase.trophies.length !== 55) {
  throw new Error('forecast case does not hold exactly 55 trophies');
}

const secretById = new Map();
for (const t of forecastCase.trophies) secretById.set(t.id, t.secret === true);

const KINDS = new Set(['story', 'collectibles', 'activities', 'completion']);

const trophies = official.map((o) => {
  const c = CURATION[o.id];
  if (!c) throw new Error(`no curation entry for trophy id ${o.id}`);
  const forecast = forecastCase.trophies.find((t) => t.id === o.id);
  if (!forecast || forecast.name !== o.name) {
    throw new Error(`name mismatch between kits for trophy id ${o.id}`);
  }
  if (!KINDS.has(c.kind)) throw new Error(`bad kind for id ${o.id}: ${c.kind}`);
  if (!Number.isInteger(c.stage) || c.stage < 1 || c.stage > 6) {
    throw new Error(`bad roadmap stage for id ${o.id}: ${c.stage}`);
  }
  if (typeof c.guide !== 'string' || c.guide.trim().length < 80) {
    throw new Error(`guide missing or under 80 chars for id ${o.id}`);
  }
  if (!Array.isArray(c.steps) || c.steps.length < 2 || c.steps.length > 4) {
    throw new Error(`steps must number 2-4 for id ${o.id}`);
  }
  if (!Array.isArray(c.sources) || c.sources.length < 2 || c.sources.length > 4) {
    throw new Error(`sources must number 2-4 for id ${o.id}`);
  }
  return {
    id: o.id,
    name: o.name,
    description: o.description,
    grade: o.grade,
    secret: secretById.get(o.id),
    kind: c.kind,
    stage: c.stage,
    missable: 'none-confirmed',
    watch: c.watch === true,
    guide: c.guide,
    steps: c.steps,
    sources: c.sources,
  };
});

const secretCount = trophies.filter((t) => t.secret).length;
if (secretCount !== 28) throw new Error(`expected 28 secret trophies, got ${secretCount}`);
const watchIds = trophies.filter((t) => t.watch).map((t) => t.id);
if (watchIds.join(',') !== '44,48') {
  throw new Error(`watch-list must be exactly ids 44 and 48, got ${watchIds.join(',')}`);
}

const doc = {
  about: {
    title: 'Leonida Platinum Companion — GTA VI trophy guide and tracker data',
    game: 'Grand Theft Auto VI',
    platform: 'PlayStation 5',
    trophies: 55,
    secretTrophies: 28,
    provenance:
      'Names, descriptions and grades are the official PlayStation list as published via Exophase (' +
      EXOPHASE_LIST_URL +
      ') and cross-checked against PSNProfiles. Secret flags come from the official forecast case files for the same 55 ids. Guides, steps, kinds and roadmap stages are original to this entry and derived from the official descriptions only.',
    missables:
      'No official description states a one-chance window, so there are no confirmed missables. Ids 44 and 48 are flagged watch:true as an INFERRED watch-list only, and are labelled as inference wherever the app shows them.',
  },
  trophies,
};

const outPath = join(entryRoot, 'app/data/trophies.json');
writeFileSync(outPath, JSON.stringify(doc));
console.log(`wrote ${outPath}: ${trophies.length} trophies, ${secretCount} secret, watch-list ${watchIds.join(' & ')}`);
