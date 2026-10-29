# Predictable — Design Document

Last updated: Oct 28, 2026

## The game

Predictable is a wordless troll platformer, in the spirit of 正常的大冒险 and Syobon Action. It has 100 levels in ten chapters. Its traps watch how you play and set themselves for the player you are.

- **It predicts you.** Traps aim at where you will be in a moment, at how you escaped last time, and at your habits across levels: how fast you run, which way you dodge, how long you hide, which door you pick.
- **It is fair.** Every prediction is shown before it lands, and every death can be explained afterwards. The goal is a player who dies and thinks "of course".
- **It remembers.** Every death leaves a red ✕ that stays on the map. Each level remembers your earlier attempts there, and the profile remembers your habits.
- **It says nothing.** There is no text in the game. The screen shows a level number, a progress bar of cleared levels and a death count, and nothing else.
- **Each level is one idea**, or a few ideas combined. The code labels each level with a one-line riddle.

**Look.** Graph paper, navy ink, pencil red and gold, with a hand-drawn feel and the Bungee display face.

**Controls.**

| Action | Keyboard | Touch |
| --- | --- | --- |
| Move | ← → or A D | One pad: press and slide to switch direction |
| Jump | ↑, W, Space or Z (hold for higher) | Jump button |
| Restart the level | R | ↺ |
| Level sheet (any level; cleared ones marked) | Button | ▦ |

On phones the game fills the screen in landscape, and the controls sit in strips beside it, so they never cover the game.

## The bar

Every level should meet one rule: **you only get through if you understand it, and once you understand it, it is easy.**

- **Not understanding means getting stuck.** Each level has a gate that only its idea opens. None of the following may clear it:
  - running right;
  - jumping at everything;
  - mashing;
  - wandering with pauses;
  - waiting where you stand;
  - repeating the previous level's lesson as a habit.
- **Finding it by exploring is fine; passing without meeting it is not.** If you walk off the left edge and see yourself come in on the right, you have understood the wrap. If you just ran right and stopped and the door happened to arrive, you have not.
- **Understanding makes it easy.** The way through uses few inputs and wide margins:
  - no chained precise landings;
  - no reaction faster than about 0.3 s;
  - tapping counts as walking;
  - jump windows of at least one tile.
- **Complexity lives in the logic, never in the hands.** Later levels may take more thought, never more skill. If knowing the rule does not make a level easy, the level is wrong: no acting a fixed fraction of a second ahead, no narrow timing, no reading things mid-air.
- **Every death teaches.** Dying and trying again is part of the game, so a level does not have to be cleared without dying. What is not allowed is a meaningless death: each death must show the player something they can use to beat the trap (where it was, what set it off, what it was aiming at). A death that teaches nothing, or teaches only "try somewhere else", is a bug.
- **Every rule has a reason.** A rule follows from what the thing is (a gun leads its target; a sleeper wakes at noise), and it belongs to the chapter's theme. A careful player can read it after a death or two, without trial and error for its own sake.
- **Tells are subtle, or absent.** A hint should only make the player feel that something here is off: a crack, a twitch, a stain, something slightly out of place. It must not announce the trap or hand over the answer. Some traps need no hint at all: the first death is the hint, as long as that death makes the rule readable.
- **Every trap is sprung.** If a level has a trap, every route through the level meets it. A player who knows nothing must not be able to walk past it by luck or by not noticing; the only way past is to understand it. A trap that can be skipped is decoration.
- **Nothing is there for nothing.** Every object on screen either is part of a trap, part of the way through, or a hint. If removing something would not change how the level is played, remove it.
- **Standing still never clears a level**, except level 1, which teaches it.
- **The answer is never what you would do anyway.** Each level asks for a real insight, and in the later chapters a plan of more than one step. If the obvious move works, the level is not finished.
- **No two levels share an answer.** When a piece comes back, it asks something new. "Let go and it comes to you" is level 1's answer; later levels may build on it, but never end on it again unchanged.
- **A duel, not a puzzle box.** The best levels are a game against something that models you: it predicts you, and you predict its prediction. Prefer feints, baits, teaching it a habit and then breaking it, and using its aim as a tool, over hidden properties that only have to be noticed.
- **Make the reasoning hard, not the tell loud.** A tell that gives the answer away ("that one is odd, don't touch it") makes the level too simple. Dodging is not an answer: a level whose solution is just avoiding the dangerous thing is too simple. The puzzle is what to do about what you have seen.
- **A finale is a new idea, not a stack.** The last level of a chapter makes its pieces act on each other: the answer to one is what another punishes, or one piece's prediction is turned against another. Running the earlier answers in a row is not enough.
- **Pieces interact.** Most levels combine two or three pieces. Ideally, the habit one piece teaches is exactly what another piece punishes.
- **Depth comes next.** The first hundred levels are mostly single-layer: one trap, one idea. Levels beyond them should go much further in difficulty and thought: chained traps, where escaping one sets up the next; several layers of second-guessing, where the game predicts your answer to its prediction; and logic that a player has to plan out over several lives.

## The curve

The hands stay simple from level 1 to 100. The thinking deepens.

| Chapters | What a level asks of you |
| --- | --- |
| I | One idea per level, shown plainly, so a first-time player sees what kind of game this is: it reacts to you and guesses what you will do. |
| II | One idea with a twist: the habit you just learned is used against you. |
| III–V | Two or three pieces that pull against each other. |
| VI–VII | An order to find (first this, then that), and your own past used as material. |
| VIII–X | Plans of several steps, predictions of predictions, and rules from earlier chapters used together. |

The first three levels are deliberately gentle. They teach the language of the game: things react to you, your deaths stay on the map, and what you want runs away.

## Structure

There are ten chapters of ten levels, one chapter per row of the level sheet.

- **Each chapter has a home scene** and a main character, with guests from earlier chapters.
- **The levels build on each other.** They introduce a piece, twist it, then combine it with the others. Level 10 of each chapter puts the whole chapter together.
- **The hidden spine is Hegel's system**, from Being to Absolute Knowing. The game never says so. The comment line for each level in the code is a one-line riddle.

