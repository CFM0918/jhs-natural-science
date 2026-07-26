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

// 凸透鏡成像：物距滑桿
S.lens=function(host){let u=200;const f=80;const g=cv(host,520,240);const c=ctrl(host);
 slider(c,'物距 u(cm)',30,320,u,10,v=>u=v);const ro=readout(host);
 (function loop(){g.clearRect(0,0,520,240);const cx=300;
  g.strokeStyle='rgba(244,241,232,.3)';g.beginPath();g.moveTo(0,140);g.lineTo(520,140);g.stroke();
  g.strokeStyle=C.b;g.lineWidth=2;g.beginPath();g.ellipse(cx,140,10,72,0,0,7);g.stroke();
  g.fillStyle=C.y;[cx-f,cx+f,cx-2*f,cx+2*f].forEach(x=>g.fillRect(x-1,137,2,7));
  const ox=cx-u*0.7,oh=46;g.strokeStyle=C.g;g.lineWidth=3;g.beginPath();g.moveTo(ox,140);g.lineTo(ox,140-oh);g.stroke();g.beginPath();g.moveTo(ox-4,140-oh+8);g.lineTo(ox,140-oh);g.lineTo(ox+4,140-oh+8);g.stroke();
  const v=1/(1/f-1/u);const m=-v/u;const ih=oh*m;const ix=cx+v*0.7;
  g.strokeStyle=C.r;g.beginPath();g.moveTo(ix,140);g.lineTo(ix,140-ih);g.stroke();g.beginPath();g.moveTo(ix-4,140-ih+(ih>0?8:-8));g.lineTo(ix,140-ih);g.lineTo(ix+4,140-ih+(ih>0?8:-8));g.stroke();
  let d;if(u>2*f)d='倒立縮小實像（照相機）';else if(u>f+2)d='倒立放大實像（投影機）';else if(u<f-2)d='正立放大虛像（放大鏡）';else d='成像於無限遠';
  ro.innerHTML='物距 '+u+'cm → <b style="color:'+C.y+'">'+d+'</b>　（綠=物體，紅=成像，黃=焦點）';
  requestAnimationFrame(loop);})();};

// 月相盈虧
S.moon=function(host){let ang=0;const g=cv(host,440,300);const c=ctrl(host);
 slider(c,'月球公轉位置(°)',0,360,ang,15,v=>ang=v);const ro=readout(host);
 const names=[[0,'滿月'],[45,'虧凸月'],[90,'下弦月'],[135,'殘月'],[180,'新月'],[225,'眉月'],[270,'上弦月'],[315,'盈凸月']];
 (function loop(){g.clearRect(0,0,440,300);const ex=180,ey=160,R=100;
  g.fillStyle=C.y;g.beginPath();g.arc(26,160,16,0,7);g.fill();g.fillStyle=C.chalk;g.font='12px sans-serif';g.fillText('太陽',10,146);
  g.strokeStyle='rgba(244,241,232,.2)';g.beginPath();g.arc(ex,ey,R,0,7);g.stroke();
  g.fillStyle=C.b;g.beginPath();g.arc(ex,ey,14,0,7);g.fill();g.fillStyle=C.chalk;g.fillText('地球',ex-13,ey+28);
  const a=ang*Math.PI/180,mx=ex+R*Math.cos(a),my=ey+R*Math.sin(a);
  g.fillStyle='#666';g.beginPath();g.arc(mx,my,10,0,7);g.fill();
  const k=(1+Math.cos(a))/2;const dx=380,dy=90;
  g.fillStyle='#333';g.beginPath();g.arc(dx,dy,34,0,7);g.fill();
  g.save();g.beginPath();g.arc(dx,dy,34,0,7);g.clip();g.fillStyle=C.chalk;g.fillRect(dx-34,dy-34,68*k,68);g.restore();
  g.fillStyle=C.b;g.font='12px sans-serif';g.fillText('地球看到的月相',dx-52,dy+52);
  let best=names[0],bd=999;for(const p of names){let dd=180-Math.abs(((ang-p[0]+540)%360)-180);if(dd<bd){bd=dd;best=p;}}
  ro.innerHTML='月相：<b style="color:'+C.y+'">'+best[1]+'</b>　（由日-地-月相對位置決定，非地球影子）';
  requestAnimationFrame(loop);})();};

