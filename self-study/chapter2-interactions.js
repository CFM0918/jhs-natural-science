(() => {
  const svgNamespace = "http://www.w3.org/2000/svg";

  const particleStates = {
    solid: {
      label: "固態",
      description: "固態粒子排列緊密且位置固定，只能在原位附近振動。",
      svgDescription: "目前顯示固態粒子排列緊密而規則。",
      points: Array.from({ length: 20 }, (_, index) => ({
        x: 112 + (index % 5) * 34,
        y: 80 + Math.floor(index / 5) * 34
      }))
    },
    liquid: {
      label: "液態",
      description: "液態粒子彼此距離近，但排列不規則，可以互相移動，所以形狀會隨容器改變。",
      svgDescription: "目前顯示液態粒子靠近容器底部，排列緊密但不規則。",
      points: [
        [55, 177], [91, 181], [128, 172], [166, 181], [205, 174], [244, 181], [284, 173],
        [70, 144], [108, 138], [146, 148], [184, 140], [223, 146], [263, 139], [301, 147],
        [92, 108], [132, 116], [171, 106], [213, 114], [254, 105], [286, 115]
      ].map(([x, y]) => ({ x, y }))
    },
    gas: {
      label: "氣態",
      description: "氣態粒子距離很遠，能快速向各方向移動，因此沒有固定形狀與體積，會充滿容器。",
      svgDescription: "目前顯示氣態粒子彼此距離很遠，分散在整個容器中。",
      points: [
        [54, 55], [126, 46], [208, 64], [302, 48], [87, 105], [178, 98], [270, 112],
        [47, 162], [142, 174], [228, 151], [315, 183], [118, 201], [241, 199], [325, 92]
      ].map(([x, y]) => ({ x, y }))
    }
  };

  function initializeParticleModel() {
    const particleGroup = document.querySelector("#particleDots");
    const description = document.querySelector("#particleDescription");
    const svgDescription = document.querySelector("#particleSvgDesc");
    const buttons = [...document.querySelectorAll(".state-btn")];

    if (!particleGroup || !description || !svgDescription || buttons.length === 0) return;

    function renderParticles(stateName) {
      const state = particleStates[stateName];
      particleGroup.replaceChildren();

      state.points.forEach((point, index) => {
        const circle = document.createElementNS(svgNamespace, "circle");
        circle.setAttribute("cx", point.x);
        circle.setAttribute("cy", point.y);
        circle.setAttribute("r", stateName === "gas" ? "10" : "12");
        circle.setAttribute("class", index % 4 === 0 ? "particle-dot particle-dot-alt" : "particle-dot");
        particleGroup.append(circle);
      });

      description.textContent = state.description;
      svgDescription.textContent = state.svgDescription;
      buttons.forEach((button) => {
        const isActive = button.dataset.state === stateName;
        button.classList.toggle("active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
      });
    }

    buttons.forEach((button) => {
      button.addEventListener("click", () => renderParticles(button.dataset.state));
    });

    renderParticles("solid");
  }

  function initializeConcentrationLab() {
    const soluteInput = document.querySelector("#soluteRange");
    const solventInput = document.querySelector("#solventRange");
    const soluteOutput = document.querySelector("#soluteOutput");
    const solventOutput = document.querySelector("#solventOutput");
    const concentrationValue = document.querySelector("#concentrationValue");
    const solutionMass = document.querySelector("#solutionMass");
    const soluteBar = document.querySelector("#soluteBar");
    const solventBar = document.querySelector("#solventBar");
    const summary = document.querySelector("#concentrationSummary");

    if (!soluteInput || !solventInput) return;

    function updateConcentration() {
      const solute = Number(soluteInput.value);
      const solvent = Number(solventInput.value);
      const total = solute + solvent;
      const percentage = (solute / total) * 100;
      const displayedPercentage = percentage.toFixed(1);

      soluteOutput.textContent = `${solute} g`;
      solventOutput.textContent = `${solvent} g`;
      concentrationValue.textContent = `${displayedPercentage}%`;
      solutionMass.textContent = `溶液總質量 ${total} g`;
      soluteBar.style.width = `${percentage}%`;
      solventBar.style.width = `${100 - percentage}%`;
      soluteBar.textContent = percentage >= 14 ? "溶質" : "";
      solventBar.textContent = percentage <= 86 ? "溶劑" : "";
      summary.textContent = `${solute} 克溶質加入 ${solvent} 克溶劑，總質量 ${total} 克，重量百分濃度 ${displayedPercentage}%。`;
      soluteInput.setAttribute("aria-valuetext", `${solute} 克溶質`);
      solventInput.setAttribute("aria-valuetext", `${solvent} 克溶劑`);
    }

    soluteInput.addEventListener("input", updateConcentration);
    solventInput.addEventListener("input", updateConcentration);
    updateConcentration();
  }

  const propertyRounds = [
    { term: "沸點", answer: "physical", hint: "測量時不需要生成新物質。", explanation: "沸點可在物質身分不變時測量，屬於物理性質。" },
    { term: "密度", answer: "physical", hint: "想想量質量與體積時，物質有沒有改變。", explanation: "測量密度不會改變物質種類，屬於物理性質。" },
    { term: "溶解度", answer: "physical", hint: "溶解不等於產生新物質。", explanation: "溶解度描述溶解能力，屬於物理性質。" },
    { term: "可燃性", answer: "chemical", hint: "燃燒會形成和原來不同的物質。", explanation: "可燃性必須經由化學反應表現，屬於化學性質。" },
    { term: "與酸反應的能力", answer: "chemical", hint: "和酸作用會不會產生新物質？", explanation: "與酸反應的能力要透過化學反應判斷，屬於化學性質。" },
    { term: "容易生鏽", answer: "chemical", hint: "鐵鏽和原來的鐵不是同一種物質。", explanation: "生鏽會形成新物質，容易生鏽屬於化學性質。" }
  ];

  const separationRounds = [
    { term: "從泥水中取得清澈的水", answer: "filter", hint: "泥沙不溶於水，顆粒可被濾紙攔住。", explanation: "過濾可讓水通過，並把不溶的泥沙留在濾紙上。" },
    { term: "從海水中取得食鹽晶體", answer: "evaporate", hint: "目標是留下已溶解的固體。", explanation: "蒸發水分後，食鹽會結晶留下。" },
    { term: "從食鹽水中取得較純的水", answer: "distill", hint: "目標是收集液體，而不是留下鹽。", explanation: "蒸餾讓水先汽化，再冷凝收集成較純的水。" },
    { term: "分開黑色墨水中的不同色素", answer: "chromatography", hint: "利用各色素在濾紙上移動程度不同。", explanation: "濾紙層析可把移動程度不同的色素分開。" },
    { term: "從砂與水的混合物中取得砂", answer: "filter", hint: "砂是不溶於水的固體。", explanation: "過濾後，砂會留在濾紙上。" }
  ];

  function initializeGame(rootId, rounds) {
    const root = document.querySelector(`#${rootId}`);
    if (!root) return;

    const prompt = root.querySelector(".game-prompt");
    const item = root.querySelector("[data-game-item]");
    const scoreElement = root.querySelector(".game-score");
    const feedback = root.querySelector(".game-feedback");
    const choices = [...root.querySelectorAll("[data-choice]")];
    const nextButton = root.querySelector(".game-next");
    const restartButton = root.querySelector(".game-restart");
    let roundIndex = 0;
    let score = 0;

    function setChoiceState(disabled) {
      choices.forEach((button) => {
        button.disabled = disabled;
        button.removeAttribute("aria-current");
      });
    }

    function renderRound() {
      const round = rounds[roundIndex];
      item.textContent = round.term;
      scoreElement.textContent = `${score}／${rounds.length}`;
      feedback.textContent = "選一個答案。";
      feedback.classList.remove("good", "bad");
      nextButton.hidden = true;
      nextButton.textContent = roundIndex === rounds.length - 1 ? "查看結果" : "下一題";
      setChoiceState(false);
    }

    function finishGame() {
      item.textContent = "挑戰完成";
      prompt.textContent = "你已完成全部題目，可以重新開始練習。";
      scoreElement.textContent = `${score}／${rounds.length}`;
      feedback.textContent = score === rounds.length
        ? "全部答對，分類與分離方法都掌握了！"
        : `完成！本次答對 ${score} 題，共 ${rounds.length} 題。`;
      feedback.classList.remove("bad");
      feedback.classList.add("good");
      nextButton.hidden = true;
      setChoiceState(true);
      restartButton.focus();
    }

    choices.forEach((button) => {
      button.addEventListener("click", () => {
        const round = rounds[roundIndex];
        if (button.dataset.choice === round.answer) {
          score += 1;
          scoreElement.textContent = `${score}／${rounds.length}`;
          feedback.textContent = `答對！${round.explanation}`;
          feedback.classList.remove("bad");
          feedback.classList.add("good");
          setChoiceState(true);
          button.setAttribute("aria-current", "true");
          nextButton.hidden = false;
          nextButton.focus();
        } else {
          feedback.textContent = `再想想：${round.hint}`;
          feedback.classList.remove("good");
          feedback.classList.add("bad");
        }
      });
    });

    nextButton.addEventListener("click", () => {
      roundIndex += 1;
      if (roundIndex >= rounds.length) {
        finishGame();
      } else {
        renderRound();
        choices[0].focus();
      }
    });

    restartButton.addEventListener("click", () => {
      roundIndex = 0;
      score = 0;
      prompt.textContent = rootId === "propertyGame"
        ? "判斷畫面中的性質屬於哪一類。"
        : "依照要取得的物質，選擇最合適的方法。";
      renderRound();
      choices[0].focus();
    });

    renderRound();
  }

  initializeParticleModel();
  initializeConcentrationLab();
  initializeGame("propertyGame", propertyRounds);
  initializeGame("separationGame", separationRounds);
})();
