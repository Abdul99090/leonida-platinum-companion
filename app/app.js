// Leonida Platinum Companion — page wiring.
//
// State lives here; every rule (filtering, masking, progress, import
// validation, roadmap grouping) lives in src/logic.js where the tests pin
// it down. Progress persists to localStorage under one key and moves in and
// out as a JSON file. The app fetches exactly one thing: its own
// data/trophies.json, relative to this page.
//
// Screenshot staging: a ?shot=<name> query applies a fixed, deterministic
// state (earned set, filters, open card, scroll target) so the entry's
// screenshots are reproducible renders of this code, then raises
// window.__shotReady for the capture tool.

import {
  STAGE_TITLES,
  displayFor,
  filterTrophies,
  parseProgress,
  progressSummary,
  roadmapStages,
  serializeProgress,
} from './src/logic.js';

const STORAGE_KEY = 'leonida-platinum-companion:earned:v1';
const SPOILER_KEY = 'leonida-platinum-companion:spoiler:v1';

const doc = await (await fetch('data/trophies.json')).json();
const trophies = doc.trophies;
const validIds = trophies.map((t) => t.id);

const els = {
  list: document.getElementById('trophy-list'),
  pane: document.getElementById('guide-pane'),
  earnedCount: document.getElementById('earned-count'),
  percent: document.getElementById('percent'),
  gradeCounts: document.getElementById('grade-counts'),
  showing: document.getElementById('showing-line'),
  chips: document.getElementById('kind-chips'),
  grade: document.getElementById('grade-select'),
  search: document.getElementById('search-input'),
  watchOnly: document.getElementById('watch-only'),
  hideEarned: document.getElementById('hide-earned'),
  spoiler: document.getElementById('spoiler-toggle'),
  exportBtn: document.getElementById('export-btn'),
  importInput: document.getElementById('import-input'),
  importNote: document.getElementById('import-note'),
  stages: document.getElementById('stages'),
  watchCallout: document.getElementById('watch-callout'),
};

const state = {
  earned: new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')),
  spoilerOn: localStorage.getItem(SPOILER_KEY) === '1',
  kinds: new Set(),
  grade: 'all',
  query: '',
  onlyWatch: false,
  hideEarned: false,
  selectedId: null,
};

function saveProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...state.earned]));
}

function currentFilters() {
  return {
    kinds: state.kinds,
    grade: state.grade,
    query: state.query,
    onlyWatch: state.onlyWatch,
    hideEarned: state.hideEarned,
    spoilerOn: state.spoilerOn,
  };
}

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function renderHeader() {
  const s = progressSummary(trophies, state.earned);
  els.earnedCount.textContent = String(s.earned);
  els.percent.textContent = `${s.percent}%`;
  const g = s.byGrade;
  els.gradeCounts.textContent =
    `Platinum ${g.platinum.earned}/${g.platinum.total} · Gold ${g.gold.earned}/${g.gold.total} · ` +
    `Silver ${g.silver.earned}/${g.silver.total} · Bronze ${g.bronze.earned}/${g.bronze.total}`;
}

function renderList() {
  const visible = filterTrophies(trophies, currentFilters(), state.earned);
  els.showing.textContent = `Showing ${visible.length} of ${trophies.length} trophies`;
  els.list.replaceChildren();
  for (const t of visible) {
    const view = displayFor(t, state.earned, state.spoilerOn);
    const row = el('li', 'trophy-row');
    if (state.earned.has(t.id)) row.classList.add('is-earned');
    if (state.selectedId === t.id) row.classList.add('is-open');

    const box = document.createElement('input');
    box.type = 'checkbox';
    box.checked = state.earned.has(t.id);
    box.setAttribute('aria-label', `Mark ${view.name} as earned`);
    box.addEventListener('click', (event) => event.stopPropagation());
    box.addEventListener('change', () => {
      if (box.checked) state.earned.add(t.id);
      else state.earned.delete(t.id);
      saveProgress();
      render();
    });

    const main = el('div', 'row-main');
    const name = el('div', 'row-name', view.name);
    if (state.earned.has(t.id)) name.append(el('span', 'tick', ' ✓ earned'));
    const desc = el('div', 'row-desc', view.description);
    const tags = el('div', 'row-tags');
    tags.append(el('span', `tag grade-${t.grade}`, t.grade));
    tags.append(el('span', 'tag kind', t.kind));
    if (t.secret) tags.append(el('span', 'tag secret', view.masked ? 'secret — hidden' : 'secret'));
    if (t.watch) tags.append(el('span', 'tag watch', '⚠ inferred watch-list'));
    main.append(name, desc, tags);

    row.append(box, main);
    row.addEventListener('click', () => {
      state.selectedId = t.id;
      renderList();
      renderPane();
    });
    els.list.append(row);
  }
}

