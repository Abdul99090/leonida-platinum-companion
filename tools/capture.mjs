// Screenshot capture for the Leonida Platinum Companion entry.
//
// Written for this entry. It serves app/ with the repo's own serve.ts,
// opens each view declared in shots.json in a headless Chromium at
// 1280x800, waits for the app to raise window.__shotReady (the ?shot=
// staging in app/app.js makes every frame deterministic), and saves a
// JPEG into screenshots/. If a frame exceeds the competition's 256 KiB
// screenshot cap, quality steps down until it fits; the final byte sizes
// are printed so they can be checked against the cap.

import { spawn } from 'node:child_process';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from '/home/hatch/workspace/makefun/node_modules/playwright-core/index.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const entryRoot = join(here, '..');
const PORT = 8123;
const MAX_BYTES = 262144;

const shotsDoc = JSON.parse(readFileSync(join(entryRoot, 'shots.json'), 'utf8'));
// An optional file name on the command line re-captures just that one
// shot (handy when a single frame is re-staged); no argument means all.
const onlyFile = process.argv[2];
const shots = onlyFile ? shotsDoc.shots.filter((s) => s.file === onlyFile) : shotsDoc.shots;
if (shots.length === 0) {
  throw new Error('no shot in shots.json matches ' + String(onlyFile));
}

const chromiumBinary = join(
  process.env.HOME,
  '.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell',
);
if (!existsSync(chromiumBinary)) {
  throw new Error('headless chromium not found at ' + chromiumBinary);
}

const server = spawn('node', ['serve.ts', '--port', String(PORT)], {
  cwd: entryRoot,
  stdio: 'inherit',
});
try {
  // Poll until the dev server answers (more robust than parsing its log).
  let ready = false;
  for (let attempt = 0; attempt < 60 && !ready; attempt += 1) {
    try {
      const res = await fetch(`http://localhost:${PORT}/`);
      ready = res.ok;
    } catch {
      await new Promise((r) => setTimeout(r, 500));
    }
  }
  if (!ready) throw new Error('server did not start');

  const browser = await chromium.launch({
    executablePath: chromiumBinary,
    args: ['--no-sandbox', '--force-color-profile=srgb'],
  });
  try {
    for (const shot of shots) {
      const page = await browser.newPage({ viewport: { width: shot.width, height: shot.height } });
      page.on('pageerror', (e) => console.log('PAGEERROR', shot.file, String(e)));
      await page.goto(`http://localhost:${PORT}/${shot.url}`, { waitUntil: 'load' });
      await page.waitForFunction(() => window.__shotReady === true, null, { timeout: 30000 });
      // A shot may pin its framing in shots.json. "top" undoes any
      // scroll target the app's staging applied and frames the page
      // from the masthead down, so header-level controls (the spoiler
      // toggle) and the first list rows stay in the picture.
      if (shot.scroll === 'top') {
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.waitForTimeout(250);
      }
      await page.waitForTimeout(200);

      const outPath = join(entryRoot, 'screenshots', shot.file);
      let quality = 82;
      for (;;) {
        await page.screenshot({ path: outPath, type: 'jpeg', quality });
        const size = statSync(outPath).size;
        if (size <= MAX_BYTES || quality <= 40) {
          console.log(`captured ${shot.file}: ${size} bytes at quality ${quality}`);
          break;
        }
        quality -= 8;
      }
      await page.close();
    }
  } finally {
    await browser.close();
  }
} finally {
  server.kill();
}
