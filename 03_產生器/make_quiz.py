# -*- coding: utf-8 -*-
"""線上測驗頁產生器：每節輸出 <冊>/<code>_線上測驗.html。
四選一單選題（基礎/進階/挑戰各 10 題），線上作答→自動批改計分→標示對錯＋解析，
與 XLSX 下載並行同頁。題目與選項由 mcq.build 產生，與 XLSX 完全一致。"""
import os, glob, importlib.util, json, html

GEN = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.dirname(GEN)
def load(n):
    s = importlib.util.spec_from_file_location(n, os.path.join(GEN, n+'.py'))
    m = importlib.util.module_from_spec(s); s.loader.exec_module(m); return m
import mcq
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
.act a:hover,.act button:hover{background:rgba(159,200,216,.15)}.act a.dl:hover{background:#f6e4a0}
.wrap{max-width:860px;margin:0 auto;padding:20px 18px 60px}
.tabs{display:flex;gap:8px;justify-content:center;margin:14px 0 6px;flex-wrap:wrap}
.tabs button{cursor:pointer;font-size:14px;padding:8px 18px;border-radius:10px;border:1px solid rgba(159,200,216,.4);background:none;color:var(--blue);font-family:inherit}
.tabs button.on{background:var(--blue);color:#16241c;font-weight:700}
.q{background:var(--board);border:1px solid rgba(240,216,120,.18);border-radius:14px;padding:18px 20px;margin:12px 0}
.q .qn{font-size:12px;color:var(--blue);margin-bottom:6px}
.q .qt{font-size:17px;margin-bottom:12px;font-weight:700}
.opt{display:flex;align-items:flex-start;gap:10px;padding:9px 12px;margin:6px 0;border:1px solid rgba(159,200,216,.25);border-radius:10px;cursor:pointer;font-size:15px}
.opt:hover{background:rgba(159,200,216,.08)}
.opt input{margin-top:4px}
.opt .k{color:var(--blue);font-weight:700;margin-right:2px}
.q.graded .opt{cursor:default}
.opt.correct{background:rgba(168,208,160,.18);border-color:var(--green)}
.opt.correct .k{color:var(--green)}
.opt.wrong{background:rgba(232,160,160,.18);border-color:var(--red)}
.opt.wrong .k{color:var(--red)}
.exp{display:none;margin-top:10px;padding-top:10px;border-top:1px dashed rgba(159,200,216,.3);font-size:14px;color:rgba(244,241,232,.75)}
.q.graded .exp{display:block}
.q.graded .exp .tag{font-weight:700;margin-right:6px}
.submit{display:flex;align-items:center;gap:14px;flex-wrap:wrap;margin:18px 0 6px}
.submit button{cursor:pointer;font-size:15px;font-weight:700;padding:10px 26px;border-radius:10px;border:none;font-family:inherit}
.submit .go{background:var(--yellow);color:#16241c}.submit .re{background:none;color:var(--blue);border:1px solid rgba(159,200,216,.4)}
.result{font-size:16px}.result b{color:var(--yellow);font-size:22px}
.foot{text-align:center;color:rgba(244,241,232,.4);font-size:12px;padding:24px}
.lvsec{display:none}.lvsec.on{display:block}.lvhd{display:none}
@media(max-width:640px){
 .top{padding:14px 16px}.top h1{font-size:18px}.top .g{font-size:12px}
 .act a,.act button{padding:10px 16px;min-height:44px;font-size:13.5px;flex:1;text-align:center}
 .tabs button{padding:10px 14px;min-height:44px;font-size:13px;flex:1;min-width:100px}
 .opt{padding:12px 14px;font-size:15px;min-height:44px}
 .submit{flex-direction:column;align-items:stretch}
 .submit button{padding:12px;min-height:46px}
}
@media print{
 body{background:#fff;color:#000}.top{position:static;background:#fff;border-color:#999}.act,.tabs,.submit{display:none!important}
 .top h1,.top .g{color:#000}.q{border-color:#bbb;break-inside:avoid;page-break-inside:avoid}
 .exp{display:block!important}.opt.correct{background:#eef7ea}.lvsec{display:block!important}.lvhd{display:block!important;font-weight:700;font-size:18px;margin:18px 0 6px}
}
"""

JS = """
var Q=window.__QUIZ__, LVS=window.__LVS__, cur=LVS[0];
function tab(lv){cur=lv;
 document.querySelectorAll('.tabs button').forEach(b=>b.classList.toggle('on',b.dataset.l===lv));
 document.querySelectorAll('.lvsec').forEach(s=>s.classList.toggle('on',s.dataset.l===lv));}
function grade(lv){var items=Q[lv],right=0,unanswered=0;
 for(var i=0;i<items.length;i++){var card=document.getElementById('q_'+lv+'_'+i);
  var ci=+card.dataset.ci, opts=card.querySelectorAll('.opt');
  var sel=card.querySelector('input:checked');
  opts.forEach(function(o){o.classList.remove('correct','wrong');});
  opts[ci].classList.add('correct');
  var it=items[i], optsText=Array.prototype.map.call(opts,function(o){return o.textContent.replace(/^\\(\\w\\)\\s*/,'');});
  if(sel===null){unanswered++; if(window.JHS)JHS.addWrong(window.__CODE__,window.__TITLE__,lv,it.q,optsText,ci,-1,it.e);}
  else{var s=+sel.value;
   if(s===ci){right++; if(window.JHS)JHS.removeWrongByKey(window.__CODE__,lv,it.q);}
   else{opts[s].classList.add('wrong'); if(window.JHS)JHS.addWrong(window.__CODE__,window.__TITLE__,lv,it.q,optsText,ci,s,it.e);}}
  card.classList.add('graded');}
 if(window.JHS)JHS.saveScore(window.__CODE__,window.__TITLE__,lv,right,items.length);
 var r=document.getElementById('res_'+lv);
 r.innerHTML='得分 <b>'+right+'</b> / '+items.length+'　（答對 '+right+' 題'+(unanswered?('，未作答 '+unanswered+' 題'):'')+'）'+
   (right===items.length?'　🎉 滿分！':right/items.length>=0.6?'　👍 及格':'　📖 再複習');}
function reset(lv){var items=Q[lv];
 for(var i=0;i<items.length;i++){var card=document.getElementById('q_'+lv+'_'+i);
  card.classList.remove('graded');
  card.querySelectorAll('.opt').forEach(function(o){o.classList.remove('correct','wrong');});
  card.querySelectorAll('input').forEach(function(x){x.checked=false;});}
 document.getElementById('res_'+lv).innerHTML='';}
window.tab=tab;window.grade=grade;window.reset=reset;
tab(LVS[0]);
"""

def build(L, runcode):
    quiz = {k:list(v) for k,v in L['quiz'].items()}
    if runcode in EXTRA:
        for sh,qs in EXTRA[runcode].items(): quiz[sh]=quiz.get(sh,[])+list(qs)
    M = mcq.build(quiz, L['code'])
    lvs = [lv for lv in LV if M.get(lv)]
    bk = runcode[0]
    tabs = ''.join(f'<button data-l="{lv}" onclick="tab(\'{lv}\')">{LVNAME[lv]}（{len(M[lv])}題）</button>' for lv in lvs)
    secs = ''
    for lv in lvs:
        cards = ''
        for i,it in enumerate(M[lv]):
            opts = ''.join(
                f'<label class="opt"><input type="radio" name="{lv}_{i}" value="{k}"><span><span class="k">({chr(65+k)})</span> {esc(o)}</span></label>'
                for k,o in enumerate(it['opts']))
            cards += (f'<div class="q" id="q_{lv}_{i}" data-ci="{it["ci"]}"><div class="qn">{lv}　第 {i+1} 題</div>'
                      f'<div class="qt">{esc(it["q"])}</div>{opts}'
                      f'<div class="exp"><span class="tag" style="color:var(--yellow)">正解 ({chr(65+it["ci"])})</span>{esc(it["a"])}　<br>解析：{esc(it["e"])}</div></div>')
        secs += (f'<div class="lvsec" data-l="{lv}"><div class="lvhd">{LVNAME[lv]}</div>{cards}'
                 f'<div class="submit"><button class="go" onclick="grade(\'{lv}\')">✅ 交卷批改</button>'
                 f'<button class="re" onclick="reset(\'{lv}\')">↺ 重作</button>'
                 f'<span class="result" id="res_{lv}"></span></div></div>')
    xlsx = f'{esc(L["code"])}_三種難度測驗卷.xlsx'
    total = sum(len(M[lv]) for lv in lvs)
    doc = f'''<!DOCTYPE html><html lang="zh-TW"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{esc(L["code"])} {esc(L["title"])}｜線上測驗</title>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;700;900&family=Noto+Serif+TC:wght@700&display=swap" rel="stylesheet">
<style>{CSS}</style></head><body>
<div class="top"><h1>{esc(L["code"])}　{esc(L["title"])}</h1><div class="g">{esc(GRADE[bk])}　線上測驗（四選一單選・共 {total} 題）</div>
<div class="act"><a class="dl" href="{xlsx}" download>⬇️ 下載測驗卷 XLSX</a><button onclick="window.print()">🖨 列印/存 PDF</button><a href="../../錯題本.html" style="margin-left:auto">📕 我的錯題本</a></div></div>
<div class="wrap">
<div class="tabs">{tabs}</div>
{secs}
</div>
<div class="foot">四選一單選，選好後按「交卷批改」自動計分並顯示正解與解析（答錯/未答自動存入錯題本）。完整卷可下載 XLSX 或列印。　🤖 Claude Code 協助生成</div>
<script src="../progress.js?v=1"></script>
<script>window.__CODE__={json.dumps(L["code"], ensure_ascii=False)};window.__TITLE__={json.dumps(L["title"], ensure_ascii=False)};
window.__QUIZ__={json.dumps(M, ensure_ascii=False)};window.__LVS__={json.dumps(lvs, ensure_ascii=False)};</script>
<script>{JS}</script>
<script>if('serviceWorker' in navigator){{window.addEventListener('load',function(){{navigator.serviceWorker.register('../../sw.js').catch(function(){{}});}});}}</script>
</body></html>'''
    return doc

def main():
    n=0
    for p in sorted(glob.glob(os.path.join(GEN,'L_*.py'))):
        runcode=os.path.basename(p)[2:-3].replace('_','-',1)
        L=load(os.path.basename(p)[:-3]).L
        out=os.path.join(ROOT,'02_加值成品',BOOK[runcode[0]], f'{L["code"]}_線上測驗.html')
        open(out,'w',encoding='utf-8').write(build(L,runcode)); n+=1
    print(f'OK: 產出 {n} 份線上測驗頁（四選一單選＋自動批改，XLSX 下載並行）')

if __name__=='__main__': main()
