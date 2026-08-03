# -*- coding: utf-8 -*-
"""互動教學頁產生器（整合式，參考 math interactive.html 編排，圖文並茂）。
每節輸出 <冊>/<code>_互動教學.html，分頁區塊：
  🎯 學習目標 · 📽 簡報翻頁器(嵌入該節簡報,含SVG圖解) · 📊 資訊圖表(嵌入)
  · ⚠️ 迷思破解(翻牌) · 🎮 闖關自測(翻卡計分,分三難度)
簡報/資訊圖直接沿用成品內容 → 圖文並茂。"""
import os, glob, importlib.util, json, html

GEN = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.dirname(GEN)
def load(n):
    s = importlib.util.spec_from_file_location(n, os.path.join(GEN, n+'.py'))
    m = importlib.util.module_from_spec(s); s.loader.exec_module(m); return m
slides_mod = load('slides'); autobuild = load('autobuild'); mcq = load('mcq')
EXTRA = {}
for p in sorted(glob.glob(os.path.join(GEN,'quiz_extra_*.py'))): EXTRA.update(load(os.path.basename(p)[:-3]).EXTRA)
BOOK = {'a':'生物','b':'八上','c':'八下','d':'九上','e':'九下'}
GRADE = {'a':'七年級·生物','b':'八年級上·理化','c':'八年級下·理化','d':'九年級上·理化＋地科','e':'九年級下·理化＋地科'}
def esc(x): return html.escape(str(x))

