"use strict";
const el = (id) => document.getElementById(id);
const phoneLayout = () => window.matchMedia("(max-width: 600px)").matches;
el("play-guide").open = !phoneLayout();
function fitRound() {
  if (phoneLayout()) {
    el("round").scrollIntoView({ block: "start", behavior: "instant" });
  }
}
const daisy =
  '<svg viewBox="0 0 100 100" aria-hidden="true"><g fill="#fff" stroke="#8b6b20" stroke-width="2.5"><ellipse cx="50" cy="25" rx="10" ry="20"/><ellipse cx="50" cy="75" rx="10" ry="20"/><ellipse cx="25" cy="50" rx="20" ry="10"/><ellipse cx="75" cy="50" rx="20" ry="10"/><ellipse cx="32" cy="32" rx="10" ry="20" transform="rotate(-45 32 32)"/><ellipse cx="68" cy="32" rx="10" ry="20" transform="rotate(45 68 32)"/><ellipse cx="32" cy="68" rx="10" ry="20" transform="rotate(45 32 68)"/><ellipse cx="68" cy="68" rx="10" ry="20" transform="rotate(-45 68 68)"/></g><circle cx="50" cy="50" r="19" fill="#e5af27" stroke="#785719" stroke-width="3"/></svg>';
const tulip =
  '<svg viewBox="0 0 100 100" aria-hidden="true"><path d="M50 90V53M50 80Q20 85 20 60Q43 62 50 80M50 84Q78 82 80 61Q58 65 50 84" fill="#346c48" stroke="#285437" stroke-width="4"/><path d="M18 14L38 29L50 8L63 29L83 14V40Q83 67 50 68Q18 67 18 40Z" fill="#8b4a9c" stroke="#593068" stroke-width="4"/><path d="M38 30Q35 55 50 66Q65 53 63 30" fill="#b67ac6" stroke="#593068" stroke-width="3"/></svg>';
const butterfly =
  '<svg viewBox="0 0 100 100" aria-hidden="true"><path d="M47 48C7 -1 -6 41 26 53C0 75 24 99 47 60M53 48C93 -1 106 41 74 53C100 75 76 99 53 60" fill="#d58530" stroke="#68431e" stroke-width="4"/><path d="M50 35V76M49 39L40 22M51 39L60 22" stroke="#373b33" stroke-width="6" stroke-linecap="round"/></svg>';
const icon = (body) =>
  '<svg viewBox="0 0 100 100" aria-hidden="true" stroke-linecap="round" stroke-linejoin="round">' +
  body +
  "</svg>";
