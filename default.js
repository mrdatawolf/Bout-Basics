const PLAYS = [
  {id:"lead-jammer",title:"Lead Jammer",cat:"Jamming",catColor:"var(--cat-scoring)",
   teaser:"First jammer through the pack earns lead status — and control of the clock",
   steps:["Both jammers line up behind the pack. The first to legally break through earns lead.",
          "Teal jammer finds a gap and passes all blockers on the initial trip — ref signals lead!",
          "A jammer loses lead eligibility if they take a penalty or exit the zone without earning it.",
          "As lead jammer, teal taps her hips to call off the jam before red can score."],
   durations:[3000,3000,2800,2800],
   why:"Lead jammer controls the clock — they can end the jam at any moment, locking in their score.",
   anim:"lead",refSignal:"lead",focus:"both",
   bA:[[38,20],[47,18],[56,18],[65,21]],bB:[[24,71],[19,64],[16,56],[16,47]],jA:[74,27],jB:[81,36]},

  {id:"scoring-trip",title:"Scoring a Point",cat:"Jamming",catColor:"var(--cat-scoring)",
   teaser:"A jammer earns one point for each red blocker circle they legally pass",
   steps:["The teal jammer re-enters the pack from the rear — a new scoring trip begins.",
          "First red blocker passed! One point earned.",
          "Second red blocker cleared — two points and still going.",
          "Third red blocker behind her — three points this trip.",
          "The fourth red blocker steps in and stops the jammer. That point is denied.",
          "Three points scored this trip. The jammer's ref signals the count."],
   durations:[2600,2400,2400,2400,2800,3000],
   why:"Points aren't scored all at once — every red blocker circle is a separate obstacle. Even one block prevents that point.",
   anim:"lap",refSignal:"scoring",focus:"b",
   jamSteps:[[82,38],[62,22],[52,19],[44,19],[40,21],[40,21]],
   bA:[[38,20],[47,18],[56,18],[65,21]],bB:[[24,71],[19,64],[16,56],[16,47]],jA:[76,29],jB:[18,61]},

  {id:"call-off",title:"Calling Off the Jam",cat:"Jamming",catColor:"var(--cat-scoring)",
   teaser:"Lead jammer ends the jam early by tapping both hands to their hips",
   steps:["Teal jammer has lead status and has just completed a scoring pass.",
          "Red jammer is catching up and about to score — teal needs to act fast.",
          "Teal jammer repeatedly taps both hands to their hips — the ref whistles the jam dead.",
          "Teal's points are locked in. Red never gets their scoring trip."],
   durations:[2800,2800,2800,2600],
   why:"Timing the call-off is a core skill — too early leaves points on the table, too late lets the opponent score.",
   anim:"lap",refSignal:"calloff",focus:"both",
   bA:[[38,20],[47,18],[56,18],[65,21]],bB:[[24,71],[19,64],[16,56],[16,47]],jA:[76,29],jB:[50,18]},

  {id:"star-pass",title:"Star Pass",cat:"Jamming",catColor:"var(--cat-scoring)",
   teaser:"The jammer can hand the star to the pivot, transferring the jammer role",
   steps:["Teal jammer is stuck and decides to pass the role to the pivot.",
          "The jammer hands the star to their pivot — both must be upright, in bounds, and in play.",
          "The pivot puts on the star and is now the jammer, inheriting all points scored so far.",
          "The original jammer becomes a blocker. The fresh jammer has a new angle of attack."],
   durations:[2800,3200,2800,2800],
   why:"A star pass is a surprise tactical reset — it can catch the opposing team completely off guard.",
   anim:"wall",refSignal:null,focus:"b",
   bA:[[38,20],[47,18],[56,18],[65,21]],bB:[[24,71],[19,64],[16,56],[16,47]],jA:[76,29],jB:[18,61]},

  {id:"scoring-avoidance",title:"Scoring Avoidance",cat:"Jamming",catColor:"var(--cat-scoring)",
   teaser:"Blockers can skate out of bounds to deny the jammer a point",
   steps:["Teal jammer approaches red blocker, about to pass and earn a point.",
          "Red blocker steps out of bounds — no point is earned on an out-of-bounds skater.",
          "Jammer passes the out-of-bounds blocker, but no point is awarded.",
          "The blocker returns in bounds — but must re-enter behind the jammer.",
          "The blocker is now at the back of the pack. They denied one point but lost their blocking position for the next pass."],
   durations:[2800,3000,2800,2800,3500],
   why:"Stepping out denies one point but puts the blocker out of position — a skilled jammer can bait blockers into doing this repeatedly to clear their own path.",
   anim:"lap",refSignal:"oob",focus:"b",
   stepPositions:{
     1: [["a",0,[38,4]]],
     2: [["a",0,[38,4]]],
     3: [["a",0,[38,20]]],
   },
   bA:[[38,20],[47,18],[56,18],[65,21]],bB:[[24,71],[19,64],[16,56],[16,47]],jA:[76,29],jB:[18,61]},

  {id:"apex-jump",title:"Apex Jump",cat:"Jamming",catColor:"var(--cat-scoring)",
   teaser:"A jammer leaps over the inner track boundary at a curve to shortcut past the entire pack",
   steps:["Teal jammer approaches the curve at speed, hugging the inner boundary.",
          "The jammer launches — leaping over the inner boundary and into the air.",
          "Airborne over the inner oval, passing all blockers mid-air.",
          "First skate lands back in bounds — all passed blockers count. Points scored!"],
   durations:[2800,3000,3000,2800],
   why:"A successful apex jump can pass the entire pack in one move. If the landing is out of bounds, no penalty — they just re-enter behind the pack and try again.",
   anim:"apex",refSignal:"scoring",focus:"b",
   // jammer B step positions: on approach, at peak (inner boundary), over oval, landed
   jamSteps:[[18,61],[26,32],[43,22],[65,21]],
   bA:[[37,20],[45,18],[54,18],[62,20]],bB:[[24,71],[19,64],[16,56],[16,47]],jA:[76,29],jB:[18,61]},

  {id:"the-wall",title:"The Wall",cat:"Blocking",catColor:"var(--cat-blocking)",
   teaser:"Blockers form a shoulder-to-shoulder line to seal the entire track",
   steps:["Three red blockers form a wall spanning the full width of the track.",
          "Teal jammer approaches at speed — there's no obvious gap to exploit.",
          "Jammer tries the inside line; the wall steps together and closes it.",
          "Jammer is forced to slow and wait — the wall is controlling the pack speed."],
   durations:[2800,3000,2800,2600],
   why:"A solid wall can hold a jammer for the entire jam, completely shutting down scoring.",
   anim:"wall",refSignal:null,focus:"b",
   bA:[[38,20],[47,18],[56,18],[65,21]],bB:[[24,71],[19,64],[16,56],[16,47]],jA:[76,29],jB:[18,61]},

  {id:"recycling",title:"Recycling",cat:"Blocking",catColor:"var(--cat-blocking)",
   teaser:"Blockers slow down to rejoin the pack and block again after being passed",
   steps:["Teal jammer has passed red blocker — that blocker is now behind the jammer.",
          "The passed red blocker slows and drops back into the rear of the pack.",
          "Now back in position, the blocker rejoins the wall for another run at the jammer.",
          "Constant recycling keeps the defense dense — the jammer can never get a clean run."],
   durations:[2800,2800,2800,2600],
   why:"Being passed doesn't end your job. Recycling back is what makes derby defense continuous.",
   anim:"lap",refSignal:null,focus:"b",
   bA:[[38,20],[47,18],[56,18],[65,21]],bB:[[24,71],[19,64],[16,56],[16,47]],jA:[76,29],jB:[18,61]},

  {id:"jammer-assist",title:"Jammer Assist",cat:"Blocking",catColor:"var(--cat-blocking)",
   teaser:"Your own blocker can push or whip the jammer through the pack",
   steps:["Teal blocker positions alongside their own jammer at the back of the pack.",
          "The blocker grabs the jammer's hand or pushes from behind — a legal assist.",
          "The jammer uses the extra momentum to shoot through a gap in the red wall.",
          "Assisting your jammer is just as important as blocking theirs."],
   durations:[2800,3000,2800,2800],
   why:"Derby is a two-way game. A well-timed assist can send your jammer through the pack instantly.",
   anim:"lead",refSignal:null,focus:"b",
   bA:[[38,20],[47,18],[56,18],[65,21]],bB:[[24,71],[19,64],[16,56],[16,47]],jA:[76,29],jB:[18,61]},

  {id:"positional-block",title:"Positional Blocking",cat:"Blocking",catColor:"var(--cat-blocking)",
   teaser:"A blocker can impede the jammer just by being in the way — no contact needed",
   steps:["Red blocker skates in front of the teal jammer, matching speed exactly.",
          "No hit is thrown — the blocker simply occupies the space the jammer wants.",
          "Jammer tries to go around but the blocker mirrors every move.",
          "Positional blocking is perfectly legal and carries no penalty risk."],
   durations:[2800,2800,2800,2600],
   why:"You don't have to hit to block. Controlling space is often smarter.",
   anim:"wall",refSignal:null,focus:"b",
   bA:[[38,20],[47,18],[56,18],[65,21]],bB:[[24,71],[19,64],[16,56],[16,47]],jA:[76,29],jB:[18,61]},

  {id:"tripod",title:"The Tripod",cat:"Blocking",catColor:"var(--cat-blocking)",
   teaser:"Three blockers form a triangle — two corners hold the line while a brace skates backward to direct them",
   steps:["Two red 'corner' blockers take the inside and outside track lines, closing both edges.",
          "A third blocker — the 'brace' — skates backward in front of them, facing the jammer.",
          "The brace reads the jammer's angle and calls out which corner to shift, keeping the wall sealed.",
          "The fourth blocker is freed for offense — chasing or hitting the teal jammer if they escape."],
   durations:[2800,3000,3000,2800],
   why:"The tripod is the most common three-person defense. It's flexible enough to cover any lane while keeping one blocker available for offense.",
   anim:"tripod",refSignal:null,focus:"b",
   bA:[[38,20],[47,18],[56,18],[65,21]],bB:[[24,71],[19,64],[16,56],[16,47]],jA:[76,29],jB:[18,61]},

  {id:"back-block",title:"Back Block",cat:"Penalties",catColor:"var(--cat-penalty)",
   teaser:"Hitting an opponent in the back is always a penalty",
   steps:["Red blocker moves to hit teal but the target turns — contact lands on teal's back.",
          "The back is an illegal target zone. Forceful contact to the back is always penalized.",
          "Ref signals back block. Red must immediately skate to the penalty box.",
          "Red team skates shorthanded for 30 seconds — a real defensive disadvantage."],
   durations:[2800,2800,2800,2600],
   why:"The back is protected for safety. Even if the target turns into the hit, the initiator is responsible.",
   anim:"penalty",refSignal:"penalty",focus:"b",
   bA:[[41,19],[50,18],[59,19],[67,22]],bB:[[24,71],[19,64],[16,56],[16,47]],jA:[76,29],jB:[18,61]},

  {id:"forearm-elbow",title:"Forearm / Elbow",cat:"Penalties",catColor:"var(--cat-penalty)",
   teaser:"Extending your forearm or leading with your elbow is an illegal blocking zone",
   steps:["Red blocker throws a hit but extends their arm outward — forearm makes contact.",
          "From elbow to fingertips is an illegal blocking zone when the arm is extended.",
          "Forceful contact with an extended forearm or elbow warrants a penalty.",
          "Legal blocks use the torso, shoulder, and upper arm only."],
   durations:[2800,3000,2800,2600],
   why:"Extended arms add dangerous force. Keeping arms tucked is both a rules requirement and a balance technique.",
   anim:"penalty",refSignal:"penalty",focus:"b",
   bA:[[41,19],[50,18],[59,19],[67,22]],bB:[[24,71],[19,64],[16,56],[16,47]],jA:[76,29],jB:[18,61]},

  {id:"cutting",title:"Cutting the Track",cat:"Penalties",catColor:"var(--cat-penalty)",
   teaser:"Returning from out of bounds in front of skaters you were behind is illegal",
   steps:["Teal jammer is knocked out of bounds while trying to pass red blockers.",
          "The jammer must re-enter behind any upright in-bounds skater they were behind when they left.",
          "Teal jammer re-enters in front of two red blockers — that's cutting the track.",
          "Ref signals cut. Gaining position by using the out-of-bounds area is always penalized."],
   durations:[2800,3000,2800,2600],
   why:"You can't use the out-of-bounds area as a shortcut. Re-enter behind the skaters you left behind.",
   anim:"penalty",refSignal:"penalty",focus:"b",
   bA:[[41,19],[50,18],[59,19],[67,22]],bB:[[24,71],[19,64],[16,56],[16,47]],jA:[76,29],jB:[18,61]},

  {id:"oob-block",title:"Blocking Out of Bounds",cat:"Penalties",catColor:"var(--cat-penalty)",
   teaser:"You cannot initiate a block while fully out of bounds",
   steps:["Red blocker is pushed to the edge and steps briefly out of bounds.",
          "While out of bounds, the red blocker shoves a teal skater — illegal initiation.",
          "Skaters who are fully out of bounds may not initiate blocks, only absorb them.",
          "Ref calls the penalty. The blocker must skate to the box immediately."],
   durations:[2800,2800,2800,2600],
   why:"Out-of-bounds skaters are off the field. They can't use that position to interfere with in-bounds play.",
   anim:"penalty",refSignal:"oob",focus:"b",
   bA:[[41,19],[50,18],[59,19],[67,22]],bB:[[24,71],[19,64],[16,56],[16,47]],jA:[76,29],jB:[18,61]},

  {id:"multi-block",title:"Multi-Player Block",cat:"Penalties",catColor:"var(--cat-penalty)",
   teaser:"Linking arms or forming an impenetrable chain with a teammate is illegal",
   steps:["Two red blockers lock arms to form a solid connected barrier across the track.",
          "Teal jammer attempts to push through between them — the link holds completely.",
          "Skaters may not form an impenetrable connection by grasping or linking with a teammate.",
          "The penalty is called when the opponent attempts to get through and cannot."],
   durations:[2800,3000,2800,2800],
   why:"Walls are legal — but linked, grasping connections are not.",
   anim:"wall",refSignal:"penalty",focus:"b",
   bA:[[38,20],[47,18],[56,18],[65,21]],bB:[[24,71],[19,64],[16,56],[16,47]],jA:[76,29],jB:[18,61]},

  {id:"foul-out",title:"Fouling Out",cat:"Penalties",catColor:"var(--cat-penalty)",
   teaser:"Seven penalties in one game and you're expelled for the rest of the bout",
   steps:["Each penalty sends a skater to the box for 30 seconds. Penalties accumulate all game.",
          "At six penalties, the skater is on the edge — one more and they're out.",
          "A seventh penalty means the skater has fouled out and must leave entirely.",
          "The team continues without that skater for the rest of the game."],
   durations:[2800,2800,2800,2800],
   why:"Penalty management is a major strategic factor. Coaches track every skater's count throughout the bout.",
   anim:"penalty",refSignal:"penalty",focus:"b",
   bA:[[41,19],[50,18],[59,19],[67,22]],bB:[[24,71],[19,64],[16,56],[16,47]],jA:[76,29],jB:[18,61]},

  {id:"power-jam",title:"Power Jam",cat:"Power Jams",catColor:"var(--cat-power)",
   teaser:"One jammer sits in the penalty box — the other scores freely",
   steps:["Red jammer commits a penalty and heads to the box. Teal is the only jammer on track.",
          "Teal jammer enters the pack with zero jammer opposition.",
          "Teal laps the entire red team repeatedly, scoring four or more points per pass.",
          "Red jammer exits the box after 30 seconds. The power jam is over."],
   durations:[2800,3000,3000,2600],
   why:"A power jam can swing 20+ unanswered points in 30 seconds — the biggest momentum shift in derby.",
   anim:"power",refSignal:"penalty",focus:"b",
   bA:[[41,19],[50,18],[59,19],[67,22]],bB:[[24,71],[19,64],[16,56],[16,47]],jA:[4,10],jB:[18,61]},

  {id:"double-power-jam",title:"Double Power Jam",cat:"Power Jams",catColor:"var(--cat-power)",
   teaser:"Both jammers in the box at once — neither team can score",
   steps:["Red jammer commits a penalty and goes to the box.",
          "Moments later, teal jammer also commits a penalty — both are in the box simultaneously.",
          "With no jammers on track, neither team can score. Blockers just skate.",
          "The first jammer released from the box immediately triggers a power jam for their team."],
   durations:[2800,2800,2800,2800],
   why:"A double power jam neutralizes the advantage — but the first jammer out triggers a power jam.",
   anim:"pack",refSignal:"penalty",focus:"both",
   bA:[[35,21],[46,18],[57,19],[67,22]],bB:[[26,73],[19,65],[16,55],[16,45]],jA:[4,10],jB:[4,90]},

  {id:"blocker-box",title:"Blocker in the Box",cat:"Power Jams",catColor:"var(--cat-power)",
   teaser:"When a blocker is penalized, the opposing jammer has a numbers advantage",
   steps:["Red blocker takes a penalty and goes to the box — red is down to three blockers.",
          "Teal jammer now faces a thinner pack with fewer bodies to pass.",
          "The gap created by the missing blocker makes the jammer's path much easier.",
          "Blocker penalties don't trigger a power jam, but they shift scoring odds significantly."],
   durations:[2800,2800,2800,2800],
   why:"Every body on the track matters. Blocker penalties shift scoring potential significantly.",
   anim:"penalty",refSignal:"penalty",focus:"b",
   bA:[[41,19],[50,18],[59,19],[67,22]],bB:[[24,71],[19,64],[16,56],[16,47]],jA:[76,29],jB:[18,61]},

  {id:"engagement-zone",title:"Engagement Zone",cat:"Pack Rules",catColor:"var(--cat-pack)",
   teaser:"Blocking is only legal within 20 feet of the pack in either direction",
   steps:["The pack is the largest group of in-bounds upright blockers containing members of both teams.",
          "The engagement zone extends 20 feet ahead of the foremost pack skater and 20 feet behind the rearmost.",
          "A jammer or blocker outside this zone is out of play and cannot legally block or be blocked.",
          "Blockers who go out of play are warned and must immediately return — or face a penalty."],
   durations:[2800,3000,2800,2800],
   why:"This rule keeps the action contained and prevents one team camping at the finish line.",
   anim:"engagement",refSignal:"oob",focus:"b",
   bA:[[38,20],[47,18],[56,18],[65,21]],bB:[[24,71],[19,64],[16,56],[16,47]],jA:[76,29],jB:[18,61]},

  {id:"pack-definition",title:"Destroying the Pack",cat:"Pack Rules",catColor:"var(--cat-pack)",
   teaser:"If one team sprints away, the pack is gone — and blocking stops",
   steps:["The pack must include upright in-bounds blockers from both teams within 10 feet of each other.",
          "Red blockers deliberately sprint forward, separating from teal by more than 10 feet.",
          "There is no longer a valid pack. Refs call 'no pack!' — all blocking must cease.",
          "All blockers from both teams must work to reform the pack or face a penalty."],
   durations:[2800,3000,2800,2800],
   why:"Pack destruction creates chaos — but intentionally destroying it is illegal and penalized.",
   anim:"pack",refSignal:"nopack",focus:"both",
   bA:[[35,21],[46,18],[57,19],[67,22]],bB:[[26,73],[19,65],[16,55],[16,45]],jA:[76,29],jB:[18,61]},

  {id:"pivot-role",title:"The Pivot",cat:"Pack Rules",catColor:"var(--cat-pack)",
   teaser:"The pivot wears a striped helmet cover and has special abilities other blockers don't",
   steps:["The pivot is a blocker who wears a helmet cover with a stripe — the only one on their team.",
          "The pivot may touch the pivot line at jam start, setting the front of the pack.",
          "Uniquely, the pivot can receive the star from their jammer and become the new jammer.",
          "The pivot is the most versatile skater on the track."],
   durations:[2800,2800,3000,2800],
   why:"The pivot bridges the roles of blocker and potential jammer.",
   anim:"lead",refSignal:null,focus:"b",
   bA:[[38,20],[47,18],[56,18],[65,21]],bB:[[24,71],[19,64],[16,56],[16,47]],jA:[76,29],jB:[18,61]},

  {id:"jam-start",title:"How a Jam Starts",cat:"Pack Rules",catColor:"var(--cat-pack)",
   teaser:"One whistle blast starts the blockers; a second burst starts the jammers",
   steps:["Blockers line up between the pivot line and jammer line. Pivots may touch the pivot line.",
          "One long whistle blast — blockers start skating. The pack is now in motion.",
          "A second series of whistle blasts — jammers launch from behind the jammer line.",
          "Jammers must work through a moving pack on their first pass before they can score."],
   durations:[2800,2800,2800,2800],
   why:"The staggered start gives blockers time to form up before the jammers arrive.",
   anim:"lead",refSignal:"lead",focus:"both",
   bA:[[38,20],[47,18],[56,18],[65,21]],bB:[[24,71],[19,64],[16,56],[16,47]],jA:[74,27],jB:[81,36]},
];

