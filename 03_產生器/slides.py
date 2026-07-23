# -*- coding: utf-8 -*-
"""簡報HTML + 16:9資訊圖表HTML 產生器"""
import os
OUT="/mnt/user-data/outputs"

SLIDE_CSS="""@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;700&family=Noto+Serif+TC:wght@700&display=swap');
:root{--board:#1a2e1a;--chalk:#f4f1e8;--yellow:#f0d878;--blue:#9fc8d8;--red:#e8a0a0;--green:#a8d0a0;}
*{margin:0;padding:0;box-sizing:border-box;}
body{background:#0d160d;font-family:'Noto Sans TC',sans-serif;color:var(--chalk);}
.deck{max-width:1000px;margin:0 auto;padding:20px;}
.slide{background:var(--board);border-radius:12px;margin-bottom:24px;padding:44px 48px;min-height:520px;position:relative;box-shadow:0 6px 24px rgba(0,0,0,0.5);border:1px solid rgba(240,216,120,0.15);display:flex;flex-direction:column;}
.slide::after{content:attr(data-page);position:absolute;bottom:16px;right:24px;font-size:12px;color:rgba(244,241,232,0.35);}
.slide::before{content:'';position:absolute;inset:0;border-radius:12px;background:repeating-linear-gradient(0deg,transparent,transparent 32px,rgba(255,255,255,0.015) 32px,rgba(255,255,255,0.015) 33px);pointer-events:none;}
.eyebrow{color:var(--yellow);font-size:13px;letter-spacing:3px;margin-bottom:12px;}
.slide h1{font-family:'Noto Serif TC',serif;font-size:40px;line-height:1.3;margin-bottom:8px;}
.slide h2{font-family:'Noto Serif TC',serif;font-size:30px;color:var(--yellow);margin-bottom:24px;border-bottom:2px solid rgba(240,216,120,0.3);padding-bottom:10px;}
.slide p{font-size:19px;line-height:1.9;margin-bottom:14px;}
.big-center{flex:1;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;}
.big-center .lead{font-size:22px;color:var(--blue);letter-spacing:2px;}
ul{list-style:none;margin:8px 0;}
li{font-size:19px;line-height:2;padding-left:28px;position:relative;}
li::before{content:'▹';position:absolute;left:4px;color:var(--yellow);}
.hl{color:var(--yellow);font-weight:700;}.hl-b{color:var(--blue);font-weight:700;}.hl-r{color:var(--red);font-weight:700;}
.box{background:rgba(159,200,216,0.1);border:1px solid rgba(159,200,216,0.3);border-radius:8px;padding:18px 22px;margin:14px 0;font-size:18px;line-height:1.9;}
.box.y{background:rgba(240,216,120,0.1);border-color:rgba(240,216,120,0.3);}
.box.r{background:rgba(232,160,160,0.1);border-color:rgba(232,160,160,0.3);}
.box-b{background:rgba(159,200,216,0.1);border:1px solid rgba(159,200,216,0.3);border-radius:8px;padding:18px 22px;margin:14px 0;font-size:18px;line-height:1.9;}
.eg{background:rgba(0,0,0,0.2);border-radius:8px;padding:16px 20px;margin:12px 0;font-size:18px;}
.eg .q{color:var(--blue);margin-bottom:8px;}
.tbl{width:100%;border-collapse:collapse;margin:14px 0;font-size:17px;}
.tbl th,.tbl td{border:1px solid rgba(244,241,232,0.2);padding:10px 14px;text-align:center;}
.tbl th{background:rgba(240,216,120,0.15);color:var(--yellow);}
.print-hint{text-align:center;color:rgba(244,241,232,0.4);font-size:13px;padding:10px 0 24px;}
@media print{body{background:#fff;}.deck{max-width:none;padding:0;}.slide{page-break-after:always;margin:0;border-radius:0;box-shadow:none;min-height:98vh;}.print-hint{display:none;}}"""

def _slide(page, total, inner):
    return f'<div class="slide" data-page="{page} / {total}">{inner}</div>\n'

def gen_slides(L):
    S=L['slides']  # list of slide dicts
    total=len(S)
    body=f'<div class="print-hint">📽 共 {total} 張投影片　·　按 Ctrl+P 可列印或轉存 PDF</div>\n'
    for i,s in enumerate(S,1):
        body+=_slide(i,total,s['html'])
    html=f"""<!DOCTYPE html><html lang="zh-TW"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>{L['code']} {L['title']}｜授課簡報</title><style>{SLIDE_CSS}</style></head><body><div class="deck">{body}</div></body></html>"""
    p=os.path.join(OUT,f"{L['code']}_授課簡報.html")
    open(p,"w",encoding="utf-8").write(html)
    return p, total

INFO_CSS="""@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;700;900&family=Noto+Serif+TC:wght@700;900&display=swap');
:root{--board:#1a2e1a;--chalk:#f4f1e8;--yellow:#f0d878;--blue:#9fc8d8;--red:#e8a0a0;--green:#a8d0a0;--purple:#c4a8d8;}
*{margin:0;padding:0;box-sizing:border-box;}
body{background:#0d160d;font-family:'Noto Sans TC',sans-serif;padding:20px;}
.info{width:100%;max-width:1280px;margin:0 auto 28px;aspect-ratio:16/9;background:var(--board);border-radius:14px;padding:44px 54px;position:relative;box-shadow:0 8px 30px rgba(0,0,0,0.5);border:1px solid rgba(240,216,120,0.15);overflow:hidden;color:var(--chalk);display:flex;flex-direction:column;}
.info::before{content:'';position:absolute;inset:0;background:repeating-linear-gradient(0deg,transparent,transparent 34px,rgba(255,255,255,0.012) 34px,rgba(255,255,255,0.012) 35px);pointer-events:none;}
.tag{position:absolute;top:24px;right:32px;font-size:12px;letter-spacing:2px;color:rgba(244,241,232,0.4);}
.ititle{font-family:'Noto Serif TC',serif;font-size:42px;font-weight:900;margin-bottom:6px;}
.isub{font-size:17px;color:var(--blue);letter-spacing:1px;margin-bottom:26px;}
.hl{color:var(--yellow);font-weight:700;}.hl-r{color:var(--red);font-weight:700;}.hl-b{color:var(--blue);font-weight:700;}
.print-hint{max-width:1280px;margin:0 auto;text-align:center;color:rgba(244,241,232,0.4);font-size:13px;padding:8px 0 20px;}
@media print{body{background:#fff;padding:0;}.info{page-break-after:always;margin:0;border-radius:0;box-shadow:none;max-width:none;}.print-hint{display:none;}}"""

def gen_infographics(L):
    cards=L['infographics']  # list of {tag,title,sub,body}
    n=len(cards)
    body=f'<div class="print-hint">🖼 {n} 張 16:9 詳細資訊圖表　·　可投影、列印，或截圖作教學海報</div>\n'
    for i,c in enumerate(cards,1):
        body+=f'''<div class="info"><div class="tag">資訊圖 {i} / {n}</div><div class="ititle">{c['title']}</div><div class="isub">{c['sub']}</div>{c['body']}</div>\n'''
    html=f"""<!DOCTYPE html><html lang="zh-TW"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>{L['code']} {L['title']}｜資訊圖表 16:9</title><style>{INFO_CSS}</style></head><body>{body}</body></html>"""
    p=os.path.join(OUT,f"{L['code']}_資訊圖表_16-9.html")
    open(p,"w",encoding="utf-8").write(html)
    return p

print("slides engine loaded")
