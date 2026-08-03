# -*- coding: utf-8 -*-
"""線上測驗頁產生器：每節輸出 <冊>/<code>_線上測驗.html。
線上作答（三難度、逐題顯示答案＋解析、自評計分、可列印）與 XLSX 下載並行同頁。
題目資料 = L['quiz'] 併入 quiz_extra（與 XLSX 完全一致，每卷 10 題共 30 題）。"""
import os, glob, importlib.util, json, html

GEN = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.dirname(GEN)
def load(n):
    s = importlib.util.spec_from_file_location(n, os.path.join(GEN, n+'.py'))
    m = importlib.util.module_from_spec(s); s.loader.exec_module(m); return m
EXTRA = {}
for p in sorted(glob.glob(os.path.join(GEN,'quiz_extra_*.py'))): EXTRA.update(load(os.path.basename(p)[:-3]).EXTRA)
BOOK = {'a':'生物','b':'八上','c':'八下','d':'九上','e':'九下'}
GRADE = {'a':'七年級·生物','b':'八年級上·理化','c':'八年級下·理化','d':'九年級上·理化＋地科','e':'九年級下·理化＋地科'}
LV = ['基礎卷','進階卷','挑戰卷']
LVNAME = {'基礎卷':'★☆☆ 基礎（記憶・理解）','進階卷':'★★☆ 進階（應用・分析）','挑戰卷':'★★★ 挑戰（評鑑・創造）'}
def esc(x): return html.escape(str(x))

CSS = """
:root{--board:#1a2e1a;--chalk:#f4f1e8;--yellow:#f0d878;--blue:#9fc8d8;--red:#e8a0a0;--green:#a8d0a0}
*{box-sizing:border-box}
body{margin:0;background:#0f1a0f;color:var(--chalk);font-family:'Noto Sans TC',sans-serif;line-height:1.7}
.top{background:var(--board);border-bottom:2px solid rgba(240,216,120,.25);padding:20px 24px;position:sticky;top:0;z-index:20}
.top h1{font-family:'Noto Serif TC',serif;font-size:24px;margin:0 0 4px}
.top .g{color:var(--blue);font-size:14px}
.act{display:flex;gap:10px;flex-wrap:wrap;margin-top:12px}
.act a,.act button{cursor:pointer;font-size:13px;text-decoration:none;padding:7px 14px;border-radius:8px;border:1px solid rgba(159,200,216,.4);background:none;color:var(--blue);font-family:inherit}
.act a.dl{background:var(--yellow);color:#16241c;border:none;font-weight:700}
.act button:hover,.act a:hover{background:rgba(159,200,216,.15)}
.act a.dl:hover{background:#f6e4a0}
.wrap{max-width:860px;margin:0 auto;padding:20px 18px 60px}
.tabs{display:flex;gap:8px;justify-content:center;margin:14px 0 6px;flex-wrap:wrap}
.tabs button{cursor:pointer;font-size:14px;padding:8px 18px;border-radius:10px;border:1px solid rgba(159,200,216,.4);background:none;color:var(--blue);font-family:inherit}
.tabs button.on{background:var(--blue);color:#16241c;font-weight:700}
.scorebar{position:sticky;top:112px;z-index:10;background:#12210f;border:1px solid rgba(240,216,120,.25);border-radius:12px;padding:12px 16px;margin:10px 0 18px;display:flex;align-items:center;gap:16px;flex-wrap:wrap}
.scorebar .s{font-size:15px}.scorebar b{color:var(--yellow);font-size:20px}
.scorebar .prog{flex:1;min-width:120px;height:8px;background:rgba(255,255,255,.1);border-radius:4px;overflow:hidden}
.scorebar .prog>i{display:block;height:100%;background:var(--green);width:0;transition:width .3s}
.q{background:var(--board);border:1px solid rgba(240,216,120,.18);border-radius:14px;padding:18px 20px;margin:12px 0}
.q .qn{font-size:12px;color:var(--blue);margin-bottom:6px}
.q .qt{font-size:17px;margin-bottom:10px}
.q .reveal{cursor:pointer;color:var(--blue);font-size:14px;text-decoration:underline;background:none;border:none;padding:0;font-family:inherit}
.q .ansbox{display:none;margin-top:10px;padding-top:12px;border-top:1px dashed rgba(159,200,216,.3)}
.q.open .ansbox{display:block}
.q .ans{font-size:18px;color:var(--yellow);font-weight:700}
.q .ex{font-size:14px;color:rgba(244,241,232,.72);margin-top:4px}
.q .mk{display:flex;gap:10px;margin-top:12px}
.q .mk button{cursor:pointer;font-size:14px;padding:6px 18px;border-radius:9px;border:none;font-weight:700;font-family:inherit;opacity:.55}
.q .mk .y{background:var(--green);color:#16241c}.q .mk .n{background:var(--red);color:#16241c}
.q .mk button.sel{opacity:1;box-shadow:0 0 0 2px var(--chalk)}
.foot{text-align:center;color:rgba(244,241,232,.4);font-size:12px;padding:24px}
@media print{
 body{background:#fff;color:#000}.top{position:static;background:#fff;border-color:#999}.act,.tabs,.scorebar,.reveal,.mk{display:none!important}
 .top h1,.top .g{color:#000}.q{border-color:#bbb;break-inside:avoid;page-break-inside:avoid}.q .ansbox{display:block!important}.q .ans{color:#c00}.q .ex{color:#333}
 .lvsec{display:block!important}.lvsec .lvhd{display:block!important;font-weight:700;font-size:18px;margin:18px 0 6px}
}
.lvsec{display:none}.lvsec.on{display:block}.lvhd{display:none}
"""