const pictures = {
  garden: [
    { name: "Daisy", svg: daisy },
    { name: "Tulip", svg: tulip },
    {
      name: "Tree",
      svg: icon(
        '<path d="M44 62H56V94H44Z" fill="#895c35"/><path d="M50 5L22 41H33L13 67H87L67 41H78Z" fill="#397b4b" stroke="#245139" stroke-width="4"/>',
      ),
    },
    {
      name: "Watering can",
      svg: icon(
        '<path d="M65 40Q98 10 90 56Q86 72 69 67" fill="none" stroke="#275d66" stroke-width="9"/><path d="M25 37H71V83H25Z" fill="#6faeb6" stroke="#275d66" stroke-width="4"/><path d="M25 51L6 31L3 42L25 72M36 36L40 24H58L62 36" fill="#6faeb6" stroke="#275d66" stroke-width="5"/>',
      ),
    },
  ],
  fruit: [
    {
      name: "Apple",
      svg: icon(
        '<path d="M50 31C20 8 4 40 17 71Q31 97 50 83Q73 99 87 68C99 36 78 10 50 31Z" fill="#c34637" stroke="#7b3029" stroke-width="4"/><path d="M50 30L54 10" stroke="#62492c" stroke-width="6"/><path d="M56 20Q61 3 83 9Q76 29 56 20" fill="#487a37"/>',
      ),
    },
    {
      name: "Pear",
      svg: icon(
        '<path d="M49 16C27 16 35 43 21 57C-2 85 32 96 50 94C80 97 102 78 80 55C65 39 72 16 49 16Z" fill="#c2bf48" stroke="#737a29" stroke-width="4"/><path d="M50 18L58 4" stroke="#62492c" stroke-width="6"/>',
      ),
    },
    {
      name: "Banana",
      svg: icon(
        '<path d="M18 16Q33 79 83 31L91 36Q79 95 43 87Q5 79 10 20Z" fill="#efca43" stroke="#8d6e21" stroke-width="4"/><path d="M18 16L14 8M86 33L92 25" stroke="#66522d" stroke-width="7"/>',
      ),
    },
    {
      name: "Grapes",
      svg: icon(
        '<g fill="#8556a2" stroke="#513568" stroke-width="3"><circle cx="30" cy="35" r="15"/><circle cx="56" cy="34" r="15"/><circle cx="76" cy="46" r="15"/><circle cx="43" cy="58" r="15"/><circle cx="65" cy="68" r="15"/><circle cx="48" cy="85" r="12"/></g><path d="M49 25L54 4M54 15Q70 -1 87 10Q70 28 54 15" fill="#487a37" stroke="#38612b" stroke-width="4"/>',
      ),
    },
  ],
  animals: [
    {
      name: "Cat",
      svg: icon(
        '<path d="M17 41L12 8L39 26H61L88 8L83 41Q98 86 51 92Q4 87 17 41Z" fill="#d1a16b" stroke="#754d2e" stroke-width="4"/><path d="M31 54H34M66 54H69" stroke="#303f38" stroke-width="7"/><path d="M44 68L50 74L56 68Z" fill="#754d2e"/><path d="M17 66L1 61M18 74L2 78M82 66L99 61M81 74L97 79" stroke="#754d2e" stroke-width="3"/>',
      ),
    },
    {
      name: "Dog",
      svg: icon(
        '<path d="M24 24Q4 9 5 53Q12 79 31 60M76 24Q96 9 95 53Q88 79 69 60" fill="#825b37" stroke="#5e432b" stroke-width="4"/><path d="M25 27Q50 9 75 27L78 70Q72 92 50 94Q28 92 22 70Z" fill="#e1bc88" stroke="#5e432b" stroke-width="4"/><circle cx="36" cy="48" r="4" fill="#303f38"/><circle cx="64" cy="48" r="4" fill="#303f38"/><ellipse cx="50" cy="67" rx="10" ry="7" fill="#303f38"/><path d="M50 75V86" stroke="#5e432b" stroke-width="3"/>',
      ),
    },
    {
      name: "Fish",
      svg: icon(
        '<path d="M64 47L94 23V77L64 53Q40 97 7 50Q40 3 64 47Z" fill="#5f9fba" stroke="#295f76" stroke-width="4"/><circle cx="27" cy="43" r="5" fill="#223f42"/><path d="M45 37L53 50L45 64" fill="none" stroke="#295f76" stroke-width="4"/>',
      ),
    },
    {
      name: "Turtle",
      svg: icon(
        '<g fill="#799f63" stroke="#3e6336" stroke-width="3"><ellipse cx="27" cy="26" rx="12" ry="18"/><ellipse cx="28" cy="75" rx="12" ry="18"/><ellipse cx="65" cy="26" rx="12" ry="18"/><ellipse cx="65" cy="75" rx="12" ry="18"/><circle cx="85" cy="50" r="13"/></g><ellipse cx="45" cy="50" rx="35" ry="31" fill="#4d7950" stroke="#315a38" stroke-width="4"/><path d="M45 27L63 40L57 62H33L27 40Z" fill="#a0b777" stroke="#315a38" stroke-width="3"/><circle cx="89" cy="46" r="3" fill="#253c30"/>',
      ),
    },
  ],
  everyday: [
    {
      name: "Cup",
      svg: icon(
        '<path d="M69 31H80Q103 32 89 59Q82 68 69 64" fill="none" stroke="#346b88" stroke-width="9"/><path d="M15 25H70V65Q69 87 43 87Q16 87 15 65Z" fill="#79adca" stroke="#346b88" stroke-width="4"/><path d="M9 94H79" stroke="#346b88" stroke-width="5"/>',
      ),
    },
    {
      name: "Book",
      svg: icon(
        '<path d="M19 9H79V88H19Q7 85 7 76V21Q7 9 19 9Z" fill="#b35444" stroke="#703c32" stroke-width="4"/><path d="M20 13V76H78V91H20Q8 91 8 82Q8 76 20 76" fill="#faf0d6" stroke="#703c32" stroke-width="4"/><path d="M35 30H65M35 43H65" stroke="#f1d8a0" stroke-width="5"/>',
      ),
    },
    {
      name: "Key",
      svg: icon(
        '<circle cx="30" cy="30" r="23" fill="#dfbd5c" stroke="#896a24" stroke-width="5"/><circle cx="30" cy="30" r="10" fill="#fffdf7" stroke="#896a24" stroke-width="4"/><path d="M46 48L88 90L98 80L87 69L78 77L69 68L77 60L57 40Z" fill="#dfbd5c" stroke="#896a24" stroke-width="4"/>',
      ),
    },
    {
      name: "Clock",
      svg: icon(
        '<circle cx="50" cy="50" r="43" fill="#f5eee0" stroke="#596775" stroke-width="7"/><path d="M50 18V23M50 77V82M18 50H23M77 50H82" stroke="#596775" stroke-width="4"/><path d="M50 30V50L67 61" fill="none" stroke="#344f49" stroke-width="6"/>',
      ),
    },
  ],
};
let flowers = pictures.garden;
const positions = [
  { name: "Top left", x: -1, y: -1 },
  { name: "Top", x: 0, y: -1 },
  { name: "Top right", x: 1, y: -1 },
  { name: "Left", x: -1, y: 0 },
  { name: "Right", x: 1, y: 0 },
  { name: "Bottom left", x: -1, y: 1 },
  { name: "Bottom", x: 0, y: 1 },
  { name: "Bottom right", x: 1, y: 1 },
];
function updateSamples() {
  flowers = pictures[el("picture-theme").value] || pictures.garden;
  el("samples").innerHTML =
    flowers
      .map((p) => "<div>" + p.svg + "<span>" + p.name + "</span></div>")
      .join("") +
    (el("task").value === "both"
      ? "<div>" + butterfly + "<span>Butterfly</span></div>"
      : "");
}
updateSamples();
let state = "setup",
  practice = false,
  task = "flower",
  spread = "near",
  trial = null,
  completed = 0,
  correct = 0,
  duration = 1200,
  block = [],
  raf = 0,
  epoch = 0,
  readyTimer = 0;
