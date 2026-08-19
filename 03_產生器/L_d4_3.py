# -*- coding: utf-8 -*-
L = {
'grade':'國三上學期','code':'九上4-3','title':'電壓、電阻與歐姆定律','lead':'電流的推力與阻力',
'next':'5-1　地球的水',
'summary':'電壓(電位差)是驅動電流的原因,單位伏特(V),用伏特計並聯測量。電阻是阻礙電流的程度,單位歐姆(Ω)。歐姆定律:電壓=電流×電阻(V=IR)。用三用電表可測電流電壓、觀察電阻特性。課綱不涉電阻串並聯公式計算,也刪除非歐姆式導體。',
'themes':[
 {'name':'電壓','points':['驅動電流的電位差','單位伏特V','用伏特計並聯測量']},
 {'name':'電阻','points':['阻礙電流的程度','單位歐姆Ω','導體電阻與材質長度粗細有關']},
 {'name':'歐姆定律','points':['V=IR','電壓與電流成正比(定電阻)','三用電表可測驗證']},
 {'name':'課綱範圍','points':['不涉串並聯公式計算(移高中)','刪非歐姆式導體','以V=IR基本應用']},
],
'misconceptions':[
 ('電壓就是電流','電壓是驅動、電流是流動'),
 ('伏特計要串聯','伏特計須並聯'),
 ('電阻越大電流越大','電阻越大電流越小'),
 ('歐姆定律對所有導體成立','非歐姆導體不適用(課綱已刪)'),
],
'life':[
 ('電池電壓','驅動電流'),
 ('電熱器電阻','發熱'),
 ('三用電表','測電'),
],
'bloom':{
 'A':{'focus':'記電壓電阻。','tasks':['電壓定義單位','電阻定義單位','歐姆定律'],'check':'能述定律'},
 'B':{'focus':'應用歐姆定律。','tasks':['V=IR計算','伏特計接法','判斷電流變化'],'check':'能計算'},
 'C':{'focus':'綜合分析。','tasks':['分析V-I關係','解釋電阻因素','用三用電表驗證'],'check':'能分析'},
},
'quiz':{
'基礎卷':[
 ('驅動電流的電位差是？','電壓','推力：電壓就像水位落差,是推動電荷流動形成電流的原因'),
 ('電壓的單位是？','伏特(V)','電壓：科學上用伏特這個單位來表示電壓的大小'),
 ('阻礙電流的程度是？','電阻','阻力：電阻是導線或元件阻礙電流通過的程度大小'),
 ('電阻的單位是？','歐姆(Ω)','電阻：科學上用歐姆這個單位來表示電阻的大小'),
 ('歐姆定律公式是？','V=IR','電壓電流電阻：電壓等於電流乘以電阻,這就是歐姆定律的公式'),
 ('測電壓的儀器是？','伏特計','三用電表：伏特計是專門用來測量電路中電壓大小的儀器'),
 ('伏特計要怎麼接？','並聯','並接：伏特計要接在待測元件的兩端,和元件並排連接才能量出電壓'),
 ('電阻越大電流？','越小','阻礙：電阻越大代表對電流的阻礙越強,通過的電流就會變小'),
],
'進階卷':[
 ('電壓6V電阻2Ω,電流？','3 A','V/R：歐姆定律I=V/R,把電壓6V除以電阻2Ω等於3安培'),
 ('電流2A電阻5Ω,電壓？','10 V','IR：把電流2安培乘以電阻5歐姆,等於電壓10伏特'),
 ('電壓12V電流3A,電阻？','4 Ω','V/I：把電壓12伏特除以電流3安培,等於電阻4歐姆'),
 ('定電阻下電壓加倍電流？','加倍','正比：電阻固定不變時,電壓變成兩倍,電流也會跟著變成兩倍'),
 ('伏特計串聯還並聯？','並聯','接法：伏特計要並聯接在元件兩端,才能正確量出兩端的電壓差'),
 ('導體電阻與長度關係？','越長電阻越大','正比：導線越長,電子要通過的距離越遠,受到的阻礙也越大'),
 ('導體電阻與粗細關係？','越粗電阻越小','反比：導線越粗,可通過的空間越大,電子越容易通過,電阻就越小'),
 ('三用電表可測哪些量？','電流電壓電阻','多功能：一台三用電表切換檔位後,可以分別測量電流、電壓和電阻'),
],
'挑戰卷':[
 ('電壓9V使電流0.3A流過燈泡,電阻多少？','30 Ω','V/I：把電壓9伏特除以電流0.3安培,算出這個燈泡的電阻是30歐姆'),
 ('為何伏特計並聯而安培計串聯？','量電位差需並接兩端;量電流需串接','接法：伏特計要量兩點間的電位差所以並接在兩端,安培計要量通過的電流所以要串在電路裡讓電流流經它'),
 ('定電阻導體V-I圖形是？','過原點直線','線性：電阻固定時電壓和電流成正比,畫出來會是一條經過原點的直線'),
 ('同材質導線變長變細電阻如何？','增大','長增粗減：導線變長會讓電阻變大,同時變細也會讓電阻變大,兩個效果加在一起電阻明顯增大'),
 ('電壓不變電阻加倍電流如何？','減半','反比：電壓固定不變的情況下,把電阻變成兩倍,電流就會變成原來的一半'),
 ('用三用電表如何驗證歐姆定律？','測不同電壓下電流看V與I成正比','實驗：改變電壓的大小,分別測量對應的電流值,再看看兩者的比值是否維持固定'),
 ('電熱器利用電阻的什麼效應？','電流通過電阻發熱','熱效應：電流流過電阻大的發熱線圈時會產生大量熱能,這就是電熱器發熱的原理'),
 ('為何課綱刪串並聯公式計算？','移高中,國中重基本概念','課綱：串並聯電路的詳細計算比較複雜,課程安排把它移到高中,國中先建立基本概念就好'),
],
},
}

