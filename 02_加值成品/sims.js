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

// 質量守恆定律（天平）
S.conserve=function(host){let closed=true;const g=cv(host,420,220);const c=ctrl(host);
 [['密閉系統',true],['開放系統',false]].forEach(([lab,v])=>{const b=el('<button style="cursor:pointer;background:'+(v===closed?C.y:'none')+';color:'+(v===closed?'#16241c':C.b)+';border:1px solid rgba(159,200,216,.4);border-radius:8px;padding:5px 14px;font-weight:700">'+lab+'</button>');b.onclick=function(){closed=v;Array.prototype.forEach.call(c.querySelectorAll('button'),function(x){x.style.background='none';x.style.color=C.b;});b.style.background=C.y;b.style.color='#16241c';};c.appendChild(b);});
 const ro=readout(host);let t=0;
 (function loop(){t+=0.02;g.clearRect(0,0,420,220);const reacted=(t%4)>2;const tilt=(reacted&&!closed)?-0.13:0;
  const px=210,py=70;g.strokeStyle=C.chalk;g.lineWidth=3;g.beginPath();g.moveTo(px,py);g.lineTo(px,180);g.stroke();
  g.save();g.translate(px,py);g.rotate(tilt);g.beginPath();g.moveTo(-110,0);g.lineTo(110,0);g.stroke();
  g.fillStyle='rgba(159,200,216,.3)';g.fillRect(-130,-2,40,30);g.fillRect(90,-2,40,30);
  g.fillStyle=reacted?C.r:C.b;g.font='20px sans-serif';g.fillText('⚗',-118,20);g.fillStyle=C.chalk;g.font='16px sans-serif';g.fillText('◼',100,20);g.restore();
  g.fillStyle=C.chalk;g.font='13px sans-serif';g.fillText('反應瓶',150,205);g.fillText('砝碼',300,205);
  ro.innerHTML=closed?'<b style="color:'+C.g+'">密閉：質量守恆</b>　反應前後總質量相等，天平維持平衡':(reacted?'<b style="color:'+C.r+'">開放：氣體逸出→變輕</b>　質量並未消失，只是跑到空氣中':'反應進行中…');
  requestAnimationFrame(loop);})();};

// 牛頓第一定律（慣性）
S.inertia=function(host){let fric=false,v=0,x=40;const g=cv(host,440,150);const c=ctrl(host);
 const bf=el('<button style="cursor:pointer;background:none;color:'+C.b+';border:1px solid rgba(159,200,216,.4);border-radius:8px;padding:5px 14px;font-weight:700">切換：無摩擦</button>');bf.onclick=function(){fric=!fric;bf.textContent='切換：'+(fric?'有摩擦':'無摩擦');};c.appendChild(bf);
 const bp=el('<button style="cursor:pointer;background:'+C.y+';color:#16241c;border:none;border-radius:8px;padding:5px 14px;font-weight:700">推一下</button>');bp.onclick=function(){v=3.2;};c.appendChild(bp);
 const ro=readout(host);
 (function loop(){g.clearRect(0,0,440,150);g.strokeStyle='rgba(244,241,232,.3)';g.beginPath();g.moveTo(0,110);g.lineTo(440,110);g.stroke();
  if(fric)v*=0.985;x+=v;if(x>380){x=380;v=0;}g.fillStyle=C.g;g.fillRect(x,80,44,30);
  if(v>0.05){g.strokeStyle=C.b;g.lineWidth=3;g.beginPath();g.moveTo(x+44,95);g.lineTo(x+44+v*8,95);g.stroke();}
  ro.innerHTML=v>0.05?(fric?'<b style="color:'+C.r+'">有摩擦</b>：受外力(摩擦)漸慢最終停止':'<b style="color:'+C.g+'">無摩擦</b>：不受外力→等速直線前進（慣性）'):'靜者恆靜——按「推一下」給初速觀察慣性';
  requestAnimationFrame(loop);})();};

// 功與功率
S.work=function(host){let F=30,s=6,t=4;const g=cv(host,440,140);const c=ctrl(host);
 slider(c,'施力 F(N)',10,60,F,5,v=>F=v);slider(c,'距離 s(m)',1,10,s,1,v=>s=v);slider(c,'時間 t(s)',1,10,t,1,v=>t=v);
 const ro=readout(host);let px=0;
 (function loop(){px+=0.008;if(px>1)px=0;g.clearRect(0,0,440,140);g.strokeStyle='rgba(244,241,232,.3)';g.beginPath();g.moveTo(0,100);g.lineTo(440,100);g.stroke();
  const x=40+px*(s/10)*320;g.fillStyle=C.g;g.fillRect(x,70,40,30);g.strokeStyle=C.b;g.lineWidth=3;g.beginPath();g.moveTo(x+40,85);g.lineTo(x+40+F*0.7,85);g.stroke();g.fillStyle=C.b;g.font='12px sans-serif';g.fillText('F',x+44+F*0.7,82);
  const W=F*s,P=(W/t);ro.innerHTML='功 W = F×s = '+F+'×'+s+' = <b style="color:'+C.y+'">'+W+' J</b>　｜　功率 P = W÷t = <b style="color:'+C.g+'">'+P.toFixed(1)+' W</b>';
  requestAnimationFrame(loop);})();};

// 合力（同向/反向）
S.force=function(host){let F1=6,F2=4,same=true;const g=cv(host,440,170);const c=ctrl(host);
 slider(c,'力 F1(N)',1,10,F1,1,v=>F1=v);slider(c,'力 F2(N)',1,10,F2,1,v=>F2=v);
 const b=el('<button style="cursor:pointer;background:'+C.y+';color:#16241c;border:none;border-radius:8px;padding:5px 14px;font-weight:700">同向</button>');b.onclick=function(){same=!same;b.textContent=same?'同向':'反向';};c.appendChild(b);
 const ro=readout(host);
 (function loop(){g.clearRect(0,0,440,170);const cx=220,cy=60;g.fillStyle=C.g;g.fillRect(cx-15,cy-12,30,24);
  g.strokeStyle=C.b;g.lineWidth=4;g.beginPath();g.moveTo(cx+15,cy);g.lineTo(cx+15+F1*14,cy);g.stroke();g.fillStyle=C.b;g.fillText('F1',cx+18+F1*14,cy-4);
  const dir=same?1:-1;g.strokeStyle=C.r;g.beginPath();if(same){g.moveTo(cx+15+F1*14,cy);g.lineTo(cx+15+F1*14+F2*14,cy);}else{g.moveTo(cx-15,cy);g.lineTo(cx-15-F2*14,cy);}g.stroke();g.fillStyle=C.r;g.fillText('F2',same?cx+18+(F1+F2)*14:cx-30-F2*14,cy-4);
  const R=same?F1+F2:Math.abs(F1-F2);g.strokeStyle=C.y;g.lineWidth=5;g.beginPath();g.moveTo(cx,120);const rd=same?1:(F1>=F2?1:-1);g.lineTo(cx+R*14*rd,120);g.stroke();g.fillStyle=C.y;g.fillText('合力',cx+R*14*rd+ (rd>0?4:-40),116);
  ro.innerHTML='合力 = '+(same?F1+'+'+F2:'|'+F1+'−'+F2+'|')+' = <b style="color:'+C.y+'">'+R+' N</b>　'+(same?'（同向相加）':'（反向相減，方向偏向較大者）');
  requestAnimationFrame(loop);})();};

// 靜電（同性相斥/異性相吸）
S.static=function(host){let q1=1,q2=-1;const g=cv(host,440,170);const c=ctrl(host);
 const b1=el('<button style="cursor:pointer;background:'+C.r+';color:#16241c;border:none;border-radius:8px;padding:5px 14px;font-weight:700">左：＋</button>');b1.onclick=function(){q1=-q1;b1.textContent='左：'+(q1>0?'＋':'－');b1.style.background=q1>0?C.r:C.b;};c.appendChild(b1);
 const b2=el('<button style="cursor:pointer;background:'+C.b+';color:#16241c;border:none;border-radius:8px;padding:5px 14px;font-weight:700">右：－</button>');b2.onclick=function(){q2=-q2;b2.textContent='右：'+(q2>0?'＋':'－');b2.style.background=q2>0?C.r:C.b;};c.appendChild(b2);
 const ro=readout(host);let d=0;
 (function loop(){const attract=q1*q2<0;d+=(attract?-0.6:0.6);if(d>60)d=60;if(d<-40)d=-40;g.clearRect(0,0,440,170);
  const lx=180-d,rx=260+d,cy=85;g.fillStyle=q1>0?C.r:C.b;g.beginPath();g.arc(lx,cy,22,0,7);g.fill();g.fillStyle=q2>0?C.r:C.b;g.beginPath();g.arc(rx,cy,22,0,7);g.fill();
  g.fillStyle='#16241c';g.font='20px sans-serif';g.fillText(q1>0?'＋':'－',lx-8,cy+7);g.fillText(q2>0?'＋':'－',rx-8,cy+7);
  ro.innerHTML=attract?'<b style="color:'+C.g+'">異性電相吸</b>：一正一負，互相靠近':'<b style="color:'+C.r+'">同性電相斥</b>：同號電荷，互相遠離';
  requestAnimationFrame(loop);})();};

// 板塊運動
S.plate=function(host){let mode='張裂';const g=cv(host,440,200);const c=ctrl(host);
 ['張裂','聚合','錯動'].forEach(m=>{const b=el('<button style="cursor:pointer;background:'+(m==='張裂'?C.y:'none')+';color:'+(m==='張裂'?'#16241c':C.b)+';border:1px solid rgba(159,200,216,.4);border-radius:8px;padding:5px 14px;font-weight:700">'+m+'</button>');b.onclick=function(){mode=m;Array.prototype.forEach.call(c.querySelectorAll('button'),function(x){x.style.background='none';x.style.color=C.b;});b.style.background=C.y;b.style.color='#16241c';};c.appendChild(b);});
 const ro=readout(host);let t=0;
 (function loop(){t+=0.02;g.clearRect(0,0,440,200);const o=Math.sin(t)*14+14;g.font='13px sans-serif';
  if(mode==='張裂'){g.fillStyle='#8a6d3b';g.fillRect(30,90,160-o,70);g.fillRect(250+o,90,160,70);g.fillStyle=C.r;g.fillRect(190-o,110,120+2*o,50);g.fillStyle=C.chalk;g.fillText('板塊張裂→岩漿湧升成中洋脊/裂谷',70,80);}
  else if(mode==='聚合'){g.fillStyle='#8a6d3b';g.fillRect(30,90,180+o,70);g.fillRect(230-o,90,180,70);g.fillStyle='#a98';g.beginPath();g.moveTo(190,90);g.lineTo(220,50-o);g.lineTo(250,90);g.fill();g.fillStyle=C.chalk;g.fillText('板塊聚合→擠壓隆起成山脈/海溝、地震',70,40);}
  else{g.fillStyle='#8a6d3b';g.fillRect(30,80+o/2,190,45);g.fillRect(220,120-o/2,190,45);g.strokeStyle=C.r;g.lineWidth=3;g.beginPath();g.moveTo(220,60);g.lineTo(220,180);g.stroke();g.fillStyle=C.chalk;g.fillText('板塊錯動→沿斷層水平滑動，易引發地震',70,45);}
  ro.innerHTML='板塊邊界：<b style="color:'+C.y+'">'+mode+'</b>　（張裂=分開｜聚合=相撞｜錯動=擦身）';
  requestAnimationFrame(loop);})();};

// 掠食者與獵物數量波動
S.predprey=function(host){const g=cv(host,460,200);const c=ctrl(host);const ro=readout(host);let t=0;
 (function loop(){t+=0.015;g.clearRect(0,0,460,200);g.strokeStyle='rgba(244,241,232,.25)';g.beginPath();g.moveTo(40,180);g.lineTo(450,180);g.moveTo(40,10);g.lineTo(40,180);g.stroke();
  g.strokeStyle=C.g;g.lineWidth=2;g.beginPath();for(let x=0;x<=410;x+=3){g.lineTo(40+x,100-Math.sin((x/60)+t)*60);}g.stroke();
  g.strokeStyle=C.r;g.beginPath();for(let x=0;x<=410;x+=3){g.lineTo(40+x,100-Math.sin((x/60)+t-0.9)*45);}g.stroke();
  g.font='12px sans-serif';g.fillStyle=C.g;g.fillText('獵物(兔)',350,30);g.fillStyle=C.r;g.fillText('掠食者(狐)',350,48);
  ro.innerHTML='獵物增多→掠食者跟著增多→獵物被吃變少→掠食者也減少　<b style="color:'+C.y+'">週期性波動、彼此制衡</b>';
  requestAnimationFrame(loop);})();};

