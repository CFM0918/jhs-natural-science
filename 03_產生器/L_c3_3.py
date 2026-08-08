# -*- coding: utf-8 -*-
L = {
'grade':'國二下學期','code':'八下3-3','title':'中和與鹽','lead':'酸鹼相消',
'next':'4-1　反應速率',
'summary':'酸與鹼反應生成鹽和水,稱中和反應(H⁺+OH⁻→H₂O)。中和是放熱反應。鹽是酸鹼中和的產物,如食鹽NaCl。pH值表示酸鹼程度(pH<7酸性、=7中性、>7鹼性),本節認識pH意義,不涉及pH計算(移高中),也不涉莫耳濃度稀釋計算。',
'themes':[
 {'name':'中和反應','points':['酸+鹼→鹽+水','H⁺+OH⁻→H₂O','放熱反應']},
 {'name':'鹽','points':['中和反應的產物','如NaCl、Na₂SO₄','多為離子化合物']},
 {'name':'pH值','points':['表示酸鹼程度','pH<7酸、=7中、>7鹼','課綱不涉pH計算']},
 {'name':'生活應用','points':['胃藥中和胃酸','石灰中和酸性土壤','牙膏中和口腔酸']},
],
'misconceptions':[
 ('中和後一定是中性','視酸鹼強弱與量,不一定恰中性'),
 ('鹽只有食鹽','鹽是一類化合物,種類很多'),
 ('pH越大越酸','pH越大越鹼'),
 ('中和是吸熱反應','中和是放熱反應'),
],
'life':[
 ('胃藥','中和過多胃酸'),
 ('土壤改良','石灰中和酸'),
 ('蜂螫塗鹼','中和酸性'),
],
'bloom':{
 'A':{'focus':'記中和與pH。','tasks':['中和產物','pH判酸鹼','鹽的例子'],'check':'能述概念'},
 'B':{'focus':'應用中和。','tasks':['寫中和反應','判斷pH酸鹼','舉中和應用'],'check':'能應用'},
 'C':{'focus':'綜合分析。','tasks':['分析胃藥原理','設計中和實驗','解釋H⁺OH⁻結合'],'check':'能分析'},
},
'quiz':{
'基礎卷':[
 ('酸與鹼反應生成？','鹽和水','中和'),
 ('中和反應的離子式核心是？','H⁺+OH⁻→H₂O','結合'),
 ('中和是放熱還吸熱？','放熱','升溫'),
 ('pH小於7是？','酸性','偏酸'),
 ('pH等於7是？','中性','純水'),
 ('pH大於7是？','鹼性','偏鹼'),
 ('食鹽是一種？','鹽','NaCl'),
 ('胃藥的作用是中和？','胃酸','過多酸'),
],
'進階卷':[
 ('鹽酸與氫氧化鈉中和生成？','氯化鈉和水','NaCl+H₂O'),
 ('中和反應溫度如何變？','上升','放熱'),
 ('pH=3和pH=5誰較酸？','pH=3','數字小'),
 ('酸性土壤可用什麼改良？','石灰(鹼性)','中和'),
 ('中和後溶液一定中性嗎？','不一定','視量與強弱'),
 ('鹽多屬哪類化合物？','離子化合物','導電'),
 ('牙膏偏鹼是為了？','中和口腔酸','護齒'),
 ('pH=7的液體是？','中性','如純水'),
],
'挑戰卷':[
 ('胃酸過多吃鹼性胃藥原理？','鹼中和過多H⁺減緩不適','中和'),
 ('中和反應為何放熱？','H⁺與OH⁻結合成水釋出能量','機制'),
 ('等量強酸強鹼中和後pH約？','7(中性)','恰中和'),
 ('過量酸與少量鹼中和後呈？','酸性','酸剩餘'),
 ('為何蜂螫(酸性)可塗小蘇打？','鹼性中和酸','緩解'),
 ('如何用指示劑觀察中和終點？','顏色改變時','終點'),
 ('鹽類命名由酸鹼決定,鹽酸+NaOH得？','氯化鈉','命名'),
 ('為何國中不算pH值？','移高中,國中重意義','課綱'),
],
},
}

