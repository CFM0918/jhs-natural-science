# -*- coding: utf-8 -*-
"""產生 00_教學內容審閱.html：每節 摘要+主題細目+迷思破解+素養連結+Bloom三層教學，供確認教學內容。"""
import os, glob, importlib.util, html

GEN = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.dirname(GEN)
def load(n):
    s = importlib.util.spec_from_file_location(n, os.path.join(GEN, n+'.py'))
    m = importlib.util.module_from_spec(s); s.loader.exec_module(m); return m
BOOKS = [('a','生物'),('b','八上'),('c','八下'),('d','九上'),('e','九下')]
import re
def keyf(code, bk):
    m = re.match(re.escape(bk)+r'(\d+)-(\d+)', code); return (int(m.group(1)),int(m.group(2))) if m else (99,99)
def esc(x): return html.escape(str(x))

CSS = """*{box-sizing:border-box}body{font-family:'Noto Sans TC',system-ui,sans-serif;margin:0;background:#f4f1e8;color:#222;line-height:1.65}
.wrap{max-width:960px;margin:0 auto;padding:24px 16px}h1{font-size:26px;color:#1a2e1a}
.intro{color:#555;font-size:14px;margin-bottom:16px}
.nav{position:sticky;top:0;background:#1a2e1a;padding:10px;border-radius:8px;margin-bottom:20px;z-index:9}
.nav a{color:#f0d878;margin-right:14px;text-decoration:none;font-weight:700}
.book-h{font-size:22px;color:#6b4a32;border-bottom:3px solid #6b4a32;margin:26px 0 10px;padding-bottom:4px}
details{background:#fff;border:1px solid #ddd;border-radius:10px;margin:10px 0;padding:0 16px}
summary{cursor:pointer;font-size:17px;font-weight:700;color:#1a2e1a;padding:12px 0}
h4{margin:14px 0 4px;font-size:15px;color:#6b4a32;border-left:4px solid #f0d878;padding-left:8px}
.sum{background:#faf6ec;border-left:4px solid #9fc8d8;padding:10px 14px;font-size:14px;border-radius:4px}
.th{background:#eef5ee;border-radius:6px;padding:8px 12px;margin:6px 0;font-size:14px}
.th b{color:#1a2e1a}
table{width:100%;border-collapse:collapse;font-size:13.5px;margin:4px 0}
th,td{border:1px solid #e0e0e0;padding:6px 9px;text-align:left;vertical-align:top}
th{background:#eef2ee}.x{color:#b00}.o{color:#0a7}
.bloom{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;font-size:13px}
.bcard{border-radius:8px;padding:10px}.bA{background:#eaf5ea}.bB{background:#eaf0f6}.bC{background:#f8ecec}
.bcard b{display:block;margin-bottom:4px}
@media(max-width:700px){.bloom{grid-template-columns:1fr}}
.life{font-size:13.5px}.life li{margin:2px 0}
"""

body = ['<div class="wrap"><h1>國中自然科 教學內容審閱</h1>',
 '<div class="intro">103 節教學內容：每節含【本節摘要】【重點主題與細目】【常見迷思破解】【素養/生活連結】【Bloom 三層差異化教學】。點標題展開，逐節確認教學內容是否正確、完整、合宜。</div>',
 '<div class="nav">' + ''.join(f'<a href="#{bk}">{nm}</a>' for bk,nm in BOOKS) + '</div>']

for bk, nm in BOOKS:
    body.append(f'<h2 class="book-h" id="{bk}">{nm}</h2>')
    files = sorted(glob.glob(os.path.join(GEN, f'L_{bk}*.py')), key=lambda p: keyf(os.path.basename(p)[2:-3].replace('_','-',1), bk))
    for p in files:
        code = os.path.basename(p)[2:-3].replace('_','-',1); L = load(os.path.basename(p)[:-3]).L
        themes = ''.join(f'<div class="th"><b>{esc(t["name"])}</b>：{esc("　".join(t["points"]))}</div>' for t in L['themes'])
        misc = ''.join(f'<tr><td class="x">✗ {esc(m[0])}</td><td class="o">✓ {esc(m[1])}</td></tr>' for m in L.get('misconceptions',[]))
        life = ''.join(f'<li><b>{esc(x[0])}</b>：{esc(x[1])}</li>' for x in L.get('life',[]))
        b = L['bloom']
        def tasks(k): return '、'.join(b[k]['tasks'])
        bloom = f'''<div class="bloom">
<div class="bcard bA"><b>A 基礎鞏固（記憶·理解）</b>{esc(b["A"]["focus"])}<br><small>練習：{esc(tasks("A"))}<br>檢核：{esc(b["A"]["check"])}</small></div>
<div class="bcard bB"><b>B 標準精熟（應用·分析）</b>{esc(b["B"]["focus"])}<br><small>練習：{esc(tasks("B"))}<br>檢核：{esc(b["B"]["check"])}</small></div>
<div class="bcard bC"><b>C 挑戰延伸（評鑑·創造）</b>{esc(b["C"]["focus"])}<br><small>練習：{esc(tasks("C"))}<br>檢核：{esc(b["C"]["check"])}</small></div></div>'''
        body.append(f'''<details><summary>{esc(code)}　{esc(L["title"])}</summary>
<h4>本節摘要</h4><div class="sum">{esc(L["summary"])}</div>
<h4>重點主題與細目</h4>{themes}
<h4>常見迷思破解</h4><table><tr><th>常見迷思</th><th>正確觀念</th></tr>{misc}</table>
<h4>素養 · 生活連結</h4><ul class="life">{life}</ul>
<h4>Bloom 三層差異化教學</h4>{bloom}
</details>''')
body.append('</div>')
doc = f'<!DOCTYPE html><html lang="zh-TW"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>國中自然科 教學內容審閱</title><style>{CSS}</style></head><body>{"".join(body)}</body></html>'
open(os.path.join(ROOT, "00_教學內容審閱.html"), 'w', encoding='utf-8').write(doc)
print("OK: 00_教學內容審閱.html")