// 水循環
S.watercycle=function(host){const g=cv(host,460,240);const c=ctrl(host);const ro=readout(host);let t=0;
 (function loop(){t+=0.02;g.clearRect(0,0,460,240);
  g.fillStyle='rgba(100,150,220,.4)';g.fillRect(0,190,460,50);g.fillStyle=C.y;g.beginPath();g.arc(70,45,20,0,7);g.fill();
  g.fillStyle='rgba(220,220,230,.5)';g.beginPath();g.arc(300,55,26,0,7);g.arc(330,55,22,0,7);g.arc(270,58,20,0,7);g.fill();
  g.strokeStyle=C.b;g.lineWidth=2;for(let k=0;k<3;k++){const yy=(t*30+k*30)%110;g.globalAlpha=1-yy/110;g.beginPath();g.moveTo(150+k*15,185-yy);g.lineTo(153+k*15,178-yy);g.lineTo(147+k*15,178-yy);g.fill?g.fillStyle=C.b:0;g.stroke();}g.globalAlpha=1;
  g.fillStyle=C.b;for(let k=0;k<4;k++){const yy=(t*40+k*22)%110;g.beginPath();g.arc(300+ (k-1.5)*12,90+yy,3,0,7);g.fill();}
  g.fillStyle=C.chalk;g.font='12px sans-serif';g.fillText('☀ 太陽',40,80);g.fillText('蒸發↑',120,140);g.fillText('☁ 凝結成雲',255,30);g.fillText('降水↓',285,150);g.fillText('海洋/河川',180,225);
  ro.innerHTML='<b style="color:'+C.y+'">水循環</b>：海水受熱<b>蒸發</b>→水氣上升<b>凝結</b>成雲→<b>降水</b>回到地面→逕流入海（能量來自太陽）';
  requestAnimationFrame(loop);})();};

// 熱量與比熱 Q=mcΔT
S.heatcap=function(host){const mat={'水':1.0,'沙':0.2,'鐵':0.11};let m='水',Q=200;const g=cv(host,360,220);const c=ctrl(host);
 const w=el('<label style="font-size:13px;color:'+C.b+'">物質(相同質量)：<select style="font-size:14px"><option>水</option><option>沙</option><option>鐵</option></select></label>');w.querySelector('select').onchange=e=>m=e.target.value;c.appendChild(w);
 slider(c,'加熱量 Q(卡)',50,400,Q,50,v=>Q=v);const ro=readout(host);
 (function loop(){g.clearRect(0,0,360,220);const dT=Q/(100*mat[m]);const lvl=Math.min(160,dT*8);
  g.strokeStyle=C.chalk;g.lineWidth=2;g.strokeRect(150,30,26,170);g.beginPath();g.arc(163,205,16,0,7);g.stroke();
  g.fillStyle=C.r;g.beginPath();g.arc(163,205,13,0,7);g.fill();g.fillRect(157,200-lvl,12,lvl+5);
  g.fillStyle=C.chalk;g.font='13px sans-serif';g.fillText(m+'（比熱 '+mat[m]+'）',60,25);
  ro.innerHTML='ΔT = Q ÷ (m×c)　→ 升溫 <b style="color:'+C.y+'">'+dT.toFixed(1)+' ℃</b>　（比熱越大越難升溫，如水）';
  requestAnimationFrame(loop);})();};

// 萬有引力與重力
S.gravity=function(host){let r=5;const g=cv(host,440,180);const c=ctrl(host);
 slider(c,'距離 r(相對)',2,10,r,1,v=>r=v);const ro=readout(host);
 (function loop(){g.clearRect(0,0,440,180);const cy=90,x1=70,x2=70+r*34;
  g.fillStyle=C.b;g.beginPath();g.arc(x1,cy,26,0,7);g.fill();g.fillStyle=C.g;g.beginPath();g.arc(x2,cy,14,0,7);g.fill();
  const F=100/(r*r);const L=F*3;g.strokeStyle=C.r;g.lineWidth=3;g.beginPath();g.moveTo(x2-14,cy);g.lineTo(x2-14-L,cy);g.stroke();g.beginPath();g.moveTo(x1+26,cy);g.lineTo(x1+26+L,cy);g.stroke();
  g.fillStyle=C.chalk;g.font='13px sans-serif';g.fillText('引力 ∝ 1/r²',150,30);
  ro.innerHTML='萬有引力 F ∝ (m₁×m₂)÷r²　目前相對引力 <b style="color:'+C.y+'">'+F.toFixed(1)+'</b>　（距離變2倍→引力變 1/4）';
  requestAnimationFrame(loop);})();};

// 地震波（P波/S波）
S.seismic=function(host){const g=cv(host,440,220);const c=ctrl(host);const ro=readout(host);let t=0;
 const b=el('<button style="cursor:pointer;background:'+C.y+';color:#16241c;border:none;border-radius:8px;padding:5px 14px;font-weight:700">發生地震</button>');b.onclick=function(){t=0.001;};c.appendChild(b);
 (function loop(){g.clearRect(0,0,440,220);g.fillStyle='rgba(120,90,60,.4)';g.fillRect(0,120,440,100);
  const ex=140,ey=120;g.fillStyle=C.r;g.beginPath();g.arc(ex,ey,6,0,7);g.fill();g.fillStyle=C.chalk;g.font='12px sans-serif';g.fillText('震源',ex-14,ey-10);g.fillText('觀測站 🏠',330,112);
  if(t>0){t+=0.02;const p=t*120,s=t*72;g.strokeStyle=C.b;g.lineWidth=2;g.beginPath();g.arc(ex,ey,p,0,Math.PI,true);g.stroke();g.strokeStyle=C.r;g.beginPath();g.arc(ex,ey,s,0,Math.PI,true);g.stroke();if(p>300)t=0;}
  g.fillStyle=C.b;g.fillText('P波(快·先到)',20,30);g.fillStyle=C.r;g.fillText('S波(慢·後到)',20,48);
  ro.innerHTML='地震波：<b style="color:'+C.b+'">P波快</b>先抵達、<b style="color:'+C.r+'">S波慢</b>後到，兩者<b style="color:'+C.y+'">到時差</b>越大代表震央越遠';
  requestAnimationFrame(loop);})();};

// 太陽系（行星公轉）
S.solar=function(host){const g=cv(host,320,320);const c=ctrl(host);const ro=readout(host);let t=0;
 const P=[[40,0.9,C.b,'水'],[70,0.62,C.g,'金'],[100,0.45,'#6cf','地'],[135,0.32,C.r,'火']];
 (function loop(){t+=0.01;g.clearRect(0,0,320,320);const cx=160,cy=160;
  g.strokeStyle='rgba(244,241,232,.15)';P.forEach(p=>{g.beginPath();g.arc(cx,cy,p[0],0,7);g.stroke();});
  g.fillStyle=C.y;g.beginPath();g.arc(cx,cy,16,0,7);g.fill();
  P.forEach(p=>{const a=t*p[1];const x=cx+Math.cos(a)*p[0],y=cy+Math.sin(a)*p[0];g.fillStyle=p[2];g.beginPath();g.arc(x,y,6,0,7);g.fill();});
  ro.innerHTML='行星繞太陽公轉：<b style="color:'+C.y+'">越靠內側公轉越快</b>（克卜勒定律），軌道近圓形';
  requestAnimationFrame(loop);})();};

// 生態系能量金字塔（10% 法則）
S.energyflow=function(host){const g=cv(host,420,240);const c=ctrl(host);const ro=readout(host);
 const lv=[['生產者',1000,C.g],['初級消費者',100,C.b],['次級消費者',10,C.y],['高級消費者',1,C.r]];
 (function loop(){g.clearRect(0,0,420,240);g.font='13px sans-serif';
  lv.forEach((L,i)=>{const w=40+Math.log10(L[1]+1)*90;const y=40+i*48;g.fillStyle=L[2];g.fillRect(210-w/2,y,w,38);g.fillStyle='#16241c';g.fillText(L[0]+'  '+L[1]+' 單位',210-w/2+6,y+23);});
  ro.innerHTML='能量沿食物鏈流動，每層約只有 <b style="color:'+C.y+'">10%</b> 傳到上一層 → 營養階層越高能量越少、層數有限';
  requestAnimationFrame(loop);})();};

// 酵素活性（溫度）
S.enzyme=function(host){let T=37;const g=cv(host,420,200);const c=ctrl(host);
 slider(c,'溫度(℃)',0,80,T,5,v=>T=v);const ro=readout(host);
 (function loop(){g.clearRect(0,0,420,200);g.strokeStyle='rgba(244,241,232,.25)';g.beginPath();g.moveTo(40,170);g.lineTo(410,170);g.moveTo(40,170);g.lineTo(40,20);g.stroke();
  g.strokeStyle=C.g;g.lineWidth=2;g.beginPath();for(let x=0;x<=360;x+=4){const tt=x/360*80;const act=Math.exp(-Math.pow((tt-37)/16,2));g.lineTo(40+x,170-act*130);}g.stroke();
  const act=Math.exp(-Math.pow((T-37)/16,2));const mx=40+T/80*360;g.fillStyle=C.r;g.beginPath();g.arc(mx,170-act*130,6,0,7);g.fill();
  g.fillStyle=C.chalk;g.font='12px sans-serif';g.fillText('活性',12,30);g.fillText('溫度→',360,188);
  let st=T<30?'偏低：分子運動慢，活性低':(T<=42?'接近最適溫(約37℃)，活性最高':'過高：酵素變性失去活性');
  ro.innerHTML='酵素活性 <b style="color:'+C.y+'">'+(act*100).toFixed(0)+'%</b>　'+st+'（且具受質專一性）';
  requestAnimationFrame(loop);})();};

// 光的反射（入射角=反射角）
S.reflect=function(host){let ang=45;const g=cv(host,360,240);const c=ctrl(host);
 slider(c,'入射角(°)',0,80,ang,5,v=>ang=v);const ro=readout(host);
 (function loop(){g.clearRect(0,0,360,240);const mx=180,my=190,len=150,rad=ang*Math.PI/180;
  g.strokeStyle='#aaa';g.lineWidth=4;g.beginPath();g.moveTo(30,my);g.lineTo(330,my);g.stroke();
  g.strokeStyle='rgba(244,241,232,.5)';g.lineWidth=1;g.setLineDash([5,5]);g.beginPath();g.moveTo(mx,my);g.lineTo(mx,40);g.stroke();g.setLineDash([]);
  g.strokeStyle=C.b;g.lineWidth=3;g.beginPath();g.moveTo(mx-Math.sin(rad)*len,my-Math.cos(rad)*len);g.lineTo(mx,my);g.stroke();
  g.strokeStyle=C.y;g.beginPath();g.moveTo(mx,my);g.lineTo(mx+Math.sin(rad)*len,my-Math.cos(rad)*len);g.stroke();
  g.fillStyle=C.b;g.font='12px sans-serif';g.fillText('入射光',mx-Math.sin(rad)*len-10,my-Math.cos(rad)*len-6);g.fillStyle=C.y;g.fillText('反射光',mx+Math.sin(rad)*len-10,my-Math.cos(rad)*len-6);g.fillStyle=C.chalk;g.fillText('法線',mx+4,55);
  ro.innerHTML='反射定律：<b style="color:'+C.y+'">入射角 = 反射角 = '+ang+'°</b>（皆從法線量起，且入射線、反射線、法線共平面）';
  requestAnimationFrame(loop);})();};

// 色光的混合（加法混色）
S.color=function(host){const on={R:true,G:true,B:true};const g=cv(host,300,240);const c=ctrl(host);
 [['R','紅',C.r],['G','綠',C.g],['B','藍',C.b]].forEach(([k,lab,col])=>{const b=el('<button style="cursor:pointer;background:'+col+';color:#16241c;border:none;border-radius:8px;padding:5px 14px;font-weight:700">'+lab+'光 ✓</button>');b.onclick=function(){on[k]=!on[k];b.style.opacity=on[k]?'1':'0.35';b.textContent=lab+'光 '+(on[k]?'✓':'✕');};c.appendChild(b);});
 const ro=readout(host);
 (function loop(){g.clearRect(0,0,300,240);g.save();g.globalCompositeOperation='lighter';
  if(on.R){g.fillStyle='rgb(230,40,40)';g.beginPath();g.arc(150,95,60,0,7);g.fill();}
  if(on.G){g.fillStyle='rgb(40,200,40)';g.beginPath();g.arc(120,150,60,0,7);g.fill();}
  if(on.B){g.fillStyle='rgb(40,80,230)';g.beginPath();g.arc(180,150,60,0,7);g.fill();}
  g.restore();
  const s=(on.R?'R':'')+(on.G?'G':'')+(on.B?'B':'');const nm={'RGB':'白光','RG':'黃','RB':'洋紅','GB':'青','R':'紅','G':'綠','B':'藍','':'黑(無光)'}[s];
  ro.innerHTML='光的三原色相加：目前 = <b style="color:'+C.y+'">'+nm+'</b>　（紅+綠=黃、紅+藍=洋紅、綠+藍=青、三色齊=白）';
  requestAnimationFrame(loop);})();};