JS = """
var Q=window.__QUIZ__, LVS=window.__LVS__;
var cur=LVS[0], marks={};
function tab(lv){cur=lv;
 document.querySelectorAll('.tabs button').forEach(b=>b.classList.toggle('on',b.dataset.l===lv));
 document.querySelectorAll('.lvsec').forEach(s=>s.classList.toggle('on',s.dataset.l===lv));
 updscore();}
function toggle(lv,i){document.getElementById('q_'+lv+'_'+i).classList.toggle('open');}
function mark(lv,i,ok){marks[lv+':'+i]=ok;
 var c=document.getElementById('q_'+lv+'_'+i);
 c.querySelector('.mk .y').classList.toggle('sel',ok===1);
 c.querySelector('.mk .n').classList.toggle('sel',ok===0);
 c.classList.add('open');updscore();}
function updscore(){var n=Q[cur].length,done=0,right=0;
 for(var i=0;i<n;i++){var m=marks[cur+':'+i];if(m!==undefined){done++;if(m===1)right++;}}
 document.getElementById('sc_right').textContent=right;
 document.getElementById('sc_total').textContent=n;
 document.getElementById('sc_done').textContent=done;
 document.getElementById('sc_prog').style.width=(done/n*100)+'%';}
function showAll(){document.querySelectorAll('.lvsec.on .q').forEach(c=>c.classList.add('open'));}
function reset(){document.querySelectorAll('.lvsec.on .q').forEach(c=>{c.classList.remove('open');c.querySelectorAll('.mk button').forEach(b=>b.classList.remove('sel'));});
 for(var k in marks){if(k.indexOf(cur+':')===0)delete marks[k];}updscore();}
window.tab=tab;window.toggle=toggle;window.mark=mark;window.showAll=showAll;window.reset=reset;
tab(LVS[0]);
"""

def build(L, runcode):
    quiz = {k:list(v) for k,v in L['quiz'].items()}
    if runcode in EXTRA:
        for sh,qs in EXTRA[runcode].items(): quiz[sh]=quiz.get(sh,[])+list(qs)
    qjs = {lv:[{'q':q,'a':a,'e':e} for (q,a,e) in quiz.get(lv,[])] for lv in LV}
    lvs = [lv for lv in LV if qjs[lv]]
    bk = runcode[0]
    tabs = ''.join(f'<button data-l="{lv}" onclick="tab(\'{lv}\')">{LVNAME[lv]}（{len(qjs[lv])}題）</button>' for lv in lvs)
    secs = ''
    for lv in lvs:
        cards = ''
        for i,it in enumerate(qjs[lv]):
            cards += (f'<div class="q" id="q_{lv}_{i}"><div class="qn">{lv}　第 {i+1} 題</div>'
                      f'<div class="qt">{esc(it["q"])}</div>'
                      f'<button class="reveal" onclick="toggle(\'{lv}\',{i})">👉 顯示 / 隱藏答案</button>'
                      f'<div class="ansbox"><div class="ans">答：{esc(it["a"])}</div>'
                      f'<div class="ex">解析：{esc(it["e"])}</div>'
                      f'<div class="mk"><button class="y" onclick="mark(\'{lv}\',{i},1)">我答對了 ✓</button>'
                      f'<button class="n" onclick="mark(\'{lv}\',{i},0)">答錯了 ✗</button></div></div></div>')
        secs += f'<div class="lvsec" data-l="{lv}"><div class="lvhd">{LVNAME[lv]}</div>{cards}</div>'
    xlsx = f'{esc(L["code"])}_三種難度測驗卷.xlsx'
    doc = f'''<!DOCTYPE html><html lang="zh-TW"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{esc(L["code"])} {esc(L["title"])}｜線上測驗</title>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;700;900&family=Noto+Serif+TC:wght@700&display=swap" rel="stylesheet">
<style>{CSS}</style></head><body>
<div class="top"><h1>{esc(L["code"])}　{esc(L["title"])}</h1><div class="g">{esc(GRADE[bk])}　線上測驗（自評式・共 {sum(len(v) for v in qjs.values())} 題）</div>
<div class="act"><a class="dl" href="{xlsx}" download>⬇️ 下載測驗卷 XLSX</a><button onclick="showAll()">📖 全部顯示答案</button><button onclick="reset()">↺ 重設本卷</button><button onclick="window.print()">🖨 列印/存 PDF</button></div></div>
<div class="wrap">
<div class="tabs">{tabs}</div>
<div class="scorebar"><div class="s">自評答對 <b><span id="sc_right">0</span></b> / <span id="sc_total">10</span> 題</div><div class="prog"><i id="sc_prog"></i></div><div class="s" style="color:var(--blue)">已作答 <span id="sc_done">0</span></div></div>
{secs}
</div>
<div class="foot">線上作答為自評式（簡答題自行核對答案）。完整卷可下載 XLSX 或列印。　🤖 Claude Code 協助生成</div>
<script>window.__QUIZ__={json.dumps(qjs, ensure_ascii=False)};window.__LVS__={json.dumps(lvs, ensure_ascii=False)};</script>
<script>{JS}</script>
</body></html>'''
    return doc

def main():
    n=0
    for p in sorted(glob.glob(os.path.join(GEN,'L_*.py'))):
        runcode=os.path.basename(p)[2:-3].replace('_','-',1)
        L=load(os.path.basename(p)[:-3]).L
        out=os.path.join(ROOT,'02_加值成品',BOOK[runcode[0]], f'{L["code"]}_線上測驗.html')
        open(out,'w',encoding='utf-8').write(build(L,runcode)); n+=1
    print(f'OK: 產出 {n} 份線上測驗頁（自評式三難度＋XLSX 下載並行）')

if __name__=='__main__': main()
