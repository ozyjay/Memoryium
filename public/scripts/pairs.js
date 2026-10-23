"use strict";
const themes = {
  garden: [
    ["🌻", "Sunflower"],
    ["🌷", "Tulip"],
    ["🦋", "Butterfly"],
    ["🐝", "Bee"],
    ["🌹", "Rose"],
    ["🐞", "Ladybird"],
    ["🌳", "Tree"],
    ["🌼", "Daisy"],
  ],
  fruit: [
    ["🍎", "Apple"],
    ["🍋", "Lemon"],
    ["🍇", "Grapes"],
    ["🍓", "Strawberry"],
    ["🍌", "Banana"],
    ["🍐", "Pear"],
    ["🍉", "Watermelon"],
    ["🍊", "Orange"],
  ],
  animals: [
    ["🐈", "Cat"],
    ["🐕", "Dog"],
    ["🐘", "Elephant"],
    ["🐢", "Turtle"],
    ["🐧", "Penguin"],
    ["🐰", "Rabbit"],
    ["🦉", "Owl"],
    ["🐬", "Dolphin"],
  ],
};
const $ = (id) => document.getElementById(id);
let pairs = 4,
  theme = "garden",
  deck = [],
  selected = [],
  matched = 0,
  showing = false,
  pending = null;
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function message(main, sub = "") {
  $("status").textContent = main;
  $("substatus").textContent = sub;
}
function start() {
  selected = [];
  matched = 0;
  showing = false;
  const pictures = shuffle([...themes[theme]]).slice(0, pairs);
  deck = shuffle(
    pictures.flatMap((pic, key) => [
      { key, pic, matched: false, open: false },
      { key, pic, matched: false, open: false },
    ]),
  );
  $("board").replaceChildren();
  deck.forEach((c, i) => {
    const b = document.createElement("button");
    b.className = "card";
    b.onclick = () => flip(i);
    $("board").append(b);
  });
  $("board").dataset.size = deck.length;
  $("next").classList.add("hidden");
  $("next").textContent = "Turn these cards back";
  $("peek").classList.remove("hidden");
  $("peek").textContent = "Show me the pictures";
  message(
    "Choose any two cards to begin.",
    theme === "garden"
      ? "Let’s see what’s in the garden."
      : "A lovely little collection to explore.",
  );
  render();
}
function render() {
  [...$("board").children].forEach((b, i) => {
    const c = deck[i],
      visible = c.open || c.matched || showing;
    b.className = "card" + (c.matched ? " matched" : visible ? " open" : "");
    b.disabled = c.matched || c.open || showing || selected.length === 2;
    b.setAttribute(
      "aria-label",
      visible
        ? `${c.pic[1]}${c.matched ? ", matched" : ""}, card ${i + 1}`
        : `Card ${i + 1}, face down`,
    );
    b.innerHTML = visible
      ? `<span class="picture" aria-hidden="true">${c.pic[0]}</span><span class="name" aria-hidden="true">${c.pic[1]}</span>${c.matched ? '<span class="tick" aria-hidden="true">✓</span>' : ""}`
      : '<span class="back" aria-hidden="true">❧</span>';
  });
  $("count").textContent = `${matched} of ${pairs} pairs`;
  $("fill").style.width = (matched / pairs) * 100 + "%";
}
function flip(i) {
  if (showing || deck[i].open || deck[i].matched || selected.length === 2)
    return;
  deck[i].open = true;
  selected.push(i);
  if (selected.length === 1) {
    message(
      `You found ${deck[i].pic[1].toLowerCase()}.`,
      "Choose another card to find its pair.",
    );
  } else {
    const [a, b] = selected;
    if (deck[a].key === deck[b].key) {
      deck[a].matched = deck[b].matched = true;
      selected = [];
      matched++;
      message("A lovely match!", "Choose two more cards when you’re ready.");
      if (matched === pairs) {
        message(
          "You found every pair. Beautifully done!",
          "Fancy another little game?",
        );
        $("next").textContent = "Play another game";
        $("next").classList.remove("hidden");
        $("peek").classList.add("hidden");
      }
    } else {
      message(
        "Two different pictures. Take your time.",
        "Have a look, then turn them back when you’re ready.",
      );
      $("next").classList.remove("hidden");
      $("peek").classList.add("hidden");
    }
  }
  render();
  if (selected.length === 2 || matched === pairs) $("next").focus();
}
$("next").onclick = () => {
  if (matched === pairs) {
    start();
    $("board").firstChild.focus();
    return;
  }
  const first = selected[0];
  selected.forEach((i) => (deck[i].open = false));
  selected = [];
  $("next").classList.add("hidden");
  $("peek").classList.remove("hidden");
  message("Where might the next pair be?", "Choose any two face-down cards.");
  render();
  $("board").children[first].focus();
};
$("peek").onclick = () => {
  showing = !showing;
  if (showing) {
    message(
      "Take a good look at the pictures.",
      "When you’re ready, hide them and carry on.",
    );
    $("peek").textContent = "Hide the pictures";
  } else {
    $("peek").textContent = "Show me the pictures";
    message(
      selected.length ? "Choose a second card." : "Choose any two cards.",
      "Take all the time you need.",
    );
  }
  render();
};
function requestChange(action) {
  if (deck.some((c) => c.open || c.matched) || showing) {
    pending = action;
    $("confirm").showModal();
  } else action();
}
document.querySelectorAll("[data-pairs]").forEach(
  (b) =>
    (b.onclick = () => {
      const n = Number(b.dataset.pairs);
      if (n === pairs) return;
      requestChange(() => {
        pairs = n;
        document
          .querySelectorAll("[data-pairs]")
          .forEach((el) =>
            el.setAttribute("aria-pressed", Number(el.dataset.pairs) === pairs),
          );
        start();
      });
    }),
);
$("theme").onchange = () => {
  const next = $("theme").value;
  $("theme").value = theme;
  requestChange(() => {
    theme = next;
    $("theme").value = theme;
    start();
  });
};
$("restart").onclick = () => requestChange(start);
$("yes").onclick = () => {
  $("confirm").close();
  if (pending) pending();
  pending = null;
};
$("no").onclick = () => {
  $("confirm").close();
  pending = null;
};
$("confirm").addEventListener("cancel", () => (pending = null));
$("help").onclick = () => $("instructions").showModal();
$("close-help").onclick = () => $("instructions").close();
start();