// 電解質與導電性
S.electrolyte=function(host){const kind={'強電解質(食鹽水)':12,'弱電解質(醋酸)':4,'非電解質(糖水)':0};let k='強電解質(食鹽水)';const g=cv(host,360,220);const c=ctrl(host);
 const w=el('<label style="font-size:13px;color:'+C.b+'">溶液：<select style="font-size:14px"><option>強電解質(食鹽水)</option><option>弱電解質(醋酸)</option><option>非電解質(糖水)</option></select></label>');w.querySelector('select').onchange=e=>k=e.target.value;c.appendChild(w);
 const ro=readout(host);const ions=[];for(let i=0;i<12;i++)ions.push({x:120+Math.random()*160,y:110+Math.random()*90,vx:(Math.random()-.5)*2,vy:(Math.random()-.5)*2,pos:i%2===0});
 (function loop(){g.clearRect(0,0,360,220);const n=kind[k];
  g.fillStyle='rgba(100,150,220,.2)';g.fillRect(110,90,180,110);g.strokeStyle=C.chalk;g.strokeRect(110,90,180,110);
  g.fillStyle='#888';g.fillRect(120,60,14,40);g.fillRect(266,60,14,40);
  const bright=n/12;g.fillStyle='rgba(240,216,120,'+(0.15+bright*0.85)+')';g.beginPath();g.arc(200,45,18,0,7);g.fill();g.strokeStyle=C.chalk;g.stroke();
  for(let i=0;i<n;i++){const p=ions[i];p.x+=p.vx;p.y+=p.vy;if(p.x<118||p.x>282)p.vx*=-1;if(p.y<98||p.y>192)p.vy*=-1;g.fillStyle=p.pos?C.r:C.b;g.beginPath();g.arc(p.x,p.y,5,0,7);g.fill();}
  ro.innerHTML=n>0?'<b style="color:'+C.y+'">會導電</b>：溶液中有自由移動的<b>離子</b>('+(k[0]==='強'?'完全解離、離子多、燈亮':'部分解離、離子少、燈暗')+')':'<b style="color:'+C.r+'">不導電</b>：糖水以分子存在，無離子，燈不亮';
  requestAnimationFrame(loop);})();};

// 可逆反應與化學平衡
S.equilibrium=function(host){let t=0;const g=cv(host,440,200);const c=ctrl(host);
 const b=el('<button style="cursor:pointer;background:'+C.y+';color:#16241c;border:none;border-radius:8px;padding:5px 14px;font-weight:700">重新開始</button>');b.onclick=function(){t=0;};c.appendChild(b);
 const ro=readout(host);
 (function loop(){t+=0.015;const e=1-Math.exp(-t*1.2);g.clearRect(0,0,440,200);
  g.strokeStyle='rgba(244,241,232,.25)';g.beginPath();g.moveTo(40,170);g.lineTo(430,170);g.moveTo(40,170);g.lineTo(40,15);g.stroke();
  const A=1-0.6*e,B=0.6*e;g.strokeStyle=C.b;g.lineWidth=2;g.beginPath();for(let x=0;x<=380;x+=3){const ee=1-Math.exp(-(t*x/380)*1.2);g.lineTo(40+x,170-(1-0.6*ee)*140);}g.stroke();
  g.strokeStyle=C.g;g.beginPath();for(let x=0;x<=380;x+=3){const ee=1-Math.exp(-(t*x/380)*1.2);g.lineTo(40+x,170-(0.6*ee)*140);}g.stroke();
  g.font='12px sans-serif';g.fillStyle=C.b;g.fillText('反應物',350,170-A*140-4);g.fillStyle=C.g;g.fillText('生成物',350,170-B*140-4);
  ro.innerHTML=e>0.9?'<b style="color:'+C.y+'">達動態平衡</b>：正反應速率 = 逆反應速率，濃度不再改變(反應仍持續)':'反應進行中：正反應變慢、逆反應變快，逐漸趨向平衡…';
  requestAnimationFrame(loop);})();};

// 血液循環（體循環/肺循環）
S.circulation=function(host){const g=cv(host,360,260);const c=ctrl(host);const ro=readout(host);
 const wp=[[180,130],[180,55],[180,130],[180,215]];let seg=0,p=0;
 (function loop(){p+=0.03;if(p>=1){p=0;seg=(seg+1)%4;}g.clearRect(0,0,360,260);
  g.fillStyle=C.r;g.fillRect(160,110,40,44);g.fillStyle=C.chalk;g.font='12px sans-serif';g.fillText('心臟',165,136);
  g.fillStyle='rgba(159,200,216,.3)';g.beginPath();g.arc(180,45,26,0,7);g.fill();g.fillStyle=C.chalk;g.fillText('肺',172,49);
  g.fillStyle='rgba(168,208,160,.3)';g.fillRect(120,205,120,30);g.fillStyle=C.chalk;g.fillText('全身組織',150,224);
  const a=wp[seg],bb=wp[(seg+1)%4];const x=a[0]+(bb[0]-a[0])*p,y=a[1]+(bb[1]-a[1])*p;const oxy=(seg===0||seg===3);g.fillStyle=oxy?C.r:C.b;g.beginPath();g.arc(x,y,7,0,7);g.fill();
  const txt=['心臟→肺(肺循環)','肺→心臟：含氧血(鮮紅)','心臟→全身(體循環)','全身→心臟：缺氧血(暗紅)'][seg];
  ro.innerHTML='<b style="color:'+C.y+'">'+txt+'</b>　肺循環換氣、體循環送養分；<b style="color:'+C.r+'">紅=含氧血</b>、<b style="color:'+C.b+'">藍=缺氧血</b>';
  requestAnimationFrame(loop);})();};

// 細胞分裂
S.mitosis=function(host){const g=cv(host,360,220);const c=ctrl(host);const ro=readout(host);let t=0;
 (function loop(){t+=0.006;if(t>1)t=0;g.clearRect(0,0,360,220);const cx=180,cy=110;
  function chrom(x,y,col){g.strokeStyle=col;g.lineWidth=4;g.beginPath();g.moveTo(x-6,y-10);g.lineTo(x+6,y+10);g.moveTo(x+6,y-10);g.lineTo(x-6,y+10);g.stroke();}
  let ph;if(t<0.25){ph='間期：染色體複製(DNA加倍)';g.strokeStyle=C.chalk;g.beginPath();g.arc(cx,cy,50,0,7);g.stroke();chrom(cx-15,cy,C.r);chrom(cx+15,cy,C.b);}
  else if(t<0.5){ph='前中期：染色體排列到中央';g.strokeStyle=C.chalk;g.beginPath();g.arc(cx,cy,50,0,7);g.stroke();chrom(cx-18,cy,C.r);chrom(cx-2,cy,C.r);chrom(cx+14,cy,C.b);chrom(cx+30,cy,C.b);}
  else if(t<0.75){ph='後期：姊妹染色分體被拉向兩極';const d=(t-0.5)/0.25*40;g.strokeStyle=C.chalk;g.beginPath();g.ellipse(cx,cy,60,48,0,0,7);g.stroke();chrom(cx-d-10,cy,C.r);chrom(cx-d+6,cy,C.b);chrom(cx+d-6,cy,C.r);chrom(cx+d+10,cy,C.b);}
  else{ph='末期：分裂成兩個子細胞(染色體數相同)';g.strokeStyle=C.chalk;g.beginPath();g.arc(cx-55,cy,42,0,7);g.arc(cx+55,cy,42,0,7);g.stroke();chrom(cx-62,cy,C.r);chrom(cx-48,cy,C.b);chrom(cx+48,cy,C.r);chrom(cx+62,cy,C.b);}
  ro.innerHTML='<b style="color:'+C.y+'">'+ph+'</b>　（體細胞有絲分裂：1 個母細胞→2 個染色體數相同的子細胞）';
  requestAnimationFrame(loop);})();};

// 原子模型（電子殼層）
S.atom=function(host){const conf={'氫 H':[1],'氦 He':[2],'鋰 Li':[2,1],'碳 C':[2,4],'氧 O':[2,6],'鈉 Na':[2,8,1]};let e='碳 C';const g=cv(host,300,260);const c=ctrl(host);
 const w=el('<label style="font-size:13px;color:'+C.b+'">元素：<select style="font-size:14px"><option>氫 H</option><option>氦 He</option><option>鋰 Li</option><option selected>碳 C</option><option>氧 O</option><option>鈉 Na</option></select></label>');w.querySelector('select').onchange=ev=>e=ev.target.value;c.appendChild(w);
 const ro=readout(host);let t=0;
 (function loop(){t+=0.02;g.clearRect(0,0,300,260);const cx=150,cy=125,sh=conf[e];
  g.fillStyle=C.r;g.beginPath();g.arc(cx,cy,16,0,7);g.fill();g.fillStyle='#16241c';g.font='11px sans-serif';g.fillText('核',cx-8,cy+4);
  sh.forEach((cnt,i)=>{const R=38+i*32;g.strokeStyle='rgba(159,200,216,.35)';g.beginPath();g.arc(cx,cy,R,0,7);g.stroke();for(let k=0;k<cnt;k++){const a=t*(1-i*0.2)+k/cnt*Math.PI*2;g.fillStyle=C.y;g.beginPath();g.arc(cx+Math.cos(a)*R,cy+Math.sin(a)*R,5,0,7);g.fill();}});
  ro.innerHTML=e+'：電子分層排列 <b style="color:'+C.y+'">'+sh.join('、')+'</b>　（每層上限 2,8,…；最外層電子數決定化學性質）';
  requestAnimationFrame(loop);})();};

// 氧化反應（燃燒需要氧）
S.oxidation=function(host){let ox=true;const g=cv(host,340,200);const c=ctrl(host);
 const b=el('<button style="cursor:pointer;background:'+C.y+';color:#16241c;border:none;border-radius:8px;padding:5px 14px;font-weight:700">有氧氣</button>');b.onclick=function(){ox=!ox;b.textContent=ox?'有氧氣':'無氧氣(蓋熄)';};c.appendChild(b);
 const ro=readout(host);let t=0;
 (function loop(){t+=0.15;g.clearRect(0,0,340,200);g.fillStyle='#7a4a2a';g.fillRect(130,150,80,20);
  if(ox){for(let k=0;k<7;k++){const h=40+Math.sin(t+k)*14+k*4;const x=170+(k-3)*9;g.fillStyle=k<4?C.y:C.r;g.beginPath();g.moveTo(x,150);g.quadraticCurveTo(x-6,150-h/2,x,150-h);g.quadraticCurveTo(x+6,150-h/2,x,150);g.fill();}}
  else{for(let k=0;k<3;k++){const yy=(t*4+k*20)%60;g.fillStyle='rgba(180,180,180,'+(1-yy/60).toFixed(2)+')';g.beginPath();g.arc(170+(k-1)*10,140-yy,6,0,7);g.fill();}}
  ro.innerHTML=ox?'<b style="color:'+C.r+'">持續燃燒</b>：燃燒是劇烈的氧化反應，需要可燃物＋氧氣＋達燃點':'<b style="color:'+C.b+'">火焰熄滅</b>：隔絕氧氣即無法燃燒（滅火原理之一）；生鏽則是緩慢氧化';
  requestAnimationFrame(loop);})();};

// 天氣鋒面
S.front=function(host){let type='冷鋒';const g=cv(host,440,200);const c=ctrl(host);
 ['冷鋒','暖鋒'].forEach(m=>{const b=el('<button style="cursor:pointer;background:'+(m==='冷鋒'?C.y:'none')+';color:'+(m==='冷鋒'?'#16241c':C.b)+';border:1px solid rgba(159,200,216,.4);border-radius:8px;padding:5px 14px;font-weight:700">'+m+'</button>');b.onclick=function(){type=m;Array.prototype.forEach.call(c.querySelectorAll('button'),function(x){x.style.background='none';x.style.color=C.b;});b.style.background=C.y;b.style.color='#16241c';};c.appendChild(b);});
 const ro=readout(host);let t=0;
 (function loop(){t+=0.02;g.clearRect(0,0,440,200);const fx=100+((t*20)%260);g.fillStyle='rgba(120,90,60,.4)';g.fillRect(0,170,440,30);
  if(type==='冷鋒'){g.fillStyle='rgba(159,200,216,.35)';g.beginPath();g.moveTo(0,170);g.lineTo(fx,170);g.lineTo(fx-70,60);g.lineTo(0,60);g.fill();g.fillStyle='rgba(232,160,160,.3)';g.beginPath();g.moveTo(fx,170);g.lineTo(440,170);g.lineTo(440,90);g.lineTo(fx-70,90);g.fill();
   g.fillStyle='#666';g.beginPath();g.arc(fx-40,55,20,0,7);g.arc(fx-15,50,24,0,7);g.fill();}
  else{g.fillStyle='rgba(232,160,160,.3)';g.beginPath();g.moveTo(fx,170);g.lineTo(440,170);g.lineTo(440,60);g.lineTo(fx+120,60);g.fill();g.fillStyle='rgba(159,200,216,.35)';g.beginPath();g.moveTo(0,170);g.lineTo(fx,170);g.lineTo(fx+120,60);g.lineTo(0,60);g.fill();
   g.fillStyle='#888';g.beginPath();g.arc(fx+50,70,16,0,7);g.arc(fx+80,68,18,0,7);g.fill();}
  ro.innerHTML=type==='冷鋒'?'<b style="color:'+C.b+'">冷鋒</b>：冷氣團推進、暖空氣被迫急速抬升→積雨雲、短時強降雨、氣溫驟降':'<b style="color:'+C.r+'">暖鋒</b>：暖氣團緩緩爬升於冷空氣上→層狀雲、連續性緩雨、氣溫漸升';
  requestAnimationFrame(loop);})();};

