// Curation for the Leonida Platinum Companion.
//
// Everything in this file was written for this entry. Each guide is my own
// paraphrase of what the official PlayStation description actually says —
// nothing more. Where the official text only gives a count, the guide works
// with that count. Where the official text is a joke or a reaction line and
// states no mechanic at all, the guide says exactly that instead of
// inventing one. Source names below are citations, not copied text: the
// official description as published via Exophase, the Exophase list page
// itself, and the PSNProfiles list for grades and tracked counts. GTA Wiki
// is cited only on the handful of collectible / place cards where a
// community reference for the terminology is genuinely useful.
//
// Fields per trophy: guide (own words), steps (2-4 short actions),
// kind (story | collectibles | activities | completion),
// stage (1-6, see STAGE_TITLES in app/src/logic.js),
// sources (2-4 named citations), watch (true only for the two
// INFERRED watch-list trophies, ids 44 and 48).

export const EXOPHASE_LIST_URL =
  'https://www.exophase.com/game/grand-theft-auto-vi-psn/trophies/';

const OFFICIAL =
  'Official PlayStation trophy description, as published via Exophase';
const LIST_PAGE = 'Exophase — GTA VI trophy list page: ' + EXOPHASE_LIST_URL;
const PSN =
  'PSNProfiles — GTA VI trophy list (grades and PlayStation-tracked counts)';
const WIKI =
  'GTA Wiki — community reference for collectible and location terminology';

