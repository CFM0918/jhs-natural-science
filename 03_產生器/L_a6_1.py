# -*- coding: utf-8 -*-
L = {
'grade':'國一(七年級)','code':'生物6-1','title':'孟德爾的遺傳法則','lead':'遺傳的規律',
'next':'6-2　性別決定與人類遺傳',
'summary':'孟德爾以豌豆實驗發現遺傳規律。基因成對存在,分顯性與隱性;顯性性狀會表現、隱性被遮蓋。生殖細胞形成時成對基因分開(分離律),各帶一個。用遺傳圖解(如Aa×Aa)可推算子代性狀比例。',
'themes':[
 {'name':'孟德爾與豌豆實驗','points':['遺傳學之父','用豌豆做雜交實驗','發現遺傳規律']},
 {'name':'顯性與隱性','points':['基因成對存在','顯性性狀會表現','隱性被遮蓋']},
 {'name':'分離律','points':['成對基因在生殖細胞分開','各帶一個基因','受精後重新配對']},
 {'name':'遺傳圖解','points':['以字母表示基因(A/a)','推算子代組合','算性狀比例']},
],
'misconceptions':[
 ('隱性基因會消失','隱性基因仍存在,只是被遮蓋'),
 ('顯性性狀比較好','顯隱性只是表現與否'),
 ('基因單獨存在','基因成對存在'),
 ('子代一定像顯性親代','需看基因組合'),
],
'life':[
 ('捲舌與否','遺傳性狀'),
 ('豌豆實驗','遺傳學基礎'),
 ('親子相似','遺傳'),
],
'bloom':{
 'A':{'focus':'記遺傳法則。','tasks':['孟德爾貢獻','顯隱性','分離律'],'check':'能述法則'},
 'B':{'focus':'遺傳圖解計算。','tasks':['Aa×Aa子代比例','判斷顯隱性','寫基因型'],'check':'能推算'},
 'C':{'focus':'綜合分析。','tasks':['分析雜交結果','解釋隱性遺傳','推論親代基因'],'check':'能分析'},
},
'quiz':{
'基礎卷':[
 ('遺傳學之父是？','孟德爾','豌豆'),
 ('孟德爾用什麼做實驗？','豌豆','雜交'),
 ('會表現出來的性狀是？','顯性','表現'),
 ('被遮蓋的性狀是？','隱性','遮蓋'),
 ('基因成對還單獨存在？','成對','兩個'),
 ('生殖細胞形成時基因會？','分開','分離律'),
 ('顯性基因常用什麼表示？','大寫字母','A'),
 ('隱性基因常用什麼表示？','小寫字母','a'),
],
'進階卷':[
 ('Aa表現顯性還隱性？','顯性','有A'),
 ('aa表現顯性還隱性？','隱性','無顯性'),
 ('Aa×Aa子代顯隱性比約？','3:1','孟德爾比'),
 ('分離律指成對基因？','分開進生殖細胞','分離'),
 ('AA與Aa外表(性狀)？','都顯性','相同'),
 ('隱性性狀出現需基因型？','aa','兩隱性'),
 ('生殖細胞各帶幾個某基因？','一個','半數'),
 ('遺傳圖解可推算什麼？','子代性狀比例','比例'),
],
'挑戰卷':[
 ('Aa×Aa子代基因型與比例？','AA:Aa:aa=1:2:1','推算'),
 ('為何隱性性狀可能隔代出現？','隱性基因被攜帶未表現後代aa才顯現','隔代'),
 ('用分離律解釋生殖細胞基因分配？','成對基因分開各生殖細胞帶一個','分離'),
 ('父母皆顯性卻生出隱性子代說明？','父母皆為Aa帶隱性基因','攜帶'),
 ('AA×aa子代基因型與性狀？','全Aa顯性','雜交'),
 ('顯性與隱性的正確理解？','指是否表現非好壞','觀念'),
 ('如何由子代比例反推親代基因型？','3:1推親代皆Aa','反推'),
 ('孟德爾實驗對遺傳學的意義？','建立遺傳基本規律','意義'),
],
},
}

