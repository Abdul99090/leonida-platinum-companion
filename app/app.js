// Leonida Platinum Companion — page wiring. All tracker behaviour (filtering,
// spoiler masking, progress maths, export/import format) lives in the pure
// module src/logic.js; this file only connects it to the DOM and localStorage.
import { filterTrophies, displayTrophy, progress, serializeProgress, parseProgress, roadmap, KINDS } from './src/logic.js';

const KEY = 'leonida-platinum-companion-v1';
const doc = await (await fetch('data/trophies.json')).json();
const TROPHIES = doc.trophies;
const byId = new Map(TROPHIES.map((t) => [t.id, t]));

const saved = parseProgress(localStorage.getItem(KEY) ?? '');
const state = {
  earned: new Set(saved?.earned ?? []),
  spoiler: saved?.spoiler ?? false,
  view: 'tracker',
  kind: 'all',
  grade: 'all',
  query: '',
  missableOnly: false,
  hideEarned: false,
  openId: 15,
};

const $ = (id) => document.getElementById(id);
const els = {
  earned: $('stat-earned'), pct: $('stat-pct'), fill: $('stat-fill'),
  counters: $('grade-counters'), savedNote: $('saved-note'),
  rows: $('rows'), meta: $('list-meta'), panel: $('guide-panel'),
  query: $('filter-query'), grade: $('filter-grade'), chips: $('kind-chips'),
  missable: $('chip-missable'), hideEarned: $('toggle-hide-earned'),
  spoiler: $('toggle-spoiler'), toast: $('toast'),
  viewTracker: $('view-tracker'), viewRoadmap: $('view-roadmap'),
  tabTracker: $('tab-tracker'), tabRoadmap: $('tab-roadmap'),
  stages: $('roadmap-stages'),
};

function el(tag, cls, text) {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text !== undefined) n.textContent = text;
  return n;
}

function persist(note = true) {
  localStorage.setItem(KEY, serializeProgress({ earned: state.earned, spoiler: state.spoiler }));
  if (note) els.savedNote.textContent = 'Progress saved in this browser just now (localStorage). Export it to move it between devices.';
}

function toast(msg) { els.toast.textContent = msg; }

/* ---------------- header ---------------- */
function renderHeader() {
  const p = progress(TROPHIES, state.earned);
  els.earned.textContent = `${p.earned} / ${p.total}`;
  els.pct.textContent = `${p.pct}%`;
  els.fill.style.width = `${p.pct}%`;
  els.counters.replaceChildren();
  for (const g of ['platinum', 'gold', 'silver', 'bronze']) {
    const c = el('span', 'grade-count');
    c.append(`${g[0].toUpperCase() + g.slice(1)} `, Object.assign(el('b', null, `${p.perGrade[g].earned}/${p.perGrade[g].total}`)));
    els.counters.append(c);
  }
}

/* ---------------- tracker list ---------------- */
function currentList() {
  return filterTrophies(TROPHIES, {
    kind: state.kind, grade: state.grade, query: state.query,
    missableOnly: state.missableOnly, earned: state.earned, hideEarned: state.hideEarned,
  });
}

function renderRows() {
  const list = currentList();
  els.meta.textContent = `Showing ${list.length} of 55 trophies · click a row for its cited guide · tick the box when you earn it.`;
  els.rows.replaceChildren();
  for (const t of list) {
    const shown = displayTrophy(t, { spoiler: state.spoiler, earned: state.earned });
    const li = el('li');
    const row = el('div', 'row' + (state.earned.has(t.id) ? ' is-earned' : '') + (state.openId === t.id ? ' is-open' : ''));
    row.tabIndex = 0;
    row.setAttribute('role', 'button');
    row.setAttribute('aria-label', `Open guide for ${shown.name}`);
    const box = document.createElement('input');
    box.type = 'checkbox';
    box.className = 'box';
    box.checked = state.earned.has(t.id);
    box.setAttribute('aria-label', `Mark ${t.name} as earned`);
    box.addEventListener('click', (e) => e.stopPropagation());
    box.addEventListener('change', () => {
      if (box.checked) state.earned.add(t.id); else state.earned.delete(t.id);
      persist(); renderAll(false);
    });
    const badge = el('span', `grade-badge g-${t.grade}`, t.grade);
    const main = el('span');
    const nameLine = el('span', 'row-name');
    nameLine.append(shown.name + ' ');
    if (state.earned.has(t.id)) nameLine.append(el('span', 'check', '✓ earned'));
    main.append(nameLine, el('span', 'row-desc', shown.description));
    const tags = el('span', 'row-tags');
    tags.append(el('span', 'tag tag-kind', t.kind));
    if (t.secret) tags.append(el('span', 'tag tag-secret', 'secret'));
    if (t.missable) tags.append(el('span', 'tag tag-miss', '⚠ missable — inferred'));
    main.append(tags);
    row.append(box, badge, main);
    row.addEventListener('click', () => { state.openId = t.id; renderRows(); renderPanel(); });
    row.addEventListener('keydown', (e) => { if (e.key === 'Enter') { state.openId = t.id; renderRows(); renderPanel(); } });
    li.append(row);
    els.rows.append(li);
  }
  if (!list.length) els.rows.append(el('li', 'guide-empty', 'No trophies match those filters. Loosen the search or clear a filter chip.'));
}