// 潮汐
S.tide=function(host){const g=cv(host,440,200);const c=ctrl(host);const ro=readout(host);let t=0;
 (function loop(){t+=0.02;g.clearRect(0,0,440,200);const lvl=Math.sin(t)*40;
  g.fillStyle='rgba(100,150,220,.4)';g.fillRect(0,120-lvl,440,80+lvl);g.strokeStyle=C.b;g.beginPath();g.moveTo(0,120-lvl);g.lineTo(440,120-lvl);g.stroke();
  g.fillStyle='#8a6d3b';g.fillRect(30,90,50,60);g.fillStyle=C.chalk;g.font='12px sans-serif';g.fillText('岸',48,85);
  g.fillStyle='#ddd';g.beginPath();g.arc(370+Math.cos(t)*30,50,16,0,7);g.fill();g.fillStyle=C.chalk;g.fillText('🌙月球',330,30);
  ro.innerHTML=lvl>25?'<b style="color:'+C.b+'">滿潮(高潮)</b>：海水面升高':(lvl<-25?'<b style="color:'+C.y+'">乾潮(低潮)</b>：海水面下降':'潮位變化中…')+'　月球(與太陽)引力造成，一天約有兩次滿潮兩次乾潮';
  requestAnimationFrame(loop);})();};

// 蒸散作用
S.transpiration=function(host){let light=5;const g=cv(host,320,240);const c=ctrl(host);
 slider(c,'光照/溫度',1,10,light,1,v=>light=v);const ro=readout(host);let t=0;
 (function loop(){t+=0.02*light;g.clearRect(0,0,320,240);
  g.strokeStyle='#5a8a3a';g.lineWidth=8;g.beginPath();g.moveTo(160,210);g.lineTo(160,90);g.stroke();g.fillStyle='#5a8a3a';g.beginPath();g.arc(130,80,26,0,7);g.arc(190,80,26,0,7);g.arc(160,60,28,0,7);g.fill();
  g.fillStyle='#7a5a2a';g.beginPath();g.moveTo(150,210);g.lineTo(160,235);g.lineTo(170,210);g.fill();
  for(let k=0;k<5;k++){const yy=(t+k*24)%120;g.fillStyle=C.b;g.beginPath();g.arc(160,205-yy,3,0,7);g.fill();}
  for(let k=0;k<4;k++){const yy=(t+k*15)%50;g.fillStyle='rgba(159,200,216,'+(1-yy/50).toFixed(2)+')';g.beginPath();g.arc(120+k*28,70-yy,3,0,7);g.fill();}
  ro.innerHTML='<b style="color:'+C.y+'">蒸散作用</b>：葉的氣孔散失水氣→產生拉力，使水分由根經莖(木質部)向上運輸　（光越強/溫越高→蒸散越快）';
  requestAnimationFrame(loop);})();};

// 天擇（胡椒蛾）
S.selection=function(host){let env='淺色';let light=8,dark=8;const g=cv(host,360,200);const c=ctrl(host);
 ['淺色環境','深色環境'].forEach(m=>{const b=el('<button style="cursor:pointer;background:'+(m==='淺色環境'?C.y:'none')+';color:'+(m==='淺色環境'?'#16241c':C.b)+';border:1px solid rgba(159,200,216,.4);border-radius:8px;padding:5px 12px;font-weight:700">'+m+'</button>');b.onclick=function(){env=m[0]==='淺'?'淺色':'深色';light=8;dark=8;Array.prototype.forEach.call(c.querySelectorAll('button'),function(x){x.style.background='none';x.style.color=C.b;});b.style.background=C.y;b.style.color='#16241c';};c.appendChild(b);});
 const ro=readout(host);let t=0;
 (function loop(){t+=0.02;if(t>1){t=0;if(env==='淺色'){light=Math.min(20,light+1);dark=Math.max(1,dark-1);}else{dark=Math.min(20,dark+1);light=Math.max(1,light-1);}}
  g.clearRect(0,0,360,200);g.fillStyle=env==='淺色'?'#cbb89a':'#4a3a2a';g.fillRect(0,0,360,200);
  let i=0;for(let n=0;n<light;n++){g.fillStyle='#eee';g.beginPath();g.arc(30+(i%9)*38,30+Math.floor(i/9)*40,7,0,7);g.fill();i++;}
  for(let n=0;n<dark;n++){g.fillStyle='#222';g.beginPath();g.arc(30+(i%9)*38,30+Math.floor(i/9)*40,7,0,7);g.fill();i++;}
  ro.innerHTML='環境：<b style="color:'+C.y+'">'+env+'樹幹</b>　淺色蛾 '+light+' ｜ 深色蛾 '+dark+'　→ 與環境相近者不易被捕食、存活繁殖多，族群比例改變（<b>天擇</b>）';
  requestAnimationFrame(loop);})();};

// 混合物的分離
S.separate=function(host){let m='過濾';const g=cv(host,320,240);const c=ctrl(host);
 ['過濾','蒸發結晶'].forEach(x=>{const b=el('<button style="cursor:pointer;background:'+(x==='過濾'?C.y:'none')+';color:'+(x==='過濾'?'#16241c':C.b)+';border:1px solid rgba(159,200,216,.4);border-radius:8px;padding:5px 12px;font-weight:700">'+x+'</button>');b.onclick=function(){m=x;Array.prototype.forEach.call(c.querySelectorAll('button'),function(z){z.style.background='none';z.style.color=C.b;});b.style.background=C.y;b.style.color='#16241c';};c.appendChild(b);});
 const ro=readout(host);let t=0;
 (function loop(){t+=1;g.clearRect(0,0,320,240);g.font='12px sans-serif';
  if(m==='過濾'){g.strokeStyle=C.chalk;g.lineWidth=2;g.beginPath();g.moveTo(110,60);g.lineTo(160,120);g.lineTo(210,60);g.stroke();
   g.fillStyle='#8a6d3b';for(let k=0;k<6;k++)g.fillRect(130+k*8,80,5,5);
   const dy=(t*2)%80;g.fillStyle=C.b;g.beginPath();g.arc(160,120+dy,3,0,7);g.fill();
   g.strokeStyle=C.chalk;g.strokeRect(130,190,60,40);g.fillStyle='rgba(100,150,220,.4)';g.fillRect(131,205,58,24);
   g.fillStyle=C.chalk;g.fillText('不溶固體留濾紙',70,55);g.fillText('濾液',195,215);}
  else{g.strokeStyle=C.chalk;g.strokeRect(120,90,80,90);const lvl=Math.max(10,60-(t/6)%60);g.fillStyle='rgba(100,150,220,.4)';g.fillRect(121,180-lvl,78,lvl);
   g.fillStyle=C.y;for(let k=0;k<Math.floor((60-lvl)/6);k++){g.fillRect(126+k*9,172,6,6);}g.fillStyle=C.r;g.font='20px sans-serif';g.fillText('🔥',150,205);
   g.fillStyle=C.chalk;g.font='12px sans-serif';g.fillText('加熱→水蒸發，溶質結晶析出',60,80);}
  ro.innerHTML=m==='過濾'?'<b style="color:'+C.y+'">過濾</b>：分離「不溶固體＋液體」，固體留濾紙、液體成濾液':'<b style="color:'+C.y+'">蒸發結晶</b>：分離「可溶溶質＋溶劑」，加熱使溶劑蒸發、留下結晶';
  requestAnimationFrame(loop);})();};

// 岩石循環
S.rockcycle=function(host){const g=cv(host,340,260);const c=ctrl(host);const ro=readout(host);let t=0,idx=0;
 const nd=[[170,50,'火成岩',C.r],[270,190,'沉積岩',C.y],[70,190,'變質岩',C.b]];const proc=['冷卻凝固→火成岩','風化侵蝕搬運沉積→沉積岩','高溫高壓變質→變質岩'];
 (function loop(){t+=0.01;if(t>1){t=0;idx=(idx+1)%3;}g.clearRect(0,0,340,260);
  g.strokeStyle='rgba(244,241,232,.3)';g.lineWidth=2;for(let i=0;i<3;i++){const a=nd[i],b=nd[(i+1)%3];g.beginPath();g.moveTo(a[0],a[1]);g.lineTo(b[0],b[1]);g.stroke();}
  nd.forEach((n,i)=>{g.fillStyle=i===idx?n[3]:'rgba(120,120,120,.5)';g.beginPath();g.arc(n[0],n[1],30,0,7);g.fill();g.fillStyle='#16241c';g.font='13px sans-serif';g.fillText(n[2],n[0]-24,n[1]+5);});
  const a=nd[idx],b=nd[(idx+1)%3];g.fillStyle=C.chalk;g.beginPath();g.arc(a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t,6,0,7);g.fill();
  ro.innerHTML='岩石循環進行中：<b style="color:'+C.y+'">'+proc[idx]+'</b>　（三大類岩石可互相轉變，能量來自地熱與太陽）';
  requestAnimationFrame(loop);})();};

// 溫室效應
S.greenhouse=function(host){let gas=5;const g=cv(host,380,220);const c=ctrl(host);
 slider(c,'溫室氣體濃度',1,10,gas,1,v=>gas=v);const ro=readout(host);let t=0;
 (function loop(){t+=2;g.clearRect(0,0,380,220);g.fillStyle='rgba(120,90,60,.5)';g.fillRect(0,180,380,40);
  g.fillStyle=C.y;g.beginPath();g.arc(40,40,18,0,7);g.fill();
  g.strokeStyle='rgba(240,216,120,.4)';g.setLineDash([4,4]);g.beginPath();g.moveTo(0,110);g.lineTo(380,110);g.stroke();g.setLineDash([]);g.fillStyle=C.chalk;g.font='12px sans-serif';g.fillText('溫室氣體層',150,105);
  g.strokeStyle=C.y;g.lineWidth=2;const iy=(t)%140;g.beginPath();g.moveTo(60,iy);g.lineTo(66,iy+8);g.lineTo(72,iy);g.stroke();
  for(let k=0;k<3;k++){const ry=(t+k*40)%140;const back=k<gas/3.5;g.strokeStyle=C.r;g.beginPath();if(back&&180-ry<110){g.moveTo(250,110+ry%70);g.lineTo(250,110);}else{g.moveTo(250,180-ry);g.lineTo(256,180-ry+6);g.lineTo(262,180-ry);}g.stroke();}
  const temp=14+gas*1.8;ro.innerHTML='地表放出紅外線，部分被溫室氣體<b style="color:'+C.r+'">反射回地面</b>→增溫。濃度越高，均溫越高 ≈ <b style="color:'+C.y+'">'+temp.toFixed(1)+'℃</b>';
  requestAnimationFrame(loop);})();};

// 反射弧（縮手反射）
S.reflex=function(host){let fire=-1;const g=cv(host,420,200);const c=ctrl(host);
 const b=el('<button style="cursor:pointer;background:'+C.y+';color:#16241c;border:none;border-radius:8px;padding:5px 14px;font-weight:700">刺激(觸碰熱源)</button>');b.onclick=function(){fire=0;};c.appendChild(b);
 const wp=[[40,150,'受器(皮膚)'],[130,150,'感覺神經'],[210,90,'脊髓(中樞)'],[290,150,'運動神經'],[380,150,'動作器(肌肉)']];const ro=readout(host);
 (function loop(){g.clearRect(0,0,420,200);g.strokeStyle='rgba(244,241,232,.3)';g.lineWidth=2;g.beginPath();for(let i=0;i<wp.length;i++){i===0?g.moveTo(wp[i][0],wp[i][1]):g.lineTo(wp[i][0],wp[i][1]);}g.stroke();
  wp.forEach(p=>{g.fillStyle=C.b;g.beginPath();g.arc(p[0],p[1],6,0,7);g.fill();g.fillStyle=C.chalk;g.font='11px sans-serif';g.fillText(p[2],p[0]-24,p[1]+22);});
  let stage='按「刺激」觀察反射路徑（不經大腦，反應快）';
  if(fire>=0){fire+=0.012;const seg=Math.min(3,Math.floor(fire*4));const lp=(fire*4)%1;const a=wp[seg],bb=wp[seg+1];g.fillStyle=C.r;g.beginPath();g.arc(a[0]+(bb[0]-a[0])*lp,a[1]+(bb[1]-a[1])*lp,7,0,7);g.fill();stage='訊息傳遞：受器→感覺神經→脊髓→運動神經→肌肉收縮縮手';if(fire>=1){fire=-1;}}
  ro.innerHTML='<b style="color:'+C.y+'">反射弧</b>：'+stage+'　（脊髓為中樞，不需大腦判斷，故反應迅速保護身體）';
  requestAnimationFrame(loop);})();};

