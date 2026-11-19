// Pure logic for the Leonida Platinum Companion.
//
// Everything in this module is side-effect free and DOM-free so the test
// suite (tests/logic.test.mjs) can pin the behaviour down as contracts:
// filtering, spoiler masking, progress maths, export/import validation and
// roadmap grouping. app/app.js wires these functions to the page.

export const STAGE_TITLES = [
  'Story First',
  'Endings & Strands',
  '100% Push',
  'Long Grinds',
  'Free-Roam Feats, Heists & Money',
  'The Platinum',
];

export const STAGE_BLURBS = [
  'Play the campaign in order: the opening mission, Chapters 1-4 and the named story missions. Everything here unlocks by finishing the mission named in the official description.',
  'Finish the final mission, then close out every stranger strand — Andy, Kenton, Billy, Randy, Tyrone and Bret — which together also complete the 8-strand silver trophy.',
  'Chase the 100% counter: the gold completion trophy plus the collectible sweeps and breadth counters that feed it — cards, meditation spots, WAiNK locations, challenges and full exploration.',
  'The long counters that reward patience: 250 stunts, gold in all 42 Shooting Range challenges, drone-race wins at 14 locations, 20 different race wins, 100 vehicles discovered and 10 Scooter Bros registrations.',
  'Everything doable in free roam at your own pace: partner feats, stealth and heist trophies, one-off moments, and the money trophies — laundering, spending and the 8 garages.',
  'The platinum itself. It needs no action of its own: it is awarded when the other 54 trophies are all earned.',
];

export const KINDS = ['story', 'collectibles', 'activities', 'completion'];
export const GRADES = ['platinum', 'gold', 'silver', 'bronze'];

// A trophy is masked when spoiler mode is on, the trophy is secret, and the
// reader has not earned it yet. Earned secret trophies are always revealed.
export function isMasked(trophy, earnedIds, spoilerOn) {
  return Boolean(spoilerOn && trophy.secret && !earnedIds.has(trophy.id));
}

// What the reader sees for a trophy under the current spoiler state. Masked
// trophies expose only their grade and kind — never name, description,
// guide, steps or roadmap label.
export function displayFor(trophy, earnedIds, spoilerOn) {
  if (!isMasked(trophy, earnedIds, spoilerOn)) {
    return {
      masked: false,
      name: trophy.name,
      description: trophy.description,
      guide: trophy.guide,
      steps: trophy.steps,
      stageLabel: STAGE_TITLES[trophy.stage - 1],
    };
  }
  return {
    masked: true,
    name: 'Hidden Trophy',
    description: 'Hidden until earned. Spoiler mode is on.',
    guide: 'This guide is hidden until the trophy is earned.',
    steps: [],
    stageLabel: 'Hidden stage',
  };
}

// Filters compose: every active filter must pass for a trophy to show.
// `kinds` is a Set of selected kinds (empty set = all kinds).
// Masked trophies can only match a text search through fields that stay
// visible (grade and kind) — their hidden text never leaks into results.
export function filterTrophies(trophies, filters, earnedIds) {
  const query = (filters.query ?? '').trim().toLowerCase();
  return trophies.filter((t) => {
    if (filters.kinds && filters.kinds.size > 0 && !filters.kinds.has(t.kind)) return false;
    if (filters.grade && filters.grade !== 'all' && t.grade !== filters.grade) return false;
    if (filters.onlyWatch && !t.watch) return false;
    if (filters.hideEarned && earnedIds.has(t.id)) return false;
    if (query) {
      const view = displayFor(t, earnedIds, filters.spoilerOn);
      const haystack = [view.name, view.description, t.grade, t.kind]
        .join(' ')
        .toLowerCase();
      if (!haystack.includes(query)) return false;
    }
    return true;
  });
}

// Progress maths: overall count, percentage and per-grade earned/total.
export function progressSummary(trophies, earnedIds) {
  const byGrade = {};
  for (const g of GRADES) byGrade[g] = { earned: 0, total: 0 };
  let earned = 0;
  for (const t of trophies) {
    byGrade[t.grade].total += 1;
    if (earnedIds.has(t.id)) {
      earned += 1;
      byGrade[t.grade].earned += 1;
    }
  }
  const total = trophies.length;
  return {
    earned,
    total,
    percent: total === 0 ? 0 : Math.round((earned / total) * 100),
    byGrade,
  };
}

// Export: a small, self-describing JSON document of earned trophy ids.
export function serializeProgress(earnedIds) {
  return JSON.stringify(
    { app: 'leonida-platinum-companion', version: 1, earned: [...earnedIds].sort((a, b) => a - b) },
    null,
    2,
  );
}

// Import: parse and validate strictly. Anything that is not a JSON object
// with an "earned" array of known trophy ids is rejected with an error —
// garbage in must never silently become progress. Unknown ids are dropped
// and reported; duplicates collapse.
export function parseProgress(text, validIds) {
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error('That file is not valid JSON.');
  }
  if (parsed === null || typeof parsed !== 'object' || !Array.isArray(parsed.earned)) {
    throw new Error('That file does not look like exported progress (no "earned" list).');
  }
  const valid = new Set(validIds);
  const earned = new Set();
  const dropped = [];
  for (const value of parsed.earned) {
    if (Number.isInteger(value) && valid.has(value)) earned.add(value);
    else dropped.push(value);
  }
  return { earned, dropped };
}

// Roadmap: trophies grouped by their stage, stages in roadmap order, each
// stage carrying its title, blurb and earned count. Every trophy appears
// exactly once across the six stages.
export function roadmapStages(trophies, earnedIds) {
  return STAGE_TITLES.map((title, index) => {
    const members = trophies.filter((t) => t.stage === index + 1);
    return {
      stage: index + 1,
      title,
      blurb: STAGE_BLURBS[index],
      trophies: members,
      earned: members.filter((t) => earnedIds.has(t.id)).length,
      total: members.length,
    };
  });
}
