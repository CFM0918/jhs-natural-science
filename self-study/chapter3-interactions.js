(() => {
  function sinePath({ startX, endX, centerY, amplitude, wavelength }) {
    const points = [];
    for (let x = startX; x <= endX; x += 3) {
      const y = centerY - amplitude * Math.sin(((x - startX) / wavelength) * Math.PI * 2);
      points.push(`${points.length ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`);
    }
    return points.join(" ");
  }

  function initializeWaveMaker() {
    const amplitudeInput = document.querySelector("#waveAmplitudeRange");
    const frequencyInput = document.querySelector("#waveFrequencyRange");
    const mediumSelect = document.querySelector("#waveMediumSelect");
    const path = document.querySelector("#wavePath");
    if (!amplitudeInput || !frequencyInput || !mediumSelect || !path) return;

    const amplitudeOutput = document.querySelector("#waveAmplitudeOut");
    const frequencyOutput = document.querySelector("#waveFrequencyOut");
    const speedOutput = document.querySelector("#waveSpeedOut");
    const wavelengthOutput = document.querySelector("#wavelengthOut");
    const summary = document.querySelector("#waveSummary");
    const svgDescription = document.querySelector("#waveSvgDesc");
    const amplitudeGuide = document.querySelector(".amplitude-guide");
    const wavelengthGuide = document.querySelector(".wavelength-guide");

    function update() {
      const amplitude = Number(amplitudeInput.value);
      const frequency = Number(frequencyInput.value);
      const speed = Number(mediumSelect.value);
      const wavelength = speed / frequency;
      const amplitudePixels = amplitude * 18;
      const wavelengthPixels = Math.min(wavelength * 2.4, 500);
      const mediumName = mediumSelect.selectedIndex === 0 ? "介質甲" : "介質乙";

      path.setAttribute("d", sinePath({ startX: 42, endX: 680, centerY: 125, amplitude: amplitudePixels, wavelength: wavelengthPixels }));
      amplitudeGuide.setAttribute("d", `M86 125V${125 - amplitudePixels}`);
      wavelengthGuide.setAttribute("d", `M150 210H${Math.min(150 + wavelengthPixels, 650)}`);
      amplitudeOutput.textContent = `${amplitude} cm`;
      frequencyOutput.textContent = `${frequency} Hz`;
      speedOutput.textContent = `${speed} cm/s`;
      wavelengthOutput.textContent = `${wavelength.toFixed(1)} cm`;
      summary.textContent = `${mediumName}中波速 ${speed} cm/s，頻率 ${frequency} Hz，所以波長為 ${wavelength.toFixed(1)} cm。`;
      svgDescription.textContent = `振幅 ${amplitude} 公分、頻率 ${frequency} 赫茲、波長 ${wavelength.toFixed(1)} 公分的波形。`;
      amplitudeInput.setAttribute("aria-valuetext", `振幅 ${amplitude} 公分`);
      frequencyInput.setAttribute("aria-valuetext", `頻率 ${frequency} 赫茲`);
    }

    amplitudeInput.addEventListener("input", update);
    frequencyInput.addEventListener("input", update);
    mediumSelect.addEventListener("change", update);
    update();
  }

  function initializeEchoLab() {
    const distanceInput = document.querySelector("#echoDistanceRange");
    if (!distanceInput) return;
    const distanceOutput = document.querySelector("#echoDistanceOut");
    const pathOutput = document.querySelector("#echoPathOut");
    const timeOutput = document.querySelector("#echoTimeOut");
    const judgement = document.querySelector("#echoJudgement");
    const svgDescription = document.querySelector("#echoSvgDesc");

    function update() {
      const distance = Number(distanceInput.value);
      const roundTrip = distance * 2;
      const time = roundTrip / 340;
      const separate = time >= 0.1;
      distanceOutput.textContent = `${distance} m`;
      pathOutput.textContent = `${roundTrip} m`;
      timeOutput.textContent = `${time.toFixed(2)} s`;
      judgement.textContent = separate ? "可以和原聲分開聽見" : "容易和原聲重疊";
      judgement.classList.toggle("overlap", !separate);
      svgDescription.textContent = `人距離山壁 ${distance} 公尺，聲音往返需 ${time.toFixed(2)} 秒。`;
      distanceInput.setAttribute("aria-valuetext", `距離山壁 ${distance} 公尺`);
    }

    distanceInput.addEventListener("input", update);
    update();
  }

  function initializeSoundConsole() {
    const amplitudeInput = document.querySelector("#soundAmplitudeRange");
    const frequencyInput = document.querySelector("#soundFrequencyRange");
    const path = document.querySelector("#soundWavePath");
    if (!amplitudeInput || !frequencyInput || !path) return;
    const amplitudeOutput = document.querySelector("#soundAmplitudeOut");
    const frequencyOutput = document.querySelector("#soundFrequencyOut");
    const loudnessOutput = document.querySelector("#loudnessOut");
    const pitchOutput = document.querySelector("#pitchOut");
    const svgDescription = document.querySelector("#soundSvgDesc");
    const amplitudeWords = { 1: "小", 2: "中", 3: "大", 4: "很大" };
    const loudnessWords = { 1: "較小聲", 2: "中等", 3: "較大聲", 4: "很大聲" };

    function update() {
      const amplitude = Number(amplitudeInput.value);
      const frequency = Number(frequencyInput.value);
      const wavelengthPixels = 71500 / frequency;
      const pitch = frequency <= 330 ? "低音" : frequency <= 550 ? "中音" : "高音";
      path.setAttribute("d", sinePath({ startX: 35, endX: 685, centerY: 125, amplitude: amplitude * 19, wavelength: wavelengthPixels }));
      amplitudeOutput.textContent = amplitudeWords[amplitude];
      frequencyOutput.textContent = `${frequency} Hz`;
      loudnessOutput.textContent = loudnessWords[amplitude];
      pitchOutput.textContent = pitch;
      svgDescription.textContent = `目前振幅${amplitudeWords[amplitude]}、頻率 ${frequency} 赫茲，代表${loudnessWords[amplitude]}、${pitch}。`;
      amplitudeInput.setAttribute("aria-valuetext", `振幅${amplitudeWords[amplitude]}`);
      frequencyInput.setAttribute("aria-valuetext", `頻率 ${frequency} 赫茲`);
    }

    amplitudeInput.addEventListener("input", update);
    frequencyInput.addEventListener("input", update);
    update();
  }

  const waveTermRounds = [
    { term: "相鄰兩個波峰之間的距離", answer: "wavelength", hint: "這是一個以長度單位表示的量。", explanation: "相鄰兩個同相位點的距離稱為波長。" },
    { term: "介質離開平衡位置的最大距離", answer: "amplitude", hint: "它描述振動偏離中心有多遠。", explanation: "離開平衡位置的最大距離稱為振幅。" },
    { term: "每秒完成振動的次數", answer: "frequency", hint: "它的單位是 Hz。", explanation: "每秒振動次數是頻率，單位為赫茲。" },
    { term: "完成一次完整振動所需的時間", answer: "period", hint: "它的單位是秒。", explanation: "完成一次振動的時間稱為週期。" },
    { term: "與週期互為倒數的物理量", answer: "frequency", hint: "套用 T＝1／f。", explanation: "頻率與週期互為倒數，所以 f＝1／T。" }
  ];

  const soundSceneRounds = [
    { term: "把吉他弦旋緊後，聲音變高", answer: "pitch", hint: "弦變緊會提高振動頻率。", explanation: "頻率提高會使音調變高。" },
    { term: "用更大的力敲同一面鼓，聲音變大", answer: "loudness", hint: "用力敲擊主要讓振幅變大。", explanation: "振幅增大會使響度增加。" },
    { term: "同一個音由小提琴與長笛演奏，仍能分辨樂器", answer: "timbre", hint: "兩種樂器產生的波形不同。", explanation: "波形不同造成音色不同，因此能分辨聲源。" },
    { term: "在山谷拍手後，稍晚又聽到一次聲音", answer: "echo", hint: "聲波遇到遠處障礙物後返回。", explanation: "反射回來並與原聲分開的聲音是回聲。" },
    { term: "直笛按孔後有效空氣柱變短，聲音變高", answer: "pitch", hint: "空氣柱變短會提高振動頻率。", explanation: "有效空氣柱變短，頻率升高，音調也升高。" }
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
      feedback.textContent = score === rounds.length ? "全部答對，波動與聲音概念都掌握了！" : `完成！本次答對 ${score} 題，共 ${rounds.length} 題。`;
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

  initializeWaveMaker();
  initializeEchoLab();
  initializeSoundConsole();
  initializeGame("waveTermGame", waveTermRounds, "根據敘述，找出對應的波動量。");
  initializeGame("soundSceneGame", soundSceneRounds, "判斷情境主要對應哪一個聲音概念。");
})();