// 消化與吸收
S.digest=function(host){const g=cv(host,440,180);const c=ctrl(host);const ro=readout(host);let t=0;
 (function loop(){t+=0.008;if(t>1)t=0;g.clearRect(0,0,440,180);
  g.strokeStyle=C.chalk;g.lineWidth=2;g.beginPath();g.moveTo(30,60);g.lineTo(410,60);g.lineTo(410,110);g.lineTo(30,110);g.stroke();
  g.fillStyle=C.chalk;g.font='11px sans-serif';g.fillText('口',40,50);g.fillText('胃',180,50);g.fillText('小腸',320,50);
  const x=30+t*360;if(t<0.5){g.fillStyle=C.r;g.beginPath();g.arc(x,85,12,0,7);g.fill();g.fillStyle='#16241c';g.fillText('大分子',x-16,88);}
  else{for(let k=0;k<5;k++){const ox=x+(k-2)*10;g.fillStyle=C.g;g.beginPath();g.arc(ox,85,4,0,7);g.fill();g.strokeStyle=C.g;g.beginPath();g.moveTo(ox,110);g.lineTo(ox,130);g.stroke();}}
  ro.innerHTML=t<0.5?'食物中的<b style="color:'+C.r+'">大分子</b>經消化酵素分解…':'分解成<b style="color:'+C.g+'">小分子</b>→在<b>小腸</b>被吸收進入血液（消化＝把大分子變成能吸收的小分子）';
  requestAnimationFrame(loop);})();};

// 高低氣壓與風
S.aircurrent=function(host){const g=cv(host,420,220);const c=ctrl(host);const ro=readout(host);let t=0;
 (function loop(){t+=2;g.clearRect(0,0,420,220);g.fillStyle='rgba(120,90,60,.4)';g.fillRect(0,180,420,40);
  g.fillStyle=C.chalk;g.font='13px sans-serif';g.fillText('高氣壓 H',70,30);g.fillText('低氣壓 L',300,30);
  const d1=(t)%120;g.strokeStyle=C.b;g.lineWidth=2;g.beginPath();g.moveTo(90,40+d1);g.lineTo(86,34+d1);g.lineTo(94,34+d1);g.fill?g.fillStyle=C.b:0;g.stroke();
  const d2=(t)%120;g.strokeStyle=C.r;g.beginPath();g.moveTo(330,180-d2);g.lineTo(326,186-d2);g.lineTo(334,186-d2);g.stroke();
  const wx=(t*1.5)%200;g.strokeStyle=C.y;g.lineWidth=3;g.beginPath();g.moveTo(120+wx,170);g.lineTo(140+wx,170);g.stroke();g.beginPath();g.moveTo(140+wx,170);g.lineTo(134+wx,166);g.lineTo(134+wx,174);g.fill();
  ro.innerHTML='<b style="color:'+C.b+'">高壓</b>氣流下沉、天氣晴；<b style="color:'+C.r+'">低壓</b>氣流上升、易成雲雨。地面風由<b style="color:'+C.y+'">高壓吹向低壓</b>';
  requestAnimationFrame(loop);})();};

// 化學反應的能量（放熱/吸熱）
S.thermochem=function(host){let mode='放熱';const g=cv(host,300,240);const c=ctrl(host);
 ['放熱反應','吸熱反應'].forEach(x=>{const b=el('<button style="cursor:pointer;background:'+(x==='放熱反應'?C.y:'none')+';color:'+(x==='放熱反應'?'#16241c':C.b)+';border:1px solid rgba(159,200,216,.4);border-radius:8px;padding:5px 12px;font-weight:700">'+x+'</button>');b.onclick=function(){mode=x[0]==='放'?'放熱':'吸熱';Array.prototype.forEach.call(c.querySelectorAll('button'),function(z){z.style.background='none';z.style.color=C.b;});b.style.background=C.y;b.style.color='#16241c';};c.appendChild(b);});
 const ro=readout(host);let lvl=80;
 (function loop(){const target=mode==='放熱'?150:30;lvl+=(target-lvl)*0.04;g.clearRect(0,0,300,240);
  g.strokeStyle=C.chalk;g.lineWidth=2;g.strokeRect(140,20,26,180);g.beginPath();g.arc(153,205,16,0,7);g.stroke();
  g.fillStyle=mode==='放熱'?C.r:C.b;g.beginPath();g.arc(153,205,13,0,7);g.fill();g.fillRect(147,200-lvl,12,lvl+5);
  const temp=(mode==='放熱'?25+(lvl-80)*0.5:25-(80-lvl)*0.5);g.fillStyle=C.chalk;g.font='13px sans-serif';g.fillText('約 '+temp.toFixed(0)+'℃',180,110);
  ro.innerHTML=mode==='放熱'?'<b style="color:'+C.r+'">放熱反應</b>：放出能量，周圍溫度<b>上升</b>（如燃燒、酸鹼中和、生鏽）':'<b style="color:'+C.b+'">吸熱反應</b>：吸收能量，周圍溫度<b>下降</b>（如光合作用、部分溶解、熱分解）';
  requestAnimationFrame(loop);})();};

// 地表的改變（風化侵蝕堆積）
S.erosion=function(host){const g=cv(host,440,220);const c=ctrl(host);const ro=readout(host);let t=0;
 const b=el('<button style="cursor:pointer;background:'+C.y+';color:#16241c;border:none;border-radius:8px;padding:5px 14px;font-weight:700">重新開始</button>');b.onclick=function(){t=0;};c.appendChild(b);
 (function loop(){if(t<1)t+=0.004;g.clearRect(0,0,440,220);g.fillStyle='rgba(100,150,220,.3)';g.fillRect(0,170,440,50);
  const h=110*(1-t*0.7);g.fillStyle='#8a6d3b';g.beginPath();g.moveTo(40,170);g.lineTo(140,170-h);g.lineTo(240,170);g.fill();
  const pile=60*t;g.fillStyle='#c9a86a';g.beginPath();g.moveTo(300,170);g.lineTo(340+pile/2,170-pile*0.5);g.lineTo(400+pile,170);g.fill();
  g.strokeStyle=C.b;g.lineWidth=2;for(let k=0;k<3;k++){const x=(t*300+k*40+240)%180+240;g.beginPath();g.moveTo(x,150);g.lineTo(x-8,158);g.stroke();}
  g.fillStyle=C.chalk;g.font='12px sans-serif';g.fillText('高山被侵蝕',60,60);g.fillText('下游堆積',320,150);
  ro.innerHTML='<b style="color:'+C.y+'">外營力</b>：風化使岩石崩解→流水/風<b>侵蝕、搬運</b>→低處<b>堆積</b>成沖積地形，地表漸趨平緩';
  requestAnimationFrame(loop);})();};

// 地層、化石與地質年代
S.strata=function(host){const g=cv(host,360,240);const c=ctrl(host);const ro=readout(host);let t=0;
 const cols=['#7a5a3a','#9a7a4a','#b89a6a','#8a9a6a','#6a8a9a'];
 (function loop(){if(t<5)t+=0.008;g.clearRect(0,0,360,240);const n=Math.floor(t)+1;
  for(let i=0;i<Math.min(n,5);i++){const y=200-i*36;g.fillStyle=cols[i];g.fillRect(60,y,240,34);g.strokeStyle='rgba(0,0,0,.3)';g.strokeRect(60,y,240,34);}
  g.fillStyle='#333';g.font='14px sans-serif';g.fillText('🦴',150,200-1*36+24);
  g.fillStyle=C.chalk;g.font='12px sans-serif';g.fillText('↑越上層越新',305,60);g.fillText('↓越下層越老',305,200);
  ro.innerHTML='<b style="color:'+C.y+'">地層疊置定律</b>：未擾動時，越下層沉積越早(越老)、越上層越新；同層<b>化石</b>可對比不同地區地層與地質年代';
  requestAnimationFrame(loop);})();};

// 恆定性（負回饋調節體溫）
S.homeostasis=function(host){let temp=37,perturb=0;const g=cv(host,440,200);const c=ctrl(host);
 const bh=el('<button style="cursor:pointer;background:'+C.r+';color:#16241c;border:none;border-radius:8px;padding:5px 12px;font-weight:700">環境變熱</button>');bh.onclick=function(){perturb=2.5;};c.appendChild(bh);
 const bc=el('<button style="cursor:pointer;background:'+C.b+';color:#16241c;border:none;border-radius:8px;padding:5px 12px;font-weight:700">環境變冷</button>');bc.onclick=function(){perturb=-2.5;};c.appendChild(bc);
 const ro=readout(host);const hist=[];
 (function loop(){temp+=perturb*0.08;perturb*=0.9;temp+=(37-temp)*0.03;hist.push(temp);if(hist.length>380)hist.shift();
  g.clearRect(0,0,440,200);g.strokeStyle='rgba(168,208,160,.5)';g.setLineDash([4,4]);g.beginPath();g.moveTo(40,100);g.lineTo(430,100);g.stroke();g.setLineDash([]);g.fillStyle=C.g;g.font='12px sans-serif';g.fillText('設定點 37℃',40,94);
  g.strokeStyle=C.y;g.lineWidth=2;g.beginPath();hist.forEach((v,i)=>{const y=100-(v-37)*22;i?g.lineTo(40+i,y):g.moveTo(40+i,y);});g.stroke();
  const act=temp>37.3?'流汗、血管舒張散熱':(temp<36.7?'顫抖、血管收縮產熱':'維持恆定');ro.innerHTML='體溫 <b style="color:'+C.y+'">'+temp.toFixed(1)+'℃</b>　身體以<b>負回饋</b>調節（'+act+'）使體溫回到約 37℃';
  requestAnimationFrame(loop);})();};

// 大氣中的水（凝結/露點）
S.humidity=function(host){let T=28;const g=cv(host,380,220);const c=ctrl(host);
 slider(c,'氣溫(℃)',5,35,T,1,v=>T=v);const ro=readout(host);const dp=15;
 const pts=[];for(let i=0;i<16;i++)pts.push({x:30+Math.random()*320,y:20+Math.random()*120,vx:(Math.random()-.5)*1.2});
 (function loop(){g.clearRect(0,0,380,220);g.fillStyle='rgba(120,90,60,.4)';g.fillRect(0,180,380,40);const cond=T<=dp;
  pts.forEach(p=>{p.x+=p.vx;if(p.x<25||p.x>355)p.vx*=-1;if(cond){p.y+=1.5;if(p.y>178){p.y=178;}g.fillStyle=C.b;g.beginPath();g.arc(p.x,p.y,4,0,7);g.fill();}else{g.fillStyle='rgba(159,200,216,.7)';g.beginPath();g.arc(p.x,p.y,2.5,0,7);g.fill();}});
  g.fillStyle=C.chalk;g.font='12px sans-serif';g.fillText('露點約 '+dp+'℃',150,15);
  ro.innerHTML=cond?'<b style="color:'+C.b+'">已達露點</b>：氣溫降到露點以下，水氣<b>凝結</b>成小水滴→雲、霧、露(近地面)':'水氣以氣態存在。氣溫越接近露點，相對濕度越高（降溫至露點即開始凝結）';
  requestAnimationFrame(loop);})();};

// 溫度計（攝氏/華氏/凱氏）
S.thermometer=function(host){let T=25;const g=cv(host,300,240);const c=ctrl(host);
 slider(c,'攝氏溫度(℃)',-20,120,T,5,v=>T=v);const ro=readout(host);
 (function loop(){g.clearRect(0,0,300,240);const lvl=(T+20)/140*160;
  g.strokeStyle=C.chalk;g.lineWidth=2;g.strokeRect(130,20,22,180);g.beginPath();g.arc(141,205,15,0,7);g.stroke();
  g.fillStyle=C.r;g.beginPath();g.arc(141,205,12,0,7);g.fill();g.fillRect(135,200-lvl,12,lvl+5);
  g.strokeStyle='rgba(159,200,216,.5)';g.fillStyle=C.b;g.font='11px sans-serif';[[0,'冰點0℃'],[100,'沸點100℃']].forEach(m=>{const y=200-(m[0]+20)/140*160;g.beginPath();g.moveTo(152,y);g.lineTo(168,y);g.stroke();g.fillText(m[1],158,y-3);});
  const F=T*9/5+32,K=T+273;ro.innerHTML='<b style="color:'+C.y+'">'+T+' ℃</b> ＝ <b style="color:'+C.r+'">'+F.toFixed(0)+' ℉</b>（℃×9/5+32）＝ <b style="color:'+C.b+'">'+K+' K</b>（℃+273）';
  requestAnimationFrame(loop);})();};

