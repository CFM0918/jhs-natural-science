# -*- coding: utf-8 -*-
L = {
'grade':'國二上學期','code':'八上1-1','title':'科學的態度與方法',
'summary':'本節認識科學探究的歷程：觀察→提問→假設→設計實驗→蒐集數據→分析→結論，並理解這是可反覆修正的過程。重點在「變因的控制」——分辨操縱變因、應變變因與控制變因，並善用對照組做公平比較。同時建立國際單位制(SI)的概念：長度(公尺m)、質量(公斤kg)、時間(秒s)等基本量，以及由基本量組合而成的導出量。最後學會測量時的估計值與有效數字，養成誠實、客觀、可重複驗證的科學態度。',
'themes':[
 {'name':'科學方法的歷程','points':['觀察→提問→假設→實驗→分析→結論','假設是對問題的暫時解答，可被驗證或否證','科學結論具暫時性，會隨新證據修正']},
 {'name':'變因與對照實驗','points':['操縱變因：刻意改變的量','應變變因：隨之改變、被測量的結果','控制變因：保持不變以求公平','對照組：作為比較的基準']},
 {'name':'國際單位制 SI','points':['長度—公尺(m)、質量—公斤(kg)、時間—秒(s)','溫度—克耳文(K)、電流—安培(A)','基本量可組合成導出量(如面積m²、密度kg/m³)']},
 {'name':'測量、估計值與有效數字','points':['讀數要估到最小刻度的下一位','估計值是合理估計，不是亂猜','有效數字位數反映測量的精密度','重複測量取平均可降低隨機誤差']},
],
'misconceptions':[
 ('科學方法一定照固定順序走完','實際研究常反覆修正、來回檢驗，不是死板直線'),
 ('假設被推翻代表實驗失敗','否證假設同樣是有價值的科學結果'),
 ('測量值小數位愈多愈準確','超過儀器最小刻度的位數沒有意義'),
 ('估計值是隨便猜一個','估計值須依最小刻度合理估到下一位'),
 ('12cm 和 12.0cm 意義相同','12.0cm 精密到 0.1，有效數字不同'),
],
'life':[
 ('科學新聞判讀','用變因與對照概念檢視「某食物防癌」報導是否嚴謹'),
 ('料理小實驗','固定水量與食材，只改火力，比較熟度差異'),
 ('健康量測','體溫、體重的單位與量測精密度'),
 ('全球接軌','SI 單位讓各國實驗數據可互相比較'),
],
'bloom':{
 'A':{'focus':'聚焦名詞辨識與科學方法步驟的記憶。',
      'tasks':['按順序寫出科學方法六步驟','列出三個 SI 基本量與單位','說出操縱/應變/控制變因的定義'],
      'check':'能正確說出步驟與單位 8 成'},
 'B':{'focus':'進到情境中判別三類變因、判讀有效數字。',
      'tasks':['給定實驗情境，找出三類變因','判斷 3.50cm 的有效數字位數','解釋為何要設對照組','做基本單位換算(km↔m)'],
      'check':'能在情境中正確指認變因'},
 'C':{'focus':'要求完整設計實驗並評鑑科學主張。',
      'tasks':['自訂主題設計含對照組的公平實驗','評鑑「能治百病」是否為科學主張','分析測量誤差來源與降低方法','說明科學結論為何具暫時性'],
      'check':'能獨立設計並批判實驗'},
},
'quiz':{
'基礎卷':[
 ('科學方法通常從哪一步開始？','觀察','觀察現象才引發問題'),
 ('SI 制中長度的單位是？','公尺(m)','國際基本量'),
 ('SI 制中質量的單位是？','公斤(kg)','基本量'),
 ('SI 制中時間的單位是？','秒(s)','基本量'),
 ('實驗中刻意改變的變因稱為？','操縱變因','即自變項'),
 ('隨之改變、被測量的變因稱為？','應變變因','即依變項'),
 ('為求公平而保持不變的變因？','控制變因','其他條件相同'),
 ('對照組的作用是什麼？','作為比較的基準','凸顯操縱變因效應'),
 ('讀尺時要估到最小刻度的？','下一位','估計值'),
 ('溫度的 SI 基本單位是？','克耳文(K)','絕對溫標'),
],
'進階卷':[
 ('研究「陽光影響植物生長」，操縱變因是？','陽光(照光量)','刻意改變的量'),
 ('承上，應變變因是？','植物生長高度','被測量的結果'),
 ('承上，需控制的變因舉一例？','水量/土壤/溫度','保持相同'),
 ('最小刻度 0.1cm 的尺，長度應記錄到哪一位？','0.01cm 位','估到下一位'),
 ('3.50cm 有幾位有效數字？','3 位','末位 0 有效'),
 ('「醣加熱會焦化」在科學方法中屬於？','假設','對問題的暫時解答'),
 ('只做一次實驗，結果可靠嗎？','不可靠','需重複多次'),
 ('讀量筒體積時視線應對準？','凹液面最低處','避免視差'),
 ('密度是基本量還是導出量？','導出量','質量÷體積'),
 ('數據與假設不符時應如何？','如實記錄不竄改','誠實客觀'),
],
'挑戰卷':[
 ('設計「鹽量影響水沸點」實驗，寫出三類變因','操縱:鹽量 應變:沸點 控制:水量與火力','完整變因設計'),
 ('為何要設「不加鹽」的對照組？','作基準比較凸顯鹽的效應','對照精神'),
 ('甲量 2.5cm、乙量 2.50cm，誰較精密？','乙','估到更小一位'),
 ('重複量同物 5 次取平均，目的是？','降低隨機誤差','提高可靠度'),
 ('12.0cm 與 12cm 意義相同嗎？','不同','前者精密到 0.1'),
 ('「這藥草能治百病」是科學主張嗎？','不是','無法檢驗、過度宣稱'),
 ('面積是基本量或導出量？單位？','導出量, m²','長度×長度'),
 ('數據異常過大時，最先該做什麼？','檢查步驟並重測','不可直接刪除'),
 ('1.5 km 等於幾公尺？','1500 m','×1000'),
 ('科學結論為何常說「目前證據支持」？','科學具暫時性可修正','科學本質'),
],
},
'slides':[
{'html':'''<div class="big-center"><div class="eyebrow">國二上學期 · 理化 · 第一章 基本測量</div><h1>1-1　科學的態度與方法</h1><p class="lead">像科學家一樣思考與測量</p></div>'''},
{'html':'''<div class="eyebrow">本節導覽</div><h2>今天要學會</h2><ul><li><span class="hl">科學方法</span>的探究歷程</li><li><span class="hl-b">操縱／應變／控制</span>三類變因</li><li><span class="hl">國際單位制 SI</span>與基本量</li><li><span class="hl-r">估計值</span>與有效數字</li></ul><div class="box y">科學不是背答案，而是一套找答案的方法。</div>'''},
{'html':'''<div class="eyebrow">核心 ①</div><h2>科學方法的歷程</h2><div class="box"><span class="hl">觀察 → 提問 → 假設 → 實驗 → 分析 → 結論</span></div><ul><li>由現象引發問題</li><li>假設＝對問題的<span class="hl-b">暫時解答</span></li><li>用實驗數據驗證或否證假設</li></ul><div class="box y">這個歷程常反覆修正，不是走一次就結束。</div>'''},
{'html':'''<div class="eyebrow">觀念釐清</div><h2>假設被推翻＝失敗嗎？</h2><div class="box r">否！否證一個假設，同樣是有價值的科學結果。</div><ul><li>科學結論具<span class="hl-r">暫時性</span></li><li>會隨新證據修正</li><li>能被檢驗、能被否證，才是科學主張</li></ul>'''},
{'html':'''<div class="eyebrow">核心 ②</div><h2>三類變因</h2><table class="tbl"><tr><th>變因</th><th>意義</th></tr><tr><td>操縱變因</td><td>刻意改變的量</td></tr><tr><td>應變變因</td><td>隨之改變、被測量</td></tr><tr><td>控制變因</td><td>保持不變求公平</td></tr></table><div class="box y">公平實驗：只變一個(操縱)，其餘全部固定(控制)。</div>'''},
{'html':'''<div class="eyebrow">例題 ★☆☆</div><h2>試試看：找出變因</h2><div class="eg"><div class="q">研究「陽光多寡如何影響植物長高」</div></div><div class="box"><p style="margin:0;">操縱變因：<span class="hl">照光量</span></p><p style="margin:0;">應變變因：<span class="hl-b">植物高度</span></p><p style="margin:0;">控制變因：水量、土壤、溫度…</p></div>'''},
{'html':'''<div class="eyebrow">關鍵設計</div><h2>對照組的意義</h2><div class="box">對照組＝<span class="hl">不施加操縱變因</span>的那一組</div><ul><li>作為比較的<span class="hl-b">基準</span></li><li>凸顯操縱變因造成的差異</li><li>例：測鹽對沸點影響，需保留「不加鹽」一組</li></ul>'''},
{'html':'''<div class="eyebrow">核心 ③</div><h2>國際單位制 SI</h2><table class="tbl"><tr><th>基本量</th><th>單位</th></tr><tr><td>長度</td><td>公尺 m</td></tr><tr><td>質量</td><td>公斤 kg</td></tr><tr><td>時間</td><td>秒 s</td></tr><tr><td>溫度</td><td>克耳文 K</td></tr></table><div class="box y">全世界用同一套單位，數據才能互相比較。</div>'''},
{'html':'''<div class="eyebrow">延伸</div><h2>基本量 vs 導出量</h2><div class="box"><span class="hl-b">導出量</span>＝由基本量組合而來</div><ul><li>面積 = 長 × 長 → <span class="hl">m²</span></li><li>體積 = 長 × 長 × 長 → m³</li><li>密度 = 質量 ÷ 體積 → kg/m³</li></ul><div class="box y">密度、面積都不是基本量，是導出量。</div>'''},
{'html':'''<div class="eyebrow">核心 ④</div><h2>測量的估計值</h2><div class="box">讀數要估到最小刻度的<span class="hl">下一位</span></div><ul><li>最小刻度 0.1cm → 記錄到 0.01cm</li><li>最後一位是<span class="hl-r">合理估計</span>，不是亂猜</li></ul><div class="box y">估計值讓測量更精密，是科學測量的規矩。</div>'''},
{'html':'''<div class="eyebrow">易錯</div><h2>12cm 和 12.0cm 一樣嗎？</h2><div class="box r">不一樣！</div><ul><li>12cm → 精密到 1cm</li><li>12.0cm → 精密到 <span class="hl">0.1cm</span>，多一位有效數字</li></ul><div class="box y">末位的 0 不能省，它代表測量的精密度。</div>'''},
{'html':'''<div class="eyebrow">避免誤差</div><h2>兩個好習慣</h2><ul><li>讀量筒：視線對準<span class="hl-b">凹液面最低處</span>，避免視差</li><li>重複測量取<span class="hl">平均</span>，降低隨機誤差</li></ul><div class="box y">單次測量不可靠，多次取平均才穩。</div>'''},
{'html':'''<div class="eyebrow">例題 ★★☆</div><h2>試試看：有效數字</h2><div class="eg"><div class="q">3.50 cm 有幾位有效數字？</div></div><div class="box y"><p style="margin:0;">3、5、0 都算 → <span class="hl">3 位</span></p><p style="margin:6px 0 0;">末位 0 是測量結果，有效！</p></div>'''},
{'html':'''<div class="eyebrow">科學態度</div><h2>誠實與客觀</h2><ul><li>數據與預期不符 → <span class="hl-r">如實記錄</span>，不竄改</li><li>異常數據 → 先檢查步驟並重測，不可直接刪</li><li>結論建立在<span class="hl-b">可重複驗證</span>的證據上</li></ul><div class="box y">科學的誠信，比漂亮的數據更重要。</div>'''},
{'html':'''<div class="eyebrow">例題 ★★★</div><h2>試試看：設計實驗</h2><div class="eg"><div class="q">設計實驗檢驗「加鹽會提高水的沸點」</div></div><div class="box"><p style="margin:0;">操縱：<span class="hl">鹽量</span>　應變：<span class="hl-b">沸點</span></p><p style="margin:0;">控制：水量、火力、容器相同</p><p style="margin:0;">對照：保留一杯不加鹽</p></div>'''},
{'html':'''<div class="eyebrow">素養 · 判讀</div><h2>用科學眼看新聞</h2><div class="eg"><div class="q">「某研究：吃 A 食物的人較少生病」</div></div><ul><li>有設對照組嗎？</li><li>其他變因(作息、運動)控制了嗎？</li><li>樣本夠多、可重複嗎？</li></ul><div class="box y">學會問這些問題，就不易被標題誤導。</div>'''},
{'html':'''<div class="eyebrow">本節總結</div><h2>四句話記住全部</h2><div class="box"><span class="hl">方法：</span>觀察→假設→實驗→結論，可修正</div><div class="box-b"><span class="hl-b">變因：</span>只變操縱、固定控制、設對照組</div><div class="box"><span class="hl">單位：</span>SI 基本量 m / kg / s，導出量由此組合</div><div class="box r"><span class="hl-r">測量：</span>估到下一位，有效數字反映精密度</div>'''},
{'html':'''<div class="big-center"><div class="eyebrow">下一節預告</div><h1>1-2　長度、體積與時間的測量</h1><p class="lead">拿起工具，實際量量看</p></div>'''},
],
'infographics':[
{'title':'科學方法的探究歷程','sub':'一個可反覆修正的循環',
 'body':'''<div style="flex:1;display:flex;align-items:center;justify-content:center;gap:10px;flex-wrap:wrap;">
 <div style="background:rgba(159,200,216,0.12);border:1px solid rgba(159,200,216,0.35);border-radius:10px;padding:16px 20px;font-size:18px;font-weight:700;color:var(--blue);">👀 觀察</div><div style="font-size:22px;color:var(--yellow);">→</div>
 <div style="background:rgba(240,216,120,0.12);border:1px solid rgba(240,216,120,0.35);border-radius:10px;padding:16px 20px;font-size:18px;font-weight:700;color:var(--yellow);">❓ 提問</div><div style="font-size:22px;color:var(--yellow);">→</div>
 <div style="background:rgba(196,168,216,0.12);border:1px solid rgba(196,168,216,0.35);border-radius:10px;padding:16px 20px;font-size:18px;font-weight:700;color:var(--purple);">💡 假設</div><div style="font-size:22px;color:var(--yellow);">→</div>
 <div style="background:rgba(168,208,160,0.12);border:1px solid rgba(168,208,160,0.35);border-radius:10px;padding:16px 20px;font-size:18px;font-weight:700;color:var(--green);">🧪 實驗</div><div style="font-size:22px;color:var(--yellow);">→</div>
 <div style="background:rgba(159,200,216,0.12);border:1px solid rgba(159,200,216,0.35);border-radius:10px;padding:16px 20px;font-size:18px;font-weight:700;color:var(--blue);">📊 分析</div><div style="font-size:22px;color:var(--yellow);">→</div>
 <div style="background:rgba(232,160,160,0.12);border:1px solid rgba(232,160,160,0.35);border-radius:10px;padding:16px 20px;font-size:18px;font-weight:700;color:var(--red);">✔ 結論</div>
 </div><div style="text-align:center;font-size:16px;color:rgba(244,241,232,0.75);margin-top:8px;">結論若與假設不符，回到假設重新修正——科學是循環，不是直線。</div>'''},
{'title':'三類變因與對照組','sub':'公平實驗的核心',
 'body':'''<div style="flex:1;display:flex;flex-direction:column;justify-content:center;gap:14px;">
 <div style="background:rgba(240,216,120,0.1);border:1px solid rgba(240,216,120,0.3);border-radius:10px;padding:18px;"><span style="font-size:17px;font-weight:700;color:var(--yellow);">操縱變因</span>　<span style="font-size:15px;">刻意改變的量（只能有一個）</span></div>
 <div style="background:rgba(159,200,216,0.1);border:1px solid rgba(159,200,216,0.3);border-radius:10px;padding:18px;"><span style="font-size:17px;font-weight:700;color:var(--blue);">應變變因</span>　<span style="font-size:15px;">隨之改變、被我們測量的結果</span></div>
 <div style="background:rgba(168,208,160,0.1);border:1px solid rgba(168,208,160,0.3);border-radius:10px;padding:18px;"><span style="font-size:17px;font-weight:700;color:var(--green);">控制變因</span>　<span style="font-size:15px;">其餘全部保持不變，確保公平</span></div>
 <div style="background:rgba(232,160,160,0.1);border:1px solid rgba(232,160,160,0.3);border-radius:10px;padding:18px;"><span style="font-size:17px;font-weight:700;color:var(--red);">對照組</span>　<span style="font-size:15px;">不施加操縱變因，作為比較基準</span></div>
 </div>'''},
{'title':'國際單位制 SI 基本量','sub':'全球共通的測量語言',
 'body':'''<div style="flex:1;display:flex;flex-direction:column;justify-content:center;gap:14px;">
 <table style="width:100%;border-collapse:collapse;font-size:18px;">
 <tr style="background:rgba(240,216,120,0.15);"><th style="border:1px solid rgba(244,241,232,0.2);padding:12px;color:var(--yellow);">基本量</th><th style="border:1px solid rgba(244,241,232,0.2);padding:12px;color:var(--yellow);">名稱</th><th style="border:1px solid rgba(244,241,232,0.2);padding:12px;color:var(--yellow);">符號</th></tr>
 <tr><td style="border:1px solid rgba(244,241,232,0.2);padding:12px;text-align:center;">長度</td><td style="border:1px solid rgba(244,241,232,0.2);padding:12px;text-align:center;">公尺</td><td style="border:1px solid rgba(244,241,232,0.2);padding:12px;text-align:center;">m</td></tr>
 <tr><td style="border:1px solid rgba(244,241,232,0.2);padding:12px;text-align:center;">質量</td><td style="border:1px solid rgba(244,241,232,0.2);padding:12px;text-align:center;">公斤</td><td style="border:1px solid rgba(244,241,232,0.2);padding:12px;text-align:center;">kg</td></tr>
 <tr><td style="border:1px solid rgba(244,241,232,0.2);padding:12px;text-align:center;">時間</td><td style="border:1px solid rgba(244,241,232,0.2);padding:12px;text-align:center;">秒</td><td style="border:1px solid rgba(244,241,232,0.2);padding:12px;text-align:center;">s</td></tr>
 <tr><td style="border:1px solid rgba(244,241,232,0.2);padding:12px;text-align:center;">溫度</td><td style="border:1px solid rgba(244,241,232,0.2);padding:12px;text-align:center;">克耳文</td><td style="border:1px solid rgba(244,241,232,0.2);padding:12px;text-align:center;">K</td></tr>
 </table>
 <div style="font-size:15px;color:rgba(244,241,232,0.8);text-align:center;">導出量由基本量組合：面積 m²、體積 m³、密度 kg/m³</div>
 </div>'''},
{'title':'估計值與有效數字','sub':'測量要估到下一位',
 'body':'''<div style="flex:1;display:flex;flex-direction:column;justify-content:center;gap:18px;">
 <div style="background:rgba(159,200,216,0.1);border:1px solid rgba(159,200,216,0.3);border-radius:10px;padding:22px;display:flex;align-items:center;gap:18px;"><div style="font-size:28px;">📏</div><div><div style="font-size:18px;font-weight:700;">最小刻度 0.1 cm 的尺</div><div style="font-size:15px;color:rgba(244,241,232,0.8);">要記錄到 0.01 cm —— 最後一位是合理估計值</div></div></div>
 <div style="background:rgba(232,160,160,0.1);border:1px solid rgba(232,160,160,0.3);border-radius:10px;padding:22px;display:flex;align-items:center;gap:18px;"><div style="font-size:28px;">⚠️</div><div><div style="font-size:18px;font-weight:700;">12 cm ≠ 12.0 cm</div><div style="font-size:15px;color:rgba(244,241,232,0.8);">末位的 0 代表精密度，有效數字不同，不能省略</div></div></div>
 <div style="background:rgba(168,208,160,0.1);border:1px solid rgba(168,208,160,0.3);border-radius:10px;padding:22px;display:flex;align-items:center;gap:18px;"><div style="font-size:28px;">🔁</div><div><div style="font-size:18px;font-weight:700;">重複測量取平均</div><div style="font-size:15px;color:rgba(244,241,232,0.8);">單次不可靠，多次平均可降低隨機誤差</div></div></div>
 </div>'''},
],
}
