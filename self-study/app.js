const letters=['A','B','C','D'];
const storageKey=document.body.dataset.storageKey||'science-self-study-v1';
const lessonTotal=document.querySelectorAll('.complete-btn').length;
const questionTotal=QUESTIONS.length;
let state={completed:[],answers:{}};
let storageAvailable=true;
try { const restored=JSON.parse(localStorage.getItem(storageKey)||'null');
  if(restored && Array.isArray(restored.completed) && restored.answers && typeof restored.answers==='object' && !Array.isArray(restored.answers)) state=restored;
} catch { storageAvailable=false; }
const lessonKeys=[...document.querySelectorAll('.complete-btn')].map(btn=>btn.dataset.complete);
state.completed=[...new Set(state.completed)].filter(key=>lessonKeys.includes(key));
Object.keys(state.answers).forEach(id=>{const q=QUESTIONS.find(item=>String(item.id)===id);const a=state.answers[id];if(!q||!a||!Number.isInteger(a.choice)||a.choice<0||a.choice>3)delete state.answers[id];else a.correct=a.choice===q.answer;});

function save(){try{localStorage.setItem(storageKey,JSON.stringify(state));}catch{storageAvailable=false;}updateProgress();updateScore();showStorageNotice();}
function showStorageNotice(){if(storageAvailable)return;let notice=document.getElementById('storageNotice');if(!notice){notice=document.createElement('p');notice.id='storageNotice';notice.className='mistake';notice.setAttribute('role','status');document.getElementById('quiz').prepend(notice);}notice.textContent='這個瀏覽器目前無法保存紀錄；本次仍可練習，關閉或重整後紀錄可能消失。';}
function escapeHtml(text){return text.replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}

