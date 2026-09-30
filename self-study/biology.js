(() => {
  const page = document.body;
  const courseId = page.dataset.bioCourse;
  if (!courseId) return;
  const storageKey = `${courseId}-v1`;
  const toggle = document.getElementById('bioNavToggle');
  const nav = document.getElementById('bioSideNav');
  const load = () => {
    try { return JSON.parse(localStorage.getItem(storageKey)) || {completed: []}; }
    catch { return {completed: []}; }
  };
  let state = load();
  if (!Array.isArray(state.completed)) state.completed = [];

  function save() {
    try { localStorage.setItem(storageKey, JSON.stringify(state)); }
    catch { /* Learning remains usable when browser storage is unavailable. */ }
    const done = new Set(state.completed).size;
    const text = document.getElementById('bioProgressText');
    const bar = document.getElementById('bioProgressBar');
    if (text) text.textContent = `${done}／4 節完成`;
    if (bar) bar.style.width = `${done / 4 * 100}%`;
    document.querySelectorAll('[data-bio-complete]').forEach(button => {
      const complete = state.completed.includes(Number(button.dataset.bioComplete));
      button.setAttribute('aria-pressed', String(complete));
      button.textContent = complete ? '✓ 這節已完成（可再次點選取消）' : '標記這節已完成';
    });
  }
  save();

  toggle?.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    nav?.classList.toggle('open', open);
  });
  nav?.addEventListener('click', event => {
    if (event.target.closest('a')) {
      nav.classList.remove('open');
      toggle?.setAttribute('aria-expanded', 'false');
    }
  });
  document.querySelectorAll('[data-bio-complete]').forEach(button => button.addEventListener('click', () => {
    const id = Number(button.dataset.bioComplete);
    state.completed = state.completed.includes(id) ? state.completed.filter(x => x !== id) : [...state.completed, id];
    save();
  }));

  document.querySelectorAll('.bio-check').forEach(check => {
    check.dataset.resolved = 'false';
    check.querySelectorAll('.bio-option').forEach(button => button.addEventListener('click', () => {
      if (check.dataset.resolved === 'true') return;
      const right = Number(button.dataset.choice) === Number(check.dataset.answer);
      check.querySelectorAll('.bio-option').forEach(option => option.classList.remove('is-correct', 'is-wrong'));
      button.classList.add(right ? 'is-correct' : 'is-wrong');
      const feedback = check.querySelector('.bio-feedback');
      if (right) {
        check.dataset.resolved = 'true';
        feedback.className = 'bio-feedback good';
        feedback.textContent = `答對了。${check.dataset.why}`;
      } else {
        feedback.className = 'bio-feedback retry';
        feedback.textContent = '再看一次圖或文字中的線索，再選一次。';
      }
      const game = check.closest('.bio-game');
      if (game) {
        const total = game.querySelectorAll('.bio-check').length;
        const score = game.querySelectorAll('.bio-check[data-resolved="true"]').length;
        const scoreLabel = game.querySelector('.bio-game-score');
        scoreLabel.textContent = score === total ? `完成挑戰！${score}／${total} 題` : `目前答對 ${score}／${total} 題`;
      }
    }));
  });

  document.querySelectorAll('.bio-game-reset').forEach(button => button.addEventListener('click', () => {
    const game = button.closest('.bio-game');
    game.querySelectorAll('.bio-check').forEach(check => {
      check.dataset.resolved = 'false';
      check.querySelectorAll('.bio-option').forEach(option => option.classList.remove('is-correct', 'is-wrong'));
      const feedback = check.querySelector('.bio-feedback');
      feedback.className = 'bio-feedback';
      feedback.textContent = '';
    });
    game.querySelector('.bio-game-score').textContent = '目前答對 0 題';
  }));

  const figureDialog = document.getElementById('bioFigureDialog');
  const figureCanvas = document.getElementById('bioFigureDialogCanvas');
  const figureTitle = document.getElementById('bioFigureDialogTitle');
  const figureGuide = document.querySelector('#bioFigureDialogGuide p');
  const figureCaption = document.getElementById('bioFigureDialogCaption');
  document.querySelectorAll('[data-bio-expand]').forEach(button => button.addEventListener('click', () => {
    const figure = button.closest('.bio-diagram');
    const svg = figure?.querySelector('.bio-svg-wrap > svg');
    if (!figureDialog || !figureCanvas || !svg) return;
    figureCanvas.replaceChildren(svg.cloneNode(true));
    figureTitle.textContent = figure.querySelector('h3')?.textContent || '查看完整圖面';
    if (figureGuide) figureGuide.textContent = figure.querySelector('.bio-diagram-reading p')?.textContent || '';
    figureCaption.textContent = figure.querySelector('figcaption')?.textContent || '';
    if (typeof figureDialog.showModal === 'function') figureDialog.showModal();
    else figureDialog.setAttribute('open', '');
    figureCanvas.focus({preventScroll: true});
  }));
})();