// 季節成因
S.season=function(host){let pos=180;const g=cv(host,460,300);const c=ctrl(host);
 slider(c,'地球公轉位置(°)',0,360,pos,30,v=>pos=v);const ro=readout(host);
 const seas=[[0,'冬至·北半球冬季（晝短）'],[90,'春分·晝夜等長'],[180,'夏至·北半球夏季（晝長）'],[270,'秋分·晝夜等長']];
 (function loop(){g.clearRect(0,0,460,300);const cx=230,cy=150,R=120;
  g.fillStyle=C.y;g.beginPath();g.arc(cx,cy,20,0,7);g.fill();g.fillStyle=C.chalk;g.font='12px sans-serif';g.fillText('太陽',cx-14,cy+42);
  g.strokeStyle='rgba(244,241,232,.2)';g.beginPath();g.ellipse(cx,cy,R,R*0.62,0,0,7);g.stroke();
  const a=pos*Math.PI/180,ex=cx+R*Math.cos(a),ey=cy+R*0.62*Math.sin(a);
  g.fillStyle=C.b;g.beginPath();g.arc(ex,ey,15,0,7);g.fill();
  g.strokeStyle=C.r;g.lineWidth=2;g.beginPath();g.moveTo(ex-7,ey+16);g.lineTo(ex+7,ey-16);g.stroke();
  let best=seas[0],bd=999;for(const p of seas){let dd=180-Math.abs(((pos-p[0]+540)%360)-180);if(dd<bd){bd=dd;best=p;}}
  ro.innerHTML='<b style="color:'+C.y+'">'+best[1]+'</b>　（紅線=地軸，傾斜方向固定；公轉使太陽直射點南北移動→四季）';
  requestAnimationFrame(loop);})();};

// 光合作用速率
S.photosyn=function(host){let light=5;const g=cv(host,420,240);const c=ctrl(host);
 slider(c,'光照強度',0,10,light,1,v=>light=v);const ro=readout(host);let bubbles=[],acc=0;
 (function loop(){g.clearRect(0,0,420,240);const rate=Math.min(light,7);
  g.fillStyle=C.y;g.beginPath();g.arc(40,40,16,0,7);g.fill();
  g.strokeStyle=C.g;g.lineWidth=5;g.beginPath();g.moveTo(210,240);g.lineTo(210,130);g.stroke();
  for(let lf=0;lf<3;lf++){g.beginPath();g.ellipse(210+(lf%2?18:-18),150+lf*22,16,7,lf%2?0.5:-0.5,0,7);g.stroke();}
  acc+=rate*0.06;if(acc>1&&rate>0){acc=0;bubbles.push({x:210+(Math.random()*24-12),y:130});}
  bubbles=bubbles.filter(b=>b.y>-10);g.fillStyle=C.b;bubbles.forEach(b=>{b.y-=1+rate*0.25;g.beginPath();g.arc(b.x,b.y,3,0,7);g.fill();});
  ro.innerHTML='光照 '+light+' → 光合速率 <b style="color:'+C.y+'">'+(rate>=7?'已達飽和':'隨光增強')+'</b>　（藍泡=釋出的氧氣，越快代表速率越高）';
  requestAnimationFrame(loop);})();};

