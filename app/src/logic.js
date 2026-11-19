// Leonida Platinum Companion — pure tracker logic.
// No DOM, no storage, no network: every function here takes plain data in and
// returns plain data out, so the same code drives the page and the test suite.
// Data provenance: official names, descriptions and grades come from the
// published PlayStation list; the secret flags come from the official case
// files for the same 55 ids; kind, roadmap stage, steps and guides are this
// entry's own curation, derived from the official descriptions.

export const KINDS = ['story', 'collectibles', 'activities', 'completion'];
export const GRADES = ['platinum', 'gold', 'silver', 'bronze'];

export const ROADMAP_STAGES = [
  { n: 1, title: 'Story First', note: 'Play the campaign in order. Chapters and named missions unlock in sequence, so nothing here needs a detour — just keep moving and let the story trophies land as their missions end.' },
  { n: 2, title: 'Endings & Strands', note: 'Finish the final mission, then close out every companion strand: Andy, Kenton, Billy, Randy, Tyrone and the eight stranger strands spread across Leonida.' },
  { n: 3, title: '100% Push', note: 'Work the completion checklist itself: sample every activity type, clear challenges, explore every area and finish the card sets on the way to Attain 100% Completion.' },
  { n: 4, title: 'Long Grinds', note: 'The counters that take evenings, not minutes: 250 stunts, gold in all 42 Shooting Range challenges, a drone-race win at all 14 locations, 20 race wins and 100 WAiNK spots.' },
  { n: 5, title: 'Free-Roam Feats, Heists & Money', note: 'Partner escapes, robberies, discoveries and the money trophies — launder $250,000, spend $100,000 and buy every garage once the campaign money is flowing.' },
  { n: 6, title: 'The Platinum', note: 'When the other 54 are ticked, Vice Got a Price! is awarded on its own. If it does not pop, the unticked row in this tracker is the one still owed.' },
];

export const HIDDEN_LABEL = 'Hidden Trophy';
export const HIDDEN_TEXT = 'Kept hidden by the spoiler setting until you earn it.';

// A trophy counts as missable-flagged only when the curation marks it so.
// This entry flags nothing as confirmed: the official descriptions state no
// one-chance window, so the two flags that exist are labelled inference.
export function isFlagged(trophy) {
  return trophy.missable === 'inferred' || trophy.missable === true;
}

// Compose every active filter at once. `state` fields: kind ('all' or a
// kind), grade ('all' or a grade), query (free text), missableOnly,
// hideEarned, earned (a Set of ids). Search looks at name and description —
// but a spoiler-masked trophy is searched by its masked label only, so the
// search box can never leak a hidden name.
export function filterTrophies(trophies, state) {
  const q = (state.query || '').trim().toLowerCase();
  return trophies.filter((t) => {
    if (state.kind && state.kind !== 'all' && t.kind !== state.kind) return false;
    if (state.grade && state.grade !== 'all' && t.grade !== state.grade) return false;
    if (state.missableOnly && !isFlagged(t)) return false;
    if (state.hideEarned && state.earned && state.earned.has(t.id)) return false;
    if (q) {
      const view = displayTrophy(t, state);
      const hay = `${view.name} ${view.description}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}

// What the reader may see of a trophy. With spoilers on, a secret trophy that
// has not been earned is masked in name, description and guide; once earned
// (or with spoilers off) it shows in full.
export function displayTrophy(trophy, state) {
  const earned = state.earned ? state.earned.has(trophy.id) : false;
  const masked = Boolean(state.spoilers) && trophy.secret && !earned;
  if (!masked) {
    return { ...trophy, masked: false };
  }
  return {
    ...trophy,
    name: HIDDEN_LABEL,
    description: HIDDEN_TEXT,
    guide: HIDDEN_TEXT,
    steps: [],
    masked: true,
  };
}

// Roadmap rows obey the same masking: a masked trophy contributes only its
// hidden label, so stage lists never print a secret name either.
export function roadmapLabel(trophy, state) {
  return displayTrophy(trophy, state).name;
}

export function progressOf(trophies, earned) {
  const byGrade = {};
  for (const g of GRADES) byGrade[g] = { earned: 0, total: 0 };
  let done = 0;
  for (const t of trophies) {
    byGrade[t.grade].total += 1;
    if (earned.has(t.id)) {
      done += 1;
      byGrade[t.grade].earned += 1;
    }
  }
  const total = trophies.length;
  return {
    earned: done,
    total,
    percent: total === 0 ? 0 : Math.round((done / total) * 100),
    byGrade,
  };
}

// Group trophies by roadmap stage, in stage order, each stage carrying its
// own earned count so the roadmap view can show progress per stage.
export function roadmapGroups(trophies, earned) {
  return ROADMAP_STAGES.map((stage) => {
    const items = trophies.filter((t) => t.stage === stage.n);
    return {
      ...stage,
      items,
      earned: items.filter((t) => earned.has(t.id)).length,
      total: items.length,
    };
  });
}

// Export: a small, self-describing JSON document of earned ids only.
export function exportProgress(earned) {
  const ids = [...earned].sort((a, b) => a - b);
  return JSON.stringify({ app: 'leonida-platinum-companion', version: 1, earned: ids }, null, 2);
}

// Import: parse and validate strictly. Anything that is not our document —
// broken JSON, the wrong shape, unknown or duplicate ids — is rejected with
// a reason instead of being half-applied.
export function importProgress(text, trophies) {
  let doc;
  try {
    doc = JSON.parse(text);
  } catch {
    return { ok: false, error: 'That file is not valid JSON.' };
  }
  if (!doc || typeof doc !== 'object' || !Array.isArray(doc.earned)) {
    return { ok: false, error: 'That file does not hold an earned list.' };
  }
  const known = new Set(trophies.map((t) => t.id));
  const ids = new Set();
  for (const raw of doc.earned) {
    if (!Number.isInteger(raw) || !known.has(raw)) {
      return { ok: false, error: `Unknown trophy id in file: ${String(raw)}` };
    }
    if (ids.has(raw)) {
      return { ok: false, error: `Duplicate trophy id in file: ${raw}` };
    }
    ids.add(raw);
  }
  return { ok: true, earned: ids };
}