| | Chapter | Main piece | Hegel (hidden) |
| --- | --- | --- | --- |
| I | Door | the shy door | Being, becoming, something and other |
| II | Sky | the cone that falls where you will be | Quantity: prediction, more and less |
| III | Seeming | what is drawn vs what is | Essence: appearance, reflection |
| IV | Weight | keys, planks, plates, gravity | Measure, mechanics |
| V | Elements | dark, sun, water, fire, wind | Physics |
| VI | Living | growth, creatures | Organics |
| VII | Self | the ghost, the ✕, habit | Subjective spirit |
| VIII | Others | guards, law, queues, guns | Objective spirit |
| IX | Art and faith | canvas, beat, stage, leap | Art, religion |
| X | Reason | paradoxes, the circle | Philosophy |

### The recurring cast

These come back through the whole game, each time doing something new.

| Piece | First seen | Later forms |
| --- | --- | --- |
| **The door** | Runs from whoever chases it, comes to whoever lets go (1). | Bites whoever looks at it (5), brings things with it (8), sleeps (9), is painted where it used to stand (27). Turns out to be alive (VI), halved (91) and frozen in time (92). In 100 you are the door. |
| **The sky** | Cones fall where you are going (2). | Break bricks (12), plant stakes (13), aim at your reflection (18). Fall on your old ✕ (69) and plant seeds (57). |
| **The Eye** | Bites the door you look at (5). | Blinks (6), aims the sky (20), prices what it has seen you hold (33), sweeps as a searchlight (73). Takes you for your double (94), fills Newcomb's boxes (98), and at last sees itself (99). |
| **The ✕** | Your deaths stay where they happened. | Get forged (22), light the dark (41), become your bodies (61), and draw the sky (69). |
| **The ghost** | Your last attempt walks again (15). | Holds a plate for you (62), chases you (64), and in 70 every earlier life stands under you as a step. Carries a key further (77). In 100 it is you who walks toward the one you were. |
| **The entrance** | Every level starts in front of the open door you came in by. | Usually scenery. In 7 it is the way out; in 100 the one you were goes home to it. |

## The dialectic

The hidden Hegel is not just a list of chapter names: it is how the levels move from one to the next.

- **Every level negates the one before.** The answer a level teaches becomes the habit the next one punishes, or the thing it has to be turned against. Nothing learned stays simply true.
- **A negation keeps what it negates.** The next level does not throw the old answer away; it needs it, changed. You still use the shy door's rule, but now as a lure, a constraint or a weapon.
- **The chain is unbroken.** Each level leads out of the last. Each chapter grows out of the contradiction the previous one ended on, and its last level gathers its pieces into something none of them was alone. The last level returns to the first, understood.
- **The world changes too.** The door, the sky, the Eye and your own past keep changing what they are as the game goes on.

## I. Door (1–10)

The door is the main character: it runs from whoever chases it. The Eye arrives at level 5 and the sky at level 2. Levels 1–3 are the gentle onboarding.

