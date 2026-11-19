// Capture the entry screenshots exactly as shots.json declares, via the
// app's deterministic ?shot= staging. Serves this entry's app/ with serve.ts
// on a scratch port, shoots each declared view, and writes JPEGs into
// screenshots/ beside the entry root. Run: node tools/capture.mjs
import { chromium } from '/home/hatch/workspace/makefun/node_modules/playwright-core/index.mjs';
import { spawn } from 'node:child_process';
import { readFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const shots = JSON.parse(readFileSync(join(root, 'shots.json'), 'utf8')).shots;
const outDir = join(root, 'screenshots');
mkdirSync(outDir, { recursive: true });

const PORT = 8123;
const server = spawn('node', [join(root, 'serve.ts'), '--port', String(PORT)], { stdio: 'ignore' });
try {
  // Wait until the app answers.
  for (let i = 0; ; i++) {
    try {
      const r = await fetch(`http://localhost:${PORT}/`);
      if (r.ok) break;
    } catch { /* not up yet */ }
    if (i > 100) throw new Error('serve.ts did not come up');
    await new Promise((r) => setTimeout(r, 200));
  }

  const browser = await chromium.launch({
    executablePath: process.env.HOME + '/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell',
    args: ['--no-sandbox', '--force-color-profile=srgb'],
  });
  for (const shot of shots) {
    const page = await browser.newPage({ viewport: { width: shot.width, height: shot.height } });
    page.on('pageerror', (e) => console.log('PAGEERROR', shot.file, String(e)));
    page.on('console', (m) => { if (m.type() === 'error') console.log('CONSOLE', shot.file, m.text()); });
    await page.goto(`http://localhost:${PORT}/` + shot.url, { waitUntil: 'load' });
    await page.waitForFunction(() => window.__shotReady === true, null, { timeout: 30000 });
    await page.waitForTimeout(250);
    await page.screenshot({ path: join(outDir, shot.file), type: 'jpeg', quality: 80 });
    console.log('captured', shot.file, shot.width + 'x' + shot.height);
    await page.close();
  }
  await browser.close();
} finally {
  server.kill();
}
