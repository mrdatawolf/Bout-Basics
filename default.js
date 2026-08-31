let activeFilter="All", activePlay=null, stepIndex=0, stepTimer=null, paused=false;
let heightAnimationFrame=null;

// ── Render ────────────────────────────────────────────────────────────────────
function isDesktop() {
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g,character=>({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
  })[character]);
}

function safeColor(value) {
  return /^var\(--cat-(scoring|blocking|penalty|power|pack)\)$/.test(value)
    ? value
    : "currentColor";
}

function renderFilterBar() {
  document.getElementById("filterBar").innerHTML=CATS.map(c=>
    `<button class="filter-btn${c===activeFilter?" active":""}" data-filter="${escapeHTML(c)}">${escapeHTML(CAT_LABELS[c]||c)}</button>`
  ).join("");
}

function renderGrid() {
  const plays=activeFilter==="All"?PLAYS:PLAYS.filter(p=>p.cat===activeFilter);
  document.getElementById("cardGrid").innerHTML=plays.length
    ?plays.map(p=>`
      <article class="card${activePlay===p.id?" selected":""}" data-play-id="${escapeHTML(p.id)}" role="button" tabindex="0"
        aria-label="Learn about ${escapeHTML(p.title)}">
        <div class="card-stripe" style="background:${safeColor(p.catColor)}"></div>
        <div class="card-track">
          ${buildTrack(p)}
          <div class="card-label">${escapeHTML(p.title)}</div>
        </div>
        <div class="card-body"><div class="cbi">
          <div class="card-cat" style="color:${safeColor(p.catColor)}">${escapeHTML(CAT_LABELS[p.cat]||p.cat)}</div>
          <div class="card-title">${escapeHTML(p.title)}</div>
          <div class="card-teaser">${escapeHTML(p.teaser)}</div>
        </div></div>
      </article>`).join("")
    :`<div class="empty">No plays in this category yet.</div>`;
}

