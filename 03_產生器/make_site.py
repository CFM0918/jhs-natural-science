# -*- coding: utf-8 -*-
"""產生 GitHub Pages 入口 index.html（階層：冊→章→節，每節連結簡報/圖表/測驗/摘要/Bloom）。
參考數學站 cfm0918.github.io/math/ 的年級→單元導覽模式。"""
import os, glob, importlib.util, html, urllib.parse

GEN = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.dirname(GEN)
def load(n):
    s = importlib.util.spec_from_file_location(n, os.path.join(GEN, n+'.py'))
    m = importlib.util.module_from_spec(s); s.loader.exec_module(m); return m
import re
BOOKS = [('a','生物','七年級 · 生物'),('b','八上','八年級上 · 理化'),('c','八下','八年級下 · 理化'),
         ('d','九上','九年級上 · 理化＋地科'),('e','九下','九年級下 · 理化＋地科')]
HAND = {'a6-1','c3-3','d4-3'}  # 手做精工版
def keyf(code, bk):
    m = re.match(re.escape(bk)+r'(\d+)-(\d+)', code); return (int(m.group(1)),int(m.group(2))) if m else (99,99)
def esc(x): return html.escape(str(x))
def url(book, fn): return '02_加值成品/'+urllib.parse.quote(book)+'/'+urllib.parse.quote(fn)

CSS = """*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Noto Sans TC',system-ui,-apple-system,sans-serif;background:#0d1410;color:#f4f1e8;line-height:1.6}
.hero{background:linear-gradient(135deg,#1a2e1a,#16241c);padding:48px 20px 40px;text-align:center;border-bottom:3px solid #f0d878}
.hero h1{font-size:32px;color:#f0d878;margin-bottom:8px}
.hero p{color:#9fc8d8;font-size:15px}.hero .stat{margin-top:14px;font-size:13px;color:rgba(244,241,232,.6)}
.wrap{max-width:1040px;margin:0 auto;padding:24px 16px 60px}
.book{background:#1a2e1a;border:1px solid rgba(240,216,120,.15);border-radius:14px;margin:16px 0;overflow:hidden}
.book>summary{cursor:pointer;list-style:none;padding:18px 22px;font-size:20px;font-weight:700;color:#f0d878;display:flex;justify-content:space-between;align-items:center}
.book>summary::-webkit-details-marker{display:none}
.book>summary small{color:#9fc8d8;font-weight:400;font-size:13px}
.book>summary::after{content:'▾';color:#9fc8d8;transition:transform .2s}
.book[open]>summary::after{transform:rotate(180deg)}
.ch{padding:0 22px}.ch-h{color:#e8a0a0;font-size:14px;font-weight:700;margin:14px 0 6px;border-left:3px solid #e8a0a0;padding-left:8px}
.sec{display:flex;flex-wrap:wrap;align-items:center;gap:8px;padding:9px 0;border-bottom:1px solid rgba(255,255,255,.05)}
.sec .name{flex:1;min-width:180px;font-size:14.5px}
.sec .code{color:#f0d878;font-weight:700;margin-right:6px}
.badge{font-size:10px;background:#e8a0a0;color:#1a2e1a;border-radius:4px;padding:1px 5px;font-weight:700;margin-left:6px}
a.btn{font-size:12px;text-decoration:none;padding:4px 10px;border-radius:6px;border:1px solid rgba(159,200,216,.35);color:#9fc8d8;white-space:nowrap}
a.btn:hover{background:#9fc8d8;color:#1a2e1a}
a.s{border-color:rgba(240,216,120,.5);color:#f0d878}a.s:hover{background:#f0d878;color:#1a2e1a}
a.i{border-color:rgba(168,208,160,.6);color:#a8d0a0;font-weight:700}a.i:hover{background:#a8d0a0;color:#1a2e1a}
a.q{border-color:rgba(232,160,160,.5);color:#e8a0a0}a.q:hover{background:#e8a0a0;color:#1a2e1a}
.foot{text-align:center;color:rgba(244,241,232,.4);font-size:12px;padding:24px}
.foot a{color:#9fc8d8}
.hero .navlinks{margin-top:14px;display:flex;gap:10px;justify-content:center;flex-wrap:wrap}
.hero .navlinks a{font-size:13px;text-decoration:none;color:#16241c;background:#f0d878;padding:8px 18px;border-radius:20px;font-weight:700}
.hero .navlinks a.alt{background:none;color:#9fc8d8;border:1px solid rgba(159,200,216,.4)}
.searchbar{position:sticky;top:0;z-index:15;background:#0d1410;padding:12px 0;margin-bottom:6px}
.searchbar input{width:100%;font-size:15px;padding:11px 16px;border-radius:10px;border:1px solid rgba(159,200,216,.35);background:#16241c;color:#f4f1e8}
.searchbar input::placeholder{color:rgba(244,241,232,.4)}
.searchbar .cnt{font-size:12px;color:#9fc8d8;margin-top:6px;padding-left:2px}
.sec.hide{display:none}
.pbadge{font-size:11px;border-radius:5px;padding:2px 7px;font-weight:700;margin-left:4px}
.pbadge.full{background:#a8d0a0;color:#16241c}.pbadge.part{background:#f0d878;color:#16241c}
@media(max-width:600px){
 .sec .name{min-width:100%}
 a.btn{padding:8px 12px;min-height:38px;font-size:12.5px}
 .book>summary{padding:16px 18px;font-size:17px}
 .hero h1{font-size:24px}.hero .navlinks a{padding:9px 16px;min-height:40px}
}
"""