# 每節對應的 canvas 模擬類型（依 L['code']）；未列者用互動配對 match
SIMMAP = {
 '八上3-1':'wave','八上3-3':'wave',
 '八上3-2':'echo','八上3-4':'echo',
 '八上1-4':'density','八下6-4':'density',
 '八下3-2':'ph','八下3-3':'ph',
 '八下4-1':'rate','八下4-2':'rate',
 '九上1-1':'motion','九上1-2':'motion','九上1-3':'motion',
 '九上2-2':'fma',
 '九上4-3':'ohm','九下1-2':'ohm',
 '九上4-2':'circuit','九下1-1':'circuit',
 '九下2-1':'magnet','九下2-2':'magnet','九下2-3':'magnet','九下2-4':'magnet',
 '生物6-1':'punnett','生物6-2':'punnett',
 '八上4-2':'lens','八上4-4':'lens',
 '九上7-2':'moon','九上7-1':'season',
 '生物2-2':'photosyn','八上2-4':'concentration',
 '八上5-3':'heat','八上5-4':'heatcurve',
 '八下6-2':'friction','八下6-3':'pressure',
 '八下2-2':'activity','八下2-3':'activity',
 '九上2-3':'newton','九上3-2':'energy',
 '八下1-2':'conserve','八下6-1':'force',
 '九上2-1':'inertia','九上3-1':'work','九上3-3':'energy',
 '九上4-1':'static','九上6-1':'plate','九上5-1':'watercycle',
 '生物8-1':'predprey',
 '八上5-2':'heatcap','九上2-4':'gravity','九上6-2':'seismic',
 '九上7-3':'solar','生物8-2':'energyflow','生物2-1':'enzyme',
 '八上4-1':'reflect','八上4-3':'color','八下3-1':'electrolyte',
 '八下4-3':'equilibrium','生物3-2':'circulation','生物5-1':'mitosis',
 '八上6-1':'atom','八下2-1':'oxidation','九下3-3':'front',
 '九下4-2':'tide','生物3-1':'transpiration','生物7-1':'selection',
 '八上2-3':'separate','九上5-2':'rockcycle','九下4-1':'greenhouse',
 '生物4-1':'reflex','生物2-3':'digest','九下3-1':'aircurrent',
 '八下1-4':'thermochem','九上5-3':'erosion','九上6-3':'strata',
 '生物4-3':'homeostasis','九下3-2':'humidity',
 '八上5-1':'thermometer','八上1-2':'measure','八上6-2':'periodic',
 '八下1-3':'mole','生物1-2':'cell','生物3-3':'immune',
 '八下1-1':'chemeq','生物1-3':'levels','生物5-2':'repro',
 '八下5-1':'organic','生物7-2':'classify','八上1-3':'massbalance',
 '八上1-1':'scimethod','八上2-1':'property','八上2-2':'puremix',
 '八上6-3':'puremix','八上6-4':'puremix','八下5-2':'organic','八下5-3':'organic',
 '九上3-4':'energysource','九下1-3':'household','九下4-3':'sustain',
 '生物1-1':'lifechar','生物4-2':'endocrine','生物5-3':'repro',
 '生物6-3':'mutation','生物8-3':'biodiversity',
}
SIMNAME = {'wave':'波形模擬器','density':'浮沉模擬','ph':'酸鹼中和模擬','rate':'反應速率碰撞模擬',
 'motion':'運動 v-t 模擬','fma':'F=ma 模擬','ohm':'歐姆定律電路模擬','magnet':'電磁鐵模擬',
 'punnett':'遺傳棋盤模擬','lens':'凸透鏡成像模擬','moon':'月相盈虧模擬','season':'季節成因模擬',
 'photosyn':'光合作用速率模擬','circuit':'電路通路模擬','concentration':'溶液濃度模擬',
 'heat':'熱傳播模擬','heatcurve':'加熱曲線模擬','echo':'回聲測距模擬','friction':'摩擦力模擬',
 'pressure':'壓力模擬','activity':'金屬活性置換模擬','newton':'作用反作用模擬','energy':'力學能守恆模擬',
 'conserve':'質量守恆天平模擬','force':'合力向量模擬','inertia':'慣性(牛頓第一)模擬','work':'功與功率模擬',
 'static':'靜電相吸相斥模擬','plate':'板塊運動模擬','watercycle':'水循環模擬','predprey':'掠食者-獵物模擬',
 'heatcap':'熱量與比熱模擬','gravity':'萬有引力模擬','seismic':'地震波模擬','solar':'太陽系公轉模擬',
 'energyflow':'能量金字塔模擬','enzyme':'酵素活性模擬',
 'reflect':'光反射定律模擬','color':'色光混合模擬','electrolyte':'電解質導電模擬','equilibrium':'化學平衡模擬',
 'circulation':'血液循環模擬','mitosis':'細胞分裂模擬',
 'atom':'原子電子殼層模擬','oxidation':'氧化燃燒模擬','front':'天氣鋒面模擬','tide':'潮汐模擬',
 'transpiration':'蒸散作用模擬','selection':'天擇演化模擬',
 'separate':'混合物分離模擬','rockcycle':'岩石循環模擬','greenhouse':'溫室效應模擬','reflex':'反射弧模擬',
 'digest':'消化吸收模擬','aircurrent':'高低氣壓與風模擬',
 'thermochem':'放熱吸熱反應模擬','erosion':'地表侵蝕堆積模擬','strata':'地層與化石模擬',
 'homeostasis':'恆定性負回饋模擬','humidity':'大氣中的水模擬',
 'thermometer':'溫度計三溫標模擬','measure':'尺的測量估讀模擬','periodic':'週期表結構模擬','mole':'莫耳換算模擬',
 'cell':'細胞構造模擬','immune':'免疫反應模擬',
 'chemeq':'化學式配平模擬','levels':'組成層次模擬','repro':'有性無性生殖模擬','organic':'有機物碳骨架模擬',
 'classify':'生物分類檢索模擬','massbalance':'天平測質量模擬',
 'scimethod':'科學方法流程模擬','property':'物理化學變化模擬','puremix':'純物質與混合物模擬','energysource':'能源與能量轉換模擬',
 'household':'家庭用電安全模擬','sustain':'資源永續模擬','lifechar':'生物特徵模擬','endocrine':'血糖調節模擬',
 'mutation':'基因突變模擬','biodiversity':'生物多樣性模擬',
 'match':'概念互動配對'}