function questionMarkup(q,mini=false){
  const saved=state.answers[q.id];
  const chosen=saved?.choice;
  const resultClass=saved?(saved.correct?' correct':' incorrect'):'';
  return `<article class="question-card${mini?' mini-question':''}${resultClass}" data-id="${q.id}">
    <div class="question-meta"><span class="tag${q.difficulty==='難'?' hard':''}">${q.difficulty}</span><span class="tag">${q.topic}</span></div>
    <h3>${mini?'快速練習':'第 '+q.id+' 題'}　${escapeHtml(q.text)}</h3>
    ${q.table?`<div class="data-table-wrap"><table><caption>本題資料</caption><thead><tr>${q.table.headers.map(h=>`<th scope="col">${escapeHtml(String(h))}</th>`).join('')}</tr></thead><tbody>${q.table.rows.map(row=>`<tr>${row.map(cell=>`<td>${escapeHtml(String(cell))}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`:''}
    <div class="options">${q.options.map((o,i)=>`<label class="option"><input type="radio" name="q${mini?'m':''}${q.id}" value="${i}" ${chosen===i?'checked':''}><span><b>${letters[i]}.</b> ${escapeHtml(o)}</span></label>`).join('')}</div>
    <button class="quiz-submit" type="button">確認答案</button>
    <div class="feedback${saved?' show '+(saved.correct?'good':'bad'):''}" aria-live="polite">${saved?feedbackMarkup(q,saved.choice):''}</div>
  </article>`;
}

function feedbackMarkup(q,choice){
  const correct=choice===q.answer;
  return `<b>${correct?'答對了':'再想一想：正確答案是 '+letters[q.answer]}</b><span>${escapeHtml(q.explanation)}</span>`;
}

function bindQuestions(root=document){
  root.querySelectorAll('.question-card').forEach(card=>{
    card.querySelector('.quiz-submit').addEventListener('click',()=>{
      const q=QUESTIONS.find(x=>x.id===Number(card.dataset.id));
      const selected=card.querySelector('input:checked');
      const feedback=card.querySelector('.feedback');
      if(!selected){feedback.className='feedback show bad';feedback.innerHTML='<b>請先選擇一個答案。</b>';return;}
      const choice=Number(selected.value); const correct=choice===q.answer;
      state.answers[q.id]={choice,correct}; save();
      card.classList.toggle('correct',correct);card.classList.toggle('incorrect',!correct);
      feedback.className=`feedback show ${correct?'good':'bad'}`;feedback.innerHTML=feedbackMarkup(q,choice);
      document.querySelectorAll(`.question-card[data-id="${q.id}"]`).forEach(other=>{
        if(other===card)return; const radio=other.querySelector(`input[value="${choice}"]`); if(radio)radio.checked=true;
        other.classList.toggle('correct',correct);other.classList.toggle('incorrect',!correct);
        const f=other.querySelector('.feedback');f.className=`feedback show ${correct?'good':'bad'}`;f.innerHTML=feedbackMarkup(q,choice);
      });
    });
  });
}

function renderQuickChecks(){
  document.querySelectorAll('.quick-check').forEach(box=>{const q=QUESTIONS.find(x=>x.id===Number(box.dataset.question));if(!q)return;box.innerHTML=questionMarkup(q,true);bindQuestions(box);});
}

function renderQuiz(filter='all'){
  const list=document.getElementById('quizList');
  const qs=filter==='all'?QUESTIONS:QUESTIONS.filter(q=>q.difficulty===filter);
  list.innerHTML=qs.map(q=>questionMarkup(q)).join(''); bindQuestions(list);
}

function updateProgress(){
  document.querySelectorAll('.complete-btn').forEach(btn=>{const done=state.completed.includes(btn.dataset.complete);btn.classList.toggle('completed',done);btn.textContent=done?'已完成這一節':'標記這節已完成';btn.setAttribute('aria-pressed',String(done));});
  const count=state.completed.length;document.getElementById('progressText').textContent=`${count}／${lessonTotal} 節完成`;document.getElementById('progressBar').style.width=`${count/lessonTotal*100}%`;
}

function updateScore(){
  const entries=Object.values(state.answers);const correct=entries.filter(a=>a.correct).length;
  document.getElementById('answeredText').textContent=`${entries.length}／${questionTotal} 題`;
  document.getElementById('scoreText').textContent=entries.length?`${correct} 題答對`:'尚未作答';
}

document.querySelectorAll('.complete-btn').forEach(btn=>btn.addEventListener('click',()=>{const key=btn.dataset.complete;const i=state.completed.indexOf(key);i>=0?state.completed.splice(i,1):state.completed.push(key);save();}));
document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));btn.classList.add('active');renderQuiz(btn.dataset.filter);}));
document.getElementById('resetQuiz').addEventListener('click',()=>{if(confirm(`確定要清除 ${questionTotal} 題的作答紀錄嗎？`)){state.answers={};save();renderQuiz(document.querySelector('.filter.active').dataset.filter);renderQuickChecks();}});

const navToggle=document.getElementById('navToggle');const sideNav=document.getElementById('sideNav');
navToggle.addEventListener('click',()=>{const open=sideNav.classList.toggle('open');navToggle.setAttribute('aria-expanded',String(open));});
sideNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{sideNav.classList.remove('open');navToggle.setAttribute('aria-expanded','false');}));

const sections=[...document.querySelectorAll('main section[id]')];const navLinks=[...sideNav.querySelectorAll('a')];
const observer=new IntersectionObserver(entries=>{const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];if(!visible)return;navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+visible.target.id));},{rootMargin:'-20% 0px -65% 0px',threshold:[0,.2,.5]});
sections.forEach(s=>observer.observe(s));

function alignHashTarget(){
  if(!location.hash)return;
  const target=document.getElementById(decodeURIComponent(location.hash.slice(1)));
  if(!target)return;
  requestAnimationFrame(()=>requestAnimationFrame(()=>{
    const previousBehavior=document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior='auto';
    target.scrollIntoView({block:'start'});
    window.scrollBy(0,-90);
    document.documentElement.style.scrollBehavior=previousBehavior;
  }));
}

renderQuickChecks();renderQuiz();updateProgress();updateScore();showStorageNotice();alignHashTarget();
window.addEventListener('hashchange',alignHashTarget);