# ---- 手做精工版簡報與資訊圖 ----
L['lead']='酸與鹼的相消'
L['next']='4-1　反應速率'
L['slides']=[
{'html':'''<div class="big-center"><div class="eyebrow">國二下 · 理化 · 第三章 酸鹼鹽</div><h1>3-3　中和與鹽</h1><p class="lead">酸鹼相遇，生成鹽和水</p></div>'''},
{'html':'''<div class="eyebrow">本節導覽</div><h2>今天要學會</h2><ul><li><span class="hl">中和反應</span>與其產物</li><li><span class="hl-b">pH 值</span>判讀酸鹼強弱</li><li>中和在<span class="hl">生活</span>的應用</li></ul><div class="box y">酸加鹼會互相抵消，這就是中和。</div>'''},
{'html':'''<div class="eyebrow">核心 ①</div><h2>中和反應</h2><div class="box"><span class="hl">酸 + 鹼 → 鹽 + 水</span></div><ul><li>例：鹽酸 + 氫氧化鈉 → 氯化鈉 + 水</li><li>是一種<span class="hl-r">放熱</span>反應</li></ul>'''},
{'html':'''<div class="eyebrow">微觀本質</div><h2>其實是 H⁺ 與 OH⁻ 結合</h2><div class="big-center"><svg viewBox="0 0 320 90" width="80%"><circle cx="45" cy="45" r="20" fill="rgba(232,160,160,.3)" stroke="#e8a0a0"/><text x="30" y="50" font-size="15" fill="#f4f1e8">H⁺</text><text x="80" y="50" font-size="22" fill="#f0d878">+</text><circle cx="130" cy="45" r="22" fill="rgba(159,200,216,.3)" stroke="#9fc8d8"/><text x="112" y="50" font-size="14" fill="#f4f1e8">OH⁻</text><text x="170" y="50" font-size="20" fill="#f0d878">→</text><circle cx="230" cy="45" r="24" fill="rgba(168,208,160,.3)" stroke="#a8d0a0"/><text x="210" y="50" font-size="14" fill="#f4f1e8">H₂O</text></svg></div><div class="box y">酸的 H⁺ 和鹼的 OH⁻ 結合成水，酸鹼性消失。</div>'''},
{'html':'''<div class="eyebrow">核心 ②</div><h2>什麼是鹽</h2><ul><li>中和反應中，酸的酸根與鹼的金屬離子結合成<span class="hl">鹽</span></li><li>如 NaCl(食鹽)、Na₂SO₄</li><li>鹽多為<span class="hl-b">離子化合物</span></li></ul><div class="box y">「鹽」是一類化合物，不只食鹽一種。</div>'''},
{'html':'''<div class="eyebrow">核心 ③</div><h2>pH 值：酸鹼的刻度</h2><div class="big-center"><svg viewBox="0 0 360 70" width="92%"><defs><linearGradient id="ph" x1="0" x2="1"><stop offset="0" stop-color="#e8000b"/><stop offset="0.5" stop-color="#7ac74f"/><stop offset="1" stop-color="#2a4bd0"/></linearGradient></defs><rect x="10" y="20" width="340" height="24" rx="4" fill="url(#ph)"/><text x="12" y="60" font-size="12" fill="#f4f1e8">0</text><text x="168" y="60" font-size="12" fill="#f4f1e8">7</text><text x="335" y="60" font-size="12" fill="#f4f1e8">14</text><text x="60" y="15" font-size="12" fill="#e8a0a0">酸性</text><text x="160" y="15" font-size="12" fill="#a8d0a0">中性</text><text x="285" y="15" font-size="12" fill="#9fc8d8">鹼性</text></svg></div><ul><li>pH < 7 <span class="hl-r">酸性</span>；= 7 中性；> 7 <span class="hl-b">鹼性</span></li><li>數字離 7 越遠，酸/鹼性越強</li></ul>'''},
{'html':'''<div class="eyebrow">例題 ★☆☆</div><h2>先熱身</h2><div class="eg"><div class="q">pH=3、pH=6、pH=10 哪個酸性最強？</div></div><div class="box y">pH 越小越酸 → <span class="hl-r">pH=3</span> 酸性最強；pH=10 為鹼性。</div>'''},
{'html':'''<div class="eyebrow">實驗觀察</div><h2>中和的溫度變化</h2><ul><li>酸與鹼混合後，溫度<span class="hl-r">上升</span></li><li>證明中和是<span class="hl-r">放熱反應</span></li><li>可用指示劑觀察酸鹼性消長</li></ul><div class="box y">H⁺ 與 OH⁻ 結合成水時釋出能量。</div>'''},
{'html':'''<div class="eyebrow">例題 ★★☆</div><h2>試試看</h2><div class="eg"><div class="q">鹽酸與氫氧化鈉恰好完全中和，產物是？溶液 pH 約？</div></div><div class="box y"><p style="margin:0;">產物：<span class="hl">氯化鈉 NaCl + 水</span></p><p style="margin:6px 0 0;">恰好中和 → pH ≈ <span class="hl">7</span></p></div>'''},
{'html':'''<div class="eyebrow">觀念釐清</div><h2>中和後一定是中性嗎？</h2><div class="box r">不一定！</div><ul><li>酸過量 → 溶液仍<span class="hl-r">偏酸</span></li><li>鹼過量 → 溶液仍<span class="hl-b">偏鹼</span></li><li>恰好中和才會中性(pH≈7)</li></ul>'''},
{'html':'''<div class="eyebrow">素養 · 生活 ①</div><h2>胃藥中和胃酸</h2><ul><li>胃酸過多引起不適</li><li>吃<span class="hl-b">鹼性</span>胃藥中和過多 H⁺</li></ul><div class="box y">中和不是只在實驗室，也在你的胃裡發生。</div>'''},
{'html':'''<div class="eyebrow">素養 · 生活 ②</div><h2>更多中和應用</h2><table class="tbl"><tr><th>情境</th><th>原理</th></tr><tr><td>酸性土壤撒石灰</td><td>鹼中和酸</td></tr><tr><td>蜂螫(酸)塗小蘇打</td><td>鹼中和酸</td></tr><tr><td>牙膏偏鹼</td><td>中和口腔酸</td></tr></table>'''},
{'html':'''<div class="eyebrow">例題 ★★★</div><h2>綜合判斷</h2><div class="eg"><div class="q">在鹼性溶液中持續加入鹽酸，pH 會如何變化？</div></div><div class="box y">pH 由大(鹼)逐漸<span class="hl-r">下降</span>，過中性(7)後若酸過量則 < 7 呈酸性。</div>'''},
{'html':'''<div class="eyebrow">課綱提醒</div><h2>國中範圍</h2><div class="box">認識 pH 的<span class="hl">意義</span>與酸鹼判斷</div><div class="box r">不涉及 pH 的<span class="hl-r">計算</span>（移高中）</div><div class="box-b">不涉莫耳濃度、稀釋計算（移高中）</div>'''},
{'html':'''<div class="eyebrow">本節總結</div><h2>三句話記住</h2><div class="box"><span class="hl">中和：</span>酸+鹼→鹽+水，H⁺+OH⁻→H₂O，放熱</div><div class="box-b"><span class="hl-b">pH：</span><7酸、=7中、>7鹼，離7越遠越強</div><div class="box r"><span class="hl-r">應用：</span>胃藥、石灰改良土壤、牙膏</div>'''},
{'html':'''<div class="big-center"><div class="eyebrow">下一節預告</div><h1>4-1　反應速率</h1><p class="lead">反應有多快</p></div>'''},
]
L['infographics']=[
{'title':'中和反應','sub':'酸+鹼→鹽+水','body':'''<div style="flex:1;display:flex;flex-direction:column;justify-content:center;gap:18px;"><div style="text-align:center;font-size:22px;color:var(--yellow);font-weight:700;">酸 + 鹼 → 鹽 + 水</div><div style="display:flex;align-items:center;justify-content:center;gap:14px;font-size:18px;"><span style="background:rgba(232,160,160,.2);border-radius:50%;padding:16px 18px;">H⁺</span><span style="color:var(--yellow);">+</span><span style="background:rgba(159,200,216,.2);border-radius:50%;padding:16px 14px;">OH⁻</span><span style="color:var(--yellow);">→</span><span style="background:rgba(168,208,160,.2);border-radius:50%;padding:16px 14px;">H₂O</span></div><div style="text-align:center;font-size:15px;color:rgba(244,241,232,.85);">酸的 H⁺ 與鹼的 OH⁻ 結合成水，放出熱量(放熱反應)</div></div>'''},
{'title':'pH 酸鹼刻度','sub':'0～14','body':'''<div style="flex:1;display:flex;flex-direction:column;justify-content:center;gap:16px;"><svg viewBox="0 0 400 80" width="100%"><defs><linearGradient id="p2" x1="0" x2="1"><stop offset="0" stop-color="#e8000b"/><stop offset="0.5" stop-color="#7ac74f"/><stop offset="1" stop-color="#2a4bd0"/></linearGradient></defs><rect x="10" y="24" width="380" height="30" rx="5" fill="url(#p2)"/><text x="12" y="72" font-size="14" fill="#f4f1e8">0</text><text x="192" y="72" font-size="14" fill="#f4f1e8">7</text><text x="376" y="72" font-size="14" fill="#f4f1e8">14</text><text x="70" y="18" font-size="14" fill="#e8a0a0">酸性</text><text x="185" y="18" font-size="14" fill="#a8d0a0">中性</text><text x="320" y="18" font-size="14" fill="#9fc8d8">鹼性</text></svg><div style="font-size:15px;color:rgba(244,241,232,.85);text-align:center;">pH&lt;7 酸性、=7 中性、&gt;7 鹼性；數字離 7 越遠酸鹼性越強</div></div>'''},
{'title':'中和後不一定中性','sub':'看酸鹼誰過量','body':'''<div style="flex:1;display:flex;flex-direction:column;justify-content:center;gap:12px;font-size:16px;"><div style="background:rgba(232,160,160,.12);border:1px solid rgba(232,160,160,.3);border-radius:10px;padding:16px;"><b style="color:var(--red);">酸過量</b>　→ 溶液仍偏酸 (pH&lt;7)</div><div style="background:rgba(168,208,160,.12);border:1px solid rgba(168,208,160,.3);border-radius:10px;padding:16px;"><b style="color:var(--green);">恰好中和</b>　→ 中性 (pH≈7)</div><div style="background:rgba(159,200,216,.12);border:1px solid rgba(159,200,216,.3);border-radius:10px;padding:16px;"><b style="color:var(--blue);">鹼過量</b>　→ 溶液仍偏鹼 (pH&gt;7)</div></div>'''},
{'title':'中和的生活應用','sub':'酸鹼相消','body':'''<div style="flex:1;display:flex;flex-direction:column;justify-content:center;gap:12px;font-size:15px;"><div style="background:rgba(240,216,120,.1);border:1px solid rgba(240,216,120,.3);border-radius:10px;padding:14px;">🩹 <b>胃藥</b>：鹼性藥中和過多胃酸</div><div style="background:rgba(240,216,120,.1);border:1px solid rgba(240,216,120,.3);border-radius:10px;padding:14px;">🌱 <b>石灰改良酸性土壤</b>：鹼中和酸</div><div style="background:rgba(240,216,120,.1);border:1px solid rgba(240,216,120,.3);border-radius:10px;padding:14px;">🐝 <b>蜂螫塗小蘇打</b>：鹼中和酸性毒液</div><div style="background:rgba(240,216,120,.1);border:1px solid rgba(240,216,120,.3);border-radius:10px;padding:14px;">🦷 <b>牙膏偏鹼</b>：中和口腔酸、保護牙齒</div></div>'''},
]

# ---- 補足簡報至 20 頁以上（保留預告於最後）----
_nx = L['slides'].pop() if (L['slides'] and '預告' in L['slides'][-1]['html']) else None
_pool = [(sh,q,a,e) for sh in ('基礎卷','進階卷','挑戰卷') for (q,a,e) in L['quiz'].get(sh,[])[3:]]
_i = 0
while len(L['slides']) < 20 and _i < len(_pool):
    _c = _pool[_i:_i+3]; _i += 3
    _egs = ''.join(f'<div class="eg"><div class="q">[{sh[:2]}] {q}</div><p style="margin:0;color:#f0d878;">→ {a}</p></div>' for sh,q,a,e in _c)
    L['slides'].append({'html': f'<div class="eyebrow">加強練習</div><h2>再練幾題</h2>{_egs}'})
if _nx: L['slides'].append(_nx)
