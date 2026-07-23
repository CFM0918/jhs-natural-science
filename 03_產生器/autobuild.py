# -*- coding: utf-8 -*-
"""從精簡 L 資料自動生成 slides 與 infographics（省 token 量產用）。
若 L['slides'] 為空，run.py 會呼叫 build(L) 自動填入。
精簡 L 只需：grade code title summary themes misconceptions life bloom quiz (+ 選填 next)"""

def _ul(points):
    return "".join(f"<li>{p}</li>" for p in points)

def build(L):
    S = []
    g, c, t = L['grade'], L['code'], L['title']
    ch = c.split('-')[0] if '-' in c else c
    # 1 封面
    S.append({'html':f'''<div class="big-center"><div class="eyebrow">{g} · 自然 · {ch}</div><h1>{c}　{t}</h1><p class="lead">{L.get('lead','會考核心概念')}</p></div>'''})
    # 2 導覽
    nav = "".join(f'<li><span class="hl">{th["name"]}</span></li>' for th in L['themes'])
    S.append({'html':f'''<div class="eyebrow">本節導覽</div><h2>今天要學會</h2><ul>{nav}</ul><div class="box y">{L['summary'][:60]}…</div>'''})
    # 3.. 每個主題一張
    hlcls = ['hl','hl-b','hl','hl-r']
    for i, th in enumerate(L['themes']):
        pts = th['points']
        head = f'<div class="box"><span class="{hlcls[i%4]}">{pts[0]}</span></div>' if pts else ''
        rest = _ul(pts[1:]) if len(pts) > 1 else ''
        S.append({'html':f'''<div class="eyebrow">核心 {"①②③④⑤⑥"[i]}</div><h2>{th['name']}</h2>{head}<ul>{rest}</ul>'''})
    # 迷思
    if L.get('misconceptions'):
        rows = "".join(f'<tr><td>{m[0]}</td><td>{m[1]}</td></tr>' for m in L['misconceptions'])
        S.append({'html':f'''<div class="eyebrow">避雷指南</div><h2>常見迷思</h2><table class="tbl"><tr><th>❌ 迷思</th><th>✓ 正確觀念</th></tr>{rows}</table>'''})
    # 例題（取挑戰卷前2題）
    ch3 = L['quiz'].get('挑戰卷', [])[:2]
    if ch3:
        egs = "".join(f'<div class="eg"><div class="q">{q}</div><p style="color:#f0d878;margin:0;">→ {a}　<span style="color:#9fc8d8;font-size:15px;">({e})</span></p></div>' for q,a,e in ch3)
        S.append({'html':f'''<div class="eyebrow">例題 ★★★</div><h2>試試看</h2>{egs}'''})
    # 素養
    if L.get('life'):
        lis = "".join(f'<li><span class="hl-b">{x[0]}</span>：{x[1]}</li>' for x in L['life'])
        S.append({'html':f'''<div class="eyebrow">素養 · 生活連結</div><h2>學到的用在哪</h2><ul>{lis}</ul>'''})
    # Bloom
    b = L['bloom']
    S.append({'html':f'''<div class="eyebrow">差異化教學</div><h2>三層次學習</h2><div class="box"><span class="hl">A 基礎</span>：{b['A']['focus']}</div><div class="box-b"><span class="hl-b">B 精熟</span>：{b['B']['focus']}</div><div class="box r"><span class="hl-r">C 挑戰</span>：{b['C']['focus']}</div>'''})
    # 總結
    tsum = "".join(f'<div class="box"><span class="hl">{th["name"]}</span>：{th["points"][0]}</div>' for th in L['themes'])
    S.append({'html':f'''<div class="eyebrow">本節總結</div><h2>重點回顧</h2>{tsum}'''})
    # 預告
    if L.get('next'):
        S.append({'html':f'''<div class="big-center"><div class="eyebrow">下一節預告</div><h1>{L['next']}</h1></div>'''})
    L['slides'] = S

    # ---- infographics ----
    I = []
    COL = ['159,200,216','240,216,120','168,208,160','196,168,216','232,160,160']
    # 主題總覽
    blocks = "".join(f'''<div style="background:rgba({COL[i%5]},0.12);border:1px solid rgba({COL[i%5]},0.35);border-radius:10px;padding:16px 20px;"><div style="font-size:17px;font-weight:700;color:rgb({COL[i%5]});margin-bottom:4px;">{th['name']}</div><div style="font-size:15px;color:rgba(244,241,232,0.85);">{'　'.join(th['points'][:2])}</div></div>''' for i,th in enumerate(L['themes']))
    I.append({'title':f'{t}｜重點總覽','sub':'四大主題一次看','body':f'<div style="flex:1;display:flex;flex-direction:column;justify-content:center;gap:12px;">{blocks}</div>'})
    # 迷思對照
    if L.get('misconceptions'):
        rows = "".join(f'<tr><td style="border:1px solid rgba(244,241,232,0.2);padding:12px;color:var(--red);">{m[0]}</td><td style="border:1px solid rgba(244,241,232,0.2);padding:12px;color:var(--green);">{m[1]}</td></tr>' for m in L['misconceptions'])
        I.append({'title':'迷思破解','sub':'考前最後提醒','body':f'<div style="flex:1;display:flex;align-items:center;"><table style="width:100%;border-collapse:collapse;font-size:16px;"><tr style="background:rgba(240,216,120,0.15);"><th style="border:1px solid rgba(244,241,232,0.2);padding:12px;color:var(--yellow);">常見迷思</th><th style="border:1px solid rgba(244,241,232,0.2);padding:12px;color:var(--yellow);">正確觀念</th></tr>{rows}</table></div>'})
    # Bloom
    I.append({'title':'三層次差異化','sub':'因材施教','body':f'''<div style="flex:1;display:flex;flex-direction:column;justify-content:center;gap:16px;">
    <div style="background:rgba(168,208,160,0.12);border:1px solid rgba(168,208,160,0.35);border-radius:10px;padding:18px;"><b style="color:var(--green);">A 基礎鞏固</b>　<span style="font-size:15px;">{b['A']['focus']}</span></div>
    <div style="background:rgba(159,200,216,0.12);border:1px solid rgba(159,200,216,0.35);border-radius:10px;padding:18px;"><b style="color:var(--blue);">B 標準精熟</b>　<span style="font-size:15px;">{b['B']['focus']}</span></div>
    <div style="background:rgba(232,160,160,0.12);border:1px solid rgba(232,160,160,0.35);border-radius:10px;padding:18px;"><b style="color:var(--red);">C 挑戰延伸</b>　<span style="font-size:15px;">{b['C']['focus']}</span></div></div>'''})
    # 素養
    if L.get('life'):
        lis = "".join(f'<div style="background:rgba({COL[i%5]},0.1);border:1px solid rgba({COL[i%5]},0.3);border-radius:10px;padding:16px;"><b style="color:rgb({COL[i%5]});">{x[0]}</b>　<span style="font-size:15px;">{x[1]}</span></div>' for i,x in enumerate(L['life']))
        I.append({'title':'素養 · 生活連結','sub':'學以致用','body':f'<div style="flex:1;display:flex;flex-direction:column;justify-content:center;gap:12px;">{lis}</div>'})
    L['infographics'] = I
    return L

print("autobuild loaded")
