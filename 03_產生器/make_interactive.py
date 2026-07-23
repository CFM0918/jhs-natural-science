# -*- coding: utf-8 -*-
"""互動教學頁產生器：每節輸出 <冊>/<code>_互動教學.html。
從 L 的 summary/themes/misconceptions/life/quiz 生成互動頁：
  📖 觀念導覽(手風琴) · ⚠️ 迷思翻牌 · 🎮 闖關自測(翻卡計分,分基礎/進階/挑戰)
參考 math 站 interactive.html 的互動教學模式。"""
import os, glob, importlib.util, json, html

GEN = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.dirname(GEN)
def load(n):
    s = importlib.util.spec_from_file_location(n, os.path.join(GEN, n+'.py'))
    m = importlib.util.module_from_spec(s); s.loader.exec_module(m); return m
EXTRA = {}
for p in sorted(glob.glob(os.path.join(GEN,'quiz_extra_*.py'))): EXTRA.update(load(os.path.basename(p)[:-3]).EXTRA)
BOOK = {'a':'生物','b':'八上','c':'八下','d':'九上','e':'九下'}
GRADE = {'a':'七年級·生物','b':'八年級上·理化','c':'八年級下·理化','d':'九年級上','e':'九年級下'}
def esc(x): return html.escape(str(x))

CSS = """*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Noto Sans TC',system-ui,sans-serif;background:#0d1410;color:#f4f1e8;line-height:1.7}
.top{position:sticky;top:0;z-index:20;background:#16241c;border-bottom:2px solid #f0d878;padding:12px 16px}
.top h1{font-size:19px;color:#f0d878}.top .g{font-size:12px;color:#9fc8d8}
.tabs{display:flex;gap:8px;margin-top:10px;flex-wrap:wrap}
.tab{cursor:pointer;font-size:14px;padding:6px 14px;border-radius:20px;border:1px solid rgba(159,200,216,.4);color:#9fc8d8;background:none}
.tab.on{background:#f0d878;color:#16241c;border-color:#f0d878;font-weight:700}
.wrap{max-width:820px;margin:0 auto;padding:20px 16px 60px}
section{display:none}section.on{display:block;animation:fade .3s}
@keyframes fade{from{opacity:0;transform:translateY(6px)}to{opacity:1}}
.lead{background:#1a2e1a;border-left:4px solid #9fc8d8;border-radius:8px;padding:14px 16px;margin-bottom:16px;font-size:14.5px}
.acc{background:#1a2e1a;border:1px solid rgba(240,216,120,.2);border-radius:10px;margin:10px 0;overflow:hidden}
.acc>.h{cursor:pointer;padding:14px 18px;font-size:16px;font-weight:700;color:#f0d878;display:flex;justify-content:space-between;align-items:center}
.acc>.h::after{content:'＋';color:#9fc8d8}.acc.open>.h::after{content:'－'}
.acc>.b{max-height:0;overflow:hidden;transition:max-height .3s;padding:0 18px}
.acc.open>.b{max-height:600px;padding:0 18px 14px}
.acc li{margin:6px 0 6px 4px;list-style:none;padding-left:20px;position:relative;font-size:14.5px}
.acc li::before{content:'▹';position:absolute;left:0;color:#f0d878}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
@media(max-width:560px){.grid{grid-template-columns:1fr}}
.flip{height:120px;perspective:900px;cursor:pointer}
.flip .in{position:relative;width:100%;height:100%;transition:transform .5s;transform-style:preserve-3d}
.flip.f .in{transform:rotateY(180deg)}
.flip .fr,.flip .bk{position:absolute;inset:0;backface-visibility:hidden;border-radius:10px;padding:14px;display:flex;align-items:center;justify-content:center;text-align:center;font-size:14.5px}
.flip .fr{background:rgba(232,160,160,.15);border:1px solid rgba(232,160,160,.5);color:#f4d0d0}
.flip .bk{background:rgba(168,208,160,.15);border:1px solid rgba(168,208,160,.5);color:#d0e8c8;transform:rotateY(180deg)}
.flip .tag{position:absolute;top:8px;left:10px;font-size:11px;opacity:.7}
.hint{text-align:center;color:rgba(244,241,232,.5);font-size:12px;margin:6px 0 14px}
.lv{display:flex;gap:8px;justify-content:center;margin-bottom:14px;flex-wrap:wrap}
.lv button{cursor:pointer;font-size:13px;padding:6px 14px;border-radius:8px;border:1px solid rgba(159,200,216,.4);background:none;color:#9fc8d8}
.lv button.on{background:#9fc8d8;color:#16241c;font-weight:700}
.card{background:#1a2e1a;border:1px solid rgba(240,216,120,.25);border-radius:14px;padding:26px 20px;min-height:200px;display:flex;flex-direction:column;justify-content:center;text-align:center;position:relative}
.card .qn{font-size:12px;color:#9fc8d8;position:absolute;top:12px;left:16px}
.card .q{font-size:19px;margin:10px 0}
.card .ans{font-size:22px;color:#f0d878;font-weight:700;margin:8px 0}
.card .ex{font-size:13px;color:rgba(244,241,232,.7)}
.reveal{cursor:pointer;color:#9fc8d8;font-size:14px;margin-top:10px;text-decoration:underline}
.mk{display:flex;gap:10px;justify-content:center;margin-top:14px}
.mk button{cursor:pointer;font-size:15px;padding:8px 22px;border-radius:10px;border:none;font-weight:700}
.mk .y{background:#a8d0a0;color:#16241c}.mk .n{background:#e8a0a0;color:#16241c}
.bar{height:8px;background:rgba(255,255,255,.1);border-radius:4px;margin:16px 0 6px;overflow:hidden}
.bar>i{display:block;height:100%;background:#f0d878;width:0;transition:width .3s}
.score{text-align:center;font-size:14px;color:#9fc8d8}
.done{text-align:center;padding:30px}.done .big{font-size:40px;color:#f0d878;font-weight:900}
.done button{margin-top:16px;cursor:pointer;background:#f0d878;color:#16241c;border:none;border-radius:10px;padding:10px 24px;font-weight:700;font-size:15px}
.foot{text-align:center;color:rgba(244,241,232,.4);font-size:12px;padding:20px}
"""

