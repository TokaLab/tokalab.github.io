const cards = [
  { word: "Elefante", mode: "Mimo" },
  { word: "Bicicletta", mode: "Disegno" },
  { word: "Computer", mode: "Taboo" },
  { word: "Pizza", mode: "Mimo" }
];

const wordEl = document.getElementById("word");
const modeEl = document.getElementById("mode");
const imageEl = document.getElementById("cardImage");
const button = document.getElementById("drawButton");

const templates = {
  "Mimo": "images/mimic.png",
  "Disegno": "images/drawit.png",
  "Taboo": "images/forbidden.png"
};

button.addEventListener("click", () => {
  const randomIndex = Math.floor(Math.random() * cards.length);
  const card = cards[randomIndex];

  wordEl.textContent = card.word;
  modeEl.textContent = card.mode;
  imageEl.src = templates[card.mode];
});