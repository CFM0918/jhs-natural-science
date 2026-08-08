# -*- coding: utf-8 -*-
"""產生歷屆會考自然科獨立年份頁：02_加值成品/歷屆試題/<年>年會考自然科.html
每題四選一(文字選項)或附官方頁面圖片(圖形選項/需圖表題)，交卷自動批改＋詳解，
並輸出對應 XLSX。資料來源：_exam_src/exam_<年>.py（逐題人工判讀，已與官方答案核對）。"""
import os, glob, importlib.util, json, html

GEN = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.dirname(GEN)
SRC = os.path.join(GEN, '_exam_src')
OUTDIR = os.path.join(ROOT, '02_加值成品', '歷屆試題')

def load_exam(year):
    p = os.path.join(SRC, f'exam_{year}.py')
    if not os.path.exists(p):
        return None
    s = importlib.util.spec_from_file_location(f'exam_{year}', p)
    m = importlib.util.module_from_spec(s); s.loader.exec_module(m)
    return m.ITEMS

def esc(x): return html.escape(str(x))

CSS = """
:root{--board:#1a2e1a;--chalk:#f4f1e8;--yellow:#f0d878;--blue:#9fc8d8;--red:#e8a0a0;--green:#a8d0a0}
*{box-sizing:border-box}
body{margin:0;background:#0f1a0f;color:var(--chalk);font-family:'Noto Sans TC',sans-serif;line-height:1.7}
.top{background:var(--board);border-bottom:2px solid rgba(240,216,120,.25);padding:20px 24px;position:sticky;top:0;z-index:20}
.top h1{font-family:'Noto Serif TC',serif;font-size:22px;margin:0 0 4px;color:var(--yellow)}
.top .g{color:var(--blue);font-size:13px}
.act{display:flex;gap:10px;flex-wrap:wrap;margin-top:12px}
.act a,.act button{cursor:pointer;font-size:13px;text-decoration:none;padding:8px 16px;border-radius:8px;border:1px solid rgba(159,200,216,.4);background:none;color:var(--blue);font-family:inherit;min-height:40px}
.act a.dl{background:var(--yellow);color:#16241c;border:none;font-weight:700}
.wrap{max-width:820px;margin:0 auto;padding:20px 18px 60px}
.q{background:var(--board);border:1px solid rgba(240,216,120,.18);border-radius:14px;padding:18px 20px;margin:14px 0}
.q .qn{font-size:12px;color:var(--blue);margin-bottom:6px}
.q .qt{font-size:16px;margin-bottom:10px;font-weight:700;white-space:pre-line}
.q .pageimg{max-width:100%;border-radius:8px;border:1px solid rgba(159,200,216,.25);margin:8px 0}
.opt{display:flex;align-items:flex-start;gap:10px;padding:11px 13px;margin:6px 0;border:1px solid rgba(159,200,216,.25);border-radius:10px;cursor:pointer;font-size:15px;min-height:44px}
.opt:hover{background:rgba(159,200,216,.08)}.opt input{margin-top:4px}.opt .k{color:var(--blue);font-weight:700;margin-right:2px}
.q.graded .opt{cursor:default}
.opt.correct{background:rgba(168,208,160,.18);border-color:var(--green)}.opt.correct .k{color:var(--green)}
.opt.wrong{background:rgba(232,160,160,.18);border-color:var(--red)}.opt.wrong .k{color:var(--red)}
.imgonly{font-size:14px;color:rgba(244,241,232,.7);margin:8px 0}
.exp{display:none;margin-top:10px;padding-top:10px;border-top:1px dashed rgba(159,200,216,.3);font-size:14px;color:rgba(244,241,232,.75)}
.q.graded .exp{display:block}
.chtag{font-size:11px;color:rgba(159,200,216,.7);margin-left:8px}
.submit{display:flex;align-items:center;gap:14px;flex-wrap:wrap;margin:20px 0}
.submit button{cursor:pointer;font-size:15px;font-weight:700;padding:12px 28px;border-radius:10px;border:none;font-family:inherit;min-height:46px}
.submit .go{background:var(--yellow);color:#16241c}.submit .re{background:none;color:var(--blue);border:1px solid rgba(159,200,216,.4)}
.result{font-size:16px}.result b{color:var(--yellow);font-size:24px}
.foot{text-align:center;color:rgba(244,241,232,.4);font-size:12px;padding:24px}
.nav2{text-align:center;margin:10px 0}.nav2 a{color:var(--blue);font-size:13px;text-decoration:none;margin:0 10px}
@media(max-width:640px){.opt{padding:12px 14px;font-size:14.5px}}
"""

