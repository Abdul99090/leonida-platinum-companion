#!/usr/bin/env python3
"""Build app/data/trophies.json for the Leonida Platinum Companion.

The official fields (name, description, grade) are taken byte-for-byte from
the starter kit's published trophy list. The `secret` flag comes from the
forecast kit's case files (p00.in, cross-checked against p01.in). Everything
else — kind, roadmap stage, missable flags, the guide text and its steps — is
authored in this file, in our own words, from the official descriptions.

The output is compact JSON (a single line). Run: python3 tools/build_data.py
"""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
STARTER = Path("/home/hatch/workspace/makefun/work/gta6-trophy-guide/kitref/gta6-trophy-guide-01-kit/starter/app/data/trophies.json")
CASE = Path("/home/hatch/workspace/makefun/work/gta6-trophy-rarity/kitref/gta6-trophy-rarity-forecast-01-kit/input/p00.in")
CASE2 = Path("/home/hatch/workspace/makefun/work/gta6-trophy-rarity/kitref/gta6-trophy-rarity-forecast-01-kit/input/p01.in")
OUT = ROOT / "app/data/trophies.json"

EXO = "Exophase — Grand Theft Auto VI (PS5) trophy list, exophase.com/game/grand-theft-auto-vi-psn/trophies/"
PSNP = "PSNProfiles — Grand Theft Auto VI trophy list"
OFF = "Official PlayStation trophy description, as published (via Exophase)"
GW = "GTA Wiki (Fandom) — Grand Theft Auto VI and Leonida entries"
BASE = [OFF, EXO, PSNP]