JS = """
document.querySelectorAll('.tab').forEach(t=>t.onclick=()=>{
  document.querySelectorAll('.tab').forEach(x=>x.classList.remove('on'));
  document.querySelectorAll('section').forEach(x=>x.classList.remove('on'));
  t.classList.add('on');document.getElementById(t.dataset.s).classList.add('on');
});
document.querySelectorAll('.acc>.h').forEach(h=>h.onclick=()=>h.parentElement.classList.toggle('open'));
document.querySelectorAll('.flip').forEach(f=>f.onclick=()=>f.classList.toggle('f'));
// 闖關自測
const QUIZ=window.__QUIZ__; let lvl='基礎卷', idx=0, right=0, pool=[];
function start(l){lvl=l;pool=QUIZ.filter(q=>q.lv===l);idx=0;right=0;
  document.querySelectorAll('.lv button').forEach(b=>b.classList.toggle('on',b.dataset.l===l));render();}
function render(){const box=document.getElementById('gamebox');
  if(idx>=pool.length){box.innerHTML='<div class="done"><div class="big">'+right+'/'+pool.length+'</div><p>'+(right/pool.length>=0.8?'太強了！🎉':right/pool.length>=0.5?'不錯，再複習弱點 💪':'多看幾次觀念再來 📖')+'</p><button onclick="start(lvl)">再挑戰一次</button></div>';return;}
  const q=pool[idx];
  box.innerHTML='<div class="card"><div class="qn">'+lvl+' '+(idx+1)+'/'+pool.length+'</div><div class="q">'+q.q+'</div><div id="rev"><div class="reveal" onclick="showAns()">👉 點擊看答案</div></div></div>'+
   '<div class="bar"><i style="width:'+(idx/pool.length*100)+'%"></i></div><div class="score">已答對 '+right+' 題</div>';}
function showAns(){const q=pool[idx];
  document.getElementById('rev').innerHTML='<div class="ans">'+q.a+'</div><div class="ex">'+q.e+'</div>'+
   '<div class="mk"><button class="y" onclick="mark(1)">我會 ✓</button><button class="n" onclick="mark(0)">不會 ✗</button></div>';}
function mark(ok){if(ok)right++;idx++;render();}
window.start=start;window.showAns=showAns;window.mark=mark;
start('基礎卷');
"""