const CATS = ["All","Jamming","Blocking","Penalties","Power Jams","Pack Rules"];
const CAT_LABELS = {"Jamming":"Scoring","Blocking":"Blocking","Penalties":"Penalties","Power Jams":"Power Jams","Pack Rules":"Pack Rules"};

let activeFilter="All", activePlay=null, stepIndex=0, stepTimer=null, paused=false;

// ── Track builder ─────────────────────────────────────────────────────────────
function dot(l,t,teamCls,isJammer,extraCls="",extraStyle="") {
  const star = isJammer
    ? `<svg viewBox="0 0 20 20" style="position:absolute;inset:0;pointer-events:none;" aria-hidden="true" focusable="false"><polygon points="10,0.5 12.23,6.92 19.03,7.06 13.62,11.17 15.58,17.69 10,13.8 4.42,17.69 6.38,11.17 0.97,7.06 7.77,6.92" fill="rgba(255,255,255,0.92)"/></svg>`
    : '';
  return `<div class="dot ${teamCls}${isJammer?" dot-jammer":""}${extraCls?" "+extraCls:""}" style="left:${l}%;top:${t}%;${extraStyle}">${star}</div>`;
}

function buildTrack(play, panel=false, step=0) {
  const {bA,bB,jA,jB,anim,refSignal,catColor} = play;
  const focus = play.focus || "both";

  // Dimmed, static "blocked" position for the unfocused jammer —
  // tucked just behind the pack so it reads as held up, not absent.
  const BLOCKED_A = [72, 25]; // red jammer parked behind pack
  const BLOCKED_B = [16, 53]; // teal jammer parked behind pack
  const DIM = "opacity:0.2;filter:saturate(0.3);";

  // blockers
  // Apply per-step position overrides if defined (panel only)
  const stepOverrides = (panel && play.stepPositions && play.stepPositions[step]) || [];
  const overrideMap = {}; // "a0", "b2" etc -> [l,t]
  stepOverrides.forEach(([team,idx,pos]) => { overrideMap[team+idx] = pos; });

  let dotsA = bA.map(([l,t],i) => {
    const key = "a"+i;
    const [ol, ot] = overrideMap[key] || [l,t];
    let s="";
    const isOOB = !!overrideMap[key];
    if (!panel) {
      if (anim==="wall"||anim==="multi-block") s=`animation:wall-lean ${1.8+i*0.15}s ease-in-out infinite;animation-delay:${i*0.12}s;`;
      else if (anim==="penalty"&&i===0)       s=`animation:to-box 5s ease-in-out infinite;`;
      else if (anim==="pack")                 s=`animation:${i%2?"shuffle-b":"shuffle-a"} ${2.4+i*0.2}s ease-in-out infinite;animation-delay:${i*0.18}s;`;
      else if (anim==="tripod"&&i===2)        s=`animation:brace-rock 2.8s ease-in-out infinite;`;
      else if (anim==="tripod"&&i<2)         s=`animation:wall-lean ${2+i*0.3}s ease-in-out infinite;animation-delay:${i*0.2}s;`;
    }
    if (panel && isOOB) s = "transition:left .6s ease,top .6s ease;opacity:0.55;filter:saturate(0.4);";
    else if (panel)     s = "transition:left .6s ease,top .6s ease;";
    const oobLabel = (panel && isOOB)
      ? `<div style="position:absolute;left:${ol}%;top:${ot-6}%;transform:translateX(-50%);font-size:7px;font-weight:700;letter-spacing:0.06em;color:var(--team-a);opacity:0.8;text-transform:uppercase;pointer-events:none;white-space:nowrap;">OOB</div>` : "";
    return dot(ol,ot,"dot-a",false,"",s) + oobLabel;
  }).join("");

  let dotsB = bB.map(([l,t],i) => {
    const key = "b"+i;
    const [ol, ot] = overrideMap[key] || [l,t];
    let s="";
    const isOOB = !!overrideMap[key];
    if (!panel&&anim==="pack") s=`animation:${i%2?"shuffle-a":"shuffle-b"} ${2.4+i*0.2}s ease-in-out infinite;animation-delay:${i*0.15+0.3}s;`;
    if (panel && isOOB) s = "transition:left .6s ease,top .6s ease;opacity:0.55;filter:saturate(0.4);";
    else if (panel)     s = "transition:left .6s ease,top .6s ease;";
    const oobLabel = (panel && isOOB)
      ? `<div style="position:absolute;left:${ol}%;top:${ot-6}%;transform:translateX(-50%);font-size:7px;font-weight:700;letter-spacing:0.06em;color:var(--team-b);opacity:0.8;text-transform:uppercase;pointer-events:none;white-space:nowrap;">OOB</div>` : "";
    return dot(ol,ot,"dot-b",false,"",s) + oobLabel;
  }).join("");

  // jammers
  let sA="", sB="", posA=jA, posB=jB;
  let dimA = (focus==="b") ? DIM : "";
  let dimB = (focus==="a") ? DIM : "";

  if (panel) {
    const PATH=[[18,61],[26,73],[50,82],[74,73],[84,50],[74,27],[50,18],[26,27],[18,39],[16,50],[18,61],[26,73]];
    const n=PATH.length;
    // Unfocused jammer stays parked; focused jammer moves along path
    if (focus==="b") {
      posA = BLOCKED_A;
      // apex play uses per-step jammer positions instead of the oval PATH
      posB = (play.jamSteps && play.jamSteps[step]) ? play.jamSteps[step] : PATH[(step*3)%n];
    } else if (focus==="a") {
      posA = anim==="power" ? jA : PATH[((step*3)+6)%n];
      posB = BLOCKED_B;
    } else {
      posB = PATH[(step*3)%n];
      posA = anim==="power" ? jA : PATH[((step*3)+6)%n];
    }
    sA = anim==="power"
      ? "animation:box-pulse 2s ease-in-out infinite;transition:left .9s ease,top .9s ease;"
      : "transition:left .9s cubic-bezier(0.4,0,0.2,1),top .9s cubic-bezier(0.4,0,0.2,1);";
    // Apex: scale jammer up when airborne (steps 1-2), normal on approach/landing
    const apexAirborne = anim==="apex" && step >= 1 && step <= 2;
    sB = `transition:left .9s cubic-bezier(0.4,0,0.2,1),top .9s cubic-bezier(0.4,0,0.2,1);${apexAirborne?"transform:translate(-50%,-50%) scale(1.6);opacity:0.85;":""}`;
  } else {
    // Mini card: unfocused jammer is parked and dimmed, no animation
    if (focus==="b") {
      posA = BLOCKED_A;
      sA = ""; // no animation — parked
    } else if (focus==="a") {
      posB = BLOCKED_B;
      sB = "";
    }
    // Active jammer animations
    if (focus !== "b") { // jA is active or both
      if (anim==="power") sA=`animation:box-pulse 2s ease-in-out infinite;`;
      else if (["lead","lap","engagement","apex"].includes(anim)) sA=`animation:lap-t 6s cubic-bezier(0.45,0,0.55,1) infinite;`;
    }
    if (focus !== "a") { // jB is active or both
      if (anim==="wall")   sB=`animation:approach-b 4s ease-in-out infinite;`;
      else if (anim==="apex") sB=`animation:apex-arc 4s cubic-bezier(0.4,0,0.2,1) infinite;`;
      else if (anim!=="pack") sB=`animation:lap-b 5s cubic-bezier(0.45,0,0.55,1) infinite;`;
    }
    // Power jam: jA always pulses in box regardless of focus
    if (anim==="power") { posA=jA; sA=`animation:box-pulse 2s ease-in-out infinite;`; dimA=""; }
  }

  const dotA = dot(posA[0],posA[1],"dot-a",true, anim==="power"?"dot-box":"", sA+dimA);
  const dotB = dot(posB[0],posB[1],"dot-b",true, "", sB+dimB);

  const zone = anim==="engagement"
    ? `<div class="track-zone"${panel?' style="opacity:0.25;animation:none;"':''}></div>` : "";

  // Apex arc SVG — step-aware in panel mode, always-on for mini card
  const apexArc = anim==="apex" ? (() => {
    // Arc path from takeoff [18,61] through inner boundary peak [26,32] to landing [65,21]
    // Split into two halves: takeoff→peak and peak→landing
    const arcHalf1 = `M 18,61 C 20,48 22,38 26,32`;
    const arcHalf2 = `M 26,32 C 32,24 50,20 65,21`;
    const arcFull  = `M 18,61 C 20,48 22,38 26,32 C 32,24 50,20 65,21`;
    const dashStyle = `fill='none' stroke='var(--team-b)' stroke-width='1.2' stroke-dasharray='3 2' opacity='0.75' style='animation:dash-flow 1.2s linear infinite'`;

    // In panel mode show arc progressively by step; on mini card show full arc always
    let pathsHTML = "";
    let labelHTML = "";
    let markersHTML = `<circle cx='18' cy='61' r='1.2' fill='var(--team-b)' opacity='0.45'/>`;

    if (!panel) {
      // Mini card: full arc always
      pathsHTML = `<path d='${arcFull}' ${dashStyle}/>`;
      markersHTML += `<circle cx='65' cy='21' r='1.2' fill='var(--team-b)' opacity='0.45'/>`;
      labelHTML = `<text x='38' y='14' text-anchor='middle' font-size='3.2' font-family='system-ui' font-weight='700' letter-spacing='0.06em' fill='var(--team-b)' opacity='0.65'>AIRBORNE</text>`;
    } else if (step === 1) {
      // Step 2: first half only (takeoff → peak)
      pathsHTML = `<path d='${arcHalf1}' ${dashStyle}/>`;
      labelHTML = `<text x='24' y='28' text-anchor='middle' font-size='3.2' font-family='system-ui' font-weight='700' letter-spacing='0.06em' fill='var(--team-b)' opacity='0.8'>JUMP!</text>`;
    } else if (step >= 2) {
      // Steps 3+: full arc (takeoff → landing)
      pathsHTML = `<path d='${arcFull}' ${dashStyle}/>`;
      markersHTML += `<circle cx='65' cy='21' r='1.2' fill='var(--team-b)' opacity='0.45'/>`;
      labelHTML = `<text x='40' y='14' text-anchor='middle' font-size='3.2' font-family='system-ui' font-weight='700' letter-spacing='0.06em' fill='var(--team-b)' opacity='${step===3?0.4:0.8}'>AIRBORNE</text>`;
    }

    return `<svg viewBox='0 0 100 100' preserveAspectRatio='none' style='position:absolute;inset:0;width:100%;height:100%;pointer-events:none;' aria-hidden='true'>
      ${pathsHTML}${markersHTML}${labelHTML}
    </svg>`;
  })() : "";

  const penBox = panel&&anim==="power"
    ? `<div style="position:absolute;top:3%;left:1%;font-size:9px;font-weight:700;letter-spacing:.08em;color:var(--team-a);opacity:.7;text-transform:uppercase;background:rgba(232,68,90,.1);padding:2px 6px;border-radius:4px;border:1px solid rgba(232,68,90,.2)">Penalty Box</div>` : "";

  // step pips (panel only)
  const pips = panel ? play.steps.map((_,i)=>{
    const pct=10+i*(80/Math.max(play.steps.length-1,1));
    const a=i===step,d=i<step;
    return `<div style="position:absolute;bottom:4%;left:${pct}%;width:6px;height:6px;border-radius:50%;transform:translateX(-50%);background:${a||d?catColor:"var(--border)"};opacity:${a?1:d?.45:.3};transition:background .3s,opacity .3s"></div>`;
  }).join("") : "";

  const badge = !panel&&refSignal
    ? `<div class="ref-badge">${{lead:"LEAD",calloff:"CALL OFF",penalty:"PENALTY",scoring:"SCORE",nopack:"NO PACK",oob:"OOB"}[refSignal]||""}</div>` : "";

  // Scoring trip: single +1 at the just-passed blocker per step + running score counter
  let scoringOverlay = "";
  if (play.id === "scoring-trip") {
    if (panel) {
      const scoreCount = Math.min(step, 3);
      // Running score tally in top-left corner
      if (step >= 1) {
        const blocked = step === 4;
        scoringOverlay += `<div style="position:absolute;top:4%;left:4%;font-size:10px;font-weight:900;color:var(--team-b);text-shadow:0 0 8px rgba(41,196,176,0.6);background:rgba(0,0,0,0.55);padding:2px 7px;border-radius:4px;pointer-events:none;">${scoreCount} pt${scoreCount!==1?'s':''}${blocked?' — blocked!':''}</div>`;
      }
      // +1 above the blocker just passed this step — CCW means right-to-left: bA[3]→bA[2]→bA[1]
      if (step >= 1 && step <= 3) {
        const [bl, bt] = bA[4 - step];
        scoringOverlay += `<div style="position:absolute;left:${bl}%;top:${bt-9}%;transform:translateX(-50%);font-size:12px;font-weight:900;color:var(--team-b);text-shadow:0 0 8px rgba(41,196,176,0.8);pointer-events:none;">+1</div>`;
      }
      // Step 4: blocked by leftmost blocker bA[0] — jammer stopped just to its right
      if (step === 4) {
        const [bl, bt] = bA[0];
        scoringOverlay += `<div style="position:absolute;left:${bl}%;top:${bt-13}%;transform:translateX(-50%);pointer-events:none;"><svg width="26" height="26" viewBox="0 0 26 26"><circle cx="13" cy="13" r="11" fill="rgba(232,68,90,0.15)" stroke="rgba(232,68,90,0.9)" stroke-width="2.5"/><line x1="5" y1="5" x2="21" y2="21" stroke="rgba(232,68,90,0.9)" stroke-width="2.5" stroke-linecap="round"/><text x="13" y="17" text-anchor="middle" font-size="8" font-weight="900" fill="rgba(232,68,90,0.9)" font-family="system-ui">+1</text></svg></div>`;
      }
    } else {
      // Mini card: +1 flash labels timed to when the jammer passes through the blocker zone.
      // lap-b is 5s; jammer is near red blockers at ~2.7-3.25s into the cycle.
      // score-flash becomes visible at 52% of its 5s cycle (2.6s after delay starts),
      // so delay = T_jammer - 2.6s to sync visibility with the jammer's actual position.
      bA.forEach(([bl]) => {
        const delay = (0.6 + (65 - bl) / 27 * 0.55).toFixed(2);
        scoringOverlay += `<div class="score-pip" style="left:${bl}%;top:9%;animation-delay:${delay}s">+1</div>`;
      });
    }
  }

  return `<div class="track">
    <div class="track-oval"></div><div class="track-surface"></div>
    <div class="track-inner-oval"></div><div class="track-midline"></div>
    ${zone}${apexArc}${penBox}${dotsA}${dotsB}${dotA}${dotB}${scoringOverlay}${pips}${badge}
  </div>`;
}

