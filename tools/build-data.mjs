// Generator for app/data/trophies.json — run it, never hand-edit the output.
// It merges three inputs:
//   1. the kit starter's official list (name, description, grade for 55 ids),
//   2. the forecast kit's official case file (the `secret` flag per id),
//   3. this entry's own curation in tools/curation.mjs (kind, stage, missable,
//      guide, steps, sources).
// It refuses to write anything unless the merge is exact: 55 trophies, names
// and grades agreeing across both kits, every curation field present, every
// guide at least 275 characters, 2-4 steps and 2-4 sources per trophy, the
// grade split 1 platinum / 2 gold / 6 silver / 46 bronze and 28 secret flags.
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { CURATION } from './curation.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const repo = join(here, '..');
const workspace = join(repo, '..', '..', '..');

const starterPath = join(
  workspace,
  'makefun/work/gta6-trophy-guide/kitref/gta6-trophy-guide-01-kit/starter/app/data/trophies.json',
);
const casePath = join(
  workspace,
  'makefun/kits-fresh/gta6-trophy-rarity-forecast-01-1119/gta6-trophy-rarity-forecast-01-kit/input/p00.in',
);

const starter = JSON.parse(readFileSync(starterPath, 'utf8'));
const caseFile = JSON.parse(readFileSync(casePath, 'utf8'));

function fail(message) {
  console.error(`build-data: ${message}`);
  process.exit(1);
}

if (!Array.isArray(starter.trophies) || starter.trophies.length !== 55) {
  fail('starter list does not hold 55 trophies');
}
if (!Array.isArray(caseFile.trophies) || caseFile.trophies.length !== 55) {
  fail('case file does not hold 55 trophies');
}

const secretById = new Map(caseFile.trophies.map((t) => [t.id, t.secret]));

const trophies = starter.trophies.map((base) => {
  const fromCase = caseFile.trophies.find((t) => t.id === base.id);
  if (!fromCase) fail(`id ${base.id} missing from the case file`);
  if (fromCase.name !== base.name) fail(`id ${base.id}: name differs between kits`);
  if (fromCase.description !== base.description) fail(`id ${base.id}: description differs between kits`);
  if (fromCase.tier !== base.grade) fail(`id ${base.id}: grade differs between kits`);
  const c = CURATION[base.id];
  if (!c) fail(`id ${base.id}: no curation entry`);
  if (typeof c.guide !== 'string' || c.guide.length < 275) fail(`id ${base.id}: guide under 275 chars`);
  if (!Array.isArray(c.steps) || c.steps.length < 2 || c.steps.length > 4) fail(`id ${base.id}: steps must be 2-4`);
  if (!Array.isArray(c.sources) || c.sources.length < 2 || c.sources.length > 4) fail(`id ${base.id}: sources must be 2-4`);
  return {
    id: base.id,
    name: base.name,
    description: base.description,
    grade: base.grade,
    secret: secretById.get(base.id),
    kind: c.kind,
    stage: c.stage,
    missable: c.missable,
    guide: c.guide,
    steps: c.steps,
    sources: c.sources,
  };
});

const gradeCount = {};
for (const t of trophies) gradeCount[t.grade] = (gradeCount[t.grade] || 0) + 1;
if (gradeCount.platinum !== 1 || gradeCount.gold !== 2 || gradeCount.silver !== 6 || gradeCount.bronze !== 46) {
  fail(`grade split is wrong: ${JSON.stringify(gradeCount)}`);
}
const secretCount = trophies.filter((t) => t.secret).length;
if (secretCount !== 28) fail(`expected 28 secret trophies, got ${secretCount}`);

const doc = {
  game: 'Grand Theft Auto VI',
  platform: 'PlayStation 5',
  about:
    'Leonida Platinum Companion data. Names, descriptions and grades are the official PlayStation list as published via Exophase and PSNProfiles; secret flags come from the official case files for the same ids. Kind, roadmap stage, steps and guides are this entry\'s own curation, derived from the official descriptions. No missable is confirmed by any official description; ids 44 and 48 are flagged "inferred" as a watch-list judgement and labelled that way everywhere.',
  trophies,
};

const outPath = join(repo, 'app/data/trophies.json');
// Compact JSON on purpose: the readable source of this data is curation.mjs,
// and a lean data file keeps the app's first load small.
writeFileSync(outPath, `${JSON.stringify(doc)}\n`);
console.log(`build-data: wrote ${outPath} (${trophies.length} trophies, ${secretCount} secret)`);