JS = """
var Q=window.__ITEMS__;
function grade(){var right=0, answered=0;
 Q.forEach(function(it,i){
  var card=document.getElementById('q'+i);
  if(!it.opts){card.classList.add('graded');return;}
  var opts=card.querySelectorAll('.opt'), sel=card.querySelector('input:checked');
  opts.forEach(function(o){o.classList.remove('correct','wrong');});
  var ci='ABCD'.indexOf(it.ans);
  opts[ci].classList.add('correct');
  if(sel){answered++;var s=+sel.value; if(s===ci)right++; else opts[s].classList.add('wrong');}
  card.classList.add('graded');
 });
 var scoreable=Q.filter(function(it){return it.opts;}).length;
 document.getElementById('result').innerHTML='得分 <b>'+right+'</b> / '+scoreable+'　（已作答 '+answered+' 題）'+(right===scoreable?' 🎉 滿分！':right/scoreable>=0.6?' 👍 及格':' 📖 再加油');
 if(window.JHS){window.JHS.saveScore(window.__YEARCODE__, window.__YEARTITLE__, '全卷', right, scoreable);}
}
function resetAll(){
 Q.forEach(function(it,i){var card=document.getElementById('q'+i);card.classList.remove('graded');
  card.querySelectorAll('.opt').forEach(function(o){o.classList.remove('correct','wrong');});
  card.querySelectorAll('input').forEach(function(x){x.checked=false;});});
 document.getElementById('result').innerHTML='';
}
window.grade=grade;window.resetAll=resetAll;
"""

def build_year_page(year, items):
    cards = ''
    for i, it in enumerate(items):
        opts_html = ''
        if it['opts']:
            opts_html = ''.join(
                f'<label class="opt"><input type="radio" name="q{i}" value="{k}"><span><span class="k">({chr(65+k)})</span> {esc(v)}</span></label>'
                for k, v in enumerate([it['opts'][c] for c in 'ABCD']))
        else:
            opts_html = '<div class="imgonly">此題選項為圖形，請參閱下方官方題本頁面圖片作答。</div>'
        img_html = ''
        if it.get('has_fig'):
            img_html = f'<img class="pageimg" src="imgs/{year}/p{it["page"]}.png" alt="第{it["page"]}頁官方題本圖片" loading="lazy">'
        cards += (f'<div class="q" id="q{i}"><div class="qn">第 {it["n"]} 題<span class="chtag">對應：{esc(it["chapter"])}</span></div>'
                  f'<div class="qt">{esc(it["stem"])}</div>{img_html}{opts_html}'
                  f'<div class="exp"><b style="color:var(--yellow)">正解 ({it["ans"]})</b>　{esc(it["explain"])}</div></div>')
    qjs = [{'opts': it['opts'], 'ans': it['ans']} for it in items]
    total = len(items)
    xlsx_name = f'{year}年會考自然科.xlsx'
    doc = f'''<!DOCTYPE html><html lang="zh-TW"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{year}年國中教育會考自然科｜歷屆試題</title>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;700;900&family=Noto+Serif+TC:wght@700&display=swap" rel="stylesheet">
<style>{CSS}</style></head><body>
<div class="top"><h1>{year}年 國中教育會考自然科</h1><div class="g">官方歷屆試題・共 {total} 題（四選一單選，依著作權法第9條第5款，考試試題不受著作權保護）</div>
<div class="act"><a class="dl" href="{xlsx_name}" download>⬇️ 下載本卷 XLSX</a><button onclick="window.print()">🖨 列印/存 PDF</button></div></div>
<div class="wrap">
<div class="nav2"><a href="../../歷屆試題總覽.html">← 回歷屆試題總覽</a><a href="../../index.html">回教材總覽</a></div>
{cards}
<div class="submit"><button class="go" onclick="grade()">✅ 交卷批改</button><button class="re" onclick="resetAll()">↺ 重作</button><span class="result" id="result"></span></div>
</div>
<div class="foot">題目與正解取自國立臺灣師範大學心測中心公告；詳解為本站原創撰寫。　🤖 Claude Code 協助生成</div>
<script src="../progress.js?v=1"></script>
<script>window.__YEARCODE__={json.dumps(str(year)+'年會考')};window.__YEARTITLE__={json.dumps(str(year)+'年國中教育會考自然科')};
window.__ITEMS__={json.dumps(qjs, ensure_ascii=False)};</script>
<script>{JS}</script>
<script>if('serviceWorker' in navigator){{window.addEventListener('load',function(){{navigator.serviceWorker.register('../../sw.js').catch(function(){{}});}});}}</script>
</body></html>'''
    return doc