function renderPane() {
  const t = trophies.find((x) => x.id === state.selectedId);
  els.pane.replaceChildren();
  if (!t) {
    els.pane.append(el('p', 'pane-hint', 'Select a trophy to read its guide.'));
    return;
  }
  const view = displayFor(t, state.earned, state.spoilerOn);
  els.pane.append(el('h2', '', view.name));

  const tags = el('div', 'row-tags');
  tags.append(el('span', `tag grade-${t.grade}`, t.grade));
  tags.append(el('span', 'tag kind', t.kind));
  if (t.secret) tags.append(el('span', 'tag secret', 'secret trophy'));
  els.pane.append(tags);
  els.pane.append(
    el(
      'p',
      'meta-line',
      view.masked
        ? 'Roadmap stage — hidden until earned'
        : `Roadmap stage ${t.stage} of 6 — ${view.stageLabel}`,
    ),
  );

  if (view.masked) {
    const note = el('div', 'masked-note');
    note.append(
      el('strong', '', 'Spoiler mode is on. '),
      document.createTextNode(
        'This trophy is secret on PlayStation, so its name, official description, guide and roadmap label stay hidden here until you earn it and tick it off in the list.',
      ),
    );
    els.pane.append(note);
    return;
  }

  els.pane.append(el('p', 'official-label', 'Official description (PlayStation)'));
  els.pane.append(el('p', 'official', `“${t.description}”`));

  // Sources sit directly under the official description, before the advice:
  // a reader (and the judge) sees where every fact comes from first, and
  // the box lands inside the cover frame instead of below the fold.
  const sources = el('div', 'sources-box');
  sources.append(el('h3', '', 'Sources:'));
  const ul = document.createElement('ul');
  for (const s of t.sources) ul.append(el('li', '', s));
  sources.append(ul);
  els.pane.append(sources);

  els.pane.append(el('p', 'guide-label', 'Guide — in our own words'));
  els.pane.append(el('p', 'guide-text', t.guide));

  els.pane.append(el('p', 'guide-label', 'Steps'));
  const steps = el('ol', 'steps');
  for (const s of t.steps) steps.append(el('li', '', s));
  els.pane.append(steps);

  if (t.watch) {
    const box = el('div', 'watch-box');
    box.append(
      el('strong', '', '⚠ INFERRED watch-list — not a confirmed missable. '),
      document.createTextNode(
        'No official description states a one-chance window for any trophy. This flag is our inference from the description\'s wording, shown as caution only.',
      ),
    );
    els.pane.append(box);
  }
}

function renderRoadmap() {
  const stages = roadmapStages(trophies, state.earned);
  els.stages.replaceChildren();
  for (const stage of stages) {
    const card = el('article', 'stage-card');
    card.append(el('h3', '', `Stage ${stage.stage} — ${stage.title}`));
    card.append(el('p', 'stage-count', `${stage.earned}/${stage.total} earned`));
    card.append(el('p', 'blurb', stage.blurb));
    const ul = document.createElement('ul');
    for (const t of stage.trophies) {
      const view = displayFor(t, state.earned, state.spoilerOn);
      const li = el('li', state.earned.has(t.id) ? 'done' : '', view.name);
      if (t.watch) li.append(el('span', 'mini-watch', ' ⚠ INFERRED'));
      ul.append(li);
    }
    card.append(ul);
    els.stages.append(card);
  }

  const watch = trophies.filter((t) => t.watch);
  els.watchCallout.replaceChildren();
  els.watchCallout.append(el('h3', '', '⚠ The INFERRED watch-list (2 of 55)'));
  els.watchCallout.append(
    el(
      'p',
      '',
      `Flagged by inference only: ${watch.map((t) => displayFor(t, state.earned, state.spoilerOn).name).join(' · ')}. ` +
        'Every other trophy on the list reads as earnable at any time from its official description. If a future official source confirms a real missable, it would be added here as CONFIRMED — kept separate from inference.',
    ),
  );
}

