// Curation for Leonida Platinum Companion — written for this entry.
// Every guide below is my own wording, derived strictly from the trophy's
// official PlayStation description (the only in-game fact I assert). Where a
// description is a pun or a reaction line rather than an instruction, the
// guide says so plainly instead of inventing a mechanic. Sources are named
// beside each guide: the official description as published via Exophase (the
// one URL this entry cites), the Exophase list page, PSNProfiles by name, and
// the GTA Wiki for the collectible and lore cards.

export const OFFICIAL_VIA_EXOPHASE =
  'Official PlayStation trophy description, as published via Exophase — https://www.exophase.com/game/grand-theft-auto-vi-psn/trophies/';
export const EXOPHASE_LIST = 'Exophase — Grand Theft Auto VI (PS5) trophy list';
export const PSNPROFILES_LIST = 'PSNProfiles — Grand Theft Auto VI trophy list';
export const GTA_WIKI = 'GTA Wiki — collectible, vehicle and location reference pages';

// One entry per trophy id: kind, roadmap stage, missable flag, guide, steps,
// sources. missable is false everywhere except ids 44 and 48, which carry the
// string 'inferred' — a watch-list judgement, never stated as fact, because
// no official description describes a one-chance window.
export const CURATION = {
  1: {
    kind: 'completion', stage: 6, missable: false,
    guide: 'This is the platinum itself, and the official description — "Congratulations! You\'re a Leonida Legend." — gives it no task of its own: on PlayStation a platinum is awarded automatically the moment the other 54 trophies are all earned. Treat this tracker as the checklist for it. Work the roadmap in order, tick each trophy as it pops, and use the per-grade counters up top to spot what is left; when 54 of 55 are ticked and this is the only empty box, the missing row is the one still owed.',
    steps: ['Earn the other 54 trophies', 'Use the grade counters to find any stragglers', 'The platinum is awarded automatically'],
    sources: [OFFICIAL_VIA_EXOPHASE, EXOPHASE_LIST, PSNPROFILES_LIST],
  },
  2: {
    kind: 'story', stage: 1, missable: false,
    guide: 'The official description says "Complete Gone Fishing," which makes this the opening story beat of the game: finish that first mission and the trophy is yours. Because it sits at the very start of the campaign there is nothing to prepare and nothing to collect beforehand — start a new game, play the mission through to its end rather than quitting out mid-way, and let the completion register before you move on to free roam.',
    steps: ['Start the campaign', 'Play Gone Fishing through to completion', 'Let the mission-end screen register'],
    sources: [OFFICIAL_VIA_EXOPHASE, EXOPHASE_LIST, PSNPROFILES_LIST],
  },
  3: {
    kind: 'story', stage: 1, missable: false,
    guide: 'A pure story-progress trophy: the official description reads "Complete Chapter 1," so it is earned by playing the campaign\'s first chapter through to its final mission. No side content is required and the description names no optional objective, so the efficient route is simply to follow the main mission markers until the chapter closes. If you are also hunting collectibles, they can all wait — nothing in this description ties the trophy to anything outside Chapter 1 itself.',
    steps: ['Follow the main story markers', 'Finish the last mission of Chapter 1'],
    sources: [OFFICIAL_VIA_EXOPHASE, EXOPHASE_LIST],
  },
  4: {
    kind: 'story', stage: 1, missable: false,
    guide: 'Another chapter-completion trophy — "Complete Chapter 2" — carrying the list\'s one asterisk-masked name, printed exactly as PlayStation publishes it. It follows Paradise Lost in sequence, so it cannot be earned early or out of order: finish Chapter 1, keep following the campaign, and the trophy lands when Chapter 2\'s closing mission ends. The description attaches no score, time or difficulty condition, so play it however you like.',
    steps: ['Complete Chapter 1 first', 'Play through Chapter 2 to its final mission'],
    sources: [OFFICIAL_VIA_EXOPHASE, EXOPHASE_LIST, PSNPROFILES_LIST],
  },
  5: {
    kind: 'story', stage: 1, missable: false,
    guide: 'The third chapter trophy in a row: the official description is "Complete Chapter 3," and like the two before it the requirement is simply to reach the end of that chapter\'s story missions. Chapters are sequential, so your progress on this one is just campaign progress — there is no separate checklist to manage. Keep an eye on the tracker\'s story filter: ticking chapters off in order is the clearest early proof that the platinum run is on schedule.',
    steps: ['Finish Chapters 1 and 2', 'Complete the final mission of Chapter 3'],
    sources: [OFFICIAL_VIA_EXOPHASE, EXOPHASE_LIST],
  },
  6: {
    kind: 'story', stage: 1, missable: false,
    guide: '"Complete Chapter 4" — the last of the four numbered-chapter trophies, and the point where the numbered structure of the campaign gives way to the final mission named in You Gotta Know When to Get Off. The approach does not change: follow the main story, finish the chapter\'s missions in order, and the trophy registers at the chapter\'s end. The description states no optional condition, so detours for collectibles or activities can be left for the 100% push later in the roadmap.',
    steps: ['Finish Chapters 1–3', 'Play Chapter 4 through to its closing mission'],
    sources: [OFFICIAL_VIA_EXOPHASE, PSNPROFILES_LIST],
  },
  7: {
    kind: 'story', stage: 2, missable: false,
    guide: 'One of only two golds on the list, and the official description — "Complete the final mission" — marks it as the end of the campaign. Everything story-shaped before it is preparation: finish the four chapters and the named missions, then play the finale through its ending. Because it is gold, expect it to be the story trophy players earn last in a first run. Nothing in the description asks for a particular ending or choice, so complete the mission in full and let the credits-side completion register.',
    steps: ['Complete the four chapters', 'Finish the named story missions', 'Play the final mission to its end'],
    sources: [OFFICIAL_VIA_EXOPHASE, EXOPHASE_LIST, PSNPROFILES_LIST],
  },
  8: {
    kind: 'story', stage: 1, missable: false,
    guide: 'A named-mission story trophy: "Complete Breakfast Run." Named missions like this one sit inside the chapter structure rather than in free roam, so you will meet it by following the campaign rather than by hunting for a marker at a set hour. Play the mission from its start marker to its completion screen — leaving mid-mission and returning later still counts as long as the mission itself is finished, because the description asks for completion and nothing stricter.',
    steps: ['Reach Breakfast Run in the campaign', 'Finish the mission in full'],
    sources: [OFFICIAL_VIA_EXOPHASE, EXOPHASE_LIST],
  },
  9: {
    kind: 'story', stage: 1, missable: false,
    guide: 'The campaign\'s heist trophy: the official description reads "Complete The Cartel Heist." Heists in this series are multi-part story set pieces, so expect setup and execution beats rather than a single short job — the trophy cares about the finish, not about a score, a take amount or a clean getaway, none of which the description mentions. Play the heist through its final beat as part of the story and tick it off; the separate free-roam robbery trophies later in the list are their own thing.',
    steps: ['Reach The Cartel Heist in the story', 'Complete its setup and execution beats', 'Finish the heist'],
    sources: [OFFICIAL_VIA_EXOPHASE, PSNPROFILES_LIST],
  },
  10: {
    kind: 'story', stage: 1, missable: false,
    guide: '"Complete Child\'s Play" — another named story mission, earned the same way as Breakfast Run: reach it in the campaign and finish it. The description gives no extra condition, so there is no medal, timer or stealth requirement to chase unless the mission itself imposes one while you play. If you are following the roadmap, this belongs to the Story First stage: do it when the story offers it, tick the box, and keep the campaign moving toward the chapter trophies around it.',
    steps: ['Reach Child\'s Play in the campaign', 'Finish the mission in full'],
    sources: [OFFICIAL_VIA_EXOPHASE, EXOPHASE_LIST],
  },
  11: {
    kind: 'story', stage: 1, missable: false,
    guide: 'The official description is "Complete Headliners," a named story mission whose all-caps trophy name gives nothing extra away. Treat it exactly like the other named-mission trophies on the list: it arrives as part of the campaign sequence, and completion — not performance — is the whole requirement. Because the list hides this trophy until earned (it is one of the 28 secret trophies), do not be surprised that it is not visible on the console beforehand; this tracker shows it because the published list names it.',
    steps: ['Reach Headliners in the campaign', 'Finish the mission in full'],
    sources: [OFFICIAL_VIA_EXOPHASE, PSNPROFILES_LIST],
  },
  12: {
    kind: 'story', stage: 1, missable: false,
    guide: '"Complete VCIA Takedown." VCIA is the airport that appears again later in the list (Catch Me If You Can asks for an unscheduled departure there), but this trophy is the story version: a named campaign mission to finish, not a free-roam stunt. Play it when the campaign presents it and complete every objective the mission sets; the description adds no optional condition of its own. It is one of the hidden story trophies, so it will only appear on your console once it pops.',
    steps: ['Reach VCIA Takedown in the campaign', 'Complete all of the mission\'s objectives'],
    sources: [OFFICIAL_VIA_EXOPHASE, EXOPHASE_LIST, PSNPROFILES_LIST],
  },
  13: {
    kind: 'story', stage: 1, missable: false,
    guide: 'The last of the named-mission trophies in the early list: "Complete Operation Savage Glory." As with the others, the requirement is a full completion of that campaign mission, whenever the story schedules it. There is no separate collectible, score or difficulty clause in the description, so a normal playthrough earns it. Keep it in the Story First stage of your run; if you reach the final mission without it, check the tracker — a skipped optional start marker is the usual reason a named mission is still unticked.',
    steps: ['Reach Operation Savage Glory in the campaign', 'Finish the mission in full'],
    sources: [OFFICIAL_VIA_EXOPHASE, EXOPHASE_LIST],
  },
  14: {
    kind: 'completion', stage: 3, missable: false,
    guide: 'The second gold, and the trophy the whole middle of the roadmap serves: "Attain 100% Completion." The description does not print the completion checklist itself, so the honest way to read it is through the list around it — the collectibles, activities, challenges, strands and exploration trophies here are the visible shape of what 100% counts. Use the in-game completion counter as the authority while you play, work this tracker stage by stage, and expect this to be among the last trophies to land before the platinum.',
    steps: ['Follow the in-game completion counter', 'Clear the collectible and activity trophies', 'Finish every strand and challenge set the counter tracks'],
    sources: [OFFICIAL_VIA_EXOPHASE, EXOPHASE_LIST, PSNPROFILES_LIST],
  },
  15: {
    kind: 'activities', stage: 4, missable: false,
    guide: 'A long counter, stated plainly by the official description: "Complete 250 Stunts." Two hundred and fifty is far more than a campaign playthrough produces by accident, so chip away at it from the start rather than leaving it as a cleanup job. Take stunt opportunities whenever travel offers them, and save deliberate farming for the Long Grinds stage, repeating your most reliable stunt spot back to back.',
    steps: ['Take stunt opportunities during normal play', 'Track the running total against 250', 'Farm a repeatable stunt spot in the cleanup stage'],
    sources: [OFFICIAL_VIA_EXOPHASE, EXOPHASE_LIST, PSNPROFILES_LIST],
  },
  16: {
    kind: 'activities', stage: 3, missable: false,
    guide: 'The sampler trophy: "Try each type of activity once." The starter list\'s own hint counts nine activity types, and the description asks only that you try each one a single time — no wins, medals or completions are demanded here. It is one of the cheapest trophies on the list if you do it deliberately: whenever a new activity icon appears during the 100% push, stop and try it once, then move on. The deeper versions of these activities have their own trophies elsewhere in the list.',
    steps: ['Try one activity of each type you meet', 'Count types tried against the full set of nine', 'No wins required — one attempt each'],
    sources: [OFFICIAL_VIA_EXOPHASE, EXOPHASE_LIST],
  },
  17: {
    kind: 'activities', stage: 4, missable: false,
    guide: 'The list\'s marksmanship exam, in silver: "Earn a gold medal in all Shooting Range challenges," and the published list counts 42 challenges. Gold in all 42 is a skill trophy rather than a time trophy, so practise on the challenges that fall short instead of replaying the ones already gold. Learn each challenge\'s target pattern, retry immediately while the layout is fresh, and use the tracker to mark ranges off as their golds land — the last few stubborn challenges are the real work here.',
    steps: ['Attempt every Shooting Range challenge', 'Replay short ones until each is gold', 'Track golds against the total of 42'],
    sources: [OFFICIAL_VIA_EXOPHASE, EXOPHASE_LIST, PSNPROFILES_LIST],
  },
  18: {
    kind: 'activities', stage: 4, missable: false,
    guide: '"Win a Top Fun Drone Race at every location" — a win, not a finish, and at every location rather than a set number of wins. The published list counts 14 locations, so this is fourteen separate first places to earn. Learn each course with a practice run if the game allows it, then race to win; a course you have only completed does not count. Because locations are spread across Leonida, this pairs naturally with The Goodtime State\'s full-map exploration in the same stage of the run.',
    steps: ['Find each Top Fun Drone Race location', 'Win the race at that location', 'Repeat at all 14 locations'],
    sources: [OFFICIAL_VIA_EXOPHASE, EXOPHASE_LIST],
  },
  19: {
    kind: 'activities', stage: 4, missable: false,
    guide: 'Twenty different races, twenty wins: the official description reads "Win 20 different races," and the word "different" is the trap — winning the same race twenty times does not finish this. Keep a list as you go (this tracker\'s checkbox plus your own note of which races are done) and prefer entering races you have not yet won whenever you pass one. It sits in the Long Grinds stage because the wins accumulate slowly across a playthrough unless you go looking for them.',
    steps: ['Enter races across the map', 'Win each one before counting it', 'Reach 20 wins in 20 different races'],
    sources: [OFFICIAL_VIA_EXOPHASE, PSNPROFILES_LIST],
  },
  20: {
    kind: 'activities', stage: 3, missable: false,
    guide: 'A one-off contest trophy: "Beat Cal in a fishing challenge." Unlike the counters elsewhere on this list, this is a single head-to-head to win against a named character, so look for Cal\'s fishing challenge when fishing opens up and take it seriously on the first attempt — learn the challenge\'s scoring before the real run if a practice cast is offered. The description asks for a win over Cal specifically, so ordinary fishing, however successful, does not substitute for it.',
    steps: ['Unlock fishing and find Cal\'s challenge', 'Learn how the challenge is scored', 'Beat Cal in the challenge'],
    sources: [OFFICIAL_VIA_EXOPHASE, EXOPHASE_LIST],
  },
  21: {
    kind: 'activities', stage: 3, missable: false,
    guide: 'The lightest trophy on the list: "Complete an arcade game." One arcade game, completed once. When you pass an arcade machine during the story or the 100% push, stop and play one game through to its end rather than quitting at a high score — the description asks for completion, and what counts as completing a given cabinet is whatever that cabinet treats as its finish. It pairs well with Master of None, since an arcade visit is also one of the activity types to sample.',
    steps: ['Find an arcade game', 'Play one game through to completion'],
    sources: [OFFICIAL_VIA_EXOPHASE, PSNPROFILES_LIST],
  },
  22: {
    kind: 'story', stage: 2, missable: false,
    guide: 'The first of the companion-strand finales: "Complete the final mission for Andy." The key word is "final" — Andy\'s strand is a chain, and only its last mission earns this. Accept and work Andy\'s missions whenever they are offered instead of leaving them for the endgame, both to keep the strand moving and because the list hides this trophy until it pops. When the strand\'s last mission completes, the trophy lands; the same pattern repeats for Kenton, Billy, Randy and Tyrone below.',
    steps: ['Work Andy\'s mission strand as it appears', 'Complete the strand\'s final mission'],
    sources: [OFFICIAL_VIA_EXOPHASE, EXOPHASE_LIST, PSNPROFILES_LIST],
  },
  23: {
    kind: 'story', stage: 2, missable: false,
    guide: '"Complete the final mission for Kenton." Same shape as Andy\'s finale: a strand of missions for one character, with the trophy attached to the last of them rather than to any single job along the way. Strands like these are easy to leave half-finished while the main story pulls you elsewhere, so use the tracker — if this box is still empty in the Endings & Strands stage, Kenton has a mission waiting somewhere. Finish the chain and the trophy is automatic.',
    steps: ['Work Kenton\'s mission strand', 'Complete the strand\'s final mission'],
    sources: [OFFICIAL_VIA_EXOPHASE, EXOPHASE_LIST],
  },
  24: {
    kind: 'story', stage: 2, missable: false,
    guide: 'Billy\'s strand finale: the official description is "Complete the final mission for Billy." The Lone Rider name hints at the character rather than at any extra condition, and the description itself sets none — no vehicle, route or solo requirement is stated, so do not invent one. Play Billy\'s missions through their chain as they surface during and after the campaign, finish the last one, and the trophy registers. It is hidden until earned, like the other strand finales around it.',
    steps: ['Work Billy\'s mission strand', 'Complete the strand\'s final mission'],
    sources: [OFFICIAL_VIA_EXOPHASE, PSNPROFILES_LIST],
  },
  25: {
    kind: 'story', stage: 2, missable: false,
    guide: 'The silver that gathers the whole strand system together: "Complete 8 mission strands for strangers across the state of Leonida." Eight full strands — not eight missions — spread across the map, which is why this sits in the Endings & Strands stage rather than Story First. The named finales for Andy, Kenton, Billy, Randy and Tyrone are strands of exactly this kind. Explore between story beats, accept stranger missions when they appear, and finish each strand you start; half-finished strands do not count toward the eight.',
    steps: ['Accept stranger mission strands across Leonida', 'Finish each strand in full', 'Reach 8 completed strands'],
    sources: [OFFICIAL_VIA_EXOPHASE, EXOPHASE_LIST, PSNPROFILES_LIST],
  },
  26: {
    kind: 'story', stage: 2, missable: false,
    guide: '"Complete the final mission for Randy." Randy\'s strand follows the same rule as the other named companions: a chain of missions, trophy on the last one. Because these finales are hidden trophies, your console will not show this one coming — the tracker is the reliable record. Work Randy\'s jobs when they are offered, and if the strand seems to stall, progress the story or the other strands and check back; strand chains commonly gate their later missions behind general progress.',
    steps: ['Work Randy\'s mission strand', 'Complete the strand\'s final mission'],
    sources: [OFFICIAL_VIA_EXOPHASE, EXOPHASE_LIST],
  },
  27: {
    kind: 'story', stage: 2, missable: false,
    guide: 'The last of the five named strand finales: "Complete the final mission for Tyrone." Nothing in the description adds a condition beyond finishing Tyrone\'s chain, so the work is simply persistence — strands are long, and their final missions only appear once the earlier ones are done. Together with Andy, Kenton, Billy and Randy, this completes the set the roadmap\'s second stage is built around, and each finished strand also counts toward the eight that Strangers & Freaks requires.',
    steps: ['Work Tyrone\'s mission strand', 'Complete the strand\'s final mission'],
    sources: [OFFICIAL_VIA_EXOPHASE, PSNPROFILES_LIST],
  },
  28: {
    kind: 'collectibles', stage: 3, missable: false,
    guide: 'A collectible set with a quiet theme: "Meditate at every spot across Leonida," and the published list counts 18 spots. This is a find-them-all trophy, so the work is coverage rather than skill — visit each meditation spot once and actually meditate there; walking past a spot without using it is the usual reason a set like this stalls at 17 of 18. Spread the hunt across the 100% push instead of leaving all 18 for one evening, and let exploration for The Goodtime State carry you past most of them.',
    steps: ['Find meditation spots while exploring', 'Meditate at each one', 'Reach all 18 spots'],
    sources: [OFFICIAL_VIA_EXOPHASE, EXOPHASE_LIST, GTA_WIKI],
  },
  29: {
    kind: 'activities', stage: 2, missable: false,
    guide: 'A hunting trophy with a specific quarry: "Hunt a unique animal for Bret." The description promises one particular animal rather than a tally of ordinary hunts, and ties it to Bret — so this belongs with the strand work in stage two: take Bret\'s hunt when it is offered and follow it through. "Unique" suggests a one-off encounter rather than a species you can farm, so if the hunt fails or the animal escapes, reload or re-approach rather than assuming any similar animal will count in its place.',
    steps: ['Take the hunting job from Bret', 'Track the unique animal', 'Complete the hunt'],
    sources: [OFFICIAL_VIA_EXOPHASE, EXOPHASE_LIST, PSNPROFILES_LIST],
  },
  30: {
    kind: 'collectibles', stage: 3, missable: false,
    guide: 'The card collector\'s silver: "Complete 3 Collectible Card sets." Note what it does not ask for — not every card in the game, but three complete sets, so strategy beats coverage: finish the three sets you are closest to completing instead of spreading pickups evenly. Cards are found out in the world, so exploration feeds this naturally; the GTA Wiki\'s collectible pages say what belongs to which set.',
    steps: ['Collect cards while exploring', 'Focus on the three sets nearest completion', 'Finish 3 complete sets'],
    sources: [OFFICIAL_VIA_EXOPHASE, PSNPROFILES_LIST, GTA_WIKI],
  },
  31: {
    kind: 'collectibles', stage: 4, missable: false,
    guide: 'A silver built on repetition at scale: "WAiNK It at 100 locations." One hundred distinct locations makes this a Long Grinds trophy even though each individual stop is trivial. The efficient pattern is to fold it into travel you are already doing — stunts, races and exploration all cross the map — and to keep count with the tracker so the last twenty do not become a scavenger hunt. The description names the action and the total; it does not say the locations are hidden, so ordinary thorough play should surface most of them.',
    steps: ['Use the WAiNK action whenever a new location offers it', 'Prefer new locations over repeats', 'Reach 100 locations'],
    sources: [OFFICIAL_VIA_EXOPHASE, EXOPHASE_LIST, GTA_WIKI],
  },
  32: {
    kind: 'activities', stage: 3, missable: false,
    guide: '"Complete 50 Challenges" — a broad counter that rewards varied play over focused farming. Challenges in a game like this are usually the small tracked tasks scattered through activities and free roam, so the fastest route is breadth: while working the 100% push, finish challenges as they present themselves instead of hunting one repeatable type. Fifty is a mid-sized total; most players who sample everything (see Master of None) will find a good share of these already done when they first check the count.',
    steps: ['Complete challenges as activities offer them', 'Vary activity types to surface new challenges', 'Reach 50 completed challenges'],
    sources: [OFFICIAL_VIA_EXOPHASE, PSNPROFILES_LIST],
  },
  33: {
    kind: 'activities', stage: 5, missable: false,
    guide: 'A partner escape with a specific heat level: "Lose a 4 star Wanted Level with your partner and escape the heat." Both halves matter — you must be with your partner, and the wanted level you lose must be four stars, not two or three. Build the heat deliberately in free roam together, then break line of sight and stay hidden until the stars clear. Doing it during a story mission risks the mission\'s own fail states, so stage it in free roam where a failed attempt costs nothing but time.',
    steps: ['Free-roam with your partner', 'Raise the wanted level to 4 stars', 'Break pursuit and stay hidden until the heat clears'],
    sources: [OFFICIAL_VIA_EXOPHASE, EXOPHASE_LIST],
  },
  34: {
    kind: 'activities', stage: 5, missable: false,
    guide: 'A chained robbery with a continuity condition: "Rob 3 shops back-to-back with your partner without losing your Wanted Level." The wanted level is the thread — if it drops to zero between shops, the chain breaks. Plan a tight route of three shops close together, rob the first, move straight to the second while the heat is still on you, and keep the run alive to the third. Attempt it in free roam with your partner, with a fast vehicle staged outside each shop, and expect a practice run or two.',
    steps: ['Pick three shops close together', 'Rob the first with your partner and keep the wanted level', 'Rob the second and third without the heat dropping'],
    sources: [OFFICIAL_VIA_EXOPHASE, PSNPROFILES_LIST],
  },
  35: {
    kind: 'collectibles', stage: 5, missable: false,
    guide: '"Discover 100 vehicles" — a discovery counter, not a purchase or theft counter: the description says discover, so encountering and registering new models is the work. One hundred is a lot of variety, so vary your hunting ground: different districts, different times, parked cars as well as traffic. This pairs naturally with On the Spot (registering vehicles to the Scooter Bros app) and with ordinary exploration; check the tracker when you pass roughly half the map explored, because a shortfall here usually means whole districts are still unvisited.',
    steps: ['Explore varied districts and traffic', 'Discover new vehicle models as you meet them', 'Reach 100 discovered vehicles'],
    sources: [OFFICIAL_VIA_EXOPHASE, EXOPHASE_LIST, GTA_WIKI],
  },
  36: {
    kind: 'activities', stage: 5, missable: false,
    guide: 'A combat-window trophy: "Take down 5 enemies in a single use of Combat Focus." The whole requirement lives inside one activation, so preparation is everything — trigger Combat Focus only when at least five enemies are already in range and in view, not at the first contact of a fight. Crowded mid-mission firefights are the natural stage for it. If an activation ends at three or four takedowns, do not waste the next one the same way: reposition, let the group bunch up, then fire the ability.',
    steps: ['Find a fight with at least five enemies in range', 'Activate Combat Focus once', 'Take down 5 enemies before it ends'],
    sources: [OFFICIAL_VIA_EXOPHASE, EXOPHASE_LIST, PSNPROFILES_LIST],
  },
  37: {
    kind: 'activities', stage: 5, missable: false,
    guide: 'The description is a wink — "Make an unscheduled departure at VCIA" — and it is one of the list\'s hidden trophies. Read plainly, it asks you to leave the airport in a way the airport did not schedule: in practice that points at taking off in an aircraft from VCIA outside any mission or booked flight. The official text does not spell out the exact trigger, so experiment in free roam at the airport rather than during the VCIA Takedown story mission, and try a full take-off roll down the runway if simply entering a plane does not register it.',
    steps: ['Go to VCIA in free roam', 'Take an aircraft out without a scheduled flight', 'Complete the departure until the trophy registers'],
    sources: [OFFICIAL_VIA_EXOPHASE, EXOPHASE_LIST],
  },
  38: {
    kind: 'activities', stage: 5, missable: false,
    guide: 'Honesty first: the official description for this one is only a joke — "Kinda hot in these Rhinos." — and Rhinos in this series are tanks, so the trophy plainly involves a Rhino tank in some way, but the description does not state whether you must drive one, survive one, destroy one or something else. It is a hidden trophy, which fits an incidental feat rather than a checklist item. My advice is to treat encounters with Rhinos as opportunities: when the military hardware appears, engage with it rather than fleeing, and note what you were doing if it pops.',
    steps: ['Watch for Rhino tanks in free roam and missions', 'Engage with the Rhino instead of avoiding it', 'Note the exact action if it pops, for other players'],
    sources: [OFFICIAL_VIA_EXOPHASE, PSNPROFILES_LIST],
  },
  39: {
    kind: 'activities', stage: 5, missable: false,
    guide: 'A clean-crime trophy: "Rob a jewelry store without being detected." Detection is the fail state, so this is a stealth exercise rather than a robbery spree — the opposite approach to Retail Therapy. Scout the store first, plan your entry and exit, and if you are spotted, leave and reset rather than finishing messily; a detected robbery does not count even if you escape with the goods. The description does not demand a partner or a particular store, so choose the quietest jewelry store you know.',
    steps: ['Choose a jewelry store and scout it', 'Rob it while staying undetected', 'Escape without detection registering'],
    sources: [OFFICIAL_VIA_EXOPHASE, EXOPHASE_LIST, PSNPROFILES_LIST],
  },
  40: {
    kind: 'activities', stage: 5, missable: false,
    guide: 'The robbery silver: "Rob 5 Bank Vaults and escape." Five separate vault robberies, each closed out by a successful escape — a robbery you are caught after does not finish its half of the bargain. Space these out across the Free-Roam Feats stage rather than chaining them under rising pressure, and treat each escape as part of the objective: plan the getaway before you crack the vault, not after the alarm. Together with the armored-truck and shop trophies nearby, this is the core of the list\'s heist-and-money cluster.',
    steps: ['Rob a bank vault', 'Escape cleanly afterwards', 'Repeat for 5 vaults in total'],
    sources: [OFFICIAL_VIA_EXOPHASE, EXOPHASE_LIST],
  },
  41: {
    kind: 'activities', stage: 5, missable: false,
    guide: '"Rob an Armored Truck and escape." A single, complete job: find an armored truck in free roam, rob it, and get away — the escape is written into the description, so a robbery that ends in arrest or death mid-loot is not enough. Armored trucks are tougher than ordinary vehicles, so bring firepower or a plan for the doors, and have an escape route in mind before you start. One success is all it takes; if your first truck gets away from you, the next patrol is a fresh chance.',
    steps: ['Find an armored truck in free roam', 'Rob it', 'Escape with the take'],
    sources: [OFFICIAL_VIA_EXOPHASE, PSNPROFILES_LIST],
  },
  42: {
    kind: 'collectibles', stage: 3, missable: false,
    guide: 'The cartographer\'s trophy: "Explore all of Leonida," and the published list puts the state at 52 areas. Exploration trophies are earned by coverage, so the method is systematic — sweep district by district during the 100% push instead of relying on story travel, which tends to revisit the same corridors. The stubborn last areas are usually small pockets between major zones, so when the count stalls, compare your map against the total of 52 and hunt the gaps rather than re-driving the highways.',
    steps: ['Travel every district of Leonida', 'Check the explored count against 52 areas', 'Hunt unvisited pockets when the count stalls'],
    sources: [OFFICIAL_VIA_EXOPHASE, EXOPHASE_LIST, GTA_WIKI],
  },
  43: {
    kind: 'activities', stage: 5, missable: false,
    guide: 'A gang-by-gang robbery set: "Rob an Illegal Operation belonging to each gang," and the published list counts 9 gangs. One operation per gang — breadth again, not depth — so keep a written tally of which gangs you have hit, because the game-facing counter will not necessarily name the missing ones for you. Spread these across the Free-Roam Feats stage as you explore each gang\'s territory, and let The Goodtime State\'s map coverage introduce you to operations you would otherwise drive past.',
    steps: ['Find an illegal operation for a gang', 'Rob it and escape', 'Repeat until all 9 gangs are covered'],
    sources: [OFFICIAL_VIA_EXOPHASE, EXOPHASE_LIST, PSNPROFILES_LIST],
  },
  44: {
    kind: 'activities', stage: 5, missable: 'inferred',
    guide: 'INFERRED WATCH-LIST — not a confirmed missable. The official description, "Enjoy a cocktail with a view on Ocean Beach," describes a small, specific moment in a specific place, and moments like this are the kind that can be tied to a story visit rather than repeatable free roam. No official text says the chance can be lost, so this tracker flags it as inference only: the safe play is simply to do it early. When you are first at Ocean Beach, stop, get the cocktail with the view, and tick the box — after that the question never matters.',
    steps: ['Visit Ocean Beach early in the game', 'Have a cocktail with a view there', 'Tick it off so the inferred risk is closed'],
    sources: [OFFICIAL_VIA_EXOPHASE, EXOPHASE_LIST],
  },
  45: {
    kind: 'activities', stage: 5, missable: false,
    guide: 'A set-piece exit: "Smash your way out of a vehicle showroom in classic style." The description asks for a specific kind of escape — driving out through the showroom rather than leaving politely — so when a story beat or a theft puts you inside a vehicle showroom with a car available, take the dramatic door. It is a hidden trophy, which suits a moment the game stages once. If you are already past such a scene without it, look for showrooms in free roam; the description does not limit the feat to a mission.',
    steps: ['Get inside a vehicle showroom with a vehicle', 'Drive out through the showroom front', 'Escape the area'],
    sources: [OFFICIAL_VIA_EXOPHASE, EXOPHASE_LIST],
  },
  46: {
    kind: 'activities', stage: 5, missable: false,
    guide: '"Follow-through at the Kolt & Associates\' bowling alley." The trophy name — Let\'s Go Bowling — and the description agree that this is about bowling at one named alley, but "follow-through" is a bowling term for the arm motion after release, and the official text does not say whether a game, a strike or a specific score is required. Start with the obvious: go to the Kolt & Associates alley and bowl a full game there. If that does not register it, the follow-through wording points at technique — bowl properly rather than skipping animations.',
    steps: ['Go to the Kolt & Associates bowling alley', 'Bowl a full game there', 'If it does not pop, focus on clean follow-through throws'],
    sources: [OFFICIAL_VIA_EXOPHASE, PSNPROFILES_LIST],
  },
  47: {
    kind: 'activities', stage: 5, missable: false,
    guide: 'Another description that is a reaction rather than an instruction: "A partnership with mass appeal." It tells you the theme — the two protagonists\' partnership, presented publicly — and nothing about a trigger, a place or a count. This is a hidden trophy, so treat it as a story-adjacent moment most likely earned by playing rather than by hunting: finish the campaign and the strands first, keep both partners involved in free-roam feats like Hot Together and Retail Therapy, and only go looking for it specifically if it is still missing at cleanup.',
    steps: ['Complete the campaign and companion strands', 'Play partner activities in free roam', 'Revisit only if it is still missing at cleanup'],
    sources: [OFFICIAL_VIA_EXOPHASE, EXOPHASE_LIST],
  },
  48: {
    kind: 'activities', stage: 5, missable: 'inferred',
    guide: 'INFERRED WATCH-LIST — not a confirmed missable. The official description is four words of shrug — "Choices made (for better or worse)" — but the published list notes that PlayStation tracks a count up to 500 for it, which suggests choices accumulate over a whole playthrough. The inference behind the flag: if choices are made in story moments that cannot be replayed, a very passive run might reach the end short of chances. No official text says that, so treat the flag as a prompt to engage with choices as they come, not as a warning of a proven trap.',
    steps: ['Make choices actively as the game offers them', 'Watch the tracked count climb toward 500', 'Do not leave choice prompts unanswered by default'],
    sources: [OFFICIAL_VIA_EXOPHASE, PSNPROFILES_LIST],
  },
  49: {
    kind: 'activities', stage: 5, missable: false,
    guide: '"Second time\'s the charm" is the whole description — a proverb, not a procedure. Read literally, this hidden trophy rewards succeeding at something on a second attempt after a first failure. The description does not name the something, so the practical approach is to not reload the instant anything fails: let failures stand where the game allows a retry, and take the retry. If you play flawlessly or reload every mistake, you may never create the fail-then-succeed pair this appears to want; a deliberate fail-and-retry on a low-stakes challenge is the cheap experiment.',
    steps: ['Let a failed attempt stand instead of reloading', 'Retry the same task', 'Succeed on the second attempt'],
    sources: [OFFICIAL_VIA_EXOPHASE, EXOPHASE_LIST],
  },
  50: {
    kind: 'activities', stage: 5, missable: false,
    guide: 'The description — "What the hell just happened?" — is a reaction line, and the trophy name, The Truth Is Out There, points at something strange: an unexplained event, sighting or encounter somewhere in Leonida. Hidden trophies of this shape are usually one specific scripted oddity rather than a counter, so there is no honest step-by-step to give from the official text alone. Explore off the beaten path during the Free-Roam Feats stage, investigate odd sights instead of driving past them, and expect this to be a moment you recognise when it happens.',
    steps: ['Explore beyond the story routes', 'Investigate strange sights and events', 'Witness the oddity through to its end'],
    sources: [OFFICIAL_VIA_EXOPHASE, PSNPROFILES_LIST],
  },
  51: {
    kind: 'activities', stage: 5, missable: false,
    guide: 'A driving feat with a bowling joke for a name: "Bowl \'em over with a melee drive-by." The description is unusually specific for this part of the list — the takedown must be a melee drive-by, striking someone from a moving vehicle with a melee attack rather than shooting them. Line up a target at low speed so the swing connects, and do it somewhere open where a miss costs nothing. One clean connection should be the whole requirement; if a hit does not register, vary the speed — too fast tends to turn the hit into a collision instead.',
    steps: ['Drive slowly alongside a target on foot', 'Use a melee attack from the vehicle', 'Connect the melee drive-by takedown'],
    sources: [OFFICIAL_VIA_EXOPHASE, EXOPHASE_LIST, PSNPROFILES_LIST],
  },
  52: {
    kind: 'activities', stage: 5, missable: false,
    guide: 'The laundering counter: "Earn $250,000 laundering Marked Bills through your contacts." A quarter of a million is a real total, so this is an income habit rather than a single job — route marked bills through your contacts whenever you hold them instead of spending or sitting on them, and let the total build across the whole Free-Roam Feats stage. It pairs with the robbery trophies around it, which are the natural source of marked money. Keep the tracker\'s money trophies together in your head: launder first, because Treat Yo Self\'s spending is easier to finish late.',
    steps: ['Take work that pays in marked bills', 'Launder them through your contacts', 'Build the laundered total to $250,000'],
    sources: [OFFICIAL_VIA_EXOPHASE, EXOPHASE_LIST],
  },
  53: {
    kind: 'activities', stage: 5, missable: false,
    guide: '"Spend $100,000 across all shops." The friendliest money trophy on the list: ordinary spending counts, spread across all shops rather than in one place, so most of it accrues by simply not hoarding cash — buy vehicles, clothes, weapons and services as you go instead of saving for an endgame that spends it worse. If you reach the cleanup stage short of the total, the gap is a shopping trip, not a grind. Note the order of operations with Dime on the Dollar: laundering marked bills earns money that ordinary spending can then put toward this counter.',
    steps: ['Spend normally across shops as you play', 'Avoid hoarding cash with nothing to buy', 'Top up with a shopping trip if the total lags'],
    sources: [OFFICIAL_VIA_EXOPHASE, PSNPROFILES_LIST],
  },
  54: {
    kind: 'completion', stage: 5, missable: false,
    guide: 'A property set: "Purchase all garage properties," and the published list counts 8 garages. This is a completion trophy wearing a money trophy\'s clothes — you need both the cash and the coverage, since the garages are spread across Leonida and each must actually be bought. Buy them as their districts open up and your income grows rather than saving all eight for the end; the laundering and robbery trophies in this stage are the income that funds them. When the count stalls at seven, the missing garage is in a district you have not explored.',
    steps: ['Explore districts to find garage properties', 'Buy each garage as funds allow', 'Own all 8 garages'],
    sources: [OFFICIAL_VIA_EXOPHASE, EXOPHASE_LIST, PSNPROFILES_LIST],
  },
  55: {
    kind: 'activities', stage: 5, missable: false,
    guide: 'The list closes with an app errand: "Register 10 vehicles to the Scooter Bros app." Ten registrations is a small, deliberate total — whenever you discover a new vehicle (and Whip It Good will have you discovering a hundred), take the extra moment to register it if you have not already. Doing the two together turns a hundred discoveries into ten registrations without a separate hunt. If you reach ten discoveries without registering, the fix is trivial: your next ten vehicles, registered one by one as you meet them.',
    steps: ['Register vehicles to the Scooter Bros app as you find them', 'Pair registrations with vehicle discoveries', 'Reach 10 registered vehicles'],
    sources: [OFFICIAL_VIA_EXOPHASE, EXOPHASE_LIST],
  },
};