// 電路通路/斷路
S.circuit=function(host){let on=true;const g=cv(host,440,220);const c=ctrl(host);
 const btn=el('<button style="cursor:pointer;background:'+C.y+';color:#16241c;border:none;border-radius:8px;padding:6px 16px;font-weight:700">開關 開/關</button>');c.appendChild(btn);btn.onclick=()=>on=!on;
 const ro=readout(host);let ph=0;
 (function loop(){g.clearRect(0,0,440,220);g.strokeStyle=C.chalk;g.lineWidth=2;
  g.beginPath();g.moveTo(70,50);g.lineTo(70,170);g.lineTo(370,170);g.lineTo(370,50);g.lineTo(250,50);g.stroke();
  g.beginPath();g.moveTo(70,50);g.lineTo(190,50);g.stroke();
  g.strokeStyle=on?C.g:C.r;g.lineWidth=4;g.beginPath();g.moveTo(190,50);g.lineTo(on?250:238,on?50:26);g.stroke();
  g.fillStyle=C.y;g.fillRect(62,95,16,30);g.fillStyle=C.chalk;g.font='11px sans-serif';g.fillText('電池',44,112);
  g.beginPath();g.arc(220,170,17,0,7);g.fillStyle=on?'rgba(240,216,120,.9)':'rgba(120,120,120,.35)';g.fill();g.strokeStyle=C.chalk;g.lineWidth=1;g.stroke();g.fillStyle=C.chalk;g.fillText('燈泡',206,205);
  if(on){ph+=0.05;const pts=[[70,170],[370,170],[370,50],[250,50]];g.fillStyle=C.b;for(let k=0;k<10;k++){const t=(ph+k/10)%1;const seg=Math.floor(t*3),ft=t*3-seg;const p0=pts[seg],p1=pts[seg+1]||pts[3];g.beginPath();g.arc(p0[0]+(p1[0]-p0[0])*ft,p0[1]+(p1[1]-p0[1])*ft,3,0,7);g.fill();}}
  ro.innerHTML=on?'<b style="color:'+C.g+'">通路</b>：開關接通，電流流動，燈泡發亮 💡':'<b style="color:'+C.r+'">斷路</b>：開關斷開，電流無法流動，燈不亮';
  requestAnimationFrame(loop);})();};

// 溶液濃度
S.concentration=function(host){let solute=20,water=80;const g=cv(host,320,240);const c=ctrl(host);
 slider(c,'溶質(g)',0,60,solute,5,v=>solute=v);slider(c,'水(g)',20,200,water,10,v=>water=v);const ro=readout(host);
 (function loop(){g.clearRect(0,0,320,240);const pct=solute/(solute+water)*100;const al=Math.min(0.85,pct/45+0.05);
  g.fillStyle='rgba(240,216,120,'+al.toFixed(2)+')';g.fillRect(110,60,100,160);g.strokeStyle=C.chalk;g.lineWidth=2;g.strokeRect(110,60,100,160);
  g.fillStyle=C.chalk;g.font='12px sans-serif';g.fillText('溶液',150,52);
  ro.innerHTML='重量百分濃度 = 溶質÷溶液×100% = '+solute+'÷'+(solute+water)+'×100% = <b style="color:'+C.y+'">'+pct.toFixed(1)+'%</b>　（顏色越深越濃）';
  requestAnimationFrame(loop);})();};

// 熱的傳播
S.heat=function(host){let mode='傳導';const g=cv(host,460,220);const c=ctrl(host);
 ['傳導','對流','輻射'].forEach(m=>{const b=el('<button style="cursor:pointer;background:'+(m==='傳導'?C.y:'none')+';color:'+(m==='傳導'?'#16241c':C.b)+';border:1px solid rgba(159,200,216,.4);border-radius:8px;padding:5px 14px;font-weight:700">'+m+'</button>');b.onclick=function(){mode=m;Array.prototype.forEach.call(c.querySelectorAll('button'),function(x){x.style.background='none';x.style.color=C.b;});b.style.background=C.y;b.style.color='#16241c';};c.appendChild(b);});
 const ro=readout(host);let t=0;
 (function loop(){t+=0.02;g.clearRect(0,0,460,220);g.font='13px sans-serif';
  if(mode==='傳導'){const p=Math.min(1,(t%4)/4+0.05);for(let x=0;x<380;x++){const h=Math.max(0,1-(x/380)/p);g.fillStyle='rgb('+Math.round(70+185*h)+','+Math.round(70*(1-h))+',45)';g.fillRect(50+x,110,1,32);}g.fillStyle=C.r;g.font='22px sans-serif';g.fillText('🔥',22,138);g.fillStyle=C.chalk;g.font='13px sans-serif';g.fillText('金屬棒：熱由高溫端沿棒傳導(固體)',110,80);}
  else if(mode==='對流'){g.strokeStyle='rgba(159,200,216,.4)';g.strokeRect(130,40,200,150);g.font='22px sans-serif';g.fillStyle=C.r;g.fillText('🔥',215,212);const yy=(t*60)%150;g.fillStyle=C.r;g.beginPath();g.moveTo(185,185-yy);g.lineTo(190,193-yy);g.lineTo(180,193-yy);g.fill();g.fillStyle=C.b;g.beginPath();g.moveTo(285,45+yy);g.lineTo(290,37+yy);g.lineTo(280,37+yy);g.fill();g.fillStyle=C.chalk;g.font='13px sans-serif';g.fillText('流體：熱者上升、冷者下降形成對流',110,28);}
  else{const cx=230,cy=115;for(let k=0;k<4;k++){const rr=((t*90+k*35)%140);g.strokeStyle='rgba(240,216,120,'+(1-rr/140).toFixed(2)+')';g.lineWidth=2;g.beginPath();g.arc(cx,cy,rr,0,7);g.stroke();}g.fillStyle=C.y;g.beginPath();g.arc(cx,cy,14,0,7);g.fill();g.fillStyle=C.chalk;g.font='13px sans-serif';g.fillText('輻射：不需介質，以電磁波向外傳播',105,30);}
  ro.innerHTML='熱傳播方式：<b style="color:'+C.y+'">'+mode+'</b>　（傳導=固體｜對流=流體流動｜輻射=不需介質）';
  requestAnimationFrame(loop);})();};