// 尺的測量與估計值
S.measure=function(host){let L=6.4;const g=cv(host,420,160);const c=ctrl(host);
 slider(c,'物體長度(cm)',1,9,L,0.1,v=>L=v);const ro=readout(host);
 (function loop(){g.clearRect(0,0,420,160);const x0=30,sc=40;
  g.strokeStyle=C.chalk;g.lineWidth=1;g.beginPath();g.moveTo(x0,90);g.lineTo(x0+10*sc,90);g.stroke();
  for(let i=0;i<=100;i++){const x=x0+i*sc/10;const big=i%10===0;g.beginPath();g.moveTo(x,90);g.lineTo(x,big?72:82);g.stroke();if(big){g.fillStyle=C.chalk;g.font='11px sans-serif';g.fillText(i/10,x-3,66);}}
  g.fillStyle='rgba(168,208,160,.6)';g.fillRect(x0,95,L*sc,24);g.strokeStyle=C.g;g.strokeRect(x0,95,L*sc,24);
  g.strokeStyle=C.r;g.lineWidth=2;g.beginPath();g.moveTo(x0+L*sc,60);g.lineTo(x0+L*sc,120);g.stroke();
  ro.innerHTML='最小刻度 0.1 cm → 需再<b>估讀一位</b>：讀數 = <b style="color:'+C.y+'">'+L.toFixed(1)+' cm</b>（最後一位為估計值，含不確定性）';
  requestAnimationFrame(loop);})();};

// 週期表結構
S.periodic=function(host){const PT={'H':[1,1,'非金屬',[1]],'He':[18,1,'惰性氣體',[2]],'Li':[1,2,'鹼金屬',[2,1]],'Be':[2,2,'鹼土金屬',[2,2]],'B':[13,2,'類金屬',[2,3]],'C':[14,2,'非金屬',[2,4]],'N':[15,2,'非金屬',[2,5]],'O':[16,2,'非金屬',[2,6]],'F':[17,2,'鹵素',[2,7]],'Ne':[18,2,'惰性氣體',[2,8]],'Na':[1,3,'鹼金屬',[2,8,1]],'Mg':[2,3,'鹼土金屬',[2,8,2]],'Al':[13,3,'金屬',[2,8,3]],'Si':[14,3,'類金屬',[2,8,4]],'P':[15,3,'非金屬',[2,8,5]],'S':[16,3,'非金屬',[2,8,6]],'Cl':[17,3,'鹵素',[2,8,7]],'Ar':[18,3,'惰性氣體',[2,8,8]],'K':[1,4,'鹼金屬',[2,8,8,1]],'Ca':[2,4,'鹼土金屬',[2,8,8,2]]};
 let sel='C';const g=cv(host,400,180);const c=ctrl(host);
 const w=el('<label style="font-size:13px;color:'+C.b+'">元素：<select style="font-size:14px"></select></label>');const sl=w.querySelector('select');Object.keys(PT).forEach(k=>{const o=el('<option>'+k+'</option>');if(k==='C')o.selected=true;sl.appendChild(o);});sl.onchange=e=>sel=e.target.value;c.appendChild(w);
 const ro=readout(host);const cw=20,ch=30,x0=8,y0=12;
 host.querySelector('canvas').onclick=function(ev){const r=this.getBoundingClientRect();const mx=(ev.clientX-r.left)*(400/r.width),my=(ev.clientY-r.top)*(180/r.height);Object.keys(PT).forEach(k=>{const p=PT[k];const x=x0+(p[0]-1)*cw,y=y0+(p[1]-1)*ch;if(mx>=x&&mx<=x+cw-2&&my>=y&&my<=y+ch-2){sel=k;sl.value=k;}});};
 (function loop(){g.clearRect(0,0,400,180);g.font='11px sans-serif';Object.keys(PT).forEach(k=>{const p=PT[k];const x=x0+(p[0]-1)*cw,y=y0+(p[1]-1)*ch;g.fillStyle=k===sel?C.y:'rgba(159,200,216,.25)';g.fillRect(x,y,cw-2,ch-2);g.fillStyle=k===sel?'#16241c':C.chalk;g.fillText(k,x+3,y+18);});
  const p=PT[sel];ro.innerHTML='<b style="color:'+C.y+'">'+sel+'</b>：第 <b>'+p[1]+'</b> 週期（=電子層數 '+p[3].length+'）、第 <b>'+p[0]+'</b> 族　類別：'+p[2]+'　電子排列 '+p[3].join('、')+'（最外層 '+p[3][p[3].length-1]+' 個決定化性）';
  requestAnimationFrame(loop);})();};

// 莫耳換算
S.mole=function(host){let n=1;const g=cv(host,300,180);const c=ctrl(host);
 slider(c,'碳的莫耳數(mol)',0.5,3,n,0.5,v=>n=v);const ro=readout(host);
 (function loop(){g.clearRect(0,0,300,180);const dots=Math.round(n*8);for(let i=0;i<dots;i++){g.fillStyle=C.y;g.beginPath();g.arc(40+(i%6)*40,40+Math.floor(i/6)*40,10,0,7);g.fill();g.fillStyle='#16241c';g.font='10px sans-serif';g.fillText('C',36+(i%6)*40,44+Math.floor(i/6)*40);}
  const N=(n*6.02).toFixed(2),mass=(n*12);ro.innerHTML='<b style="color:'+C.y+'">'+n+' mol</b> 碳 ＝ 粒子數 '+N+'×10²³ 個（1 mol=6.02×10²³）＝ 質量 <b style="color:'+C.g+'">'+mass+' g</b>（碳原子量 12）';
  requestAnimationFrame(loop);})();};

// 細胞構造（動物/植物）
S.cell=function(host){let type='植物';const g=cv(host,320,240);const c=ctrl(host);
 ['動物細胞','植物細胞'].forEach(x=>{const b=el('<button style="cursor:pointer;background:'+(x==='植物細胞'?C.y:'none')+';color:'+(x==='植物細胞'?'#16241c':C.b)+';border:1px solid rgba(159,200,216,.4);border-radius:8px;padding:5px 12px;font-weight:700">'+x+'</button>');b.onclick=function(){type=x[0]==='植'?'植物':'動物';Array.prototype.forEach.call(c.querySelectorAll('button'),function(z){z.style.background='none';z.style.color=C.b;});b.style.background=C.y;b.style.color='#16241c';};c.appendChild(b);});
 const ro=readout(host);
 (function loop(){g.clearRect(0,0,320,240);const cx=160,cy=120;g.font='11px sans-serif';
  if(type==='植物'){g.strokeStyle='#6a8a3a';g.lineWidth=4;g.strokeRect(50,40,220,160);g.fillStyle=C.chalk;g.fillText('細胞壁',52,34);}
  g.fillStyle='rgba(159,200,216,.15)';g.beginPath();g.ellipse(cx,cy,100,72,0,0,7);g.fill();g.strokeStyle=C.b;g.lineWidth=2;g.stroke();g.fillStyle=C.chalk;g.fillText('細胞膜',cx+70,cy-60);
  g.fillStyle='rgba(232,160,160,.6)';g.beginPath();g.arc(cx,cy,26,0,7);g.fill();g.fillStyle='#16241c';g.fillText('細胞核',cx-22,cy+4);
  g.fillStyle=C.r;g.beginPath();g.ellipse(cx-55,cy+30,14,7,0.5,0,7);g.fill();g.fillStyle=C.chalk;g.fillText('粒線體',cx-80,cy+55);
  if(type==='植物'){g.fillStyle='rgba(120,90,220,.25)';g.beginPath();g.arc(cx+45,cy+20,30,0,7);g.fill();g.fillStyle=C.chalk;g.fillText('大液泡',cx+30,cy+22);for(let k=0;k<4;k++){g.fillStyle=C.g;g.beginPath();g.ellipse(cx-40+k*12,cy-40,7,4,0.5,0,7);g.fill();}g.fillText('葉綠體',cx-55,cy-48);}
  ro.innerHTML='<b style="color:'+C.y+'">'+type+'細胞</b>　共有：細胞膜、細胞核、細胞質、粒線體；<b style="color:'+C.g+'">植物特有</b>：細胞壁、葉綠體、大液泡';
  requestAnimationFrame(loop);})();};

// 免疫反應
S.immune=function(host){const g=cv(host,420,200);const c=ctrl(host);const paths=[];const wbcs=[];
 const b=el('<button style="cursor:pointer;background:'+C.y+';color:#16241c;border:none;border-radius:8px;padding:5px 14px;font-weight:700">病原入侵</button>');b.onclick=function(){for(let i=0;i<8;i++)paths.push({x:40+Math.random()*340,y:30+Math.random()*140,dead:false});if(wbcs.length===0)for(let i=0;i<4;i++)wbcs.push({x:Math.random()*420,y:Math.random()*200});};c.appendChild(b);
 const ro=readout(host);
 (function loop(){g.clearRect(0,0,420,200);let alive=paths.filter(p=>!p.dead);
  wbcs.forEach(w=>{const tgt=alive[0];if(tgt){w.x+=(tgt.x-w.x)*0.03;w.y+=(tgt.y-w.y)*0.03;if(Math.abs(w.x-tgt.x)<12&&Math.abs(w.y-tgt.y)<12)tgt.dead=true;}g.fillStyle=C.b;g.beginPath();g.arc(w.x,w.y,12,0,7);g.fill();});
  paths.forEach(p=>{if(!p.dead){g.fillStyle=C.r;g.beginPath();g.arc(p.x,p.y,6,0,7);g.fill();}});
  g.fillStyle=C.chalk;g.font='11px sans-serif';g.fillText('🔵白血球',20,20);g.fillText('🔴病原',110,20);
  ro.innerHTML='<b style="color:'+C.y+'">免疫</b>：皮膚為第一道防線；病原入侵後<b style="color:'+C.b+'">白血球吞噬</b>、淋巴球產生<b>抗體</b>專一結合病原（剩 '+alive.length+' 個病原）';
  requestAnimationFrame(loop);})();};

// 化學反應與化學式（原子守恆）
S.chemeq=function(host){const g=cv(host,440,180);const c=ctrl(host);const ro=readout(host);let t=0;
 (function loop(){t+=0.01;if(t>1)t=0;g.clearRect(0,0,440,180);g.font='13px sans-serif';const merge=t<0.5?t*2:1;
  function mol(x,y,atoms){atoms.forEach(a=>{g.fillStyle=a[2];g.beginPath();g.arc(x+a[0],y+a[1],9,0,7);g.fill();g.fillStyle='#16241c';g.font='10px sans-serif';g.fillText(a[3],x+a[0]-4,y+a[1]+3);});}
  // 反應物 2H2 + O2
  mol(60-merge*10,60,[[0,0,C.b,'H'],[16,0,C.b,'H']]);mol(60-merge*10,110,[[0,0,C.b,'H'],[16,0,C.b,'H']]);
  mol(150+merge*10,85,[[0,0,C.r,'O'],[16,0,C.r,'O']]);
  g.fillStyle=C.chalk;g.font='20px sans-serif';g.fillText('→',230,95);
  // 生成物 2H2O
  mol(280,60,[[0,0,C.r,'O'],[-13,8,C.b,'H'],[13,8,C.b,'H']]);mol(280,120,[[0,0,C.r,'O'],[-13,8,C.b,'H'],[13,8,C.b,'H']]);
  g.fillStyle=C.chalk;g.font='14px sans-serif';g.fillText('2H₂ + O₂ → 2H₂O',150,25);
  ro.innerHTML='<b style="color:'+C.y+'">2H₂ + O₂ → 2H₂O</b>　反應前後原子種類與數目相同（H:4、O:2）→ 質量守恆；係數用來<b>配平</b>方程式';
  requestAnimationFrame(loop);})();};

// 生物體的組成層次
S.levels=function(host){const g=cv(host,440,140);const c=ctrl(host);let step=0;
 const L=['細胞','組織','器官','器官系統','個體'];
 const b=el('<button style="cursor:pointer;background:'+C.y+';color:#16241c;border:none;border-radius:8px;padding:5px 14px;font-weight:700">下一層 ▶</button>');b.onclick=function(){step=(step+1)%5;};c.appendChild(b);
 const ro=readout(host);
 (function loop(){g.clearRect(0,0,440,140);for(let i=0;i<5;i++){const x=20+i*84;g.fillStyle=i<=step?C.g:'rgba(120,120,120,.4)';g.fillRect(x,50,70,40);g.fillStyle=i<=step?'#16241c':C.chalk;g.font='13px sans-serif';g.fillText(L[i],x+ (L[i].length>3?4:18),75);if(i<4){g.fillStyle=C.chalk;g.fillText('→',x+74,75);}}
  ro.innerHTML='生物體組成層次（由小到大）：<b style="color:'+C.y+'">'+L.slice(0,step+1).join(' → ')+'</b>　（細胞是生物體構造與功能的基本單位）';
  requestAnimationFrame(loop);})();};

