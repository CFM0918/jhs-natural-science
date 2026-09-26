(function(){
 'use strict';
 const dialog=document.createElement('dialog');dialog.className='figure-viewer';dialog.setAttribute('aria-labelledby','figureViewerTitle');
 dialog.innerHTML='<header class="figure-viewer-header"><h2 id="figureViewerTitle">圖解放大閱讀</h2><button type="button" data-viewer="close" aria-label="關閉圖解">關閉 ×</button></header><div class="figure-viewer-tools"><button type="button" data-viewer="out" aria-label="縮小圖解">−</button><button type="button" data-viewer="fit">符合畫面</button><button type="button" data-viewer="in" aria-label="放大圖解">＋</button><button type="button" data-viewer="actual">原始大小</button><span>可使用瀏覽器縮放；放大後左右捲動閱讀，Esc 關閉。</span></div><div class="figure-viewer-canvas" tabindex="0" aria-label="可捲動的放大圖解"><img alt=""></div>';
 document.body.append(dialog);let source=null,returnFocus=null,scale=1,fit=960;
 const canvas=dialog.querySelector('.figure-viewer-canvas'),picture=canvas.querySelector('img');
 function apply(){picture.style.width=Math.round(fit*scale)+'px';}
 function open(target,trigger){
  const img=target.matches('img')?target:target.querySelector('img'),svg=target.matches('svg')?target:target.querySelector('svg');if(!img&&!svg)return;
  returnFocus=trigger;
  if(source)URL.revokeObjectURL(source);source=null;
  if(img){picture.src=img.src;picture.alt=img.alt;}
  else {const clone=svg.cloneNode(true);clone.setAttribute('xmlns','http://www.w3.org/2000/svg');source=URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(clone)],{type:'image/svg+xml'}));picture.src=source;picture.alt=svg.getAttribute('aria-label')||'科學互動圖';}
  dialog.querySelector('h2').textContent=picture.alt.split('。')[0];dialog.showModal();fit=Math.max(240,Math.min(canvas.clientWidth-40,(canvas.clientHeight-40)*960/560));scale=1;apply();canvas.scrollTo(0,0);
 }
 document.querySelectorAll('.science-image-frame').forEach(frame=>{const button=document.createElement('button');button.type='button';button.className='figure-open';button.textContent='放大閱讀圖解';button.setAttribute('aria-haspopup','dialog');button.addEventListener('click',()=>open(frame,button));frame.append(button);});
 document.addEventListener('click',event=>{const b=event.target.closest('.visual-zoom');if(b)open(b.parentElement,b);});
 dialog.addEventListener('click',event=>{let action=event.target.closest('[data-viewer]')?.dataset.viewer;if(!action)return;if(action==='close')dialog.close();if(action==='in')scale=Math.min(4,scale*1.3);if(action==='out')scale=Math.max(.5,scale/1.3);if(action==='fit')scale=1;if(action==='actual')scale=960/fit;apply();});
 dialog.addEventListener('close',()=>{if(source)URL.revokeObjectURL(source);source=null;picture.removeAttribute('src');returnFocus?.focus();});
 // Preserve existing lesson controls while replacing their low-resolution visual surface.
 const A=window.ScienceArt;if(!A)return;
 const val=(id,fallback=0)=>Number(document.getElementById(id)?.value??fallback);
 const bindings=[];
 function bind(selector,render){const old=document.querySelector(selector);if(!old)return;const panel=document.createElement('div');panel.className='legacy-art';old.after(panel);old.setAttribute('data-modernized','true');bindings.push(()=>{panel.innerHTML=render()+'<button type="button" class="visual-zoom" aria-haspopup="dialog">放大互動圖</button>';});}
 // Replace the SVG parent while keeping IDs available to the original controls.
 function bindSVG(id,render){const node=document.getElementById(id);if(node)bind(node.closest('svg')===node?'#'+id:'svg:has(#'+id+')',render);}
 bindSVG('objectArrow',()=>A.scene('lens',{title:'凸透鏡：等比例光路',u:val('objectDistanceRange',30)}));
 bindSVG('incidentRay',()=>A.scene('reflection',{title:'反射定律：角度與方向',angle:val('reflectionAngleRange',35)}));
 bindSVG('refractIncidentRay',()=>A.scene('refraction',{title:'折射與全反射：追蹤真正的光路',angle:val('refractionAngleRange',40),pair:document.getElementById('refractionPairSelect').value}));
 bind('.cylinder-pair',()=>A.scene('displacement',{title:'排水法：液面增加量就是物體體積',before:val('waterBeforeRange',25),volume:val('stoneVolumeRange',18)}));
 bindSVG('floatObject',()=>A.scene('floating',{title:'浮沉模擬：密度與浸入比例',rho:val('objectMassRange',80)/val('objectVolumeRange',100),liquid:val('liquidSelect',1)}));
 bindSVG('particleDots',()=>A.scene('particles',{title:'三態粒子模型：目前選擇'+({solid:'固態',liquid:'液態',gas:'氣態'}[document.querySelector('.state-btn[aria-pressed="true"]')?.dataset.state]||'固態')}));
 bind('#echoSvgDesc',()=>A.scene('echo',{title:'回聲測距：追蹤往返路徑',subtitle:`單程 ${val('echoDistanceRange',68)} m；總路程 ${val('echoDistanceRange',68)*2} m；往返 ${(val('echoDistanceRange',68)*2/340).toFixed(2)} s`}));
 bindSVG('expandingRod',()=>{const t=val('expansionTemperatureRange',20),material=document.getElementById('expansionMaterialSelect').value,alpha={aluminum:.000023,steel:.000012,glass:.000009}[material];return A.plot({title:'熱脹冷縮：把微小長度變化畫成圖',xLabel:'溫度（°C）',yLabel:'相對 20°C 的伸長量（cm）',points:[{x:-20,y:100*alpha*(-40)},{x:100,y:100*alpha*80}],marker:{x:t,y:100*alpha*(t-20)}});});
 bind('.heat-bars',()=>A.plot({title:'相同質量、相同熱量：比較溫升',bars:[['水',val('heatEnergyRange',8400)/(200*4.2)],['鋁',val('heatEnergyRange',8400)/(200*.9)],['鐵',val('heatEnergyRange',8400)/(200*.45)]],yLabel:'溫升（°C）；質量各 200 g'}));
 bindSVG('thermometerLiquid',()=>A.scene('thermometer',{title:'液柱溫度計',temperature:val('temperatureRange',25)}));
 bindSVG('wavePath',()=>{const f=val('waveFrequencyRange',3),v=val('waveMediumSelect',120),a=val('waveAmplitudeRange',2);return A.plot({title:'波形與波長：目前介質的波速固定',xLabel:'位置（cm）',yLabel:'位移（cm）',points:Array.from({length:181},(_,i)=>({x:i,y:a*Math.sin(2*Math.PI*i/(v/f))}))});});
 bindSVG('soundWavePath',()=>{const f=val('soundFrequencyRange',440),a=val('soundAmplitudeRange',2);return A.plot({title:'聲波控制台：振幅與頻率',xLabel:'時間（ms）',yLabel:'振幅（相對單位）',points:Array.from({length:241},(_,i)=>({x:i/30,y:a*Math.sin(2*Math.PI*f*i/30000)}))});});
 bindSVG('curveCursor',()=>{const p=val('heatingProgressRange',45),pts=[{x:0,y:-20},{x:20,y:0},{x:38,y:0},{x:68,y:100},{x:86,y:100},{x:100,y:130}],j=pts.findIndex((v,i)=>i>0&&p<=v.x),b=pts[j],a=pts[j-1],y=a.y+(b.y-a.y)*(p-a.x)/(b.x-a.x);return A.plot({title:'加熱曲線：追蹤溫度與物態',points:pts,marker:{x:p,y},xLabel:'加熱進度（%）',yLabel:'溫度（°C）'});});
 function update(){bindings.forEach(fn=>fn());}update();
 document.querySelectorAll('input[type="range"],select').forEach(e=>{e.addEventListener('input',update);e.addEventListener('change',update);});
 document.querySelectorAll('.state-btn').forEach(e=>e.addEventListener('click',update));
})();