| # | Level | What is in it | The idea you need | Without it |
| --- | --- | --- | --- | --- |
| 1 | **Flight** | Flat ground and a door that runs from you. | Let go of everything for a few seconds; it walks to you. | You chase it; it flees and hops over you. |
| 2 | **Becoming** | A bridge that holds only while you move. The sky drops cones where you will be. | Step back when it leads you, keep going when it waits; never stop on the bridge. | Stopping (level 1's lesson) drops you; running straight meets the cone. |
| 3 | **The other side** | The screen wraps. The visible door comes when you wait, and is fake: the level number ticks up, then the same level again. Cornered at the tall wall, it hops over you off the left edge and lands beside the real door, which is behind that wall at the right edge. | Leave by the left edge. | You keep waiting for the fake one. |
| 4 | **Inside out** | Every jump swaps which blocks exist, over spikes. The door is a door in one world and a mouth in the other. | Hop once in place first, go block to block, then hop once more before the door. | Jumping straight at the first block, which vanishes; walking into the door in the wrong world. |
| 5 | **Bashful** | Ice floor. The door bites whoever faces it (teeth show when you look). It can't walk on ice, so it won't come. | Slide toward it and turn round while sliding, so you arrive backwards. | Walking in face first; waiting (it never comes). |
| 6 | **Blink** | Two doors that bite while the Eye is open. Between them is a moving-only bridge with one stone tile. The Eye watches whichever door you are near, and only grows drowsy once you stand still far from both. | Find the one place you can stand still, wait for the lid, then run. | Waiting near a door keeps it open; stopping on the bridge drops you. |
| 7 | **The way you came** | You start past a pit, facing back toward the entrance; three biting doors stand ahead and rush at whoever stands still. The entrance is the exit; it is shy and bashful. | Go back over the pit, turn your back on the entrance and let go: it comes to you, and the biters rushing at you fall into the pit. | Any door ahead; letting go where you start (the biters reach you). |
| 8 | **What it brings** | The shy door pushes a spiked crate ahead of it as it comes. | Wait on the far side of a pit: the crate drops in and fills it, and the door walks over. | Waiting where you start (level 1's lesson). |
| 9 | **Asleep** | The door is asleep. Running and hard landings make noise, which wakes it, and an awake door runs from you. It doesn't come to you either. | Run until you are near, then creep the rest, a tap at a time. | Running up to it; jumping; waiting. |
| 10 | **The beginning** | The screen wraps. The shy, bashful door sleeps on a high ledge and wakes to a noise; it falls asleep again after a while. Awake, it comes to whoever lets go by the shorter way round the world, which from the roof is off the right edge and in again at the left. The Eye shoots whoever stands still anywhere but under the one roof, at the far left; it sees over the ledge. | Run near it to wake it, get under the roof, turn toward where it sleeps (your back to where it will come from) and let go. | Chasing it; creeping (it never wakes); letting go in the open; turning your back on the ledge, which faces you into it as it comes round the edge; hiding behind the ledge. |

## II. Sky (11–20)

The sky drops cones where it thinks you will be, and its shadow always shows where. The chapter climbs the orders of prediction:

- where you are going;
- where you were;
- what you did last time.

It then turns the sky into a tool: a hammer, a builder, a decoy.

| # | Level | What is in it | The idea you need | Without it |
| --- | --- | --- | --- | --- |
| 11 | **Shelter** | Every so often a curtain of rain falls around where you will be; in the open there is nowhere to go, and roofs stop it. The sky learns: once you have stopped under two roofs in a row, it expects you under the next one, and its rain goes through that roof. | Roof to roof between curtains, then break the habit: run on past the next roof to the one after. | Running in the open; stopping under every roof (the third one, or wherever your third in a row would be, lets the rain through). |
| 12 | **Hammer** | The door is down a well under a thick brick lid. A cone falls where you will be each time you run past a red line, and the gold mark behind you lights when it is ready again; cones crack bricks. | Run at the lid and turn back before it, three times: each cone lands where you would have been. | Standing on the lid (you are the target); running across (it leads you exactly). |
| 13 | **One step behind** | Each cone falls where you stood when the last one landed. Landed cones stay as stakes for a while. The door is on a ledge too high to jump to. | Stand at the ledge's foot as one lands elsewhere, then step away. The next plants a stake there; climb it. | Jumping at the ledge; waiting at its foot (the next cone is yours). |
| 14 | **Do nothing** | A small raft over spikes moves only while you touch nothing. While it carries you, the sky drops a cluster of cones around where you are right now: it expects you to flinch, and any key stops the raft. At the far bank the raft stops for good. | Don't flinch: hands off while the shadows gather under you, and the raft carries you out from under them; then walk off to the door. | Stepping back, stepping forward or hopping when the shadow comes (the raft stops under the cones); waiting at the bank. |
| 15 | **Decoy** | Your last attempt sets off with you as a ghost and uses up the crumbling road it walks; only the patch where you start holds. The sky aims at whoever is in front, and when that is you, or you are level with it, it does not miss. | Let the ghost go first: hang back a moment, then take the road it did not take; it takes the cone. | Racing it (level is not behind); following its road (it is gone); going first on your first try. |
| 16 | **Heavy** | Three falling blocks, each with its own opinion of you, and each shows it on the floor. The first falls on the mark of where you are going; the second, eyes shut, only on exactly where you are, and fast; the third only on where a full run would put you, and having missed, it stands up as a wall. | Bring the first down in front of you and jump it, run under the second without stopping, creep under the third. | One speed for all three. |
| 17 | **Ice** | On ice, each cone keeps re-aiming at where your speed is taking you (and, if you are in the air, at the height you will be at), and its shadow slides after you, until it is half a second from the ground; then the shadow stops. | Keep steady while the shadow follows; once it stops, brake or jump. | Changing early (it follows); not changing. |
| 18 | **Reflection** | Stand still and a cone falls on your mirror image across the middle of the screen, and stays a while as a stake; cones stop on whatever ledge they meet. The door is on the higher of two ledges on the other half. | Stand still at the mirror point of each ledge's foot, the low one's and the high one's, then cross and climb both stakes before they go. Near the middle, your mirror is you. | Standing where you want the stake; one stake only; waiting near the middle. |
| 19 | **Landing** | Pits, and every jump calls a cone to where the keys you hold at take-off would bring you down. | Change course in the air: let go of the direction, or tap back. | Ordinary jumps, from a run or from a stop. |
| 20 | **The Eye and the sky** | The Eye aims the sky. Open, it drops cones where you are going; the moment it shuts, it keeps the last place it saw you and drops one there that stays as a stake. The door is down a well in a high ledge, under a brick lid. | As it shuts, be at the ledge's foot, then step away; climb the stake. On the ledge, while it is open, head for the lid and turn back until the cones have broken it. | Any one of the chapter's habits on its own. |

## III. Seeming (21–30)

What is drawn and what is there come apart. Each level teaches a different way of reading the screen: the dotted line, the mirror, the mime, the shadow on the wall. The chapter ends in Plato's cave.

| # | Level | What is in it | The idea you need | Without it |
| --- | --- | --- | --- | --- |
| 21 | **Offset** | The drawing is pinned in the middle of the sheet, and each half has slid two tiles toward the pin: the left half to the right, the right half to the left. Under the ink, a faint pencil underdrawing shows what is: two-tile gaps with a one-tile ledge between, a spike two tiles past the drawn one, and a last gap of four tiles, two past the drawn one, with a pit under the drawn door. | Follow the pencil, not the ink. The "two tiles off" learned on the left runs the other way on the right. | Trusting the drawing; trusting a fixed offset; hopping the drawn spike onto the real one; leaping everything as drawn, which comes down in the real last gap. |
| 22 | **Forged** | Some ✕ marks are painted on. On the left, three of them lie right before three hidden spikes, so a leap over the marks comes down on the spikes. Past a crack in the sheet the forger paints straight onto the spikes, for whoever has learned to walk through paint. The painted ones are glossy and still wet: they drip, and they smear when walked through. Now and then a hidden spike catches the light. | The marks tell you nothing, either way; the glints do. Walk through the paint on the left and hop the spikes after it; on the right, hop the paint. | Leaping every ✕ as if it were yours; walking through every painted ✕ once you have seen through it. |
| 23 | **Fourth wall** | A death screen appears while you are still alive, then a title screen, both in low spiked tunnels. Unlike the real ones, they never go away by themselves. Then, in a short tunnel of its own so it cannot be jumped, a victory flag with eyes plays the chapter-clear celebration, and a few seconds later the floor drops. | The screens are part of the world, and you are still standing behind them: let go of the keys and walk out of each, the celebration too, on to the door under it. | Pressing jump, as you always do on those screens (you jump into the spikes); waiting for them to pass; holding on through them; waiting out the celebration. |
| 24 | **Mirror** | A mirror strip on the ceiling shows the floor as it really is: hidden spikes and false tiles. One stretch of it shows things as they were a moment ago (your reflection lags there too). There a block hangs low, so you can only walk under it, and an invisible spike under it starts to beat, up a while and down a while, as you come in. | Read the mirror, not the floor; where it lags, go when it shows the spike up. | Trusting the floor; trusting the mirror blindly where it lags; walking straight in (it rises as you come). |
| 25 | **Imitators** | One creature copies your jumps a moment late, crouching while it waits, at full height. One mirrors your every step, backwards. | Use the copying: let the late one come close before you jump it, so you are past before it leaps; walk away so the mirror one walks off its ledge. | Treating them as ordinary enemies; jumping the late one from a few tiles off. |
| 26 | **Opposites** | Past a line, the ground kills, spikes hold you up, the door bites, and the hole is the way out. A pebble rolls across the line and bursts on the ground; the rest you learn by dying, and an upside-down door is drawn in the hole. | Hop from thorn to thorn and drop into the hole. | Treating that side like this one; full jumps, which land on the ground between the thorns. |
| 27 | **Gallery** | A gallery wall seals off the door, and the thorns painted on its floor are only paint. Three framed pictures hang there: stand still in front of one and it glows, and if you jump on the spot then, you are where it shows. Two show the door. One is a window: the room in it is the room you can see past the wall, and its bird hops when the real one does. The other is a painting of that room as it was, before the thorns. The gallery is rehung every life, so a picture's place tells you nothing. | Compare each picture with the room past the wall, and go through the window. | Jumping into the first picture that shows a door; jumping at pictures on the run; trying them one a life by place. |
| 28 | **Double** | Behind a glass line, your double does what you do the other way round, on its own floor; if it falls, so do you. Its floor has a gap, then a step it can't walk through, then another gap, and its door is past them. Your floor has a long, low spiked ceiling, where a jump kills you. A wall that stops one of you doesn't stop the other. | Jump it over the first gap. When the step stops it, keep walking until you are out from under the spikes, then jump it over the step and the second gap at once. | Walking it to its door; jumping at the step while you are under the spikes. |
| 29 | **Mime** | A mime walks ahead of you and acts out an invisible rung in the air, a wall too tall to climb from the floor, and a bridge over spikes with a gap in it, under a low spiked ceiling: it hops the gap small, hands on the ceiling. Then it mimes a door that isn't there, and steps through it. | Follow its hands, not its door: up onto the rung where it climbs, and from there over the wall; hop the gap small where it does. | Walking or jumping where nothing is drawn without watching it; jumping at the wall from the floor; walking the bridge; leaping its gap. |
| 30 | **Cave** | Facing the door, you see only shadows on the wall, cast by a fire behind you and stretched by it; not even your ✕ marks show. Turn around and you see the real things: the gaps, the spike, and the mime from 29 up on a ledge, working a puppet door on a string. | Look back to learn the real layout, then walk forward through the shadows. | Jumping by the shadows; walking to the puppet's door. |

## IV. Weight (31–40)

Numbers start to matter. Keys and coins weigh something, a seesaw throws whatever is lighter, a fall hits back as hard as it fell, and up is a direction you can choose. Two-piece levels become the norm: one piece sets a limit, and the other pushes you toward it.

| # | Level | What is in it | The idea you need | Without it |
| --- | --- | --- | --- | --- |
| 31 | **Enough** | Four keys hang at rising heights, and each key you hold lowers your jump. The door takes exactly three, and bites if you bring more. | Take the highest one you can reach first, work down, and leave the lowest. | Taking them in the order you meet them; taking all four. |
| 32 | **Seesaw** | A seesaw under a high ledge. The heavy block from 16 falls where you will be when it lands. | Run at it to call the block, then turn back to the near end: it lands on the far end and throws you up. | Jumping at the ledge; running on (it lands on you). |
| 33 | **Price** | The door asks one more coin than the Eye has seen you hold, and coins weigh like keys. Its gaze is drawn, stopped by a low pillar and by a screen hanging from the roof. Coins lie in its sight and behind the pillar. The steps up to the roof are two tiles each. | Take one coin behind the pillar, out of its sight, and come home over the roof: with one coin you can still climb, and it has only seen you hold none. | Taking a coin in its sight; jumping back over the pillar with the coin; taking both coins behind the pillar (too heavy to climb). |
| 34 | **Measure of a leap** | Each gap ahead is as wide as your last leap, and a quarter more, and every leap counts, even a hop on the spot. Your last leap is marked in red, and each gap's width on its lip. | Before each gap, hop on the spot: the gap shrinks to its smallest, and any leap will clear it. | Big jumps "to be safe"; the smallest leaps that clear each gap, which still grow the fourth past reach. |
| 35 | **Up is a choice** | Every jump flips gravity. Falling off the bottom brings you in at the top, onto the roof where the door is; most of that roof is spikes, so the first hole shows you the wrap by killing you on them. | Flip to cross, flip back before the hanging spikes, and fall through the second hole. | Fighting the flip; the first hole. |
| 36 | **Portal** | Two gold mouths in the floor, each the other's way out: what falls in comes out going up, as fast as it went in. The door is on a high ledge above the left one; a low ledge stands by the right one. | Fall from higher to fly higher: get onto the low ledge, then jump up off it and come down into the portal; your jump and the ledge add up. | Walking in; jumping in from the floor; stepping off the low ledge (each comes out short of the door). |
| 37 | **Hard landing** | Falls of more than three tiles kill. Each step is tucked under the lip of the one above, so running off sails past it; the first fall shows you how far is too far. The long step is brittle, tile by tile, with hairline cracks, and only its far end is over the last step. | Step off slowly; then run along the brittle step, stop at its far end, and let it drop you. | Running off the ledges; creeping along the brittle step; running off its end. |
| 38 | **Wheel** | A big wheel and a small drum turn on one axle. A lift hangs from the wheel's rim with a crate of two pips on it; the heavy block, five pips, sits on a tray hanging from the drum. The crate holds the block up. The door on the high ledge needs a key, and the key weighs one, as you do. | On the wheel a pip weighs three. Take the key, jump over the block, and push the crate back onto the tray: you and the key, three times two, are lighter than the block and the crate. | Stepping onto the tray (with the key it sinks onto the thorns); pushing the crate off the far side; going up without the key. |
| 39 | **Ferry** | A ferry hangs from a cable over thorns. A rope runs from it over a pulley to a box, whose weight shows in pips: its own, and one for each key hanging from it. The ferry runs to the far bank only while it carries more than the box, and hangs lower the more it carries; a ruler on the bank marks how low, and the fourth mark is the thorns. You count as one. | A key taken from the box counts twice. Take two, and you are three against two. | Taking every key (four sinks onto the thorns); one key (two against three). |
| 40 | **Balance** | A seesaw with a heavy gold box on one end, a tunnel too low for the box, and a cracked brick wall in front of the door; a heavy thing thrown breaks what is cracked. The block from 32 hangs over the other end, and each key makes you heavier. | Take the high key first, then the low one. Then call the block and stop on its side of the middle, short of it: you and the block together outweigh the box, and it flies over into the wall. | Too few keys (the plank only levels out); running into the block; stopping on the box's side; any single trick on its own. |

## V. Elements (41–50)

Light, water, fire and air each have a rule, and most levels pair two that pull against each other. Water saves you from fire but drowns you. Sound lights the dark but calls the bat. Your deaths become the lamps of the dark levels.

| # | Level | What is in it | The idea you need | Without it |
| --- | --- | --- | --- | --- |
| 41 | **Dark** | Only you, a small circle around you, and your ✕ marks are lit. Every jump and landing sends out a ring of light that shows the way. The thud of a landing calls a bat, and it dives at where you will be by the time it gets there. A low roof, spiked underneath, keeps it off you, but there is a spike under the roof to hop. | Let the rings and your deaths map the dark. After each landing, don't go where you were going: stop or step back, let it come down ahead of you and fly home, then walk on. Under the roof, hop small. | Running on after a landing (it comes down on you); jumping to look around and staying put; full jumps under the roof. |
| 42 | **Sun** | A sun crosses the sky and burns you in its light; the shade under each block moves with it. On the boards, your own shadow is a hole. | Move with the shade, and cross the boards only inside it. | Running now; waiting in shade that is leaving; stepping onto lit boards. |
| 43 | **Water** | Fire on the bank, under a roof too low to jump it; then a pool under a roof. Getting wet lets you walk through fire for a while. Breath runs out underwater. A board floats beside the second air gap, and coming up at the first sends a ripple that pushes it over the second. | Wet yourself at the puddle behind you. In the pool, breathe at the first gap and then at the bubbles. | Walking into the fire dry; counting on the second gap. |
| 44 | **Fire** | A torch, grass that carries fire, and a thorn bush in the way. Past it, a bomb whose fuse burns only while you are near, and a brick wall. | Knock the torch over and wait out the fire on the stone. Then kick the bomb to the wall and wait near it, but not too near. | Running back from the fire; following the bomb; walking away from it. |
| 45 | **Spark** | The floor ahead is a live wire, longer than any jump. A cable of the same wire is strung low above it, starting a few tiles in and ending a few tiles short of the far side. The wire hurts whoever touches it while standing on something else. A beetle walks onto the live floor and is struck; another walks along the cable unharmed. | Stand on the wire itself: jump onto the cable, walk along it, and leave it by a jump from its end that clears the rest of the live floor. | Walking on; hopping over the start of the wire; walking or hopping off the cable onto the live floor. |
| 46 | **Wind** | Over both gaps the wind blows against whatever you press: gently over the narrow one, hard over the wide one. A vane over each shows it. | Let go over the narrow gap and drift across; over the wide one, letting go falls short, so press back the way you came and let the wind throw you over. | Pushing across; letting go over the wide gap too. |
| 47 | **Geyser** | Water bursts where you will be, scalds whoever is inside the column and soaks whoever is a tile beside it. A long strip of fire guards the door, and wet you can walk through fire, but you dry fast. | Wait just before the fire, let it bubble under you, step aside a tile, and run through the fire soaked. | Walking on (it bursts on you); getting soaked far from the fire. |
| 48 | **Bubble** | In the bubble you float up to the height your weight allows: the more keys you hold, the lower you float. The door hangs at the three-key height. One key lies in the open, one in a low passage you can't get round, and the third floats high in the bubble, at the height of someone holding only one. | Leave the open key where it is, float up with one and take the high key, then drift out, go back for the open key, and float in again with three. | Taking both keys on the way (you hover over the door, and the high key is out of reach); floating to the door with two. |
| 49 | **Light and dark** | White stones, black stones and grey ones over thorns. Every landing makes a ring of light that lasts a few seconds. White stones hold only inside the light, black ones only outside it; grey ones always hold. | Hop in place to light the white stones before you jump to them; on grey, wait for the light to die before you walk onto the black, and never land on black. | Jumping at the white stones in the dark; hurrying onto the black while it is still lit. |
| 50 | **Storm** | Night, and narrow stones over the dark. Lightning shows the whole level for a moment; its thunder comes a second later and rolls for a while. The bat from 41 dives at every jump and landing it hears, and searches the stone it comes down on, but while the thunder rolls it hears nothing (its eyes are shut). The stones are too narrow to get out of its way. | See the way in the flash, but wait for the thunder: jump while it rolls, so that you land while it rolls too. | Jumping when the flash shows the way (you land before the thunder); jumping in the quiet; running. |

## VI. Living (51–60)

The world is alive. It grows where you stand, sleeps until you make a sound, and follows you. From here, levels ask for an order: first make the thing grow, then climb it; first wake the right creature, then hide from it. In the last level the creatures answer each other as they answer you.

| # | Level | What is in it | The idea you need | Without it |
| --- | --- | --- | --- | --- |
| 51 | **Garden** | Grass grows thorns where you have walked; soil grows a vine under you if you stand still on it. The key is at the far end, and the door is back at the start. | Walk out low, grow a vine to come back high, and never stand long on grass. | Going back the way you came. |
| 52 | **Hunger** | The world wraps round, so there are no corners. Coins run from you as fast as you move, and from the spiked ball; the ball rolls toward you the short way round. The door is hungry for three coins. | Walk the coins round the world until you are more than halfway from the ball, so it comes the other way, through them. Wait; when it has them pinned, close in slowly (running makes them hop over you), take them, and jump the ball. | Chasing coins; standing still; walking into the ball after the coins. |
| 53 | **Gaze** | A pale ghost moves while you look away from it; a tall dark one moves while you look at it. Where they touch, both are gone (two faint small ones show it once, at the start). A low roof over the way, with one gap in it and a perch. | Get up on the perch, face the dark one so both come, and let them meet under you. | Facing one way and walking on; jumping the dark one (the roof is too low). |
| 54 | **Sleepers** | Guards sleep until you make a sound (running, landing off the rugs). A bull sleeps before a brick wall, with a rug just past it, where a jump over it comes down; awake, it charges at where you will be and breaks bricks you can't. | Creep past the guards and land on the rugs. Jump the bull onto the rug, then wake it on purpose: stamp by the wall, off the rug, and dodge its charge into the wall. | Running; leaving the bull asleep (the wall stays); stamping with your back to the wall (it crushes you there). |
| 55 | **Dream** | Stand still long enough and you fall asleep. Asleep, you walk on the clouds you dream over two pits, and you snore; a jump, or any loud noise, wakes you, and the clouds go. Someone sleeps on the far bank, where you would come down; your snoring wakes him from the island, and he runs at you. He does not dream. | Sleep, walk to the island, and wait there on solid ground: he runs into the pit, and his crash wakes you. Then sleep again and cross. | Jumping the pits; walking across everything in one sleep (his crash wakes you over the second pit). |
| 56 | **Snake** | A snake follows your exact path a little behind you, and catches you if you stop. The key is at the far end of a bare corridor, the door back at the start. A ring is scratched faintly on the wall, its head at its tail. | Kill it before you turn back: make your path cross itself quickly (a hop on the spot, a step back and forth), and when its head comes to that knot it bites its own body. | Going for the key and turning back; stopping; jumping on the run (the arc never crosses itself). |
| 57 | **Seed** | You start under a high ledge with the door on it; a line is drawn on the floor further on. Each time you cross the line, one cone falls where you are going, and a cone sows a seed where it lands. Stand still on a seed and a vine grows under you, up to the ledge's height. | Cross the line away from the ledge, then run back across it toward the ledge: the sky sows ahead of you, by the ledge. Stop short, let it land, and grow the vine there. | Running on (the seed lands out where nothing is); walking back into your own cone; growing a vine under the ledge, where it hits the ledge from below. |
| 58 | **Flock** | Birds perch in a row over the first of two gaps, and they are the bridge. Running near them or landing hard frightens them; they fly off and settle over whichever gap is further from the noise. The door is at the start; the key is on the far bank. | Walk softly across them, land hard at the near end of the island so they settle over the second gap, and walk across again; on the way back, come to the island first and land hard at its far end. | Running; making the noise from the wrong end, or from a bank (you strand yourself on the far one). |
| 59 | **Mimic** | Stepping stones over thorns, some wood and some stone. One of them is alive. Each time you land, it goes to wait on the nearest stone ahead that looks like the one you stand on; but once you have changed from one look to the other twice running, it expects you to change again, and waits on the nearest of the other look. Nothing shows where it waits until it bites. | Change your mind twice, and then, when it has learned that, trust the same look again. | Hopping to the nearest stone that looks like the last one; changing every time. |
| 60 | **Life** | Two gaps the birds can bridge, an island between them, and a guard asleep on the far bank between you and the door. Birds fly from a noise near them and settle over whichever gap is further from it; a whole flock taking off is loud; the guard wakes to a noise that reaches him and runs at you; where there are no birds under him, he falls. | Cross softly, stamp by the first gap to send the birds to the second; stamp by the second so they fly back and their takeoff wakes him, and he runs into the gap they left; stamp by the first again, and walk softly over. | Walking across to the sleeper; trying to wake him from afar; running on the island, which sends the birds the wrong way. |

## VII. Self (61–70)

Your own past becomes the material. That past includes:

- your bodies;
- your last attempt;
- your rhythm;
- the routes you chose before;
- what you resolved before you were tempted;
- the places you died.

Several levels need more than one life on purpose: you spend a life to set up the next.

| # | Level | What is in it | The idea you need | Without it |
| --- | --- | --- | --- | --- |
| 61 | **Bodies** | Where you die on the spikes, your body stays as a block. Every jump flips the world, and a body belongs to the side it died on. The key is on the far bank, up on a block; the door is back at the start. | Die forward to build steps, on the side you will need; after the key, hop once in place so the side matches for the way home. | Trying not to die; dying anywhere; forgetting that the jump to the key flipped the world. |
| 62 | **Last time** | Two plates, each holding open a gate further on, but only while it is held. Your last life replays beside you as a ghost. Each part of the floor has a low spiked block to end a life on. | Plan three lives. The first holds the first plate. The second goes through behind that ghost, but first stands on the first plate itself, then goes on to hold the second. The third follows the second's ghost through both. | Running from a plate to its gate; spending a life only on the second plate (the next ghost never opens the first gate). |
| 63 | **Habit** | Jump three times at one rhythm and your body starts jumping on its own at that rhythm. Over the fourth gap the Eye shoots whoever jumps on purpose; a spiked roof hangs before the door. | Run the first three gaps in rhythm on purpose, keep your hands off jump over the Eye's gap, then break the rhythm before the roof. | Careful stop-and-jump (you must press jump under the Eye); keeping the rhythm under the roof. |
| 64 | **Habit and shadow** | A long run of gaps, a gem halfway, and a spiked roof at the end. The habit takes over; after the gem your own trail follows half a second behind you and kills you if it catches up. | Break the rhythm before the gem by pausing; after it, break it without stopping (a tap back in the air, a short wait), and walk under the roof. | Pausing after the gem; keeping the rhythm under the roof. |
| 65 | **Changed mind** | Two forks, each a high lane over a low one. At each fork the Eye bets you will not do what you were doing, and stares at its bet. At the first it bets against what you were doing as you came up, and what it puts there is only a fist; at the second it bets against the lane you took at the first, and stares at it from the moment you leave the first fork. The second low lane ends in a pit no one can cross. | You will have to go high at the second fork, and it will bet against whatever you did at the first; so go high at the first, into its fist. | Walking the first low lane because the Eye is staring at the high one. |
| 66 | **Mast** | A ship sails past a siren once you are aboard. Every note of hers that touches you draws you to her, off the deck and into the sea. The door is locked with her three-note tune. Until the ship sails, a rope's loop hangs from the mast. | Stand under the loop and rise straight into it before you sail: bound, you hear all three notes and cannot go to her. | Riding loose; jumping her notes (the door wants the tune); thinking it over aboard until the rope is stowed. |
| 67 | **Wanting** | No jump button: you charge a jump instead, and the meter rises to full and sinks back. A spiked slab hangs over the whole way to the ledge. While you charge, it slides to where that jump would peak, quick to rise and slow to sink; once you let go, it has committed. | Charge past the height you want and let go while the meter sinks, still high enough to reach the ledge: the slab, slow to sink, is still above you. | Letting go at the height you want; charging less; jumping from further back. |
| 68 | **Regret** | Dying rewinds two seconds instead of restarting. Three spikes, each wider than the last. Past each, faint teeth show along the floor: something waits under it and bites where you first come down. After a rewind it waits everywhere except the patch where it already bit; the only trace is a gap in the teeth, under your ✕. | Come down exactly where it bit you, the place every instinct says to avoid. | Landing somewhere new after the rewind. |
| 69 | **Remembered** | The door is at the bottom of a well, under a lid of four thorny bricks, the second one over the door; the well floor is thorny except under the door. The sky falls on your old ✕ marks, and a falling cone cracks the brick it hits. | Die once, on purpose, on the second brick; next life wait for the sky to open it, then drop into the hole. | Walking into the lid (it opens the first brick) or jumping the well at a run (it opens the third or fourth); avoiding death on the lid. |
| 70 | **Self** | The door is on a ledge too high for any jump, and a life here lasts as long as the hourglass. Every earlier life replays beside you, and holds you up wherever it stood still. | Spend a life standing at the wall, and the next standing on that one; the third climbs them both. | Treating each life as a fresh start; riding a past life's jump (it only holds where it stood still). |

## VIII. Others (71–80)

The world is full of others: a law, a watchman, guns, a queue, liars, and the people you were before. They predict you, and some learn from being fooled; you have to predict their predictions. Solutions are plans of several steps.

| # | Level | What is in it | The idea you need | Without it |
| --- | --- | --- | --- | --- |
| 71 | **Law** | Each kind of act (jumping, going left, stopping) may be done once; a tablet shows what you have used, and the second time a bolt strikes. A lift over a gap, a wall, and the door just past it. | Wait for the lift instead of jumping onto it, and spend your one jump on the wall. | Jumping onto the lift, then over the wall. |
| 72 | **Intention** | Spikes with eyes hurt you only while you are pressing a direction. Belts and ice carry you. The door lets in only those who are leaving: it bites whoever faces it. | Let the belt and the ice carry you over the spikes with your hands off; turn round somewhere safe and ride in backwards. | Walking over; walking in. |
| 73 | **Searchlight** | A watchman over a yard with three roofs. When it loses you, it searches where you would have gone. Once fooled, it learns and searches the other way. | First show it a retreat, then run while it looks behind you. Next time, show it an advance into cover, then run. | Running for cover; the same trick twice. |
| 74 | **Two guns** | The gold gun fires at where you will be; the white one fires later, at where you are, so both land together. Two that land on one spot cancel. A brick wall in front of the door. | Head for the wall as the gold one fires, so its shell breaks the wall, and turn back. To let a volley pass, be still before it fires. | Running on, stopping, or dodging one gun at a time. |
| 75 | **Queue** | Creatures cross a long plank one at a time, each in its turn, and two on it break it. They count you only once you have taken your place at the back of the line. | Stand behind the last one waiting, keep up, and cross in your turn. | Rushing; waiting at the edge or in the middle of the line. |
| 76 | **Identity** | Every jump changes your colour, and you can stand only on your colour (and white). Three gaps; the door lets in only who you were at the start. | Count: hop on the white tiles until the jump over the next gap makes you the colour of the strip beyond it (once, not at all, twice). | Jumping each gap; hopping the same number each time. |
| 77 | **Relay** | Each life lasts a few seconds. Run out of time on firm ground and the key stays there, and the next life starts there; anywhere else, it goes home. A slow lift takes longer than a life has left by the time you reach it. | Let one life run out at the lift's foot, ride it with the next, and finish with a third. | Riding the lift as soon as you reach it. |
| 78 | **Babel** | The height you last stood at sets what your keys mean, and each band of rows means something else. | At each new height, try the keys before you jump. | Pressing what worked below. |
| 79 | **Testimony** | Five doors, one real. Two creatures: one always tells the truth, one never does. They smile or frown at whatever you stand at, and the real door changes with every death. | Ask them about the spikes first, which you know are bad: the one who smiles is lying. Then believe the other. | Guessing; believing either one blindly. |
| 80 | **State** | The law's tablet again, a watchman that reports what it sees, and a gun that punishes one offence where the watchman believes you are (a second offence brings the bolt). The door is behind a brick wall. | Offend on purpose in its sight, then vanish under the roof while heading for the wall: it believes you ran on, and its gun breaks the wall for you. | Never offending; offending at the wall; offending twice. |

## IX. Art and faith (81–90)

The first half is art: you paint, sing a round with yourself, copy a dancer and act on a stage. The second half is faith: the way through looks like it can't work.

- die in the veil;
- walk off the edge;
- leave your body;
- give away what came to you;
- keep going into the sea.

The chapter ends on a joke: the Eye laughs, and nothing falls while it laughs.

| # | Level | What is in it | The idea you need | Without it |
| --- | --- | --- | --- | --- |
| 81 | **Canvas** | Every landing flips the paint of the tile you land on and of both its neighbours. The door opens when the floor matches the framed picture. | Land where the splashes add up to the picture, not on the red tiles of the picture. | Walking across; landing on what should be red. |
| 82 | **Round** | Your echo walks a moment behind you, and it is solid only while it holds still. The ledges are too high to jump. | Stand where you need a step, step back, and climb onto your echo as it holds the note. | Jumping at the ledge; waiting at its foot. |
| 83 | **Dancer** | Across the stage a dancer steps on pads in an order, and you must repeat it. The dance is new every life, and a wrong step opens a pit. | While it faces you it is a mirror: its left is your right. When it turns its back, copy it as it is. | Copying it as you see it; mirroring every time; stepping last life's dance by heart. |
| 84 | **Curtain** | The set changes behind the curtain every few seconds, and the curtain shows the next set in gold. Two platforms never change, and the far bank is out of reach from them: the last stretch is only in the second set. | Go while the set is up, wait out the change on the last platform that stays, then cross on the new set. | Running and jumping; racing across on the first set; waiting on the set as the curtain falls. |
| 85 | **Keystone** | A veil kills whoever enters it, and the dead rise beyond it. Past it, an arch over a thorny pit, against a cliff; the door is below the keystone, the only bare floor down there, and the keystone is cut a little differently from its neighbours. Step on it and the arch falls from the middle outward, faster than you can run. | Die in the veil to cross it; then stand on the keystone and ride it down. | Keeping away from the veil; running across the arch; fleeing either way when it shakes (the fall outruns you onto the thorns). |
| 86 | **Leap** | The bridge is there only for whoever stops at the edge first, then walks off and keeps walking. A jump gets nothing, and stopping on it, it's gone. A feather rests on it now and then. | Stand at the edge a moment, then walk off and keep walking. | Jumping the gap; running off blind; stopping to look. |
| 87 | **Spirit** | Stand still and you leave your body: for a few seconds you pass through walls and spikes, then your body comes back wherever you are. | Leave it twice: once between the walls, once past the thick one, and come back where there is room. | Running; one long trip; coming back inside a wall. |
| 88 | **Needle** | Coins drift toward you and stick, and each one makes you wider. The gate fits only someone holding nothing. A beggar sits back by the entrance, where you had nothing to give; he takes a coin at a time from whoever stands by him, but he is ashamed to be watched: while you look at him he hides his eyes and lowers his bowl. | Go back to the beggar, turn your back on him, and stand there until he has taken it all. | Walking to the gate with what came to you; standing by him facing him. |
| 89 | **Sea** | The sea parts ahead of whoever keeps going, and closes at once on whoever stops. Once you are in, a chariot comes after you. A rock stands above the water. | Run in, and stop only on the rock: the sea closes on the chariot. Then run on. | Running straight across (the chariot catches you); stopping in the sea. |
| 90 | **Joke** | The Eye laughs at a pratfall (a peel, a rake, a falling pot), and while it laughs nothing falls: you walk on air until it opens its eye and sees you. It laughs at each kind of joke once. Three pits: a peel and a rake at the first, a rake and a pot at the second, only a peel at the last. | Work back from the end: keep the peel for the last pit, so take the rake at the first and the pot at the second. | Slipping on the first peel; taking the rake twice; avoiding every joke. |

## X. Reason (91–100)

The classic paradoxes and thought experiments, each made into a level that can be solved: Zeno's runner and arrow, Copernicus, Theseus, Einstein's lift and twins, Maxwell's demon, Newcomb's predictor, and the Eye that sees itself. Most are about motion, time and identity; the last few turn to prediction itself. The last level is the first one again, and this time you are the door.

| # | Level | What is in it | The idea you need | Without it |
| --- | --- | --- | --- | --- |
| 91 | **Achilles** | Near the door your walking speed is what is left of the way, so you creep toward a line just short of it, and hops shrink the same way. In the air you keep the speed you left with. A stepped tower stands behind you. | Climb the tower and leap from the top at a run: you fly in at full speed. | Walking or hopping to the door; walking off the tower. |
| 92 | **Arrow** | The world moves only while you move: stand still and everything stops, the door too. The door runs from whoever comes after it, trails slowly after whoever leaves, and walks to whoever lets go. | Let go without standing still: hop in place, so that time passes and you go nowhere. | Chasing it; standing and waiting; walking away. |
| 93 | **Copernicus** | Stand still and the room turns a quarter around you, and you fall to its new floor. Spikes line one wall; the door is in a closed box high up and works only when the room is upright. | Stand where four turns will drop you, step by step, into the box: on the high step. | Standing where you start (the first turn drops you on the spikes); standing on the low step. |
| 94 | **Theseus** | Others who look exactly like you stroll toward the start and run back. The Eye marks you, shoots whoever it marks if they stand still in the open, and the door bites whoever it marks. It cannot tell you apart: when the one it marks meets another, it keeps whichever goes on the way the marked one was going. | Get ahead of one, turn back, catch it up and stop inside it: it walks on with the mark. Then go to the door. | Walking to the door; walking through them; stopping inside one coming your way. |
| 95 | **Elevator** | A lift with the door on a high ledge inside. Once you are in, the Eye cuts the rope, and the lift falls. | In a falling room nothing weighs anything: push off the floor and float up round the ledge to the door before it lands. | Waiting in it; running out of it. |
| 96 | **Twin** | You and your twin age by the clocks over your heads, and a moving clock runs slow. The door lets in only the younger twin. | Run to the far wall and back, again and again, and come home younger. | Going in at once; waiting at home; running off and staying away. |
| 97 | **Maxwell** | A demon at the gate lets the quick through to the right and the slow through to the left. The key is on the hot side, whose floor burns whoever is slow on it. | Run in, take the key, run back, and be slow only as you cross: let go just before the gate and tap across, or brake in a low hop. | Running back through; walking slowly over the hot floor. |
| 98 | **Newcomb** | Coins lie on the way, and the Eye counts the ones you take. At a line it fills the closed box: the key, only if it saw you take nothing. Past the line an open box holds a coin, and the door needs a key and a coin. | Leave the coins until it has decided; then take both boxes. | Taking the coins on the way; taking only the closed box. |
| 99 | **Reflection** | The Eye watches you and shoots whoever it watches too long. A mirror stands between it and the door, with steps behind it and a ledge level with the Eye. Whatever the Eye looks at, it cannot look away from if it is itself, and while it stares, the gate is open. | Go behind the mirror and stand at the Eye's own height: its gaze comes back to it. Go while it stares. | Running to the door; waiting under the mirror; standing on the steps. |
| 100 | **Circle** | The level number reads 01. You are the door, and the one you were at the start comes after you. It stops and watches you, letting go so that you will come; then it gives up, turns its back, and goes home. | Keep away while it chases, don't come when it only pretends, and go to it once it has really let go. | Standing; running to the wall; going to it while it watches. |

## Testing

Every level ships only after five kinds of check pass.

1. **The plausible wrong moves fail.** These must all die or stall:
   - running right;
   - jumping at everything;
   - waiting where you stand;
   - mashing;
   - wandering with random pauses;
   - the previous level's lesson used as a habit.
2. **Half an idea fails.** The "I've figured it out" approach dies to the next layer.
3. **The intended route clears with human timing.** It still works with reaction delay, acting early or late, and uneven jump holds.
4. **Random play almost never clears it.** Mash, jump spam, hold-right and a wandering bot with pauses each clear it about 2% of the time or less.
5. **Every death teaches, and every trap is sprung.** Write down what an observant player knows after no deaths, one and two: each death must add something they can use, and the rule must be within reach after a few. Check that no route gets past a trap without meeting it, and that every object on screen matters.

A debug mode lets the tests snapshot, rewind and step the game frame by frame. A search-based solver confirms that every level can be solved.

## Technology

- **One file.** The game is a single HTML page: plain JavaScript on a canvas, with no build step and no dependencies. It runs at a fixed 60 steps per second on a 960 × 540 stage.
- **Composable levels.** Each level is a few hooks on top of shared pieces (shy door, sky, Eye, bridge, ghost, water, wind…), so the pieces combine freely.
- **Memory.** Everything is saved in the browser:
  - each level's memory of your earlier attempts;
  - your habits across levels;
  - your ✕ marks;
  - which levels you have cleared.

  Levels are saved by name, not position, so progress survives any reordering. Progress is never reset.
- **Any screen.** The page fits the window without scrolling. Phones get landscape full screen with touch strips beside the game, and zoom and text selection are disabled.
- **Hosting.** GitHub Pages, published on every push.

## Build order

The game was rebuilt chapter by chapter, and each finished chapter went straight into the published game. Each chapter was built, tested, pushed and sent for play-testing before the next one started, and then every level was revised against the bar. All ten chapters are done. The first version is kept in `legacy/` for reference.