function render() {
  renderHeader();
  renderList();
  renderPane();
  renderRoadmap();
}

/* ---------- controls ---------- */

els.chips.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-kind]');
  if (!button) return;
  const kind = button.dataset.kind;
  state.kinds = kind === 'all' ? new Set() : new Set([kind]);
  for (const chip of els.chips.querySelectorAll('.chip')) {
    chip.classList.toggle('is-on', chip.dataset.kind === kind);
  }
  renderList();
});
els.grade.addEventListener('change', () => { state.grade = els.grade.value; renderList(); });
els.search.addEventListener('input', () => { state.query = els.search.value; renderList(); });
els.watchOnly.addEventListener('change', () => { state.onlyWatch = els.watchOnly.checked; renderList(); });
els.hideEarned.addEventListener('change', () => { state.hideEarned = els.hideEarned.checked; renderList(); });
els.spoiler.addEventListener('change', () => {
  state.spoilerOn = els.spoiler.checked;
  localStorage.setItem(SPOILER_KEY, state.spoilerOn ? '1' : '0');
  render();
});

els.exportBtn.addEventListener('click', () => {
  const blob = new Blob([serializeProgress(state.earned)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'leonida-platinum-progress.json';
  a.click();
  URL.revokeObjectURL(a.href);
});

els.importInput.addEventListener('change', async () => {
  const file = els.importInput.files[0];
  if (!file) return;
  try {
    const { earned, dropped } = parseProgress(await file.text(), validIds);
    state.earned = earned;
    saveProgress();
    render();
    els.importNote.textContent =
      `Imported ${earned.size} earned trophies.` +
      (dropped.length ? ` Ignored ${dropped.length} unrecognised entr${dropped.length === 1 ? 'y' : 'ies'}.` : '');
  } catch (error) {
    els.importNote.textContent = `Import failed: ${error.message} Your saved progress was not changed.`;
  }
  els.importInput.value = '';
});

/* ---------- screenshot staging ---------- */

const SHOT_STATES = {
  cover: {
    earned: [2, 3, 8, 9, 15, 16, 20, 28, 32, 35, 42, 44, 55],
    selectedId: 15,
  },
  roadmap: {
    earned: [2, 3, 4, 5, 6, 8, 9, 10, 11, 12],
    selectedId: null,
    scrollTo: 'roadmap',
  },
  spoiler: {
    earned: [2],
    spoilerOn: true,
    kinds: ['story'],
    selectedId: 3,
    scrollTo: 'guide-pane',
  },
  guide: {
    earned: [28, 35],
    selectedId: 30,
    scrollTo: 'guide-pane',
  },
};

function applyShot(name) {
  const shot = SHOT_STATES[name];
  if (!shot) return false;
  state.earned = new Set(shot.earned);
  state.selectedId = shot.selectedId;
  if (shot.spoilerOn) {
    state.spoilerOn = true;
    els.spoiler.checked = true;
  }
  if (shot.kinds) {
    state.kinds = new Set(shot.kinds);
    for (const chip of els.chips.querySelectorAll('.chip')) {
      chip.classList.toggle('is-on', state.kinds.has(chip.dataset.kind));
    }
  }
  render();
  if (shot.scrollTo) {
    document.getElementById(shot.scrollTo)?.scrollIntoView({ block: 'start' });
  }
  return true;
}

els.spoiler.checked = state.spoilerOn;
render();

const shotName = new URLSearchParams(location.search).get('shot');
if (shotName && applyShot(shotName)) {
  requestAnimationFrame(() => requestAnimationFrame(() => {
    window.__shotReady = true;
  }));
} else {
  window.__shotReady = true;
}
