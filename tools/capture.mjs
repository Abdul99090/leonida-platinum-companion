// Capture this entry's screenshots from its own staged ?shot= states.
// Reads shots.json, opens each state in headless Chromium against the local
// preview server (node serve.ts must be running), waits for the app to flag
// itself ready, and writes JPEGs into screenshots/. Nothing is composited or
// edited afterwards — the frames are the app as it renders.
import { chromium } from '/home/hatch/workspace/makefun/node_modules/playwright-core/index.mjs';
import { mkdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const repo = join(dirname(fileURLToPath(import.meta.url)), '..');
const { shots } = JSON.parse(readFileSync(join(repo, 'shots.json'), 'utf8'));
const outDir = join(repo, 'screenshots');
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({
  executablePath:
    process.env.HOME +
    '/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell',
  args: ['--no-sandbox', '--force-color-profile=srgb'],
});

for (const shot of shots) {
  const page = await browser.newPage({ viewport: { width: shot.width, height: shot.height } });
  page.on('pageerror', (e) => console.log('PAGEERROR', shot.file, String(e)));
  page.on('console', (m) => {
    if (m.type() === 'error') console.log('CONSOLE', shot.file, m.text());
  });
  await page.goto('http://localhost:8080/' + shot.url, { waitUntil: 'load' });
  await page.waitForFunction(() => window.__shotReady === true, null, { timeout: 30000 });
  await page.waitForTimeout(250);
  const path = join(outDir, shot.file);
  await page.screenshot({ path, type: 'jpeg', quality: 82 });
  console.log('captured', shot.file, `${statSync(path).size} bytes`);
  await page.close();
}
await browser.close();