HUB_CSS = """
:root{--board:#1a2e1a;--chalk:#f4f1e8;--yellow:#f0d878;--blue:#9fc8d8;--red:#e8a0a0;--green:#a8d0a0;--purple:#c4a8d8;}
*{box-sizing:border-box}
body{margin:0;background:#0d1410;color:#f4f1e8;font-family:'Noto Sans TC',system-ui,sans-serif;line-height:1.7}
.top{position:sticky;top:0;z-index:30;background:#16241c;border-bottom:2px solid #f0d878;padding:12px 16px}
.top h1{font-size:19px;color:#f0d878;margin:0}.top .g{font-size:12px;color:#9fc8d8}
.tabs{display:flex;gap:7px;margin-top:10px;flex-wrap:wrap}
.tab{cursor:pointer;font-size:13.5px;padding:6px 13px;border-radius:20px;border:1px solid rgba(159,200,216,.4);color:#9fc8d8;background:none}
.tab.on{background:#f0d878;color:#16241c;border-color:#f0d878;font-weight:700}
.wrap{max-width:1000px;margin:0 auto;padding:20px 14px 70px}
.pane{display:none}.pane.on{display:block;animation:fade .3s}
@keyframes fade{from{opacity:0;transform:translateY(6px)}to{opacity:1}}
.hint{text-align:center;color:rgba(244,241,232,.5);font-size:12px;margin:4px 0 14px}
/* 學習目標 */
.goals{display:grid;grid-template-columns:1fr 1fr;gap:12px}
@media(max-width:560px){.goals{grid-template-columns:1fr}}
.goal{background:var(--board);border:1px solid rgba(240,216,120,.25);border-radius:12px;padding:16px 18px}
.goal .ic{font-size:26px}.goal b{color:#f0d878;display:block;margin:6px 0 4px;font-size:16px}
.goal span{font-size:13.5px;color:rgba(244,241,232,.85)}
.leadbox{background:var(--board);border-left:4px solid var(--blue);border-radius:8px;padding:14px 16px;margin-bottom:16px;font-size:14.5px}
/* 簡報翻頁器 */
.deck{position:relative}
.slidebox{background:var(--board);border-radius:12px;border:1px solid rgba(240,216,120,.2);min-height:440px;padding:34px 32px;display:flex;flex-direction:column;justify-content:center}
.slidebox h1{font-family:'Noto Serif TC',serif;font-size:30px;color:#f4f1e8;margin:0 0 8px}
.slidebox h2{font-family:'Noto Serif TC',serif;font-size:24px;color:var(--yellow);margin:0 0 16px;border-bottom:2px solid rgba(240,216,120,.3);padding-bottom:8px}
.slidebox .eyebrow{color:var(--yellow);font-size:12px;letter-spacing:3px;margin-bottom:10px}
.slidebox p{font-size:17px;margin:8px 0}.slidebox ul{margin:6px 0;padding-left:6px}
.slidebox li{font-size:16px;line-height:1.9;list-style:none;padding-left:24px;position:relative}
.slidebox li::before{content:'▹';position:absolute;left:2px;color:var(--yellow)}
.slidebox .lead{font-size:19px;color:var(--blue)}
.slidebox .big-center{align-items:center;text-align:center}
.box,.box-b{background:rgba(159,200,216,.1);border:1px solid rgba(159,200,216,.3);border-radius:8px;padding:14px 18px;margin:10px 0;font-size:16px}
.box.y{background:rgba(240,216,120,.1);border-color:rgba(240,216,120,.3)}
.box.r{background:rgba(232,160,160,.1);border-color:rgba(232,160,160,.3)}
.eg{background:rgba(0,0,0,.22);border-radius:8px;padding:14px 18px;margin:10px 0;font-size:16px}.eg .q{color:var(--blue);margin-bottom:6px}
.tbl{width:100%;border-collapse:collapse;margin:10px 0;font-size:15px}.tbl th,.tbl td{border:1px solid rgba(244,241,232,.2);padding:8px 12px;text-align:center}.tbl th{background:rgba(240,216,120,.15);color:var(--yellow)}
.hl{color:var(--yellow);font-weight:700}.hl-b{color:var(--blue);font-weight:700}.hl-r{color:var(--red);font-weight:700}
.nav{display:flex;align-items:center;justify-content:center;gap:16px;margin-top:14px}
.nav button{cursor:pointer;background:#f0d878;color:#16241c;border:none;border-radius:8px;padding:8px 18px;font-weight:700;font-size:15px}
.nav button:disabled{opacity:.35;cursor:default}.nav .pg{color:#9fc8d8;font-size:14px}
/* 資訊圖 */
.info{background:var(--board);border:1px solid rgba(240,216,120,.15);border-radius:12px;aspect-ratio:16/9;padding:30px 36px;margin:14px 0;display:flex;flex-direction:column;color:var(--chalk);overflow:hidden}
.info .ititle{font-family:'Noto Serif TC',serif;font-size:26px;font-weight:900;margin-bottom:4px}
.info .isub{font-size:14px;color:var(--blue);margin-bottom:18px}
/* 迷思翻牌 */
.grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}@media(max-width:560px){.grid{grid-template-columns:1fr}}
.flip{height:130px;perspective:900px;cursor:pointer}.flip .in{position:relative;width:100%;height:100%;transition:transform .5s;transform-style:preserve-3d}
.flip.f .in{transform:rotateY(180deg)}.flip .fr,.flip .bk{position:absolute;inset:0;backface-visibility:hidden;border-radius:10px;padding:14px;display:flex;align-items:center;justify-content:center;text-align:center;font-size:14.5px}
.flip .fr{background:rgba(232,160,160,.15);border:1px solid rgba(232,160,160,.5);color:#f4d0d0}
.flip .bk{background:rgba(168,208,160,.15);border:1px solid rgba(168,208,160,.5);color:#d0e8c8;transform:rotateY(180deg)}
.flip .tag{position:absolute;top:8px;left:10px;font-size:11px;opacity:.7}
/* 闖關 */
.lv{display:flex;gap:8px;justify-content:center;margin-bottom:14px;flex-wrap:wrap}
.lv button{cursor:pointer;font-size:13px;padding:6px 14px;border-radius:8px;border:1px solid rgba(159,200,216,.4);background:none;color:#9fc8d8}
.lv button.on{background:#9fc8d8;color:#16241c;font-weight:700}
.qcard{background:var(--board);border:1px solid rgba(240,216,120,.25);border-radius:14px;padding:26px 20px;min-height:190px;display:flex;flex-direction:column;justify-content:center;text-align:center;position:relative}
.qcard .qn{font-size:12px;color:#9fc8d8;position:absolute;top:12px;left:16px}
.qcard .q{font-size:19px;margin:10px 0}.qcard .ans{font-size:22px;color:#f0d878;font-weight:700;margin:8px 0}.qcard .ex{font-size:13px;color:rgba(244,241,232,.7)}
.opts2{display:flex;flex-direction:column;gap:8px;margin:14px 0 4px;text-align:left}
.optbtn{cursor:pointer;font-family:inherit;font-size:15px;text-align:left;padding:10px 14px;border-radius:10px;border:1px solid rgba(159,200,216,.3);background:rgba(159,200,216,.05);color:var(--chalk)}
.optbtn:hover{background:rgba(159,200,216,.14)}.optbtn .ok-k{color:#9fc8d8;font-weight:700;margin-right:4px}
.optbtn.good{background:rgba(168,208,160,.2);border-color:#a8d0a0}.optbtn.good .ok-k{color:#a8d0a0}
.optbtn.bad{background:rgba(232,160,160,.2);border-color:#e8a0a0}.optbtn.bad .ok-k{color:#e8a0a0}
.nextb{cursor:pointer;margin-top:12px;background:#f0d878;color:#16241c;border:none;border-radius:9px;padding:8px 20px;font-weight:700;font-family:inherit}
.reveal{cursor:pointer;color:#9fc8d8;font-size:14px;margin-top:10px;text-decoration:underline}
.mk{display:flex;gap:10px;justify-content:center;margin-top:14px}.mk button{cursor:pointer;font-size:15px;padding:8px 22px;border-radius:10px;border:none;font-weight:700}.mk .y{background:#a8d0a0;color:#16241c}.mk .n{background:#e8a0a0;color:#16241c}
.bar{height:8px;background:rgba(255,255,255,.1);border-radius:4px;margin:16px 0 6px;overflow:hidden}.bar>i{display:block;height:100%;background:#f0d878;width:0;transition:width .3s}
.score{text-align:center;font-size:14px;color:#9fc8d8}
.done{text-align:center;padding:30px}.done .big{font-size:40px;color:#f0d878;font-weight:900}.done button{margin-top:16px;cursor:pointer;background:#f0d878;color:#16241c;border:none;border-radius:10px;padding:10px 24px;font-weight:700;font-size:15px}
.foot{text-align:center;color:rgba(244,241,232,.4);font-size:12px;padding:20px}
/* 行動裝置優化 */
@media(max-width:640px){
 .top h1{font-size:16.5px}.top .g{font-size:11px}
 .tab{font-size:12.5px;padding:8px 12px;min-height:40px}
 .slidebox{padding:22px 18px;min-height:340px}
 .slidebox h1{font-size:23px}.slidebox h2{font-size:19px}
 .slidebox p,.slidebox li{font-size:15px}
 .nav button{padding:10px 16px;min-height:44px;min-width:44px}
 .opts2{gap:10px}.optbtn{padding:13px 14px;font-size:15.5px;min-height:44px}
 .lv button{padding:9px 14px;min-height:42px}
 #simhost button{padding:9px 14px!important;font-size:14px!important;min-height:42px}
 #simhost input[type=range]{height:28px;width:100%!important;max-width:220px}
 #simhost label{display:inline-flex;align-items:center;gap:6px;min-height:38px}
 .qcard{padding:20px 16px}
}
"""

