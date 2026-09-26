(function(){
  'use strict';
  const container=document.getElementById('courseLab');
  if(!container)return;
  const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const model=ScienceModels[container.dataset.lab];
  if(!model)return;
  const svg=(label,body)=>`<svg viewBox="0 0 640 340" role="img" aria-label="${escape(label)}" xmlns="http://www.w3.org/2000/svg">${body}</svg>`;
  const text=(x,y,value,extra='')=>`<text x="${x}" y="${y}" ${extra}>${escape(value)}</text>`;
  function scene(result){
    if(window.ScienceArt){
      const v=values(),types={atom:'atom',ph:'ph',chain:'chain',water:'buoyancy',force:'force',ramp:'energy',circuit:'circuit',cycle:'watercycle',moon:'moon',magnet:'induction',cloud:'weather',earth:'greenhouse'};
      if(types[result.scene])return ScienceArt.scene(types[result.scene],{title:model.title,...v,...(result.particles||{}),ph:result.ph,rh:result.rh,emf:result.emf,parallel:result.parallel,phase:v.phase,height:result.height});
      if(result.scene==='transfer')return ScienceArt.concepts({title:model.title,items:[{label:'加入的金屬',detail:{Zn:'鋅',Fe:'鐵',Cu:'銅'}[v.metal]},{label:'氧化物中的金屬',detail:{Zn:'鋅',Fe:'鐵',Cu:'銅'}[v.oxide]},{label:'判斷結果',detail:result.value+(result.transfer?'：氧化物失去氧，加入者得到氧。':'：加入者未比氧化物中的金屬活潑。')}],type:'flow'});
      if(result.scene==='waves')return ScienceArt.concepts({title:model.title,items:[{label:'共同路程',detail:`震源到測站 ${v.distance} km；兩種波沿相同路程傳播。`},{label:'P 波先到',detail:`速率 6 km/s，到時 ${(v.distance/6).toFixed(1)} s。`},{label:'S 波後到',detail:`速率 3.5 km/s，到時 ${(v.distance/3.5).toFixed(1)} s。`}],type:'flow'});
      return '';
    }
    const stroke='fill="none" stroke="#0369a1" stroke-width="5"';
    let shape='';
    switch(result.scene){
      case 'atom':{const v=result.particles;shape=`<circle cx="320" cy="167" r="65" fill="#ffedd5" stroke="#c2410c" stroke-width="3"/><ellipse cx="320" cy="167" rx="225" ry="125" ${stroke}/>${text(320,159,`${v.p} 個質子`,'text-anchor="middle"')}${text(320,187,`${v.n} 個中子`,'text-anchor="middle"')}`;for(let i=0;i<v.e;i++){const a=2*Math.PI*i/v.e;shape+=`<circle cx="${320+225*Math.cos(a)}" cy="${167+125*Math.sin(a)}" r="10" fill="#0369a1"/>`;}shape+=text(20,326,'電子圓點：只表示數量，非真實軌道');break;}
      case 'transfer':shape=`<rect x="45" y="100" width="185" height="110" rx="12" fill="#e0f2fe"/><rect x="410" y="100" width="185" height="110" rx="12" fill="#ffedd5"/>${text(137,155,'加入的金屬','text-anchor="middle"')}${text(502,155,'金屬氧化物','text-anchor="middle"')}${text(320,145,result.transfer?'← 氧轉移':'無奪氧','text-anchor="middle"')}${text(320,268,result.transfer?'加入者被氧化；氧化物被還原':'先比較兩種金屬的活動性','text-anchor="middle"')}`;break;
      case 'ph':{const x=40+result.ph/14*560;shape=`<rect x="40" y="100" width="280" height="50" fill="#fecaca"/><rect x="320" y="100" width="280" height="50" fill="#bfdbfe"/><path d="M${x} 80V175" stroke="#0f172a" stroke-width="5"/>${text(40,205,'pH 0 酸性')}${text(320,205,'7 中性','text-anchor="middle"')}${text(600,205,'14 鹼性','text-anchor="end"')}${text(320,270,'H⁺ ＋ OH⁻ → H₂O','text-anchor="middle"')}`;break;}
      case 'chain':{const n=result.carbon;for(let i=0;i<n;i++){const x=320+(i-(n-1)/2)*80;if(i<n-1)shape+=`<path d="M${x} 145h80" stroke="#64748b" stroke-width="5"/>`;shape+=`<circle cx="${x}" cy="145" r="26" fill="#0f172a"/>${text(x,151,'C','text-anchor="middle" fill="white"')}${text(x,217,(n===1?'4':i===0||i===n-1?'3':'2')+' 個 H','text-anchor="middle"')}`;}shape+=text(320,296,'每個碳總共形成四個共價鍵','text-anchor="middle"');break;}
      case 'water':shape=`<path d="M100 45V285H540V45" ${stroke}/><path d="M104 80H536V281H104Z" fill="#bae6fd"/><rect x="270" y="${95+result.depth*25}" width="100" height="35" fill="#64748b"/><path d="M165 82v${result.depth*25+15}" stroke="#c2410c" stroke-width="4"/>${text(180,165,`深度 ${result.depth} m`)}${text(320,324,'完全浸沒；排開的液體體積不變','text-anchor="middle"')}`;break;
      case 'force':shape=`<path d="M55 250H585" stroke="#64748b" stroke-width="4"/><rect x="240" y="140" width="160" height="90" rx="10" fill="#e0f2fe" stroke="#0369a1" stroke-width="4"/><circle cx="275" cy="240" r="13" fill="#334155"/><circle cx="365" cy="240" r="13" fill="#334155"/><path d="M400 173h${result.force*3}l-15 -10m15 10l-15 10" stroke="#15803d" stroke-width="5" fill="none"/>${result.friction>0?'<path d="M240 202H130l15 -10m-15 10l15 10" stroke="#c2410c" stroke-width="5" fill="none"/>':''}${text(445,125,`${result.force} N →`)}${text(125,282,`← ${result.friction} N`)}${text(320,175,'小車','text-anchor="middle"')}`;break;
      case 'ramp':{const x=90+(10-result.height)*42,y=55+(10-result.height)*22;shape=`<path d="M90 55L510 275H90Z" fill="#e0f2fe" stroke="#0369a1" stroke-width="4"/><circle cx="${x}" cy="${y-17}" r="17" fill="#c2410c"/>${text(310,323,`目前高度 ${result.height} m；地面為位能零點`,'text-anchor="middle"')}`;break;}
      case 'circuit':shape=`<path d="M100 120H245M395 120H550V265H100V210M100 120V170" ${stroke}/><path d="M75 172H125M85 200H115" stroke="#334155" stroke-width="5"/>${text(42,185,'＋')}${text(44,211,'−')}`+(result.parallel?`<path d="M245 120V80H395V120M245 120V175H395V120" ${stroke}/><rect x="285" y="64" width="70" height="32" fill="#fff7ed" stroke="#c2410c" stroke-width="3"/><rect x="285" y="159" width="70" height="32" fill="#fff7ed" stroke="#c2410c" stroke-width="3"/>${text(320,54,'R₁','text-anchor="middle"')}${text(320,227,'R₂','text-anchor="middle"')}`:`<path d="M285 120H345" ${stroke}/><rect x="220" y="102" width="65" height="36" fill="#fff7ed" stroke="#c2410c" stroke-width="3"/><rect x="345" y="102" width="65" height="36" fill="#fff7ed" stroke="#c2410c" stroke-width="3"/>${text(250,85,'R₁','text-anchor="middle"')}${text(377,85,'R₂','text-anchor="middle"')}`);shape+=text(320,322,result.parallel?'分流後再會合：各支路電壓相同':'只有一條通路：各處電流相同','text-anchor="middle"');break;
      case 'cycle':shape=`<path d="M30 215Q180 50 320 215T610 215V300H30Z" fill="#dcfce7"/><path d="M350 235Q450 165 610 230V300H350Z" fill="#bae6fd"/><path d="M150 95v90m-10 -15l10 15l10 -15M230 220v70m-10 -15l10 15l10 -15M320 205l110 40m-12 -18l12 18l-22 3" stroke="#0369a1" fill="none" stroke-width="5"/>${text(82,73,'降雨')}${text(159,325,'入滲')}${text(398,173,'地表逕流')}${text(460,288,'河流／海洋')}`;break;
      case 'waves':shape=`<circle cx="110" cy="170" r="16" fill="#c2410c"/><path d="M140 120H520M140 220H520" stroke="#94a3b8" stroke-width="3"/><path d="M${140+result.distance/600*340} 70V270" stroke="#0369a1" stroke-width="5"/>${text(28,212,'震源')}${text(180,104,'P 波：6 km/s')}${text(180,256,'S 波：3.5 km/s')}${text(355,42,'測站')}${text(320,321,'相同距離：快的 P 波先到','text-anchor="middle"')}`;break;
      case 'moon':{const x=300+145*Math.cos(result.angle),y=166-125*Math.sin(result.angle);shape=`<circle cx="300" cy="166" r="25" fill="#0369a1"/><ellipse cx="300" cy="166" rx="145" ry="125" fill="none" stroke="#94a3b8" stroke-width="2"/><circle cx="${x}" cy="${y}" r="18" fill="#334155"/><path d="M${x} ${y-18}a18 18 0 0 1 0 36Z" fill="#fde68a"/>${text(300,210,'地球','text-anchor="middle"')}<path d="M615 85H505m15 -9l-15 9l15 9M615 165H505m15 -9l-15 9l15 9M615 245H505m15 -9l-15 9l15 9" stroke="#c2410c" stroke-width="4" fill="none"/>${text(563,47,'太陽光','text-anchor="middle"')}${text(320,328,'亮的一半永遠朝向太陽；軌道未按比例','text-anchor="middle"')}`;break;}
      case 'magnet':{const angle=Math.max(-1,Math.min(1,result.emf/20))*1.1,px=320+100*Math.sin(angle),py=230-100*Math.cos(angle);shape=`<path d="M160 235A160 160 0 0 1 480 235" ${stroke}/><path d="M320 230L${px} ${py}" stroke="#c2410c" stroke-width="5"/><circle cx="320" cy="230" r="10" fill="#334155"/>${text(174,269,'−')}${text(320,48,'0','text-anchor="middle"')}${text(450,269,'＋')}${text(320,321,'表頭偏轉：方向由相對運動與磁極共同決定','text-anchor="middle"')}`;break;}
      case 'cloud':shape=`<path d="M180 165Q115 105 200 100Q245 30 315 90Q400 40 430 110Q520 110 470 180H185" fill="#e2e8f0" stroke="#64748b" stroke-width="4"/>${text(320,138,`RH ${result.rh.toFixed(1)}%`,'text-anchor="middle"')}${result.rh>=100?'<path d="M210 215l-15 30m80 -30l-15 30m80 -30l-15 30m80 -30l-15 30" stroke="#0369a1" stroke-width="7"/>':''}${text(320,312,result.rh>=100?'已達飽和；多餘水氣可凝結':'降溫降低飽和水氣量，相對溼度上升','text-anchor="middle"')}`;break;
      case 'earth':shape=`<circle cx="320" cy="164" r="110" fill="#bae6fd" stroke="#0369a1" stroke-width="4"/><path d="M265 70l-30 55 40 20 20 75 35 -35 10 -75ZM357 187l-9 65 45 -20 20 -42Z" fill="#15803d"/>${text(320,317,'節能＋低排放能源：一起降低排放','text-anchor="middle"')}`;break;
      default:return '';
    }
    return svg(model.title+'示意：'+result.value,shape);
  }
  function chart(result){
    if(window.ScienceArt)return ScienceArt.plot({title:model.title+'｜數據圖',points:result.line,bars:result.bars,marker:result.marker,xLabel:result.xLabel,yLabel:result.yLabel||result.unit});
    const left=88,right=595,top=35,bottom=260;
    if(result.line){
      const all=result.line, xmax=Math.max(...all.map(p=>p.x),1),ymin=Math.min(0,...all.map(p=>p.y)),ymax=Math.max(...all.map(p=>p.y),1),yp=y=>(bottom-(y-ymin)/(ymax-ymin)*(bottom-top)),xp=x=>left+x/xmax*(right-left);
      let lines='';for(let i=0;i<5;i++){const y=ymin+(ymax-ymin)*i/4;lines+=`<path d="M${left} ${yp(y)}H${right}" stroke="#e2e8f0"/>${text(left-10,yp(y)+6,Number(y.toFixed(1)).toLocaleString(),'text-anchor="end"')}`;}
      return svg(`${model.title}，橫軸${result.xLabel}，縱軸${result.yLabel}；下方有完整資料表。`,`${lines}<path d="M${left} ${top}V${bottom}H${right}" fill="none" stroke="#475569" stroke-width="3"/><polyline points="${all.map(p=>`${xp(p.x)},${yp(p.y)}`).join(' ')}" fill="none" stroke="#0369a1" stroke-width="5"/>${result.marker?`<circle cx="${xp(result.marker.x)}" cy="${yp(result.marker.y)}" r="8" fill="#c2410c" stroke="white" stroke-width="3"/>`:''}${text(left,286,'0')}${text(right,286,xmax,'text-anchor="end"')}${text(350,325,result.xLabel,'text-anchor="middle"')}${text(left,22,result.yLabel)}`);
    }
    const bars=result.bars||[],min=Math.min(0,...bars.map(p=>p[1])),max=Math.max(1,...bars.map(p=>p[1])),yp=y=>bottom-(y-min)/(max-min)*(bottom-top),base=yp(0),spacing=(right-left)/Math.max(1,bars.length);
    let contents=`<path d="M${left} ${base}H${right}" stroke="#475569" stroke-width="3"/>${text(left,22,result.unit)}`;
    bars.forEach(([label,value],i)=>{const x=left+i*spacing+spacing*.2,y=yp(value),height=Math.abs(base-y);contents+=`<rect x="${x}" y="${Math.min(y,base)}" width="${spacing*.6}" height="${Math.max(height,1)}" rx="5" fill="${i%2?'#0f766e':'#0369a1'}"/>${text(x+spacing*.3,value<0?y+24:Math.max(24,y-10),Number(value.toFixed(2)).toLocaleString(),'text-anchor="middle"')}${text(x+spacing*.3,308,label,'text-anchor="middle"')}`;});
    return svg(model.title+'資料圖；各長條均附數值與名稱，下方有表格。',contents);
  }
  const controls=model.controls.map(c=>`<div class="lab-control"><label for="lab-${c.key}">${escape(c.label)} <output id="out-${c.key}"></output></label>${c.options?`<select id="lab-${c.key}">${c.options.map(([value,label])=>`<option value="${value}" ${String(value)===String(c.value)?'selected':''}>${escape(label)}</option>`).join('')}</select>`:`<input id="lab-${c.key}" type="range" min="${c.min}" max="${c.max}" step="${c.step}" value="${c.value}">`}</div>`).join('');
  container.innerHTML=`<div class="lab-intro"><p class="visual-kicker">改變條件・觀察證據</p><h3>${escape(model.title)}</h3><p>${escape(model.question)}</p></div><div class="lab-workbench"><div class="lab-controls">${controls}<button type="button" class="lab-reset">恢復初始條件</button></div><div><div class="lab-scene"></div><div class="lab-result" aria-live="polite" aria-atomic="true"></div></div></div><figure class="lab-plot"></figure><details class="lab-data"><summary>以資料表閱讀圖表</summary><div class="data-table-wrap"></div></details><p class="model-note">模型條件：${escape(model.note)}</p><button type="button" class="lab-record">記錄這次實驗</button><p class="record-status" role="status"></p><div class="lab-records"></div>`;
  const records=[];
  let current;
  function values(){return Object.fromEntries(model.controls.map(c=>{const raw=container.querySelector('#lab-'+c.key).value;return [c.key,Number.isNaN(Number(raw))?raw:Number(raw)];}));}
  function update(){
    const v=values();current=model.calculate(v);
    model.controls.forEach(c=>{container.querySelector('#out-'+c.key).textContent=c.options?'':`${v[c.key]} ${c.unit}`;});
    container.querySelector('.lab-result').innerHTML=`<strong>${escape(current.value)}</strong><p>${escape(current.detail)}</p>`;
    const drawing=scene(current),zoom='<button type="button" class="visual-zoom" aria-haspopup="dialog">放大互動圖</button>';
    container.querySelector('.lab-scene').innerHTML=drawing?drawing+zoom:'';
    container.querySelector('.lab-plot').innerHTML=chart(current)+zoom;
    const headers=current.line?[current.xLabel,current.yLabel]:['項目',current.unit];
    const rows=current.line?current.line.map(p=>[p.x,p.y]):current.bars;
    container.querySelector('.lab-data .data-table-wrap').innerHTML=`<table><caption>${escape(model.title)}資料</caption><thead><tr>${headers.map(h=>`<th scope="col">${escape(h)}</th>`).join('')}</tr></thead><tbody>${rows.map(row=>`<tr>${row.map(value=>`<td>${escape(typeof value==='number'?Number(value.toFixed(3)):value)}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
  }
  container.querySelectorAll('input,select').forEach(input=>input.addEventListener('input',update));
  container.querySelector('.lab-reset').addEventListener('click',()=>{model.controls.forEach(c=>container.querySelector('#lab-'+c.key).value=c.value);update();});
  container.querySelector('.lab-record').addEventListener('click',()=>{
    const v=values();records.push({settings:model.controls.map(c=>`${c.label}：${c.options?c.options.find(o=>String(o[0])===String(v[c.key]))[1]:v[c.key]+' '+c.unit}`).join('；'),value:current.value});
    if(records.length>6)records.shift();
    container.querySelector('.record-status').textContent=`已記錄；目前保留最近 ${records.length} 次。紀錄只在本頁開啟期間保留。`;
    container.querySelector('.lab-records').innerHTML=`<ol>${records.map(r=>`<li><b>${escape(r.value)}</b><span>${escape(r.settings)}</span></li>`).join('')}</ol>`;
  });
  update();
  const gameBox=document.getElementById('chapterGame'),game=window.COURSE_GAME;
  if(!gameBox||!game)return;
  let gameIndex=0,firstCorrect=0,attempted=false,done=false;
  gameBox.innerHTML=`<div class="game-top"><h3>${escape(game.title)}</h3><span class="game-score"></span></div><p>${escape(game.intro)}</p><div class="game-item"></div><div class="game-actions"></div><p class="game-feedback" role="status"></p><div class="game-footer"><button class="game-next" type="button" hidden>下一題</button><button class="game-restart" type="button">重新開始</button></div>`;
  function renderGame(){
    const q=game.items[gameIndex];attempted=false;done=false;
    gameBox.querySelector('.game-score').textContent=`第 ${gameIndex+1}／${game.items.length} 關`;
    gameBox.querySelector('.game-item').textContent=q.prompt;
    const feedback=gameBox.querySelector('.game-feedback');feedback.className='game-feedback';feedback.textContent='先選擇答案；答錯會給解釋，可以修正。';
    const next=gameBox.querySelector('.game-next');next.hidden=true;next.textContent=gameIndex===game.items.length-1?'查看闖關成果':'下一題';
    const actions=gameBox.querySelector('.game-actions');actions.innerHTML=q.options.map((o,i)=>`<button type="button" data-answer="${i}">${escape(o)}</button>`).join('');
    actions.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{
      if(done)return;const correct=Number(b.dataset.answer)===q.answer;
      if(correct&&!attempted)firstCorrect++;attempted=true;
      feedback.className='game-feedback '+(correct?'good':'bad');feedback.textContent=(correct?'答對了。':'再想一想。')+q.explanation;
      if(correct){done=true;actions.querySelectorAll('button').forEach(button=>button.disabled=true);next.hidden=false;}
    }));
  }
  gameBox.querySelector('.game-next').addEventListener('click',()=>{
    if(gameIndex<game.items.length-1){gameIndex++;renderGame();}
    else {gameBox.querySelector('.game-item').textContent=`全部完成！首次作答 ${firstCorrect}／${game.items.length} 題答對`;gameBox.querySelector('.game-actions').innerHTML='';gameBox.querySelector('.game-next').hidden=true;gameBox.querySelector('.game-feedback').textContent='可重新挑戰，或到章末測驗檢查自己是否真的理解。';}
  });
  gameBox.querySelector('.game-restart').addEventListener('click',()=>{gameIndex=0;firstCorrect=0;renderGame();});renderGame();
})();