const focus = (id) => el(id).focus();
function prompt(title, hint = "") {
  el("prompt").textContent = title;
  el("hint").textContent = hint;
}
function controls() {
  ["next", "finish-practice", "resume"].forEach((id) => (el(id).hidden = true));
  el("choices").replaceChildren();
  el("feedback").hidden = true;
}
function cancelFrame() {
  epoch++;
  cancelAnimationFrame(raf);
  clearTimeout(readyTimer);
  raf = 0;
  readyTimer = 0;
}
function clearScene(text = "") {
  el("scene").innerHTML = text
    ? '<div class="scene-note"></div>'
    : '<div class="centre cross" aria-hidden="true">+</div>';
  if (text) el("scene").firstChild.textContent = text;
}
function label() {
  el("round-label").textContent = practice
    ? `Practice · picture ${completed + 1}`
    : `Picture ${Math.min(completed + 1, 8)} of 8`;
}
function ready() {
  cancelFrame();
  state = "ready";
  controls();
  clearScene();
  trial = null;
  label();
  prompt(
    "Get ready. Look towards the centre.",
    practice
      ? "The picture will appear automatically, with a little extra viewing time."
      : "The picture will appear automatically, then disappear.",
  );
  el("pause").hidden = false;
  el("pause").disabled = false;
  focus("pause");
  el(phoneLayout() ? "round" : "scene").scrollIntoView({
    block: phoneLayout() ? "start" : "center",
    behavior: "instant",
  });
  readyTimer = setTimeout(show, 1400);
}
function begin(isPractice) {
  document.body.classList.add("is-playing");
  practice = isPractice;
  flowers = pictures[el("picture-theme").value];
  task = el("task").value;
  spread = el("spread").value;
  completed = 0;
  correct = 0;
  duration = 1200;
  block = [];
  el("setup").hidden = true;
  el("summary").hidden = true;
  el("round").hidden = false;
  ready();
}
function showScene() {
  const f = flowers[trial.flower];
  const p = positions[trial.position],
    distance = spread === "near" ? 24 : 35;
  el("scene").innerHTML =
    `<div class="centre">${f.svg}</div>` +
    (task === "both"
      ? `<div class="insect" style="left:${50 + p.x * distance}%;top:${50 + p.y * distance}%">${butterfly}</div>`
      : "");
}
function show() {
  if (state !== "ready") return;
  state = "showing";
  trial = {
    flower: Math.floor(Math.random() * flowers.length),
    position: Math.floor(Math.random() * 8),
    flowerAnswer: null,
    positionAnswer: null,
    elapsed: null,
  };
  controls();
  el("pause").disabled = false;
  prompt("Look at the picture.", "");
  const token = ++epoch;
  raf = requestAnimationFrame((first) => {
    if (token !== epoch) return;
    showScene();
    function frame(now) {
      if (token !== epoch) return;
      if (now - first >= (practice ? 2400 : duration)) {
        trial.elapsed = now - first;
        answerFlower();
      } else raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);
  });
}
function answerFlower() {
  cancelFrame();
  state = "flower";
  controls();
  clearScene("The picture is hidden.");
  prompt("Which picture did you see?", "Take your time to choose.");
  const row = document.createElement("div");
  row.className = "flower-choices";
  flowers.forEach((f, i) => {
    const b = document.createElement("button");
    b.className = "flower-button";
    b.innerHTML = f.svg + "<span>" + f.name + "</span>";
    b.onclick = () => {
      if (state !== "flower") return;
      trial.flowerAnswer = i;
      if (task === "both") answerPosition();
      else feedback();
    };
    row.append(b);
  });
  el("choices").append(row);
  row.firstChild.focus();
  fitRound();
}
function answerPosition() {
  state = "position";
  el("choices").replaceChildren();
  prompt(
    "Where was the butterfly?",
    "Choose the part of the picture where it appeared.",
  );
  const grid = document.createElement("div");
  grid.className = "directions";
  const arrows = ["↖", "↑", "↗", "←", "→", "↙", "↓", "↘"];
  positions.forEach((p, i) => {
    if (i === 4) {
      const middle = document.createElement("span");
      middle.className = "middle";
      middle.textContent = "Centre";
      grid.append(middle);
    }
    const b = document.createElement("button");
    b.textContent = arrows[i] + " " + p.name;
    b.onclick = () => {
      if (state !== "position") return;
      trial.positionAnswer = i;
      feedback();
    };
    grid.append(b);
  });
  el("choices").append(grid);
  grid.firstChild.focus();
  fitRound();
}
function feedback() {
  state = "feedback";
  controls();
  completed++;
  const flowerOK = trial.flowerAnswer === trial.flower,
    positionOK = task === "flower" || trial.positionAnswer === trial.position,
    ok = flowerOK && positionOK;
  if (ok) correct++;
  if (!practice) {
    block.push(ok);
    if (block.length === 4) {
      const n = block.filter(Boolean).length;
      if (n === 4) duration = Math.max(250, duration - 100);
      else if (n <= 2) duration = Math.min(2000, duration + 150);
      block = [];
    }
  }
  showScene();
  el("feedback").hidden = false;
  el("feedback").replaceChildren();
  const h = document.createElement("h2");
  h.textContent = ok ? "Correct." : "Here’s the picture again.";
  const p = document.createElement("p");
  p.textContent =
    flowers[trial.flower].name +
    (task === "both"
      ? ` · butterfly: ${positions[trial.position].name.toLowerCase()}`
      : "");
  el("feedback").append(h, p);
  prompt(ok ? "Picture complete." : "Take a look before continuing.", "");
  if (practice) {
    el("next").hidden = false;
    el("finish-practice").hidden = false;
    el("next").textContent = "Practise another";
  } else {
    el("next").hidden = false;
    el("next").textContent =
      completed === 8 ? "See round summary" : "Next picture";
  }
  focus("next");
  fitRound();
}
function summary() {
  cancelFrame();
  state = "summary";
  el("round").hidden = true;
  el("summary").hidden = false;
  el("score").textContent = `${correct} of 8`;
  el("score-description").textContent =
    task === "both"
      ? "pictures with both answers correct"
      : "pictures identified correctly";
  el("progress-note").textContent =
    "This is your score for this activity, not a measure of cognitive health. Your answer speed was not scored.";
  focus("again");
}
function setup() {
  document.body.classList.remove("is-playing");
  cancelFrame();
  state = "setup";
  trial = null;
  el("setup").hidden = false;
  el("round").hidden = true;
  el("summary").hidden = true;
  focus("practice");
}
function pause() {
  if (["setup", "summary", "paused"].includes(state)) return;
  const interrupted = state !== "ready" && state !== "feedback";
  cancelFrame();
  state = "paused";
  trial = null;
  controls();
  clearScene("Paused");
  prompt(
    "Take a break.",
    interrupted
      ? "This picture will not be scored. Continue with a fresh picture."
      : "Continue whenever you’re ready.",
  );
  el("pause").hidden = true;
  el("resume").hidden = false;
  focus("resume");
}
el("picture-theme").onchange = updateSamples;
el("task").onchange = () => {
  el("spread").disabled = el("task").value === "flower";
  el("butterfly-guide").hidden = el("task").value === "flower";
  updateSamples();
};
el("practice").onclick = () => begin(true);
el("start").onclick = () => begin(false);
el("next").onclick = () => {
  if (state === "feedback") {
    if (!practice && completed === 8) summary();
    else ready();
  }
};
el("pause").onclick = pause;
el("resume").onclick = () => {
  if (state === "paused") {
    if (!practice && completed === 8) summary();
    else ready();
  }
};
el("finish-practice").onclick = setup;
el("again").onclick = () => begin(false);
el("change").onclick = setup;
el("end").onclick = setup;
document.addEventListener("visibilitychange", () => {
  if (document.hidden) pause();
});
let viewportWidth = window.innerWidth;
window.addEventListener("resize", () => {
  // Mobile browser toolbars change viewport height while scrolling.
  // Pause when the layout width changes, including device rotation.
  if (window.innerWidth === viewportWidth) return;
  viewportWidth = window.innerWidth;
  if (["showing", "flower", "position"].includes(state)) pause();
});