/* ---------------- guide panel ---------------- */
function renderPanel() {
  const t = byId.get(state.openId) ?? TROPHIES[0];
  const shown = displayTrophy(t, { spoiler: state.spoiler, earned: state.earned });
  const p = els.panel;
  p.replaceChildren();
  const kicker = el('div', 'guide-kicker');
  kicker.append(el('span', `grade-badge g-${t.grade}`, t.grade), el('span', 'tag tag-kind', shown.masked ? 'secret trophy' : t.kind));
  if (t.missable) kicker.append(el('span', 'tag tag-miss', '⚠ missable — inferred'));
  p.append(kicker, el('h2', null, shown.name));
  const official = el('div', 'official');
  official.append(
    el('small', null, shown.masked ? 'Spoiler mode — hidden until earned' : 'Official description — PlayStation, verbatim'),
    el('p', null, shown.description),
  );
  p.append(official);
  p.append(el('h3', null, 'Our guide — in our own words'));
  p.append(el('p', 'guide-text', shown.guide));
  if (!shown.masked) {
    const src = el('div', 'sources');
    src.append(el('strong', null, 'Sources:'));
    const ul = el('ul');
    for (const s of t.sources) ul.append(el('li', null, s));
    src.append(ul);
    p.append(src);
  }
  if (t.missable && !shown.masked) {
    const note = el('div', 'miss-note');
    note.append(el('strong', null, 'Missable watch-list. '), document.createTextNode(t.missableNote));
    p.append(note);
  }
  if (shown.steps.length) {
    p.append(el('h3', null, 'Steps'));
    const ul = el('ul', 'guide-steps');
    for (const s of shown.steps) ul.append(el('li', null, s));
    p.append(ul);
  }
  if (state.earned.has(t.id)) p.append(el('span', 'guide-earned', '✓ Earned — nice work.'));
}

/* ---------------- roadmap ---------------- */
function renderRoadmap() {
  els.stages.replaceChildren();
  for (const stage of roadmap(TROPHIES)) {
    const wrap = el('section', 'stage');
    const head = el('div', 'stage-head');
    const done = stage.trophies.filter((t) => state.earned.has(t.id)).length;
    head.append(
      el('span', 'stage-num', String(stage.stage)),
      el('h3', null, stage.title),
      el('span', 'stage-count', `${done}/${stage.trophies.length} earned`),
    );
    const chips = el('div', 'stage-chips');
    for (const t of stage.trophies) {
      const shown = displayTrophy(t, { spoiler: state.spoiler, earned: state.earned });
      const chip = el('button', 'stage-chip' + (state.earned.has(t.id) ? ' is-earned' : ''));
      chip.type = 'button';
      const dot = el('span', `dot dot-${t.grade}`);
      chip.append(dot, document.createTextNode(shown.name + (t.missable ? ' ⚠' : '') + (state.earned.has(t.id) ? ' ✓' : '')));
      chip.addEventListener('click', () => {
        state.openId = t.id;
        state.view = 'tracker';
        syncView(); renderAll(false);
        els.panel.scrollIntoView({ block: 'nearest' });
      });
      chips.append(chip);
    }
    wrap.append(head, chips);
    els.stages.append(wrap);
  }
}