// 回聲測距
S.echo=function(host){let dist=200;let pulse=-1;const g=cv(host,500,180);const c=ctrl(host);
 slider(c,'到障礙距離(m)',50,340,dist,10,v=>dist=v);
 const btn=el('<button style="cursor:pointer;background:'+C.y+';color:#16241c;border:none;border-radius:8px;padding:5px 14px;font-weight:700">發聲 🔊</button>');c.appendChild(btn);btn.onclick=()=>pulse=0;
 const ro=readout(host);
 (function loop(){g.clearRect(0,0,500,180);const wx=460;
  g.fillStyle=C.chalk;g.font='22px sans-serif';g.fillText('🧍',20,95);g.fillStyle='#888';g.fillRect(wx,40,12,100);g.fillStyle=C.chalk;g.font='12px sans-serif';g.fillText('障礙',wx-6,32);
  const span=wx-46;if(pulse>=0){pulse+=0.012;let x;if(pulse<=1)x=46+span*pulse;else if(pulse<=2)x=wx-span*(pulse-1);else pulse=-1;if(pulse>=0){g.strokeStyle=C.b;g.lineWidth=2;g.beginPath();g.arc(x,90,12,0,7);g.stroke();}}
  const tt=(2*dist/340);ro.innerHTML='聲速340m/s　來回時間 t = 2d÷v = 2×'+dist+'÷340 = <b style="color:'+C.y+'">'+tt.toFixed(2)+' 秒</b>　→ 由回聲時間可反推距離 d=vt÷2';
  requestAnimationFrame(loop);})();};

// 摩擦力
S.friction=function(host){let F=0;const maxs=8;const g=cv(host,460,180);const c=ctrl(host);
 slider(c,'施力 F(N)',0,16,F,1,v=>F=v);const ro=readout(host);let x=60,vx=0;
 (function loop(){g.clearRect(0,0,460,180);g.strokeStyle='rgba(244,241,232,.3)';g.beginPath();g.moveTo(0,130);g.lineTo(460,130);g.stroke();
  let fric,moving;if(F<=maxs){fric=F;moving=false;vx=0;}else{fric=maxs*0.7;moving=true;vx+=(F-fric)/4*0.02;x+=vx;}if(x>400){x=60;vx=0;}
  g.fillStyle=C.g;g.fillRect(x,95,50,35);
  if(F>0){g.strokeStyle=C.b;g.lineWidth=3;g.beginPath();g.moveTo(x+50,112);g.lineTo(x+50+F*4,112);g.stroke();g.fillStyle=C.b;g.fillText('F',x+52+F*4,108);}
  g.strokeStyle=C.r;g.lineWidth=3;g.beginPath();g.moveTo(x,120);g.lineTo(x-fric*4,120);g.stroke();g.fillStyle=C.r;g.font='12px sans-serif';g.fillText('摩擦',x-fric*4-28,124);
  ro.innerHTML=moving?'<b style="color:'+C.g+'">物體滑動</b>：F 超過最大靜摩擦，開始移動（動摩擦）':'<b style="color:'+C.r+'">靜止</b>：F≤最大靜摩擦，靜摩擦力=施力，合力為零';
  requestAnimationFrame(loop);})();};

