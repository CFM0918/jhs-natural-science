# -*- coding: utf-8 -*-
"""產生 GitHub Pages 入口 index.html（首頁）＋ 5 個分冊頁面（生物/八上/八下/九上/九下）。
版面比照數學站 cfm0918.github.io/math/ 的 Hero＋卡片式九宮格風格。"""
import os, glob, importlib.util, html, urllib.parse, re

GEN = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.dirname(GEN)
def load(n):
    s = importlib.util.spec_from_file_location(n, os.path.join(GEN, n+'.py'))
    m = importlib.util.module_from_spec(s); s.loader.exec_module(m); return m

BOOKS = [
    ('a','生物','七年級 · 生物','正負數不用，聚焦細胞、遺傳、演化、生態，會考自然第三塊拼圖。'),
    ('b','八上','八年級上 · 理化','測量、物質三態、波與聲音、光學、熱學、原子與元素。'),
    ('c','八下','八年級下 · 理化','化學反應、氧化還原、酸鹼鹽、反應速率、有機化合物、力學。'),
    ('d','九上','九年級上 · 理化＋地科','運動學、牛頓運動定律、能量、電學、地殼與地震、地球運動。'),
    ('e','九下','九年級下 · 理化＋地科','電流效應、磁與電磁感應、大氣與天氣、海洋、永續發展。'),
]
HAND = {'a6-1','c3-3','d4-3'}  # 手做精工版

def keyf(sec):
    m = re.match(r'(\d+)-(\d+)', sec); return (int(m.group(1)),int(m.group(2))) if m else (99,99)
def esc(x): return html.escape(str(x))
def url(book, fn): return '02_加值成品/'+urllib.parse.quote(book)+'/'+urllib.parse.quote(fn)

def title_of(book, code):
    p = os.path.join(ROOT, '02_加值成品', book, f'{code}_教材摘要與重點主題.md')
    try:
        m = re.search(r'《(.+?)》', open(p, encoding='utf-8').readline())
        if m: return m.group(1)
    except Exception: pass
    return ''

# ---------- 共用視覺風格（比照數學站 CSS） ----------
BASE_CSS = """
:root{--bg:#08120c;--panel:#14251a;--panel2:#1b3021;--ink:#f6f2e8;--soft:#c9cec5;--gold:#f0d878;--green:#a8d0a0;--blue:#9fc8d8;--red:#e8a0a0;--line:#ffffff1c}
*{box-sizing:border-box}html{scroll-behavior:smooth}
body{margin:0;min-height:100vh;background:radial-gradient(circle at 50% -10%,#203e2b,var(--bg) 48%);color:var(--ink);font-family:'Noto Sans TC',system-ui,-apple-system,"Microsoft JhengHei",sans-serif}
a{color:inherit;text-decoration:none}
.wrap{max-width:1120px;margin:auto;padding:26px 18px 70px}
.top{display:flex;align-items:center;gap:12px;margin-bottom:25px;flex-wrap:wrap}
.brand{font-size:21px;font-weight:900;color:var(--gold)}
.nav{margin-left:auto;display:flex;gap:8px;flex-wrap:wrap}
.nav a{padding:9px 12px;border:1px solid #ffffff25;background:#ffffff0c;border-radius:10px;font-size:14px}
.nav a:hover{background:#ffffff1c}
.hero{padding:36px 0 26px}
.badge{display:inline-block;padding:7px 11px;border-radius:999px;color:var(--gold);font-weight:850;background:#f0d87814;border:1px solid #f0d87850;font-size:13px}
h1{font-size:clamp(30px,5.4vw,54px);line-height:1.1;margin:15px 0 10px}
h2,h3{line-height:1.3}
p{color:var(--soft);line-height:1.75}
.hero .stat{margin-top:10px;font-size:13px;color:var(--soft)}
.grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}
.grid.two{grid-template-columns:repeat(2,minmax(0,1fr))}
.card{display:flex;flex-direction:column;min-height:190px;padding:22px;background:linear-gradient(155deg,var(--panel2),var(--panel));border:1px solid var(--line);border-radius:18px;box-shadow:0 15px 35px #0004;transition:transform .15s,border-color .15s}
.card:hover{transform:translateY(-3px);border-color:#f0d87850}
.card h2,.card h3{margin:8px 0}
.tag{font-size:13px;color:var(--gold);font-weight:900;letter-spacing:.04em}
.actions{display:flex;gap:9px;flex-wrap:wrap;margin-top:auto;padding-top:15px}
.btn{display:inline-flex;align-items:center;justify-content:center;padding:11px 14px;border-radius:11px;font-weight:850;border:0;font-size:14px;min-height:40px}
.primary{background:var(--gold);color:#172016}
.secondary{border:1px solid #ffffff2c;background:#ffffff0b;color:var(--ink)}
.chapter{margin:34px 0 14px;color:var(--gold)}
footer{margin-top:42px;padding-top:24px;border-top:1px solid var(--line);text-align:center;color:var(--soft);font-size:13px}
footer a{color:var(--blue)}
@media(max-width:800px){.grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:560px){.grid,.grid.two{grid-template-columns:1fr}.nav{justify-content:flex-end}h1{font-size:34px}}
"""