// ── Ref signal SVG ────────────────────────────────────────────────────────────
function refSVG(type) {
  if(!type) return "";
  const c="#e8e8f0",sw=1.4,cx=30,cy=32,s=22;
  const head=`<circle cx="${cx}" cy="${cy-s*.55}" r="${s*.16}" fill="${c}" opacity=".9"/>`;
  const body=`<line x1="${cx}" y1="${cy-s*.38}" x2="${cx}" y2="${cy+s*.2}" stroke="${c}" stroke-width="${sw}" stroke-linecap="round"/>`;
  const legs=`<line x1="${cx}" y1="${cy+s*.2}" x2="${cx-s*.22}" y2="${cy+s*.55}" stroke="${c}" stroke-width="${sw}" stroke-linecap="round"/>
              <line x1="${cx}" y1="${cy+s*.2}" x2="${cx+s*.22}" y2="${cy+s*.55}" stroke="${c}" stroke-width="${sw}" stroke-linecap="round"/>`;
  const fs=s*.3;
  const arms={
    lead:`<line x1="${cx}" y1="${cy-s*.2}" x2="${cx+s*.55}" y2="${cy-s*.45}" stroke="${c}" stroke-width="${sw}" stroke-linecap="round"/>
          <line x1="${cx}" y1="${cy-s*.2}" x2="${cx-s*.3}"  y2="${cy+s*.05}" stroke="${c}" stroke-width="${sw}" stroke-linecap="round"/>`,
    calloff:`<line x1="${cx}" y1="${cy-s*.2}" x2="${cx-s*.45}" y2="${cy+s*.05}" stroke="${c}" stroke-width="${sw}" stroke-linecap="round"/>
             <line x1="${cx}" y1="${cy-s*.2}" x2="${cx+s*.45}" y2="${cy+s*.05}" stroke="${c}" stroke-width="${sw}" stroke-linecap="round"/>
             <circle cx="${cx-s*.45}" cy="${cy+s*.05}" r="${s*.08}" fill="${c}" opacity=".7"/>
             <circle cx="${cx+s*.45}" cy="${cy+s*.05}" r="${s*.08}" fill="${c}" opacity=".7"/>`,
    penalty:`<line x1="${cx}" y1="${cy-s*.35}" x2="${cx}" y2="${cy-s*.8}" stroke="${c}" stroke-width="${sw}" stroke-linecap="round"/>
             <line x1="${cx}" y1="${cy-s*.2}" x2="${cx-s*.35}" y2="${cy+s*.05}" stroke="${c}" stroke-width="${sw}" stroke-linecap="round"/>`,
    scoring:`<line x1="${cx}" y1="${cy-s*.2}" x2="${cx-s*.55}" y2="${cy-s*.1}" stroke="${c}" stroke-width="${sw}" stroke-linecap="round"/>
             <line x1="${cx}" y1="${cy-s*.2}" x2="${cx+s*.55}" y2="${cy-s*.1}" stroke="${c}" stroke-width="${sw}" stroke-linecap="round"/>`,
    nopack:`<line x1="${cx}" y1="${cy-s*.2}" x2="${cx+s*.4}" y2="${cy-s*.45}" stroke="${c}" stroke-width="${sw}" stroke-linecap="round"/>
            <line x1="${cx}" y1="${cy-s*.2}" x2="${cx-s*.4}" y2="${cy-s*.45}" stroke="${c}" stroke-width="${sw}" stroke-linecap="round"/>`,
    oob:`<line x1="${cx}" y1="${cy-s*.2}" x2="${cx-s*.5}" y2="${cy+s*.15}" stroke="${c}" stroke-width="${sw}" stroke-linecap="round"/>
         <line x1="${cx}" y1="${cy-s*.2}" x2="${cx+s*.5}" y2="${cy+s*.15}" stroke="${c}" stroke-width="${sw}" stroke-linecap="round"/>`,
  }[type]||"";
  const lbl={lead:"LEAD",calloff:"CALL OFF",penalty:"PENALTY",scoring:"SCORE",nopack:"NO PACK",oob:"OOB"}[type]||"";
  return `<svg viewBox="0 0 60 70" class="ref-signal-svg" aria-label="Ref signal: ${type}">
    <rect x="0" y="0" width="60" height="70" rx="8" fill="var(--bg-card)"/>
    ${head}${body}${legs}${arms}
    <text x="${cx}" y="${cy+s*.85}" text-anchor="middle" font-size="${fs}" fill="${c}" opacity=".75" font-family="system-ui" font-weight="700">${lbl}</text>
  </svg>`;
}