def title_of(book, code):
    p = os.path.join(ROOT, '02_加值成品', book, f'{code}_教材摘要與重點主題.md')
    try:
        m = re.search(r'《(.+?)》', open(p, encoding='utf-8').readline())
        if m: return m.group(1)
    except Exception: pass
    return ''

body = [f'''<div class="hero"><h1>國中自然科 加值教材</h1>
<p>108 課綱・會考範圍｜生物＋理化＋地科｜南一・康軒・翰林三版共同核心</p>
<div class="stat">103 節 · 每節 5 種成品 · 3090 題測驗 · 互動簡報與資訊圖 · <span id="donestat">學習進度載入中…</span></div>
<div class="navlinks"><a href="模擬考.html">📝 跨節混合模擬考</a><a class="alt" href="錯題本.html">📕 我的錯題本</a></div></div>
<div class="wrap">
<div class="searchbar"><input id="search" type="text" placeholder="🔍 搜尋章節（例：光的反射、八上4-1、遺傳）..." oninput="doSearch()"><div class="cnt" id="searchcnt"></div></div>''']

for bk, nm, desc in BOOKS:
    files = sorted(glob.glob(os.path.join(ROOT,'02_加值成品',nm,'*_教材摘要與重點主題.md')),
                   key=lambda p: keyf(os.path.basename(p).replace('_教材摘要與重點主題.md','').replace(nm,''), ''))
    codes = [os.path.basename(p).replace('_教材摘要與重點主題.md','') for p in files]
    codes.sort(key=lambda c: keyf(c.replace(nm,''), ''))
    body.append(f'<details class="book"><summary>{nm}　<small>{desc}｜{len(codes)} 節</small></summary><div class="ch">')
    cur_ch = None
    for full in codes:
        sec = full.replace(nm,'')            # 例 6-1
        ch = sec.split('-')[0]
        if ch != cur_ch:
            cur_ch = ch; body.append(f'<div class="ch-h">第 {ch} 章</div>')
        t = title_of(nm, full)
        hand = ' <span class="badge">精工版</span>' if f'{bk}{sec}' in HAND else ''
        links = (f'<a class="btn i" href="{url(nm,full+"_互動教學.html")}" target="_blank">🎮 互動教學</a>'
                 f'<a class="btn s" href="{url(nm,full+"_授課簡報.html")}" target="_blank">📽 授課簡報</a>'
                 f'<a class="btn" href="{url(nm,full+"_資訊圖表_16-9.html")}" target="_blank">🖼 資訊圖</a>'
                 f'<a class="btn q" href="{url(nm,full+"_線上測驗.html")}" target="_blank">📝 線上測驗</a>'
                 f'<a class="btn" href="{url(nm,full+"_三種難度測驗卷.xlsx")}">⬇️ 測驗XLSX</a>'
                 f'<a class="btn" href="{url(nm,full+"_教材摘要與重點主題.md")}" target="_blank">📄 摘要</a>')
        body.append(f'<div class="sec" data-code="{esc(full)}" data-search="{esc(full+t)}"><div class="name"><span class="code">{esc(sec)}</span>{esc(t)}{hand}<span class="pbadge" id="pb_{esc(full)}" style="display:none"></span></div>{links}</div>')
    body.append('</div></details>')

