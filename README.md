# Leonida Platinum Companion

[![make.fun — Build the best GTA 6 trophy guide](https://make.fun/badge/gta6-trophy-guide-01.svg)](https://make.fun/bounty/gta6-trophy-guide-01)
[![Rank](https://make.fun/badge/gta6-trophy-guide-01/Abdul99090/leonida-platinum-companion/rank.svg)](https://make.fun/bounty/gta6-trophy-guide-01)
[![Reward](https://make.fun/badge/gta6-trophy-guide-01/Abdul99090/leonida-platinum-companion/reward.svg)](https://make.fun/bounty/gta6-trophy-guide-01)

An offline guide and tracker for all 55 PlayStation 5 trophies of Grand Theft Auto VI, built for the make.fun competition [Build the best GTA 6 trophy guide](https://make.fun/bounty/gta6-trophy-guide-01).

## What it is

A single static web app (no build step, no network at run time) with a warm-paper editorial look of its own — no Rockstar Games artwork, logos or screenshots anywhere.

- **Tracker.** Every one of the 55 trophies with its official name, description and grade, exactly as PlayStation publishes them. Tick trophies off and progress is saved in the browser (localStorage), with the earned count and per-grade counters in the masthead. Progress exports to a JSON file and imports back, with strict validation — a file that is not exported progress is rejected, never silently swallowed.
- **Guides.** Each trophy carries a guide written for this entry, in our own words, derived from its official description, plus 2–4 short steps. Every card shows a prominent **Sources:** box naming where its facts come from: the official PlayStation description as published via Exophase, the Exophase list page, and PSNProfiles (with GTA Wiki cited on the collectible and location cards where it is genuinely useful). Where an official description is only a joke or a reaction line and states no mechanic, the guide says so honestly instead of inventing one.
- **Roadmap.** Six stages — Story First → Endings & Strands → 100% Push → Long Grinds → Free-Roam Feats, Heists & Money → The Platinum — built from the chapters, missions, collectibles and counts in the official descriptions.
- **Missables, honestly.** No official description states a one-chance window, so there are **no confirmed missables**. Two trophies (ids 44 and 48) sit on an **INFERRED watch-list**, labelled as inference in the list, on their cards, in the roadmap and in a dedicated callout — never presented as fact.
- **Spoiler mode.** A toggle masks secret trophies' names, descriptions, guides and roadmap labels until they are earned (28 of the 55 are secret on PlayStation; the flags come from the official case files for the same list).
- **Filters that compose.** Kind chips (story / collectibles / activities / completion), a grade select, text search, missable watch-list only, and hide-earned — all combinable. Masked trophies cannot be found through search by their hidden text.

## Run it

```sh
node serve.ts            # serves app/ at http://localhost:8080
```

Then open <http://localhost:8080> in a desktop browser. The app also works straight from any static file server with `app/` at its root, and fully offline.

## Hand it in (the entry program)

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` copies `app/` and `screenshots/` to the output directory and writes `dossier.json` using the kit's `vendor/makefun-frontend.ts`, kept byte for byte as shipped.

## How the data was made

`app/data/trophies.json` is generated, not hand-copied: `tools/build-data.mjs` merges the official starter list (names, descriptions, grades), the official forecast case files (secret flags for the same 55 ids) and this entry's own curation (`tools/curation.mjs` — the guides, steps, kinds, stages and sources, written for this entry), and refuses to emit output if any source disagrees or any guide is incomplete. Regenerate with:

```sh
node tools/build-data.mjs
```

## Tests

```sh
node --test tests/
```

Seven contract tests: data integrity against the official list, guide/steps/sources completeness on all 55, filter composition, spoiler masking, progress maths, export/import round-trip with garbage rejection, and roadmap coverage and order.

## Screenshots

The four screenshots in `screenshots/` are staged deterministically through the app's own `?shot=` states and captured by `tools/capture.mjs` (headless Chromium, 1280×800 JPEG); `shots.json` describes what each one shows.

## License

MIT — see `LICENSE`.