JS = """
document.querySelectorAll('.tab').forEach(t=>t.onclick=()=>{
  document.querySelectorAll('.tab').forEach(x=>x.classList.remove('on'));
  document.querySelectorAll('.pane').forEach(x=>x.classList.remove('on'));
  t.classList.add('on');document.getElementById(t.dataset.s).classList.add('on');});
document.querySelectorAll('.flip').forEach(f=>f.onclick=()=>f.classList.toggle('f'));
// 簡報翻頁
let si=0; const SL=document.querySelectorAll('.slidebox .slide-inner');
function showSlide(i){si=Math.max(0,Math.min(SL.length-1,i));
  document.querySelectorAll('.slidebox .slide-inner').forEach((s,k)=>s.style.display=k===si?'block':'none');
  document.getElementById('pg').textContent=(si+1)+' / '+SL.length;
  document.getElementById('pv').disabled=si===0;document.getElementById('nx').disabled=si===SL.length-1;}
window.showSlide=showSlide;
document.addEventListener('keydown',e=>{if(document.getElementById('slides').classList.contains('on')){if(e.key==='ArrowRight')showSlide(si+1);if(e.key==='ArrowLeft')showSlide(si-1);}});
// 闖關（四選一單選）
const QUIZ=window.__QUIZ__; let lvl='基礎卷', idx=0, right=0, pool=[], answered=false;
function start(l){lvl=l;pool=QUIZ.filter(q=>q.lv===l);idx=0;right=0;answered=false;
  document.querySelectorAll('.lv button').forEach(b=>b.classList.toggle('on',b.dataset.l===l));grender();}
function grender(){const box=document.getElementById('gamebox');
  if(idx>=pool.length){if(window.JHS)JHS.saveScore(window.__CODE__,window.__TITLE__,lvl,right,pool.length);
    box.innerHTML='<div class="done"><div class="big">'+right+'/'+pool.length+'</div><p>'+(right/pool.length>=0.8?'太強了！🎉':right/pool.length>=0.5?'不錯，再複習弱點 💪':'多看幾次觀念再來 📖')+'</p><button onclick="start(lvl)">再挑戰一次</button></div>';return;}
  const q=pool[idx];answered=false;
  const opts=q.opts.map((o,k)=>'<button class="optbtn" data-k="'+k+'" onclick="choose('+k+')"><span class="ok-k">('+String.fromCharCode(65+k)+')</span> '+o+'</button>').join('');
  box.innerHTML='<div class="qcard"><div class="qn">'+lvl+' '+(idx+1)+'/'+pool.length+'</div><div class="q">'+q.q+'</div><div class="opts2">'+opts+'</div><div id="fb"></div></div><div class="bar"><i style="width:'+(idx/pool.length*100)+'%"></i></div><div class="score">已答對 '+right+' 題</div>';}
function choose(k){if(answered)return;answered=true;const q=pool[idx];
  const btns=document.querySelectorAll('#gamebox .optbtn');
  btns[q.ci].classList.add('good');if(k!==q.ci)btns[k].classList.add('bad');
  if(k===q.ci){right++;if(window.JHS)JHS.removeWrongByKey(window.__CODE__,lvl,q.q);}
  else if(window.JHS)JHS.addWrong(window.__CODE__,window.__TITLE__,lvl,q.q,q.opts,q.ci,k,q.e);
  const head=k===q.ci?'✔ 答對！':'✗ 正解 ('+String.fromCharCode(65+q.ci)+') '+q.opts[q.ci];
  document.getElementById('fb').innerHTML='<div class="ans" style="font-size:16px">'+head+'</div><div class="ex">解析：'+q.e+'</div><button class="nextb" onclick="next()">'+(idx+1>=pool.length?'看得分 ›':'下一題 ›')+'</button>';}
function next(){idx++;grender();}
window.start=start;window.choose=choose;window.next=next;
showSlide(0);start('基礎卷');
"""
GOAL_IC = ['🎯','🔬','⚗️','🌱','💡','📐']