const REF_DESC={
  lead:"Ref points one arm toward the lead jammer — two short whistle blasts.",
  calloff:"Lead jammer taps both hands to hips — ref echoes with four short whistle blasts.",
  penalty:"Ref points one arm straight up toward the penalty box — one long whistle blast.",
  scoring:"Ref extends both arms to the sides to signal points scored after each pass.",
  nopack:"Ref crosses both arms overhead — no pack, all blocking must stop.",
  oob:"Ref points both arms downward and outward — skater is out of bounds.",
};

// ── Render ────────────────────────────────────────────────────────────────────
function isDesktop() {
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}

function renderFilterBar() {
  document.getElementById("filterBar").innerHTML=CATS.map(c=>
    `<button class="filter-btn${c===activeFilter?" active":""}" data-cat="${c}" onclick="setFilter('${c}')">${CAT_LABELS[c]||c}</button>`
  ).join("");
}

function renderGrid() {
  const plays=activeFilter==="All"?PLAYS:PLAYS.filter(p=>p.cat===activeFilter);
  document.getElementById("cardGrid").innerHTML=plays.length
    ?plays.map(p=>`
      <article class="card${activePlay===p.id?" selected":""}" onclick="openPanel('${p.id}')" role="button" tabindex="0"
        aria-label="Learn about ${p.title}" onkeydown="if(event.key==='Enter'||event.key===' ')openPanel('${p.id}')">
        <div class="card-stripe" style="background:${p.catColor}"></div>
        <div class="card-track">
          ${buildTrack(p)}
          <div class="card-label">${p.title}</div>
        </div>
        <div class="card-body"><div class="cbi">
          <div class="card-cat" style="color:${p.catColor}">${CAT_LABELS[p.cat]||p.cat}</div>
          <div class="card-title">${p.title}</div>
          <div class="card-teaser">${p.teaser}</div>
        </div></div>
      </article>`).join("")
    :`<div class="empty">No plays in this category yet.</div>`;
}

