(() => {
  const toRad = (degrees) => degrees * Math.PI / 180;

  function initializeReflectionLab() {
    const input = document.querySelector("#reflectionAngleRange");
    if (!input) return;
    const output = document.querySelector("#reflectionAngleOut");
    const incidentOutput = document.querySelector("#incidentAngleReadout");
    const reflectedOutput = document.querySelector("#reflectedAngleReadout");
    const incidentRay = document.querySelector("#incidentRay");
    const reflectedRay = document.querySelector("#reflectedRay");
    const incidentArc = document.querySelector("#incidentArc");
    const reflectedArc = document.querySelector("#reflectedArc");
    const summary = document.querySelector("#reflectionSummary");
    const description = document.querySelector("#reflectionSvgDesc");

    function update() {
      const angle = Number(input.value);
      const radians = toRad(angle);
      const originX = 360;
      const originY = 230;
      const length = 190;
      const xOffset = Math.sin(radians) * length;
      const yOffset = Math.cos(radians) * length;
      const arcRadius = 55;
      const arcX = Math.sin(radians) * arcRadius;
      const arcY = Math.cos(radians) * arcRadius;

      incidentRay.setAttribute("d", `M${(originX - xOffset).toFixed(1)} ${(originY - yOffset).toFixed(1)}L${originX} ${originY}`);
      reflectedRay.setAttribute("d", `M${originX} ${originY}L${(originX + xOffset).toFixed(1)} ${(originY - yOffset).toFixed(1)}`);
      incidentArc.setAttribute("d", `M${originX} ${originY - arcRadius}A${arcRadius} ${arcRadius} 0 0 0 ${(originX - arcX).toFixed(1)} ${(originY - arcY).toFixed(1)}`);
      reflectedArc.setAttribute("d", `M${originX} ${originY - arcRadius}A${arcRadius} ${arcRadius} 0 0 1 ${(originX + arcX).toFixed(1)} ${(originY - arcY).toFixed(1)}`);
      output.textContent = `${angle}°`;
      incidentOutput.textContent = `${angle}°`;
      reflectedOutput.textContent = `${angle}°`;
      summary.textContent = `入射角 ${angle} 度，依反射定律，反射角也是 ${angle} 度。兩角都以法線為基準。`;
      description.textContent = `入射角與反射角都是 ${angle} 度。`;
      input.setAttribute("aria-valuetext", `入射角 ${angle} 度，反射角 ${angle} 度`);
    }

    input.addEventListener("input", update);
    update();
  }

  const mediaPairs = {
    "air-water": { first: "空氣", second: "水", n1: 1, n2: 1.33, firstClass: "medium-air", secondClass: "medium-water" },
    "air-glass": { first: "空氣", second: "玻璃", n1: 1, n2: 1.5, firstClass: "medium-air", secondClass: "medium-glass" },
    "water-air": { first: "水", second: "空氣", n1: 1.33, n2: 1, firstClass: "medium-water", secondClass: "medium-air" }
  };

  function initializeRefractionLab() {
    const pairSelect = document.querySelector("#refractionPairSelect");
    const angleInput = document.querySelector("#refractionAngleRange");
    if (!pairSelect || !angleInput) return;
    const angleOutput = document.querySelector("#refractionAngleOut");
    const incidentOutput = document.querySelector("#refractIncidentOut");
    const refractionOutput = document.querySelector("#refractionAngleReadout");
    const directionOutput = document.querySelector("#refractionDirection");
    const incidentRay = document.querySelector("#refractIncidentRay");
    const transmittedRay = document.querySelector("#transmittedRay");
    const tirRay = document.querySelector("#tirRay");
    const upperMedium = document.querySelector("#upperMedium");
    const lowerMedium = document.querySelector("#lowerMedium");
    const upperLabel = document.querySelector("#upperMediumLabel");
    const lowerLabel = document.querySelector("#lowerMediumLabel");
    const summary = document.querySelector("#refractionSummary");
    const description = document.querySelector("#refractionSvgDesc");

    function update() {
      const pair = mediaPairs[pairSelect.value];
      const incidentAngle = Number(angleInput.value);
      const incidentRadians = toRad(incidentAngle);
      const originX = 360;
      const originY = 170;
      const incomingLength = 180;
      const incomingX = originX - Math.sin(incidentRadians) * incomingLength;
      const incomingY = originY - Math.cos(incidentRadians) * incomingLength;
      const sinRefracted = pair.n1 / pair.n2 * Math.sin(incidentRadians);
      const totalInternalReflection = sinRefracted > 1;

      incidentRay.setAttribute("d", `M${incomingX.toFixed(1)} ${incomingY.toFixed(1)}L${originX} ${originY}`);
      upperMedium.setAttribute("class", pair.firstClass);
      lowerMedium.setAttribute("class", pair.secondClass);
      upperLabel.textContent = pair.first;
      lowerLabel.textContent = pair.second;
      angleOutput.textContent = `${incidentAngle}°`;
      incidentOutput.textContent = `${incidentAngle}°`;

      if (totalInternalReflection) {
        const reflectedX = originX + Math.sin(incidentRadians) * incomingLength;
        const reflectedY = originY - Math.cos(incidentRadians) * incomingLength;
        transmittedRay.hidden = true;
        tirRay.hidden = false;
        tirRay.setAttribute("d", `M${originX} ${originY}L${reflectedX.toFixed(1)} ${reflectedY.toFixed(1)}`);
        refractionOutput.textContent = "無折射光";
        directionOutput.textContent = "超過臨界角，發生全反射";
        summary.textContent = `光由水射向空氣，入射角 ${incidentAngle} 度已超過臨界角，沒有光穿出，形成全反射。`;
        description.textContent = summary.textContent;
      } else {
        const refractedRadians = Math.asin(sinRefracted);
        const refractedAngle = refractedRadians * 180 / Math.PI;
        const outgoingLength = 165;
        const outgoingX = originX + Math.sin(refractedRadians) * outgoingLength;
        const outgoingY = originY + Math.cos(refractedRadians) * outgoingLength;
        const noTurn = incidentAngle === 0;
        const direction = noTurn ? "垂直入射，方向不偏折" : pair.n2 > pair.n1 ? "折射光偏向法線" : "折射光偏離法線";
        transmittedRay.hidden = false;
        tirRay.hidden = true;
        transmittedRay.setAttribute("d", `M${originX} ${originY}L${outgoingX.toFixed(1)} ${outgoingY.toFixed(1)}`);
        refractionOutput.textContent = `${refractedAngle.toFixed(1)}°`;
        directionOutput.textContent = direction;
        summary.textContent = `光由${pair.first}以 ${incidentAngle} 度入射${pair.second}，折射角約 ${refractedAngle.toFixed(1)} 度，${direction}。`;
        description.textContent = summary.textContent;
      }
      angleInput.setAttribute("aria-valuetext", `入射角 ${incidentAngle} 度`);
    }

    pairSelect.addEventListener("change", update);
    angleInput.addEventListener("input", update);
    update();
  }

  function arrowPath(x, baseY, tipY) {
    const direction = tipY < baseY ? 1 : -1;
    return `M${x} ${baseY}V${tipY}M${x} ${tipY}l-11 ${18 * direction}M${x} ${tipY}l11 ${18 * direction}`;
  }

  function initializeLensLab() {
    const input = document.querySelector("#objectDistanceRange");
    if (!input) return;
    const output = document.querySelector("#objectDistanceOut");
    const objectArrow = document.querySelector("#objectArrow");
    const objectLabel = document.querySelector("#objectLabel");
    const imageArrow = document.querySelector("#imageArrow");
    const imageLabel = document.querySelector("#imageLabel");
    const rayOne = document.querySelector("#principalRayOne");
    const rayTwo = document.querySelector("#principalRayTwo");
    const extensionOne = document.querySelector("#virtualExtensionOne");
    const extensionTwo = document.querySelector("#virtualExtensionTwo");
    const typeOutput = document.querySelector("#lensImageType");
    const positionOutput = document.querySelector("#lensImagePosition");
    const summary = document.querySelector("#lensSummary");
    const description = document.querySelector("#lensSvgDesc");
    const lensX = 380;
    const axisY = 170;
    const focalLength = 12;
    const scale = 10;
    const objectHeight = 90;

    function update() {
      const objectDistance = Number(input.value);
      const objectX = Math.max(35, lensX - objectDistance * scale);
      const objectTopY = axisY - objectHeight;
      output.textContent = `${objectDistance} cm`;
      objectArrow.setAttribute("d", arrowPath(objectX, axisY, objectTopY));
      objectLabel.setAttribute("x", Math.max(35, objectX - 20));

      if (objectDistance === focalLength) {
        imageArrow.setAttribute("visibility", "hidden");
        imageLabel.setAttribute("visibility", "hidden");
        extensionOne.hidden = true;
        extensionTwo.hidden = true;
        rayOne.setAttribute("d", `M${objectX} ${objectTopY}H${lensX}L700 310`);
        rayTwo.setAttribute("d", `M${objectX} ${objectTopY}L${lensX} ${axisY}L700 310`);
        typeOutput.textContent = "折射光近似平行，沒有有限距離的清楚像";
        positionOutput.textContent = "物體位在焦點 F";
        summary.textContent = `物距 ${objectDistance} 公分等於焦距，折射光近似平行，屏幕上找不到有限距離的清楚像。`;
      } else {
        const imageDistance = focalLength * objectDistance / (objectDistance - focalLength);
        const magnification = Math.abs(imageDistance / objectDistance);
        const realImage = imageDistance > 0;
        const unclampedImageX = lensX + imageDistance * scale;
        const imageX = Math.max(45, Math.min(715, unclampedImageX));
        const shownHeight = Math.min(125, Math.max(28, objectHeight * magnification));
        const imageTipY = realImage ? axisY + shownHeight : axisY - shownHeight;
        let typeText = "";
        let positionText = "";

        imageArrow.setAttribute("visibility", "visible");
        imageLabel.setAttribute("visibility", "visible");
        imageArrow.setAttribute("d", arrowPath(imageX, axisY, imageTipY));
        imageArrow.classList.toggle("virtual-image-arrow", !realImage);
        imageLabel.setAttribute("x", Math.max(35, Math.min(675, imageX - 18)));
        imageLabel.setAttribute("y", realImage ? Math.min(318, imageTipY + 28) : Math.max(25, imageTipY - 14));
        imageLabel.textContent = realImage ? "實像" : "虛像";

        if (realImage) {
          rayOne.setAttribute("d", `M${objectX} ${objectTopY}H${lensX}L${imageX} ${imageTipY}`);
          rayTwo.setAttribute("d", `M${objectX} ${objectTopY}L${lensX} ${axisY}L${imageX} ${imageTipY}`);
          extensionOne.hidden = true;
          extensionTwo.hidden = true;
          if (objectDistance > focalLength * 2) {
            typeText = "倒立、縮小、實像";
            positionText = "像在透鏡另一側的 F 與 2F 之間";
          } else if (objectDistance === focalLength * 2) {
            typeText = "倒立、等大、實像";
            positionText = "像在透鏡另一側的 2F";
          } else {
            typeText = "倒立、放大、實像";
            positionText = "像在透鏡另一側的 2F 外";
          }
        } else {
          const rayOneEndY = Math.min(310, objectTopY + 170);
          const rayTwoEndY = Math.min(300, axisY + (axisY - objectTopY) * 0.75);
          rayOne.setAttribute("d", `M${objectX} ${objectTopY}H${lensX}L700 ${rayOneEndY}`);
          rayTwo.setAttribute("d", `M${objectX} ${objectTopY}L${lensX} ${axisY}L700 ${rayTwoEndY}`);
          extensionOne.hidden = false;
          extensionTwo.hidden = false;
          extensionOne.setAttribute("d", `M${lensX} ${objectTopY}L${imageX} ${imageTipY}`);
          extensionTwo.setAttribute("d", `M${lensX} ${axisY}L${imageX} ${imageTipY}`);
          typeText = "正立、放大、虛像";
          positionText = "像與物體在透鏡同一側";
        }
        typeOutput.textContent = typeText;
        positionOutput.textContent = positionText;
        summary.textContent = `物距 ${objectDistance} 公分，${typeText}；${positionText}。`;
      }
      description.textContent = summary.textContent;
      input.setAttribute("aria-valuetext", `物距 ${objectDistance} 公分。${typeOutput.textContent}`);
    }

    input.addEventListener("input", update);
    update();
  }

  function colorName(red, green, blue) {
    const high = 210;
    const low = 60;
    if (red <= low && green <= low && blue <= low) return "接近黑色";
    if (red >= high && green >= high && blue >= high) return "接近白色";
    if (red >= high && green >= high && blue <= low) return "黃色";
    if (red <= low && green >= high && blue >= high) return "青色";
    if (red >= high && green <= low && blue >= high) return "洋紅色";
    if (red > green * 1.35 && red > blue * 1.35) return "偏紅色";
    if (green > red * 1.35 && green > blue * 1.35) return "偏綠色";
    if (blue > red * 1.35 && blue > green * 1.35) return "偏藍色";
    return "混合色";
  }

  function initializeColorMixer() {
    const redInput = document.querySelector("#redLightRange");
    const greenInput = document.querySelector("#greenLightRange");
    const blueInput = document.querySelector("#blueLightRange");
    if (!redInput || !greenInput || !blueInput) return;
    const redOutput = document.querySelector("#redLightOut");
    const greenOutput = document.querySelector("#greenLightOut");
    const blueOutput = document.querySelector("#blueLightOut");
    const swatch = document.querySelector("#mixedColorSwatch");
    const nameOutput = document.querySelector("#mixedColorName");

    function update() {
      const red = Number(redInput.value);
      const green = Number(greenInput.value);
      const blue = Number(blueInput.value);
      const name = colorName(red, green, blue);
      redOutput.textContent = red;
      greenOutput.textContent = green;
      blueOutput.textContent = blue;
      swatch.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
      swatch.setAttribute("aria-label", `目前混合色為${name}，紅 ${red}、綠 ${green}、藍 ${blue}`);
      nameOutput.textContent = name;
      redInput.setAttribute("aria-valuetext", `紅光強度 ${red}`);
      greenInput.setAttribute("aria-valuetext", `綠光強度 ${green}`);
      blueInput.setAttribute("aria-valuetext", `藍光強度 ${blue}`);
    }

    [redInput, greenInput, blueInput].forEach((input) => input.addEventListener("input", update));
    update();
  }

  const lightPhenomenonRounds = [
    { term: "站在陽光下，身後出現影子", answer: "straight", hint: "不透明物體擋住沿直線前進的光。", explanation: "影子是光直線前進並被物體遮擋的結果。" },
    { term: "在鏡子中看到自己的臉", answer: "reflection", hint: "光先到鏡面，再回到眼睛。", explanation: "鏡面把物體反射的光再反射進眼睛。" },
    { term: "水中的筷子看起來彎折", answer: "refraction", hint: "光從水進入空氣時方向改變。", explanation: "光跨越水與空氣的界面發生折射。" },
    { term: "三稜鏡把白光分成彩色光帶", answer: "dispersion", hint: "不同色光偏折程度不同。", explanation: "白光中的各色光因折射程度不同而色散。" },
    { term: "潛望鏡讓人看見高牆另一側", answer: "reflection", hint: "裝置內有兩面平面鏡。", explanation: "潛望鏡利用兩次反射改變光的方向。" }
  ];

  const opticsToolRounds = [
    { term: "矯正近視，讓光先發散一些", answer: "concave-lens", hint: "近視的像落在視網膜前。", explanation: "凹透鏡先使光發散，可把焦點後移到視網膜。" },
    { term: "矯正遠視，使光提早會聚", answer: "convex-lens", hint: "遠視的像傾向落在視網膜後。", explanation: "凸透鏡增加會聚能力，可使像前移到視網膜。" },
    { term: "道路轉角要擴大觀察視野", answer: "convex-mirror", hint: "需要正立縮小、視野較廣的像。", explanation: "凸面鏡形成正立縮小虛像，因此可看到較大範圍。" },
    { term: "化妝時希望近距離看見放大的臉", answer: "concave-mirror", hint: "物體靠近時可形成正立放大虛像。", explanation: "凹面鏡在物體位於焦點內時可形成正立放大虛像。" },
    { term: "用放大鏡閱讀小字", answer: "convex-lens", hint: "把文字放在焦點內。", explanation: "凸透鏡在物體位於焦點內時形成正立放大虛像。" }
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
      feedback.textContent = score === rounds.length ? "全部答對，光路判讀很穩！" : `完成！本次答對 ${score} 題，共 ${rounds.length} 題。`;
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

  initializeReflectionLab();
  initializeRefractionLab();
  initializeLensLab();
  initializeColorMixer();
  initializeGame("lightPhenomenonGame", lightPhenomenonRounds, "判斷情境主要由哪一種光現象造成。");
  initializeGame("opticsToolGame", opticsToolRounds, "替生活任務選出最適合的鏡片或鏡面。");
})();