NAV = ('<a href="index.html">平台首頁</a><a href="歷屆試題總覽.html">歷屆試題</a>'
       '<a href="模擬考.html">模擬測驗</a><a href="錯題本.html">錯題本</a>')

def head(title, desc):
    return f'''<!DOCTYPE html><html lang="zh-TW"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{esc(title)}</title>
<meta name="description" content="{esc(desc)}">
<link rel="manifest" href="manifest.json">
<meta name="theme-color" content="#08120c">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;700;900&display=swap" rel="stylesheet">
<style>{BASE_CSS}</style></head><body>'''

SW_TAG = "<script>if('serviceWorker' in navigator){window.addEventListener('load',function(){navigator.serviceWorker.register('sw.js').catch(function(){});});}</script>"

# ---------- 首頁 index.html ----------
def build_index():
    total_secs = 0
    cards = []
    for bk, nm, tag, desc in BOOKS:
        files = sorted(glob.glob(os.path.join(ROOT,'02_加值成品',nm,'*_教材摘要與重點主題.md')))
        n = len(files); total_secs += n
        cards.append(f'''<a class="card" href="{esc(nm)}.html"><div class="tag">{esc(tag)}</div><h2>{esc(nm)}</h2><p>{esc(desc)}（共 {n} 節）</p><div class="actions"><span class="btn primary">進入{esc(nm)}</span></div></a>''')

    doc = head("國中自然科 加值教材｜生物·理化·地科·會考總複習",
               "108課綱國中自然科(生物+理化+地科)會考總複習教材：103節互動教學、Canvas模擬、線上測驗、錯題本、跨節模擬考、11年歷屆試題574題。南一、康軒、翰林三版共同核心。")
    doc += f'''<div class="wrap">
<header class="top"><div class="brand">國中自然科加值教材</div><nav class="nav">{NAV}</nav></header>
<section class="hero"><span class="badge">108課綱・會考複習</span>
<h1>國中自然科<br>加值教材</h1>
<p>生物＋理化＋地科・南一、康軒、翰林三版共同核心，先選冊別，再選章節，進入互動教材與授課簡報。</p>
<div class="stat">{total_secs} 節 · 3090+ 題測驗 · 11 年歷屆試題 574 題 · <span id="donestat">學習進度載入中…</span></div>
</section>
<section class="grid">{"".join(cards)}</section>
<h2 class="chapter">學習輔助</h2>
<section class="grid">
<a class="card" href="歷屆試題總覽.html"><div class="tag">EXAM · 105～115年</div><h2>歷屆試題</h2><p>近 11 年國中教育會考自然科官方題目與正解，逐題白話解析＋原圖對照。</p><div class="actions"><span class="btn primary">開始練習</span></div></a>
<a class="card" href="模擬考.html"><div class="tag">MOCK · 跨節混合</div><h2>跨節模擬考</h2><p>從全 103 節題庫中隨機抽題，模擬會考混合出題情境，自動批改、錯題自動歸檔。</p><div class="actions"><span class="btn primary">開始測驗</span></div></a>
<a class="card" href="錯題本.html"><div class="tag">REVIEW · 個人化</div><h2>我的錯題本</h2><p>自動收集各節測驗與模擬考的錯題，依節分組複習，學會了可個別移除。</p><div class="actions"><span class="btn secondary">查看錯題</span></div></a>
</section>
<footer>108課綱國中自然科加值教材 · 生物/理化/地科<br>原始檔與產生器：<a href="https://github.com/CFM0918/jhs-natural-science" target="_blank">GitHub</a>　·　🤖 Claude Code 協助生成</footer>
</div>
<script src="02_加值成品/progress.js?v=1"></script>
<script>
function paintDone(){{
 if(!window.JHS) return;
 var p=JHS.getProgress(); var done=0, total={total_secs};
 Object.keys(p).forEach(function(code){{
  var rec=p[code]; var lvs=Object.keys(rec.levels||{{}});
  if(lvs.length>=3) done++;
 }});
 document.getElementById('donestat').textContent = '已完整作答 '+done+'/'+total+' 節';
}}
paintDone();
</script>
{SW_TAG}
</body></html>'''
    open(os.path.join(ROOT, "index.html"), 'w', encoding='utf-8').write(doc)

