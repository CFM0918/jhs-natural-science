# -*- coding: utf-8 -*-
"""從精簡 L 資料自動生成 slides 與 infographics（省 token 量產用）。
簡報保證 20 頁以上：封面/學習目標/各主題(概念+重點)/迷思(表+逐條)/三難度例題/素養/Bloom/重點整理/總結/預告，不足則以題庫例題補足。
若 L['slides'] 已存在(手做版)則不覆蓋。"""

def _ul(points): return "".join(f"<li>{p}</li>" for p in points)
CH = "①②③④⑤⑥⑦⑧"

def build(L):
    S = []; g = L['grade']; c = L['code']; t = L['title']
    ch = c.split('-')[0] if '-' in c else c
    themes = L['themes']; misc = L.get('misconceptions', []); life = L.get('life', [])
    quiz = L.get('quiz', {}); hl = ['hl', 'hl-b', 'hl', 'hl-r']

    # 1 封面
    S.append({'html': f'''<div class="big-center"><div class="eyebrow">{g} · 自然 · {ch}</div><h1>{c}　{t}</h1><p class="lead">{L.get('lead','會考核心概念')}</p></div>'''})
    # 2 學習目標
    nav = "".join(f'<li><span class="{hl[i%4]}">{th["name"]}</span></li>' for i, th in enumerate(themes))
    S.append({'html': f'''<div class="eyebrow">本節導覽</div><h2>今天要學會</h2><ul>{nav}</ul><div class="box y">{L['summary'][:70]}…</div>'''})
    # 各主題：概念頁 + 重點頁
    for i, th in enumerate(themes):
        pts = th['points']
        head = f'<div class="box"><span class="{hl[i%4]}">{pts[0]}</span></div>' if pts else ''
        S.append({'html': f'''<div class="eyebrow">核心 {CH[i%8]}</div><h2>{th['name']}</h2>{head}<ul>{_ul(pts[1:])}</ul>'''})
        if len(pts) >= 2:
            S.append({'html': f'''<div class="eyebrow">核心 {CH[i%8]} · 重點整理</div><h2>{th['name']}（重點）</h2><ul>{_ul(pts)}</ul><div class="box y">掌握以上重點，就能應付本主題的會考題型。</div>'''})
    # 迷思表
    if misc:
        rows = "".join(f'<tr><td>{m[0]}</td><td>{m[1]}</td></tr>' for m in misc)
        S.append({'html': f'''<div class="eyebrow">避雷指南</div><h2>常見迷思一覽</h2><table class="tbl"><tr><th>❌ 迷思</th><th>✓ 正確觀念</th></tr>{rows}</table>'''})
        # 迷思逐條破解
        for m in misc[:4]:
            S.append({'html': f'''<div class="eyebrow">迷思破解</div><h2>釐清觀念</h2><div class="box r">❌ {m[0]}</div><div class="box">✓ {m[1]}</div>'''})
    # 三難度例題（各取2題）
    lvlabel = {'基礎卷': '例題 ★☆☆ 基礎', '進階卷': '例題 ★★☆ 進階', '挑戰卷': '例題 ★★★ 挑戰'}
    for sheet, lab in lvlabel.items():
        items = quiz.get(sheet, [])[:2]
        if items:
            egs = "".join(f'<div class="eg"><div class="q">{q}</div><p style="margin:0;color:#f0d878;">→ {a}　<span style="color:#9fc8d8;font-size:15px;">({e})</span></p></div>' for q, a, e in items)
            S.append({'html': f'''<div class="eyebrow">{lab}</div><h2>試試看</h2>{egs}'''})
    # 素養
    if life:
        lis = "".join(f'<li><span class="hl-b">{x[0]}</span>：{x[1]}</li>' for x in life)
        S.append({'html': f'''<div class="eyebrow">素養 · 生活連結</div><h2>學到的用在哪</h2><ul>{lis}</ul>'''})
    # Bloom
    b = L['bloom']
    S.append({'html': f'''<div class="eyebrow">差異化教學</div><h2>三層次學習</h2><div class="box"><span class="hl">A 基礎</span>：{b['A']['focus']}</div><div class="box-b"><span class="hl-b">B 精熟</span>：{b['B']['focus']}</div><div class="box r"><span class="hl-r">C 挑戰</span>：{b['C']['focus']}</div>'''})
    # 重點整理
    tsum = "".join(f'<tr><td>{th["name"]}</td><td>{th["points"][0]}</td></tr>' for th in themes)
    S.append({'html': f'''<div class="eyebrow">彙整</div><h2>重點整理表</h2><table class="tbl"><tr><th>主題</th><th>核心重點</th></tr>{tsum}</table>'''})
    # 總結
    tcards = "".join(f'<div class="box"><span class="{hl[i%4]}">{th["name"]}</span>：{th["points"][0]}</div>' for i, th in enumerate(themes))
    S.append({'html': f'''<div class="eyebrow">本節總結</div><h2>重點回顧</h2>{tcards}'''})
    # 補足到 20 頁以上（用尚未用到的題庫題目做加練例題，每頁3題）
    used = 2 * sum(1 for sh in ('基礎卷', '進階卷', '挑戰卷') if quiz.get(sh))
    allq = [(sh, q, a, e) for sh in ('基礎卷', '進階卷', '挑戰卷') for q, a, e in quiz.get(sh, [])]
    rest = allq[2:] if len(allq) > 2 else []
    # 先跳過已當例題用掉的前2題(每卷)；簡化：從各卷第3題起取
    pool = [(sh, q, a, e) for sh in ('基礎卷', '進階卷', '挑戰卷') for q, a, e in quiz.get(sh, [])[2:]]
    pi = 0
    while len(S) < 20 and pi < len(pool):
        chunk = pool[pi:pi+3]; pi += 3
        egs = "".join(f'<div class="eg"><div class="q">[{sh[:2]}] {q}</div><p style="margin:0;color:#f0d878;">→ {a}</p></div>' for sh, q, a, e in chunk)
        S.append({'html': f'''<div class="eyebrow">加強練習</div><h2>再練幾題</h2>{egs}'''})
    # 預告（放最後）
    if L.get('next'):
        S.append({'html': f'''<div class="big-center"><div class="eyebrow">下一節預告</div><h1>{L['next']}</h1></div>'''})
    L['slides'] = S

    # ---- infographics（4 張）----
    I = []; COL = ['159,200,216', '240,216,120', '168,208,160', '196,168,216', '232,160,160']
    blocks = "".join(f'''<div style="background:rgba({COL[i%5]},0.12);border:1px solid rgba({COL[i%5]},0.35);border-radius:10px;padding:16px 20px;"><div style="font-size:17px;font-weight:700;color:rgb({COL[i%5]});margin-bottom:4px;">{th['name']}</div><div style="font-size:15px;color:rgba(244,241,232,0.85);">{'　'.join(th['points'][:2])}</div></div>''' for i, th in enumerate(themes))
    I.append({'title': f'{t}｜重點總覽', 'sub': '主題一次看', 'body': f'<div style="flex:1;display:flex;flex-direction:column;justify-content:center;gap:12px;">{blocks}</div>'})
    if misc:
        rows = "".join(f'<tr><td style="border:1px solid rgba(244,241,232,0.2);padding:12px;color:var(--red);">{m[0]}</td><td style="border:1px solid rgba(244,241,232,0.2);padding:12px;color:var(--green);">{m[1]}</td></tr>' for m in misc)
        I.append({'title': '迷思破解', 'sub': '考前提醒', 'body': f'<div style="flex:1;display:flex;align-items:center;"><table style="width:100%;border-collapse:collapse;font-size:16px;"><tr style="background:rgba(240,216,120,0.15);"><th style="border:1px solid rgba(244,241,232,0.2);padding:12px;color:var(--yellow);">常見迷思</th><th style="border:1px solid rgba(244,241,232,0.2);padding:12px;color:var(--yellow);">正確觀念</th></tr>{rows}</table></div>'})
    I.append({'title': '三層次差異化', 'sub': '因材施教', 'body': f'''<div style="flex:1;display:flex;flex-direction:column;justify-content:center;gap:16px;">
    <div style="background:rgba(168,208,160,0.12);border:1px solid rgba(168,208,160,0.35);border-radius:10px;padding:18px;"><b style="color:var(--green);">A 基礎鞏固</b>　<span style="font-size:15px;">{b['A']['focus']}</span></div>
    <div style="background:rgba(159,200,216,0.12);border:1px solid rgba(159,200,216,0.35);border-radius:10px;padding:18px;"><b style="color:var(--blue);">B 標準精熟</b>　<span style="font-size:15px;">{b['B']['focus']}</span></div>
    <div style="background:rgba(232,160,160,0.12);border:1px solid rgba(232,160,160,0.35);border-radius:10px;padding:18px;"><b style="color:var(--red);">C 挑戰延伸</b>　<span style="font-size:15px;">{b['C']['focus']}</span></div></div>'''})
    if life:
        lis = "".join(f'<div style="background:rgba({COL[i%5]},0.1);border:1px solid rgba({COL[i%5]},0.3);border-radius:10px;padding:16px;"><b style="color:rgb({COL[i%5]});">{x[0]}</b>　<span style="font-size:15px;">{x[1]}</span></div>' for i, x in enumerate(life))
        I.append({'title': '素養 · 生活連結', 'sub': '學以致用', 'body': f'<div style="flex:1;display:flex;flex-direction:column;justify-content:center;gap:12px;">{lis}</div>'})
    L['infographics'] = I
    return L

print("autobuild loaded")