def build(L, runcode):
    if not L.get('slides'): autobuild.build(L)
    quiz = {k:list(v) for k,v in L['quiz'].items()}
    if runcode in EXTRA:
        for sh,qs in EXTRA[runcode].items(): quiz[sh]=quiz.get(sh,[])+list(qs)
    _M = mcq.build(quiz, L['code'])
    qjs=[{'q':it['q'],'opts':it['opts'],'ci':it['ci'],'a':it['a'],'e':it['e'],'lv':sh} for sh,items in _M.items() for it in items]
    bk=runcode[0]
    goals=''.join(f'<div class="goal"><div class="ic">{GOAL_IC[i%len(GOAL_IC)]}</div><b>{esc(t["name"])}</b><span>{esc("、".join(t["points"][:2]))}</span></div>' for i,t in enumerate(L['themes']))
    slides=''.join(f'<div class="slide-inner" style="display:none">{s["html"]}</div>' for s in L['slides'])
    infos=''.join(f'<div class="info"><div class="ititle">{esc(c["title"])}</div><div class="isub">{esc(c["sub"])}</div>{c["body"]}</div>' for c in L.get('infographics',[]))
    flips=''.join(f'<div class="flip"><div class="in"><div class="fr"><span class="tag">迷思 ✗</span>{esc(m[0])}</div><div class="bk"><span class="tag">正確 ✓</span>{esc(m[1])}</div></div></div>' for m in L.get('misconceptions',[]))
    simtype=SIMMAP.get(L['code'],'match')
    # match 用主題名↔核心重點 當配對題（不足補生活連結）
    pairs=[[t['name'], t['points'][0]] for t in L['themes']]
    pairs+=[[x[0], x[1]] for x in L.get('life',[])]
    simparams=json.dumps(pairs[:6], ensure_ascii=False) if simtype=='match' else 'null'
    doc=f'''<!DOCTYPE html><html lang="zh-TW"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{esc(L["code"])} {esc(L["title"])}｜互動教學</title>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;700;900&family=Noto+Serif+TC:wght@700&display=swap" rel="stylesheet">
<style>{HUB_CSS}</style></head><body>
<div class="top"><h1>{esc(L["code"])}　{esc(L["title"])}</h1><div class="g">{esc(GRADE[bk])}　互動教學</div>
<div class="tabs"><button class="tab on" data-s="goals">🎯 學習目標</button><button class="tab" data-s="slides">📽 授課簡報</button><button class="tab" data-s="info">📊 資訊圖表</button><button class="tab" data-s="misc">⚠️ 迷思破解</button><button class="tab" data-s="simpane">🔬 互動模擬</button><button class="tab" data-s="game">🎮 闖關自測</button></div></div>
<div class="wrap">
<div class="pane on" id="goals"><div class="leadbox">{esc(L["summary"])}</div><div class="goals">{goals}</div></div>
<div class="pane" id="slides"><div class="hint">← → 翻頁，或用下方按鈕</div><div class="deck"><div class="slidebox">{slides}</div><div class="nav"><button id="pv" onclick="showSlide(si-1)">‹ 上一頁</button><span class="pg" id="pg"></span><button id="nx" onclick="showSlide(si+1)">下一頁 ›</button></div></div></div>
<div class="pane" id="info"><div class="hint">4 張資訊圖表（圖文並茂）</div>{infos}</div>
<div class="pane" id="misc"><div class="hint">點卡片翻面看正確觀念 🔄</div><div class="grid">{flips}</div></div>
<div class="pane" id="simpane"><div class="hint">🔬 {SIMNAME.get(simtype,"互動模擬")}　·　拖曳滑桿/按鈕操作，即時觀察變化</div><div id="simhost"></div></div>
<div class="pane" id="game"><div class="hint">四選一單選，選好即知對錯！　｜　<a href="{esc(L["code"])}_線上測驗.html" target="_blank" style="color:#f0d878">📝 完整線上測驗</a>　·　<a href="{esc(L["code"])}_三種難度測驗卷.xlsx" style="color:#9fc8d8">⬇️ 下載 XLSX</a>　·　<a href="../../錯題本.html" style="color:#9fc8d8">📕 我的錯題本</a></div><div class="lv"><button data-l="基礎卷" class="on" onclick="start('基礎卷')">★☆☆ 基礎</button><button data-l="進階卷" onclick="start('進階卷')">★★☆ 進階</button><button data-l="挑戰卷" onclick="start('挑戰卷')">★★★ 挑戰</button></div><div id="gamebox"></div></div>
<div class="foot">互動教學 · 108課綱國中自然科　·　🤖 Claude Code</div></div>
<script src="../progress.js?v=1"></script>
<script>window.__CODE__={json.dumps(L["code"], ensure_ascii=False)};window.__TITLE__={json.dumps(L["title"], ensure_ascii=False)};
window.__QUIZ__={json.dumps(qjs, ensure_ascii=False)};</script>
<script>{JS}</script>
<script src="../sims.js?v=12"></script>
<script>window.addEventListener('DOMContentLoaded',function(){{try{{initSim('{simtype}',document.getElementById('simhost'),{simparams});}}catch(e){{document.getElementById('simhost').innerHTML='<p style=\\'color:#e8a0a0;text-align:center\\'>模擬載入失敗</p>';}}}});</script>
</body></html>'''
    return doc

def main():
    n=0
    for p in sorted(glob.glob(os.path.join(GEN,'L_*.py'))):
        runcode=os.path.basename(p)[2:-3].replace('_','-',1)
        L=load(os.path.basename(p)[:-3]).L
        out=os.path.join(ROOT,'02_加值成品',BOOK[runcode[0]], f'{L["code"]}_互動教學.html')
        open(out,'w',encoding='utf-8').write(build(L,runcode)); n+=1
    print(f'OK: 產出 {n} 份整合式互動教學頁（含簡報翻頁器＋資訊圖）')

if __name__=='__main__': main()
