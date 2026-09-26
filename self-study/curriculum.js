(function(){
  const search=document.getElementById('courseSearch');if(!search)return;
  let term='all';const cards=[...document.querySelectorAll('[data-course-id]')];
  function filter(){const query=search.value.trim().toLocaleLowerCase();let count=0;cards.forEach(card=>{const visible=(term==='all'||card.dataset.term===term)&&card.dataset.search.toLocaleLowerCase().includes(query);card.hidden=!visible;if(visible)count++;});document.querySelectorAll('[data-term-section]').forEach(section=>section.hidden=![...section.querySelectorAll('[data-course-id]')].some(c=>!c.hidden));document.getElementById('catalogCount').textContent=`共 ${count} 章符合條件`;document.querySelector('.catalog-empty').hidden=count!==0;}
  search.addEventListener('input',filter);
  document.querySelectorAll('button[data-term]').forEach(button=>button.addEventListener('click',()=>{term=button.dataset.term;document.querySelectorAll('button[data-term]').forEach(b=>{const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});filter();}));
  function progress(){(window.COURSE_CATALOG||[]).forEach(course=>{const target=document.querySelector(`[data-progress="${course.id}"]`);if(!target)return;try{const saved=JSON.parse(localStorage.getItem(course.storage)||'null');const complete=Array.isArray(saved?.completed)?Math.min(course.lessons,new Set(saved.completed).size):0;const answered=saved?.answers&&typeof saved.answers==='object'?Object.keys(saved.answers).length:0;target.textContent=complete||answered?`已學 ${complete}／${course.lessons} 節・已答 ${Math.min(30,answered)}／30 題`:'尚未開始';}catch{target.textContent='可直接開始學習';}});}
  progress();window.addEventListener('pageshow',progress);window.addEventListener('storage',progress);
})();
