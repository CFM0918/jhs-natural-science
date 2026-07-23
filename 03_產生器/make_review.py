# -*- coding: utf-8 -*-
"""產生 00_內容審閱.html（放專案根）：每節摘要+主題+30題(含答案解析)，供人工確認。"""
import os, glob, importlib.util, html

GEN = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.dirname(GEN)
def load(n):
    s = importlib.util.spec_from_file_location(n, os.path.join(GEN, n+'.py'))
    m = importlib.util.module_from_spec(s); s.loader.exec_module(m); return m
EXTRA = {}
for p in sorted(glob.glob(os.path.join(GEN, 'quiz_extra_*.py'))):
    EXTRA.update(load(os.path.basename(p)[:-3]).EXTRA)

BOOKS = [('a','生物'),('b','八上'),('c','八下'),('d','九上'),('e','九下')]
def keyf(code, bk):
    import re; m = re.match(re.escape(bk)+r'(\d+)-(\d+)', code); return (int(m.group(1)),int(m.group(2))) if m else (99,99)

CSS = """*{box-sizing:border-box}body{font-family:'Noto Sans TC',system-ui,sans-serif;margin:0;background:#f4f1e8;color:#222;line-height:1.6}
.wrap{max-width:960px;margin:0 auto;padding:24px 16px}
h1{font-size:26px;color:#1a2e1a}.intro{color:#555;font-size:14px;margin-bottom:16px}
.nav{position:sticky;top:0;background:#1a2e1a;padding:10px;border-radius:8px;margin-bottom:20px;z-index:9}
.nav a{color:#f0d878;margin-right:14px;text-decoration:none;font-weight:700}
details{background:#fff;border:1px solid #ddd;border-radius:10px;margin:10px 0;padding:0 16px}
summary{cursor:pointer;font-size:17px;font-weight:700;color:#1a2e1a;padding:12px 0}
.sum{background:#faf6ec;border-left:4px solid #9fc8d8;padding:10px 14px;margin:8px 0;font-size:14px;border-radius:4px}
.themes{font-size:14px;margin:8px 0}.themes li{margin:2px 0}
.book-h{font-size:22px;color:#6b4a32;border-bottom:3px solid #6b4a32;margin:26px 0 10px;padding-bottom:4px}
table{width:100%;border-collapse:collapse;margin:8px 0 16px;font-size:13.5px}
th,td{border:1px solid #e0e0e0;padding:6px 9px;text-align:left;vertical-align:top}
th{background:#eef2ee}.sh{background:#f0d878;font-weight:700;padding:5px 9px;margin-top:8px}
td.a{color:#b00;font-weight:700;white-space:nowrap}td.e{color:#777;font-size:12px}td.n{color:#999;text-align:center;width:24px}
"""

def esc(x): return html.escape(str(x))
body = ['<div class="wrap"><h1>國中自然科教材 內容審閱</h1>',
 '<div class="intro">103 節，每節含摘要、四大主題、30 題（基礎/進階/挑戰各10，附答案與解析）。點各節標題展開。逐節確認無誤即可。</div>',
 '<div class="nav">' + ''.join(f'<a href="#{bk}">{nm}</a>' for bk,nm in BOOKS) + '</div>']

for bk, nm in BOOKS:
    body.append(f'<h2 class="book-h" id="{bk}">{nm}</h2>')
    files = sorted(glob.glob(os.path.join(GEN, f'L_{bk}*.py')), key=lambda p: keyf(os.path.basename(p)[2:-3].replace('_','-',1), bk))
    for p in files:
        code = os.path.basename(p)[2:-3].replace('_','-',1)
        L = load(os.path.basename(p)[:-3]).L
        q = {k:list(v) for k,v in L['quiz'].items()}
        if code in EXTRA:
            for sh,qs in EXTRA[code].items(): q[sh]=q.get(sh,[])+list(qs)
        themes = ''.join(f'<li><b>{esc(t["name"])}</b>：{esc("、".join(t["points"]))}</li>' for t in L['themes'])
        rows = []
        for sh, items in q.items():
            rows.append(f'<tr><td colspan="4" class="sh">{esc(sh)}（{len(items)}題）</td></tr>')
            for i,(Q,A,E) in enumerate(items,1):
                rows.append(f'<tr><td class="n">{i}</td><td>{esc(Q)}</td><td class="a">{esc(A)}</td><td class="e">{esc(E)}</td></tr>')
        body.append(f'''<details><summary>{esc(code)}　{esc(L["title"])}</summary>
<div class="sum">{esc(L["summary"])}</div>
<ul class="themes">{themes}</ul>
<table><tr><th>#</th><th>題目</th><th>答案</th><th>解析</th></tr>{"".join(rows)}</table></details>''')
body.append('</div>')
doc = f'<!DOCTYPE html><html lang="zh-TW"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>國中自然科教材 內容審閱</title><style>{CSS}</style></head><body>{"".join(body)}</body></html>'
open(os.path.join(ROOT, "00_內容審閱.html"), 'w', encoding='utf-8').write(doc)
print("OK: 00_內容審閱.html")