function renderPanel() {
  const panel=document.getElementById("panel"),inner=document.getElementById("panelInner");
  if(!activePlay){panel.classList.remove("open");inner.innerHTML="";return;}
  panel.classList.add("open");
  const p=PLAYS.find(x=>x.id===activePlay);if(!p)return;
  const stepDots=p.steps.map((_,i)=>`<div class="step-dot${i<stepIndex?" done":i===stepIndex?" active":""}" onclick="jumpStep(${i})" title="Step ${i+1}"></div>`).join("");
  inner.innerHTML=`
    <div class="panel-header">
      <div class="panel-header-text">
        <div class="panel-cat" style="color:${p.catColor}">${CAT_LABELS[p.cat]||p.cat}</div>
        <div class="panel-title">${p.title}</div>
      </div>
      <button class="close-btn" onclick="closePanel()" aria-label="Close">✕</button>
    </div>
    <div class="panel-track-wrap"><div class="panel-track-box" id="panelTrack" onclick="if(paused)nextStep()" style="cursor:${paused?'pointer':'default'}">${buildTrack(p,true,stepIndex)}</div></div>
    <div class="step-dots">${stepDots}</div>
    <div class="panel-caption">
      <div class="step-num">Step ${stepIndex+1} of ${p.steps.length}</div>
      <div class="caption-text animate" id="captionText">${p.steps[stepIndex]}</div>
    </div>
    <div class="panel-controls">
      <button class="ctrl-btn" onclick="prevStep()" ${stepIndex===0?"disabled":""}>← Back</button>
      <button class="ctrl-btn" onclick="togglePause()">${paused?"▶ Auto":"⏸ Stop"}</button>
      <button class="ctrl-btn primary" onclick="nextStep()">Next →</button>
    </div>
    <div class="legend">
      <div class="legend-item"><div class="legend-dot" style="background:var(--team-a)"></div>Red Team</div>
      <div class="legend-item"><div class="legend-dot" style="background:var(--team-b)"></div>Teal Team</div>
      <div class="legend-item"><span style="font-size:11px">★</span>&nbsp;Jammer</div>
    </div>
    ${p.refSignal?`
    <div class="ref-signal-box">
      <div class="ref-signal-label">Referee Signal</div>
      <div class="ref-signal-wrap">${refSVG(p.refSignal)}<div class="ref-signal-desc">${REF_DESC[p.refSignal]||""}</div></div>
    </div>`:""}
    <div class="why-box">
      <div class="why-label" style="color:${p.catColor}">Why it matters</div>
      <div class="why-text">${p.why}</div>
    </div>`;
}