# id -> (kind, stage, missable, missableNote, guide, steps, extra_sources)
CUR = {
    1: ("completion", 6, False, "",
        "The platinum is the finish line, not a task: it unlocks by itself the moment the other 54 trophies are all earned. Work the roadmap in this guide from stage 1 to stage 5, keep an eye on the per-grade counters, and this one closes the list on its own.",
        ["Earn all 54 other trophies", "Watch the platinum counter reach 1 of 1 in the header", "The trophy unlocks automatically — no separate action"], []),
    2: ("story", 1, False, "",
        "Finish the story mission the description names — Gone Fishing. It arrives as part of the campaign and cannot be started from free roam, so if it is still locked at the end, mission replay is the way back in rather than searching the map for it.",
        ["Play the campaign until Gone Fishing is offered", "Complete the mission", "The trophy unlocks as the mission ends"], []),
    3: ("story", 1, False, "",
        "Complete Chapter 1. The published text adds no side conditions, so this is pure story progress: play the opening through to the chapter break and it unlocks on the way.",
        ["Start the story", "Reach the end of Chapter 1", "Unlocks at the chapter break"], []),
    4: ("story", 1, False, "",
        "Complete Chapter 2. Note the name itself: PlayStation publishes this one asterisk-masked, and that masked spelling is the official name used everywhere in this guide — the unlock underneath it is a plain chapter finish.",
        ["Continue the story past Chapter 1", "Reach the end of Chapter 2", "Unlocks at the chapter break"], []),
    5: ("story", 1, False, "",
        "Complete Chapter 3. As with the other chapter trophies, the official text asks for nothing beyond finishing the chapter, so keep moving through the campaign and it will pop at the break.",
        ["Continue the story past Chapter 2", "Reach the end of Chapter 3", "Unlocks at the chapter break"], []),
    6: ("story", 1, False, "",
        "Complete Chapter 4. This is the last numbered chapter trophy before the finale arc, so after it pops, start keeping a manual save before major story decisions — the watch-list trophies later in this guide are the reason.",
        ["Continue the story past Chapter 3", "Reach the end of Chapter 4", "Make a safety save before the endgame"], []),
    7: ("story", 2, False, "",
        "Complete the final mission — the gold that closes the campaign. Before the point of no return, park a separate manual save: the choice-based watch-list trophy in stage 2 of the roadmap is much cheaper to revisit from a save than from a new playthrough.",
        ["Finish Chapters 1–4 and the named missions", "Save manually before the final mission", "Complete the final mission"], []),
    8: ("story", 1, False, "",
        "Complete the mission named Breakfast Run. It is a campaign mission rather than a free-roam event, so it unlocks by playing the story in order; if you missed its name go by, mission replay lists it directly.",
        ["Reach Breakfast Run in the campaign", "Complete the mission", "Unlocks at mission end"], []),
    9: ("story", 1, False, "",
        "Complete The Cartel Heist, the campaign's named heist mission. Heists in the story are scripted, so the only requirement is finishing it — approach choices inside the mission do not change the unlock.",
        ["Reach The Cartel Heist in the campaign", "Complete the heist", "Unlocks at mission end"], []),
    10: ("story", 1, False, "",
        "Complete the mission named Child's Play as it appears in the campaign. Nothing in the official text adds conditions, so treat it as a straight story beat and keep progressing.",
        ["Reach Child's Play in the campaign", "Complete the mission", "Unlocks at mission end"], []),
    11: ("story", 1, False, "",
        "Complete the mission named Headliners. A straight campaign finish: play the story until Headliners is offered, complete it, and the trophy unlocks as it ends.",
        ["Reach Headliners in the campaign", "Complete the mission", "Unlocks at mission end"], []),
    12: ("story", 1, False, "",
        "Complete VCIA Takedown. The name points at the airport (VCIA), but the requirement is the mission itself, not anything done at the airport in free roam — finish the campaign mission of that name.",
        ["Reach VCIA Takedown in the campaign", "Complete the mission", "Unlocks at mission end"], []),
    13: ("story", 1, False, "",
        "Complete Operation Savage Glory, a named campaign operation. Play the story in order until it is offered and finish it; there are no published side conditions.",
        ["Reach Operation Savage Glory in the campaign", "Complete the mission", "Unlocks at mission end"], []),
    14: ("completion", 3, False, "",
        "Attain 100% completion as the game itself counts it — this gold is the audit of everything else on the list. Use the in-game completion percentage as the source of truth and this tracker as its mirror: story, strands, collectibles and activities all feed the same number, so chase the game's own checklist categories when it stalls below 100.",
        ["Finish the story and all strands", "Clear the collectible and activity categories", "Sweep what the in-game checklist still shows until it reads 100%"], []),
    15: ("activities", 4, False, "",
        "Complete 250 stunts. The count is the whole challenge, so start early and treat stunts as detours during normal travel rather than a single endgame grind — 250 opportunistic jumps cost a fraction of the time of 250 deliberate ones.",
        ["Begin attempting stunts from the first hours", "Detour to stunt spots while travelling between missions", "Top up the remaining count in free roam"], []),
    16: ("activities", 3, False, "",
        "Try each type of activity once — sampling is enough, mastery is not required. The trap is an activity type you never touch at all, so tick types off as new areas and contacts unlock them instead of leaving the whole set for the end.",
        ["Open the activity list whenever a new type appears", "Play one round of each type", "Re-check the set before the 100% push"], []),
    17: ("activities", 4, False, "",
        "Earn a gold medal in all Shooting Range challenges. Work one weapon class at a time and replay a challenge immediately while its layout is still fresh in your hands; a near-miss replayed at once is worth more than a fresh challenge started cold.",
        ["Unlock the Shooting Range challenges", "Clear each challenge, then chase its gold", "Replay near-misses immediately"], []),
    18: ("activities", 5, False, "",
        "Win a Top Fun Drone Race at every location — entering is not enough, each location needs a win. Finish one location completely before moving on, so the remaining map stays readable and no single win is forgotten.",
        ["Find a Top Fun Drone Race location", "Win the race there", "Repeat until every location has a win"], []),
    19: ("activities", 5, False, "",
        "Win 20 different races. Repeats of a favourite event do not advance the count, so spread your wins across the race calendar and keep moving to new events instead of farming the one you already know.",
        ["Enter races as they unlock", "Win, then move to a different race", "Reach 20 distinct race wins"], []),
    20: ("activities", 5, False, "",
        "Beat Cal in a fishing challenge. Cal is the benchmark the description sets, so take the challenge when it is offered and treat it as a duel: match his catch rather than fishing casually, and retry immediately if he edges you out.",
        ["Accept Cal's fishing challenge", "Out-catch Cal", "Unlocks when the challenge is won"], []),
    21: ("activities", 5, False, "",
        "Complete an arcade game — finish one, not just play one. Pick the shortest cabinet you find, learn its loop, and see it through in a single sitting so progress is never left half-done.",
        ["Find an arcade cabinet", "Start the shortest game on offer", "Play it to completion"], []),
    22: ("story", 2, False, "",
        "Complete the final mission for Andy — the end of Andy's strand. Strands only finish if you keep taking the contact's missions when they appear, so work Andy's chain whenever it pings rather than postponing it past the credits.",
        ["Take Andy's missions as they appear", "Follow the strand to its final mission", "Complete the final mission"], []),
    23: ("story", 2, False, "",
        "Complete the final mission for Kenton. As with every strand final in this guide, the requirement is the chain's last mission, so keep Kenton's strand moving alongside the main story and finish it before your endgame sweep.",
        ["Take Kenton's missions as they appear", "Follow the strand to its final mission", "Complete the final mission"], []),
    24: ("story", 2, False, "",
        "Complete the final mission for Billy. Billy's strand ends with this mission; if the chain seems stalled, check for the next strand step after sleeping or travelling, which is how these chains usually re-trigger.",
        ["Take Billy's missions as they appear", "Follow the strand to its final mission", "Complete the final mission"], []),
    25: ("story", 2, False, "",
        "Complete 8 mission strands for strangers across the state of Leonida — a strand is a contact's whole chain, not a single meeting. Accept every stranger introduction you pass, even mid-errand, so all eight chains are open and progressing before you start the cleanup sweep.",
        ["Accept every stranger introduction", "Finish one full strand at a time", "Reach 8 completed strands"], []),
    26: ("story", 2, False, "",
        "Complete the final mission for Randy. Keep Randy's strand warm as it appears and finish the chain; strand finals are the easiest trophies to leave stranded at 95%, so clear them before the collectible grinds.",
        ["Take Randy's missions as they appear", "Follow the strand to its final mission", "Complete the final mission"], []),
    27: ("story", 2, False, "",
        "Complete the final mission for Tyrone. The same strand discipline applies: take each step as it pings, and the final mission unlocks this trophy at its end.",
        ["Take Tyrone's missions as they appear", "Follow the strand to its final mission", "Complete the final mission"], []),
    28: ("collectibles", 4, False, "",
        "Meditate at every spot across Leonida. The spots are fixed locations, so this is a sweep, not a search: clear one region completely before crossing the map, and tick each spot in your notes the moment you have used it — the last unvisited spot is always the expensive one.",
        ["Sweep one region's spots at a time", "Meditate at each spot you find", "Finish with a region-by-region re-check"], []),
    29: ("activities", 5, False, "",
        "Hunt a unique animal for Bret. This is a specific commission, not general hunting: take the hunt from Bret's strand and pursue the named animal rather than culling wildlife at random, which does not advance it.",
        ["Take the hunt from Bret", "Track the unique animal", "Complete the hunt and report back"], []),
    30: ("collectibles", 4, False, "",
        "Complete 3 Collectible Card sets. Cards are fixed pickups gathered into sets, so work one set to completion before scattering attention across the others — three finished sets is the requirement, and five half-finished sets earn nothing.",
        ["Pick the set closest to completion", "Sweep its remaining cards", "Repeat until 3 sets are complete"], []),
    31: ("collectibles", 4, False, "",
        "WAiNK It at 100 locations. A pure numbers trophy: the interaction must happen at 100 different places, so build it into your routes across the state from the start instead of hunting all 100 in one joyless circuit at the end.",
        ["Use WAiNK whenever a new location offers it", "Keep the habit across the whole playthrough", "Top up the count with a location sweep"], []),
    32: ("activities", 3, False, "",
        "Complete 50 Challenges. Challenges accumulate underneath almost everything else in this guide, so check your count before grinding anything extra — by the time the story and strands are done, most players will be much closer than they expect.",
        ["Play normally and let challenges accumulate", "Check the count after the story", "Farm the remainder with quick repeatable challenges"], []),
    33: ("activities", 5, False, "",
        "Lose a 4-star Wanted Level with your partner and escape the heat. The whole sequence belongs to one attempt: build four stars while your partner is with you, then break line of sight and stay hidden until the level clears. Note the wording — 'your partner' is the second protagonist, so this is a story-pair feat, not an online one (inference from the official text).",
        ["Have your partner with you", "Raise a 4-star Wanted Level", "Escape until the heat fully clears"], []),
    34: ("activities", 5, False, "",
        "Rob 3 shops back-to-back with your partner without losing your Wanted Level. The chain is the difficulty: the stars must stay alive between shops, so pick three shops close together, move fast, and if the level drops, restart the chain rather than counting a broken run.",
        ["Group three nearby shops", "Rob the first with your partner present", "Rob the second and third before the Wanted Level drops"], []),
    35: ("collectibles", 4, False, "",
        "Discover 100 vehicles. Variety is the entire job: the count grows with new models, not with miles in one favourite car. Swap vehicles whenever something unfamiliar appears — ports, the airport district and rich neighbourhoods are where unfamiliar models cluster (general series knowledge, offered as method, not as a published fact).",
        ["Enter or spot new vehicle models as you travel", "Swap cars whenever a new model appears", "Reach 100 discovered vehicles"], [GW]),
    36: ("activities", 5, False, "",
        "Take down 5 enemies in a single use of Combat Focus. Set the shot up before you spend the ability: draw a group of five or more enemies into one area, let them commit, then trigger Combat Focus once and make every shot count inside that one activation.",
        ["Find or gather a group of 5+ enemies", "Trigger Combat Focus once", "Drop 5 enemies before it expires"], []),
    37: ("activities", 5, False, "",
        "Make an unscheduled departure at VCIA. In plain terms: leave the airport in an aircraft you were never cleared to take, and get airborne. Expect an instant wanted response the moment you roll, so choose your runway and exit line before you board.",
        ["Enter VCIA and find an aircraft", "Take off without clearance", "Get airborne to unlock"], []),
    38: ("activities", 5, False, "",
        "The description is a pun, not a specification — 'Rhinos' are the game's tanks. Getting into a Rhino and using it is the heart of this one; experiment in free roam, where a failed attempt costs nothing, rather than improvising during a mission.",
        ["Find a Rhino tank", "Get in and put it to use", "Unlocks from the tank escapade"], [GW]),
    39: ("activities", 5, False, "",
        "Rob a jewelry store without being detected. Detection is the fail state, not the police response afterwards: scout the store first, go in quietly, take the goods and be gone before anyone raises the alarm. If you are spotted mid-robbery, walk away and retry clean rather than forcing it.",
        ["Scout a jewelry store", "Enter quietly and rob it unseen", "Leave without ever being detected"], []),
    40: ("activities", 5, False, "",
        "Rob 5 Bank Vaults and escape. Both halves count: a vault you are caught in or killed in does not bank. Treat each vault as its own small heist — plan the exit route before you go in, and do not start one while already carrying maximum heat.",
        ["Rob a bank vault", "Escape cleanly", "Repeat to 5 vaults"], []),
    41: ("activities", 5, False, "",
        "Rob an Armored Truck and escape. Stop the truck on ground of your choosing — a quiet stretch beats a busy junction — take the haul, and have the escape vehicle and route ready before the first shot, because the response comes fast.",
        ["Find an Armored Truck", "Rob it", "Escape the response"], []),
    42: ("collectibles", 3, False, "",
        "Explore all of Leonida. Every region of the state must be visited, so leave the final sweep until vehicles and story access are fully open, then clear the map region by region — the unexplored corner is always a coastline or an island you assumed the story would show you.",
        ["Open the full map through story progress", "Sweep region by region", "Check coasts and islands last"], [GW]),
    43: ("activities", 5, False, "",
        "Rob an Illegal Operation belonging to each gang. The set matters, not the total: note which gang each operation belongs to before you hit it, so you do not rob the same gang twice and leave another untouched.",
        ["Identify each gang's illegal operations", "Rob one operation per gang", "Verify the set is complete"], []),
    44: ("activities", 1, True,
        "INFERRED watch-list: the wording reads like an opening-scene moment rather than a repeatable free-roam activity. No official text confirms a one-chance window — flagged so you do not sleepwalk past it.",
        "Enjoy a cocktail with a view on Ocean Beach. Because the description reads like an early story moment, take any Ocean Beach prompt the opening hours offer you; if the moment passes, check mission replay before assuming it is gone for the playthrough.",
        ["Watch for the Ocean Beach moment early", "Take the cocktail when offered", "If missed, check mission replay"], []),
    45: ("activities", 5, False, "",
        "Smash your way out of a vehicle showroom in classic style. Get inside, take a display car, and drive it out through the glass — walking out the door is not the trophy. Any showroom with a car and a window wall will do.",
        ["Enter a vehicle showroom", "Take a display car", "Drive out through the glass"], []),
    46: ("activities", 5, False, "",
        "Follow-through at the Kolt & Associates' bowling alley. The published text is a joke built on a law firm's name; the substance is the bowling alley itself, so go there and play a full game rather than leaving mid-frames — finishing what you start is the 'follow-through' the pun points at.",
        ["Visit the Kolt & Associates bowling alley", "Start a game", "Play it through to the end"], []),
    47: ("activities", 5, False, "",
        "The official text — 'a partnership with mass appeal' — is deliberately vague, and no source publishes the exact trigger. Read it as a milestone of the two protagonists' partnership: if it has not unlocked by the credits, work the partner feats in this guide (Hot Together, Retail Therapy) and partner time in free roam, which is where partnership milestones live.",
        ["Progress the two protagonists' story", "Spend partner time in free roam", "Clear the partner feats if it has not popped"], []),
    48: ("story", 2, True,
        "INFERRED watch-list: 'choices made' implies a decision point in the story. Which choice unlocks it is not published anywhere — flagged because choices cannot be unmade in the same save.",
        "Choices made (for better or worse): a decision trophy. Keep a manual save before every major story decision — with a save parked, the other branch is a reload away; without one, it is a second playthrough. If the trophy does not pop on your first choice, reload and take the other branch.",
        ["Save manually before big story decisions", "Make your choice and watch for the unlock", "Reload and choose otherwise if needed"], []),
    49: ("activities", 5, False, "",
        "Second time's the charm: the description tells you the shape — fail once, then succeed. The exact event is not named in the official text, so when you meet a retryable event that fails you once, do not rage-reset: clear it on the immediate second attempt and this is the likely pop.",
        ["Meet a fail-state event", "Fail the first attempt", "Succeed on the second"], []),
    50: ("activities", 5, False, "",
        "What the hell just happened? The official text is a reaction, not an instruction — this is an encounter trophy. Leonida's strange corners are the hunting ground the joke points at: when something unexplained happens around you, stay and see it through instead of driving off, because leaving is how encounter trophies get missed.",
        ["Explore off the main routes", "Investigate anything unexplained", "See the encounter through"], [GW]),
    51: ("activities", 5, False, "",
        "Bowl 'em over with a melee drive-by. The bowling joke means a cluster: line up a crowded pavement, swing a melee attack from the vehicle as you pass, and strike the group in one motion — one pin at a time will not satisfy the wording.",
        ["Find a crowded pavement", "Approach by vehicle with a melee weapon ready", "Strike the cluster in a single drive-by pass"], []),
    52: ("activities", 5, False, "",
        "Earn $250,000 laundering Marked Bills through your contacts. The total is cumulative across the playthrough: Marked Bills come from robberies, and they only count toward this once they are laundered through contacts, so route them there instead of letting them sit or spending them raw.",
        ["Collect Marked Bills from robberies", "Launder them through your contacts", "Reach $250,000 laundered"], []),
    53: ("activities", 5, False, "",
        "Spend $100,000 across all shops. Every store feeds the same cumulative pot, so there is no wrong purchase — only slow ones. If you are chasing this late, big-ticket spending finishes it quickly; hoarded cash earns nothing here.",
        ["Spend at any shops as you play", "Track the cumulative total", "Reach $100,000 spent"], []),
    54: ("collectibles", 5, False, "",
        "Purchase all garage properties. Garages come onto the market as the story and your cash grow, so sweep the property listings each chapter and buy on sight — by the end, the last garage is a money problem, not a map problem, and the economy trophies in this stage feed it.",
        ["Check property listings each chapter", "Buy every garage that appears", "Own all garage properties"], []),
    55: ("activities", 5, False, "",
        "Register 10 vehicles to the Scooter Bros app. Make it a habit rather than a project: register each new vehicle at the moment you acquire it, and ten registrations arrive long before you think of counting them.",
        ["Open the Scooter Bros app for each new vehicle", "Register it on the spot", "Reach 10 registered vehicles"], []),
}


def main():
    starter = json.loads(STARTER.read_text())["trophies"]
    case = {t["id"]: t for t in json.loads(CASE.read_text())["trophies"]}
    case2 = {t["id"]: t for t in json.loads(CASE2.read_text())["trophies"]}
    assert len(starter) == 55
    out = []
    for t in starter:
        i = t["id"]
        assert case[i]["secret"] == case2[i]["secret"], f"secret disagreement id {i}"
        assert case[i]["name"] == t["name"] and case[i]["tier"] == t["grade"]
        kind, stage, miss, note, guide, steps, extra = CUR[i]
        out.append({
            "id": i,
            "name": t["name"],
            "description": t["description"],
            "grade": t["grade"],
            "secret": case[i]["secret"],
            "kind": kind,
            "stage": stage,
            "missable": miss,
            "missableNote": note,
            "guide": guide,
            "steps": steps,
            "sources": BASE + extra,
        })
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps({"trophies": out}, separators=(",", ":"), ensure_ascii=False) + "\n")
    print(f"wrote {OUT} with {len(out)} trophies")


if __name__ == "__main__":
    main()
