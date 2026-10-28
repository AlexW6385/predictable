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
- **Every death is explainable** from what was on screen. Every prediction is shown before it lands, with a shadow, the Eye's pupil, a twitching lid or cracks.
- **Every rule has a reason and a tell.** A rule follows from what the thing is (a gun leads its target; a sleeper wakes at noise), and it belongs to the chapter's theme. The screen shows the rule before it kills, so a careful, observant player can read the pattern with few deaths, or none. No hidden trap without a tell, and no trial and error for its own sake.
- **Standing still never clears a level**, except level 1, which teaches it.
- **The answer is never what you would do anyway.** Each level asks for a real insight, and in the later chapters a plan of more than one step. If the obvious move works, the level is not finished.
- **No two levels share an answer.** When a piece comes back, it asks something new. "Let go and it comes to you" is level 1's answer; later levels may build on it, but never end on it again unchanged.
- **A duel, not a puzzle box.** The best levels are a game against something that models you: it predicts you, and you predict its prediction. Prefer feints, baits, teaching it a habit and then breaking it, and using its aim as a tool, over hidden properties that only have to be noticed.
- **Make the tell plain and the reasoning hard.** A tell that is easy to miss turns the level into trial and error; a tell that gives the answer away ("that one is odd, don't touch it") makes it too simple. Show plainly what is happening; the puzzle is what to do about it.
- **A finale is a new idea, not a stack.** The last level of a chapter makes its pieces act on each other: the answer to one is what another punishes, or one piece's prediction is turned against another. Running the earlier answers in a row is not enough.
- **Pieces interact.** Most levels combine two or three pieces. Ideally, the habit one piece teaches is exactly what another piece punishes.

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
| **The door** | Runs from whoever chases it, comes to whoever lets go (1). | Bites whoever looks at it (5), brings things with it (8), sleeps (9), gets painted (27). Turns out to be alive (VI) and halved (X). The last level is the first one, answered. |
| **The sky** | Cones fall where you are going (2). | Break bricks (12), plant stakes (13), aim at your reflection (18). Fall on your old ✕ (69), plant seeds (57), and meet Laplace (99). |
| **The Eye** | Bites the door you look at (5). | Blinks (6), aims the sky (20), sweeps as a searchlight (73). Fills Newcomb's boxes (98). |
| **The ✕** | Your deaths stay where they happened. | Get forged (22), light the dark (41), become your bodies (61) and your coins (33), and draw the sky (69). |
| **The ghost** | Your last attempt walks again (15). | Holds a plate for you (62), chases you (64), carries a key further (77). Becomes the ship of Theseus (93). |
| **The entrance** | Every level starts in front of the open door you came in by. | Usually scenery. In 7 it is the way out, and in 100 it is the only one. |

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
| 3 | **The other side** | The screen wraps. The visible door comes when you wait, and is fake: the level number ticks up, then the same level again. The real door is behind a tall wall at the right edge. | Leave by the left edge. | You keep waiting for the fake one. |
| 4 | **Inside out** | Every jump swaps which blocks exist, over spikes. | Hop once in place first, then go block to block. | Jumping straight at the first block, which vanishes. |
| 5 | **Bashful** | Ice floor. The door bites whoever faces it (teeth show when you look). It can't walk on ice, so it won't come. | Slide toward it and turn round while sliding, so you arrive backwards. | Walking in face first; waiting (it never comes). |
| 6 | **Blink** | Two doors that bite while the Eye is open. Between them is a moving-only bridge with one stone tile. The Eye shuts only after you stand still far from both doors. | Find the one place you can stand still, wait for the lid, then run. | Waiting near a door keeps it open; stopping on the bridge drops you. |
| 7 | **The way you came** | Three biting doors ahead. The entrance behind you is the exit; it is shy and bashful, and you spawn facing it. | Turn your back on it and let go. | Any door ahead; waiting where you spawn (you're looking at it). |
| 8 | **What it brings** | The shy door pushes a spiked crate ahead of it as it comes. | Wait on the far side of a pit: the crate drops in and fills it, and the door walks over. | Waiting where you start (level 1's lesson). |
| 9 | **Asleep** | The door is asleep. Running and hard landings make noise, which wakes it, and an awake door runs from you. It doesn't come to you either. | Run until you are near, then creep the rest, a tap at a time. | Running up to it; jumping; waiting. |
| 10 | **The beginning** | The shy door. The Eye shoots whoever stands still in the open. Thorns grow where you stood too long. One roof. | Let go under the roof, the only safe place to be still; the door has to arrive before the thorns. | Waiting in the open; waiting too long anywhere. |

## II. Sky (11–20)

The sky drops cones where it thinks you will be, and its shadow always shows where. The chapter climbs the orders of prediction:

- where you are going;
- where you were;
- what you did last time.

It then turns the sky into a tool: a hammer, a builder, a decoy.

| # | Level | What is in it | The idea you need | Without it |
| --- | --- | --- | --- | --- |
| 11 | **Shelter** | Every so often a curtain of rain falls around where you will be; in the open there is nowhere to go. Roofs stop it, but a roof falls if you stay under it longer than you usually do. The last roof is painted on. | Roof to roof between curtains, short stays; go straight past the last one. | Running in the open; hiding long; trusting the painted roof. |
| 12 | **Hammer** | The door is down a well under a thick brick lid. A cone falls where you will be each time you run past a mark, and cones crack bricks. | Run at the lid and turn back before it, three times: each cone lands where you would have been. | Standing on the lid (you are the target); running across (it leads you exactly). |
| 13 | **One step behind** | Each cone falls where you stood when the last one landed. Landed cones stay as stakes for a while. The door is on a ledge too high to jump to. | Stand at the ledge's foot as one lands elsewhere, then step away. The next plants a stake there; climb it. | Jumping at the ledge; waiting at its foot (the next cone is yours). |
| 14 | **Do nothing** | A raft moves only while you touch nothing, and every press calls a cone. Spikes hang from the ceiling. At the far bank the shy door steps aboard. | Touch nothing at all, from start to finish. | Any press. |
| 15 | **Decoy** | Your last attempt walks ahead as a ghost and uses up the crumbling road. The sky aims at whoever is in front, and when that is you it does not miss. | Let the ghost lead; it takes the cone. | Overtaking it; going first on your first try. |
| 16 | **Heavy** | Three falling blocks: one falls where you will be, one only when you are exactly under it, one if you would arrive at full speed. | Stop for the first, dash under the second, creep under the third. | One speed for all three. |
| 17 | **Ice** | On ice, the shadow keeps re-aiming at where your speed takes you until a moment before it lands. | Keep steady until the shadow stops, then change. | Changing early (it follows); not changing. |
| 18 | **Reflection** | Stand still and a cone falls on your mirror image across the middle of the screen, and stays as a stake. The door is on a ledge on the other half. | Stand still at the mirror point of the ledge's foot, then cross and climb. Near the middle, your mirror is you. | Standing where you want the stake; waiting near the middle. |
| 19 | **Landing** | Pits, and every jump calls a cone to where your speed will take you when you come down. | Change course in the air: let go of the direction, or tap back. | Ordinary jumps. |
| 20 | **The Eye and the sky** | The Eye aims the sky and blinks; nothing falls while it is shut. Roofs, one painted. At the end, the shy door that bites whoever faces it. | Cross while it blinks. Under the last real roof, turn your back and let go; the door arrives before the roof gives. | Any one of the chapter's habits on its own. |

## III. Seeming (21–30)

What is drawn and what is there come apart. Each level teaches a different way of reading the screen: the dotted line, the mirror, the mime, the shadow on the wall. The chapter ends in Plato's cave.

| # | Level | What is in it | The idea you need | Without it |
| --- | --- | --- | --- | --- |
| 21 | **Offset** | The drawn ground and door are a little to the side of the real ones; faint dotted lines show what is. | Follow the dotted lines. The "always two tiles off" rule fails at the last gap. | Trusting the drawing; trusting a fixed offset. |
| 22 | **Forged** | Some ✕ marks are painted on, to make you jump early onto hidden spikes. The true marks sit on the spikes. | Tell the forged marks from real deaths, and land where neither is. | Avoiding every ✕ as if it were yours. |
| 23 | **Fourth wall** | A death screen appears while you are still alive, then a title screen, both in low spiked tunnels. Then a victory flag with eyes plays the chapter-clear celebration and drops the floor. | The screens are part of the world: don't press jump to retry or start; wait them out, and don't touch the flag. | Pressing jump, as you always do on those screens; walking up to the flag. |
| 24 | **Mirror** | A mirror strip on the ceiling shows the floor as it really is: hidden spikes and false tiles. One stretch of it shows things as they were a moment ago (your reflection lags there too), and an invisible spike rises and falls in that stretch. | Read the mirror, not the floor; where it lags, go when it shows the spike up. | Trusting the floor; trusting the mirror blindly where it lags. |
| 25 | **Imitators** | One creature copies your jumps late and low. One mirrors your every step, backwards. | Use the copying: walk away so the mirror one walks off its ledge; jump early so the late one misses. | Treating them as ordinary enemies. |
| 26 | **Opposites** | Past a line, the ground kills, spikes hold you up, the door bites, and the hole is the way out. | Walk on the spikes and drop into the hole. | Treating that side like this one. |
| 27 | **Gallery** | A gallery wall seals off the door. The painted door gives a fake clear, and the painted spikes are only paint. The framed pictures are windows: stand in front of one and jump on the spot, and you are where it shows (one shows a spike pit). | Pick the picture that shows the door. | Entering the painted door; jumping at pictures on the run; the first picture. |
| 28 | **Double** | Behind a glass line, your double does what you do the other way round, on its own floor. The door is on its side, past a pit. If it falls, so do you. | Watch it, not yourself: jump when it reaches its pit (your own wall holds you still meanwhile). | Walking it to its door. |
| 29 | **Mime** | A mime walks ahead of you and acts out an invisible step, wall, bridge and low spiked ceiling. Then it mimes a door that isn't there, and steps through it. | Follow its hands, not its door. | Walking or jumping where nothing is drawn without watching it. |
| 30 | **Cave** | Facing the door, you see only shadows on the wall, cast by a fire behind you and stretched by it. Turn around and you see the real things. | Look back to learn the real layout, then walk forward through the shadows. | Jumping by the shadows. |

## IV. Weight (31–40)

Numbers start to matter. Keys and coins weigh something, a seesaw throws whatever is lighter, a fall hits back as hard as it fell, and up is a direction you can choose. Two-piece levels become the norm: one piece sets a limit, and the other pushes you toward it.

| # | Level | What is in it | The idea you need | Without it |
| --- | --- | --- | --- | --- |
| 31 | **Enough** | Four keys hang at rising heights, and each key you hold lowers your jump. The door takes exactly three, and bites if you bring more. | Take the highest one you can reach first, work down, and leave the lowest. | Taking them in the order you meet them; taking all four. |
| 32 | **Seesaw** | A seesaw under a high ledge. The heavy block from 16 falls where you will be when it lands. | Run at it to call the block, then turn back to the near end: it lands on the far end and throws you up. | Jumping at the ledge; running on (it lands on you). |
| 33 | **Price** | The door asks one more coin than the Eye has seen you hold. Coins appear only where you died. Behind a pillar the Eye is blind. | Die in its blind spot, take that coin there, and come home over the roof, out of its sight. | Collecting in view; walking home past it. |
| 34 | **Measure of a leap** | Each gap is as wide as your last leap, plus a little. | Make small leaps, so the gaps stay small. | Big jumps "to be safe". |
| 35 | **Up is a choice** | Every jump flips gravity. Falling off the bottom brings you in at the top, onto the roof where the door is; most of that roof is spikes. | Flip to cross, flip back before the hanging spikes, and fall through the second hole. | Fighting the flip; the first hole. |
| 36 | **Portal** | What falls in comes out going up, as fast as it went in. One portal is red and eats you. | Fall from higher to fly higher; avoid the red one. | Stepping in from the floor. |
| 37 | **Hard landing** | Falls from too high kill. The middle step crumbles under you. | Step down in stages and don't linger on the crumbling one. | Dropping straight down; waiting on the middle step. |
| 38 | **Wheel** | A wheel of platforms over spikes speeds away from whoever jumps at it. | Let its platform come to you; step on, don't leap. | Leaping at it. |
| 39 | **Shy raft** | A raft over spikes that runs from wherever you face. On the far bank, the door from 1 and 5: it comes to whoever lets go and bites whoever faces it. | Face back the way you came and stand still. Keep your back to the door when you arrive. | Walking toward the far side; turning to the door. |
| 40 | **Balance** | A seesaw holding a heavy gold box, a tunnel too low for the box, and a red wall in front of the door. Gold cancels red. The block from 32 hangs over the other end, and each key makes you heavier. | Take the high key first, then the low one. Then stand on the block's side, short of it: you and the block together outweigh the box, and it flies over into the wall. | Too few keys (the plank only levels out); running into the block; any single trick on its own. |

## V. Elements (41–50)

Light, water, fire and air each have a rule, and most levels pair two that pull against each other. Water saves you from fire but drowns you. Sound lights the dark but calls the bat. Your deaths become the lamps of the dark levels.

| # | Level | What is in it | The idea you need | Without it |
| --- | --- | --- | --- | --- |
| 41 | **Dark** | Only you and your ✕ marks are lit. Every jump and landing sends out a ring of light, and a bat dives at the sound. Under the low roof the bat can't reach you, but the roof's underside is spiked. | Let your deaths map the dark. Jump only to cross, keep moving after you land, and under the roof hop small. | Jumping to look around; stopping where you landed; full jumps under the roof. |
| 42 | **Sun** | A sun crosses the sky and burns you in its light; the shade under each block moves with it. On the boards, your own shadow is a hole. | Move with the shade, and cross the boards only inside it. | Running now; waiting in shade that is leaving; stepping onto lit boards. |
| 43 | **Water** | Fire on the bank, then a pool under a roof. Getting wet lets you walk through fire for a while. Breath runs out underwater, and using the first air gap closes the second. | Wet yourself at the puddle behind you. In the pool, breathe at the gap and then at the bubbles. | Walking into the fire dry; counting on the second gap. |
| 44 | **Fire** | A torch, grass that carries fire, and a thorn bush in the way. Past it, a bomb whose fuse burns only while you are near, and a brick wall. | Knock the torch over and wait out the fire on the stone. Then kick the bomb to the wall and wait near it, but not too near. | Running back from the fire; following the bomb; walking away from it. |
| 45 | **Spark** | Live wires hurt only if you are standing on something. | Cross them in the air. | Walking over them. |
| 46 | **Wind** | The wind always blows against the way you are pushing. | Want nothing (let go) to drift, or push the other way. | Pushing harder. |
| 47 | **Geyser** | Water bursts up where you will be, then stands as a column that lifts whatever is on it. The door is on a ledge too high to jump to. | Wait just beside the ledge, step aside from the burst, then ride the column up. | Running past; waiting where it bursts; luring it under the ledge. |
| 48 | **Bubble** | Inside the bubble you weigh almost nothing, under a spiked ceiling. | A measured press: not a tap, not a full jump. | A full jump. |
| 49 | **Light and dark** | Light tiles and dark tiles, and the room's light moves. In the light you may stand only on light tiles; in the dark, only on dark ones. | Time each step to the light, and stand where the next change won't drop you. | Ignoring the colours. |
| 50 | **Storm** | Night: lightning shows the whole level for a moment. Over the gaps, gusts blow against whatever you push, and the rain brings the sky down where you are going. Two roofs. | Learn the level in the flashes. Let go over the gaps. Go roof to roof, leaving each one just after a cone hits it. | Pushing across the gaps; running without shelter. |

## VI. Living (51–60)

The world is alive. It grows where you stand, sleeps until you make a sound, and follows you. From here, levels ask for an order: first make the thing grow, then climb it; first wake the right creature, then hide from it.

| # | Level | What is in it | The idea you need | Without it |
| --- | --- | --- | --- | --- |
| 51 | **Garden** | Grass grows thorns where you have walked; soil grows a vine under you if you stand still on it. The key is at the far end, and the door is back at the start. | Walk out low, grow a vine to come back high, and never stand long on grass. | Going back the way you came. |
| 52 | **Hunger** | Coins run from you, and spiked balls drift toward you. The door is hungry for three coins. | Corner each coin against a wall by walking (running makes it hop over you), and keep the balls behind you. | Running at coins; standing still. |
| 53 | **Gaze** | Two ghosts: one moves only while you look away, the other only while you look at it. A gate opens now and then. At the end, the shy door comes only while you look away from it. | Look back while you wait at the gate, jump the dark one, then turn your back on the door and let it come. | Facing one way; walking at the door. |
| 54 | **Sleepers** | Guards sleep until you make a sound (running, landing off the rugs). A sleeping bull lies before a brick wall; awake, it charges at where you will be and breaks bricks you can't. | Creep past the guards and land on the rugs. Jump the bull, land loudly by the wall, and dodge its charge into the wall. | Running; leaving the bull asleep. |
| 55 | **Dream** | Stand still long enough and you fall asleep. Asleep, you walk on the clouds you dream; a jump wakes you, and the clouds go. | Sleep to cross; never jump while dreaming. | Jumping the gap; waking over the drop. |
| 56 | **Snake** | A snake follows your exact path a little behind you, and catches you if you stop. The key is behind you. | Come back by a different height so your path never crosses itself, and keep moving. | Turning back on the same floor; stopping. |
| 57 | **Seed** | Crossing the line calls a cone where you will be, and a cone plants a seed where it lands. Stand still on a seed and a vine grows under you. The door is on a high ledge. | Run across the line so it aims at the ledge's foot, turn back, then stand on the seed. | Running on (it lands on you); jumping at the ledge. |
| 58 | **Flock** | Birds perched in a row over a pit are the bridge. Running near them, or landing hard on them, scares them off. | Walk softly, a tap at a time, across their backs. | Running across; jumping onto them. |
| 59 | **Mimic** | Boxes you must climb; the nearest one breathes, and bites when you stand on it. Of two doors, the first breathes too. | Watch for the breathing; climb the other boxes and take the still door. | Climbing the nearest box; the first door. |
| 60 | **Life** | A sleeper with a rug, a flock over a pit, a line that calls the sky, and a ledge you can only reach on a vine. | Quiet past the sleeper, soft over the flock, then run the line, turn back, and stand on the seed. | Any one habit everywhere. |

## VII. Self (61–70)

Your own past becomes the material. That past includes:

- your bodies;
- your last attempt;
- your rhythm;
- the routes you chose before;
- the places you died.

Several levels need more than one life on purpose: you spend a life to set up the next.

| # | Level | What is in it | The idea you need | Without it |
| --- | --- | --- | --- | --- |
| 61 | **Bodies** | Where you die on the spikes, your body stays as a block. Every jump flips the world, and a body belongs to the side it died on. | Die forward to build steps, on the side you will need. | Trying not to die; dying anywhere. |
| 62 | **Last time** | A plate opens the gate only while it is held, and your last attempt replays as a ghost. | Spend one life standing on the plate; next life, walk through while your ghost holds it. | Running from the plate to the gate. |
| 63 | **Habit** | Jump three times at one rhythm and your body starts jumping on its own at that rhythm. The fourth lands on spikes. | Break your rhythm before the fourth. | Steady, careful jumping. |
| 64 | **Habit and shadow** | A long run. The habit takes over, and after you take the gem your own trail chases you. | Break the rhythm, and come back by a path your trail can't follow. | Either trick alone. |
| 65 | **Changed mind** | Two routes, high and low. It puts the spike on the route it bets you will switch to. | Take the same route as last time. | Switching after a death. |
| 66 | **Late** | The blades you see are where they were a moment ago, and your body goes where you meant to a moment later. | Act on the shadows on the floor (the present), and send your intentions early. | Reacting to what you see. |
| 67 | **Wanting** | No jump button: you charge a jump instead. The slab above moves to where your charged jump will peak. | Charge past the height you want, and release on the way back down, after the slab has committed. | Releasing at the height you want. |
| 68 | **Regret** | Dying rewinds two seconds instead of restarting. Past each spike the ground gives way where you first land; after a rewind, it waits wherever you land instead. | Land exactly where you died. | Landing somewhere new after the rewind. |
| 69 | **Remembered** | The door is under a lid of thorny bricks. The sky falls on your old ✕ marks, and a falling cone cracks a brick. | Die once on the lid; next life, wait for the sky to open it for you. | Avoiding death on the lid. |
| 70 | **Self** | The chapter together: a pit too wide to jump, a gate opened by a plate that kills whoever stands on it too long, three gaps at one rhythm with spikes over the fourth jump, and the door under a thorny lid. | Spend your lives in order: a body in the pit, a ghost on the plate, a death on the lid. Then use them all, and break the rhythm on the way. | Treating each life as a fresh start. |

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
| 83 | **Dancer** | Across the stage a dancer steps on pads in an order, and you must repeat it. A wrong step opens a pit. | While it faces you it is a mirror: its left is your right. When it turns its back, copy it as it is. | Copying it as you see it; mirroring every time. |
| 84 | **Curtain** | The set changes behind the curtain every few seconds, and the curtain shows the next set in gold. Two platforms never change. | Go while the set is up, and wait out each change on a platform that stays. | Running and jumping; waiting on the set as the curtain falls. |
| 85 | **Keystone** | A veil kills whoever enters it, and the dead rise beyond it. Past it, an arch over a pit; the door is below. Step on the keystone and the arch falls from the middle outward. | Die in the veil to cross it; then stand on the keystone and ride it down. | Keeping away from the veil; running across the arch; stepping off when it shakes. |
| 86 | **Leap** | The bridge is there only for whoever stops at the edge first, then walks off and keeps walking. A jump gets nothing, and stopping on it, it's gone. A feather rests on it now and then. | Stand at the edge a moment, then walk off and keep walking. | Jumping the gap; running off blind; stopping to look. |
| 87 | **Spirit** | Stand still and you leave your body: for a few seconds you pass through walls and spikes, then your body comes back wherever you are. | Leave it twice: once between the walls, once past the thick one, and come back where there is room. | Running; one long trip; coming back inside a wall. |
| 88 | **Needle** | Coins drift toward you and stick, and each one makes you wider. The gate fits only someone holding nothing. A beggar takes a coin at a time from whoever stands by him. | Stand by the beggar until he has taken it all. | Walking to the gate with what came to you. |
| 89 | **Sea** | The sea parts ahead of whoever keeps going, and closes at once on whoever stops. Once you are in, a chariot comes after you. A rock stands above the water. | Run in, and stop only on the rock: the sea closes on the chariot. Then run on. | Running straight across (the chariot catches you); stopping in the sea. |
| 90 | **Joke** | The Eye laughs at a pratfall (a peel, a rake, a falling pot), and while it laughs nothing falls: you walk on air until it opens its eye and sees you. It laughs at each kind of joke once. Three pits: a peel and a rake at the first, a rake and a pot at the second, only a peel at the last. | Work back from the end: keep the peel for the last pit, so take the rake at the first and the pot at the second. | Slipping on the first peel; taking the rake twice; avoiding every joke. |

## X. Reason (91–100)

The classic paradoxes and thought experiments, each made into a level that can actually be solved. These are the deepest puzzles: most need a plan of several steps, or a rule from an earlier chapter applied in a new place. The last level is the first one again, answered.

| # | Level | What is in it | The idea you need | Without it |
| --- | --- | --- | --- | --- |
| 91 | **Achilles** | Your top speed shrinks as you near the door, so walking never arrives; in the air you keep the speed you left with. A tortoise carrying the key always stays a little ahead whenever you move, and the world wraps. | Go round the other way to meet the tortoise head-on; leap from far and high so you land at the door. | Chasing; walking up to the door. |
| 92 | **River** | Logs drift by, and a log sinks if you land on it a second time. A bird dives at where you will be. | Never land on the same log twice; jump after the bird has committed. | Hopping back and forth; jumping as it dives. |
| 93 | **Ship** | Your raft moves by taking its last plank to the front. The new planks sink and the old ones float, and come together again as the real ship. | Stand on the original planks, not on the ship you see. | Staying on the moving raft. |
| 94 | **Copernicus** | Stand still and the room turns a quarter around you. The door only opens when the room is upright. | Turn the room until the door is below you, then turn it back upright. | Running and jumping in one orientation. |
| 95 | **Buridan** | Two identical doors, equally far. The Eye bites the door you are heading for, and standing still between them starves you. | Arrive at one while heading for the other: the world wraps. | Walking straight to either; waiting. |
| 96 | **Time** | Time passes only while you move, and faster when you run. Arrows freeze when you stop. The door opens only in one part of the clock's turn. | Stop to let nothing happen, walk to pass the arrows, run when you need the clock to hurry. | One speed everywhere. |
| 97 | **Maxwell** | A small demon keeps a wall full of bouncing heat: quick things pass one way, slow things the other. | Come up to the line slowly, wait a moment, and the demon lets you through below. | Running at the gate. |
| 98 | **Newcomb** | Two boxes were filled before you arrived, by the Eye that watched you all level. The open box holds a coin. The closed box holds the key only if the Eye saw you leave the bait coins along the way. | Be someone who leaves the coin, all level long, then take only the closed box. | Taking every coin; taking both boxes. |
| 99 | **Laplace** | At each pit, a spike grows where you took off last time. Then a last climb on platforms made of all your ✕ marks from the whole game, in order. | Take off somewhere new, and climb your own history. | Jumping where you always jump. |
| 100 | **Circle** | An endless corridor of biting doors to the right. The level number reads 01, and the door from level 1 waits where you began. | Stop going forward; let go, and the first door comes back to you. | Going on forever. |

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
5. **A careful first-timer can read it.** From what the screen shows, write down what an observant player would conclude after no deaths, one and two. The rule must be within reach by then, and every trap must have shown itself before it springs.

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

The game is rebuilt chapter by chapter, and each finished chapter goes straight into the published game. Each chapter is built, tested, pushed and sent for play-testing before the next one starts. Until all ten are done, the game ends after the last finished chapter. The first version is kept in `legacy/` for reference.