// ── Step logic ────────────────────────────────────────────────────────────────
function scheduleNextStep(){
  clearTimeout(stepTimer);
  if(paused||!activePlay)return;
  const p=PLAYS.find(x=>x.id===activePlay);if(!p)return;
  stepTimer=setTimeout(()=>{stepIndex=(stepIndex+1)%p.steps.length;updatePanelStep();scheduleNextStep();},p.durations[stepIndex]);
}
function updatePanelStep(){
  const p=PLAYS.find(x=>x.id===activePlay);if(!p)return;
  const t=document.getElementById("panelTrack");if(t)t.innerHTML=buildTrack(p,true,stepIndex);
  syncPausedClass();
  const cap=document.getElementById("captionText");
  if(cap){cap.classList.remove("animate");void cap.offsetWidth;cap.classList.add("animate");cap.textContent=p.steps[stepIndex];}
  document.querySelectorAll(".step-dot").forEach((d,i)=>{d.className="step-dot"+(i<stepIndex?" done":i===stepIndex?" active":"");});
  const num=document.querySelector(".step-num");if(num)num.textContent=`Step ${stepIndex+1} of ${p.steps.length}`;
  const back=document.querySelector(".panel-controls .ctrl-btn:first-child");if(back)back.disabled=stepIndex===0;
}

