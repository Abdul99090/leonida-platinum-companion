// Pure tracker logic for the Leonida Platinum Companion. No DOM, no storage:
// app.js wires this to the page, tests/logic.test.mjs pins its behaviour.
// Everything here works on the plain trophy objects from data/trophies.json.

export const GRADES = ['platinum', 'gold', 'silver', 'bronze'];
export const KINDS = ['story', 'collectibles', 'activities', 'completion'];

const STAGE_TITLES = {
  1: 'Story First — Chapters & Named Missions',
  2: 'Endings & Strands — Final Missions and Contacts',
  3: 'The 100% Push — Completion, Sampling, Exploration',
  4: 'The Long Grinds — Counts and Collections',
  5: 'Free-Roam Feats, Heists & Money',
  6: 'Platinum',
};

// Compose the tracker filters. `earned` is a Set of trophy ids, used only when
// `hideEarned` is set. Returns a new array in data order.
export function filterTrophies(trophies, { kind = 'all', grade = 'all', query = '', missableOnly = false, earned = null, hideEarned = false } = {}) {
  const q = query.trim().toLowerCase();
  return trophies.filter((t) => {
    if (kind !== 'all' && t.kind !== kind) return false;
    if (grade !== 'all' && t.grade !== grade) return false;
    if (missableOnly && !t.missable) return false;
    if (hideEarned && earned && earned.has(t.id)) return false;
    if (q && !`${t.name} ${t.description}`.toLowerCase().includes(q)) return false;
    return true;
  });
}

// What the page may show for one trophy. With spoiler mode on, a secret trophy
// the player has not earned yet is masked: name, description and guide are all
// withheld, because any of the three can spoil a story beat.
export function displayTrophy(trophy, { spoiler = false, earned = new Set() } = {}) {
  const masked = Boolean(spoiler && trophy.secret && !earned.has(trophy.id));
  if (!masked) return { ...trophy, masked: false };
  return {
    ...trophy,
    masked: true,
    name: 'Hidden Trophy',
    description: 'Hidden until earned. Turn spoiler mode off to peek.',
    guide: 'This guide is hidden by spoiler mode until the trophy is earned.',
    steps: [],
  };
}

export function progress(trophies, earned = new Set()) {
  const perGrade = {};
  for (const g of GRADES) perGrade[g] = { earned: 0, total: 0 };
  let n = 0;
  for (const t of trophies) {
    perGrade[t.grade].total += 1;
    if (earned.has(t.id)) {
      perGrade[t.grade].earned += 1;
      n += 1;
    }
  }
  return { earned: n, total: trophies.length, perGrade, pct: trophies.length ? Math.round((n / trophies.length) * 100) : 0 };
}

// Progress export format: {"earned":[ids],"spoiler":bool}. parseProgress is
// defensive: anything malformed returns null, unknown ids are dropped,
// duplicates collapse, and spoiler is coerced to a boolean.
export function serializeProgress({ earned, spoiler }) {
  return JSON.stringify({ earned: [...earned].sort((a, b) => a - b), spoiler: Boolean(spoiler) }, null, 2);
}

export function parseProgress(text) {
  let obj;
  try {
    obj = JSON.parse(text);
  } catch {
    return null;
  }
  if (!obj || !Array.isArray(obj.earned)) return null;
  const ids = [...new Set(obj.earned.filter((x) => Number.isInteger(x) && x >= 1 && x <= 55))].sort((a, b) => a - b);
  return { earned: ids, spoiler: Boolean(obj.spoiler) };
}

// Group trophies into the roadmap stages declared in the data file.
export function roadmap(trophies) {
  const byStage = new Map();
  for (const t of trophies) {
    if (!byStage.has(t.stage)) byStage.set(t.stage, []);
    byStage.get(t.stage).push(t);
  }
  return [...byStage.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([stage, list]) => ({ stage, title: STAGE_TITLES[stage] ?? `Stage ${stage}`, trophies: list }));
}
