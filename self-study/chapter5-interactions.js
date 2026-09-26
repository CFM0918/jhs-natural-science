(() => {
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const interpolate = (start, end, ratio) => start + (end - start) * ratio;

  function initializeThermometer() {
    const input = document.querySelector("#temperatureRange");
    if (!input) return;
    const output = document.querySelector("#temperatureOut");
    const celsiusOutput = document.querySelector("#celsiusReadout");
    const fahrenheitOutput = document.querySelector("#fahrenheitReadout");
    const stateOutput = document.querySelector("#temperatureState");
    const liquid = document.querySelector("#thermometerLiquid");
    const description = document.querySelector("#thermometerSvgDesc");

    function update() {
      const celsius = Number(input.value);
      const fahrenheit = celsius * 9 / 5 + 32;
      const ratio = (celsius + 20) / 140;
      const topY = 250 - ratio * 180;
      const state = celsius < 0 ? "低於水的凝固點" : celsius < 15 ? "偏冷" : celsius <= 30 ? "室溫附近" : celsius < 100 ? "高於一般室溫" : celsius === 100 ? "水在一大氣壓下的沸點" : "高於水的標準沸點";
      liquid.setAttribute("y", topY.toFixed(1));
      liquid.setAttribute("height", (285 - topY).toFixed(1));
      output.textContent = `${celsius}°C`;
      celsiusOutput.textContent = `${celsius}°C`;
      fahrenheitOutput.textContent = `${fahrenheit.toFixed(1)}°F`;
      stateOutput.textContent = state;
      description.textContent = `目前攝氏 ${celsius} 度，華氏 ${fahrenheit.toFixed(1)} 度，${state}。`;
      input.setAttribute("aria-valuetext", `攝氏 ${celsius} 度，華氏 ${fahrenheit.toFixed(1)} 度`);
    }

    input.addEventListener("input", update);
    update();
  }

  const expansionMaterials = {
    aluminum: { name: "鋁", coefficient: 0.000023, color: "#f97316" },
    steel: { name: "鋼", coefficient: 0.000012, color: "#64748b" },
    glass: { name: "玻璃", coefficient: 0.000009, color: "#38bdf8" }
  };

  function initializeExpansionLab() {
    const materialSelect = document.querySelector("#expansionMaterialSelect");
    const temperatureInput = document.querySelector("#expansionTemperatureRange");
    if (!materialSelect || !temperatureInput) return;
    const temperatureOutput = document.querySelector("#expansionTemperatureOut");
    const lengthOutput = document.querySelector("#expandedLengthOut");
    const changeOutput = document.querySelector("#expansionChangeOut");
    const rod = document.querySelector("#expandingRod");
    const marker = document.querySelector("#rodEndMarker");
    const markerLabel = document.querySelector("#rodEndLabel");
    const description = document.querySelector("#expansionSvgDesc");

    function update() {
      const material = expansionMaterials[materialSelect.value];
      const temperature = Number(temperatureInput.value);
      const deltaTemperature = temperature - 20;
      const initialLength = 100;
      const change = initialLength * material.coefficient * deltaTemperature;
      const length = initialLength + change;
      const visualWidth = clamp(520 * (1 + material.coefficient * deltaTemperature * 80), 450, 590);
      const endX = 80 + visualWidth;
      temperatureOutput.textContent = `${temperature}°C`;
      lengthOutput.textContent = `${length.toFixed(3)} cm`;
      changeOutput.textContent = `相對 20°C：${change >= 0 ? "+" : ""}${change.toFixed(3)} cm`;
      rod.setAttribute("width", visualWidth.toFixed(1));
      rod.style.fill = material.color;
      marker.setAttribute("d", `M${endX.toFixed(1)} 70V180`);
      markerLabel.setAttribute("x", clamp(endX - 44, 455, 620).toFixed(1));
      markerLabel.textContent = `${length.toFixed(3)} cm`;
      description.textContent = `${material.name}尺在 ${temperature} 攝氏度時長 ${length.toFixed(3)} 公分，相對 20 度改變 ${change.toFixed(3)} 公分。圖中變化已放大。`;
      temperatureInput.setAttribute("aria-valuetext", `${material.name}在攝氏 ${temperature} 度，長度 ${length.toFixed(3)} 公分`);
    }

    materialSelect.addEventListener("change", update);
    temperatureInput.addEventListener("input", update);
    update();
  }

  function initializeSpecificHeatLab() {
    const input = document.querySelector("#heatEnergyRange");
    if (!input) return;
    const energyOutput = document.querySelector("#heatEnergyOut");
    const summary = document.querySelector("#heatChartSummary");
    const materials = [
      { key: "water", name: "水", c: 4.2 },
      { key: "aluminum", name: "鋁", c: 0.9 },
      { key: "iron", name: "鐵", c: 0.45 }
    ];

    function update() {
      const energy = Number(input.value);
      const mass = 200;
      const rises = materials.map((material) => ({ ...material, rise: energy / (mass * material.c) }));
      const maximum = Math.max(...rises.map((item) => item.rise));
      rises.forEach((item) => {
        const bar = document.querySelector(`#${item.key}Bar`);
        const riseOutput = document.querySelector(`#${item.key}Rise`);
        const height = 30 + item.rise / maximum * 145;
        bar.style.height = `${height.toFixed(1)}px`;
        riseOutput.textContent = `${item.rise.toFixed(1)}°C`;
      });
      energyOutput.textContent = `${energy} J`;
      summary.textContent = `相同 200 公克吸收 ${energy} 焦耳時，水升高 ${rises[0].rise.toFixed(1)} 度、鋁升高 ${rises[1].rise.toFixed(1)} 度、鐵升高 ${rises[2].rise.toFixed(1)} 度。比熱越大，溫升越小。`;
      input.setAttribute("aria-valuetext", `每 200 公克吸收 ${energy} 焦耳`);
    }

    input.addEventListener("input", update);
    update();
  }

  function initializeMixingLab() {
    const hotInput = document.querySelector("#hotWaterMassRange");
    const coldInput = document.querySelector("#coldWaterMassRange");
    if (!hotInput || !coldInput) return;
    const hotOutput = document.querySelector("#hotWaterMassOut");
    const coldOutput = document.querySelector("#coldWaterMassOut");
    const temperatureOutput = document.querySelector("#balanceTemperatureOut");
    const cupTemperature = document.querySelector("#balanceCupTemperature");

    function update() {
      const hotMass = Number(hotInput.value);
      const coldMass = Number(coldInput.value);
      const temperature = (hotMass * 80 + coldMass * 20) / (hotMass + coldMass);
      hotOutput.textContent = `${hotMass} g`;
      coldOutput.textContent = `${coldMass} g`;
      temperatureOutput.textContent = `平衡溫度 ${temperature.toFixed(1)}°C`;
      cupTemperature.textContent = `${temperature.toFixed(1)}°C`;
      hotInput.setAttribute("aria-valuetext", `80 度熱水 ${hotMass} 公克`);
      coldInput.setAttribute("aria-valuetext", `20 度冷水 ${coldMass} 公克`);
    }

    hotInput.addEventListener("input", update);
    coldInput.addEventListener("input", update);
    update();
  }

  const curveSegments = [
    { start: 0, end: 20, x1: 75, y1: 310, x2: 190, y2: 230, phase: "固態升溫", temperature: (r) => -20 + 20 * r, note: "吸收的能量使固體粒子振動更劇烈，溫度上升。" },
    { start: 20, end: 38, x1: 190, y1: 230, x2: 315, y2: 230, phase: "熔化：固、液共存", temperature: () => 0, note: "能量用於改變物態，溫度維持在熔點。" },
    { start: 38, end: 68, x1: 315, y1: 230, x2: 485, y2: 95, phase: "液態升溫", temperature: (r) => 100 * r, note: "吸收的能量使液體粒子運動更劇烈，溫度上升。" },
    { start: 68, end: 86, x1: 485, y1: 95, x2: 595, y2: 95, phase: "沸騰：液、氣共存", temperature: () => 100, note: "能量用於汽化，溫度維持在沸點。" },
    { start: 86, end: 100, x1: 595, y1: 95, x2: 670, y2: 45, phase: "氣態升溫", temperature: (r) => 100 + 30 * r, note: "物質已完全汽化，繼續吸熱使氣體溫度上升。" }
  ];

  function initializeHeatingCurve() {
    const input = document.querySelector("#heatingProgressRange");
    if (!input) return;
    const progressOutput = document.querySelector("#heatingProgressOut");
    const phaseOutput = document.querySelector("#currentPhaseOut");
    const temperatureOutput = document.querySelector("#currentTemperatureOut");
    const noteOutput = document.querySelector("#currentEnergyNote");
    const cursor = document.querySelector("#curveCursor");
    const description = document.querySelector("#curveSvgDesc");

    function update() {
      const progress = Number(input.value);
      const segment = curveSegments.find((item) => progress <= item.end) || curveSegments[curveSegments.length - 1];
      const ratio = (progress - segment.start) / (segment.end - segment.start || 1);
      const x = interpolate(segment.x1, segment.x2, ratio);
      const y = interpolate(segment.y1, segment.y2, ratio);
      const temperature = segment.temperature(ratio);
      cursor.setAttribute("cx", x.toFixed(1));
      cursor.setAttribute("cy", y.toFixed(1));
      progressOutput.textContent = `${progress}%`;
      phaseOutput.textContent = segment.phase;
      temperatureOutput.textContent = `約 ${temperature.toFixed(0)}°C`;
      noteOutput.textContent = segment.note;
      description.textContent = `目前游標位於${segment.phase}區段，溫度約 ${temperature.toFixed(0)} 攝氏度。${segment.note}`;
      input.setAttribute("aria-valuetext", `加熱進度 ${progress}%，${segment.phase}，溫度約 ${temperature.toFixed(0)} 度`);
    }

    input.addEventListener("input", update);
    update();
  }

  const heatTransferRounds = [
    { term: "金屬湯匙放進熱湯，握柄逐漸變熱", answer: "conduction", hint: "熱沿著固體湯匙前進。", explanation: "金屬內的粒子把能量由熱端傳到冷端，主要是傳導。" },
    { term: "冷氣裝在房間高處，冷空氣下沉形成循環", answer: "convection", hint: "空氣有整體流動。", explanation: "冷、熱空氣密度不同而循環，主要是對流。" },
    { term: "隔著一段距離也能感到營火的熱", answer: "radiation", hint: "不需要直接接觸，也不靠空氣整體流來判斷。", explanation: "營火以紅外線等電磁波向外傳能，主要是輻射。" },
    { term: "太陽穿過太空使地面升溫", answer: "radiation", hint: "太空近似真空。", explanation: "輻射不需介質，能穿越真空把太陽能量帶到地球。" },
    { term: "水壺底部受熱後，熱水上升、冷水下沉", answer: "convection", hint: "水在壺內形成循環。", explanation: "液體受熱密度變小上升，冷水下沉，形成對流。" }
  ];

  const phaseEnergyRounds = [
    { term: "冰塊融化成水", answer: "absorbs", hint: "熔化需要克服粒子間作用。", explanation: "熔化時物質從環境吸收能量。" },
    { term: "水蒸氣在冷杯外凝結成水滴", answer: "releases", hint: "凝結是氣態變成液態。", explanation: "凝結時物質向環境放出潛熱。" },
    { term: "乾冰直接變成二氧化碳氣體", answer: "absorbs", hint: "固態直接變氣態稱為昇華。", explanation: "昇華需要吸收能量。" },
    { term: "液態水在 1 大氣壓下由 20°C 加熱到 60°C", answer: "temperature-only", hint: "仍維持液態。", explanation: "這段沒有換態，吸熱主要使溫度上升。" },
    { term: "冬天窗面形成霜，水蒸氣直接變成冰", answer: "releases", hint: "氣態直接變固態稱為凝華。", explanation: "凝華時物質向環境放出能量。" }
  ];

  function initializeGame(rootId, rounds, originalPrompt) {
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
      feedback.textContent = score === rounds.length ? "全部答對，熱學觀念很穩！" : `完成！本次答對 ${score} 題，共 ${rounds.length} 題。`;
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
      prompt.textContent = originalPrompt;
      renderRound();
      choices[0].focus();
    });
    renderRound();
  }

  initializeThermometer();
  initializeExpansionLab();
  initializeSpecificHeatLab();
  initializeMixingLab();
  initializeHeatingCurve();
  initializeGame("heatTransferGame", heatTransferRounds, "找出情境中最主要的傳熱方式。");
  initializeGame("phaseEnergyGame", phaseEnergyRounds, "判斷物態變化與環境間的能量方向。");
})();