def build_overview(years_done, years_all):
    rows = ''
    for y in years_all:
        if y in years_done:
            rows += f'<div class="yr"><span class="y">{y}年</span><a class="btn" href="歷屆試題/{y}年會考自然科.html">📝 線上作答</a><a class="btn" href="歷屆試題/{y}年會考自然科.xlsx">⬇️ XLSX</a></div>'
        else:
            rows += f'<div class="yr off"><span class="y">{y}年</span><span class="soon">製作中…</span></div>'
    doc = f'''<!DOCTYPE html><html lang="zh-TW"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>歷屆試題總覽｜國中教育會考自然科</title>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;700;900&display=swap" rel="stylesheet">
<style>
body{{margin:0;background:#0f1a0f;color:#f4f1e8;font-family:'Noto Sans TC',sans-serif}}
.top{{background:#1a2e1a;padding:24px;text-align:center;border-bottom:2px solid rgba(240,216,120,.25)}}
.top h1{{color:#f0d878;margin:0 0 8px}}.top p{{color:#9fc8d8;font-size:14px;margin:0}}
.wrap{{max-width:640px;margin:0 auto;padding:20px}}
.yr{{display:flex;align-items:center;gap:10px;padding:14px 16px;background:#1a2e1a;border-radius:12px;margin:10px 0;border:1px solid rgba(240,216,120,.15)}}
.yr.off{{opacity:.5}}.yr .y{{font-size:18px;font-weight:700;color:#f0d878;min-width:70px}}
.yr .soon{{color:#9fc8d8;font-size:13px}}
.btn{{font-size:13px;text-decoration:none;padding:7px 14px;border-radius:8px;border:1px solid rgba(159,200,216,.4);color:#9fc8d8}}
.btn:hover{{background:#9fc8d8;color:#16241c}}
.nav2{{text-align:center;margin:10px 0}}.nav2 a{{color:#9fc8d8;font-size:13px;text-decoration:none}}
.foot{{text-align:center;color:rgba(244,241,232,.4);font-size:12px;padding:24px}}
</style></head><body>
<div class="top"><h1>📚 歷屆試題總覽</h1><p>國中教育會考自然科・近10年（{years_all[0]}～{years_all[-1]}年）・官方題目與正解</p></div>
<div class="wrap"><div class="nav2"><a href="index.html">← 回教材總覽</a></div>{rows}</div>
<div class="foot">資料來源：國立臺灣師範大學心理與教育測驗研究發展中心(心測中心)　🤖 Claude Code 協助生成</div>
<script>if('serviceWorker' in navigator){{window.addEventListener('load',function(){{navigator.serviceWorker.register('sw.js').catch(function(){{}});}});}}</script>
</body></html>'''
    return doc

def main():
    years_all = list(range(105, 115))
    years_done = []
    for y in years_all:
        items = load_exam(y)
        if items is None: continue
        os.makedirs(OUTDIR, exist_ok=True)
        out = os.path.join(OUTDIR, f'{y}年會考自然科.html')
        open(out, 'w', encoding='utf-8').write(build_year_page(y, items))
        years_done.append(y)
    open(os.path.join(ROOT, '歷屆試題總覽.html'), 'w', encoding='utf-8').write(build_overview(years_done, years_all))
    print(f'OK: 完成 {len(years_done)}/{len(years_all)} 年 ({years_done})')

if __name__ == '__main__': main()