// 金屬活性置換
S.activity=function(host){const rank={'鎂':4,'鋅':3,'鐵':2,'銅':1};let metal='鐵';const g=cv(host,320,240);const c=ctrl(host);
 const w=el('<label style="font-size:13px;color:'+C.b+'">放入硫酸銅溶液的金屬：<select style="font-size:14px"><option>鎂</option><option>鋅</option><option selected>鐵</option><option>銅</option></select></label>');w.querySelector('select').onchange=e=>metal=e.target.value;c.appendChild(w);
 const ro=readout(host);let t=0;
 (function loop(){t+=0.03;g.clearRect(0,0,320,240);const react=rank[metal]>rank['銅'];
  g.fillStyle='rgba(100,150,220,.25)';g.fillRect(100,70,120,150);g.strokeStyle=C.chalk;g.strokeRect(100,70,120,150);g.fillStyle=C.chalk;g.font='12px sans-serif';g.fillText('硫酸銅溶液',108,64);
  g.fillStyle='#bbb';g.fillRect(150,90,20,90);g.fillStyle=C.chalk;g.fillText(metal+'片',150,205);
  if(react){for(let k=0;k<8;k++){const yy=(t*30+k*12)%90;g.fillStyle='#c87137';g.fillRect(150+(k%2?14:2),90+yy,6,6);}}
  ro.innerHTML=react?'<b style="color:'+C.g+'">會置換</b>：'+metal+'活性大於銅，'+metal+'溶解、表面析出紅色銅':'<b style="color:'+C.r+'">不反應</b>：銅活性最小，無法置換溶液中的銅';
  requestAnimationFrame(loop);})();};

// 壓力 P=F/A
S.pressure=function(host){let F=40,A=4;const g=cv(host,360,220);const c=ctrl(host);
 slider(c,'力 F(N)',10,100,F,10,v=>F=v);slider(c,'接觸面積 A(m²)',1,10,A,1,v=>A=v);const ro=readout(host);
 (function loop(){g.clearRect(0,0,360,220);const P=F/A;const depth=Math.min(60,P*3);
  g.fillStyle='rgba(200,180,140,.4)';g.fillRect(0,150+depth,360,70);g.strokeStyle=C.chalk;g.beginPath();g.moveTo(0,150+depth);g.lineTo(360,150+depth);g.stroke();
  const w=20+A*14;g.fillStyle=C.g;g.fillRect(180-w/2,150+depth-40,w,40);
  g.strokeStyle=C.b;g.lineWidth=3;g.beginPath();g.moveTo(180,150+depth-40);g.lineTo(180,150+depth-40-F*0.6);g.stroke();
  ro.innerHTML='壓力 P = F÷A = '+F+'÷'+A+' = <b style="color:'+C.y+'">'+P.toFixed(1)+' Pa</b>　（面積越小壓力越大，陷越深）';
  requestAnimationFrame(loop);})();};

