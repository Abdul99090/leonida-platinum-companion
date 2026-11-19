// Leonida Platinum Companion — page driver.
// All decisions (filtering, masking, progress, import validation) live in
// src/logic.js; this file only moves data between that logic, the DOM and
// localStorage. The app fetches exactly one thing: its own data file.
import {
  KINDS, GRADES, filterTrophies, displayTrophy, roadmapLabel,
  progressOf, roadmapGroups, exportProgress, importProgress, isFlagged,
} from './src/logic.js';

const EARNED_KEY = 'leonida-companion-earned-v1';
const SPOILER_KEY = 'leonida-companion-spoilers-v1';
const params = new URLSearchParams(location.search);
const shot = params.get('shot');

const doc = await (await fetch('data/trophies.json')).json();
const trophies = doc.trophies;

const state = {
  kind: 'all', grade: 'all', query: '', missableOnly: false,
  hideEarned: false, spoilers: false, earned: new Set(), view: 'tracker',
  selectedId: null,
};

function loadSaved() {
  try {
    const ids = JSON.parse(localStorage.getItem(EARNED_KEY) ?? '[]');
    if (Array.isArray(ids)) state.earned = new Set(ids.filter((n) => Number.isInteger(n)));
    state.spoilers = localStorage.getItem(SPOILER_KEY) === 'on';
  } catch { /* a corrupted store starts empty rather than breaking the page */ }
}
function save() {
  if (shot) return; // staged screenshots never write to the visitor's store
  localStorage.setItem(EARNED_KEY, JSON.stringify([...state.earned]));
  localStorage.setItem(SPOILER_KEY, state.spoilers ? 'on' : 'off');
}

// Deterministic staging for this entry's own screenshots: ?shot= presets set
// progress, filters, view and the open guide card, then flag readiness.
const SHOT_PRESETS = {
  cover: { earned: [2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 15, 16], selectedId: 15 },
  roadmap: { earned: [2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 15, 16], view: 'roadmap' },
  spoiler: { earned: [2], spoilers: true, kind: 'story', selectedId: 2 },
  guide: { earned: [2, 3, 15], kind: 'collectibles', selectedId: 30 },
};
if (shot && SHOT_PRESETS[shot]) {
  const p = SHOT_PRESETS[shot];
  state.earned = new Set(p.earned);
  state.spoilers = Boolean(p.spoilers);
  state.kind = p.kind ?? 'all';
  state.view = p.view ?? 'tracker';
  state.selectedId = p.selectedId ?? null;
} else {
  loadSaved();
}
if (state.selectedId === null) state.selectedId = trophies[0].id;

const $ = (id) => document.getElementById(id);
const listEl = $('trophy-list');
const panelEl = $('guide-panel');

function el(tag, cls, text) {
  const node = document.createElement(tag);
  if (cls) node.className = cls;
  if (text !== undefined) node.textContent = text;
  return node;
}

function renderProgress() {
  const p = progressOf(trophies, state.earned);
  $('progress-count').textContent = `${p.earned} / ${p.total}`;
  $('progress-percent').textContent = `${p.percent}% earned`;
  $('progress-fill').style.width = `${p.percent}%`;
  const ul = $('grade-counters');
  ul.replaceChildren();
  for (const g of GRADES) {
    ul.append(el('li', '', `${g}: ${p.byGrade[g].earned}/${p.byGrade[g].total}`));
  }
  $('spoiler-state').textContent = state.spoilers ? 'On — secrets hidden' : 'Off — secrets shown';
}

function renderPanel() {
  const raw = trophies.find((t) => t.id === state.selectedId) ?? trophies[0];
  const t = displayTrophy(raw, state);
  panelEl.replaceChildren();
  panelEl.append(el('p', 'official-label', 'Trophy'));
  panelEl.append(el('h2', '', t.name));
  const meta = el('div', 'panel-meta');
  meta.append(el('span', `badge ${t.grade}`, t.grade));
  meta.append(el('span', 'tag kind', t.kind));
  if (raw.secret) meta.append(el('span', 'tag secret', 'SECRET'));
  if (isFlagged(raw)) meta.append(el('span', 'tag inferred', '⚠ INFERRED watch-list'));
  meta.append(el('span', 'tag kind', `Roadmap stage ${t.stage}`));
  panelEl.append(meta);
  panelEl.append(el('p', 'official-label', 'Official description (verbatim)'));
  panelEl.append(el('p', 'official-text', t.description));
  panelEl.append(el('h3', '', 'Guide — in our own words'));
  panelEl.append(el('p', 'guide-text', t.guide));
  if (!t.masked) {
    const box = el('div', 'sources-box');
    box.append(el('h3', '', 'Sources:'));
    const ul = el('ul');
    for (const s of t.sources) ul.append(el('li', '', s));
    box.append(ul);
    panelEl.append(box);
    panelEl.append(el('h3', '', 'Steps'));
    const ol = el('ol');
    for (const s of t.steps) ol.append(el('li', '', s));
    panelEl.append(ol);
  }
}