# ---- 手做精工版簡報與資訊圖 ----
L['lead']='電流的推力與阻力'
L['next']='5-1　地球的水'
L['slides']=[
{'html':'''<div class="big-center"><div class="eyebrow">國三上 · 理化 · 第四章 靜電與電路</div><h1>4-3　電壓、電阻與歐姆定律</h1><p class="lead">V = I × R</p></div>'''},
{'html':'''<div class="eyebrow">本節導覽</div><h2>今天要學會</h2><ul><li><span class="hl">電壓</span>(推力)與<span class="hl-r">電阻</span>(阻力)</li><li><span class="hl-b">歐姆定律 V=IR</span></li><li>三用電表的量測與接法</li></ul><div class="box y">電壓推動電流、電阻阻礙電流，三者用一條式子連起來。</div>'''},
{'html':'''<div class="eyebrow">核心 ①</div><h2>電壓</h2><div class="box"><span class="hl">電壓(電位差)</span>：驅動電流的原因</div><ul><li>單位<span class="hl">伏特 V</span></li><li>用<span class="hl-b">伏特計</span>測量，須<span class="hl-b">並聯</span>在待測元件兩端</li></ul>'''},
{'html':'''<div class="eyebrow">核心 ②</div><h2>電阻</h2><div class="box r"><span class="hl-r">電阻</span>：阻礙電流的程度</div><ul><li>單位<span class="hl-r">歐姆 Ω</span></li><li>導線越<span class="hl">長</span>電阻越大、越<span class="hl">粗</span>電阻越小</li><li>也與材質有關</li></ul>'''},
{'html':'''<div class="eyebrow">水流類比</div><h2>用水管理解電路</h2><table class="tbl"><tr><th>電路</th><th>水流類比</th></tr><tr><td>電壓 V</td><td>水位落差(推力)</td></tr><tr><td>電流 I</td><td>水流量</td></tr><tr><td>電阻 R</td><td>水管的窄阻</td></tr></table><div class="box y">落差越大水流越快、管子越窄水流越小——電路也一樣。</div>'''},
{'html':'''<div class="eyebrow">核心 ③</div><h2>歐姆定律</h2><div class="box"><span class="hl">V = I × R</span>　(電壓＝電流×電阻)</div><ul><li>電阻固定時，電壓與電流成<span class="hl-b">正比</span></li><li>變形：I=V/R、R=V/I</li></ul>'''},
{'html':'''<div class="eyebrow">電路量測</div><h2>安培計串聯、伏特計並聯</h2><div class="big-center"><svg viewBox="0 0 260 130" width="66%"><rect x="20" y="20" width="220" height="90" fill="none" stroke="#f4f1e8" stroke-width="1.5"/><rect x="15" y="55" width="10" height="20" fill="#f0d878"/><text x="0" y="52" font-size="11" fill="#f0d878">電池</text><rect x="110" y="12" width="40" height="16" fill="rgba(232,160,160,.3)" stroke="#e8a0a0"/><text x="118" y="24" font-size="10" fill="#f4f1e8">電阻R</text><circle cx="200" cy="20" r="11" fill="none" stroke="#9fc8d8"/><text x="196" y="24" font-size="11" fill="#9fc8d8">A</text><circle cx="130" cy="80" r="11" fill="none" stroke="#a8d0a0"/><text x="126" y="84" font-size="11" fill="#a8d0a0">V</text><line x1="130" y1="28" x2="130" y2="69" stroke="#a8d0a0" stroke-dasharray="3"/></svg></div><div class="box y">A(安培計)串在電路中；V(伏特計)並接電阻兩端。</div>'''},
{'html':'''<div class="eyebrow">例題 ★☆☆</div><h2>直接代入</h2><div class="eg"><div class="q">電壓 6V、電阻 2Ω，電流多少？</div></div><div class="box y">I = V/R = 6/2 = <span class="hl">3 A</span></div>'''},
{'html':'''<div class="eyebrow">例題 ★★☆</div><h2>求電阻</h2><div class="eg"><div class="q">電壓 9V 使電流 0.3A 流過燈泡，電阻多少？</div></div><div class="box y">R = V/I = 9 ÷ 0.3 = <span class="hl">30 Ω</span></div>'''},
{'html':'''<div class="eyebrow">核心 ④</div><h2>V–I 圖：正比直線</h2><div class="big-center"><svg viewBox="0 0 200 150" width="52%"><line x1="30" y1="120" x2="180" y2="120" stroke="#f4f1e8"/><line x1="30" y1="120" x2="30" y2="20" stroke="#f4f1e8"/><text x="4" y="30" font-size="12" fill="#9fc8d8">V</text><text x="170" y="138" font-size="12" fill="#9fc8d8">I</text><line x1="30" y1="120" x2="160" y2="35" stroke="#f0d878" stroke-width="2.5"/><text x="95" y="55" font-size="11" fill="#f0d878">斜率=R</text></svg></div><div class="box y">定電阻導體的 V–I 圖是通過原點的直線，斜率就是電阻。</div>'''},
{'html':'''<div class="eyebrow">推理</div><h2>電阻越大電流越小</h2><div class="eg"><div class="q">電壓不變，電阻加倍，電流如何變？</div></div><div class="box y">I=V/R，R 加倍 → 電流<span class="hl-r">減半</span>(反比)。</div>'''},
{'html':'''<div class="eyebrow">工具</div><h2>三用電表</h2><ul><li>一台可測<span class="hl">電流、電壓、電阻</span></li><li>觀察電阻特性、驗證歐姆定律</li></ul><div class="box y">量電流前記得選對檔位並正確接法。</div>'''},
{'html':'''<div class="eyebrow">課綱提醒</div><h2>國中範圍</h2><div class="box">以 <span class="hl">V=IR</span> 的基本應用為主</div><div class="box r">不涉電阻<span class="hl-r">串、並聯</span>公式計算（移高中）</div><div class="box-b">刪除不遵循歐姆定律的非歐姆式導體</div>'''},
{'html':'''<div class="eyebrow">素養 · 應用</div><h2>電阻的熱效應</h2><ul><li>電流通過電阻會<span class="hl-r">發熱</span></li><li>電熱器、電暖器用高電阻發熱線</li></ul><div class="box y">歐姆定律與發熱，是家電運作的基礎。</div>'''},
{'html':'''<div class="eyebrow">本節總結</div><h2>一條式子三句話</h2><div class="box"><span class="hl">電壓 V</span>：推力，伏特計並聯量</div><div class="box-b"><span class="hl-b">電阻 R</span>：阻力，越長越大越粗越小</div><div class="box r"><span class="hl-r">歐姆定律：</span>V=IR，定電阻下 V∝I</div>'''},
{'html':'''<div class="big-center"><div class="eyebrow">下一章預告</div><h1>Ch5　水與陸地</h1><p class="lead">進入地球科學</p></div>'''},
]
L['infographics']=[
{'title':'歐姆定律 V=IR','sub':'電壓、電流、電阻','body':'''<div style="flex:1;display:flex;flex-direction:column;justify-content:center;gap:16px;"><div style="text-align:center;font-size:30px;color:var(--yellow);font-weight:900;">V = I × R</div><div style="display:flex;gap:10px;font-size:14px;"><div style="flex:1;background:rgba(240,216,120,.12);border-radius:10px;padding:14px;"><b style="color:var(--yellow)">V 電壓</b><br>伏特 V<br>推動電流</div><div style="flex:1;background:rgba(159,200,216,.12);border-radius:10px;padding:14px;"><b style="color:var(--blue)">I 電流</b><br>安培 A<br>電荷流動</div><div style="flex:1;background:rgba(232,160,160,.12);border-radius:10px;padding:14px;"><b style="color:var(--red)">R 電阻</b><br>歐姆 Ω<br>阻礙電流</div></div><div style="text-align:center;font-size:14px;color:rgba(244,241,232,.8);">變形：I=V/R、R=V/I</div></div>'''},
{'title':'V–I 圖與電阻','sub':'正比直線,斜率=R','body':'''<div style="flex:1;display:flex;align-items:center;justify-content:center;gap:24px;"><svg viewBox="0 0 220 170" width="48%"><line x1="30" y1="140" x2="200" y2="140" stroke="#f4f1e8" stroke-width="1.5"/><line x1="30" y1="140" x2="30" y2="20" stroke="#f4f1e8" stroke-width="1.5"/><text x="6" y="30" font-size="14" fill="#9fc8d8">V</text><text x="190" y="160" font-size="14" fill="#9fc8d8">I</text><line x1="30" y1="140" x2="180" y2="40" stroke="#f0d878" stroke-width="3"/><text x="110" y="70" font-size="13" fill="#f0d878">斜率 = R</text></svg><div style="font-size:16px;line-height:2;">定電阻導體<br>V 與 I 成<b style="color:#f0d878">正比</b><br>圖形過原點直線<br>斜率即為<b style="color:#e8a0a0">電阻 R</b></div></div>'''},
{'title':'儀表接法','sub':'安培計串聯·伏特計並聯','body':'''<div style="flex:1;display:flex;flex-direction:column;justify-content:center;gap:14px;font-size:16px;"><div style="background:rgba(159,200,216,.12);border:1px solid rgba(159,200,216,.3);border-radius:10px;padding:18px;"><b style="color:var(--blue)">安培計 (A) 測電流</b><br><span style="font-size:14px;">串聯在電路中，讓待測電流通過</span></div><div style="background:rgba(168,208,160,.12);border:1px solid rgba(168,208,160,.3);border-radius:10px;padding:18px;"><b style="color:var(--green)">伏特計 (V) 測電壓</b><br><span style="font-size:14px;">並聯在元件兩端，量兩端電位差</span></div><div style="font-size:13px;color:rgba(244,241,232,.75);text-align:center;">口訣：安培串、伏特並</div></div>'''},
{'title':'電阻大小的因素','sub':'長度·粗細·材質','body':'''<div style="flex:1;display:flex;flex-direction:column;justify-content:center;gap:12px;font-size:15px;"><div style="background:rgba(232,160,160,.1);border:1px solid rgba(232,160,160,.3);border-radius:10px;padding:16px;">📏 導線越<b>長</b> → 電阻越<b style="color:#e8a0a0">大</b></div><div style="background:rgba(159,200,216,.1);border:1px solid rgba(159,200,216,.3);border-radius:10px;padding:16px;">⭕ 導線越<b>粗</b> → 電阻越<b style="color:#9fc8d8">小</b></div><div style="background:rgba(240,216,120,.1);border:1px solid rgba(240,216,120,.3);border-radius:10px;padding:16px;">🔩 材質不同 → 電阻不同</div><div style="font-size:13px;color:rgba(244,241,232,.75);text-align:center;">國中不涉串並聯公式計算(移高中)</div></div>'''},
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