body.append('''<div class="foot">108課綱國中自然科加值教材 · 生物/理化/地科<br>
原始檔與產生器：<a href="https://github.com/CFM0918/jhs-natural-science" target="_blank">GitHub</a>　·　🤖 Claude Code 協助生成</div></div>''')

JS = """
function doSearch(){
 var kw=document.getElementById('search').value.trim();
 var secs=document.querySelectorAll('.sec'); var shown=0;
 secs.forEach(function(s){
  var hit=!kw || s.dataset.search.toLowerCase().indexOf(kw.toLowerCase())>-1;
  s.classList.toggle('hide', !hit); if(hit)shown++;
  if(hit && kw){var d=s.closest('details'); if(d)d.open=true;}
 });
 document.getElementById('searchcnt').textContent = kw ? ('符合 '+shown+' 節') : '';
}
function paintProgress(){
 if(!window.JHS) return;
 var p=JHS.getProgress(); var done=0, total=document.querySelectorAll('.sec').length;
 document.querySelectorAll('.sec').forEach(function(s){
  var code=s.dataset.code, rec=p[code]; var b=document.getElementById('pb_'+code);
  if(!rec){return;}
  var lvs=Object.keys(rec.levels||{}); if(lvs.length===0)return;
  var right=0,total2=0; lvs.forEach(function(l){right+=rec.levels[l].right;total2+=rec.levels[l].total;});
  var full = lvs.length>=3;
  if(full)done++;
  if(b){b.style.display='inline';b.textContent=right+'/'+total2;b.className='pbadge '+(full?'full':'part');}
 });
 document.getElementById('donestat').textContent = '已完整作答 '+done+'/'+total+' 節';
}
doSearch(); paintProgress();
"""
SITE_URL = "https://cfm0918.github.io/jhs-natural-science/"
SEO_DESC = "108課綱國中自然科(生物+理化+地科)會考總複習教材：103節互動教學、67種Canvas模擬、線上四選一測驗、錯題本、跨節模擬考，近10年會考歷屆試題524題。南一、康軒、翰林三版共同核心。"
doc = f'''<!DOCTYPE html><html lang="zh-TW"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>國中自然科 加值教材｜生物·理化·地科·會考總複習</title>
<meta name="description" content="{SEO_DESC}">
<meta name="keywords" content="國中自然,國中理化,國中生物,國中地科,會考自然,會考總複習,歷屆試題,互動模擬,南一,康軒,翰林">
<link rel="canonical" href="{SITE_URL}">
<meta property="og:type" content="website">
<meta property="og:title" content="國中自然科 加值教材｜生物·理化·地科">
<meta property="og:description" content="{SEO_DESC}">
<meta property="og:url" content="{SITE_URL}">
<meta property="og:locale" content="zh_TW">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="國中自然科 加值教材｜生物·理化·地科">
<meta name="twitter:description" content="{SEO_DESC}">
<link rel="manifest" href="manifest.json">
<meta name="theme-color" content="#1a2e1a">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;700;900&display=swap" rel="stylesheet">
<style>{CSS}</style></head><body>{"".join(body)}
<script src="02_加值成品/progress.js?v=1"></script>
<script>{JS}</script>
<script>if('serviceWorker' in navigator){{window.addEventListener('load',function(){{navigator.serviceWorker.register('sw.js').catch(function(){{}});}});}}</script>
</body></html>'''
open(os.path.join(ROOT, "index.html"), 'w', encoding='utf-8').write(doc)
open(os.path.join(ROOT, ".nojekyll"), 'w').write('')   # 讓 Pages 原樣服務(含中文路徑)
print("OK: index.html + .nojekyll")