// ── Height animation (rAF loop, runs at native framerate) ────────────────────
function easeInOut(t){return t<.5?2*t*t:-1+(4-2*t)*t;}

function animateHeight(el,fromH,toH,duration,onDone){
  const start=performance.now();
  function frame(now){
    const t=Math.min((now-start)/duration,1);
    el.style.maxHeight=(fromH+easeInOut(t)*(toH-fromH))+'px';
    if(t<1) requestAnimationFrame(frame);
    else if(onDone) onDone();
  }
  requestAnimationFrame(frame);
}

function expandCard(body){
  const target=body.querySelector('.cbi').offsetHeight;
  animateHeight(body,0,target,420,()=>{body.style.maxHeight='none';body.style.overflow='';});
}

function collapseCard(body,onDone){
  const h=body.querySelector('.cbi').offsetHeight;
  body.style.overflow='hidden';
  body.style.maxHeight=h+'px';
  // force a paint at current height before animating down
  body.getBoundingClientRect();
  animateHeight(body,h,0,420,()=>{body.style.maxHeight='';onDone();});
}

// ── Actions ───────────────────────────────────────────────────────────────────
function setFilter(c){activeFilter=c;renderFilterBar();renderGrid();}
function syncPausedClass(){
  const box=document.getElementById("panelTrack");
  if(!box) return;
  box.classList.toggle("paused", paused);
  box.style.cursor = paused ? "pointer" : "default";
}
function openPanel(id){
  activePlay=id;stepIndex=0;paused=true;
  renderGrid();renderPanel();syncPausedClass();
  if(isDesktop()){
    const body=document.querySelector('.card.selected .card-body');
    if(body) expandCard(body);
  } else {
    const i=document.getElementById("panelInner");if(i)i.scrollTop=0;
  }
}
function closePanel(){
  clearTimeout(stepTimer);
  if(isDesktop()&&activePlay){
    const body=document.querySelector('.card.selected .card-body');
    if(body){collapseCard(body,()=>{activePlay=null;renderGrid();renderPanel();});return;}
  }
  activePlay=null;renderGrid();renderPanel();
}
function togglePause(){paused=!paused;const b=document.querySelector(".ctrl-btn:nth-child(2)");if(b)b.textContent=paused?"▶ Auto":"⏸ Stop";syncPausedClass();if(!paused)scheduleNextStep();}
function nextStep(){clearTimeout(stepTimer);const p=PLAYS.find(x=>x.id===activePlay);if(!p)return;stepIndex=(stepIndex+1)%p.steps.length;updatePanelStep();syncPausedClass();if(!paused)scheduleNextStep();}
function prevStep(){clearTimeout(stepTimer);if(stepIndex>0)stepIndex--;updatePanelStep();syncPausedClass();if(!paused)scheduleNextStep();}
function jumpStep(i){clearTimeout(stepTimer);stepIndex=i;updatePanelStep();syncPausedClass();if(!paused)scheduleNextStep();}

renderFilterBar();
renderGrid();