// 有性/無性生殖
S.repro=function(host){let mode='無性';const g=cv(host,420,180);const c=ctrl(host);
 ['無性生殖','有性生殖'].forEach(x=>{const b=el('<button style="cursor:pointer;background:'+(x==='無性生殖'?C.y:'none')+';color:'+(x==='無性生殖'?'#16241c':C.b)+';border:1px solid rgba(159,200,216,.4);border-radius:8px;padding:5px 12px;font-weight:700">'+x+'</button>');b.onclick=function(){mode=x[0]==='無'?'無性':'有性';Array.prototype.forEach.call(c.querySelectorAll('button'),function(z){z.style.background='none';z.style.color=C.b;});b.style.background=C.y;b.style.color='#16241c';};c.appendChild(b);});
 const ro=readout(host);
 (function loop(){g.clearRect(0,0,420,180);g.font='12px sans-serif';
  if(mode==='無性'){g.fillStyle=C.g;g.beginPath();g.arc(90,90,26,0,7);g.fill();g.fillStyle=C.chalk;g.fillText('親代(1)',66,130);g.strokeStyle=C.chalk;g.beginPath();g.moveTo(120,90);g.lineTo(180,90);g.stroke();
   [60,90,120].forEach(y=>{g.fillStyle=C.g;g.beginPath();g.arc(230,y,16,0,7);g.fill();});g.fillStyle=C.chalk;g.fillText('子代：與親代完全相同(基因一樣)',250,90);}
  else{g.fillStyle=C.b;g.beginPath();g.arc(70,60,20,0,7);g.fill();g.fillStyle=C.r;g.beginPath();g.arc(70,120,20,0,7);g.fill();g.fillStyle=C.chalk;g.fillText('精',64,64);g.fillText('卵',64,124);
   g.strokeStyle=C.chalk;g.beginPath();g.moveTo(95,60);g.lineTo(150,88);g.moveTo(95,120);g.lineTo(150,92);g.stroke();g.fillStyle='#b98';g.beginPath();g.arc(170,90,18,0,7);g.fill();g.fillStyle=C.chalk;g.fillText('受精卵',150,130);
   [60,90,120].forEach((y,i)=>{g.fillStyle=['#a8d','#8da','#da8'][i];g.beginPath();g.arc(300,y,15,0,7);g.fill();});g.fillStyle=C.chalk;g.fillText('子代：具變異(親代基因重組)',320,90);}
  ro.innerHTML=mode==='無性'?'<b style="color:'+C.y+'">無性生殖</b>：1 個親代、不經受精 → 子代基因與親代<b>相同</b>(如分裂、出芽、營養器官)':'<b style="color:'+C.y+'">有性生殖</b>：精＋卵受精 → 子代基因<b>重組具變異</b>，較能適應環境變化';
  requestAnimationFrame(loop);})();};

// 有機化合物（碳骨架）
S.organic=function(host){const mol={'甲烷 CH₄':[['C',0,0],['H',-1,-1],['H',1,-1],['H',-1,1],['H',1,1]],'乙烷 C₂H₆':[['C',-0.6,0],['C',0.6,0],['H',-1.4,-1],['H',-1.4,1],['H',-0.6,-1.3],['H',0.6,-1.3],['H',1.4,-1],['H',1.4,1]],'乙烯 C₂H₄':[['C',-0.6,0],['C',0.6,0],['H',-1.4,-1],['H',-1.4,1],['H',1.4,-1],['H',1.4,1]]};
 let m='甲烷 CH₄';const g=cv(host,320,220);const c=ctrl(host);
 const w=el('<label style="font-size:13px;color:'+C.b+'">分子：<select style="font-size:14px"><option>甲烷 CH₄</option><option>乙烷 C₂H₆</option><option>乙烯 C₂H₄</option></select></label>');w.querySelector('select').onchange=e=>m=e.target.value;c.appendChild(w);
 const ro=readout(host);
 (function loop(){g.clearRect(0,0,320,220);const cx=160,cy=105,s=42;const at=mol[m];
  g.strokeStyle='rgba(244,241,232,.5)';g.lineWidth=2;const cs=at.filter(a=>a[0]==='C');at.forEach(a=>{if(a[0]==='H'){let nc=cs[0];cs.forEach(cc=>{if(Math.hypot(cc[1]-a[1],cc[2]-a[2])<Math.hypot(nc[1]-a[1],nc[2]-a[2]))nc=cc;});g.beginPath();g.moveTo(cx+nc[1]*s,cy+nc[2]*s);g.lineTo(cx+a[1]*s,cy+a[2]*s);g.stroke();}});
  if(cs.length===2&&m.indexOf('乙烯')>-1){g.beginPath();g.moveTo(cx+cs[0][1]*s,cy-4);g.lineTo(cx+cs[1][1]*s,cy-4);g.moveTo(cx+cs[0][1]*s,cy+4);g.lineTo(cx+cs[1][1]*s,cy+4);g.stroke();}else if(cs.length===2){g.beginPath();g.moveTo(cx+cs[0][1]*s,cy);g.lineTo(cx+cs[1][1]*s,cy);g.stroke();}
  at.forEach(a=>{g.fillStyle=a[0]==='C'?'#444':C.b;g.beginPath();g.arc(cx+a[1]*s,cy+a[2]*s,a[0]==='C'?14:9,0,7);g.fill();g.fillStyle=a[0]==='C'?'#fff':'#16241c';g.font=a[0]==='C'?'13px sans-serif':'10px sans-serif';g.fillText(a[0],cx+a[1]*s-4,cy+a[2]*s+4);});
  ro.innerHTML='<b style="color:'+C.y+'">'+m+'</b>　碳原子有 <b>4 個</b>鍵，可與其他碳或氫鍵結成鏈狀/環狀骨架，是有機物種類繁多的原因'+(m.indexOf('乙烯')>-1?'（含 C=C 雙鍵）':'');
  requestAnimationFrame(loop);})();};

// 生物分類（二分檢索）
S.classify=function(host){const g=cv(host,420,200);const c=ctrl(host);let path=[];
 const tree={q:'體內有脊椎骨嗎？',y:{q:'體表覆有羽毛/毛髮？',y:{r:'哺乳類或鳥類(恆溫脊椎動物)'},n:{q:'生活在水中用鰓？',y:{r:'魚類'},n:{r:'兩生類/爬蟲類'}}},n:{q:'身體分節、有外骨骼？',y:{r:'節肢動物(昆蟲/蝦蟹)'},n:{r:'其他無脊椎(軟體/腔腸…)'}}};
 let node=tree;const ro=readout(host);
 function render(){c.querySelectorAll('button').forEach&&Array.prototype.forEach.call(c.querySelectorAll('button'),b=>b.remove());
  if(node.r){const rb=el('<button style="cursor:pointer;background:'+C.b+';color:#16241c;border:none;border-radius:8px;padding:5px 12px;font-weight:700">重新開始</button>');rb.onclick=function(){node=tree;path=[];render();};c.appendChild(rb);}
  else{['是','否'].forEach(ans=>{const b=el('<button style="cursor:pointer;background:'+C.y+';color:#16241c;border:none;border-radius:8px;padding:5px 14px;font-weight:700">'+ans+'</button>');b.onclick=function(){path.push(node.q+' → '+ans);node=ans==='是'?node.y:node.n;render();};c.appendChild(b);});}
  draw();}
 function draw(){g.clearRect(0,0,420,200);g.fillStyle=C.chalk;g.font='14px sans-serif';if(node.r){g.fillStyle=C.g;g.fillText('✔ 分類結果：'+node.r,20,40);}else{g.fillText('問題：'+node.q,20,40);}g.font='12px sans-serif';g.fillStyle='rgba(244,241,232,.7)';path.forEach((p,i)=>g.fillText(p,20,80+i*22));
  ro.innerHTML='<b style="color:'+C.y+'">二分檢索表</b>：依「是/否」特徵逐步分岔，將生物逐層歸類（分類階層：界→門→綱→目→科→屬→種）';}
 render();};

// 天平測質量
S.massbalance=function(host){const obj=70;let load=0;const g=cv(host,420,200);const c=ctrl(host);
 [10,50,100].forEach(wv=>{const b=el('<button style="cursor:pointer;background:'+C.y+';color:#16241c;border:none;border-radius:8px;padding:5px 12px;font-weight:700">+'+wv+'g</button>');b.onclick=function(){load+=wv;};c.appendChild(b);});
 const br=el('<button style="cursor:pointer;background:none;color:'+C.b+';border:1px solid rgba(159,200,216,.4);border-radius:8px;padding:5px 12px;font-weight:700">歸零</button>');br.onclick=function(){load=0;};c.appendChild(br);
 const ro=readout(host);let ang=0;
 (function loop(){const target=Math.max(-0.14,Math.min(0.14,(load-obj)*0.004));ang+=(target-ang)*0.1;g.clearRect(0,0,420,200);
  const px=210,py=60;g.strokeStyle=C.chalk;g.lineWidth=3;g.beginPath();g.moveTo(px,py);g.lineTo(px,170);g.stroke();
  g.save();g.translate(px,py);g.rotate(ang);g.beginPath();g.moveTo(-120,0);g.lineTo(120,0);g.stroke();
  g.fillStyle='rgba(168,208,160,.5)';g.fillRect(-135,0,40,26);g.fillStyle='rgba(159,200,216,.4)';g.fillRect(95,0,40,26);
  g.fillStyle=C.chalk;g.font='12px sans-serif';g.fillText('物體',-128,18);g.fillText('砝碼',102,18);g.restore();
  ro.innerHTML=load===obj?'<b style="color:'+C.g+'">天平平衡</b>！砝碼共 '+load+' g = 物體質量 <b style="color:'+C.y+'">'+obj+' g</b>':'目前砝碼 '+load+' g　'+(load<obj?'太輕，繼續加':'太重，請減少')+'（天平兩側力矩相等才平衡）';
  requestAnimationFrame(loop);})();};

// 科學方法流程
S.scimethod=function(host){const st=['觀察現象','提出問題','建立假設','設計實驗','分析→結論'];let i=0;const g=cv(host,420,180);const c=ctrl(host);
 const b=el('<button style="cursor:pointer;background:'+C.y+';color:#16241c;border:none;border-radius:8px;padding:5px 14px;font-weight:700">下一步 ▶</button>');b.onclick=function(){i=(i+1)%5;};c.appendChild(b);
 const ro=readout(host);
 (function loop(){g.clearRect(0,0,420,180);const cx=210,cy=90;g.font='12px sans-serif';for(let k=0;k<5;k++){const a=-Math.PI/2+k/5*Math.PI*2;const x=cx+Math.cos(a)*70,y=cy+Math.sin(a)*55;g.fillStyle=k===i?C.y:'rgba(159,200,216,.25)';g.beginPath();g.arc(x,y,26,0,7);g.fill();g.fillStyle=k===i?'#16241c':C.chalk;const w=st[k];g.fillText(w.length>3?w.slice(0,3):w,x-(w.length>3?18:15),y-2);if(w.length>3)g.fillText(w.slice(3),x-12,y+12);}
  ro.innerHTML='科學方法：<b style="color:'+C.y+'">'+st[i]+'</b>　（觀察→問題→假設→實驗驗證→結論，必要時修正假設再實驗，循環求證）';
  requestAnimationFrame(loop);})();};

// 物理變化 vs 化學變化
S.property=function(host){let mode='物理';const g=cv(host,340,200);const c=ctrl(host);
 ['物理變化','化學變化'].forEach(x=>{const b=el('<button style="cursor:pointer;background:'+(x==='物理變化'?C.y:'none')+';color:'+(x==='物理變化'?'#16241c':C.b)+';border:1px solid rgba(159,200,216,.4);border-radius:8px;padding:5px 12px;font-weight:700">'+x+'</button>');b.onclick=function(){mode=x[0]==='物'?'物理':'化學';Array.prototype.forEach.call(c.querySelectorAll('button'),function(z){z.style.background='none';z.style.color=C.b;});b.style.background=C.y;b.style.color='#16241c';};c.appendChild(b);});
 const ro=readout(host);let t=0;
 (function loop(){t+=0.02;if(t>1)t=0;g.clearRect(0,0,340,200);g.font='13px sans-serif';
  if(mode==='物理'){const melt=t;g.fillStyle='rgba(159,200,216,'+(1-melt*0.5)+')';g.fillRect(130,60-melt*20,80,60+melt*20);g.fillStyle='rgba(100,150,220,.5)';g.fillRect(120,150,100,20*melt+5);g.fillStyle=C.chalk;g.fillText('冰 → 水（只是狀態改變）',80,40);}
  else{const bn=t;g.fillStyle='rgba(220,200,160,'+(1-bn)+')';g.fillRect(140,90,60,50);for(let k=0;k<5;k++){const yy=(t*80+k*16)%80;g.fillStyle='rgba(120,120,120,'+(1-yy/80).toFixed(2)+')';g.beginPath();g.arc(150+k*10,85-yy,5,0,7);g.fill();}g.fillStyle=C.r;g.font='18px sans-serif';g.fillText('🔥',160,165);g.fillStyle=C.chalk;g.font='13px sans-serif';g.fillText('紙燃燒 → 灰＋氣體（新物質）',70,40);}
  ro.innerHTML=mode==='物理'?'<b style="color:'+C.b+'">物理變化</b>：沒有產生新物質、通常可逆（三態變化、溶解、形狀改變）':'<b style="color:'+C.r+'">化學變化</b>：產生<b>新物質</b>、常不可逆（燃燒、生鏽、酸鹼中和、發酵）';
  requestAnimationFrame(loop);})();};

