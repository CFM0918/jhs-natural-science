# -*- coding: utf-8 -*-
"""掃描 02_加值成品/，產生 00_教材總目錄.html 與 00_檔案清單.md（放專案根目錄）。"""
import os, re, glob, html

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "02_加值成品")
BOOKS = ['生物', '八上', '八下', '九上', '九下']
BOOKDESC = {'生物':'七年級', '八上':'八年級上', '八下':'八年級下', '九上':'九年級上（理化＋地科）', '九下':'九年級下（理化＋地科）'}
PRODUCTS = [
    ('授課簡報', '_授課簡報.html', '簡報'),
    ('教材摘要與重點主題', '_教材摘要與重點主題.md', '摘要'),
    ('資訊圖表_16-9', '_資訊圖表_16-9.html', '圖表'),
    ('Bloom差異化教材報告', '_Bloom差異化教材報告.md', 'Bloom'),
    ('三種難度測驗卷', '_三種難度測驗卷.xlsx', '測驗30題'),
]

def secnum(prefix, book):
    m = re.match(re.escape(book) + r'(\d+)-(\d+)', prefix)
    return (int(m.group(1)), int(m.group(2))) if m else (99, 99)

def get_title(book, prefix):
    p = os.path.join(OUT, book, f"{prefix}_教材摘要與重點主題.md")
    try:
        h1 = open(p, encoding='utf-8').readline()
        m = re.search(r'《(.+?)》', h1)
        if m: return m.group(1)
    except Exception:
        pass
    return ''

def scan(book):
    secs = {}
    for f in glob.glob(os.path.join(OUT, book, f"{book}*_教材摘要與重點主題.md")):
        prefix = os.path.basename(f).replace('_教材摘要與重點主題.md', '')
        secs[prefix] = get_title(book, prefix)
    return sorted(secs.items(), key=lambda kv: secnum(kv[0], book))

# ---- 檔案清單 MD ----
def gen_md():
    lines = ["# 國中自然（理化/地科/生物）加值教材 檔案清單\n",
             "108 課綱國中會考自然科完整加值教材。每節 5 種產出，共 103 節。\n"]
    total = 0
    for b in BOOKS:
        secs = scan(b)
        lines.append(f"\n## {b}（{BOOKDESC[b]}）— {len(secs)} 節\n")
        lines.append("| 節 | 標題 | 產出 |")
        lines.append("|---|---|---|")
        for prefix, title in secs:
            n = prefix.replace(b, '')
            lines.append(f"| {n} | {title} | 簡報 / 摘要 / 圖表 / Bloom / 測驗30題 |")
            total += 5
        lines.append("")
    lines.insert(2, f"\n> 總計 103 節 × 5 種產出 = {total} 檔。測驗皆 30 題（基礎/進階/挑戰各10）。\n")
    open(os.path.join(ROOT, "00_檔案清單.md"), 'w', encoding='utf-8').write("\n".join(lines))

# ---- 總目錄 HTML ----
CSS = """*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Noto Sans TC',system-ui,sans-serif;background:#0d1410;color:#f4f1e8;padding:32px 18px;line-height:1.6}
.wrap{max-width:1080px;margin:0 auto}
h1{font-size:28px;color:#f0d878;margin-bottom:6px}
.sub{color:#9fc8d8;margin-bottom:24px;font-size:15px}
.book{background:#1a2e1a;border:1px solid rgba(240,216,120,.15);border-radius:12px;margin-bottom:22px;overflow:hidden}
.bh{background:rgba(240,216,120,.1);padding:14px 20px;font-size:19px;font-weight:700;color:#f0d878;border-bottom:1px solid rgba(240,216,120,.15)}
.bh small{color:#9fc8d8;font-weight:400;font-size:13px;margin-left:8px}
table{width:100%;border-collapse:collapse}
td,th{padding:9px 14px;text-align:left;border-bottom:1px solid rgba(255,255,255,.06);font-size:14px;vertical-align:top}
th{color:#9fc8d8;font-size:12px;letter-spacing:1px}
.sec{color:#f0d878;font-weight:700;white-space:nowrap}
.ti{color:#f4f1e8}
a{color:#9fc8d8;text-decoration:none;margin-right:2px;display:inline-block;padding:2px 7px;border:1px solid rgba(159,200,216,.3);border-radius:6px;font-size:12px;margin-bottom:3px}
a:hover{background:rgba(159,200,216,.15);color:#fff}
.q{border-color:rgba(232,160,160,.4);color:#e8a0a0}
.foot{text-align:center;color:rgba(244,241,232,.4);font-size:12px;margin-top:20px}"""

def gen_html():
    body = ['<div class="wrap">',
            '<h1>國中自然科 加值教材 總目錄</h1>',
            '<div class="sub">108 課綱｜生物＋理化＋地科｜會考範圍｜103 節 × 5 種產出．測驗皆 30 題</div>']
    for b in BOOKS:
        secs = scan(b)
        body.append(f'<div class="book"><div class="bh">{b}<small>{BOOKDESC[b]}｜{len(secs)} 節</small></div>')
        body.append('<table><tr><th>節</th><th>標題</th><th>教材產出</th></tr>')
        for prefix, title in secs:
            n = prefix.replace(b, '')
            links = ''.join(
                f'<a class="{"q" if suf.endswith("xlsx") else ""}" href="02_加值成品/{b}/{prefix}{suf}">{lbl}</a>'
                for _, suf, lbl in PRODUCTS)
            body.append(f'<tr><td class="sec">{n}</td><td class="ti">{html.escape(title)}</td><td>{links}</td></tr>')
        body.append('</table></div>')
    body.append('<div class="foot">自動產生 · make_index.py · 修改教材後重跑即更新</div></div>')
    doc = f'<!DOCTYPE html><html lang="zh-TW"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>國中自然科加值教材 總目錄</title><style>{CSS}</style></head><body>{"".join(body)}</body></html>'
    open(os.path.join(ROOT, "00_教材總目錄.html"), 'w', encoding='utf-8').write(doc)

gen_md(); gen_html()
print("OK: 00_檔案清單.md + 00_教材總目錄.html generated at project root")
