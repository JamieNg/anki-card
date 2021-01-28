const constants = {
  badgesId: "badges",
  sampleSentenceId: "sample",
  input: "input",
};

if (document.onScriptLoaded) {
  document.onScriptLoaded();
}

function renderCard(cardConfig) {
  processBadges();

  if (cardConfig.hints) {
    hideHintFileds(cardConfig.hints);
    bindHintButton(cardConfig.hints);
  }

  if (cardConfig.highlightCloze != undefined) {
    showCloze(constants.sampleSentenceId, cardConfig.highlightCloze);
  }

  if (cardConfig.typeCloze != undefined) {
    hideCloze(cardConfig.typeCloze);
  }
}

//detect cloze
function detectCloze(string) {
  let re = /\(\(.*?\)\)/;
  let reg = re.exec(string);
  if (reg == null) return null;

  return {
    clozeStart: reg.index,
    clozeEnd: reg.index + reg[0].length,
    clozeTerm: reg[0].replace("((", "").replace("))", ""),
  };
}

function processCloze(elementId) {
  var element = document.getElementById(elementId);
}

function showCloze(elementId, isHighlighted) {
  let element = document.getElementById(elementId);
  let text = element.innerHTML;
  let cloze = detectCloze(text);
  if (cloze == null) return;
  html =
    text.substring(0, cloze.clozeStart) +
    `<span ${isHighlighted ? "class='highlight'" : ""}>` +
    cloze.clozeTerm +
    "</span>" +
    text.substring(cloze.clozeEnd);
  element.innerHTML = html;
}

function processBadges() {
  const colors = ["#f2cda8", "#ff9999", "#ffffcc", "#c4e084", "#bb92d3"];
  const elemment = document.getElementById(constants.badgesId);
  const badges = elemment.innerHTML.split(",");
  let html = "";
  badges.forEach((badge, index) => {
    let color = index < 5 ? colors[index] : colors[0];
    html += `<span class="badge" style="background-color:${color};">${badge}</span>`;
  });
  elemment.innerHTML = html;
}

function hideHintFileds(hints) {
  hints.forEach((hint) => {
    const element = document.getElementById(hint);
    element.hidden = true;
  });
}

function bindHintButton(hints) {
  const hintButton = document.getElementById("hint-button");
  hintButton.onclick = function () {
    hints.forEach((hint) => {
      const element = document.getElementById(hint);
      element.hidden = !element.hidden;
    });
    toggleClozeHint();
    hintText = document.getElementById("hint-button").innerHTML;
    document.getElementById("hint-button").innerHTML =
      hintText === "HINTS+" ? "HINTS-" : "HINTS+";
  };

  document.onkeyup = function (e) {
    if (e.ctrlKey) {
      if (e.code == "KeyM") {
        hintButton.onclick();
      }
    }
  };
}

function hideCloze(elementId) {
  let element = document.getElementById(elementId);
  let text = element.innerHTML;
  let cloze = detectCloze(text);
  if (cloze == null) return;
  element.innerHTML = text.replace(
    `((${cloze.clozeTerm}))`,
    `<span id="deletedCloze">_____</span><span id="clozeTerm">${simpleObfuscator(
      cloze.clozeTerm
    )}</span>`
  );
  document.getElementById("clozeTerm").hidden = true;
}

function toggleClozeHint() {
  document.getElementById("clozeTerm").hidden = !document.getElementById(
    "clozeTerm"
  ).hidden;
  document.getElementById("deletedCloze").hidden = !document.getElementById(
    "deletedCloze"
  ).hidden;
}

function simpleObfuscator(term) {
  if (term.length == 1) return "_";
  if (term.length <= 4 && term.length > 1) {
    return `${term[0]}__`;
  } else if (term.length < 8 && term.length > 4) {
    return `${term[0]}_____${term[term.length - 2]}${term[term.length - 1]}`;
  } else {
    return `${term[0]}____${term[5]}___${term[term.length - 2]}${
      term[term.length - 1]
    }`;
  }
}