// 純物質與混合物
S.puremix=function(host){let mode='元素';const g=cv(host,340,200);const c=ctrl(host);
 ['元素','化合物','混合物'].forEach(x=>{const b=el('<button style="cursor:pointer;background:'+(x==='元素'?C.y:'none')+';color:'+(x==='元素'?'#16241c':C.b)+';border:1px solid rgba(159,200,216,.4);border-radius:8px;padding:5px 12px;font-weight:700">'+x+'</button>');b.onclick=function(){mode=x;Array.prototype.forEach.call(c.querySelectorAll('button'),function(z){z.style.background='none';z.style.color=C.b;});b.style.background=C.y;b.style.color='#16241c';};c.appendChild(b);});
 const ro=readout(host);
 (function loop(){g.clearRect(0,0,340,200);for(let r=0;r<4;r++)for(let col=0;col<6;col++){const x=50+col*45,y=45+r*40;if(mode==='元素'){g.fillStyle=C.b;g.beginPath();g.arc(x,y,10,0,7);g.fill();}else if(mode==='化合物'){g.fillStyle=C.b;g.beginPath();g.arc(x-5,y,9,0,7);g.fill();g.fillStyle=C.r;g.beginPath();g.arc(x+6,y,7,0,7);g.fill();}else{const pick=(r*6+col)%3;if(pick===0){g.fillStyle=C.b;g.beginPath();g.arc(x,y,10,0,7);g.fill();}else if(pick===1){g.fillStyle=C.g;g.beginPath();g.arc(x,y,9,0,7);g.fill();}else{g.fillStyle=C.b;g.beginPath();g.arc(x-5,y,8,0,7);g.fill();g.fillStyle=C.r;g.beginPath();g.arc(x+5,y,6,0,7);g.fill();}}}
  const txt={'元素':'單一種原子，無法再用化學方法分解','化合物':'兩種以上元素以<b>固定比例</b>化合，性質全新','混合物':'多種物質<b>任意比例</b>混合，各保留原性質、可用物理方法分離'}[mode];
  ro.innerHTML='<b style="color:'+C.y+'">'+mode+'</b>（'+(mode==='混合物'?'非純物質':'純物質')+'）：'+txt;
  requestAnimationFrame(loop);})();};

// 能源與能量轉換
S.energysource=function(host){const chain={'火力發電(非再生)':['化學能(煤/油)','熱能','動能(汽輪機)','電能'],'水力發電(再生)':['位能(高處水)','動能','電能'],'太陽能(再生)':['太陽光能','電能'],'風力發電(再生)':['風的動能','電能']};
 let s='火力發電(非再生)';const g=cv(host,440,160);const c=ctrl(host);
 const w=el('<label style="font-size:13px;color:'+C.b+'">能源：<select style="font-size:14px"><option>火力發電(非再生)</option><option>水力發電(再生)</option><option>太陽能(再生)</option><option>風力發電(再生)</option></select></label>');w.querySelector('select').onchange=e=>s=e.target.value;c.appendChild(w);
 const ro=readout(host);let t=0;
 (function loop(){t+=0.02;g.clearRect(0,0,440,160);const ch=chain[s];const gap=420/ch.length;g.font='12px sans-serif';
  ch.forEach((e,i)=>{const x=20+i*gap+gap/2-30;g.fillStyle=i===ch.length-1?C.y:'rgba(159,200,216,.3)';g.fillRect(x,60,64,40);g.fillStyle=i===ch.length-1?'#16241c':C.chalk;g.fillText(e.length>5?e.slice(0,4):e,x+4,78);if(e.length>5)g.fillText(e.slice(4),x+4,94);if(i<ch.length-1){g.fillStyle=C.chalk;g.fillText('→',x+66,84);}});
  ro.innerHTML='<b style="color:'+C.y+'">'+s+'</b>　能量轉換：'+ch.join(' → ')+'　（再生能源可不斷補充、較潔淨；化石燃料有限且排碳）';
  requestAnimationFrame(loop);})();};

// 家庭用電與安全（並聯/保險絲）
S.household=function(host){let n=3;const g=cv(host,420,200);const c=ctrl(host);
 slider(c,'同時使用的家電數',1,8,n,1,v=>n=v);const ro=readout(host);const lim=15;
 (function loop(){const total=n*3;const over=total>lim;g.clearRect(0,0,420,200);
  g.strokeStyle=over?C.r:C.chalk;g.lineWidth=2;g.beginPath();g.moveTo(30,40);g.lineTo(390,40);g.moveTo(30,160);g.lineTo(390,160);g.stroke();
  for(let i=0;i<n;i++){const x=60+i*42;g.strokeStyle=over?'rgba(232,160,160,.6)':C.b;g.beginPath();g.moveTo(x,40);g.lineTo(x,70);g.stroke();g.fillStyle=over?C.r:C.g;g.fillRect(x-12,70,24,20);g.beginPath();g.moveTo(x,90);g.lineTo(x,160);g.stroke();g.fillStyle=C.chalk;g.font='10px sans-serif';g.fillText('3A',x-7,105);}
  g.fillStyle=over?C.r:C.y;g.fillRect(180,12,60,20);g.fillStyle='#16241c';g.font='11px sans-serif';g.fillText(over?'保險絲熔斷':'保險絲',188,26);
  ro.innerHTML='並聯家電電流相加：總電流 = '+n+'×3 = <b style="color:'+(over?C.r:C.y)+'">'+total+' A</b>（上限 '+lim+'A）'+(over?'　→ <b style="color:'+C.r+'">過載！保險絲/斷路器切斷電源保護</b>':'　安全範圍內');
  requestAnimationFrame(loop);})();};

// 資源永續
S.sustain=function(host){let use=5;const g=cv(host,400,180);const c=ctrl(host);
 slider(c,'消耗速率',1,10,use,1,v=>use=v);const ro=readout(host);let stock=60;const regen=5;
 (function loop(){stock+=(regen-use)*0.15;if(stock>100)stock=100;if(stock<0)stock=0;g.clearRect(0,0,400,180);
  g.strokeStyle='rgba(244,241,232,.3)';g.strokeRect(40,30,320,80);g.fillStyle=stock<20?C.r:(use<=regen?C.g:C.y);g.fillRect(41,31,318*stock/100,78);
  g.fillStyle=C.chalk;g.font='13px sans-serif';g.fillText('資源存量 '+stock.toFixed(0)+'%',150,150);g.fillText('再生速率 '+regen,60,25);
  ro.innerHTML=use<=regen?'<b style="color:'+C.g+'">永續</b>：消耗 ≤ 再生速率，資源可維持（如適度捕撈、造林）':'<b style="color:'+C.r+'">過度耗用</b>：消耗 > 再生，資源逐漸枯竭 → 需節約、回收(3R)、開發替代資源';
  requestAnimationFrame(loop);})();};

// 生物的特徵
S.lifechar=function(host){const ch=['需要營養','進行呼吸/代謝','能生長發育','能繁殖後代','對刺激有感應','能適應與演化'];let n=1;const g=cv(host,420,170);const c=ctrl(host);
 const b=el('<button style="cursor:pointer;background:'+C.y+';color:#16241c;border:none;border-radius:8px;padding:5px 14px;font-weight:700">再顯示一項 ▶</button>');b.onclick=function(){n=n>=6?1:n+1;};c.appendChild(b);
 const ro=readout(host);
 (function loop(){g.clearRect(0,0,420,170);g.font='14px sans-serif';for(let i=0;i<6;i++){g.fillStyle=i<n?C.g:'rgba(120,120,120,.3)';g.fillText((i<n?'✔ ':'○ ')+ch[i],40+ (i%2)*200,40+Math.floor(i/2)*40);}
  ro.innerHTML='<b style="color:'+C.y+'">生物的共同特徵</b>：'+ch.slice(0,n).join('、')+'　（同時具備這些才算生物；病毒因無細胞構造、需寄主才能繁殖，介於生物與非生物之間）';
  requestAnimationFrame(loop);})();};

// 內分泌與血糖調節（負回饋）
S.endocrine=function(host){let sugar=90,p=0;const g=cv(host,440,180);const c=ctrl(host);
 const be=el('<button style="cursor:pointer;background:'+C.r+';color:#16241c;border:none;border-radius:8px;padding:5px 12px;font-weight:700">進食</button>');be.onclick=function(){p=60;};c.appendChild(be);
 const bx=el('<button style="cursor:pointer;background:'+C.b+';color:#16241c;border:none;border-radius:8px;padding:5px 12px;font-weight:700">運動</button>');bx.onclick=function(){p=-50;};c.appendChild(bx);
 const ro=readout(host);const hist=[];
 (function loop(){sugar+=p*0.03;p*=0.92;sugar+=(90-sugar)*0.04;hist.push(sugar);if(hist.length>400)hist.shift();
  g.clearRect(0,0,440,180);g.strokeStyle='rgba(168,208,160,.5)';g.setLineDash([4,4]);g.beginPath();g.moveTo(30,90);g.lineTo(430,90);g.stroke();g.setLineDash([]);g.fillStyle=C.g;g.font='11px sans-serif';g.fillText('正常 ~90 mg/dL',30,84);
  g.strokeStyle=C.y;g.lineWidth=2;g.beginPath();hist.forEach((v,i)=>{const y=90-(v-90)*1.4;i?g.lineTo(30+i,y):g.moveTo(30+i,y);});g.stroke();
  const act=sugar>105?'胰島素分泌↑ → 降血糖':(sugar<78?'升糖素分泌↑ → 升血糖':'維持恆定');ro.innerHTML='血糖 <b style="color:'+C.y+'">'+sugar.toFixed(0)+' mg/dL</b>　胰島(內分泌)以<b>負回饋</b>調節：'+act+'（激素經血液運送、作用慢而持久）';
  requestAnimationFrame(loop);})();};

// 基因突變
S.mutation=function(host){const bases=['A','T','G','C','A','T','G','G','C','A','T','C'];let seq=bases.slice();let mut=-1;const g=cv(host,440,160);const c=ctrl(host);
 const b=el('<button style="cursor:pointer;background:'+C.y+';color:#16241c;border:none;border-radius:8px;padding:5px 14px;font-weight:700">發生突變</button>');b.onclick=function(){mut=Math.floor(Math.random()*seq.length);const o={'A':'T','T':'A','G':'C','C':'G'};let nb=['A','T','G','C'].filter(x=>x!==seq[mut]);seq[mut]=nb[Math.floor(Math.random()*3)];};c.appendChild(b);
 const br=el('<button style="cursor:pointer;background:none;color:'+C.b+';border:1px solid rgba(159,200,216,.4);border-radius:8px;padding:5px 12px;font-weight:700">重設</button>');br.onclick=function(){seq=bases.slice();mut=-1;};c.appendChild(br);
 const ro=readout(host);const col={'A':C.r,'T':C.b,'G':C.g,'C':C.y};
 (function loop(){g.clearRect(0,0,440,160);g.font='15px sans-serif';seq.forEach((bp,i)=>{const x=30+i*33;g.fillStyle=i===mut?'#fff':col[bp];g.fillRect(x,60,26,30);g.strokeStyle=i===mut?C.r:'transparent';g.lineWidth=3;g.strokeRect(x,60,26,30);g.fillStyle='#16241c';g.fillText(bp,x+8,81);});
  ro.innerHTML=mut>=0?'第 '+(mut+1)+' 個鹼基改變 → <b style="color:'+C.r+'">基因突變</b>：可能改變蛋白質胺基酸序列→性狀改變。突變是<b>變異與演化</b>的來源(也是生物技術的基礎)':'DNA 由 A、T、G、C 四種鹼基排列。按「發生突變」看鹼基序列改變';
  requestAnimationFrame(loop);})();};

// 生物多樣性與保育
S.biodiversity=function(host){let dmg=20;const g=cv(host,420,200);const c=ctrl(host);
 slider(c,'棲地破壞(%)',0,80,dmg,10,v=>dmg=v);const ro=readout(host);const cols=['#e8a0a0','#9fc8d8','#a8d0a0','#f0d878','#c8a0e8','#e8c0a0','#a0e8d0','#d0d0a0'];
 (function loop(){g.clearRect(0,0,420,200);const total=32;const alive=Math.round(total*(1-dmg/100));g.fillStyle='rgba(120,90,60,'+(0.15+dmg/100*0.4)+')';g.fillRect(0,0,420,200);
  let cnt=0;for(let r=0;r<4;r++)for(let col=0;col<8;col++){if(cnt<alive){g.fillStyle=cols[(r*8+col)%cols.length];g.beginPath();g.arc(40+col*46,40+r*42,11,0,7);g.fill();}cnt++;}
  ro.innerHTML='棲地破壞 '+dmg+'% → 存活物種數 <b style="color:'+(alive<12?C.r:C.y)+'">'+alive+'/'+total+'</b>　棲地破壞/污染/外來種使<b>生物多樣性下降</b>；保育(保護區、復育)維持多樣性與生態平衡';
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
