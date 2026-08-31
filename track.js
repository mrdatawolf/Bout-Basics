// ── Track builder ─────────────────────────────────────────────────────────────
function dot(l,t,teamCls,isJammer,extraCls="",extraStyle="") {
  const star = isJammer
    ? `<svg viewBox="0 0 20 20" style="position:absolute;inset:0;pointer-events:none;" aria-hidden="true" focusable="false"><polygon points="10,0.5 12.23,6.92 19.03,7.06 13.62,11.17 15.58,17.69 10,13.8 4.42,17.69 6.38,11.17 0.97,7.06 7.77,6.92" fill="rgba(255,255,255,0.92)"/></svg>`
    : '';
  return `<div class="dot ${teamCls}${isJammer?" dot-jammer":""}${extraCls?" "+extraCls:""}" style="left:${l}%;top:${t}%;${extraStyle}">${star}</div>`;
}

function buildTrack(play, panel=false, step=0) {
  const {bA,bB,jA,jB,anim,refSignal} = play;
  const catColor = safeColor(play.catColor);
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