# ---- 手做精工版簡報與資訊圖（覆蓋 autobuild）----
L['lead']='豌豆田裡的規律'
L['next']='6-2　性別決定與人類遺傳'
L['slides']=[
{'html':'''<div class="big-center"><div class="eyebrow">國一 · 生物 · 第六章 遺傳</div><h1>6-1　孟德爾的遺傳法則</h1><p class="lead">性狀如何一代代傳下去</p></div>'''},
{'html':'''<div class="eyebrow">本節導覽</div><h2>今天要學會</h2><ul><li><span class="hl">顯性</span>與<span class="hl-r">隱性</span>性狀</li><li>基因<span class="hl-b">成對</span>存在與<span class="hl-b">分離律</span></li><li>用<span class="hl">遺傳圖解</span>推算子代比例</li></ul><div class="box y">孟德爾用豌豆實驗，找出遺傳背後的數學規律。</div>'''},
{'html':'''<div class="eyebrow">科學史</div><h2>遺傳學之父：孟德爾</h2><ul><li>以<span class="hl">豌豆</span>做大量雜交實驗</li><li>豌豆性狀分明、易栽種、可自花授粉</li><li>從數據中歸納出遺傳規律</li></ul><div class="box y">在不知道DNA的年代，他靠統計就發現了基因的行為。</div>'''},
{'html':'''<div class="eyebrow">核心 ①</div><h2>顯性與隱性</h2><div class="box"><span class="hl">顯性</span>：會表現出來的性狀</div><div class="box r"><span class="hl-r">隱性</span>：被遮蓋、不表現的性狀</div><ul><li>顯性用<span class="hl">大寫 A</span>、隱性用<span class="hl-r">小寫 a</span></li></ul><div class="box y">顯性≠比較好，只是「會不會表現出來」的差別。</div>'''},
{'html':'''<div class="eyebrow">核心 ②</div><h2>基因成對、來自父母</h2><div class="big-center"><svg viewBox="0 0 320 150" width="70%"><text x="30" y="30" font-size="15" fill="#9fc8d8">父</text><text x="250" y="30" font-size="15" fill="#e8a0a0">母</text><circle cx="45" cy="60" r="16" fill="rgba(159,200,216,.3)" stroke="#9fc8d8"/><text x="39" y="65" font-size="15" fill="#f4f1e8">A</text><circle cx="80" cy="60" r="16" fill="rgba(159,200,216,.3)" stroke="#9fc8d8"/><text x="75" y="65" font-size="15" fill="#f4f1e8">a</text><circle cx="240" cy="60" r="16" fill="rgba(232,160,160,.3)" stroke="#e8a0a0"/><text x="234" y="65" font-size="15" fill="#f4f1e8">A</text><circle cx="275" cy="60" r="16" fill="rgba(232,160,160,.3)" stroke="#e8a0a0"/><text x="270" y="65" font-size="15" fill="#f4f1e8">a</text><text x="120" y="120" font-size="14" fill="#f0d878">生殖細胞各帶「一個」基因</text></svg></div><div class="box y">體細胞基因成對(如Aa)，生殖細胞只帶其中一個。</div>'''},
{'html':'''<div class="eyebrow">核心 ③</div><h2>分離律</h2><div class="box"><span class="hl">成對的基因</span>在形成生殖細胞時<span class="hl-b">分開</span>，各進入一個精子或卵</div><ul><li>Aa 個體 → 一半生殖細胞帶 A、一半帶 a</li><li>受精時再重新配對</li></ul>'''},
{'html':'''<div class="eyebrow">基因型 vs 表現型</h2><h2>三種基因型</h2><table class="tbl"><tr><th>基因型</th><th>表現型</th><th>稱呼</th></tr><tr><td>AA</td><td>顯性</td><td>純種顯性</td></tr><tr><td>Aa</td><td>顯性</td><td>雜合(帶因)</td></tr><tr><td>aa</td><td>隱性</td><td>純種隱性</td></tr></table><div class="box y">AA 與 Aa 外表都是顯性，但 Aa 偷偷帶著隱性基因。</div>'''},
{'html':'''<div class="eyebrow">例題 ★☆☆</h2><h2>先熱身</h2><div class="eg"><div class="q">(1) aa 表現顯性還是隱性？ (2) Aa 表現？</div></div><div class="box y"><p style="margin:0;">(1) aa → <span class="hl-r">隱性</span>(沒有顯性基因)</p><p style="margin:0;">(2) Aa → <span class="hl">顯性</span>(有一個A就顯性)</p></div>'''},
{'html':'''<div class="eyebrow">核心 ④</h2><h2>遺傳圖解：Aa × Aa</h2><div class="big-center"><svg viewBox="0 0 220 200" width="52%"><text x="90" y="20" font-size="14" fill="#f0d878">父 Aa</text><text x="-115" y="16" font-size="14" fill="#f0d878" transform="rotate(-90)">母 Aa</text><line x1="60" y1="30" x2="60" y2="190" stroke="#f4f1e8" stroke-width="1"/><line x1="140" y1="30" x2="140" y2="190" stroke="#f4f1e8" stroke-width="1"/><line x1="20" y1="70" x2="200" y2="70" stroke="#f4f1e8" stroke-width="1"/><line x1="20" y1="130" x2="200" y2="130" stroke="#f4f1e8" stroke-width="1"/><text x="90" y="55" font-size="15" fill="#9fc8d8">A</text><text x="170" y="55" font-size="15" fill="#9fc8d8">a</text><text x="35" y="105" font-size="15" fill="#e8a0a0">A</text><text x="35" y="165" font-size="15" fill="#e8a0a0">a</text><text x="82" y="105" font-size="16" fill="#f4f1e8">AA</text><text x="162" y="105" font-size="16" fill="#f0d878">Aa</text><text x="82" y="165" font-size="16" fill="#f0d878">Aa</text><text x="162" y="165" font-size="16" fill="#e8a0a0">aa</text></svg></div><div class="box">基因型 AA : Aa : aa = <span class="hl">1 : 2 : 1</span></div>'''},
{'html':'''<div class="eyebrow">解讀圖解</h2><h2>子代比例</h2><ul><li>基因型 AA : Aa : aa = <span class="hl">1 : 2 : 1</span></li><li>表現型 顯性 : 隱性 = <span class="hl-b">3 : 1</span>(AA、Aa、Aa 都顯性)</li></ul><div class="box y">「3:1」是孟德爾最著名的比例。</div>'''},
{'html':'''<div class="eyebrow">例題 ★★☆</h2><h2>試試看</h2><div class="eg"><div class="q">純種顯性 AA × 純種隱性 aa，子代基因型與表現型？</div></div><div class="box y"><p style="margin:0;">子代全部 <span class="hl">Aa</span></p><p style="margin:6px 0 0;">表現型：全部<span class="hl">顯性</span></p></div>'''},
{'html':'''<div class="eyebrow">易錯釐清</h2><h2>帶因者的祕密</h2><div class="box r">父母外表都是顯性，卻生出隱性(aa)的孩子？</div><ul><li>因為父母其實都是 <span class="hl">Aa</span>(帶因者)</li><li>各給一個 a → 子代 aa 表現隱性</li></ul><div class="box y">隱性性狀可能「隔代」出現，就是這個原因。</div>'''},
{'html':'''<div class="eyebrow">例題 ★★★</h2><h2>反推親代</h2><div class="eg"><div class="q">某對親代子代出現顯性:隱性≈3:1，親代基因型最可能是？</div></div><div class="box y">3:1 是 <span class="hl">Aa × Aa</span> 的特徵比例 → 父母都是雜合帶因者。</div>'''},
{'html':'''<div class="eyebrow">素養 · 生活</h2><h2>遺傳就在你身邊</h2><ul><li><span class="hl-b">捲舌</span>與否、有無<span class="hl-b">酒窩</span>、耳垂貼不貼</li><li>親子相似，正是基因一代代傳遞</li></ul><div class="box y">觀察家人的性狀，就是一場迷你遺傳學實驗。</div>'''},
{'html':'''<div class="eyebrow">本節總結</h2><h2>三句話記住</h2><div class="box"><span class="hl">顯隱性：</span>顯性遮蓋隱性，A大a小</div><div class="box-b"><span class="hl-b">分離律：</span>成對基因分開進生殖細胞</div><div class="box r"><span class="hl-r">比例：</span>Aa×Aa → 基因型1:2:1、表現型3:1</div>'''},
{'html':'''<div class="big-center"><div class="eyebrow">下一節預告</div><h1>6-2　性別決定與人類遺傳</h1><p class="lead">XX 與 XY 的祕密</p></div>'''},
]
L['infographics']=[
{'title':'孟德爾遺傳法則','sub':'顯隱性與分離律','body':'''<div style="flex:1;display:flex;flex-direction:column;justify-content:center;gap:14px;"><div style="background:rgba(240,216,120,.12);border:1px solid rgba(240,216,120,.35);border-radius:10px;padding:18px;"><b style="color:var(--yellow);font-size:17px;">顯性 (A)</b>　<span style="font-size:15px;">會表現出來，用大寫表示</span></div><div style="background:rgba(232,160,160,.12);border:1px solid rgba(232,160,160,.35);border-radius:10px;padding:18px;"><b style="color:var(--red);font-size:17px;">隱性 (a)</b>　<span style="font-size:15px;">被遮蓋，需 aa 才表現，用小寫</span></div><div style="background:rgba(159,200,216,.12);border:1px solid rgba(159,200,216,.35);border-radius:10px;padding:18px;"><b style="color:var(--blue);font-size:17px;">分離律</b>　<span style="font-size:15px;">成對基因形成生殖細胞時分開，各帶一個</span></div></div>'''},
{'title':'遺傳圖解 Aa × Aa','sub':'子代比例 1:2:1','body':'''<div style="flex:1;display:flex;align-items:center;justify-content:center;gap:26px;"><svg viewBox="0 0 220 200" width="46%"><text x="88" y="18" font-size="14" fill="#f0d878">Aa</text><text x="-112" y="14" font-size="14" fill="#f0d878" transform="rotate(-90)">Aa</text><line x1="60" y1="28" x2="60" y2="190" stroke="#f4f1e8"/><line x1="140" y1="28" x2="140" y2="190" stroke="#f4f1e8"/><line x1="20" y1="70" x2="200" y2="70" stroke="#f4f1e8"/><line x1="20" y1="130" x2="200" y2="130" stroke="#f4f1e8"/><text x="92" y="52" font-size="15" fill="#9fc8d8">A</text><text x="172" y="52" font-size="15" fill="#9fc8d8">a</text><text x="35" y="105" font-size="15" fill="#e8a0a0">A</text><text x="35" y="165" font-size="15" fill="#e8a0a0">a</text><text x="82" y="106" font-size="17" fill="#f4f1e8">AA</text><text x="162" y="106" font-size="17" fill="#f0d878">Aa</text><text x="82" y="166" font-size="17" fill="#f0d878">Aa</text><text x="162" y="166" font-size="17" fill="#e8a0a0">aa</text></svg><div style="font-size:17px;line-height:2;">基因型<br>AA:Aa:aa=<span style="color:#f0d878">1:2:1</span><br><br>表現型<br>顯:隱=<span style="color:#9fc8d8">3:1</span></div></div>'''},
{'title':'三種基因型','sub':'外表相同基因不同','body':'''<div style="flex:1;display:flex;flex-direction:column;justify-content:center;gap:12px;"><table style="width:100%;border-collapse:collapse;font-size:17px;"><tr style="background:rgba(240,216,120,.15);"><th style="border:1px solid rgba(244,241,232,.2);padding:12px;color:var(--yellow);">基因型</th><th style="border:1px solid rgba(244,241,232,.2);padding:12px;color:var(--yellow);">表現型</th><th style="border:1px solid rgba(244,241,232,.2);padding:12px;color:var(--yellow);">稱呼</th></tr><tr><td style="border:1px solid rgba(244,241,232,.2);padding:12px;text-align:center;">AA</td><td style="border:1px solid rgba(244,241,232,.2);padding:12px;text-align:center;">顯性</td><td style="border:1px solid rgba(244,241,232,.2);padding:12px;text-align:center;">純種顯性</td></tr><tr><td style="border:1px solid rgba(244,241,232,.2);padding:12px;text-align:center;">Aa</td><td style="border:1px solid rgba(244,241,232,.2);padding:12px;text-align:center;">顯性</td><td style="border:1px solid rgba(244,241,232,.2);padding:12px;text-align:center;">雜合(帶因)</td></tr><tr><td style="border:1px solid rgba(244,241,232,.2);padding:12px;text-align:center;">aa</td><td style="border:1px solid rgba(244,241,232,.2);padding:12px;text-align:center;">隱性</td><td style="border:1px solid rgba(244,241,232,.2);padding:12px;text-align:center;">純種隱性</td></tr></table><div style="font-size:14px;color:rgba(244,241,232,.8);text-align:center;">AA 與 Aa 外表都是顯性，但 Aa 帶有隱性基因</div></div>'''},
{'title':'隱性為何隔代出現','sub':'帶因者的祕密','body':'''<div style="flex:1;display:flex;flex-direction:column;justify-content:center;gap:16px;"><div style="background:rgba(159,200,216,.1);border:1px solid rgba(159,200,216,.3);border-radius:10px;padding:20px;font-size:16px;">父 <b style="color:var(--yellow)">Aa</b> × 母 <b style="color:var(--yellow)">Aa</b>　(外表都顯性)</div><div style="text-align:center;font-size:24px;color:var(--yellow);">↓</div><div style="background:rgba(232,160,160,.1);border:1px solid rgba(232,160,160,.3);border-radius:10px;padding:20px;font-size:16px;">可能生出 <b style="color:var(--red)">aa</b> 子代 → 隱性性狀重新出現</div><div style="font-size:14px;color:rgba(244,241,232,.8);text-align:center;">隱性基因被顯性遮蓋而「潛伏」，遇到另一個隱性基因才顯現</div></div>'''},
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
