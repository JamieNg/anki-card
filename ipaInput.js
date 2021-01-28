var inputNode = document.getElementById("typeans");
inputNode.onkeyup = function (e) {
  for (const key in ipaMap) {
    if (Object.hasOwnProperty.call(ipaMap, key)) {
      const element = ipaMap[key];
      e.target.value = e.target.value.replace(key, element);
    }
  }
};

var ipaMap = {
  "^": "ʌ",
  A: "ɑ:",
  aE: "æ",
  E: "ə",
  "6R": "ɜ:ʳ",
  i: "ɪ",
  "I:": "i:",
  O: "ɒ",
  "o:": "ɔ:",
  u: "ʊ",
  U: "u:",
  N: "ŋ",
  S: "ʃ",
  TH: "θ",
  D: "ð",
  3: "ʒ",
};
