/* State of Hotel Tech Brands 2027 - interactive explorer. Built by the research system (step 13). */
(() => {
  const host = document.getElementById("htb-explorer");
  if (!host || host.shadowRoot) return;
  const D = JSON.parse(document.getElementById("htb-data").textContent);
  const R = host.attachShadow({ mode: "open" });
  R.innerHTML = "<style>\n:host{display:block;color-scheme:light;--top:76px;--bg:light-dark(#F2EBE5,#191919);--paper:light-dark(#FBF8F5,#222);--ink:light-dark(#232323,#F2EBE5);--ink7:light-dark(rgba(35,35,35,.72),rgba(242,235,229,.74));--ink5:light-dark(rgba(35,35,35,.52),rgba(242,235,229,.55));--line:light-dark(rgba(35,35,35,.13),rgba(242,235,229,.15));--soft:light-dark(rgba(35,35,35,.06),rgba(242,235,229,.07));--green:#9BC86F;--green2:light-dark(#5E8E3A,#B6DB92);--mk:light-dark(rgba(35,35,35,.78),rgba(242,235,229,.7))}\n*{box-sizing:border-box;min-width:0}\n\n.root{background:var(--bg);color:var(--ink);font:16px/1.55 var(--font-inter),Inter,\"Segoe UI\",system-ui,sans-serif;overflow-x:clip}\n.w{max-width:1200px;margin:0 auto;padding:0 max(4vw,16px)}\nh1,h2,h3,p{margin:0}\nh1{font-size:clamp(38px,6.2vw,72px);line-height:.98;letter-spacing:-.035em;font-weight:800;text-wrap:balance}\nh2{font-size:clamp(26px,3.4vw,38px);line-height:1.08;letter-spacing:-.025em;text-wrap:balance}\nh3{font-size:18px;line-height:1.3;letter-spacing:-.01em;text-wrap:balance}\n.kicker{font-size:12.5px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--ink5)}\n.muted{color:var(--ink7)}\nbutton{font:inherit;color:inherit}\n:focus-visible{outline:2px solid var(--green2);outline-offset:3px;border-radius:6px}\n\n/* hero */\n.hero{padding-top:clamp(40px,7vw,88px);position:relative}\n.hero .tag{display:inline-flex;gap:8px;align-items:center;margin-bottom:20px}\n.hero .tag i{width:8px;height:8px;border-radius:50%;background:var(--green);box-shadow:0 0 0 0 rgba(155,200,111,.7);animation:pulse 2.2s infinite}\n@keyframes pulse{70%{box-shadow:0 0 0 10px rgba(155,200,111,0)}100%{box-shadow:0 0 0 0 rgba(155,200,111,0)}}\n.hero .sub{font-size:clamp(20px,2.4vw,27px);font-weight:600;letter-spacing:-.015em;margin-top:18px;max-width:28ch;line-height:1.25}\n.hero .sub em{font-style:normal;background:linear-gradient(transparent 62%,rgba(155,200,111,.55) 62%)}\n.hero .what{margin-top:16px;max-width:58ch;font-size:17px}\n.facts{display:flex;flex-wrap:wrap;gap:8px 22px;margin-top:22px;font-size:14px;color:var(--ink7)}\n.facts b{color:var(--ink)}\n.cta-row{display:flex;flex-wrap:wrap;gap:12px;margin-top:26px}\n.btn{display:inline-flex;align-items:center;gap:8px;border-radius:999px;padding:12px 20px;font-weight:700;text-decoration:none;border:0;cursor:pointer;font-size:15px}\n.btn.pri{background:var(--ink);color:var(--bg)}\n.btn.sec{background:transparent;color:var(--ink);border:1.5px solid var(--line)}\n.btn:hover{transform:translateY(-1px)}\n/* the wall of sameness */\n.wall{overflow:hidden;margin-top:clamp(36px,5vw,60px);display:grid;gap:10px;mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent);-webkit-mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)}\n.lane{display:flex;gap:10px;width:max-content;animation:slide 70s linear infinite}\n.lane.r{animation-direction:reverse;animation-duration:85s}\n.wall:hover .lane{animation-play-state:paused}\n@keyframes slide{to{transform:translateX(-50%)}}\n.pill{white-space:nowrap;border:1px solid var(--line);background:var(--paper);border-radius:999px;padding:8px 14px;font-size:14.5px;font-weight:600}\n.pill small{font-weight:500;color:var(--ink5);margin-left:6px}\n.pill.g{background:var(--green);color:#232323;border-color:transparent}.pill.g small{color:rgba(35,35,35,.7)}\n.wallcap{font-size:13px;color:var(--ink5);text-align:center;margin-top:10px}\n\n/* step 1: pick */\n.pick{padding-block:clamp(48px,6vw,80px) 8px;scroll-margin-top:var(--top,0px)}\n.step{display:inline-flex;align-items:center;gap:10px;margin-bottom:10px}\n.step b{display:grid;place-items:center;width:28px;height:28px;border-radius:50%;background:var(--ink);color:var(--bg);font-size:13px}\n.cats{display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:10px;margin-top:22px}\n.cat{position:relative;text-align:left;cursor:pointer;background:var(--paper);border:1.5px solid var(--line);border-radius:16px;padding:14px 14px 12px;display:grid;gap:8px;transition:border-color .2s,transform .2s,background .2s}\n.cat:hover:not([disabled]){transform:translateY(-2px);border-color:var(--ink5)}\n.cat svg{width:26px;height:26px;stroke:currentColor;fill:none;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}\n.cat .nm{font-weight:700;font-size:15px;line-height:1.25}\n.cat .ct{font-size:13px;color:var(--ink5)}\n.cat .meter{height:4px;border-radius:4px;background:var(--soft);overflow:hidden}\n.cat .meter i{display:block;height:100%;background:var(--ink5);border-radius:4px}\n.cat[aria-pressed=true]{background:var(--green);border-color:var(--green);color:#232323}\n.cat[aria-pressed=true] .ct{color:rgba(35,35,35,.7)}.cat[aria-pressed=true] .meter{background:rgba(35,35,35,.15)}.cat[aria-pressed=true] .meter i{background:#232323}\n.cat[disabled]{opacity:.5;cursor:not-allowed}\n.cat.all{background:transparent;border-style:dashed}\n\n/* step 2: snapshot */\n.snap{padding-block:28px 8px;scroll-margin-top:var(--top,0px)}\n.snaphead{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:end;gap:12px}\n.kpis{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin-top:20px}\n.kpi{background:var(--paper);border:1px solid var(--line);border-radius:18px;padding:18px 18px 16px;display:grid;gap:6px;align-content:start}\n.kpi .v{font-size:clamp(34px,4vw,48px);font-weight:800;letter-spacing:-.03em;line-height:1}\n.kpi .l{font-size:14.5px;font-weight:600;line-height:1.3}\n.kpi .c{font-size:13px;color:var(--ink5)}\n.kpi .c b{color:var(--ink7)}\n.vs{margin-top:12px;background:var(--paper);border:1px solid var(--line);border-radius:18px;padding:6px 18px}\n.vsrow{display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,2fr) 92px;gap:14px;align-items:center;padding:11px 0;border-bottom:1px solid var(--line);font-size:14.5px}\n.vsrow .hint{display:block;font-size:12.5px;color:var(--ink5);margin-top:2px;line-height:1.3}\n.vsrow:last-child{border-bottom:0}\n.vsrow .nums{text-align:right;font-variant-numeric:tabular-nums;font-size:13.5px;color:var(--ink7)}\n.vsrow .nums b{color:var(--ink);font-size:15px}\n.duo{position:relative;height:22px}\n.duo i{position:absolute;left:0;height:9px;border-radius:0 4px 4px 0;transition:width .9s cubic-bezier(.2,.8,.2,1)}\n.duo i.a{top:0;background:var(--green)}.duo i.b{top:12px;background:var(--mk);opacity:.55}\n.legend{display:flex;flex-wrap:wrap;gap:6px 16px;font-size:13px;color:var(--ink7)}\n.legend span{display:inline-flex;align-items:center;gap:6px}\n.legend i{width:12px;height:8px;border-radius:2px;display:inline-block}\n\n/* step 3: sections */\n.nav{position:sticky;top:var(--top,0px);z-index:20;background:color-mix(in srgb,var(--bg) 88%,transparent);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border-bottom:1px solid var(--line);margin-top:44px}\n.navin{display:flex;align-items:center;gap:14px;padding-top:10px;padding-bottom:10px}\n.tabs{display:flex;gap:6px;overflow-x:auto;scrollbar-width:none;flex:1}\n.tabs::-webkit-scrollbar{display:none}\n.tab{flex:1 1 0;cursor:pointer;border:1.5px solid transparent;background:transparent;border-radius:12px;padding:7px 12px;text-align:left;display:grid;line-height:1.2}\n.tab b{font-size:14px}.tab span{font-size:12px;color:var(--ink5)}\n.tab b small{font-weight:800;color:var(--green2);margin-right:4px;font-size:12px}.tab[aria-selected=true] b small{color:var(--green)}\n.tab:hover{background:var(--soft)}\n.tab[aria-selected=true]{background:var(--ink);color:var(--bg)}.tab[aria-selected=true] span{color:var(--bg);opacity:.7}\n.chipcat{flex:none;cursor:pointer;border:0;border-radius:999px;background:var(--green);color:#232323;font-weight:700;font-size:13.5px;padding:8px 14px}\n.chipcat.mk{background:var(--soft);color:var(--ink)}\n.panel{padding-block:36px 12px;scroll-margin-top:90px}\n.panel[hidden]{display:none}\n.phead{display:grid;grid-template-columns:auto 1fr;gap:6px 18px;align-items:baseline;margin-bottom:22px}\n.phead .no{font-size:clamp(40px,5vw,60px);font-weight:800;letter-spacing:-.04em;line-height:.9;color:var(--green2)}\n.phead p{grid-column:2;max-width:62ch}\n.grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}\n.card{background:var(--paper);border:1px solid var(--line);border-radius:20px;padding:20px 20px 16px;display:grid;gap:14px;align-content:start;opacity:0;transform:translateY(14px);transition:opacity .5s,transform .5s}\n.card.in{opacity:1;transform:none}\n.card.wide{grid-column:1/-1}\n.card .q{font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--ink5)}\n.card .why{font-size:14px;color:var(--ink7);margin-top:-6px}\n.card .n{font-size:12.5px;color:var(--ink5);border-top:1px solid var(--line);padding-top:10px;display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap}\n.card .n a{color:var(--ink7);cursor:pointer;text-decoration:underline;text-underline-offset:2px}\n/* bars */\n.bars{display:grid;gap:9px}\n.bar{display:grid;grid-template-columns:minmax(0,38%) minmax(0,1fr) auto;gap:12px;align-items:center;font-size:14px}\n.bar .lab{line-height:1.25}\n.bar .tr{position:relative;height:22px}\n.bar .tr i{position:absolute;left:0;height:9px;border-radius:0 4px 4px 0;transition:width .9s cubic-bezier(.2,.8,.2,1);width:0}\n.bar .tr i.a{top:0;background:var(--green)}.bar .tr i.b{top:12px;background:var(--mk);opacity:.55}\n.bar .tr.solo i.b{top:6px;height:10px;opacity:1;background:var(--mk)}\n.bar .tr.solo i.hl{background:var(--green)}\n.bar .val{font-size:13px;font-variant-numeric:tabular-nums;text-align:right;color:var(--ink7);white-space:nowrap;min-width:5.5em}\n.bar .val b{color:var(--ink)}\n.bar.me .lab{font-weight:700}\n.seg{display:flex;gap:3px;background:var(--soft);padding:3px;border-radius:999px;width:max-content;max-width:100%;overflow-x:auto}\n.seg button{border:0;background:transparent;border-radius:999px;padding:5px 12px;font-size:13px;font-weight:600;cursor:pointer;white-space:nowrap}\n.seg button[aria-pressed=true]{background:var(--ink);color:var(--bg)}\n/* stacked */\n.stk{display:grid;gap:10px}\n.stk .row{display:grid;grid-template-columns:120px minmax(0,1fr);gap:12px;align-items:center;font-size:13.5px;font-weight:600}\n.stk .track{display:flex;height:30px;border-radius:8px;overflow:hidden;gap:2px}\n.stk .track span{display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;transition:flex-grow .9s cubic-bezier(.2,.8,.2,1);flex-basis:0;overflow:hidden;white-space:nowrap}\n/* donuts */\n.donuts{display:flex;flex-wrap:wrap;gap:20px 28px;align-items:center}\n.donut{display:grid;justify-items:center;gap:6px;font-size:13px;font-weight:600}\n.donut svg{width:132px;height:132px;transform:rotate(-90deg)}\n.donut circle{fill:none;stroke-width:16;transition:stroke-dasharray 1s cubic-bezier(.2,.8,.2,1),stroke-dashoffset 1s cubic-bezier(.2,.8,.2,1)}\n.donut .ctr{position:relative;margin-top:-132px;height:132px;display:grid;place-items:center;text-align:center;line-height:1.1}\n.donut .ctr b{font-size:26px;letter-spacing:-.02em}\n.donut .cap{font-size:13px;color:var(--ink7);font-weight:600;text-align:center;max-width:12em;line-height:1.3}\n/* heatmap */\n.heat{display:grid;gap:3px;font-size:12px}\n.heat .h{color:var(--ink5);font-weight:600;display:flex;align-items:center;padding-right:6px;line-height:1.15}\n.heat .x{writing-mode:vertical-rl;transform:rotate(180deg);justify-content:flex-start;align-items:flex-start;padding:0 0 6px;height:112px}\n.heat .c{height:34px;border-radius:4px;display:grid;place-items:center;font-size:11px;font-weight:700;cursor:default;transition:outline .15s}\n.heat .c:hover{outline:2px solid var(--ink)}\n.heat .me{color:var(--ink);font-weight:800}\n/* gaps */\n.gaps{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}\n.gap{border-radius:18px;padding:18px;display:grid;gap:10px;align-content:start;background:var(--paper);border:1px solid var(--line);position:relative;overflow:hidden}\n.gap::before{content:\"\";position:absolute;inset:0 auto 0 0;width:5px;background:var(--green)}\n.gap .t{font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--ink5)}\n.gap .big{font-size:19px;font-weight:700;line-height:1.3;letter-spacing:-.01em}\n.gap .mini{display:grid;gap:6px;font-size:13px}\n.empty{padding:22px;border:1.5px dashed var(--line);border-radius:18px;color:var(--ink7);font-size:15px}\n.tip{position:fixed;pointer-events:none;z-index:50;background:var(--ink);color:var(--bg);font-size:12.5px;padding:7px 10px;border-radius:8px;max-width:260px;opacity:0;transition:opacity .12s}\n/* end */\n.end{margin:56px 0 0;background:var(--ink);color:var(--bg);border-radius:28px;padding:clamp(28px,5vw,56px);display:grid;grid-template-columns:minmax(0,1.4fr) minmax(0,1fr);gap:28px;align-items:center}\n.end h2{color:var(--bg)}\n.end p{color:var(--bg);opacity:.75;margin-top:10px}\n.end .btn.pri{background:var(--green);color:#232323}\n.endbtns{display:grid;grid-template-columns:1fr 1fr;gap:10px}.endbtns .btn{justify-content:center;text-align:center}.endbtns .btn.pri{grid-column:1/-1}\n.end .btn.sec{color:var(--bg);border-color:rgba(242,235,229,.3)}\n.foot{padding:28px 0 48px;font-size:13px;color:var(--ink5);display:flex;flex-wrap:wrap;gap:8px 24px;justify-content:space-between}\n.foot a{color:var(--ink7);cursor:pointer}\n/* method drawer */\ndialog{border:0;padding:0;border-radius:22px;max-width:760px;width:calc(100% - 24px);max-height:86vh;background:var(--paper);color:var(--ink);box-shadow:0 30px 80px rgba(0,0,0,.35)}\ndialog::backdrop{background:rgba(20,20,20,.45);backdrop-filter:blur(3px)}\n.dl{padding:28px;display:grid;gap:18px;overflow:auto;max-height:86vh}\n.dl h3{margin-top:4px}\n.dl p,.dl li{font-size:14.5px;color:var(--ink7)}\n.dl ul{margin:6px 0 0;padding-left:18px}\n.dl .x{position:sticky;top:0;justify-self:end;border:0;background:var(--soft);border-radius:999px;width:36px;height:36px;cursor:pointer;font-size:18px}\n.about3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}.about3 div{background:var(--soft);border-radius:14px;padding:14px}.about3 b{display:block;font-size:30px;letter-spacing:-.02em;line-height:1}.about3 span{font-size:13px;color:var(--ink7)}\n@media(max-width:600px){.about3{grid-template-columns:1fr}.endbtns{grid-template-columns:1fr}}\n.dl code{font-size:12.5px;background:var(--soft);padding:1px 6px;border-radius:5px}\n@media(max-width:900px){.kpis{grid-template-columns:1fr 1fr}.grid,.gaps{grid-template-columns:1fr}.end{grid-template-columns:1fr}}\n@media(max-width:1100px){.tab{flex:none}}\n@media(max-width:600px){.vsrow{grid-template-columns:1fr 84px}.vsrow .duo{grid-column:1/-1;grid-row:2}.bar{grid-template-columns:minmax(0,1fr) auto}.bar .tr{grid-column:1/-1;grid-row:2;height:20px}.phead{grid-template-columns:1fr}.phead p{grid-column:1}.stk .row{grid-template-columns:1fr}.navin{flex-wrap:wrap}.chipcat{order:-1}}\n@media(prefers-reduced-motion:reduce){.lane{animation:none}.card{opacity:1;transform:none;transition:none}.bar .tr i,.duo i,.stk .track span,.donut circle{transition:none}.hero .tag i{animation:none}}\n</style><div class=\"root\"><div class=\"wall\" aria-hidden=\"true\"><div class=\"lane\" id=\"lane1\"></div><div class=\"lane r\" id=\"lane2\"></div></div>\n  <p class=\"wallcap w\">The phrases hotel tech homepages repeat most, and how many companies use each one.</p>\n\n\n<section class=\"pick w\" id=\"pick\">\n  <p class=\"step\"><b>1</b><span class=\"kicker\">Start here</span></p>\n  <h2>What does your company sell?</h2>\n  <p class=\"muted\" style=\"margin-top:8px\">Every chart below compares companies in your category with the whole market.</p>\n  <div class=\"cats\" id=\"cats\"></div>\n</section>\n\n<section class=\"snap w\" id=\"snap\">\n  <div class=\"snaphead\">\n    <div><p class=\"step\"><b>2</b><span class=\"kicker\">Your snapshot</span></p><h2 id=\"snapTitle\">The whole market at a glance</h2></div>\n    <div class=\"legend\" id=\"snapLeg\"></div>\n  </div>\n  <div class=\"kpis\" id=\"kpis\"></div>\n  <div class=\"vs\" id=\"vs\"></div>\n</section>\n\n<nav class=\"nav\" aria-label=\"Research sections\">\n  <div class=\"w navin\">\n    <div class=\"tabs\" role=\"tablist\" id=\"tabs\"></div>\n    <button class=\"chipcat\" id=\"chip\" type=\"button\"></button>\n  </div>\n</nav>\n\n<main class=\"w\" id=\"panels\"></main>\n\n<section class=\"w\">\n  <div class=\"end\">\n    <div>\n      <h2>Turn what you learned into a clearer story</h2>\n      <p>StackNarrative helps hotel tech companies say what they do in a way buyers understand, and sound different from everyone else in their category.</p>\n    </div>\n    <div class=\"cta-row endbtns\" style=\"margin:0\">\n      <a class=\"btn pri\" href=\"https://stacknarrative.com/contact\" target=\"_blank\" rel=\"noopener\">Talk to us about your positioning</a>\n      <button class=\"btn sec\" type=\"button\" data-goto=\"pick\">Compare another category ↑</button>\n      <button class=\"btn sec\" type=\"button\" data-open=\"about\">About this research</button>\n      <button class=\"btn sec\" type=\"button\" data-open=\"method\">How we count</button>\n    </div>\n  </div>\n  <div class=\"foot\" id=\"foot\"></div>\n</section>\n\n<dialog id=\"method\"><div class=\"dl\" id=\"methodBody\"></div></dialog>\n<dialog id=\"about\"><div class=\"dl\" id=\"aboutBody\"></div></dialog>\n<div class=\"tip\" id=\"tip\" role=\"tooltip\"></div>\n\n</div>";
  {
{
const C = D.companies, L = D.labels, M = D.meta;
const MIN = 8;
const esc = s => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]));
const $ = id => R.getElementById(id);
const pct = (arr, f) => arr.length ? Math.round(arr.filter(f).length / arr.length * 100) : 0;
const count = (arr, f) => arr.filter(f).length;
const fmtDate = s => new Date(s + "T00:00:00").toLocaleDateString("en-US", {month: "long", year: "numeric"});
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
let cat = null;                       // selected category key, null = whole market
const mine = () => cat ? C.filter(c => c.cat === cat) : C;
const catLabel = () => cat ? L.cats[cat] : "Whole market";
const catCounts = Object.entries(C.reduce((o, c) => (o[c.cat] = (o[c.cat] || 0) + 1, o), {})).sort((a, b) => b[1] - a[1]);
const EN = arr => arr.filter(c => c.en);

/* ---------- icons ---------- */
const ICON = {
  hotel_pms: '<path d="M4 21V5l8-2 8 2v16"/><path d="M9 21v-4h6v4M8 8h1M12 8h1M16 8h-1M8 12h1M12 12h1M16 12h-1"/>',
  vacation_rental_software: '<path d="M3 11 12 4l9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-5h4v5"/>',
  distribution: '<circle cx="12" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/><path d="M12 7v5M12 12l-6 5M12 12l6 5"/>',
  revenue_pricing: '<path d="M4 19h16"/><path d="m5 15 4-4 3 3 7-7"/><path d="M15 7h4v4"/>',
  guest_experience: '<path d="M4 5h16v11H9l-5 4z"/><path d="M8 10h8M8 13h5"/>',
  marketing_crm: '<path d="M4 10v4h3l7 4V6L7 10z"/><path d="M18 9a4 4 0 0 1 0 6"/>',
  operations: '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4h6v3H9zM9 12l2 2 4-4M9 17h6"/>',
  payments_fintech: '<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M3 10h18M7 15h4"/>',
  access_inroom_tech: '<circle cx="8" cy="14" r="4"/><path d="m11 11 8-8M16 6l2 2M14 8l2 2"/>',
  workforce_training: '<circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 20c0-3 3-5 6-5s6 2 6 5M15 15c3 0 6 1.5 6 4.5"/>',
  data_integration: '<path d="M9 3v5M15 3v5M7 8h10v3a5 5 0 0 1-10 0z"/><path d="M12 16v5"/>',
  all: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>'
};
const svg = k => `<svg viewBox="0 0 24 24" aria-hidden="true">${ICON[k] || ICON.all}</svg>`;

/* ---------- hero ---------- */
const pills = D.phrases.slice(0, 36).map((p, i) => `<span class="pill${i % 7 === 0 ? " g" : ""}">${esc(p.p)}<small>${p.co.length} companies</small></span>`);
const half = Math.ceil(pills.length / 2);
$("lane1").innerHTML = pills.slice(0, half).join("").repeat(2);
$("lane2").innerHTML = pills.slice(half).join("").repeat(2);

/* ---------- step 1: categories ---------- */
const maxCat = catCounts[0][1];
const drawCats = () => {
  $("cats").innerHTML = `<button class="cat all" type="button" data-cat="" aria-pressed="${!cat}">${svg("all")}<span class="nm">Show the whole market</span><span class="ct">${C.length} companies</span></button>` +
    catCounts.map(([k, n]) => `<button class="cat" type="button" data-cat="${k}" aria-pressed="${cat === k}" ${n < MIN ? "disabled title=\"Too few companies to compare yet\"" : ""}>${svg(k)}<span class="nm">${esc(L.cats[k])}</span><span class="ct">${n} companies${n < MIN ? " · too few to compare yet" : ""}</span><span class="meter"><i style="width:${n / maxCat * 100}%"></i></span></button>`).join("");
};
$("cats").addEventListener("click", e => {
  const b = e.target.closest(".cat"); if (!b || b.disabled) return;
  setCat(b.dataset.cat || null, true);
});
const setCat = (k, scroll) => {
  cat = k; drawCats(); drawSnap(); drawChip(); drawPanel();
  if (scroll) $("snap").scrollIntoView({behavior: reduce ? "auto" : "smooth", block: "start"});
};

/* ---------- shared chart pieces ---------- */
const nLine = (arr, market = C.length) => `<div class="n"><span>${cat && arr ? `${esc(L.cats[cat])}: ${arr.length} companies · ` : ""}Whole market: ${market} companies · Read ${fmtDate(M.captured_to)}</span><a data-method>How we count</a></div>`;
const legend = () => cat ? `<div class="legend"><span><i style="background:var(--green)"></i>${esc(L.cats[cat])}</span><span><i style="background:var(--mk);opacity:.55"></i>Whole market</span></div>` : "";
// rows: [label, mineValue%, marketValue%, extra]
const duoBars = (rows, {unit = "%", sub = ""} = {}) => {
  const max = Math.max(1, ...rows.flatMap(r => [r[1], r[2]]));
  return `<div class="bars">${rows.map(([l, a, b, x]) => cat
    ? `<div class="bar"><span class="lab">${esc(l)}${x ? `<br><small class="muted">${esc(x)}</small>` : ""}</span><span class="tr"><i class="a" data-w="${a / max * 100}"></i><i class="b" data-w="${b / max * 100}"></i></span><span class="val"><b>${a}${unit}</b> · ${b}${unit}</span></div>`
    : `<div class="bar"><span class="lab">${esc(l)}${x ? `<br><small class="muted">${esc(x)}</small>` : ""}</span><span class="tr solo"><i class="b" data-w="${b / max * 100}"></i></span><span class="val"><b>${b}${unit}</b>${sub}</span></div>`).join("")}</div>`;
};
const soloBars = (rows, hlKey) => {     // rows: [key, label, value, valueText]
  const max = Math.max(1, ...rows.map(r => r[2]));
  return `<div class="bars">${rows.map(([k, l, v, t]) => `<div class="bar${k === hlKey ? " me" : ""}"><span class="lab">${esc(l)}</span><span class="tr solo"><i class="b${k === hlKey ? " hl" : ""}" data-w="${v / max * 100}"></i></span><span class="val">${t}</span></div>`).join("")}</div>`;
};
const PALETTE = ["var(--green)", "var(--mk)", "color-mix(in srgb,var(--mk) 55%,transparent)", "color-mix(in srgb,var(--mk) 28%,transparent)", "var(--soft)"];
const TEXTC = ["#232323", "var(--bg)", "var(--bg)", "var(--ink)", "var(--ink)"];
const stack = (keys, labels, groups) => {   // groups: [[name, arr, fn(c)->key]]
  const rows = groups.map(([name, arr, fn]) => {
    const tot = arr.length || 1;
    return `<div class="row"><span>${esc(name)}</span><span class="track">${keys.map((k, i) => {
      const v = Math.round(arr.filter(c => fn(c) === k).length / tot * 100);
      return `<span data-g="${v}" style="background:${PALETTE[i]};color:${TEXTC[i]};flex-grow:0" data-tip="${esc(labels[k])}: ${v}%">${v >= 7 ? v + "%" : ""}</span>`;
    }).join("")}</span></div>`;
  }).join("");
  return `<div class="stk">${rows}</div><div class="legend">${keys.map((k, i) => `<span><i style="background:${PALETTE[i]};${i === 4 ? "outline:1px solid var(--line)" : ""}"></i>${esc(labels[k])}</span>`).join("")}</div>`;
};
const donut = (parts, center, sub) => {   // parts: [[label, value, color]]
  const r = 50, L2 = 2 * Math.PI * r, tot = parts.reduce((a, p) => a + p[1], 0) || 1;
  let off = 0;
  const arcs = parts.map(([l, v, col]) => { const len = v / tot * L2; const s = `<circle r="${r}" cx="66" cy="66" stroke="${col}" data-len="${len}" data-off="${-off}" stroke-dasharray="0 ${L2}" stroke-dashoffset="${-off}"><title>${esc(l)}: ${Math.round(v / tot * 100)}%</title></circle>`; off += len; return s; }).join("");
  return `<div class="donut"><svg viewBox="0 0 132 132"><circle r="${r}" cx="66" cy="66" stroke="var(--soft)"></circle>${arcs}</svg><div class="ctr"><b>${center}</b></div><span class="cap">${esc(sub)}</span></div>`;
};
const card = (q, title, why, body, foot, wide) => `<article class="card${wide ? " wide" : ""}"><p class="q">${esc(q)}</p><h3>${title}</h3>${why ? `<p class="why">${why}</p>` : ""}${body}${foot}</article>`;
const top = (obj) => Object.entries(obj).sort((a, b) => b[1] - a[1]);
const shareBy = (arr, listFn) => { const o = {}; arr.forEach(c => [].concat(listFn(c)).forEach(v => o[v] = (o[v] || 0) + 1)); return o; };

/* ---------- step 2: snapshot ---------- */
const countUp = el => {
  const end = +el.dataset.v, suf = el.dataset.s || "";
  if (reduce) { el.textContent = end + suf; return; }
  const t0 = performance.now();
  const tick = t => { const k = Math.min(1, (t - t0) / 900); el.textContent = Math.round(end * (1 - Math.pow(1 - k, 3))) + suf; if (k < 1) requestAnimationFrame(tick); };
  requestAnimationFrame(tick);
};
const drawSnap = () => {
  const A = mine();
  const share = Math.round(A.length / C.length * 100);
  $("snapTitle").textContent = cat ? `${L.cats[cat]} vs the whole market` : "The whole market at a glance";
  $("snapLeg").innerHTML = legend();
  const k = [
    [A.length, "", cat ? "companies in your category" : "companies studied", cat ? `out of <b>${C.length}</b> in the market` : `out of <b>${M.tracked}</b> tracked so far`],
    [cat ? share : catCounts.length, cat ? "%" : "", cat ? "share of the market" : "product categories", cat ? `<b>#${catCounts.findIndex(x => x[0] === cat) + 1}</b> most crowded of ${catCounts.length}` : `largest: <b>${esc(L.cats[catCounts[0][0]])}</b>`],
    [pct(A, c => c.n >= 2), "%", "sell more than one product", cat ? `market: <b>${pct(C, c => c.n >= 2)}%</b>` : "e.g. PMS + booking engine"],
    [pct(A, c => c.ai !== "none"), "%", "mention AI on the homepage", cat ? `market: <b>${pct(C, c => c.ai !== "none")}%</b>` : `<b>${pct(C, c => c.ai === "headline")}%</b> put it in the headline`],
  ];
  $("kpis").innerHTML = k.map(([v, s, l, c]) => `<div class="kpi"><span class="v" data-v="${v}" data-s="${s}">0${s}</span><span class="l">${l}</span><span class="c">${c}</span></div>`).join("");
  R.querySelectorAll("#kpis .v").forEach(countUp);
  const rows = [
    ["Mention AI", A, c => c.ai !== "none"],
    ["Lead the headline with a business result", EN(A), c => c.lead === "outcome", EN(C)],
    ["Sell more than one type of product", A, c => c.n >= 2],
    ["Call themselves all-in-one", A, c => c.aio],
    ["Back claims with numbers or customer counts", A, c => c.num || c.cust],
  ];
  const HINT = {
    "Mention AI": "AI words anywhere on the homepage",
    "Lead the headline with a business result": "e.g. \"Grow direct bookings\" rather than a feature or slogan",
    "Sell more than one type of product": "e.g. a PMS plus a booking engine and channel manager",
    "Call themselves all-in-one": "\"all-in-one\", \"one platform\" or \"unified\" near the top",
    "Back claims with numbers or customer counts": "e.g. \"2,000+ hotels\" or \"30% more bookings\""
  };
  $("vs").innerHTML = rows.map(([l, arr, f, mk]) => {
    const a = pct(arr, f), b = pct(mk || C, f);
    return `<div class="vsrow"><span>${esc(l)}<small class="hint">${HINT[l] || ""}</small></span><span class="duo">${cat ? `<i class="a" style="width:0" data-w="${a}"></i><i class="b" style="width:0" data-w="${b}"></i>` : `<i class="b" style="width:0;top:6px;height:10px;opacity:1" data-w="${b}"></i>`}</span><span class="nums">${cat ? `<b>${a}%</b> · ${b}%` : `<b>${b}%</b>`}</span></div>`;
  }).join("");
  grow($("vs"));
};
const grow = root => requestAnimationFrame(() => requestAnimationFrame(() => {
  root.querySelectorAll("[data-w]").forEach(i => i.style.width = i.dataset.w + "%");
  root.querySelectorAll("[data-g]").forEach(s => s.style.flexGrow = Math.max(+s.dataset.g, 0.0001));
  root.querySelectorAll("circle[data-len]").forEach(c => { const L2 = 2 * Math.PI * 50; c.setAttribute("stroke-dasharray", `${c.dataset.len} ${L2}`); });
}));

/* ---------- sections ---------- */
const SECTIONS = [
  ["products", "Products & competitors", "Who sells what?"],
  ["promise", "What companies promise", "What results do they sell?"],
  ["language", "Website language", "Which words do they use?"],
  ["similar", "Positioning & similarity", "Who sounds alike?"],
  ["gaps", "Market gaps", "What is rarely said?"],
];
let tab = "products";
$("tabs").innerHTML = SECTIONS.map(([k, t, q], i) => `<button class="tab" role="tab" type="button" data-t="${k}" aria-selected="${k === tab}"><b><small>0${i + 1}</small>${t}</b><span>${q}</span></button>`).join("");
$("tabs").addEventListener("click", e => { const b = e.target.closest(".tab"); if (!b) return; tab = b.dataset.t; R.querySelectorAll(".tab").forEach(x => x.setAttribute("aria-selected", x === b)); drawPanel(); const y = R.querySelector(".nav").getBoundingClientRect().top + scrollY - (parseFloat(getComputedStyle(R.querySelector(".nav")).top) || 0); if (scrollY > y) scrollTo({top: y, behavior: reduce ? "auto" : "smooth"}); });
const drawChip = () => { const ch = $("chip"); ch.className = "chipcat" + (cat ? "" : " mk"); ch.textContent = cat ? `Comparing: ${L.cats[cat]} ✕` : "Pick your category"; };
$("chip").addEventListener("click", () => cat ? setCat(null) : $("pick").scrollIntoView({behavior: reduce ? "auto" : "smooth"}));

const P = {};
P.products = () => {
  const A = mine();
  const big = catCounts[0];
  const crowd = soloBars(catCounts.map(([k, n]) => [k, L.cats[k], n, `<b>${n}</b> · ${Math.round(n / C.length * 100)}%`]), cat);
  const rank = cat ? catCounts.findIndex(x => x[0] === cat) + 1 : 0;
  const t1 = cat ? `${esc(L.cats[cat])} is the #${rank} most crowded category, with ${A.length} companies` : `${esc(L.cats[big[0]])} is the most crowded category, with ${big[1]} companies`;
  // pairs
  const pairs = {};
  A.forEach(c => { const s = [...c.subs].sort(); for (let i = 0; i < s.length; i++) for (let j = i + 1; j < s.length; j++) { const k = s[i] + "|" + s[j]; pairs[k] = (pairs[k] || 0) + 1; } });
  const tp = top(pairs).slice(0, 7);
  const pairRows = tp.map(([k, n]) => [k, k.split("|").map(s => L.subs[s] || s).join(" + "), n, `<b>${n}</b> · ${Math.round(n / A.length * 100)}%`]);
  const t2 = tp.length ? `${esc(pairRows[0][1])} is the most common combination` : "Not enough product overlap to show";
  // multi
  const bucket = c => c.n <= 1 ? "one" : c.n <= 3 ? "few" : "many";
  const parts = arr => [["One product", count(arr, c => bucket(c) === "one"), "var(--soft)"], ["2–3 products", count(arr, c => bucket(c) === "few"), "var(--mk)"], ["4 or more", count(arr, c => bucket(c) === "many"), "var(--green)"]];
  const multiA = pct(A, c => c.n >= 2);
  const donuts = `<div class="donuts">${donut(parts(A), multiA + "%", cat ? L.cats[cat] : "Whole market")}${cat ? donut(parts(C), pct(C, c => c.n >= 2) + "%", "Whole market") : ""}<div class="legend" style="display:grid;gap:6px"><span><i style="background:var(--soft);outline:1px solid var(--line)"></i>One product</span><span><i style="background:var(--mk)"></i>2–3 products</span><span><i style="background:var(--green)"></i>4 or more</span></div></div>`;
  // segments
  const segKeys = Object.keys(L.segs);
  const segRows = segKeys.map(k => [L.segs[k], pct(A, c => c.segs.includes(k)), pct(C, c => c.segs.includes(k))]).sort((a, b) => (cat ? b[1] - a[1] : b[2] - a[2]));
  const t4 = `${esc(segRows[0][0])} are the customers mentioned most${cat ? ` by ${esc(L.cats[cat])} companies` : ""}`;
  return card("How crowded is it?", t1, "Companies grouped by the main product their homepage describes.", crowd, nLine(null)) +
    card("Specialist or all-in-one?", `${multiA}% ${cat ? `of ${esc(L.cats[cat])} companies` : "of companies"} sell more than one product`, "Count of the different product types each homepage names.", donuts, nLine(A)) +
    card("What gets sold together?", t2, `Product pairs named on the same homepage${cat ? `, within ${esc(L.cats[cat])}` : ""}.`, pairRows.length ? soloBars(pairRows) : `<p class="empty">Too few companies sell more than one product here.</p>`, nLine(A)) +
    card("Who are they selling to?", t4, "Share of homepages that mention each type of property anywhere on the page.", legend() + duoBars(segRows), nLine(A));
};
P.promise = () => {
  const A = mine();
  const benRows = Object.keys(L.bens).map(k => [L.bens[k], pct(A, c => c.bens.includes(k)), pct(C, c => c.bens.includes(k))]).sort((a, b) => (cat ? b[1] - a[1] : b[2] - a[2]));
  const lo = [...benRows].sort((a, b) => (cat ? a[1] - b[1] : a[2] - b[2]))[0];
  const t1 = `${esc(benRows[0][0])} is the most promised result. ${esc(lo[0])} is the rarest, at ${cat ? lo[1] : lo[2]}%`;
  const leadKeys = ["outcome", "technology", "feature", "problem", "other"];
  const AE = EN(A), CE = EN(C);
  const lo2 = pct(AE, c => c.lead === "outcome");
  const t2 = `${lo2}% ${cat ? `of ${esc(L.cats[cat])} headlines` : "of headlines"} lead with a business result`;
  const leadStack = stack(leadKeys, L.leads, cat ? [[L.cats[cat], AE, c => c.lead], ["Whole market", CE, c => c.lead]] : [["Whole market", CE, c => c.lead]]);
  const proofKey = c => c.cust ? "cust" : c.num ? "num" : "none";
  const pp = arr => [["Customer count", count(arr, c => proofKey(c) === "cust"), "var(--green)"], ["Other numbers", count(arr, c => proofKey(c) === "num"), "var(--mk)"], ["No numbers", count(arr, c => proofKey(c) === "none"), "var(--soft)"]];
  const none = pct(A, c => proofKey(c) === "none");
  const proof = `<div class="donuts">${donut(pp(A), (100 - none) + "%", cat ? L.cats[cat] : "Whole market")}${cat ? donut(pp(C), (100 - pct(C, c => proofKey(c) === "none")) + "%", "Whole market") : ""}<div class="legend" style="display:grid;gap:6px"><span><i style="background:var(--green)"></i>Customer count ("2,000+ hotels")</span><span><i style="background:var(--mk)"></i>Other numbers ("30% more")</span><span><i style="background:var(--soft);outline:1px solid var(--line)"></i>No numbers near the top</span></div></div>`;
  const BTN = {book_demo: "Book a demo", learn_more: "Learn more", other: "Other wording", none: "No clear button", sign_up: "Sign up / get started", free_trial: "Start a free trial", see_pricing: "See pricing", contact_sales: "Contact sales", download: "Download"};
  const btnRows = Object.keys(BTN).map(k => [BTN[k], pct(A, c => c.btn === k), pct(C, c => c.btn === k)]).filter(r => r[1] || r[2]).sort((a, b) => (cat ? b[1] - a[1] : b[2] - a[2])).slice(0, 7);
  return card("What do they promise?", t1, "Results promised in the title, headline and hero text.", legend() + duoBars(benRows), nLine(A), true) +
    card("Features or outcomes?", t2, "What the headline leads with, decided by written word rules.", leadStack, nLine(AE, CE.length + " English-language")) +
    card("Do they prove it?", `${none}% show no numbers near the top of the page`, "Customer counts or other figures in the headline and hero.", proof, nLine(A)) +
    card("What do they ask you to do?", `"${esc(btnRows[0][0])}" is the most common first button`, "The main button next to the headline.", legend() + duoBars(btnRows), nLine(A), true);
};
let langMode = "phrases";
P.language = () => {
  const A = mine(), AE = EN(A);
  const idx = new Set(AE.map(c => C.indexOf(c)));
  let body, title, why;
  if (langMode === "phrases") {
    const rows = D.phrases.map(p => ({p: p.p, co: p.co.filter(i => idx.has(i)).length, all: p.co.length, uses: p.uses})).filter(r => r.co >= (cat ? 2 : 3)).sort((a, b) => b.co - a.co || b.all - a.all).slice(0, 12);
    title = rows.length ? `"${esc(rows[0].p)}" is the phrase ${cat ? `${esc(L.cats[cat])} companies` : "companies"} repeat most` : "No repeated phrases yet";
    why = "Two- and three-word phrases in headlines and hero text. Bars show how many companies use each one; the gray figure shows total uses across the market.";
    body = soloBars(rows.map(r => [r.p, r.p, r.co, `<b>${r.co}</b> cos. · <span title="total uses in the market">${r.uses}×</span>`]));
  } else {
    const fam = langMode;
    const terms = D.terms.filter(t => t.family === fam).map(t => t.term);
    const rows = terms.map(t => [t, pct(A, c => c.termsAny.includes(t)), pct(C, c => c.termsAny.includes(t))]).filter(r => r[1] || r[2]).sort((a, b) => (cat ? b[1] - a[1] : b[2] - a[2])).slice(0, 10);
    title = rows.length ? `"${esc(rows[0][0])}" appears on ${cat ? rows[0][1] : rows[0][2]}% of homepages` : "None found";
    why = "Share of homepages using each word anywhere on the page.";
    body = legend() + duoBars(rows);
  }
  const modes = [["phrases", "Phrases"], ["hype", "Buzzwords"], ["ai", "AI words"], ["simplicity", "Simplicity"], ["action_verbs", "Action verbs"]];
  const seg = `<div class="seg" role="group" aria-label="Word type">${modes.map(([k, l]) => `<button type="button" data-lang="${k}" aria-pressed="${k === langMode}">${l}</button>`).join("")}</div>`;
  const aiKeys = ["headline", "hero", "lower", "none"];
  const aiLab = {headline: "In the headline", hero: "Just below it", lower: "Lower on the page", none: "Not at all"};
  const AIh = pct(A, c => c.ai === "headline");
  const aiStack = stack(aiKeys, aiLab, cat ? [[L.cats[cat], A, c => c.ai], ["Whole market", C, c => c.ai]] : [["Whole market", C, c => c.ai]]);
  const DESC = {platform: "Platform", software: "Software", solution: "Solution", system: "System", tool: "Tool", partner: "Partner", app: "App", suite: "Suite", none: "None of these"};
  const dRows = Object.keys(DESC).map(k => [DESC[k], pct(A, c => c.desc === k), pct(C, c => c.desc === k)]).filter(r => r[1] || r[2]).sort((a, b) => (cat ? b[1] - a[1] : b[2] - a[2])).slice(0, 7);
  return card("Which words repeat?", title, why, seg + body, nLine(AE, EN(C).length + " English-language"), true) +
    card("Where does AI show up?", `${AIh}% put AI in the headline; ${pct(A, c => c.ai === "none")}% never mention it`, "The highest place on the homepage where AI words appear.", aiStack, nLine(A)) +
    card("What do they call themselves?", `"${esc(dRows[0][0])}" is the favorite self-description`, "The word used most for the product in the title, headline and hero.", legend() + duoBars(dRows), nLine(A));
};
P.similar = () => {
  const keys = catCounts.filter(([, n]) => n >= MIN).map(([k]) => k);
  const S = (a, b) => D.sim[[a, b].sort().join("|")];
  const idxOf = k => (S(k, k) || 0) / D.sim_avg;
  const rank = keys.map(k => [k, L.cats[k], idxOf(k)]).sort((a, b) => b[2] - a[2]);
  const r = rank.map(([k, l, v]) => [k, l, v, `<b>${v.toFixed(1)}×</b>`]);
  const pos = cat ? rank.findIndex(x => x[0] === cat) + 1 : 0;
  const t1 = cat ? `${esc(L.cats[cat])} companies sound ${idxOf(cat).toFixed(1)}× more alike than two random companies (#${pos} of ${rank.length})` : `${esc(rank[0][1])} companies sound the most alike: ${rank[0][2].toFixed(1)}× more than two random companies`;
  const vals = keys.flatMap(a => keys.map(b => S(a, b) || 0));
  const max = Math.max(...vals), minv = Math.min(...vals.filter(v => v > 0));
  const short = k => L.cats[k].replace(" software", "").replace("Revenue management & pricing", "Revenue & pricing").replace("Locks & in-room tech", "Locks & in-room");
  let h = `<div class="heat" style="grid-template-columns:minmax(92px,auto) repeat(${keys.length},minmax(0,1fr))"><span></span>${keys.map(k => `<span class="h x${k === cat ? " me" : ""}">${esc(short(k))}</span>`).join("")}`;
  keys.forEach(a => {
    h += `<span class="h${a === cat ? " me" : ""}">${esc(short(a))}</span>`;
    keys.forEach(b => {
      const v = S(a, b) || 0, t = (v - minv) / (max - minv || 1), x = v / D.sim_avg;
      const hot = cat && (a === cat || b === cat);
      h += `<span class="c" style="background:color-mix(in srgb,${hot ? "var(--green)" : "var(--mk)"} ${Math.round(8 + Math.max(0, t) * 82)}%,transparent);color:${t > .55 ? (hot ? "#232323" : "var(--bg)") : "var(--ink)"}" data-tip="${esc(L.cats[a])} × ${esc(L.cats[b])}: ${x.toFixed(1)}× the average pair">${x.toFixed(1)}</span>`;
    });
  });
  h += "</div>";
  let bestPair = null;
  keys.forEach((a, i) => keys.slice(i + 1).forEach(b => { const v = S(a, b) || 0; if (!bestPair || v > bestPair[2]) bestPair = [a, b, v]; }));
  // generic
  const g = keys.map(k => { const arr = C.filter(c => c.cat === k && c.gen != null); return [k, L.cats[k], arr.reduce((a, c) => a + c.gen, 0) / (arr.length || 1)]; }).sort((a, b) => b[2] - a[2]);
  const gRows = g.map(([k, l, v]) => [k, l, v, `<b>${v.toFixed(1)}</b> per 100 words`]);
  // twins
  const A = mine().filter(c => c.twin != null);
  const tw = A.map(c => c.twin).sort((a, b) => a - b);
  const med = tw[tw.length >> 1] || 0;
  const bins = [[0, 10], [10, 15], [15, 20], [20, 25], [25, 30], [30, 101]];
  const binRows = bins.map(([lo, hi]) => [`${lo}–${hi > 100 ? 100 : hi}`, lo === 30 ? "30 or more (close look-alike)" : lo === 0 ? "Under 10 (very distinct)" : `${lo}–${hi}`, count(A, c => c.twin >= lo && c.twin < hi), ""]).map(r => [r[0], r[1], r[2], `<b>${r[2]}</b> · ${Math.round(r[2] / (A.length || 1) * 100)}%`]);
  const cA = card("Which categories sound most alike?", t1, "How much the headline and hero wording of companies in the same category overlaps. 1.0× = the overlap of two random companies.", soloBars(r, cat), nLine(null, M.similarity_n + " English-language"));
  const cB = card("Where do categories blur together?", cat ? `How ${esc(L.cats[cat])} wording overlaps with every other category` : `${esc(L.cats[bestPair[0]])} and ${esc(L.cats[bestPair[1]])} blur together the most`, "Higher numbers mean the two categories describe themselves with more of the same words. Hover a square for details.", h, nLine(null, M.similarity_n + " English-language"), true);
  const cC = card("Who leans on buzzwords?", `${esc(g[0][1])} homepages use the most buzzwords`, "Buzzwords (seamless, powerful, easy, AI-powered…) per 100 words of hero text.", soloBars(gRows, cat), nLine(null), true);
  const cD = card("Does each company have a look-alike?", `Half of ${cat ? esc(L.cats[cat]) + " companies" : "all companies"} share less than ${med}% wording with their closest match`, "Each company's overlap with the single most similar homepage in the market, from 0 (nothing shared) to 100 (identical).", soloBars(binRows), nLine(A, M.similarity_n + " English-language"));
  return cA + cD + cB + cC;
};
P.gaps = () => {
  const A = mine();
  const ok = cat && A.length >= MIN;
  const cards = [];
  if (ok) {
    const cand = [
      ...Object.keys(L.bens).map(k => ["Rarely promised", L.bens[k], pct(A, c => c.bens.includes(k)), pct(C, c => c.bens.includes(k)), "of homepages promise this"]),
      ...Object.keys(L.segs).map(k => ["Rarely addressed", L.segs[k], pct(A, c => c.segsHero.includes(k)), pct(C, c => c.segsHero.includes(k)), "name these customers near the top"]),
      ["Rarely proven", "Numbers or customer counts", pct(A, c => c.num || c.cust), pct(C, c => c.num || c.cust), "back claims with numbers"],
      ["Rarely outcome-led", "Headlines that lead with a result", pct(EN(A), c => c.lead === "outcome"), pct(EN(C), c => c.lead === "outcome"), "lead with a business result"],
    ].map(x => [...x, x[3] - x[2]]).filter(x => x[5] >= 15).sort((a, b) => b[5] - a[5]).slice(0, 6);
    cand.forEach(([t, l, a, b, verb]) => cards.push(`<div class="gap"><p class="t">${t}</p><p class="big">${esc(l)}</p><p class="muted" style="font-size:14px">Only <b>${a}%</b> of ${esc(L.cats[cat])} companies ${verb}, against <b>${b}%</b> of the whole market.</p><div class="mini">${duoMini(a, b)}</div></div>`));
  }
  // market-wide rarities (always shown)
  const benLow = Object.keys(L.bens).map(k => [L.bens[k], pct(C, c => c.bens.includes(k))]).sort((a, b) => a[1] - b[1]).slice(0, 2);
  const segLow = Object.keys(L.segs).map(k => [L.segs[k], pct(C, c => c.segsHero.includes(k))]).sort((a, b) => a[1] - b[1]).slice(0, 2);
  const market = [
    ["Least promised in the market", benLow[0][0], `Only <b>${benLow[0][1]}%</b> of homepages promise it. ${esc(benLow[1][0])} is next, at ${benLow[1][1]}%.`],
    ["Least addressed customers", segLow[0][0], `Only <b>${segLow[0][1]}%</b> of homepages name them near the top. ${esc(segLow[1][0])}: ${segLow[1][1]}%.`],
    ["Least used headline approach", L.leads.problem, `Only <b>${pct(EN(C), c => c.lead === "problem")}%</b> of headlines open with the problem the buyer has.`],
  ];
  const spec = [["Names a customer type near the top", c => c.spec.seg], ["Gives a result in numbers (\"30% more\")", c => c.spec.num], ["Names a concrete product in the headline", c => c.spec.cap]].map(([l, f]) => [l, pct(A, f), pct(C, f)]);
  return `${ok ? card("Your category", cards.length ? `Where ${esc(L.cats[cat])} companies say less than the market` : `${esc(L.cats[cat])} companies cover the same ground as the market`, cards.length ? "Themes at least 15 points less common in your category than in the whole market. These are less common in this sample, worth investigating, not proven opportunities." : "No theme is 15 or more points less common here than in the whole market.", cards.length ? `<div class="gaps">${cards.join("")}</div>` : "", nLine(A), true) : `<div class="empty card wide in" style="opacity:1;transform:none">Pick a category at the top to see where it says less than the market. Below are the gaps across the whole market.</div>`}` +
    card("Across the whole market", "What almost nobody says", "The least common themes across every homepage in this study.", `<div class="gaps">${market.map(([t, l, x]) => `<div class="gap"><p class="t">${esc(t)}</p><p class="big">${esc(l)}</p><p class="muted" style="font-size:14px">${x}</p></div>`).join("")}</div>`, nLine(null), true) +
    card("How specific are they?", `Only ${spec[1][1]}% ${cat ? `of ${esc(L.cats[cat])} companies ` : ""}put a number on the result they promise`, "Specific homepages name who they serve, give a number and name the product.", legend() + duoBars(spec), nLine(A), true);
};
const duoMini = (a, b) => `<div class="duo" style="height:22px"><i class="a" style="width:0" data-w="${a}"></i><i class="b" style="width:0" data-w="${b}"></i></div>`;

const drawPanel = () => {
  const s = SECTIONS.findIndex(x => x[0] === tab);
  const [k, t, q] = SECTIONS[s];
  const intro = {
    products: "How crowded each category is, what gets bundled together, and which customers companies go after.",
    promise: "The results companies sell beyond the software, and whether they lead with outcomes or features.",
    language: "The phrases, buzzwords and self-descriptions that repeat across homepages.",
    similar: "How much companies in the same category sound like each other, and like other categories.",
    gaps: "Themes, customers and proof points that few homepages mention.",
  }[k];
  $("panels").innerHTML = `<section class="panel" role="tabpanel"><div class="phead"><span class="no">0${s + 1}</span><h2>${q}</h2><p class="muted">${intro}</p></div><div class="grid">${P[k]()}</div></section>`;
  const cards = $("panels").querySelectorAll(".card");
  cards.forEach((c, i) => setTimeout(() => c.classList.add("in"), reduce ? 0 : 70 * i));
  grow($("panels"));
};
$("panels").addEventListener("click", e => {
  const b = e.target.closest("[data-lang]"); if (!b) return;
  langMode = b.dataset.lang; drawPanel();
});

/* ---------- tooltip ---------- */
const tip = $("tip");
R.addEventListener("pointermove", e => {
  const t = e.target.closest("[data-tip]");
  if (!t) { tip.style.opacity = 0; return; }
  tip.textContent = t.dataset.tip; tip.style.opacity = 1;
  const x = Math.min(innerWidth - tip.offsetWidth - 8, e.clientX + 14);
  tip.style.left = x + "px"; tip.style.top = (e.clientY + 16) + "px";
});

/* ---------- method ---------- */
const plain = w => w.replace(/\b|\u0008/g, "").replace(/\[([a-z])([a-z])\]/g, "$1/$2").replace(/\(([^)]*)\)/g, (m, x) => x.split("|").join(" / ")).replace(/([a-z])s\?/g, "$1(s)").replace(/\?/g, "").trim();
const words = v => v.map(plain).filter(Boolean).join(" · ");
const list = o => Object.entries(o).map(([k, v]) => `<li><b>${esc(k)}</b>: ${esc(words(v))}</li>`).join("");
$("methodBody").innerHTML = `<button class="x" type="button" aria-label="Close" data-close>✕</button>
  <div><p class="kicker">How we count</p><h2 style="margin-top:6px">Every number comes from written rules</h2></div>
  <p>We read the public homepages of ${M.studied} hospitality tech companies in ${fmtDate(M.captured_to)}, out of ${M.tracked} companies we track. A company is included once its homepage is confirmed as hospitality tech and its main product is clear. Nobody, human or AI, scores or rates any company.</p>
  <div><h3>Categories</h3><p>Each company's main category comes from the product words on its homepage, weighted by where they appear (title and headline count most). Categories with fewer than ${MIN} companies are listed but not compared.</p></div>
  <div><h3>Customers they target</h3><ul>${list(Object.fromEntries(Object.entries(D.rules.segments).map(([k, v]) => [L.segs[k], v])))}</ul></div>
  <div><h3>Results they promise</h3><p>Looked for in the title, meta description, headline, subheadline and hero text.</p><ul>${list(Object.fromEntries(Object.entries(D.rules.benefits).map(([k, v]) => [L.bens[k], v])))}</ul></div>
  <div><h3>What the headline leads with</h3><p>The headline and subheadline get the first type that matches, in this order. Anything else counts as a brand line or slogan. English homepages only.</p><ul>${D.rules.lead.map(r => `<li><b>${esc(L.leads[r.type])}</b>: ${esc(words(r.words))}</li>`).join("")}</ul></div>
  <div><h3>Phrases and words</h3><p>Phrases are two- and three-word sequences in headline and hero text, shown only when at least 3 companies use them. We always show both the number of companies using a phrase and its total uses. Company names are removed first.</p></div>
  <div><h3>How alike they sound</h3><p>Each homepage's headline and hero text becomes a weighted word list (rare shared words count more than common ones). Every pair of companies is compared, and categories are scored against the average pair across the market (${M.similarity_n} English homepages with enough text).</p></div>
  <div><h3>What is not included yet</h3><p>Company names appear once every homepage has been verified. Non-English homepages (${M.studied - M.english}) are left out of word and headline counts. Change over time will appear after the next reading.</p></div>`;