// 加熱曲線與物態變化
S.heatcurve=function(host){const g=cv(host,500,240);const c=ctrl(host);const ro=readout(host);let t=0;
 (function loop(){t+=0.006;if(t>1)t=0;g.clearRect(0,0,500,240);
  g.strokeStyle='rgba(244,241,232,.3)';g.beginPath();g.moveTo(50,210);g.lineTo(480,210);g.moveTo(50,210);g.lineTo(50,20);g.stroke();
  g.fillStyle=C.b;g.font='12px sans-serif';g.fillText('溫度',10,30);g.fillText('加熱時間',400,228);
  function T(x){if(x<0.15)return 20+x/0.15*(-0+ (0-20));if(x<0.3)return 0;if(x<0.6)return 0+(x-0.3)/0.3*100;if(x<0.8)return 100;return 100+(x-0.8)/0.2*20;}
  g.strokeStyle=C.y;g.lineWidth=2;g.beginPath();for(let x=0;x<=1;x+=0.01){g.lineTo(50+x*430,210-T(x)*1.4);}g.stroke();
  const cx=50+t*430,cy=210-T(t)*1.4;g.fillStyle=C.r;g.beginPath();g.arc(cx,cy,5,0,7);g.fill();
  let st;if(t<0.15)st='固態升溫';else if(t<0.3)st='熔化(溫度不變·吸潛熱)';else if(t<0.6)st='液態升溫';else if(t<0.8)st='沸騰(溫度不變·吸潛熱)';else st='氣態升溫';
  ro.innerHTML='冰→水→水蒸氣加熱曲線　目前：<b style="color:'+C.y+'">'+st+'</b>　（平段=物態變化，溫度不變）';
  requestAnimationFrame(loop);})();};

// 作用反作用（火箭）
S.newton=function(host){let fire=false;const g=cv(host,300,260);const c=ctrl(host);
 const btn=el('<button style="cursor:pointer;background:'+C.y+';color:#16241c;border:none;border-radius:8px;padding:6px 16px;font-weight:700">噴氣 🚀</button>');c.appendChild(btn);btn.onclick=()=>fire=!fire;
 const ro=readout(host);let y=200,vy=0;
 (function loop(){g.clearRect(0,0,300,260);if(fire){vy-=0.06;}else{vy+=0.04;}y+=vy;if(y>200){y=200;vy=0;}if(y<20){y=20;vy=0;}
  g.fillStyle=C.g;g.beginPath();g.moveTo(150,y);g.lineTo(165,y+40);g.lineTo(135,y+40);g.fill();
  if(fire){g.strokeStyle=C.b;g.lineWidth=3;g.beginPath();g.moveTo(150,y+40);g.lineTo(150,y+80);g.stroke();g.fillStyle=C.b;g.fillText('▼氣體向下',110,y+95);
   g.strokeStyle=C.r;g.beginPath();g.moveTo(150,y);g.lineTo(150,y-30);g.stroke();g.fillStyle=C.r;g.fillText('▲火箭向上',110,y-36);}
  ro.innerHTML=fire?'<b style="color:'+C.y+'">作用力與反作用力</b>：火箭噴氣(向下)，氣體同時推火箭(向上)':'按「噴氣」：火箭向下噴氣、氣體向上推火箭（牛頓第三定律）';
  requestAnimationFrame(loop);})();};

// 力學能守恆（雲霄飛車）
S.energy=function(host){let h0=1;const g=cv(host,480,240);const c=ctrl(host);
 slider(c,'起始高度',0.5,1,h0,0.1,v=>h0=v);const ro=readout(host);let x=0,dir=1;
 (function loop(){x+=0.006*dir;if(x>1){x=1;dir=-1;}if(x<0){x=0;dir=1;}g.clearRect(0,0,480,240);
  function track(u){return 200-Math.abs(Math.cos(u*Math.PI))*130*h0;}
  g.strokeStyle='rgba(244,241,232,.5)';g.lineWidth=3;g.beginPath();for(let u=0;u<=1;u+=0.01){g.lineTo(40+u*400,track(u));}g.stroke();
  const cx=40+x*400,cy=track(x);g.fillStyle=C.r;g.beginPath();g.arc(cx,cy,8,0,7);g.fill();
  const H=(200-cy)/(130*h0);const PE=Math.max(0,H),KE=1-PE;
  g.fillStyle=C.b;g.fillRect(30,20,PE*120,14);g.fillStyle=C.chalk;g.font='12px sans-serif';g.fillText('位能',30,16);
  g.fillStyle=C.y;g.fillRect(30,50,KE*120,14);g.fillStyle=C.chalk;g.fillText('動能',30,46);
  ro.innerHTML='不計摩擦：位能+動能=<b style="color:'+C.g+'">定值(守恆)</b>　高處位能大、低處動能大（互相轉換）';
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