# ---------- 分冊頁面 ----------
BOOK_CSS = """
.searchbar{position:sticky;top:0;z-index:15;background:var(--bg);padding:12px 0;margin:6px 0}
.searchbar input{width:100%;font-size:15px;padding:11px 16px;border-radius:10px;border:1px solid var(--line);background:var(--panel);color:var(--ink)}
.searchbar input::placeholder{color:#ffffff55}
.searchbar .cnt{font-size:12px;color:var(--blue);margin-top:6px;padding-left:2px}
.ch-h{color:var(--red);font-size:14px;font-weight:700;margin:20px 0 8px;border-left:3px solid var(--red);padding-left:8px}
.sec{display:flex;flex-wrap:wrap;align-items:center;gap:8px;padding:12px 14px;margin-bottom:8px;background:var(--panel);border:1px solid var(--line);border-radius:12px}
.sec.hide{display:none}
.sec .name{flex:1;min-width:180px;font-size:14.5px}
.sec .code{color:var(--gold);font-weight:700;margin-right:6px}
.hbadge{font-size:10px;background:var(--red);color:#172016;border-radius:4px;padding:1px 5px;font-weight:700;margin-left:6px}
a.sbtn{font-size:12px;padding:6px 11px;border-radius:8px;border:1px solid #ffffff2c;color:var(--soft);white-space:nowrap;min-height:32px;display:inline-flex;align-items:center}
a.sbtn:hover{background:#ffffff14}
a.sbtn.s{border-color:#f0d87860;color:var(--gold)}a.sbtn.s:hover{background:#f0d87820}
a.sbtn.i{border-color:#a8d0a070;color:var(--green);font-weight:700}a.sbtn.i:hover{background:#a8d0a020}
a.sbtn.q{border-color:#e8a0a060;color:var(--red)}a.sbtn.q:hover{background:#e8a0a020}
.pbadge{font-size:11px;border-radius:5px;padding:2px 7px;font-weight:700;margin-left:4px}
.pbadge.full{background:var(--green);color:#172016}.pbadge.part{background:var(--gold);color:#172016}
@media(max-width:600px){.sec .name{min-width:100%}}
"""

BOOK_JS = """
function doSearch(){
 var kw=document.getElementById('search').value.trim();
 var secs=document.querySelectorAll('.sec'); var shown=0;
 secs.forEach(function(s){
  var hit=!kw || s.dataset.search.toLowerCase().indexOf(kw.toLowerCase())>-1;
  s.classList.toggle('hide', !hit); if(hit)shown++;
 });
 document.getElementById('searchcnt').textContent = kw ? ('符合 '+shown+' 節') : '';
}
function paintProgress(){
 if(!window.JHS) return;
 var p=JHS.getProgress();
 document.querySelectorAll('.sec').forEach(function(s){
  var code=s.dataset.code, rec=p[code]; var b=document.getElementById('pb_'+code);
  if(!rec || !b) return;
  var lvs=Object.keys(rec.levels||{}); if(lvs.length===0)return;
  var right=0,total2=0; lvs.forEach(function(l){right+=rec.levels[l].right;total2+=rec.levels[l].total;});
  var full = lvs.length>=3;
  b.style.display='inline';b.textContent=right+'/'+total2;b.className='pbadge '+(full?'full':'part');
 });
}
doSearch(); paintProgress();
"""

