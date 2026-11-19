// Leonida Platinum Companion — entry program (Node 22, standard library only).
//
// The guide itself is the static app/ folder beside this file: plain HTML,
// CSS and ES modules plus app/data/trophies.json, opening offline in a
// browser with no build step. This program hands the entry in — it copies
// app/ and screenshots/ into the output directory and writes dossier.json
// there with the kit's vendored library (vendor/makefun-frontend.ts, kept
// byte for byte as the kit ships it, because the scorer rebuilds the
// dossier with its own copy and compares).
//
// Run it locally the same way the grader does, with the output redirected:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const repoRoot = fileURLToPath(new URL('.', import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(outputDir, { recursive: true });
cpSync(join(repoRoot, 'app'), join(outputDir, 'app'), { recursive: true });

mkdirSync(join(outputDir, 'screenshots'), { recursive: true });
const shotsDir = join(repoRoot, 'screenshots');
if (existsSync(shotsDir)) {
  cpSync(shotsDir, join(outputDir, 'screenshots'), { recursive: true });
}

// The caps passed here mirror the scorer's own limits for this competition
// (dossier text cap, at most 4 screenshots of at most 256 KiB each, app/
// at most 993 entries and 48 MiB), so an entry the scorer would refuse is
// refused here first, with the library's own words.
const dossier = buildDossier(outputDir, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 50331648,
});
writeFileSync(join(outputDir, 'dossier.json'), dossier);

// A one-line receipt on stdout (never part of the handed-in bytes): handy
// when running by hand to confirm the dossier was written and how large
// the judge's summary is.
console.log(`Leonida Platinum Companion handed in: dossier.json ${dossier.length} bytes -> ${outputDir}`);