function renderPanel() {
  const panel=document.getElementById("panel"),inner=document.getElementById("panelInner");
  if(!activePlay){panel.classList.remove("open");panel.setAttribute("aria-hidden","true");inner.innerHTML="";return;}
  panel.classList.add("open");
  panel.setAttribute("aria-hidden","false");
  const p=PLAYS.find(x=>x.id===activePlay);if(!p)return;
  const stepDots=p.steps.map((_,i)=>`<button type="button" class="step-dot${i<stepIndex?" done":i===stepIndex?" active":""}" data-step="${i}" aria-label="Go to step ${i+1}" ${i===stepIndex?'aria-current="step"':''}></button>`).join("");
  inner.innerHTML=`
    <div class="panel-header">
      <div class="panel-header-text">
        <div class="panel-cat" style="color:${safeColor(p.catColor)}">${escapeHTML(CAT_LABELS[p.cat]||p.cat)}</div>
        <div class="panel-title">${escapeHTML(p.title)}</div>
      </div>
      <button class="close-btn" data-action="close" aria-label="Close">✕</button>
    </div>
    <div class="panel-track-wrap"><button type="button" class="panel-track-box" id="panelTrack" data-action="track" aria-label="${paused?'Advance to the next step':'Play visualization'}" ${paused?'':'disabled'} style="cursor:${paused?'pointer':'default'}">${buildTrack(p,true,stepIndex)}</button></div>
    <div class="step-dots">${stepDots}</div>
    <div class="panel-caption">
      <div class="step-num">Step ${stepIndex+1} of ${p.steps.length}</div>
      <div class="caption-text animate" id="captionText">${escapeHTML(p.steps[stepIndex])}</div>
    </div>
    <div class="panel-controls">
      <button class="ctrl-btn" data-action="previous" ${stepIndex===0?"disabled":""}>← Back</button>
      <button class="ctrl-btn" data-action="toggle">${paused?"▶ Auto":"⏸ Stop"}</button>
      <button class="ctrl-btn primary" data-action="next">Next →</button>
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
      <div class="why-label" style="color:${safeColor(p.catColor)}">Why it matters</div>
      <div class="why-text">${escapeHTML(p.why)}</div>
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
  document.querySelectorAll(".step-dot").forEach((d,i)=>{
    d.className="step-dot"+(i<stepIndex?" done":i===stepIndex?" active":"");
    if(i===stepIndex)d.setAttribute("aria-current","step");else d.removeAttribute("aria-current");
  });
  const num=document.querySelector(".step-num");if(num)num.textContent=`Step ${stepIndex+1} of ${p.steps.length}`;
  const back=document.querySelector(".panel-controls .ctrl-btn:first-child");if(back)back.disabled=stepIndex===0;
}

// ── Height animation (rAF loop, runs at native framerate) ────────────────────
function easeInOut(t){return t<.5?2*t*t:-1+(4-2*t)*t;}

function animateHeight(el,fromH,toH,duration,onDone){
  if(heightAnimationFrame!==null) cancelAnimationFrame(heightAnimationFrame);
  const start=performance.now();
  function frame(now){
    const t=Math.min((now-start)/duration,1);
    el.style.maxHeight=(fromH+easeInOut(t)*(toH-fromH))+'px';
    if(t<1) heightAnimationFrame=requestAnimationFrame(frame);
    else { heightAnimationFrame=null; if(onDone) onDone(); }
  }
  heightAnimationFrame=requestAnimationFrame(frame);
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
  clearTimeout(stepTimer);
  if(heightAnimationFrame!==null){cancelAnimationFrame(heightAnimationFrame);heightAnimationFrame=null;}
  activePlay=id;stepIndex=0;paused=true;
  renderGrid();renderPanel();syncPausedClass();
  const closeButton=document.querySelector(".close-btn");
  if(closeButton)closeButton.focus({preventScroll:true});
  if(isDesktop()){
    const body=document.querySelector('.card.selected .card-body');
    if(body) expandCard(body);
  } else {
    const i=document.getElementById("panelInner");if(i)i.scrollTop=0;
  }
}
function closePanel(){
  clearTimeout(stepTimer);
  const closingPlay=activePlay;
  if(isDesktop()&&activePlay){
    const body=document.querySelector('.card.selected .card-body');
    if(body){collapseCard(body,()=>{if(activePlay!==closingPlay)return;activePlay=null;renderGrid();renderPanel();restoreCardFocus(closingPlay);});return;}
  }
  activePlay=null;renderGrid();renderPanel();restoreCardFocus(closingPlay);
}
function restoreCardFocus(id){
  const card=document.querySelector(`[data-play-id="${id}"]`);
  if(card) card.focus();
}
function togglePause(){paused=!paused;const b=document.querySelector(".ctrl-btn:nth-child(2)");if(b)b.textContent=paused?"▶ Auto":"⏸ Stop";syncPausedClass();const track=document.getElementById("panelTrack");if(track){track.disabled=!paused;track.setAttribute("aria-label",paused?"Advance to the next step":"Play visualization");}if(!paused)scheduleNextStep();}
function nextStep(){clearTimeout(stepTimer);const p=PLAYS.find(x=>x.id===activePlay);if(!p)return;stepIndex=(stepIndex+1)%p.steps.length;updatePanelStep();syncPausedClass();if(!paused)scheduleNextStep();}
function prevStep(){clearTimeout(stepTimer);if(stepIndex>0)stepIndex--;updatePanelStep();syncPausedClass();if(!paused)scheduleNextStep();}
function jumpStep(i){clearTimeout(stepTimer);stepIndex=i;updatePanelStep();syncPausedClass();if(!paused)scheduleNextStep();}

renderFilterBar();
renderGrid();

document.addEventListener("keydown",event=>{
  if(event.key==="Escape"&&activePlay){event.preventDefault();closePanel();}
  const card=event.target.closest?.(".card[data-play-id]");
  if(card&&(event.key==="Enter"||event.key===" ")){
    event.preventDefault();
    openPanel(card.dataset.playId);
  }
});

document.addEventListener("click",event=>{
  const filter=event.target.closest("[data-filter]");
  if(filter){setFilter(filter.dataset.filter);return;}
  const step=event.target.closest("[data-step]");
  if(step){jumpStep(Number(step.dataset.step));return;}
  const action=event.target.closest("[data-action]")?.dataset.action;
  if(action==="close")closePanel();
  else if(action==="track"&&paused)nextStep();
  else if(action==="previous")prevStep();
  else if(action==="toggle")togglePause();
  else if(action==="next")nextStep();
  else {
    const card=event.target.closest(".card[data-play-id]");
    if(card)openPanel(card.dataset.playId);
  }
});