def build(L, code):
    quiz = {k:list(v) for k,v in L['quiz'].items()}
    if code in EXTRA:
        for sh,qs in EXTRA[code].items(): quiz[sh]=quiz.get(sh,[])+list(qs)
    qjs = []
    for sh,items in quiz.items():
        for q,a,e in items: qjs.append({'q':q,'a':a,'e':e,'lv':sh})
    # 觀念手風琴
    accs = ''.join(
        f'<div class="acc"><div class="h">{esc(t["name"])}</div><div class="b"><ul>'
        + ''.join(f'<li>{esc(p)}</li>' for p in t['points'])
        + (''.join(f'<li>💡 {esc(x[0])}：{esc(x[1])}</li>' for x in L.get('life',[])) if False else '')
        + '</ul></div></div>'
        for t in L['themes'])
    # 素養連結併一張
    if L.get('life'):
        accs += '<div class="acc"><div class="h">素養 · 生活連結</div><div class="b"><ul>'+''.join(f'<li>{esc(x[0])}：{esc(x[1])}</li>' for x in L['life'])+'</ul></div></div>'
    # 迷思翻牌
    flips = ''.join(
        f'<div class="flip"><div class="in"><div class="fr"><span class="tag">迷思 ✗</span>{esc(m[0])}</div><div class="bk"><span class="tag">正確 ✓</span>{esc(m[1])}</div></div></div>'
        for m in L.get('misconceptions',[]))
    bk = code[0]
    doc = f'''<!DOCTYPE html><html lang="zh-TW"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{esc(L["code"])} {esc(L["title"])}｜互動教學</title>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;700;900&display=swap" rel="stylesheet">
<style>{CSS}</style></head><body>
<div class="top"><h1>{esc(L["code"])}　{esc(L["title"])}</h1><div class="g">{esc(GRADE[bk])}　互動教學</div>
<div class="tabs"><button class="tab on" data-s="concept">📖 觀念導覽</button><button class="tab" data-s="misc">⚠️ 迷思破解</button><button class="tab" data-s="game">🎮 闖關自測</button></div></div>
<div class="wrap">
<section id="concept" class="on"><div class="lead">{esc(L["summary"])}</div><div class="hint">點各主題展開重點 ▾</div>{accs}</section>
<section id="misc"><div class="hint">點卡片翻面看正確觀念 🔄</div><div class="grid">{flips}</div></section>
<section id="game"><div class="hint">選難度 → 想答案 → 點看答案 → 誠實標記，最後看得分！</div>
<div class="lv"><button data-l="基礎卷" class="on" onclick="start('基礎卷')">★☆☆ 基礎</button><button data-l="進階卷" onclick="start('進階卷')">★★☆ 進階</button><button data-l="挑戰卷" onclick="start('挑戰卷')">★★★ 挑戰</button></div>
<div id="gamebox"></div></section>
<div class="foot">互動教學 · 108課綱國中自然科　·　🤖 Claude Code</div>
</div>
<script>window.__QUIZ__={json.dumps(qjs, ensure_ascii=False)};</script>
<script>{JS}</script>
</body></html>'''
    return doc

def main():
    n=0
    for p in sorted(glob.glob(os.path.join(GEN,'L_*.py'))):
        runcode = os.path.basename(p)[2:-3].replace('_','-',1)   # a6-1（供 EXTRA/冊別）
        L = load(os.path.basename(p)[:-3]).L
        fcode = L['code']                                         # 生物6-1（成品檔名）
        out = os.path.join(ROOT,'02_加值成品',BOOK[runcode[0]], f'{fcode}_互動教學.html')
        open(out,'w',encoding='utf-8').write(build(L, runcode)); n+=1
    print(f'OK: 產出 {n} 份互動教學頁')

if __name__=='__main__': main()
