(() => {
  function initializeDisplacementLab() {
    const waterInput = document.querySelector("#waterBeforeRange");
    const stoneInput = document.querySelector("#stoneVolumeRange");
    if (!waterInput || !stoneInput) return;

    const waterOutput = document.querySelector("#waterBeforeOutput");
    const stoneOutput = document.querySelector("#stoneVolumeOutput");
    const beforeFill = document.querySelector("#beforeWaterFill");
    const afterFill = document.querySelector("#afterWaterFill");
    const beforeText = document.querySelector("#beforeCylinderText");
    const afterText = document.querySelector("#afterCylinderText");
    const summary = document.querySelector("#displacementSummary");
    const cylinderBottom = 228;
    const scale = 2.05;

    function setCylinder(fill, label, reading) {
      const height = reading * scale;
      const top = cylinderBottom - height;
      fill.setAttribute("y", top.toFixed(1));
      fill.setAttribute("height", height.toFixed(1));
      label.setAttribute("y", String(Math.max(34, Math.round(top - 10))));
      label.textContent = `${reading} mL`;
    }

    function updateDisplacement() {
      const before = Number(waterInput.value);
      const stone = Number(stoneInput.value);
      const after = before + stone;

      waterOutput.textContent = `${before} mL`;
      stoneOutput.textContent = `${stone} cm³`;
      setCylinder(beforeFill, beforeText, before);
      setCylinder(afterFill, afterText, after);
      summary.textContent = `${after}－${before}＝${stone}，因此石塊體積是 ${stone} cm³。`;
      waterInput.setAttribute("aria-valuetext", `${before} 毫升原有水量`);
      stoneInput.setAttribute("aria-valuetext", `${stone} 立方公分石塊體積`);
    }

    waterInput.addEventListener("input", updateDisplacement);
    stoneInput.addEventListener("input", updateDisplacement);
    updateDisplacement();
  }

  function initializeDensitySimulator() {
    const massInput = document.querySelector("#objectMassRange");
    const volumeInput = document.querySelector("#objectVolumeRange");
    const liquidSelect = document.querySelector("#liquidSelect");
    if (!massInput || !volumeInput || !liquidSelect) return;

    const massOutput = document.querySelector("#objectMassOutput");
    const volumeOutput = document.querySelector("#objectVolumeOutput");
    const densityValue = document.querySelector("#objectDensityValue");
    const result = document.querySelector("#floatResult");
    const summary = document.querySelector("#floatSummary");
    const object = document.querySelector("#floatObject");
    const svgDescription = document.querySelector("#floatTankDesc");

    function updateDensity() {
      const mass = Number(massInput.value);
      const volume = Number(volumeInput.value);
      const objectDensity = mass / volume;
      const liquidDensity = Number(liquidSelect.value);
      const liquidName = liquidSelect.options[liquidSelect.selectedIndex].text.split("（")[0];
      const difference = objectDensity - liquidDensity;
      let state;

      if (Math.abs(difference) <= 0.02) {
        state = { word: "懸浮", comparison: "約等於", y: 155, color: "#0f766e" };
      } else if (difference < 0) {
        state = { word: "上浮", comparison: "小於", y: 73, color: "#f97316" };
      } else {
        state = { word: "下沉", comparison: "大於", y: 205, color: "#0369a1" };
      }

      massOutput.textContent = `${mass} g`;
      volumeOutput.textContent = `${volume} cm³`;
      densityValue.textContent = `${objectDensity.toFixed(2)} g/cm³`;
      result.textContent = `${state.comparison}${liquidName}，所以${state.word}`;
      summary.textContent = `物體密度 ${objectDensity.toFixed(2)} g/cm³，${state.comparison}${liquidName}的 ${liquidDensity.toFixed(2)} g/cm³，因此${state.word}。`;
      svgDescription.textContent = summary.textContent;
      object.setAttribute("cy", state.y);
      object.setAttribute("fill", state.color);
      massInput.setAttribute("aria-valuetext", `${mass} 克`);
      volumeInput.setAttribute("aria-valuetext", `${volume} 立方公分`);
    }

    massInput.addEventListener("input", updateDensity);
    volumeInput.addEventListener("input", updateDensity);
    liquidSelect.addEventListener("change", updateDensity);
    updateDensity();
  }

  const toolRounds = [
    { term: "測量橡皮擦的質量", answer: "balance", hint: "質量常以克表示。", explanation: "天平用來測量物體的質量。" },
    { term: "測量燒杯中水的體積", answer: "cylinder", hint: "液體體積常以毫升表示。", explanation: "量筒有體積刻度，適合測量液體體積。" },
    { term: "測量課桌的長度", answer: "ruler", hint: "長度需要有公分或毫米刻度的量具。", explanation: "直尺可直接測量課桌長度。" },
    { term: "測量不規則小石頭的體積", answer: "displacement", hint: "石頭沒有規則邊長，無法直接套長方體公式。", explanation: "將石頭完全浸入液體，以液面前後差值求體積。" }
  ];

  const floatRounds = [
    { term: "木塊 0.6 g/cm³，放入水 1.0 g/cm³", answer: "float", hint: "物體密度比液體小。", explanation: "0.6 小於 1.0，所以木塊上浮。" },
    { term: "塑膠球 1.2 g/cm³，放入水 1.0 g/cm³", answer: "sink", hint: "物體密度比液體大。", explanation: "1.2 大於 1.0，所以塑膠球下沉。" },
    { term: "小球 1.0 g/cm³，放入水 1.0 g/cm³", answer: "suspend", hint: "兩者密度相同。", explanation: "物體與液體密度相同時，小球可懸浮。" },
    { term: "塑膠塊 0.9 g/cm³，放入油 0.8 g/cm³", answer: "sink", hint: "不要只看物體密度小於 1，要和這杯液體比較。", explanation: "0.9 大於油的 0.8，所以塑膠塊下沉。" },
    { term: "小球 1.1 g/cm³，放入食鹽水 1.2 g/cm³", answer: "float", hint: "物體密度比食鹽水小。", explanation: "1.1 小於 1.2，所以小球上浮。" }
  ];

  function initializeGame(rootId, rounds, initialPrompt) {
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
      item.textContent = rounds[roundIndex].term;
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
        ? "全部答對，測量與密度概念都掌握了！"
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
      if (roundIndex >= rounds.length) finishGame();
      else {
        renderRound();
        choices[0].focus();
      }
    });

    restartButton.addEventListener("click", () => {
      roundIndex = 0;
      score = 0;
      prompt.textContent = initialPrompt;
      renderRound();
      choices[0].focus();
    });

    renderRound();
  }

  initializeDisplacementLab();
  initializeDensitySimulator();
  initializeGame("toolGame", toolRounds, "選出最適合的量具或方法。");
  initializeGame("floatGame", floatRounds, "比較物體和液體密度，判斷最後狀態。");
})();