export const CURATION = {
  1: {
    kind: 'completion',
    stage: 6,
    sources: [OFFICIAL, LIST_PAGE],
    guide:
      'This is the platinum itself, so there is nothing separate to perform: PlayStation grants it once the other 54 trophies on the list are all earned. Treat it as the finish line of the roadmap in this app — clear the story stages first, then the long counters, then the free-roam feats — and it unlocks on its own when the last of the 54 lands.',
    steps: [
      'Earn every other trophy on the list (54 in total).',
      'Use the progress counters in the masthead to see what remains.',
      'The platinum is awarded automatically; no extra action is needed.',
    ],
  },
  2: {
    kind: 'story',
    stage: 1,
    sources: [OFFICIAL, LIST_PAGE, PSN],
    guide:
      'The official description ties this trophy to one named job: Gone Fishing, the opening mission of the game. Play the story from a fresh start and finish that mission; the trophy is a story unlock, not a feat, so no side conditions, score targets or collectibles are involved according to the published text.',
    steps: [
      'Start the story and play the opening mission, Gone Fishing.',
      'Complete the mission in full.',
      'The trophy unlocks as the mission concludes.',
    ],
  },
  3: {
    kind: 'story',
    stage: 1,
    sources: [OFFICIAL, LIST_PAGE, PSN],
    guide:
      'A chapter-completion trophy: the official description asks only for Chapter 1 to be completed. Keep following the main story markers after the opening mission and finish every mission the game groups into its first chapter; the trophy fires when the chapter closes, with no optional content required by the description.',
    steps: [
      'Continue the main story after Gone Fishing.',
      'Finish all missions belonging to Chapter 1.',
      'The trophy unlocks at the end of the chapter.',
    ],
  },
  4: {
    kind: 'story',
    stage: 1,
    sources: [OFFICIAL, LIST_PAGE, PSN],
    guide:
      'Another chapter-completion trophy — this one for Chapter 2. The name is censored in the official list itself, asterisks included, and the requirement underneath is plain: play the main story through to the end of its second chapter. Nothing in the description adds a difficulty, score or no-death condition.',
    steps: [
      'Keep playing the main story into Chapter 2.',
      'Finish all missions belonging to Chapter 2.',
      'The trophy unlocks at the end of the chapter.',
    ],
  },
  5: {
    kind: 'story',
    stage: 1,
    sources: [OFFICIAL, LIST_PAGE, PSN],
    guide:
      'Chapter 3 completion, per the official description. The pattern of the list is consistent by this point: each chapter trophy is earned simply by finishing that chapter of the main story. Keep working through the story missions in order and this unlocks as Chapter 3 wraps up.',
    steps: [
      'Continue the main story into Chapter 3.',
      'Finish all missions belonging to Chapter 3.',
      'The trophy unlocks at the end of the chapter.',
    ],
  },
  6: {
    kind: 'story',
    stage: 1,
    sources: [OFFICIAL, LIST_PAGE, PSN],
    guide:
      'Chapter 4 completion, per the official description. As with the earlier chapter trophies, the published requirement is completion only — finish the fourth chapter of the main story and the trophy is yours. If you are following the roadmap, this is the last of the numbered chapter trophies before the finale stage.',
    steps: [
      'Continue the main story into Chapter 4.',
      'Finish all missions belonging to Chapter 4.',
      'The trophy unlocks at the end of the chapter.',
    ],
  },
  7: {
    kind: 'story',
    stage: 2,
    sources: [OFFICIAL, LIST_PAGE, PSN],
    guide:
      'The gold story trophy: the official description asks for the final mission of the game to be completed. This is the natural end of a full story playthrough, so the practical advice is sequencing — leave it until the chapter trophies are done, then play the campaign through its last mission. The description names no alternate-ending condition.',
    steps: [
      'Play the main story through all of its chapters.',
      'Start and complete the final mission.',
      'The trophy unlocks as the campaign concludes.',
    ],
  },
  8: {
    kind: 'story',
    stage: 1,
    sources: [OFFICIAL, LIST_PAGE, PSN],
    guide:
      'A named-mission trophy: the official description requires the mission Breakfast Run to be completed. Named-mission trophies like this one sit inside the story flow, so expect it to unlock during a normal playthrough when that mission appears; the description adds no performance condition on top of finishing it.',
    steps: [
      'Progress the story until the Breakfast Run mission appears.',
      'Complete the mission.',
      'The trophy unlocks on completion.',
    ],
  },
  9: {
    kind: 'story',
    stage: 1,
    sources: [OFFICIAL, LIST_PAGE, PSN],
    guide:
      'A named-mission trophy for The Cartel Heist, per the official description. Heist missions are story set pieces, so the route is simply to reach this mission in the campaign and finish it. The published text asks for completion only — it does not demand a particular approach, crew choice or payout target.',
    steps: [
      'Progress the story until The Cartel Heist appears.',
      'Complete the heist mission.',
      'The trophy unlocks on completion.',
    ],
  },
  10: {
    kind: 'story',
    stage: 1,
    sources: [OFFICIAL, LIST_PAGE, PSN],
    guide:
      "A named-mission trophy: the official description requires the mission Child's Play to be completed. Play the campaign until this mission is offered, finish it, and the trophy follows. As with the other named-mission trophies on the list, the description states no extra medal, time or stealth condition.",
    steps: [
      "Progress the story until the Child's Play mission appears.",
      'Complete the mission.',
      'The trophy unlocks on completion.',
    ],
  },
  11: {
    kind: 'story',
    stage: 1,
    sources: [OFFICIAL, LIST_PAGE, PSN],
    guide:
      'A named-mission trophy for Headliners, per the official description. Reach the mission in the normal story flow and complete it; the trophy name is stylised in the official list but the requirement is the plain one shared by this whole family of trophies — finish the named mission.',
    steps: [
      'Progress the story until the Headliners mission appears.',
      'Complete the mission.',
      'The trophy unlocks on completion.',
    ],
  },
  12: {
    kind: 'story',
    stage: 1,
    sources: [OFFICIAL, LIST_PAGE, PSN],
    guide:
      'A named-mission trophy: the official description requires the VCIA Takedown mission to be completed. VCIA is the airport authority that recurs across this trophy list, so expect this mission in the story flow; finish it and the trophy unlocks, with no extra condition stated in the published text.',
    steps: [
      'Progress the story until the VCIA Takedown mission appears.',
      'Complete the mission.',
      'The trophy unlocks on completion.',
    ],
  },
  13: {
    kind: 'story',
    stage: 1,
    sources: [OFFICIAL, LIST_PAGE, PSN],
    guide:
      'A named-mission trophy for Operation Savage Glory, per the official description. Play the campaign until this operation is offered and complete it. The description is a completion requirement only, so any approach the mission itself allows is acceptable as far as the trophy is concerned.',
    steps: [
      'Progress the story until Operation Savage Glory appears.',
      'Complete the mission.',
      'The trophy unlocks on completion.',
    ],
  },
  14: {
    kind: 'completion',
    stage: 3,
    sources: [OFFICIAL, LIST_PAGE, PSN],
    guide:
      "The second gold on the list: the official description requires 100% completion of the game as PlayStation and the game itself define it. That makes this an umbrella trophy — story, strands, activities and collectibles all feed the percentage — so the working method is to chase the counter: finish the story, then sweep whatever the in-game completion checklist still shows as outstanding.",
    steps: [
      'Complete the main story and the stranger strands.',
      'Work through activities and collectibles that count toward 100%.',
      'Check the in-game completion percentage and mop up what remains.',
    ],
  },
  15: {
    kind: 'activities',
    stage: 4,
    sources: [OFFICIAL, LIST_PAGE, PSN],
    guide:
      'A pure volume trophy: the official description sets the target at 250 completed stunts. There is no quality bar in the published text — no unique-jump list and no gold standard — so the efficient route is repetition: find a stunt setup you can land reliably and keep running stunts during free roam until the counter reaches 250. This is one of the long grinds, best spread across the whole playthrough.',
    steps: [
      'Learn what the game counts as a stunt by landing a few in free roam.',
      'Repeat reliable stunt spots whenever you are travelling anyway.',
      'Keep going until the stunt counter reaches 250.',
    ],
  },
  16: {
    kind: 'activities',
    stage: 3,
    sources: [OFFICIAL, LIST_PAGE, PSN],
    guide:
      'A sampler trophy: the official description asks you to try each type of activity once, and the starter list notes there are 9 activity types. You do not need to win or master any of them for this trophy — one genuine attempt at each distinct activity type is the whole requirement, which makes it a natural early sweep while you explore Leonida.',
    steps: [
      'Open the map or activity list and note the distinct activity types (9 in total).',
      'Take part in each type at least once.',
      'The trophy unlocks when every type has been tried.',
    ],
  },
  17: {
    kind: 'activities',
    stage: 4,
    sources: [OFFICIAL, LIST_PAGE, PSN],
    guide:
      'A mastery trophy: the official description requires a gold medal in all Shooting Range challenges, and the tracked count is 42 challenges. Unlike the sampler trophy, participation is not enough here — each of the 42 challenges has to be beaten at its gold standard, so expect to replay ranges, learn their target patterns and return with better weapons or upgrades where the game allows them.',
    steps: [
      'Visit the Shooting Range and clear challenges to learn their layouts.',
      'Replay each challenge until it is scored gold.',
      'Repeat across all 42 challenges for the trophy.',
    ],
  },
  18: {
    kind: 'activities',
    stage: 4,
    sources: [OFFICIAL, LIST_PAGE, PSN],
    guide:
      'A location sweep with a win condition: the official description requires winning a Top Fun Drone Race at every location, and the tracked count is 14 locations. Finishing is not enough — each location needs an outright win — so learn each course, retry the ones you lose, and tick locations off one by one until all 14 are won.',
    steps: [
      'Find a Top Fun Drone Race location and learn its course.',
      'Race until you win at that location.',
      'Repeat at all 14 locations.',
    ],
  },
  19: {
    kind: 'activities',
    stage: 4,
    sources: [OFFICIAL, LIST_PAGE, PSN],
    guide:
      'A racing counter: the official description requires winning 20 different races. The word "different" is the catch — repeating one easy race twenty times should not be assumed to work, so spread your wins across distinct race events. Any race type the game offers counts toward the variety as far as the published text says, so mix formats while you build the total.',
    steps: [
      'Enter races across Leonida and note which ones you have won.',
      'Keep choosing races you have not won yet.',
      'Reach 20 wins in 20 different races.',
    ],
  },
  20: {
    kind: 'activities',
    stage: 5,
    sources: [OFFICIAL, LIST_PAGE, PSN],
    guide:
      'A head-to-head trophy: the official description asks you to beat Cal in a fishing challenge. This is a named-character activity rather than a counter, so the route is to find Cal\'s fishing challenge when the game offers it and win it — if you lose, the reasonable reading of the description is that the challenge can simply be attempted again until you come out ahead.',
    steps: [
      'Unlock and accept Cal\'s fishing challenge.',
      'Out-fish Cal in the challenge.',
      'The trophy unlocks on the win.',
    ],
  },
  21: {
    kind: 'activities',
    stage: 5,
    sources: [OFFICIAL, LIST_PAGE, PSN],
    guide:
      'A small, self-contained trophy: the official description requires completing an arcade game — one full arcade game, finished. Find an arcade cabinet the game lets you play, start a game and see it through to its end rather than quitting mid-session; the published text asks for completion of a single game, not a high score.',
    steps: [
      'Find a playable arcade game in the world.',
      'Play one game through to completion.',
      'The trophy unlocks when the game finishes.',
    ],
  },
  22: {
    kind: 'story',
    stage: 2,
    sources: [OFFICIAL, LIST_PAGE, PSN],
    guide:
      'A strand-finale trophy: the official description requires the final mission for Andy to be completed. Characters like Andy hand out a chain of missions (a strand); this trophy sits at the end of his chain, so work through every mission he gives you, in order, and finish the last one. It belongs to the post-story cleanup stage of the roadmap.',
    steps: [
      'Take on Andy\'s mission strand when it appears.',
      'Complete each of his missions in order.',
      'Finish his final mission to unlock the trophy.',
    ],
  },
  23: {
    kind: 'story',
    stage: 2,
    sources: [OFFICIAL, LIST_PAGE, PSN],
    guide:
      'A strand-finale trophy for Kenton: the official description requires completing the final mission for Kenton. Follow his strand from its first job to its last; the trophy is awarded for the finale, so earlier missions in the chain are prerequisites rather than the goal. The trophy title is a film joke — the description underneath it is plain completion.',
    steps: [
      'Take on Kenton\'s mission strand when it appears.',
      'Complete each of his missions in order.',
      'Finish his final mission to unlock the trophy.',
    ],
  },
  24: {
    kind: 'story',
    stage: 2,
    sources: [OFFICIAL, LIST_PAGE, PSN],
    guide:
      'A strand-finale trophy for Billy: the official description requires completing the final mission for Billy. As with the other named-character finales on the list, the practical work is the whole strand — accept Billy\'s missions as they appear, finish them in sequence, and the trophy lands when his final mission is done.',
    steps: [
      'Take on Billy\'s mission strand when it appears.',
      'Complete each of his missions in order.',
      'Finish his final mission to unlock the trophy.',
    ],
  },
  25: {
    kind: 'story',
    stage: 2,
    sources: [OFFICIAL, LIST_PAGE, PSN],
    guide:
      'The silver strand trophy: the official description requires completing 8 mission strands for strangers across the state of Leonida. Each strand is one stranger\'s chain of missions, and the individual finale trophies on this list (Andy, Kenton, Billy and others) each represent one such strand — so this trophy is the umbrella over them: finish eight full strands, wherever in Leonida you find them.',
    steps: [
      'Pick up stranger mission strands as you explore Leonida.',
      'Finish each strand completely, including its final mission.',
      'Complete 8 full strands to unlock the trophy.',
    ],
  },
  26: {
    kind: 'story',
    stage: 2,
    sources: [OFFICIAL, LIST_PAGE, PSN],
    guide:
      'A strand-finale trophy for Randy: the official description requires completing the final mission for Randy. Work his strand from the first mission to the last; only the finale triggers the trophy, so do not stop at an intermediate mission and assume it counted. One of the strands that also feeds the 8-strand silver trophy.',
    steps: [
      'Take on Randy\'s mission strand when it appears.',
      'Complete each of his missions in order.',
      'Finish his final mission to unlock the trophy.',
    ],
  },
  27: {
    kind: 'story',
    stage: 2,
    sources: [OFFICIAL, LIST_PAGE, PSN],
    guide:
      'A strand-finale trophy for Tyrone: the official description requires completing the final mission for Tyrone. The method matches every other named finale on the list — run the whole strand in order and finish the last mission. Count it toward the eight strands needed for Strangers & Freaks as well.',
    steps: [
      'Take on Tyrone\'s mission strand when it appears.',
      'Complete each of his missions in order.',
      'Finish his final mission to unlock the trophy.',
    ],
  },
  28: {
    kind: 'collectibles',
    stage: 3,
    sources: [OFFICIAL, LIST_PAGE, PSN],
    guide:
      'A collectible sweep in activity clothing: the official description requires meditating at every spot across Leonida, and the tracked count is 18 spots. Each spot is a fixed location to find and use once, so treat this like any collectible route — sweep region by region, meditate at each spot you find, and use the counter to confirm none were missed.',
    steps: [
      'Find a meditation spot in Leonida and meditate there.',
      'Sweep the state region by region for the remaining spots.',
      'Meditate at all 18 spots to unlock the trophy.',
    ],
  },
  29: {
    kind: 'story',
    stage: 2,
    sources: [OFFICIAL, LIST_PAGE, PSN],
    guide:
      'A named-character task: the official description requires hunting a unique animal for Bret. "Unique" is the operative word — this is one specific animal tied to Bret\'s request, not a hunting counter — so take the job from Bret, track the animal he names, and complete the hunt. The description gives no species or location, and this guide invents neither.',
    steps: [
      'Accept the hunting request from Bret.',
      'Track down the unique animal he asks for.',
      'Complete the hunt to unlock the trophy.',
    ],
  },
  30: {
    kind: 'collectibles',
    stage: 3,
    sources: [OFFICIAL, LIST_PAGE, PSN, WIKI],
    guide:
      'The silver collectible trophy: the official description requires completing 3 Collectible Card sets. Cards are found one at a time in the world and gathered into sets, so the work is a sweep — collect cards wherever you roam, watch which sets are filling up, and focus your searching on the sets nearest completion until three full sets are done.',
    steps: [
      'Collect Collectible Cards as you explore.',
      'Track which sets are closest to complete.',
      'Finish 3 complete card sets to unlock the trophy.',
    ],
  },
  31: {
    kind: 'collectibles',
    stage: 3,
    sources: [OFFICIAL, LIST_PAGE, PSN, WIKI],
    guide:
      'A location counter: the official description requires using the WAiNK interaction at 100 locations across Leonida. Whatever WAiNK turns out to be in the world, the structure is clear — 100 distinct locations, one interaction each — so treat it as a collectible route: do it whenever you pass a location, region by region, and let the tracked counter confirm your progress to 100.',
    steps: [
      'Use the WAiNK interaction at a first location.',
      'Keep doing it at new locations as you travel.',
      'Reach 100 locations to unlock the trophy.',
    ],
  },
  32: {
    kind: 'activities',
    stage: 3,
    sources: [OFFICIAL, LIST_PAGE, PSN],
    guide:
      'A breadth counter: the official description requires completing 50 Challenges. Challenges are the game\'s short-form tasks, distinct from missions, so the efficient approach is opportunistic — accept and finish challenges as they surface during story and free roam rather than grinding them late. Fifty completions is the whole requirement; the description sets no medal standard.',
    steps: [
      'Accept challenges as they appear in the world.',
      'Complete them during normal play.',
      'Reach 50 completed challenges.',
    ],
  },
  33: {
    kind: 'activities',
    stage: 5,
    sources: [OFFICIAL, LIST_PAGE, PSN],
    guide:
      'A partner feat with two conditions in the official description: reach a 4-star Wanted Level together with your partner, then lose that wanted level and escape the heat. Both halves matter — the stars must be shed, not outrun into a new crime — so the plan is to raise the heat deliberately, then break line of sight, change vehicles or hide until the stars clear completely.',
    steps: [
      'With your partner, commit crimes until you reach a 4-star Wanted Level.',
      'Break away from the police and hide or change vehicles.',
      'Stay clean until the wanted level fully clears.',
    ],
  },
  34: {
    kind: 'activities',
    stage: 5,
    sources: [OFFICIAL, LIST_PAGE, PSN],
    guide:
      'A partner robbery chain: the official description requires robbing 3 shops back-to-back with your partner without losing your Wanted Level in between. The chain is the difficulty — after each robbery you must reach the next shop while still wanted, so plan a tight route of nearby shops and keep moving; letting the heat die resets the run as the description is written.',
    steps: [
      'Pick three shops close together and rob the first with your partner.',
      'Drive straight to the second shop while still wanted and rob it.',
      'Rob the third shop before the wanted level is lost.',
    ],
  },
  35: {
    kind: 'collectibles',
    stage: 4,
    sources: [OFFICIAL, LIST_PAGE, PSN],
    guide:
      'A discovery counter: the official description requires discovering 100 vehicles. In practice this family of trophy counts a vehicle once you have encountered or driven it, so variety is the method — get into cars, bikes and boats you have not used before whenever the chance appears, and avoid spending the whole game in two or three favourites until the counter reaches 100.',
    steps: [
      'Enter or drive vehicles you have not used before.',
      'Vary vehicle types — cars, bikes, boats — as you explore.',
      'Reach 100 discovered vehicles.',
    ],
  },
  36: {
    kind: 'activities',
    stage: 5,
    sources: [OFFICIAL, LIST_PAGE, PSN],
    guide:
      'A combat feat with a tight window: the official description requires taking down 5 enemies in a single use of Combat Focus. One activation, five takedowns — so set the moment up: engage a group of at least five enemies, position before you trigger Combat Focus, and work through the group while the single use lasts. Triggering it against two or three enemies cannot satisfy the description.',
    steps: [
      'Find or draw together a group of at least 5 enemies.',
      'Activate Combat Focus once.',
      'Take down 5 enemies before that single use ends.',
    ],
  },
  37: {
    kind: 'activities',
    stage: 5,
    sources: [OFFICIAL, LIST_PAGE, PSN],
    guide:
      'A set-piece escape: the official description asks you to make an "unscheduled departure" at VCIA — the airport. The wording is a joke about leaving without permission or a flight plan, so expect the trigger to be taking off or escaping from the airport in a way the game flags as unauthorised. The description names the place but no vehicle or method, so experiment at VCIA until it registers.',
    steps: [
      'Go to VCIA, the airport.',
      'Depart in an unauthorised, unscheduled way — for example taking an aircraft without clearance.',
      'The trophy unlocks when the game registers the departure.',
    ],
  },
  38: {
    kind: 'activities',
    stage: 5,
    sources: [OFFICIAL, LIST_PAGE, PSN],
    guide:
      'Honest note first: the official description for this trophy is only a joke — "Kinda hot in these Rhinos" — and states no action, target or count. The name and the joke both point at Rhino tanks, so the reasonable reading is that doing something involving a Rhino (most plausibly taking one, or surviving inside one) is involved; but no source on the official list confirms the trigger, and this guide will not invent one. Try Rhino-related play and check the trophy afterwards.',
    steps: [
      'Find a Rhino tank in the world or in a mission.',
      'Use or take the Rhino and play out the encounter.',
      'Check whether the trophy registered; if not, try another Rhino interaction.',
    ],
  },
  39: {
    kind: 'activities',
    stage: 5,
    sources: [OFFICIAL, LIST_PAGE, PSN],
    guide:
      'A stealth robbery: the official description requires robbing a jewelry store without being detected. Detection is the fail state, so approach quietly, deal with the robbery fast and clean, and leave before any alarm or witness flags you — if you are spotted, the attempt no longer matches the description and the sensible move is to try again another in-game day.',
    steps: [
      'Enter a jewelry store with a quiet approach.',
      'Rob it without raising detection or an alarm.',
      'Leave undetected to unlock the trophy.',
    ],
  },
  40: {
    kind: 'activities',
    stage: 5,
    sources: [OFFICIAL, LIST_PAGE, PSN],
    guide:
      'The silver heist trophy: the official description requires robbing 5 Bank Vaults and escaping — both halves, five times. A vault robbery that ends in arrest or death should not be assumed to count, since the description pairs the robbery with the escape. Plan each job around the getaway first: vehicle placed, route out, then crack the vault.',
    steps: [
      'Rob a Bank Vault.',
      'Escape the police response afterwards.',
      'Repeat until 5 vaults are robbed with 5 escapes.',
    ],
  },
  41: {
    kind: 'activities',
    stage: 5,
    sources: [OFFICIAL, LIST_PAGE, PSN],
    guide:
      'A single heist feat: the official description requires robbing an Armored Truck and escaping. Armored trucks are moving targets, so the work is interception — stop or open the truck, take the money, then lose the response. As with the vault trophy, the escape is written into the requirement, so the job is not done at the robbery itself.',
    steps: [
      'Find an Armored Truck in traffic.',
      'Rob it and take the money.',
      'Escape the response to unlock the trophy.',
    ],
  },
  42: {
    kind: 'collectibles',
    stage: 3,
    sources: [OFFICIAL, LIST_PAGE, PSN, WIKI],
    guide:
      'An exploration sweep: the official description requires exploring all of Leonida, and the tracked count behind it is 52 areas. Areas register as you enter them, so this is a map-completion exercise — travel every district and island, watch for areas the map still shows as unvisited, and make a final sweep of the gaps. It pairs naturally with the collectible routes in the same roadmap stage.',
    steps: [
      'Travel widely and register areas as you enter them.',
      'Check the map for areas still unexplored.',
      'Visit all 52 areas of Leonida.',
    ],
  },
  43: {
    kind: 'activities',
    stage: 5,
    sources: [OFFICIAL, LIST_PAGE, PSN],
    guide:
      'A gang-by-gang robbery sweep: the official description requires robbing an Illegal Operation belonging to each gang, and the count behind it is 9 gangs. One operation per gang is enough as the description is written, so the method is coverage — identify each gang\'s territory or operation, rob one, and move to the next gang until all nine are covered.',
    steps: [
      'Find an Illegal Operation belonging to a gang.',
      'Rob it.',
      'Repeat for each of the 9 gangs.',
    ],
  },
  44: {
    kind: 'activities',
    stage: 5,
    watch: true,
    sources: [OFFICIAL, LIST_PAGE, PSN, WIKI],
    guide:
      'A single named moment: the official description asks you to enjoy a cocktail with a view on Ocean Beach. Nothing in the text ties it to a mission or a chapter, so the straightforward route is to visit Ocean Beach in free roam and have the drink where the view is. INFERRED WATCH-LIST (our inference, not an official fact): the trophy name echoes the opening of a story, so if a free-roam attempt does not register it, try again around the early story beats — no official description confirms any one-chance window.',
    steps: [
      'Go to Ocean Beach in free roam.',
      'Order or drink a cocktail at a spot with a view.',
      'If it does not register, retry around early story moments (inferred watch-list).',
    ],
  },
  45: {
    kind: 'activities',
    stage: 5,
    sources: [OFFICIAL, LIST_PAGE, PSN],
    guide:
      'A single stunt-style feat: the official description requires smashing your way out of a vehicle showroom "in classic style". The scene writes itself — be inside a showroom, take a vehicle, and drive out through the glass rather than the door. The description names the place type and the exit, nothing more, so any showroom and any dramatic exit through its front should be the trigger.',
    steps: [
      'Enter a vehicle showroom.',
      'Get into one of the display vehicles.',
      'Drive out through the showroom front to unlock the trophy.',
    ],
  },
  46: {
    kind: 'activities',
    stage: 5,
    sources: [OFFICIAL, LIST_PAGE, PSN],
    guide:
      'A single leisure activity at a named place: the official description requires a follow-through at the Kolt & Associates\' bowling alley — in plain terms, go bowling there. Visit the alley, play the bowling activity and complete your throw or game; the trophy title is the series\' long-running bowling joke, but the description\'s requirement is simply the activity at that alley.',
    steps: [
      'Visit the Kolt & Associates bowling alley.',
      'Play the bowling activity there.',
      'Complete the follow-through to unlock the trophy.',
    ],
  },
  47: {
    kind: 'activities',
    stage: 5,
    sources: [OFFICIAL, LIST_PAGE, PSN],
    guide:
      'Honest note first: the official description — "A partnership with mass appeal" — is a tagline, not an instruction; it states no action, place or count. The trophy name, Personal Best, hints at some partner-related achievement, but neither the name nor the description confirms a trigger, and this guide will not fabricate one. Play partner activities as they appear and check this trophy after each; treat any more specific claim from elsewhere as unverified until the game confirms it.',
    steps: [
      'Take part in partner activities as the game offers them.',
      'Check this trophy after each partner milestone.',
      'Do not trust specific triggers that no official source states.',
    ],
  },
  48: {
    kind: 'activities',
    stage: 5,
    watch: true,
    sources: [OFFICIAL, LIST_PAGE, PSN],
    guide:
      'The official description — "Choices made (for better or worse)" — confirms this trophy is about choices, and the tracked count behind it runs to 500. That reads as a long counter of decisions made during play rather than one specific decision. INFERRED WATCH-LIST (our inference, not an official fact): because it is choice-based, it is the one trophy where a one-chance moment is plausible, so make choices deliberately as they appear instead of assuming they can be revisited — but no official description states that any choice is missable.',
    steps: [
      'Make choices deliberately whenever the game offers them.',
      'Keep choosing through story and free roam; the tracked count runs to 500.',
      'Treat choice moments as potentially one-chance (inferred watch-list).',
    ],
  },
  49: {
    kind: 'activities',
    stage: 5,
    sources: [OFFICIAL, LIST_PAGE, PSN],
    guide:
      'Honest note first: the official description — "Second time\'s the charm" — is a reaction line, not an instruction; it states no activity, place or count. The plain reading is that succeeding at something on a second attempt is involved, but the official list does not say at what, and this guide will not invent a specific trigger. If an activity lets you fail and retry, a successful retry is the natural candidate — verify in play rather than trusting any uncited claim.',
    steps: [
      'When an activity offers a fail-and-retry loop, fail once deliberately.',
      'Retry it and succeed on the second attempt.',
      'Check whether the trophy registered.',
    ],
  },
  50: {
    kind: 'activities',
    stage: 5,
    sources: [OFFICIAL, LIST_PAGE, PSN],
    guide:
      'Honest note first: the official description — "What the hell just happened?" — is a reaction to something strange, and the trophy name promises the truth is out there; together they point at witnessing an unusual or unexplained event, but the official list names no event, place or time, and this guide invents none. Explore off the beaten path, investigate odd sights when the game presents them, and expect this to land by discovery rather than by a route.',
    steps: [
      'Explore unusual places and events as you roam Leonida.',
      'Investigate anything the game frames as strange.',
      'The trophy unlocks when the strange event is witnessed.',
    ],
  },
  51: {
    kind: 'activities',
    stage: 5,
    sources: [OFFICIAL, LIST_PAGE, PSN],
    guide:
      'A driving feat with a bowling joke for a name: the official description requires knocking someone down with a melee drive-by — that is, striking a person with a melee attack from a moving vehicle rather than shooting. Line up a target at low speed, use the vehicle melee attack as you pass, and make sure the hit connects and drops them; a shot fired from the car does not match the description.',
    steps: [
      'Drive slowly toward a pedestrian target.',
      'Use the melee drive-by attack as you pass them.',
      'Knock them down with the melee hit to unlock the trophy.',
    ],
  },
  52: {
    kind: 'completion',
    stage: 5,
    sources: [OFFICIAL, LIST_PAGE, PSN],
    guide:
      'A money counter: the official description requires earning $250,000 by laundering Marked Bills through your contacts. Only laundered marked bills count toward the figure as the description is written — ordinary income should not be assumed to qualify — so route every batch of marked bills you pick up through the laundering contacts until the laundered total passes a quarter of a million.',
    steps: [
      'Obtain Marked Bills through play.',
      'Launder them through your contacts rather than spending them raw.',
      'Reach $250,000 laundered in total.',
    ],
  },
  53: {
    kind: 'completion',
    stage: 5,
    sources: [OFFICIAL, LIST_PAGE, PSN],
    guide:
      'A spending counter: the official description requires spending $100,000 across all shops. "Across all shops" suggests the total is cumulative over every store rather than one spree, so ordinary play gets you much of the way — buy vehicles, weapons, clothes and services as you go, and if you fall short late, spend deliberately on big-ticket items until the cumulative spend crosses $100,000.',
    steps: [
      'Spend money in shops during normal play.',
      'Keep buying across different shops; the total is cumulative.',
      'Reach $100,000 spent in total.',
    ],
  },
  54: {
    kind: 'completion',
    stage: 5,
    sources: [OFFICIAL, LIST_PAGE, PSN],
    guide:
      'A property sweep: the official description requires purchasing all garage properties, and the count is 8 garages. This is a money-gated trophy — you need the cash for all eight — so it pairs with the earning trophies in this stage: build your funds first, then buy every garage property on the map, using the count of 8 to confirm none is missing.',
    steps: [
      'Build up enough money to buy properties.',
      'Purchase each garage property as you find it.',
      'Own all 8 garage properties to unlock the trophy.',
    ],
  },
  55: {
    kind: 'activities',
    stage: 4,
    sources: [OFFICIAL, LIST_PAGE, PSN],
    guide:
      'An app-based counter: the official description requires registering 10 vehicles to the Scooter Bros app. Whenever you acquire or use a new vehicle, register it in the app rather than skipping the prompt; ten registrations is a small total, so this finishes quickly once you make a habit of registering each new vehicle as it comes.',
    steps: [
      'Open the Scooter Bros app when you get a vehicle.',
      'Register the vehicle to the app.',
      'Register 10 vehicles in total.',
    ],
  },
};