R.addEventListener("click", e => {
  const g = e.target.closest("[data-goto]");
  if (g) { $(g.dataset.goto).scrollIntoView({behavior: reduce ? "auto" : "smooth", block: "start"}); return; }
  const o = e.target.closest("[data-method],[data-open]");
  if (o) { e.preventDefault(); $(o.dataset.open || "method").showModal(); return; }
  const d = e.target.closest("dialog");
  if (e.target.closest("[data-close]") || (d && e.target === d)) d.close();
});
$("aboutBody").innerHTML = `<button class="x" type="button" aria-label="Close" data-close>✕</button>
  <div><p class="kicker">About this research</p><h2 style="margin-top:6px">A map of how hotel tech talks about itself</h2></div>
  <p>Every hotel tech company says it saves time, grows revenue and delights guests. This research shows how many actually say it, so you can see where you blend in and where you could stand out.</p>
  <div class="about3">
    <div><b>${M.studied}</b><span>homepages read, word by word</span></div>
    <div><b>${catCounts.length}</b><span>product categories compared</span></div>
    <div><b>0</b><span>ratings, rankings or paid placements</span></div>
  </div>
  <div><h3>Who it's for</h3><p>Founders, marketing leads and product marketers at hospitality tech companies who are deciding how to describe their product, which category to compete in, or what to say on their homepage.</p></div>
  <div><h3>How to use it</h3><ul><li><b>Pick your category</b> at the top of the page. Every chart then compares it with the whole market.</li><li><b>Read the headlines on each chart.</b> Each one states the finding, so you can skim.</li><li><b>Finish with Market gaps.</b> It lists the themes your category mentions less than everyone else.</li></ul></div>
  <div><h3>What makes it different</h3><p>It's pure data from public homepages. We don't review products, score vendors or take payment to be listed. Every number comes from written rules that anyone can check under "How we count".</p></div>
  <div><h3>What's coming next</h3><ul><li>Company names, once every homepage has been verified.</li><li>Change over time, after the next reading of every homepage.</li><li>More companies: we track ${M.tracked} and add homepages as they're confirmed.</li></ul></div>
  <div class="cta-row" style="margin-top:0"><a class="btn pri" href="https://stacknarrative.com/contact" target="_blank" rel="noopener">Talk to us about your positioning</a><button class="btn sec" type="button" data-close>Back to the data</button></div>`;
$("foot").innerHTML = `<span>© StackNarrative · State of Hotel Tech Brands 2027 · ${M.studied} homepages read in ${fmtDate(M.captured_to)}</span><span>Company names appear after verification · <a data-method>How we count</a></span>`;

drawCats(); drawSnap(); drawChip(); drawPanel();
}
}
})();
