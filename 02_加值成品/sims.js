/* 國中自然科 互動模擬引擎（canvas）。各互動教學頁引用 ../sims.js，呼叫 initSim(type, host, params)。 */
(function(){
const C={board:'#1a2e1a',chalk:'#f4f1e8',y:'#f0d878',b:'#9fc8d8',r:'#e8a0a0',g:'#a8d0a0',p:'#c4a8d8'};
function el(h){const d=document.createElement('div');d.innerHTML=h.trim();return d.firstChild;}
function ctrl(host){const c=el('<div style="margin:12px 0;display:flex;flex-wrap:wrap;gap:14px;justify-content:center;align-items:center"></div>');host.appendChild(c);return c;}
function slider(par,label,min,max,val,step,on){const w=el('<label style="font-size:13px;color:'+C.b+'">'+label+'：<input type="range" min="'+min+'" max="'+max+'" value="'+val+'" step="'+(step||1)+'" style="vertical-align:middle"> <b class="v" style="color:'+C.y+'">'+val+'</b></label>');const i=w.querySelector('input'),v=w.querySelector('.v');i.oninput=()=>{v.textContent=i.value;on(+i.value);};par.appendChild(w);return i;}
function readout(host){const r=el('<div style="text-align:center;font-size:15px;color:'+C.chalk+';margin-top:8px"></div>');host.appendChild(r);return r;}
function cv(host,w,h){const c=el('<canvas width="'+w+'" height="'+h+'" style="width:100%;max-width:'+w+'px;background:#0d160d;border:1px solid rgba(240,216,120,.2);border-radius:10px;display:block;margin:0 auto"></canvas>');host.appendChild(c);return c.getContext('2d');}

const S={};

// 波動：頻率/振幅，橫波/縱波
S.wave=function(host){let f=2,a=30,mode='橫',t=0;const g=cv(host,520,220);const c=ctrl(host);
 slider(c,'頻率(Hz)',1,6,f,1,v=>f=v);slider(c,'振幅',10,60,a,5,v=>a=v);
 const btn=el('<button style="cursor:pointer;background:'+C.b+';color:#16241c;border:none;border-radius:8px;padding:5px 12px;font-weight:700">切換橫波/縱波</button>');c.appendChild(btn);btn.onclick=()=>mode=mode==='橫'?'縱':'橫';
 const ro=readout(host);
 (function loop(){t+=0.04;g.clearRect(0,0,520,220);g.strokeStyle=C.y;g.lineWidth=2;
  if(mode==='橫'){g.beginPath();for(let x=0;x<520;x++){const yv=110+a*Math.sin((x/60)*f-t*f);if(x===0)g.moveTo(x,yv);else g.lineTo(x,yv);}g.stroke();}
  else{for(let x=0;x<520;x+=6){const d=8*Math.sin((x/60)*f-t*f);g.fillStyle=C.b;g.fillRect(x+d,90,3,40);}}
  ro.innerHTML='波形以 v=fλ 傳播　·　頻率越高波長越短　·　振幅反映'+(mode==='橫'?'響度/能量':'疏密');
  requestAnimationFrame(loop);})();};

// 歐姆定律：V,R 滑桿 → I，電子流速
S.ohm=function(host){let V=6,R=2;const g=cv(host,520,200);const c=ctrl(host);
 slider(c,'電壓 V(伏特)',1,12,V,1,v=>{V=v;});slider(c,'電阻 R(歐姆)',1,12,R,1,v=>{R=v;});
 const ro=readout(host);let ph=0;
 (function loop(){const I=V/R;ph+=I*0.05;g.clearRect(0,0,520,200);
  g.strokeStyle=C.chalk;g.lineWidth=2;g.strokeRect(60,50,400,100);
  g.fillStyle=C.y;g.fillRect(52,85,16,30);g.fillStyle='#0d160d';g.fillRect(58,92,4,16);// 電池
  g.fillStyle=C.r;g.fillRect(230,42,60,16);g.fillStyle=C.chalk;g.font='12px sans-serif';g.fillText('電阻 '+R+'Ω',235,54);
  for(let k=0;k<16;k++){const t=(ph+k/16)%1;let x,yv;const L=t*4;// 沿矩形四邊
   if(L<1){x=60+340*L;yv=150;}else if(L<2){x=460;yv=150-100*(L-1);}else if(L<3){x=460-400*(L-2);yv=50;}else{x=60;yv=50+100*(L-3);}
   g.fillStyle=C.b;g.beginPath();g.arc(x,yv,3,0,7);g.fill();}
  ro.innerHTML='電流 I = V ÷ R = '+V+' ÷ '+R+' = <b style="color:'+C.y+'">'+(V/R).toFixed(2)+' A</b>　（藍點=電子流，越快代表電流越大）';
  requestAnimationFrame(loop);})();};

// 運動：初速/加速度 → v-t 圖 + 移動點
S.motion=function(host){let v0=2,a=2;const g=cv(host,520,240);const c=ctrl(host);
 slider(c,'初速度(m/s)',0,10,v0,1,v=>v0=v);slider(c,'加速度(m/s²)',-3,5,a,1,v=>a=v);
 const ro=readout(host);let t=0;
 (function loop(){t+=0.03;if(t>5)t=0;g.clearRect(0,0,520,240);
  g.strokeStyle='rgba(244,241,232,.4)';g.beginPath();g.moveTo(40,200);g.lineTo(500,200);g.moveTo(40,200);g.lineTo(40,20);g.stroke();
  g.fillStyle=C.b;g.font='12px sans-serif';g.fillText('v',20,30);g.fillText('t',505,215);
  g.strokeStyle=C.y;g.lineWidth=2;g.beginPath();for(let tt=0;tt<=5;tt+=0.1){const vv=v0+a*tt;g.lineTo(40+tt*90,200-vv*15);}g.stroke();
  const vNow=v0+a*t;g.fillStyle=C.r;g.beginPath();g.arc(40+t*90,200-vNow*15,5,0,7);g.fill();
  // 移動小車
  const x=40+v0*t*18+0.5*a*t*t*18;g.fillStyle=C.g;g.fillRect(Math.min(x,500),215,20,12);
  ro.innerHTML='t='+t.toFixed(1)+'s　瞬時速度 v = v₀ + a·t = <b style="color:'+C.y+'">'+vNow.toFixed(1)+' m/s</b>　（黃線=v-t圖，斜率=加速度）';
  requestAnimationFrame(loop);})();};

// F=ma：力/質量 → 加速度，小車動畫
S.fma=function(host){let F=10,m=2;const g=cv(host,520,180);const c=ctrl(host);
 slider(c,'施力 F(N)',0,20,F,1,v=>F=v);slider(c,'質量 m(kg)',1,10,m,1,v=>m=v);
 const ro=readout(host);let x=40,vx=0;
 (function loop(){const a=F/m;vx+=a*0.02;x+=vx*0.3;if(x>480){x=40;vx=0;}g.clearRect(0,0,520,180);
  g.strokeStyle='rgba(244,241,232,.3)';g.beginPath();g.moveTo(0,140);g.lineTo(520,140);g.stroke();
  g.fillStyle=C.g;g.fillRect(x,110,44,30);g.fillStyle='#0d160d';g.beginPath();g.arc(x+11,142,7,0,7);g.arc(x+33,142,7,0,7);g.fill();
  g.strokeStyle=C.r;g.lineWidth=3;g.beginPath();g.moveTo(x-2,125);g.lineTo(x-2-F*2,125);g.stroke();// 力箭號
  ro.innerHTML='加速度 a = F ÷ m = '+F+' ÷ '+m+' = <b style="color:'+C.y+'">'+(F/m).toFixed(1)+' m/s²</b>　（紅箭=施力，越大加速越快）';
  requestAnimationFrame(loop);})();};

// 密度浮沉：物體密度滑桿
S.density=function(host){let d=0.8;const g=cv(host,420,260);const c=ctrl(host);
 slider(c,'物體密度(g/cm³)',0.2,2.5,d,0.1,v=>d=v);const ro=readout(host);let y=60,vy=0;
 (function loop(){const water=1;const target=d<water?90-(water-d)*40:200;// 浮:部分露出；沉:底部
  vy+=(target-y)*0.02;vy*=0.9;y+=vy;g.clearRect(0,0,420,260);
  g.fillStyle='rgba(159,200,216,.25)';g.fillRect(60,110,300,130);g.strokeStyle=C.b;g.strokeRect(60,110,300,130);
  g.fillStyle=d<water?C.g:C.r;g.fillRect(180,y,60,50);
  g.fillStyle=C.chalk;g.font='12px sans-serif';g.fillText('水 (密度1)',66,128);
  ro.innerHTML='物體密度 '+d.toFixed(1)+(d<1?' < 1 → <b style="color:'+C.g+'">上浮</b>':d>1?' > 1 → <b style="color:'+C.r+'">下沉</b>':' = 1 → 懸浮');
  requestAnimationFrame(loop);})();};

// pH：加酸/加鹼 → 顏色與 pH
S.ph=function(host){let ph=7;const g=cv(host,360,240);const c=ctrl(host);
 const acid=el('<button style="cursor:pointer;background:'+C.r+';color:#16241c;border:none;border-radius:8px;padding:6px 14px;font-weight:700">加酸 ▼</button>');
 const base=el('<button style="cursor:pointer;background:'+C.b+';color:#16241c;border:none;border-radius:8px;padding:6px 14px;font-weight:700">加鹼 ▲</button>');
 const rst=el('<button style="cursor:pointer;background:'+C.g+';color:#16241c;border:none;border-radius:8px;padding:6px 14px;font-weight:700">中和(重設)</button>');
 c.appendChild(acid);c.appendChild(base);c.appendChild(rst);
 acid.onclick=()=>ph=Math.max(0,ph-1);base.onclick=()=>ph=Math.min(14,ph+1);rst.onclick=()=>ph=7;
 const ro=readout(host);
 (function loop(){g.clearRect(0,0,360,240);
  const p=ph;let r=p<7?230:40,gg=p<7?30+p*18:120,bb=p<7?30:208;if(p===7){r=120;gg=199;bb=79;}
  g.fillStyle='rgb('+r+','+gg+','+bb+')';g.fillRect(130,60,100,150);g.strokeStyle=C.chalk;g.strokeRect(130,60,100,150);
  g.fillStyle=C.chalk;g.font='14px sans-serif';g.fillText('燒杯',160,50);
  ro.innerHTML='pH = <b style="color:'+C.y+'">'+ph+'</b>　'+(ph<7?'<span style="color:'+C.r+'">酸性</span>':ph>7?'<span style="color:'+C.b+'">鹼性</span>':'<span style="color:'+C.g+'">中性</span>')+'　（加酸pH↓、加鹼pH↑）';
  requestAnimationFrame(loop);})();};

// 遺傳棋盤 Aa×Aa
S.punnett=function(host){const opts=['AA','Aa','aa'];let f='Aa',mo='Aa';const c=ctrl(host);
 function sel(label,val,on){const w=el('<label style="font-size:13px;color:'+C.b+'">'+label+'：<select style="font-size:14px">'+opts.map(o=>'<option'+(o===val?' selected':'')+'>'+o+'</option>').join('')+'</select></label>');w.querySelector('select').onchange=e=>on(e.target.value);c.appendChild(w);}
 sel('父',f,v=>{f=v;draw();});sel('母',mo,v=>{mo=v;draw();});
 const g=cv(host,300,300);const ro=readout(host);
 function draw(){const fa=[f[0],f[1]],ma=[mo[0],mo[1]];g.clearRect(0,0,300,300);
  g.strokeStyle=C.chalk;g.font='18px serif';
  for(let i=0;i<2;i++){g.fillStyle=C.b;g.fillText(fa[i],110+i*90,40);g.fillStyle=C.r;g.fillText(ma[i],40,120+i*90);}
  const cnt={};g.lineWidth=1;
  for(let i=0;i<2;i++)for(let j=0;j<2;j++){const geno=[fa[i],ma[j]].sort((a,b)=>a<b?-1:1).join('');cnt[geno]=(cnt[geno]||0)+1;
   g.strokeStyle='rgba(244,241,232,.4)';g.strokeRect(80+i*90,60+j*90,90,90);
   g.fillStyle=geno==='aa'?C.r:C.y;g.font='22px serif';g.fillText(geno,105+i*90,115+j*90);}
  const show=Object.entries(cnt).map(([k,v])=>k+'×'+v).join('　');
  const dom=(cnt.AA||0)+(cnt.Aa||0),rec=cnt.aa||0;
  ro.innerHTML='子代基因型：'+show+'　→ 顯性:隱性 = <b style="color:'+C.y+'">'+dom+' : '+rec+'</b>';}
 draw();};

// 電磁鐵：匝數/電流 → 吸附迴紋針數
S.magnet=function(host){let turns=10,cur=2,on=true;const g=cv(host,420,220);const c=ctrl(host);
 slider(c,'線圈匝數',1,20,turns,1,v=>turns=v);slider(c,'電流(A)',0,5,cur,1,v=>cur=v);
 const btn=el('<button style="cursor:pointer;background:'+C.y+';color:#16241c;border:none;border-radius:8px;padding:5px 12px;font-weight:700">通電/斷電</button>');c.appendChild(btn);btn.onclick=()=>on=!on;
 const ro=readout(host);
 (function loop(){g.clearRect(0,0,420,220);const strength=on?Math.round(turns*cur/5):0;
  g.fillStyle=C.chalk;g.fillRect(150,90,120,26);// 鐵芯
  g.strokeStyle=on?C.y:'rgba(240,216,120,.3)';g.lineWidth=3;for(let k=0;k<Math.min(turns,14);k++){g.beginPath();g.arc(160+k*8,103,16,0,7);g.stroke();}
  for(let k=0;k<strength&&k<12;k++){g.fillStyle=C.b;g.fillRect(275+(k%6)*20,150+Math.floor(k/6)*16,14,4);}
  ro.innerHTML=(on?'通電：':'斷電：')+'磁力強度 ∝ 匝數×電流 = <b style="color:'+C.y+'">'+strength+'</b>　'+(on?'（吸附迴紋針）':'（無磁性）');
  requestAnimationFrame(loop);})();};

// 反應速率：溫度/濃度 → 粒子運動與碰撞
S.rate=function(host){let temp=3,conc=15;const g=cv(host,420,220);const c=ctrl(host);
 slider(c,'溫度',1,6,temp,1,v=>temp=v);slider(c,'濃度(粒子數)',5,30,conc,5,v=>conc=v);
 const ro=readout(host);let ps=[];function seed(){ps=[];for(let i=0;i<conc;i++)ps.push({x:Math.random()*400+10,y:Math.random()*200+10,vx:(Math.random()-.5),vy:(Math.random()-.5)});}
 seed();let lastConc=conc,hits=0,frame=0;
 (function loop(){if(conc!==lastConc){seed();lastConc=conc;}g.clearRect(0,0,420,220);frame++;hits=0;
  for(const a of ps){a.x+=a.vx*temp;a.y+=a.vy*temp;if(a.x<6||a.x>414){a.vx*=-1;}if(a.y<6||a.y>214){a.vy*=-1;}
   g.fillStyle=C.g;g.beginPath();g.arc(a.x,a.y,4,0,7);g.fill();}
  for(let i=0;i<ps.length;i++)for(let j=i+1;j<ps.length;j++){const dx=ps[i].x-ps[j].x,dy=ps[i].y-ps[j].y;if(dx*dx+dy*dy<80)hits++;}
  ro.innerHTML='溫度↑、濃度↑ → 有效碰撞↑ → 反應速率↑　　目前碰撞數≈ <b style="color:'+C.y+'">'+hits+'</b>';
  requestAnimationFrame(loop);})();};

// 通用互動配對（點左再點右配對）
S.match=function(host,pairs){pairs=pairs||[];const c=el('<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;max-width:640px;margin:0 auto"></div>');host.appendChild(c);
 const ro=readout(host);let sel=null,done=0;
 const L=pairs.map((p,i)=>({t:p[0],i}));const R=pairs.map((p,i)=>({t:p[1],i}));
 function shuf(a){return a.sort(()=>Math.random()-.5);}shuf(L);shuf(R);
 const left=el('<div></div>'),right=el('<div></div>');c.appendChild(left);c.appendChild(right);
 function mk(item,side){const d=el('<div style="cursor:pointer;background:'+(side==='L'?'rgba(232,160,160,.15)':'rgba(168,208,160,.15)')+';border:1px solid '+(side==='L'?'rgba(232,160,160,.5)':'rgba(168,208,160,.5)')+';border-radius:8px;padding:10px;margin:6px 0;font-size:13.5px;color:'+C.chalk+'">'+item.t+'</div>');
  d.onclick=()=>{if(d.dataset.ok)return;if(side==='L'){if(sel)sel.el.style.outline='';sel={item,el:d};d.style.outline='2px solid '+C.y;}
   else if(sel){if(sel.item.i===item.i){d.dataset.ok=sel.el.dataset.ok='1';d.style.opacity=sel.el.style.opacity='.5';d.style.outline=sel.el.style.outline='2px solid '+C.g;done++;ro.innerHTML='配對正確！ '+done+' / '+pairs.length+(done===pairs.length?'　🎉 全部完成！':'');sel=null;}
    else{d.style.outline='2px solid '+C.r;setTimeout(()=>d.style.outline='',400);}}};return d;}
 L.forEach(x=>left.appendChild(mk(x,'L')));R.forEach(x=>right.appendChild(mk(x,'R')));
 ro.innerHTML='點左側概念，再點右側正確配對 　0 / '+pairs.length;};

window.initSim=function(type,host,params){host.innerHTML='';(S[type]||S.match)(host,params);};
})();