function renderList() {
  const visible = filterTrophies(trophies, state);
  $('result-count').textContent = `Showing ${visible.length} of ${trophies.length} trophies`;
  listEl.replaceChildren();
  for (const raw of visible) {
    const t = displayTrophy(raw, state);
    const row = el('button', 'trophy-row' + (raw.id === state.selectedId ? ' selected' : ''));
    row.type = 'button';
    const box = document.createElement('input');
    box.type = 'checkbox';
    box.checked = state.earned.has(raw.id);
    box.setAttribute('aria-label', `Mark ${t.name} earned`);
    box.addEventListener('click', (ev) => ev.stopPropagation());
    box.addEventListener('change', () => {
      if (box.checked) state.earned.add(raw.id); else state.earned.delete(raw.id);
      save(); renderAll();
    });
    row.append(box);
    const main = el('span', 'row-main');
    const name = el('span', 'row-name', t.name);
    if (state.earned.has(raw.id)) name.append(el('span', 'earned-mark', ' ✓ earned'));
    main.append(name);
    main.append(el('span', 'row-desc', t.description));
    row.append(main);
    row.append(el('span', `badge ${t.grade}`, t.grade));
    if (raw.secret) row.append(el('span', 'tag secret', 'SECRET'));
    if (isFlagged(raw)) row.append(el('span', 'tag inferred', '⚠ INFERRED'));
    row.addEventListener('click', () => { state.selectedId = raw.id; renderList(); renderPanel(); });
    const li = el('li');
    li.append(row);
    listEl.append(li);
  }
}

function renderRoadmap() {
  const wrap = $('roadmap-stages');
  wrap.replaceChildren();
  for (const group of roadmapGroups(trophies, state.earned)) {
    const card = el('section', 'stage-card');
    const head = el('h3', '', `Stage ${group.n} — ${group.title} `);
    head.append(el('span', 'stage-progress', `${group.earned}/${group.total} earned`));
    card.append(head);
    card.append(el('p', '', group.note));
    const items = el('div', 'stage-items');
    for (const raw of group.items) {
      const label = roadmapLabel(raw, state);
      const chip = el('span', 'stage-item' + (state.earned.has(raw.id) ? ' earned' : ''), label);
      if (isFlagged(raw)) chip.textContent += ' ⚠ INFERRED';
      items.append(chip);
    }
    card.append(items);
    wrap.append(card);
  }
}

function renderView() {
  $('tracker-view').hidden = state.view !== 'tracker';
  $('roadmap-view').hidden = state.view !== 'roadmap';
  $('tab-tracker').classList.toggle('active', state.view === 'tracker');
  $('tab-roadmap').classList.toggle('active', state.view === 'roadmap');
}

function renderAll() { renderProgress(); renderList(); renderPanel(); renderRoadmap(); renderView(); }

// Controls.
const chipsWrap = $('kind-chips');
for (const kind of ['all', ...KINDS]) {
  const chip = el('button', 'chip' + (state.kind === kind ? ' active' : ''), kind === 'all' ? 'All kinds' : kind);
  chip.type = 'button';
  chip.addEventListener('click', () => {
    state.kind = kind;
    for (const c of chipsWrap.children) c.classList.toggle('active', c === chip);
    renderList();
  });
  chipsWrap.append(chip);
}
$('grade-select').addEventListener('change', (e) => { state.grade = e.target.value; renderList(); });
$('search-box').addEventListener('input', (e) => { state.query = e.target.value; renderList(); });
$('missable-only').addEventListener('change', (e) => { state.missableOnly = e.target.checked; renderList(); });
$('hide-earned').addEventListener('change', (e) => { state.hideEarned = e.target.checked; renderList(); });
$('spoiler-toggle').checked = state.spoilers;
$('spoiler-toggle').addEventListener('change', (e) => { state.spoilers = e.target.checked; save(); renderAll(); });
$('tab-tracker').addEventListener('click', () => { state.view = 'tracker'; renderView(); });
$('tab-roadmap').addEventListener('click', () => { state.view = 'roadmap'; renderView(); });
$('export-btn').addEventListener('click', () => {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([exportProgress(state.earned)], { type: 'application/json' }));
  a.download = 'leonida-platinum-progress.json';
  a.click();
  URL.revokeObjectURL(a.href);
});
$('import-file').addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const res = importProgress(await file.text(), trophies);
  if (res.ok) {
    state.earned = res.earned;
    save(); renderAll();
    $('import-note').textContent = `Imported progress: ${res.earned.size} trophies earned.`;
  } else {
    $('import-note').textContent = `Import refused: ${res.error}`;
  }
  e.target.value = '';
});

renderAll();
if (shot) window.__shotReady = true;