/* ---------------- view + filters ---------------- */
function syncView() {
  const tracker = state.view === 'tracker';
  els.viewTracker.hidden = !tracker;
  els.viewRoadmap.hidden = tracker;
  els.tabTracker.classList.toggle('is-active', tracker);
  els.tabRoadmap.classList.toggle('is-active', !tracker);
  document.getElementById('filters').style.visibility = tracker ? 'visible' : 'hidden';
}

function renderAll(persistFirst = true) {
  if (persistFirst) persist(false);
  renderHeader(); renderRows(); renderPanel(); renderRoadmap();
}

for (const kind of ['all', ...KINDS]) {
  const chip = el('button', 'chip' + (kind === 'all' ? ' is-active' : ''), kind === 'all' ? 'All kinds' : kind[0].toUpperCase() + kind.slice(1));
  chip.type = 'button';
  chip.addEventListener('click', () => {
    state.kind = kind;
    for (const c of els.chips.children) c.classList.remove('is-active');
    chip.classList.add('is-active');
    renderRows();
  });
  els.chips.append(chip);
}
els.query.addEventListener('input', () => { state.query = els.query.value; renderRows(); });
els.grade.addEventListener('change', () => { state.grade = els.grade.value; renderRows(); });
els.missable.addEventListener('click', () => {
  state.missableOnly = !state.missableOnly;
  els.missable.classList.toggle('is-active', state.missableOnly);
  els.missable.setAttribute('aria-pressed', String(state.missableOnly));
  renderRows();
});
els.hideEarned.addEventListener('change', () => { state.hideEarned = els.hideEarned.checked; renderRows(); });
els.spoiler.addEventListener('change', () => { state.spoiler = els.spoiler.checked; persist(); renderRows(); renderPanel(); renderRoadmap(); });
els.tabTracker.addEventListener('click', () => { state.view = 'tracker'; syncView(); });
els.tabRoadmap.addEventListener('click', () => { state.view = 'roadmap'; syncView(); });

/* ---------------- export / import ---------------- */
$('btn-export').addEventListener('click', () => {
  const blob = new Blob([serializeProgress({ earned: state.earned, spoiler: state.spoiler })], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'leonida-progress.json';
  a.click();
  URL.revokeObjectURL(a.href);
  toast(`Exported ${state.earned.size} earned trophies to leonida-progress.json.`);
});
$('btn-import').addEventListener('click', () => $('file-import').click());
$('file-import').addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const parsed = parseProgress(await file.text());
  if (!parsed) { toast('That file is not a Leonida progress export — nothing was changed.'); return; }
  state.earned = new Set(parsed.earned);
  state.spoiler = parsed.spoiler;
  els.spoiler.checked = parsed.spoiler;
  persist(); renderAll(false);
  toast(`Imported progress: ${parsed.earned.length} trophies earned.`);
});

/* ---------------- deterministic shot staging ---------------- */
// The entry screenshots are staged through the app itself: ?shot=1&view=tracker
// &earned=2,3,4&open=15&spoiler=1&kind=story pre-seeds exactly the state a
// player could reach by hand, renders it, and flags readiness for capture.
const params = new URLSearchParams(location.search);
if (params.has('shot')) {
  const earnedParam = params.get('earned');
  if (earnedParam) state.earned = new Set(earnedParam.split(',').map(Number).filter((n) => byId.has(n)));
  if (params.get('open')) state.openId = Number(params.get('open'));
  if (params.get('view')) state.view = params.get('view');
  if (params.get('spoiler')) { state.spoiler = params.get('spoiler') === '1'; }
  if (params.get('kind')) {
    state.kind = params.get('kind');
    for (const c of els.chips.children) c.classList.toggle('is-active', c.textContent.toLowerCase().startsWith(state.kind));
  }
  if (params.get('missable')) { state.missableOnly = true; els.missable.classList.add('is-active'); }
  els.spoiler.checked = state.spoiler;
  syncView();
  renderAll(false);
  requestAnimationFrame(() => requestAnimationFrame(() => { window.__shotReady = true; }));
} else {
  els.spoiler.checked = state.spoiler;
  syncView();
  renderAll(false);
}
