/* Original teaching diagrams. Rendering: SVG.js (MIT), scales and paths: D3 (ISC). */
(function(root,factory){
  if(typeof module==='object'&&module.exports)module.exports=factory;
  else root.ScienceArt=factory(root.SVG,root.d3);
})(typeof globalThis!=='undefined'?globalThis:this,function(SVG,d3){
 'use strict';
 const C={ink:'#17324d',muted:'#52677d',blue:'#176ca4',teal:'#087f83',orange:'#c4671d',red:'#bb3f4e',line:'#bdcddd',paper:'#f5f9fc',water:'#d4edf7',green:'#6c9270',purple:'#7051a0'};
 const F='Noto Sans CJK TC, Microsoft JhengHei, PingFang TC, sans-serif';
 function base(title,subtitle=''){
  const s=SVG.SVG().size(960,560).viewbox(0,0,960,560).attr({role:'img','aria-label':title,xmlns:'http://www.w3.org/2000/svg'});
  s.rect(960,560).fill('#fff');
  s.rect(6,44).move(28,25).radius(3).fill(C.teal);
  txt(s,48,48,title,25,C.ink,'start',700);
  if(subtitle)txt(s,48,78,subtitle,16,C.muted);
  return s;
 }
 function txt(s,x,y,t,size=19,color=C.ink,anchor='start',weight=500){return s.plain(String(t)).font({family:F,size,weight}).fill(color).attr({x,y,'text-anchor':anchor,style:`font-size:${size}px;fill:${color};font-weight:${weight}`});}
 function lines(s,x,y,t,width=19,size=18,color=C.muted){
  const chunks=String(t).split('\n').flatMap(v=>{const a=Array.from(v),r=[];while(a.length)r.push(a.splice(0,width).join(''));return r;});
  chunks.forEach((v,i)=>txt(s,x,y+i*(size*1.6),v,size,color));return chunks.length*size*1.6;
 }
 function line(s,x1,y1,x2,y2,color=C.line,w=2,dash){const a=s.line(x1,y1,x2,y2).stroke({color,width:w,linecap:'round'});if(dash)a.attr({'stroke-dasharray':dash});return a;}
 function arrow(s,x1,y1,x2,y2,color=C.blue,w=3,dash){
  line(s,x1,y1,x2,y2,color,w,dash);const a=Math.atan2(y2-y1,x2-x1),r=10;
  s.polygon([[x2,y2],[x2-r*Math.cos(a-.5),y2-r*Math.sin(a-.5)],[x2-r*Math.cos(a+.5),y2-r*Math.sin(a+.5)]]).fill(color);}
 function path(s,d,color=C.blue,w=3,fill='none',dash){const p=s.path(d).fill(fill).stroke({color,width:w,linecap:'round',linejoin:'round'});if(dash)p.attr({'stroke-dasharray':dash});return p;}
 function panel(s,x,y,w,h,title,n){s.rect(w,h).move(x,y).radius(16).fill(C.paper).stroke({color:'#dce6ee',width:1});if(n){s.circle(28).center(x+26,y+28).fill(C.teal);txt(s,x+26,y+34,n,16,'white','middle',700);}const maxChars=Math.floor((w-(n?70:40))/19);lines(s,x+(n?49:20),y+35,title,maxChars,19,C.ink);}
 function footer(s,a,b){line(s,32,475,928,475);txt(s,40,507,a,19,C.ink,'start',600);if(b)txt(s,40,538,b,16,C.muted);}
 function label(s,x,y,t,color=C.ink){txt(s,x,y,t,18,color);}
 function badge(s,x,y,t,color=C.teal){const w=Array.from(t).length*18+26;s.rect(w,32).move(x,y-24).radius(7).fill(color);txt(s,x+13,y,t,17,'white','start',700);}
 function dot(s,x,y,r,color,sign){s.circle(r*2).center(x,y).fill(color).stroke({color:'white',width:2});if(sign)txt(s,x,y+6,sign,17,'white','middle',700);}
 function beaker(s,x,y,w=130,h=150,level=.65,fill=C.water){
  const surface=y+h*(1-level);if(level>.03){s.rect(w-12,Math.max(0,h*level-6)).move(x+6,surface).fill(fill);s.ellipse(w-12,13).center(x+w/2,surface).fill(fill).stroke({color:C.blue,width:1});}
  path(s,`M${x-5} ${y}L${x+5} ${y+8}V${y+h-8}Q${x+5} ${y+h} ${x+13} ${y+h}H${x+w-13}Q${x+w-5} ${y+h} ${x+w-5} ${y+h-8}V${y+8}L${x+w+5} ${y}`,C.muted,3);
  for(let i=1;i<5;i++)line(s,x+w-27,y+h-i*h/5,x+w-8,y+h-i*h/5,C.muted,1.5);
 }
 function globe(s,x,y,r=55){s.circle(r*2).center(x,y).fill('#d4edf7').stroke({color:C.blue,width:2});path(s,`M${x-r*.55} ${y-r*.65}l${r*.35} ${-r*.12} ${r*.2} ${r*.32} ${-r*.2} ${r*.42} ${r*.18} ${r*.55} ${-r*.28} ${r*.27} ${-r*.15} ${-r*.6} ${-r*.3} ${-r*.22}Z`,C.green,1,C.green);path(s,`M${x+r*.2} ${y-r*.48}l${r*.46} ${r*.3} ${-r*.1} ${r*.25} ${-r*.35} ${r*.18} ${-r*.08} ${r*.5} ${-r*.15} ${-r*.35}Z`,C.green,1,C.green);}
 function sun(s,x,y,r=35){s.circle(r*2).center(x,y).fill('#f6d17a').stroke({color:C.orange,width:2});for(let i=0;i<12;i++){let a=i*Math.PI/6;line(s,x+(r+9)*Math.cos(a),y+(r+9)*Math.sin(a),x+(r+20)*Math.cos(a),y+(r+20)*Math.sin(a),C.orange,2);}}
 function cloud(s,x,y,k=1){path(s,`M${x-55*k} ${y+20*k}C${x-95*k} ${y+15*k} ${x-83*k} ${y-30*k} ${x-42*k} ${y-24*k}C${x-33*k} ${y-75*k} ${x+35*k} ${y-70*k} ${x+48*k} ${y-26*k}C${x+100*k} ${y-33*k} ${x+104*k} ${y+26*k} ${x+62*k} ${y+26*k}Z`,C.line,2,'#eef4f8');}
 function resistor(s,x,y,w=90){line(s,x-25,y,x,y,C.ink,3);s.rect(w,30).move(x,y-15).radius(3).fill('#fff4e5').stroke({color:C.orange,width:2.5});line(s,x+w,y,x+w+25,y,C.ink,3);}
 function molecule(s,x,y,type='water',k=1){
  if(type==='water'){line(s,x,y,x-30*k,y+26*k,C.muted,4);line(s,x,y,x+30*k,y+26*k,C.muted,4);dot(s,x,y,22*k,C.red,'O');dot(s,x-30*k,y+26*k,14*k,C.blue,'H');dot(s,x+30*k,y+26*k,14*k,C.blue,'H');}
  else {let color=type==='oxygen'?C.red:C.blue,sign=type==='oxygen'?'O':'H';line(s,x-18*k,y,x+18*k,y,C.muted,5);dot(s,x-18*k,y,18*k,color,sign);dot(s,x+18*k,y,18*k,color,sign);}
 }
 function finish(s){return s.svg();}
 function plot({title,subtitle='',points,xLabel,yLabel,series,bars,marker}){
  const s=base(title,subtitle),left=104,right=900,top=128,bottom=414;
  if(bars){
   const values=bars.map(v=>v[1]),scale=d3.scaleLinear().domain([Math.min(0,...values),Math.max(1,...values)]).nice().range([left+150,right-100]);
   const h=Math.min(68,290/bars.length);scale.ticks(5).forEach(v=>{let x=scale(v);line(s,x,top-12,x,bottom,C.line,1,'3 5');txt(s,x,444,d3.format('~g')(v),16,C.muted,'middle');});
   bars.forEach(([name,value],i)=>{let y=top+i*h;txt(s,left+128,y+24,name,18,C.ink,'end');s.rect(Math.max(1,Math.abs(scale(value)-scale(0))),30).move(Math.min(scale(value),scale(0)),y+2).radius(4).fill(i%2?C.teal:C.blue);txt(s,scale(value)+(value<0?-10:12),y+24,Number(value.toFixed(2)),18,C.ink,value<0?'end':'start',700);});
   footer(s,yLabel||'數值比較','各長條由 0 起算；名稱與數值同時標示。');return finish(s);
  }
  const sets=series||[{name:yLabel,points}],all=sets.flatMap(v=>v.points),xs=d3.scaleLinear().domain([Math.min(0,...all.map(v=>v.x)),Math.max(1,...all.map(v=>v.x))]).nice().range([left,right]),ys=d3.scaleLinear().domain([Math.min(0,...all.map(v=>v.y)),Math.max(1,...all.map(v=>v.y))]).nice().range([bottom,top]);
  ys.ticks(5).forEach(v=>{line(s,left,ys(v),right,ys(v),C.line,1,'3 5');txt(s,left-15,ys(v)+6,d3.format('~g')(v),16,C.muted,'end');});
  xs.ticks(7).forEach(v=>{line(s,xs(v),bottom,xs(v),bottom+6,C.muted,1);txt(s,xs(v),bottom+28,d3.format('~g')(v),16,C.muted,'middle');});
  line(s,left,top-5,left,bottom,C.ink,2);line(s,left,ys(0),right,ys(0),C.ink,2);txt(s,left,105,yLabel,18,C.ink);txt(s,(left+right)/2,473,xLabel,18,C.ink,'middle');
  sets.forEach((set,i)=>{let color=[C.blue,C.orange,C.teal][i%3];path(s,d3.line().x(v=>xs(v.x)).y(v=>ys(v.y))(set.points),color,3.5,'none',i===1?'8 5':null);if(set.points.length<=12)set.points.forEach(v=>dot(s,xs(v.x),ys(v.y),4,color));if(sets.length>1){line(s,130+i*245,521,165+i*245,521,color,4,i===1?'8 5':null);txt(s,176+i*245,527,set.name,17,C.ink);}});
  if(marker){line(s,xs(marker.x),ys(marker.y),xs(marker.x),bottom,C.orange,1.5,'4 4');dot(s,xs(marker.x),ys(marker.y),7,C.orange);badge(s,Math.min(720,Math.max(115,xs(marker.x)-40)),Math.max(130,ys(marker.y)-24),`${Number(marker.y.toFixed(2))}`,C.orange);}
  if(sets.length===1)txt(s,40,538,'讀圖順序：看橫軸與縱軸 → 找座標 → 比較變化。',17,C.muted);
  return finish(s);
 }
 function concepts({title,items,type='compare'}){
  const s=base(title,type==='flow'?'沿箭頭依序追蹤條件與結果':'先比較相同條件，再找差異');
  const list=items.slice(0,4),w=list.length<=3?278:208,gap=list.length<=3?29:22,start=(960-list.length*w-(list.length-1)*gap)/2;
  list.forEach((it,i)=>{let x=start+i*(w+gap);panel(s,x,128,w,302,it.label,i+1);line(s,x+22,190,x+w-22,190,C.line,1);lines(s,x+22,224,it.detail,Math.floor((w-44)/18),18);if(type==='flow'&&i<list.length-1)arrow(s,x+w+4,282,x+w+gap-5,282,C.teal,3);});
  footer(s,'用自己的話說明每一格之間的關係。','箭頭表示順序或因果；並不代表物質必定只往單一方向變化。');return finish(s);
 }
 function scene(kind,o={}){
  const s=base(o.title||kind,o.subtitle||'觀察圖中的標示，再對照下方重點');
  switch(kind){
   case 'atom':{
    const p=o.p??6,n=o.n??6,e=o.e??6,cx=292,cy=271;
    s.ellipse(380,278).center(cx,cy).fill('#f0f7fc').stroke({color:'#adc8df',width:1.5,dasharray:'5 7'});
    for(let i=0;i<p+n;i++){let a=i*2.399,r=11*Math.sqrt(i);dot(s,cx+Math.cos(a)*r,cy+Math.sin(a)*r,9,i<p?C.red:C.muted);}
    for(let i=0;i<e;i++){let a=2*Math.PI*i/Math.max(e,1);dot(s,cx+190*Math.cos(a),cy+139*Math.sin(a),9,C.blue,'−');}
    line(s,324,251,506,183,C.red,1.5);line(s,294,306,506,275,C.muted,1.5);line(s,481,271,506,365,C.blue,1.5);
    [[183,'質子 p⁺',p,'決定元素種類',C.red],[275,'中子 n⁰',n,'質量數＝質子數＋中子數',C.muted],[365,'電子 e⁻',e,'電荷數＝質子數－電子數',C.blue]].forEach(([y,t,v,note,c])=>{dot(s,538,y-6,10,c);txt(s,564,y,t+'  '+v+' 個',22,C.ink,'start',700);txt(s,564,y+30,note,17,C.muted);});
    footer(s,`原子核包含 ${p} 個質子與 ${n} 個中子；核外以圓點表示 ${e} 個電子。`,'電子區域、粒子大小與距離為示意，虛線不是電子的真實運動軌道。');break;
   }
   case 'periodic':{
    const cells=[['Li',3,1,2],['Na',11,1,3],['Mg',12,2,3],['Cl',17,17,3],['Ar',18,18,3]],cols=[1,2,17,18];
    cols.forEach((c,i)=>txt(s,241+i*173,149,`第 ${c} 族`,20,C.ink,'middle',700));
    [2,3].forEach((r,j)=>{txt(s,77,238+j*138,`第${r}週期`,20,C.muted);cols.forEach((c,i)=>{let x=171+i*173,y=181+j*138;const el=cells.find(v=>v[2]===c&&v[3]===r);s.rect(138,104).move(x,y).radius(10).fill(c===1?'#dcefea':C.paper).stroke({color:c===1?C.teal:C.line,width:c===1?2:1});if(el){txt(s,x+16,y+26,el[1],18,C.muted);txt(s,x+69,y+73,el[0],34,C.ink,'middle',700);}else txt(s,x+69,y+62,'…',23,C.muted,'middle');});});
    footer(s,'直行是族，橫列是週期；鋰 Li 與鈉 Na 同屬第 1 族。','節錄部分元素；空格表示此圖省略，並不代表週期表沒有該元素。');break;
   }
   case 'rust':{
    [['乾燥空氣','缺少水分'],['煮沸水＋油層','隔絕外界氧'],['潮濕空氣','水與氧同時存在']].forEach(([t,n],i)=>{let x=40+i*307;panel(s,x,122,278,317,t,i+1);beaker(s,x+73,199,136,181,i===0?.01:.72);if(i===1)s.rect(124,15).move(x+79,249).fill('#e8cb7e');s.rect(13,96).move(x+133,273).rotate(16).fill(i===2?'#b46f3f':'#7e8e9b');s.rect(39,8).move(x+120,266).rotate(16).fill(i===2?'#b46f3f':'#7e8e9b');txt(s,x+139,416,n,18,C.ink,'middle');});footer(s,'比較相同鐵釘、溫度與時間；生鏽需要水和氧參與。','煮沸可降低溶氧，冷卻時仍須隔氧；鹽常加速鏽蝕，但不是必要條件。');break;
   }
   case 'orbit':{
    sun(s,480,275,41);s.ellipse(650,252).center(480,275).fill('none').stroke({color:C.line,width:2,dasharray:'6 6'});[[164,275,'北半球夏季'],[795,275,'北半球冬季']].forEach(([x,y,t])=>{globe(s,x,y,59);line(s,x-36,y+83,x+36,y-83,C.ink,2.5);txt(s,x,y-104,t,23,C.ink,'middle',700);txt(s,x+55,y-62,'N',18,C.ink);});arrow(s,416,243,251,243,C.orange,3);arrow(s,542,243,714,243,C.orange,3);txt(s,480,432,'地軸傾斜方向在公轉中近似不變',21,C.ink,'middle');footer(s,'四季主要來自地軸傾斜造成的日照角度與晝長差異。','北半球夏季朝向太陽傾斜；圖中的軌道形狀、地球與太陽大小均為示意。');break;
   }
   case 'lowpressure':{
    const cx=480,cy=280;[71,128,186].forEach(r=>s.circle(r*2).center(cx,cy).fill('none').stroke({color:C.line,width:2}));txt(s,cx,cy+10,'低',37,C.blue,'middle',700);
    for(let i=0;i<4;i++){let a=i*Math.PI/2,x1=cx+190*Math.cos(a),y1=cy-160*Math.sin(a),x2=cx+100*Math.cos(a+1),y2=cy-85*Math.sin(a+1);path(s,`M${x1} ${y1}Q${cx+180*Math.cos(a+.6)} ${cy-150*Math.sin(a+.6)} ${x2} ${y2}`,C.blue,4);let xx=cx+87*Math.cos(a+1.12),yy=cy-74*Math.sin(a+1.12);arrow(s,x2,y2,xx,yy,C.blue,4);}
    txt(s,87,161,'北半球',22,C.ink,'start',700);txt(s,720,211,'近地面風：',21,C.ink);txt(s,720,246,'逆時針旋轉',21,C.blue);txt(s,720,280,'向低壓中心輻合',20,C.blue);footer(s,'北半球近地面低壓：風向中心輻合，整體呈逆時針旋轉。','由上方俯視；南半球旋轉方向相反，風向也受摩擦與地形影響。');break;
   }
   case 'prism':{
    path(s,'M455 140L340 414H630Z',C.blue,2,'#e1edf5');arrow(s,91,256,406.3,256,C.ink,5);txt(s,112,218,'白光',22,C.ink);path(s,'M406.3 256L555.9 298',C.ink,4);['#bb3f4e','#bd641b','#957812','#398459','#176ca4','#6f52a0'].forEach((c,i)=>arrow(s,555.9,298,855,385+i*13,c,3));txt(s,806,359,'紅光',20,C.red);txt(s,870,454,'紫光',20,C.purple);txt(s,445,445,'三稜鏡',20,C.blue);footer(s,'白光包含不同色光；同一玻璃中，各色光折射程度不同而分開。','偏折角與稜鏡內的分光未按比例；紫光偏折通常大於紅光，實際色帶是連續的。');break;
   }
   case 'vision':{
    const groups=[['正常眼',0],['近視',-72],['遠視',30]];groups.forEach(([t,off],i)=>{let x=35+i*308;panel(s,x,126,282,307,t,i+1);s.ellipse(207,142).center(x+147,283).fill('#f9f1eb').stroke({color:C.muted,width:2});path(s,`M${x+59} 231Q${x+76} 283 ${x+59} 335Q${x+45} 283 ${x+59} 231Z`,C.blue,2,C.water);line(s,x+239,232,x+239,334,C.red,3);let fx=x+238+off;[-24,24].forEach(d=>{line(s,x+12,283+d,x+57,283+d,C.orange,2);line(s,x+57,283+d,fx,283,C.orange,2);});txt(s,x+141,402,['焦點落在視網膜','焦點在視網膜前','焦點在視網膜後'][i],17,C.ink,'middle');});footer(s,'近視用凹透鏡先使光發散；遠視用凸透鏡增加會聚。','圖中比較未矯正時的平行入射光；眼球大小與晶狀體厚度均為原理示意。');break;
   }
   case 'thermometer':{
    const t=o.temperature??25,x=331,baseY=399,scale=1.75,top=baseY-140*scale;s.rect(33,280).move(x-16,top-20).radius(16).fill('#edf3f7').stroke({color:C.muted,width:2});s.circle(63).center(x,baseY+15).fill('#edf3f7').stroke({color:C.muted,width:2});s.rect(15,(t+20)*scale+15).move(x-7,baseY-(t+20)*scale).radius(7).fill(C.red);s.circle(45).center(x,baseY+15).fill(C.red);for(let v=-20;v<=120;v+=10){let y=baseY-(v+20)*scale;line(s,x+23,y,x+37+(v%20===0?9:0),y,C.muted,1.5);if(v%20===0)txt(s,x+60,y+6,v+'°C',17,C.ink);}txt(s,594,229,`${t} °C`,43,C.red,'start',700);txt(s,594,287,`${Number((t*1.8+32).toFixed(1))} °F`,27,C.ink);txt(s,594,349,'液柱與溫標對照',21,C.muted);footer(s,'液體溫度計利用熱脹冷縮：達熱平衡後，平視液柱頂端讀值。','圖示溫度計量程 −20°C 至120°C；選用儀器時須確認實際量程。');break;
   }
   case 'particles':{
    const modes=o.modes||['固態','液態','氣態'];modes.forEach((name,i)=>{let x=40+i*307;panel(s,x,116,278,320,name,i+1);beaker(s,x+44,184,190,175,0.01,'white');
     for(let j=0;j<15;j++){let dx,dy;if(name==='固態'){dx=(j%5)*27;dy=Math.floor(j/5)*27;}else if(name==='液態'){dx=(j%5)*30+(Math.floor(j/5)%2)*7;dy=Math.floor(j/5)*32;}else{dx=(j*59%156);dy=(j*43%142)-75;}dot(s,x+75+dx,278+dy,8,C.blue);if(name==='氣態'&&j%4===0)arrow(s,x+75+dx,278+dy,x+92+dx,264+dy,C.orange,1.5);}
     txt(s,x+139,405,['位置附近振動','粒子可互相滑動','粒子分散、自由移動'][i],17,C.ink,'middle');});
    footer(s,'改變的是粒子排列、間距與運動方式。','同一種物質變換狀態時，不表示粒子本身變大或消失。');break;
   }
   case 'composition':{
    const names=['元素：只有一種原子','化合物：固定比例結合','混合物：多種物質共存'];names.forEach((name,i)=>{let x=40+i*307;panel(s,x,120,278,312,name);for(let j=0;j<6;j++){let px=x+73+(j%2)*127,py=222+Math.floor(j/2)*66;if(i===0)molecule(s,px,py,'oxygen',.65);else if(i===1)molecule(s,px,py,'water',.65);else molecule(s,px,py,j%2?'oxygen':'water',.65);}});
    footer(s,'先數「原子種類」，再看「粒子是否為同一種物質」。','藍色 H、紅色 O；粒子大小與間距未按真實比例。');break;
   }
   case 'reaction':{
    panel(s,36,122,378,307,'反應前：2 H₂ ＋ O₂');panel(s,548,122,378,307,'反應後：2 H₂O');
    molecule(s,139,243,'hydrogen');molecule(s,300,243,'hydrogen');molecule(s,220,348,'oxygen');molecule(s,649,283);molecule(s,824,283);arrow(s,442,277,520,277,C.teal,4);
    badge(s,75,400,'H：4 個　O：2 個');badge(s,586,400,'H：4 個　O：2 個');
    footer(s,'2 H₂ ＋ O₂ → 2 H₂O：每一種原子的總數都守恆。','化學反應重新組合原子；配平改係數，不改化學式下標。');break;
   }
   case 'meniscus':{
    const x=278,y=126,w=132,h=294;path(s,`M${x-10} ${y}H${x+w+10}M${x} ${y}V${y+h}H${x+w}V${y}`,C.muted,3);path(s,`M${x+3} 263Q${x+w/2} 283 ${x+w-3} 263V${y+h-3}H${x+3}Z`,C.blue,1,C.water);
    for(let v=10;v<=60;v+=2){let yy=410-v*4.5;line(s,x+w-3,yy,x+w-(v%10===0?29:17),yy,C.muted,1.3);if(v%10===0)txt(s,x+w+13,yy+5,v,17,C.muted);}
    line(s,170,273,794,273,C.teal,2,'6 5');path(s,'M729 273Q758 245 787 273Q758 301 729 273Z',C.ink,2,'white');dot(s,758,273,8,C.ink);
    arrow(s,552,192,358,272,C.orange,2);txt(s,553,180,'讀凹液面最低處',22,C.ink,'start',700);txt(s,610,326,'眼睛與液面同高',21,C.teal);txt(s,291,450,'mL',18,C.muted);
    footer(s,'水在玻璃量筒中通常呈凹液面；平視最低處，再依最小刻度估讀。','視線向下或向上偏斜容易產生視差；示意圖未呈現毛細作用細節。');break;
   }
   case 'displacement':{
    const before=o.before??25,volume=o.volume??18;
    [0,1].forEach(i=>{let x=160+i*442,amount=before+(i?volume:0);panel(s,x-92,123,328,320,i?'② 完全浸入物體':'① 先讀水面');beaker(s,x,190,145,196,amount/100);if(i){const hh=Math.min(volume/100*196,65);path(s,`M${x+20} 382L${x+30} ${382-hh}L${x+122} ${382-hh}L${x+128} 382Z`,C.muted,2,'#899bac');}for(let v=20;v<=80;v+=20)txt(s,x+155,386-v*1.96+5,v,14,C.muted);txt(s,x+73,414,amount+' mL',23,C.blue,'middle',700);});arrow(s,425,285,529,285,C.teal,4);
    footer(s,`物體體積＝放入後讀數－放入前讀數＝${before+volume}－${before}＝${volume} cm³。`,'物體須完全浸沒、不溶於液體；排除氣泡，並避免水濺出。');break;
   }
   case 'density':{
    const vals=[['體積相同',3,8,'粒子種類不同可造成密度不同'],['同一材質切割',6,3,'質量和體積同比例減少']];
    vals.forEach(([name,a,b,note],i)=>{let x=38+i*462;panel(s,x,122,424,316,name,i+1);[a,b].forEach((n,j)=>{let xx=x+67+j*190,ww=i&&j?57.5:115;s.rect(ww,115).move(xx,214).radius(6).fill(j?'#d8eeec':'#e0effa').stroke({color:j?C.teal:C.blue,width:2});for(let k=0;k<n;k++)dot(s,xx+(i&&j?28:19+(k%3)*30),237+(i&&j?k:Math.floor(k/3))*30,6,j?C.teal:C.blue);txt(s,xx+ww/2,367,i?(j?'一半質量／一半體積':'原來的物體'):(j?'質量較大':'質量較小'),17,C.ink,'middle');});txt(s,x+212,414,note,17,C.muted,'middle');});
    footer(s,'密度 ρ＝質量 m ÷ 體積 V；是每單位體積的質量。','圓點僅是質量比較符號，不代表實際原子數；同材質、同狀態下切割不改密度。');break;
   }
   case 'floating':{
    const liquid=o.liquid??1,ratio=o.rho===undefined?null:o.rho/liquid;
    const cases=ratio===null?[['漂浮',.65],['懸浮',1],['沉底',1.4]]:[[ratio<1?'漂浮':ratio===1?'懸浮':'沉底',ratio]];
    cases.forEach(([t,rho],i)=>{let x=cases.length===1?128:40+i*307,y=rho<1?227.4-62*(1-rho):rho===1?285:329;panel(s,x,115,278,325,t,i+1);beaker(s,x+26,185,226,212,.8);s.rect(70,62).move(x+104,y).radius(3).fill('#e5b982').stroke({color:C.orange,width:2});txt(s,x+139,421,`ρ物 ${rho===1?'＝':rho<1?'＜':'＞'} ρ液`,20,C.ink,'middle',700);});
    if(ratio!==null){txt(s,485,200,`物體密度：${o.rho.toFixed(2)} g/cm³`,24);txt(s,485,255,`液體密度：${liquid.toFixed(2)} g/cm³`,24);txt(s,485,331,ratio<1?`浸入體積比例：約 ${(ratio*100).toFixed(1)}%`:'物體完全浸入液體',22,C.teal);txt(s,485,379,'顯示最終靜止狀態，忽略表面張力。',17,C.muted);}
    footer(s,'比較物體「平均密度」與液體密度，可以預測靜止液體中的浮沉趨勢。','漂浮平衡時浮力＝重量；下沉中的物體仍受到浮力。');break;
   }
   case 'ions':{
    panel(s,35,125,414,310,'固態食鹽：離子位置受限',1);panel(s,511,125,414,310,'食鹽水：離子可移動',2);
    for(let j=0;j<12;j++){let x=129+j%4*52,y=230+Math.floor(j/4)*52;dot(s,x,y,20,j%2?C.blue:C.orange,j%2?'−':'+');if(j%4<3)line(s,x+21,y,x+31,y,C.line,1);}
    beaker(s,576,196,275,203,.85);for(let j=0;j<8;j++){let x=624+j%4*57,y=255+Math.floor(j/4)*79;dot(s,x,y,15,j%2?C.blue:C.orange,j%2?'−':'+');arrow(s,x,y+25,x+(j%2?-22:22),y+25,j%2?C.blue:C.orange,2);}
    footer(s,'導電需要「可移動的帶電粒子」；水溶液內由離子移動傳遞電荷。','固態食鹽不是沒有離子；糖溶於水通常仍以中性分子存在。');break;
   }
   case 'redox':{
    panel(s,36,126,364,303,'反應物');panel(s,560,126,364,303,'生成物');
    [0,1].forEach(i=>{dot(s,123+i*137,257,29,C.blue,'Cu');dot(s,163+i*137,257,22,C.red,'O');dot(s,634+i*95,251,29,C.blue,'Cu');});dot(s,217,359,25,C.ink,'C');dot(s,806,350,25,C.ink,'C');dot(s,760,350,22,C.red,'O');dot(s,852,350,22,C.red,'O');arrow(s,421,277,538,277,C.teal,4);txt(s,480,247,'加熱','20',C.muted,'middle');
    footer(s,'2 CuO ＋ C → 2 Cu ＋ CO₂：氧化銅失氧，碳得氧。','被還原的物質失去氧；還原劑使對方還原，自己則被氧化。');break;
   }
   case 'ph':{
    const ph=o.ph??7;for(let i=0;i<14;i++){s.rect(60,66).move(60+i*60,214).fill(i<7?d3.interpolateRgb('#f2c1c5','#fceee7')(i/7):d3.interpolateRgb('#e2f4eb','#c0d9f4')((i-7)/7));}for(let i=0;i<=14;i++)txt(s,60+i*60,313,i,18,C.ink,'middle');
    let xx=60+ph*60;arrow(s,xx,164,xx,208,C.ink,3);txt(s,xx,146,`pH ${Number(ph.toFixed(2))}`,22,C.ink,'middle',700);txt(s,211,374,'酸性：H⁺ 較多',22,C.red,'middle');txt(s,480,374,'中性',22,C.teal,'middle');txt(s,750,374,'鹼性：OH⁻ 較多',22,C.blue,'middle');
    footer(s,'25°C 的水溶液：pH＜7 為酸性，pH＝7 為中性，pH＞7 為鹼性。','pH 不是把兩杯溶液的數值直接平均；中和後仍可能含可導電的離子。');break;
   }
   case 'neutral':{
    [['酸：H⁺',C.red,'+'],['鹼：OH⁻',C.blue,'−'],['產物：H₂O',C.teal,'']].forEach(([t,c,sign],i)=>{let x=40+i*307;panel(s,x,122,278,317,t,i+1);beaker(s,x+54,203,170,174,.75);if(i<2){for(let j=0;j<6;j++)dot(s,x+100+j%2*65,264+Math.floor(j/2)*42,14,c,sign);}else{molecule(s,x+138,279,'water',1);}});
    footer(s,'H⁺ ＋ OH⁻ → H₂O；先按照 1：1 配對，再判斷哪一方剩餘。','鈉離子與氯離子仍留在溶液中，因此恰好中和不表示只剩純水。');break;
   }
   case 'rate':{
    [['大塊',false,'接觸表面較少'],['粉末',true,'總接觸表面較多']].forEach(([t,pow,note],i)=>{let x=42+i*460;panel(s,x,125,416,312,t,i+1);beaker(s,x+121,197,176,184,.7);if(pow){for(let j=0;j<20;j++)s.circle(8).center(x+145+j%7*19,360-Math.floor(j/7)*11).fill(C.orange);}else s.rect(80,40).move(x+170,336).radius(5).fill('#bca78e');for(let j=0;j<(pow?18:6);j++)s.circle(5).center(x+152+j*37%125,221+j*31%105).fill('white').stroke({color:C.blue,width:1});txt(s,x+208,418,note,19,C.ink,'middle');});
    footer(s,'同樣固體質量、酸的濃度與溫度下，粉末通常反應較快。','細化改變的是接觸面積；不是把原子變小，也不保證最終產物更多。');break;
   }
   case 'equilibrium':{
    panel(s,46,132,316,289,'甲粒子');panel(s,598,132,316,289,'乙粒子');for(let j=0;j<12;j++)dot(s,98+j%4*68,231+Math.floor(j/4)*56,13,C.blue);for(let j=0;j<6;j++)dot(s,660+j%3*87,253+Math.floor(j/3)*68,13,C.orange);
    arrow(s,388,235,570,235,C.blue,5);arrow(s,570,326,388,326,C.orange,5);txt(s,480,207,'正反應：每秒 20 個',17,C.blue,'middle');txt(s,480,365,'逆反應：每秒 20 個',17,C.orange,'middle');footer(s,'動態平衡：正、逆反應速率相等，兩方向仍持續發生。','兩邊的粒子數或濃度不必相等；圖中數量僅示意平衡組成。');break;
   }
   case 'chain':{
    const n=o.carbon??4,step=Math.min(135,720/Math.max(1,n-1)),x0=480-(n-1)*step/2;
    for(let i=0;i<n;i++){let x=x0+i*step,y=275;if(i<n-1)line(s,x,y,x+step,y,C.ink,5);dot(s,x,y,26,C.ink,'C');let angles=[-Math.PI/2,Math.PI/2];if(i===0)angles.push(Math.PI);if(i===n-1)angles.push(0);for(const a of angles){let hx=x+60*Math.cos(a),hy=y+60*Math.sin(a);line(s,x+29*Math.cos(a),y+29*Math.sin(a),hx,hy,C.muted,2);dot(s,hx,hy,15,C.blue,'H');}}
    footer(s,`開鏈飽和烴 C${n===1?'':n}H${2*n+2}：每個碳的總鍵數為 4。`,'氫原子分布為結構示意；鍵角未按真實分子立體形狀繪製。');break;
   }
   case 'force':{
    const f=o.force??30,fr=o.friction??10;line(s,85,385,875,385,C.ink,3);for(let i=0;i<26;i++)line(s,95+i*29,386,80+i*29,402,C.line,1);s.rect(218,144).move(360,220).radius(10).fill('#dcebf7').stroke({color:C.blue,width:2});s.rect(174,23).move(382,233).radius(4).fill('#edf5fb');txt(s,469,307,o.mass?`m＝${o.mass} kg`:'受力物體',22,C.ink,'middle',700);
    arrow(s,578,280,578+f*5,280,C.blue,4);if(fr)arrow(s,360,330,360-fr*5,330,C.orange,4);txt(s,645,247,`${f} N 向右`,22,C.blue);txt(s,210,302,`${fr} N 向左`,20,C.orange);badge(s,341,159,`向右合力＝${f-fr} N`);footer(s,'先看同一物體受到哪些力，再依選定正方向相加。','箭頭由物體指向施力方向；水平力圖省略互相平衡的重力與支持力。');break;
   }
   case 'pressure':{
    [['小面積',90,140],['大面積',186,69]].forEach(([t,w,h],i)=>{let x=39+i*463;panel(s,x,128,419,299,t,i+1);line(s,x+34,352,x+385,352,C.muted,3);s.rect(w,h).move(x+210-w/2,351-h).fill('#d0b59a').stroke({color:'#896950',width:2});arrow(s,x+210,185,x+210,244,C.blue,4);txt(s,x+210,408,i?'接觸面積大 → 壓力小':'接觸面積小 → 壓力大',19,C.ink,'middle');});footer(s,'壓力 p＝垂直作用力 F ÷ 受力面積 A。','同一塊磚的重量不變；改變放置面，會改變受力面積。');break;
   }
   case 'buoyancy':{
    beaker(s,115,141,360,297,.83);s.rect(114,94).move(238,276).radius(6).fill('#b9c7d1').stroke({color:C.muted,width:2});arrow(s,295,370,295,302,C.blue,4);arrow(s,295,276,295,304,C.orange,3);txt(s,502,217,'液面',20,C.blue);line(s,460,191,500,210,C.blue,1.5);txt(s,537,282,'上表面：壓力較小',21,C.orange);txt(s,537,347,'下表面：壓力較大',21,C.blue);txt(s,537,405,'合成向上的浮力',23,C.teal,'start',700);footer(s,'浮力＝排開液體的重量＝ρ液 g V排。','完全浸沒、液體密度與排水體積相同時，更深不表示浮力更大。');break;
   }
   case 'motion':{
    line(s,90,350,868,350,C.muted,3);for(let x=0;x<=8;x++){line(s,105+x*90,343,105+x*90,358,C.muted,2);txt(s,105+x*90,387,x,18,C.muted,'middle');}txt(s,884,384,'m',18,C.muted);arrow(s,105,209,735,209,C.blue,5);arrow(s,735,259,465,259,C.orange,5);arrow(s,105,316,465,316,C.teal,5);txt(s,407,187,'① 向東 7 m',21,C.blue,'middle');txt(s,600,242,'② 向西 3 m',20,C.orange,'middle');txt(s,277,298,'位移：向東 4 m',20,C.teal,'middle');dot(s,105,350,7,C.ink);dot(s,465,350,7,C.teal);footer(s,'路程＝7＋3＝10 m；位移＝末位置－初位置＝＋4 m。','先選向東為正；路程累加走過的長度，位移只比較起點與終點。');break;
   }
   case 'energy':{
    path(s,'M100 156L690 424H100Z','#b6cbd9',2,'#edf4f8');line(s,90,425,896,425,C.muted,3);const h=o.height??6,x=100+(10-h)*59,y=156+(10-h)*26.8;dot(s,x,y-22,23,C.orange);line(s,x,y,x,424,C.orange,1.5,'5 5');txt(s,x+28,Math.min(395,y+58),`h＝${h} m`,20,C.orange);arrow(s,331,241,420,281,C.blue,3);txt(s,523,159,'高度降低',23,C.ink);txt(s,523,198,'重力位能減少',20,C.blue);txt(s,523,236,'動能（與內能）增加',20,C.orange);footer(s,'無摩擦：重力位能＋動能保持不變；有摩擦：也要計入內能。','球的位置表示高度，尺寸未按比例；計算假設及數值見旁邊的實驗讀數。');break;
   }
   case 'circuit':{
    const parallel=o.parallel??true;const x=145,left=330,right=803;
    path(s,`M${x} 269V166H${left}M${right} 166H866V414H${x}V299`,C.ink,3);line(s,x-24,273,x+24,273,C.ink,4);line(s,x-14,292,x+14,292,C.ink,4);txt(s,94,272,'＋',20,C.red);txt(s,97,306,'−',20,C.blue);txt(s,192,295,o.voltage?`${o.voltage} V`:'電源',21,C.ink);
    if(parallel){path(s,`M${left} 166V316H${right}V166`,C.ink,3);line(s,left,166,right,166,C.ink,3);resistor(s,523,166);resistor(s,523,316);dot(s,left,166,5,C.ink);dot(s,right,166,5,C.ink);arrow(s,365,166,440,166,C.blue,3);arrow(s,365,316,440,316,C.teal,3);txt(s,575,128,`R₁ ${o.r1?o.r1+' Ω':''}`,21,C.orange,'middle');txt(s,575,280,`R₂ ${o.r2?o.r2+' Ω':''}`,21,C.orange,'middle');txt(s,412,205,'I₁',20,C.blue);txt(s,412,355,'I₂',20,C.teal);}
    else {line(s,left,166,right,166,C.ink,3);resistor(s,382,166);resistor(s,657,166);txt(s,427,130,`R₁ ${o.r1?o.r1+' Ω':''}`,21,C.orange,'middle');txt(s,702,130,`R₂ ${o.r2?o.r2+' Ω':''}`,21,C.orange,'middle');arrow(s,526,166,598,166,C.blue,3);txt(s,555,207,'I',20,C.blue);}
    arrow(s,200,166,270,166,C.blue,3);txt(s,235,142,'I總',20,C.blue);footer(s,parallel?'並聯：兩電阻接在同一對節點；I總＝I₁＋I₂。':'串聯：只有一條通路；各電阻的電流相同。',parallel?'每個支路電壓等於電源電壓；電流箭頭採傳統電流方向。':'總電壓等於各電阻電壓降的和；電流箭頭採傳統電流方向。');break;
   }
   case 'electrolysis':{
    beaker(s,256,211,450,224,.78);s.rect(28,170).move(328,189).fill('#7f97ad');s.rect(28,170).move(602,189).fill('#bb9682');path(s,'M342 189V136H477M497 136H616V189',C.ink,3);line(s,477,125,477,147,C.ink,4);line(s,497,117,497,155,C.ink,4);txt(s,433,129,'−',19,C.blue);txt(s,520,129,'＋',19,C.red);txt(s,127,246,'陰極（−）',20,C.blue);txt(s,730,246,'陽極（＋）',20,C.red);
    [[440,302,'+',C.orange],[521,364,'−',C.blue],[444,399,'+',C.orange],[529,288,'−',C.blue]].forEach(([x,y,t,c])=>{dot(s,x,y,16,c,t);arrow(s,x+(t==='+'?-23:23),y,x+(t==='+'?-65:65),y,c,2);});arrow(s,420,136,369,136,C.blue,2);txt(s,175,111,'外電路：電子',18,C.blue);footer(s,'陽離子向陰極移動；陰離子向陽極移動。','溶液中由離子傳遞電荷，金屬導線中由電子移動；產物需依電極與電解質判斷。');break;
   }
   case 'watercycle':{
    sun(s,107,162,30);cloud(s,438,159,.8);path(s,'M236 413L443 242L630 414Z','#77917b',2,'#cfdfd1');path(s,'M450 270L394 310L431 323L388 363L468 413',C.blue,5);s.rect(272,94).move(646,339).fill(C.water);for(let i=0;i<5;i++)path(s,`M${663+i*45} 349q11 -9 23 0t23 0`,C.blue,2);path(s,'M43 438H919',C.muted,2);arrow(s,769,305,769,190,C.orange,4);txt(s,794,248,'蒸發',20,C.orange);arrow(s,695,165,548,165,C.blue,3);txt(s,614,139,'水氣移動',18,C.blue,'middle');[0,1,2].forEach(i=>arrow(s,389+i*42,208,373+i*42,250,C.blue,2));txt(s,301,238,'降水',20,C.blue);arrow(s,504,334,657,395,C.teal,4);txt(s,560,329,'逕流',20,C.teal);arrow(s,304,361,304,429,C.teal,3);txt(s,220,393,'入滲',20,C.teal);txt(s,738,407,'海洋',22,C.blue);
    footer(s,'太陽提供水循環所需能量，重力使降水與逕流向低處移動。','蒸發、凝結、降水、逕流與入滲連成循環；圖中各儲水量未按比例。');break;
   }
   case 'tectonic':{
    s.rect(850,190).move(55,240).fill('#f4e4d7');path(s,'M56 213H412L673 425H621L394 255H56Z','#718da8',2,'#8da6bb');path(s,'M432 225L507 209L617 151L680 227H906V289H560Z','#827967',2,'#cbb79b');path(s,'M584 198L617 154L644 208Z',C.red,2,'#dba27e');path(s,'M651 378Q639 308 616 211',C.orange,8);s.rect(357,40).move(55,170).fill(C.water);arrow(s,168,143,320,143,C.blue,4);arrow(s,823,143,703,143,C.orange,4);txt(s,174,117,'海洋板塊',21,C.blue);txt(s,703,117,'上覆板塊',21,C.orange);txt(s,353,201,'海溝',19,C.ink);txt(s,696,336,'岩漿上升',19,C.orange);line(s,687,328,644,305,C.orange,1.5);[0,1,2,3,4].forEach(i=>dot(s,446+i*43,277+i*33,5,C.red));txt(s,106,362,'地震沿隱沒帶分布',20,C.red);line(s,313,354,495,320,C.red,1.5);footer(s,'密度較大的海洋板塊隱沒，交界附近可能出現地震與火山活動。','這是一種聚合邊界示意；板塊、地殼與岩漿深度均未按比例。');break;
   }
   case 'strata':{
    const colors=['#e6d4ab','#c5d8d5','#adc1d0'];for(let i=0;i<3;i++){s.rect(375,72).move(83,212+i*72).fill(colors[i]).stroke({color:'white',width:2});s.rect(375,72).move(463,233+i*64).fill(colors[i]).stroke({color:'white',width:2});txt(s,116,256+i*72,['較新 C','中間 B','較老 A'][i],20,C.ink);}
    path(s,'M433 435L512 210',C.red,4);s.rect(755,66).move(83,145).fill('#e9eee3').stroke({color:'white',width:2});txt(s,114,187,'D：未被斷層切過的新沉積層',21,C.ink);txt(s,558,349,'斷層切過 A、B、C',21,C.red);txt(s,558,391,'卻沒有切過 D',21,C.red);footer(s,'事件順序：A → B → C 沉積 → 斷層 → D 沉積。','在未倒轉地層中，下老上新；切過地層的構造晚於被切過的地層。');break;
   }
   case 'moon':{
    const phase=o.phase??2,a=phase*Math.PI/4,cx=274,cy=278,rx=161,ry=139;sun(s,837,164,34);for(let y=216;y<=385;y+=74)arrow(s,916,y,762,y,C.orange,3);
    s.ellipse(rx*2,ry*2).center(cx,cy).fill('none').stroke({color:C.line,width:1.5,dasharray:'4 5'});globe(s,cx,cy,32);for(let i=0;i<8;i++){let aa=i*Math.PI/4,x=cx+rx*Math.cos(aa),y=cy-ry*Math.sin(aa);s.circle(32).center(x,y).fill('#52677d');path(s,`M${x} ${y-16}A16 16 0 0 1 ${x} ${y+16}Z`,'#f5d798',0,'#f5d798');if(i===phase)s.circle(48).center(x,y).fill('none').stroke({color:C.orange,width:3});}txt(s,cx,cy+61,'地球',18,C.ink,'middle');
    const mx=616,my=293,r=64,co=Math.cos(a),lit=(1-co)/2;s.circle(r*2).center(mx,my).fill('#263c52');const waxing=phase<=4,side=waxing?1:-1;let pts=[];for(let j=0;j<=60;j++){let yy=-r+j*2*r/60,xx=Math.sqrt(Math.max(0,r*r-yy*yy));pts.push([mx+side*xx,my+yy]);}for(let j=60;j>=0;j--){let yy=-r+j*2*r/60,xx=Math.sqrt(Math.max(0,r*r-yy*yy));pts.push([mx+side*co*xx,my+yy]);}s.polygon(pts).fill('#f5d798');txt(s,mx,167,'從地球看到的月面',21,C.ink,'middle');txt(s,mx,405,`${['新月','眉月','上弦月','盈凸月','滿月','虧凸月','下弦月','殘月'][phase]}｜亮面 ${Math.round(lit*100)}%`,20,C.ink,'middle');
    footer(s,'左：北極上空俯視位置；右：面向南方觀月的明暗示意。','月相由日地月相對位置造成；不是地球影子。距離與尺寸未按比例。');break;
   }
   case 'magnet':{
    const x=317,y=276;s.rect(160,78).move(x,y-39).radius(5).fill('#b73e4b');s.rect(160,78).move(x+160,y-39).radius(5).fill('#176ca4');txt(s,x+80,y+8,'N',29,'white','middle',700);txt(s,x+240,y+8,'S',29,'white','middle',700);
    [95,154].forEach(h=>{path(s,`M317 ${y-16}C${190-h/4} ${y-h} ${724+h/4} ${y-h} 637 ${y-16}`,C.teal,2.5);path(s,`M317 ${y+16}C${190-h/4} ${y+h} ${724+h/4} ${y+h} 637 ${y+16}`,C.teal,2.5);arrow(s,456,y-h*.75,491,y-h*.75,C.teal,2.5);arrow(s,456,y+h*.75,491,y+h*.75,C.teal,2.5);});
    txt(s,477,116,'磁鐵外：N → S',22,C.teal,'middle',700);arrow(s,552,y,409,y,'white',2.5);txt(s,477,420,'磁鐵內：S → N',20,C.ink,'middle');footer(s,'磁力線形成閉合曲線；疏密用來示意磁場強弱。','磁力線是描述磁場的模型，不是真實存在的線，也不互相交叉。');break;
   }
   case 'induction':{
    const emf=o.emf??2,pole=o.pole??1,direction=o.direction??1,speed=o.speed??1;panel(s,36,120,530,318,'改變穿過線圈的磁場');s.rect(92,60).move(93,251).fill(pole===1?C.blue:C.red);s.rect(92,60).move(185,251).fill(pole===1?C.red:C.blue);txt(s,139,291,pole===1?'S':'N',25,'white','middle');txt(s,231,291,pole===1?'N':'S',25,'white','middle');for(let i=0;i<8;i++)s.ellipse(35,112).center(359+i*18,280).fill('none').stroke({color:C.orange,width:3});if(speed)arrow(s,direction===1?135:261,213,direction===1?261:135,213,C.teal,3);txt(s,178,190,speed?(direction===1?'接近線圈':'遠離線圈'):'保持靜止',19,C.teal,'middle');txt(s,305,396,'線圈與檢流計接成閉合迴路（導線省略）',17,C.muted,'middle');
    const cx=752,cy=331;path(s,`M632 ${cy}A120 120 0 0 1 872 ${cy}`,C.muted,3);for(let j=-4;j<=4;j++){let a=j*Math.PI/9;line(s,cx+105*Math.sin(a),cy-105*Math.cos(a),cx+119*Math.sin(a),cy-119*Math.cos(a),C.muted,2);}let a=Math.max(-1,Math.min(1,emf/20))*1.25;arrow(s,cx,cy,cx+100*Math.sin(a),cy-100*Math.cos(a),C.red,3);dot(s,cx,cy,7,C.ink);txt(s,cx,180,'檢流計',23,C.ink,'middle');txt(s,cx,389,`相對讀數 ${emf>0?'+':''}${emf}`,21,C.ink,'middle');footer(s,'磁通量改變才有感應電動勢；閉合迴路才會產生感應電流。','停住不代表持續發電；移動方向或磁極改變，感應方向也會改變。');break;
   }
   case 'weather':{
    const rh=o.rh??58;panel(s,38,124,408,307,'水氣與飽和容量');beaker(s,136,201,176,191,.01,'white');const hh=150*Math.min(1,rh/100);s.rect(162,hh).move(143,386-hh).fill(C.water);line(s,143,236,305,236,C.orange,2,'5 5');txt(s,241,174,'飽和容量',18,C.orange,'middle');txt(s,241,420,`相對溼度 ${rh.toFixed(1)}%`,22,C.blue,'middle',700);cloud(s,702,246,1.2);txt(s,699,260,'凝結成小水滴',20,C.ink,'middle');arrow(s,488,278,573,278,C.teal,3);txt(s,694,391,rh>=100?'達飽和，多餘水氣可凝結':'繼續降溫，可能到達露點',20,C.ink,'middle');footer(s,'相對溼度＝實際水氣量 ÷ 同溫飽和水氣量 ×100%。','左邊的容器只是容量比喻；雲由小水滴或冰晶構成，並非可見的水蒸氣。');break;
   }
   case 'terrainrain':{
    path(s,'M64 418L485 193L787 418Z','#76957d',2,'#d5e2d5');cloud(s,420,166,.85);arrow(s,90,316,258,276,C.blue,4);arrow(s,262,273,420,188,C.blue,4);arrow(s,555,257,765,350,C.orange,4);for(let j=0;j<7;j++)line(s,341+j*24,207,330+j*24,237,C.blue,2);txt(s,134,252,'暖濕氣流',23,C.blue);txt(s,295,365,'迎風坡：上升冷卻',20,C.blue);txt(s,590,393,'背風坡：下沉增溫',20,C.orange);txt(s,579,190,'水氣凝結 → 降水',20,C.teal);footer(s,'空氣被地形抬升，膨脹冷卻；達露點後可形成雲與降水。','迎風坡和背風坡取決於當時風向；不是山的固定某一側永遠下雨。');break;
   }
   case 'greenhouse':{
    sun(s,123,173,35);globe(s,493,354,80);s.ellipse(421,313).center(493,310).fill('none').stroke({color:'#b1c9dd',width:18});arrow(s,177,182,420,297,C.orange,5);arrow(s,466,302,376,169,C.red,4);arrow(s,537,289,573,151,C.red,4);arrow(s,573,151,791,127,C.red,3);arrow(s,568,154,563,282,C.red,3);txt(s,239,200,'太陽短波輻射',20,C.orange);txt(s,661,262,'部分長波向地表放射',19,C.red);txt(s,658,102,'部分長波逸向太空',19,C.red);txt(s,89,417,'大氣：吸收並放射紅外線',19,C.ink);line(s,332,409,312,354,C.muted,1.5);footer(s,'地表吸收太陽能後放射長波；溫室氣體吸收並向各方向放射長波。','箭頭不是完整定量能量收支；增強溫室效應改變地球能量平衡。');break;
   }
   case 'ocean':{
    [['波浪','水粒子以往復運動為主'],['潮汐','海面受日月引潮力週期升降'],['洋流','海水大範圍持續流動']].forEach(([t,note],i)=>{let x=38+i*309;panel(s,x,123,278,315,t,i+1);let pts=Array.from({length:80},(_,j)=>({x:x+20+j*3,y:266+Math.sin(j*.13)*22}));path(s,d3.line().x(v=>v.x).y(v=>v.y)(pts),C.blue,3);s.rect(238,107).move(x+20,289).fill(C.water);if(i===0){s.circle(60).center(x+138,328).fill('none').stroke({color:C.orange,width:2});arrow(s,x+160,309,x+169,329,C.orange,3);}if(i===1){arrow(s,x+138,230,x+138,160,C.orange,3);arrow(s,x+176,159,x+176,230,C.orange,3);}if(i===2)for(let j=0;j<3;j++)arrow(s,x+50,308+j*29,x+214,308+j*29,C.teal,3);lines(s,x+23,419,note,13,16,C.ink);});footer(s,'波浪、潮汐與洋流的時間尺度、成因及水體運動方式不同。','波浪傳能不等於整團海水跟著波峰一路前進。');break;
   }
   case 'light':{
    line(s,490,113,490,429,C.muted,7);line(s,490,262,490,278,'white',9);line(s,865,130,865,431,C.muted,5);arrow(s,151,377,151,163,C.teal,5);txt(s,151,416,'物體',21,C.teal,'middle');arrow(s,151,163,865,389,C.orange,3);arrow(s,151,377,865,189,C.blue,3);arrow(s,864,189,864,389,C.teal,5);txt(s,484,451,'針孔',20,C.ink,'middle');txt(s,865,464,'倒立像',21,C.teal,'middle');footer(s,'光沿直線傳播：物體上端的光穿過小孔後到達屏幕下端。','小孔不是透鏡；畫出兩條不同物點的光線，追蹤上下對調。');break;
   }
   case 'reflection':{
    const a=(o.angle??35)*Math.PI/180,cx=480,cy=390,r=274;line(s,106,cy,854,cy,C.muted,6);for(let i=0;i<24;i++)line(s,119+i*30,cy+2,104+i*30,cy+20,C.line,1.5);line(s,cx,119,cx,436,C.muted,2,'6 6');arrow(s,cx-Math.sin(a)*r,cy-Math.cos(a)*r,cx,cy,C.orange,4);arrow(s,cx,cy,cx+Math.sin(a)*r,cy-Math.cos(a)*r,C.blue,4);let aa=a*180/Math.PI;txt(s,226,194,'入射光',21,C.orange);txt(s,643,194,'反射光',21,C.blue);txt(s,505,143,'法線',20,C.muted);path(s,`M480 310A80 80 0 0 0 ${480-Math.sin(a)*80} ${390-Math.cos(a)*80}`,C.orange,2);path(s,`M480 310A80 80 0 0 1 ${480+Math.sin(a)*80} ${390-Math.cos(a)*80}`,C.blue,2);txt(s,394,288,`${Math.round(aa)}°`,19,C.orange);txt(s,525,288,`${Math.round(aa)}°`,19,C.blue);footer(s,'入射角＝反射角；兩個角都由光線與「法線」夾角量起。','法線與鏡面垂直；光的箭頭表示行進方向。');break;
   }
   case 'refraction':{
    const pair=o.pair||'air-water',media={'air-water':['空氣','水',1,1.33],'air-glass':['空氣','玻璃',1,1.5],'water-air':['水','空氣',1.33,1]}[pair],a=(o.angle??40)*Math.PI/180,ratio=media[2]/media[3]*Math.sin(a),tir=ratio>1,b=tir?a:Math.asin(ratio);
    s.rect(890,186).move(35,253).fill(media[1]==='空氣'?'#f7fafc':C.water);s.rect(890,137).move(35,115).fill(media[0]==='空氣'?'#f7fafc':C.water);line(s,35,253,925,253,C.blue,2);line(s,477,110,477,440,C.muted,2,'6 6');arrow(s,477-140*Math.sin(a),253-140*Math.cos(a),477,253,C.orange,4);arrow(s,477,253,477+174*Math.sin(b),253+(tir?-1:1)*174*Math.cos(b),C.blue,4);txt(s,731,198,media[0],23,C.ink);txt(s,737,333,media[1],23,C.blue);txt(s,187,175,'入射光',20,C.orange);txt(s,618,tir?159:398,tir?'全反射光':'折射光',20,C.blue);txt(s,498,133,'法線',20,C.muted);
    footer(s,tir?`入射角 ${Math.round(a*180/Math.PI)}°：超過臨界角，發生全反射。`:`入射角 ${Math.round(a*180/Math.PI)}° → 折射角 ${(b*180/Math.PI).toFixed(1)}°。`,'角度皆由法線量起；非全反射時此圖只追蹤折射光，省略較弱的反射光。');break;
   }
   case 'lens':{
    const u=o.u??30,f=12,v=u===f?Infinity:f*u/(u-f),H=6;
    // One uniform scale for both coordinates. Near focus, show the finite viewport honestly.
    const extent=Math.min(110,Math.max(38,u+8,Number.isFinite(v)?Math.abs(v)+10:38)),scale=365/extent,cx=480,cy=290;
    line(s,43,cy,915,cy,C.muted,1.5);path(s,`M480 133Q510 290 480 445Q450 290 480 133Z`,C.blue,2,'#d5edf8');
    [-2,-1,1,2].forEach(n=>{let x=cx+n*f*scale;line(s,x,cy-5,x,cy+5,C.ink,2);txt(s,x,cy+31,n<0?(n===-1?'F':'2F'):(n===1?'F′':'2F′'),17,C.ink,'middle');});
    const ox=cx-u*scale,oy=cy-H*scale;arrow(s,ox,cy,ox,oy,C.teal,4);txt(s,ox,oy-17,'物體',19,C.teal,'middle');
    const clip=s.clip().add(s.rect(870,310).move(45,130)),rays=s.group().clipWith(clip);
    path(rays,`M${ox} ${oy}H480L915 ${oy+(915-cx)*H/f}`,C.orange,2.5);path(rays,`M${ox} ${oy}L915 ${cy+(915-cx)*H/u}`,C.blue,2.5);
    if(Number.isFinite(v)){let ix=cx+v*scale,iy=cy+H*v/u*scale;if(ix>=45&&ix<=915&&iy>=135&&iy<=440){arrow(s,ix,cy,ix,iy,C.red,4);txt(s,ix,iy+(v>0?24:-16),v>0?'實像':'虛像',19,C.red,'middle');}else txt(s,694,409,'像超出本圖範圍',18,C.red);if(v<0){path(rays,`M480 ${oy}L${ix} ${iy}`,C.orange,2,'none','6 5');path(rays,`M480 ${cy}L${ix} ${iy}`,C.blue,2,'none','6 5');}}
    footer(s,u===f?'物體位於焦點：折射後兩條光線平行，沒有有限距離的清楚像。':`f＝12 cm；u＝${u} cm；v＝${Number(v.toFixed(1))} cm。`, '採相同水平與垂直比例；實線為光線，虛線為反向延長線；光學元件厚度為示意。');break;
   }
   case 'wave':{
    const points=Array.from({length:161},(_,i)=>({x:80+i*5,y:285-80*Math.sin(i*Math.PI/40)}));line(s,70,285,903,285,C.muted,1.5,'5 5');path(s,d3.line().x(v=>v.x).y(v=>v.y)(points),C.blue,4);arrow(s,180,198,580,198,C.teal,2);arrow(s,580,198,180,198,C.teal,2);txt(s,380,178,'一個波長 λ',22,C.teal,'middle');line(s,180,202,180,285,C.orange,2);txt(s,202,248,'振幅 A',20,C.orange);arrow(s,740,130,871,130,C.blue,3);txt(s,681,111,'波向右傳播',20,C.blue);txt(s,872,323,'位置',18,C.muted);txt(s,79,399,'波峰',19,C.ink);line(s,129,390,180,210,C.muted,1.5);txt(s,348,423,'波谷',19,C.ink);line(s,377,398,380,367,C.muted,1.5);footer(s,'波長：相鄰同相位點的距離；振幅：偏離平衡位置的最大距離。','波形圖必須先確認橫軸是位置還是時間；波速 v＝頻率 f × 波長 λ。');break;
   }
   case 'echo':{
    s.rect(57,270).move(823,145).fill('#d2dde5');for(let i=0;i<9;i++)line(s,824,154+i*30,878,177+i*30,C.muted,1);s.circle(43).center(139,239).fill('#d7ac81');path(s,'M139 262V354M139 289L104 317M139 289L182 311M139 354L112 414M139 354L166 414',C.ink,6);arrow(s,207,221,797,221,C.blue,4);arrow(s,797,338,207,338,C.orange,4);txt(s,500,193,'去程：d',23,C.blue,'middle');txt(s,500,382,'回程：d',23,C.orange,'middle');txt(s,845,443,'山壁',19,C.ink,'middle');footer(s,'聽到回聲的時間包含去程＋回程：距離 d＝聲速 v × 時間 t ÷2。','只算單程距離時，必須把聲音來回路程除以 2。');break;
   }
   case 'heat':{
    [['高溫物體',C.red],['低溫物體',C.blue]].forEach(([t,c],i)=>{let x=50+i*532;panel(s,x,144,330,273,t);s.rect(220,119).move(x+55,233).radius(14).fill(i?'#dcecf7':'#f5d9d3').stroke({color:c,width:2});for(let j=0;j<12;j++){let xx=x+83+j%4*52,yy=258+Math.floor(j/4)*36;dot(s,xx,yy,6,c);arrow(s,xx+8,yy,xx+(i?19:34),yy-9,c,1.5);}});arrow(s,401,286,556,286,C.orange,5);txt(s,479,254,'熱傳',22,C.orange,'middle');footer(s,'接觸且沒有其他影響時，熱由高溫處傳向低溫處，直到熱平衡。','溫度反映粒子熱運動狀態；熱量是能量轉移，不是物體內「裝著」的溫度。');break;
   }
   case 'transfer':{
    [['傳導','相鄰粒子傳遞能量'],['對流','流體移動帶走能量'],['輻射','可穿過真空傳遞']].forEach(([t,n],i)=>{let x=40+i*307;panel(s,x,123,278,317,t,i+1);if(i===0){s.rect(225,38).move(x+26,263).radius(5).fill('#d2dde5');for(let k=0;k<8;k++)dot(s,x+42+k*28,282,6,d3.interpolateRgb(C.red,C.blue)(k/7));arrow(s,x+48,220,x+217,220,C.orange,3);}if(i===1){beaker(s,x+62,208,157,158,.77);path(s,`M${x+108} 329V251H${x+177}V329Z`,C.blue,2);arrow(s,x+108,301,x+108,250,C.orange,3);arrow(s,x+177,266,x+177,328,C.blue,3);}if(i===2){sun(s,x+67,265,23);globe(s,x+220,308,30);arrow(s,x+105,275,x+174,295,C.orange,3);}txt(s,x+139,414,n,17,C.ink,'middle');});footer(s,'辨認關鍵：是否需要介質？介質是否整體流動？','實際情境常同時存在三種熱傳方式。');break;
   }
   case 'separation':{
    panel(s,34,125,425,315,'過濾：保留不溶顆粒',1);panel(s,501,125,425,315,'蒸餾：蒸氣冷凝後回收',2);
    path(s,'M133 200H348L256 297V344H235V297Z',C.muted,2,'#ecf2f6');path(s,'M158 214H321L248 284Z',C.orange,2,'#f5e9cf');for(let i=0;i<13;i++)dot(s,196+i*17%103,228+i*13%28,3,C.orange);beaker(s,181,347,136,66,.6);arrow(s,248,301,248,335,C.blue,2);
    s.circle(96).center(602,314).fill(C.water).stroke({color:C.muted,width:2});path(s,'M584 270V196H625V265M626 204L761 250',C.muted,3);path(s,'M672 202L780 239L769 270L662 233Z',C.blue,2,'#e3f2f9');path(s,'M758 250L820 272V323',C.muted,3);beaker(s,779,335,102,78,.47);arrow(s,649,187,726,214,C.orange,2);txt(s,582,391,'加熱',18,C.orange);txt(s,738,163,'冷凝管',19,C.blue);line(s,740,176,721,224,C.blue,1.5);footer(s,'先利用物質性質差異選方法，再確認想收集哪一部分。','過濾不能去除已溶解的食鹽；蒸餾可回收溶劑。裝置為原理示意，實作需教師指導。');break;
   }
   default:return concepts({title:o.title||kind,items:o.items||[{label:'觀察',detail:'確認圖中的物體、數值與條件。'},{label:'比較',detail:'找出改變的條件與對應結果。'},{label:'解釋',detail:'用本節科學概念解釋觀察。'}],type:o.type});
  }
  return finish(s);
 }
 return {scene,plot,concepts};
});