def build_book(bk, nm, tag, desc):
    files = sorted(glob.glob(os.path.join(ROOT,'02_加值成品',nm,'*_教材摘要與重點主題.md')))
    codes = [os.path.basename(p).replace('_教材摘要與重點主題.md','') for p in files]
    codes.sort(key=lambda c: keyf(c.replace(nm,'')))

    rows = []
    cur_ch = None
    for full in codes:
        sec = full.replace(nm,'')
        ch = sec.split('-')[0]
        if ch != cur_ch:
            cur_ch = ch; rows.append(f'<div class="ch-h">第 {esc(ch)} 章</div>')
        t = title_of(nm, full)
        hand = ' <span class="hbadge">精工版</span>' if f'{bk}{sec}' in HAND else ''
        links = (f'<a class="sbtn i" href="{url(nm,full+"_互動教學.html")}" target="_blank">🎮 互動教學</a>'
                 f'<a class="sbtn s" href="{url(nm,full+"_授課簡報.html")}" target="_blank">📽 授課簡報</a>'
                 f'<a class="sbtn" href="{url(nm,full+"_資訊圖表_16-9.html")}" target="_blank">🖼 資訊圖</a>'
                 f'<a class="sbtn q" href="{url(nm,full+"_線上測驗.html")}" target="_blank">📝 線上測驗</a>'
                 f'<a class="sbtn" href="{url(nm,full+"_三種難度測驗卷.xlsx")}">⬇️ XLSX</a>'
                 f'<a class="sbtn" href="{url(nm,full+"_教材摘要與重點主題.md")}" target="_blank">📄 摘要</a>')
        rows.append(f'<div class="sec" data-code="{esc(full)}" data-search="{esc(full+t)}"><div class="name"><span class="code">{esc(sec)}</span>{esc(t)}{hand}<span class="pbadge" id="pb_{esc(full)}" style="display:none"></span></div>{links}</div>')

    doc = head(f"{nm}｜國中自然科加值教材", f"{tag}：{desc}共 {len(codes)} 節，每節含互動教學、授課簡報、資訊圖、線上測驗、測驗卷、摘要。")
    doc += f'''<style>{BOOK_CSS}</style><div class="wrap">
<header class="top"><div class="brand">國中自然科加值教材</div><nav class="nav">{NAV}</nav></header>
<section class="hero"><span class="badge">{esc(tag)}</span><h1>{esc(nm)}</h1><p>{esc(desc)}共 {len(codes)} 節，點擊按鈕即可開啟互動教學、簡報、測驗等成品。</p></section>
<div class="searchbar"><input id="search" type="text" placeholder="🔍 搜尋本冊章節（例：光的反射、4-1、遺傳）..." oninput="doSearch()"><div class="cnt" id="searchcnt"></div></div>
{"".join(rows)}
<footer>108課綱國中自然科加值教材 · <a href="index.html">回平台首頁</a></footer>
</div>
<script src="02_加值成品/progress.js?v=1"></script>
<script>{BOOK_JS}</script>
{SW_TAG}
</body></html>'''
    open(os.path.join(ROOT, f"{nm}.html"), 'w', encoding='utf-8').write(doc)

def main():
    build_index()
    for bk, nm, tag, desc in BOOKS:
        build_book(bk, nm, tag, desc)
    open(os.path.join(ROOT, ".nojekyll"), 'w').write('')
    print(f"OK: index.html + {len(BOOKS)} 個分冊頁面 + .nojekyll")

if __name__ == '__main__':
    main()
