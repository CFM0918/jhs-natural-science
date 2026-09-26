(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.FormulaModels=factory();})(typeof globalThis!=='undefined'?globalThis:this,function(){
 'use strict';
 const definitions={
 density:{title:'密度：由質量與體積求密度',fields:[['m','質量 m（g）',54],['v','體積 V（cm³）',20]],condition:'均勻物質；體積必須是物體本身的體積。',unit:'g/cm³',calc:([m,v])=>m/v,steps:([m,v],r)=>`ρ = m ÷ V\n= ${m} ÷ ${v}\n= ${r} g/cm³`},
 percent:{title:'濃度：將溶質加入水中',fields:[['s','溶質質量（g）',10],['w','水的質量（g）',90]],condition:'溶質完全溶解且不反應、不蒸發；本練習水與溶質皆須大於 0。',unit:'%',calc:([s,w])=>100*s/(s+w),steps:([s,w],r)=>`溶液質量 = ${s} + ${w} = ${fmt(s+w)} g\n濃度 = ${s} ÷ ${fmt(s+w)} × 100%\n= ${r}%`},
 speed:{title:'平均速率：總路程與總時間',fields:[['d','總路程（m）',80],['t','總時間（s）',40]],condition:'時間包含停留時間；這是平均速率，不是平均速度。',unit:'m/s',calc:([d,t])=>d/t,steps:([d,t],r)=>`平均速率 = 總路程 ÷ 總時間\n= ${d} ÷ ${t}\n= ${r} m/s`},
 heat:{title:'吸收熱量：沒有狀態改變',fields:[['m','質量（g）',100],['c','比熱（cal/(g·°C)）',1],['dt','上升溫度（°C）',10]],condition:'只計升溫且比熱固定；不含熔化、沸騰或容器吸熱。',unit:'cal',calc:([m,c,t])=>m*c*t,steps:([m,c,t],r)=>`Q = mcΔT\n= ${m} × ${c} × ${t}\n= ${r} cal`},
 echo:{title:'回聲：從往返時間求距牆距離',fields:[['v','聲速（m/s）',340],['t','往返時間（s）',0.4]],condition:'發聲與接收位置相同，聲音沿原路返回；聲速依題目條件選用。',unit:'m',calc:([v,t])=>v*t/2,steps:([v,t],r)=>`往返距離 = ${v} × ${t} = ${fmt(v*t)} m\n單程距離 = ${fmt(v*t)} ÷ 2\n= ${r} m`},
 ohm:{title:'歐姆定律：求電流',fields:[['v','電壓（V）',12],['r','電阻（Ω）',6]],condition:'理想歐姆電阻，溫度等物理條件不變。',unit:'A',calc:([v,r])=>v/r,steps:([v,r],a)=>`I = V ÷ R\n= ${v} ÷ ${r}\n= ${a} A`},
 work:{title:'作功：固定力與位移同方向',fields:[['f','力（N）',10],['s','位移（m）',3]],condition:'力固定且與位移同方向；結果是這個力所作的功。',unit:'J',calc:([f,s])=>f*s,steps:([f,s],r)=>`W = Fs\n= ${f} × ${s}\n= ${r} J`},
 electricity:{title:'用電量：功率與使用時間',fields:[['p','電功率（W）',1000],['t','使用時間（h）',2]],condition:'功率視為固定；本頁不計電價。勿接觸市電或自行改裝電器。',unit:'kWh',calc:([p,t])=>p/1000*t,steps:([p,t],r)=>`先換成 kW：${p} ÷ 1000 = ${fmt(p/1000)} kW\n電能 = ${fmt(p/1000)} × ${t} = ${r} kWh\n= ${r} 度電`}
 };
 function fmt(n){return Number(n.toPrecision(7)).toString();}
 function calculate(kind,values){const model=definitions[kind];if(!model)throw Error('請選擇有效的計算情境。');if(!Array.isArray(values)||values.length!==model.fields.length||values.some(v=>String(v).trim()===''||!Number.isFinite(Number(v))||Number(v)<=0))throw Error('請在每一格輸入大於 0 的有限數值。本練習只處理正值情境。');const nums=values.map(Number),value=model.calc(nums);if(!Number.isFinite(value)||value<=0||value>1e15||value<1e-12)throw Error('數值超出本練習範圍，請改用較接近日常情境的數值。');return {value,unit:model.unit,text:model.steps(nums,fmt(value))+'\n（結果最多顯示 7 位有效數字）'};}
 const quiz=[
 {q:'10 g 食鹽完全溶於 90 g 水，濃度式子的分母是？',options:['90 g','100 g','10 g'],answer:1,why:'分母是整份溶液質量：10 + 90 = 100 g，所以是 10%。'},
 {q:'往返原點後，平均速度與平均速率有何不同？',options:['兩者一定都是 0','平均速度為 0，平均速率可大於 0','兩者一定相等'],answer:1,why:'位移為 0，但實際走過的總路程不為 0。分子不同，就不能混用。'},
 {q:'光線與鏡面夾 30°，反射角是多少？',options:['30°','90°','60°'],answer:2,why:'入射角從法線量起，是 90° − 30° = 60°；反射角也為 60°。'},
 {q:'水正在沸騰且溫度不變，是否代表不再吸熱？',options:['不是，吸熱仍可用來改變狀態','是，因為 Q = mcΔT = 0'],answer:0,why:'Q = mcΔT 用來算沒有狀態改變的升降溫熱量，不可用它否定汽化時的吸熱。'},
 {q:'兩電阻接在同兩個節點上，是哪種連接？',options:['串聯，各處電流一定相同','並聯，各支路電壓相同'],answer:1,why:'並聯的支路共用兩端節點，所以電壓相同；總電流是支路電流之和。'},
 {q:'在地球上把均勻金屬切成等大兩塊，哪個量保持不變？',options:['每塊的質量','每塊的體積','同溫、同狀態下的密度'],answer:2,why:'質量與體積一起減半，比值 m/V 不變。'}
 ];
 return {definitions,calculate,quiz};
});
